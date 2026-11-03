import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

/* =========================================================
   AMAZON TOKEN CACHE
========================================================= */

let cachedToken = null;
let tokenExpiresAt = 0;


/* =========================================================
   GET AMAZON ACCESS TOKEN
========================================================= */

async function getAmazonAccessToken() {
  if (
    cachedToken &&
    Date.now() < tokenExpiresAt - 60000
  ) {
    return cachedToken;
  }

  try {
    const response = await axios.post(
      "https://api.amazon.co.uk/auth/o2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMAZON_CLIENT_ID,
        client_secret: process.env.AMAZON_CLIENT_SECRET,
        scope: "creatorsapi::default",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    cachedToken = response.data.access_token;

    const expiresIn = response.data.expires_in || 3600;

    tokenExpiresAt =
      Date.now() + expiresIn * 1000;

    return cachedToken;
  } catch (error) {
    console.error(
      "Amazon Authentication Error:",
      error.response?.data || error.message
    );

    throw new Error(
      "Unable to authenticate with Amazon"
    );
  }
}


/* =========================================================
   HELPER: CLEAN FILTER VALUE
========================================================= */

function validValue(value, defaultValue) {
  if (!value) return false;
  return value !== defaultValue;
}


/* =========================================================
   BUILD AMAZON SEARCH QUERY
========================================================= */

function buildSearchQuery(filters) {
  const {
    category,
    ageGroup,
    gender,
    clothingType,
    colour,
    season,
    occasion,
    search,
  } = filters;

  const words = [];


  /* -------------------------
     SEARCH TEXT
  ------------------------- */

  if (search?.trim()) {
    words.push(search.trim());
  }


  /* -------------------------
     AGE GROUP
  ------------------------- */

  if (validValue(ageGroup, "All Ages")) {
    if (ageGroup.includes("Infants")) {
      words.push("baby");
    }

    if (ageGroup.includes("Kids")) {
      words.push("kids");
    }

    if (ageGroup.includes("Teenagers")) {
      words.push("teen");
    }

    if (ageGroup.includes("Young Adults")) {
      words.push("young adult");
    }

    if (ageGroup.includes("Adults")) {
      words.push("adult");
    }

    if (ageGroup.includes("Middle-aged")) {
      words.push("adult");
    }

    if (ageGroup.includes("Seniors")) {
      words.push("senior");
    }
  }


  /* -------------------------
     GENDER
  ------------------------- */

  if (validValue(gender, "All Genders")) {
    words.push(gender);
  }


  /* -------------------------
     COLOUR
  ------------------------- */

  if (validValue(colour, "All Colours")) {
    words.push(colour);
  }


  /* -------------------------
     SEASON
  ------------------------- */

  if (validValue(season, "All Seasons")) {
    words.push(season);
  }


  /* -------------------------
     OCCASION
  ------------------------- */

  if (validValue(occasion, "All Occasions")) {
    words.push(occasion);
  }


  /* -------------------------
     CLOTHING TYPE
  ------------------------- */

  if (validValue(clothingType, "All Types")) {
    words.push(clothingType);
  }


  /* =========================================================
     CATEGORY FALLBACK
  ========================================================= */

  const categoryQueries = {
    traditional:
      "Indian traditional ethnic wear",

    western:
      "western fashion clothing",

    college:
      "college casual fashion outfit",

    office:
      "formal office wear clothing",

    party:
      "party wear fashion outfit",

    wedding:
      "wedding festive ethnic wear",

    seasonal:
      "seasonal fashion clothing",

    footwear:
      "footwear shoes accessories",
  };


  if (categoryQueries[category]) {
    words.push(categoryQueries[category]);
  }


  /* -------------------------
     DEFAULT
  ------------------------- */

  if (words.length === 0) {
    words.push("Indian fashion clothing");
  }


  return words.join(" ");
}


/* =========================================================
   AMAZON PRODUCT SEARCH
========================================================= */

app.get("/api/products", async (req, res) => {
  try {
    const token =
      await getAmazonAccessToken();

    const keywords =
      buildSearchQuery(req.query);

    console.log(
      "\n=============================="
    );

    console.log(
      "Amazon Search Query:",
      keywords
    );

    console.log(
      "==============================\n"
    );


    /*
      IMPORTANT:

      Confirm the exact endpoint/resource names
      shown in your Amazon Creators API dashboard.

      Amazon may use a regional endpoint depending
      on your marketplace/API account.
    */

    const amazonResponse = await axios.post(
      "https://creatorsapi.amazon.com/catalog/v1/searchItems",

      {
        keywords,

        marketplace: "www.amazon.in",

        partnerTag:
          process.env.AMAZON_PARTNER_TAG,

        resources: [
          "images.primary.large",
          "images.primary.medium",
          "itemInfo.title",
          "offersV2.listings.price",
        ],
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type":
            "application/json",

          "x-marketplace":
            "www.amazon.in",
        },
      }
    );


    console.log(
      "Amazon API response received"
    );


    /* =====================================================
       EXTRACT ITEMS
    ===================================================== */

    const rawItems =
      amazonResponse.data?.searchResult?.items ||
      amazonResponse.data?.items ||
      [];


    const products = rawItems.map(
      (item, index) => {
        const listing =
          item.offersV2?.listings?.[0];

        return {
          id:
            item.asin ||
            `amazon-${index}`,

          asin:
            item.asin || "",

          title:
            item.itemInfo?.title
              ?.displayValue ||
            item.title ||
            "Amazon Fashion Product",

          image:
            item.images?.primary?.large?.url ||
            item.images?.primary?.medium?.url ||
            item.image ||
            "",

          price:
            listing?.price?.moneyAmount ||
            listing?.price?.amount ||
            null,

          displayPrice:
            listing?.price?.displayAmount ||
            null,

          currency:
            listing?.price?.currency ||
            "INR",

          productUrl:
            item.detailPageURL ||
            item.detailPageUrl ||
            "",
        };
      }
    );


    return res.json({
      success: true,

      query: keywords,

      count: products.length,

      products,
    });

  } catch (error) {

    console.error(
      "\nAMAZON API ERROR:\n"
    );

    console.error(
      error.response?.data ||
      error.message
    );


    return res.status(500).json({
      success: false,

      message:
        "Unable to fetch Amazon products right now.",

      error:
        error.response?.data ||
        error.message,
    });
  }
});


/* =========================================================
   TEST ROUTE
========================================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,

    message:
      "StyleMatch Amazon API server is running!",
  });
});


/* =========================================================
   START SERVER
========================================================= */

app.listen(PORT, () => {
  console.log(
    `\n🚀 StyleMatch server running on port ${PORT}`
  );

  console.log(
    `📦 API: http://localhost:${PORT}/api/products\n`
  );
});