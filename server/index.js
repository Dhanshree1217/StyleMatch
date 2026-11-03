import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'node:crypto';
import rateLimit from 'express-rate-limit';
import NodeCache from 'node-cache';

dotenv.config({ quiet: true });

const app = express();
const DEFAULT_PORT = 5000;
const requestedPort = Number(process.env.PORT ?? DEFAULT_PORT) || DEFAULT_PORT;
const PORT = Number.isInteger(requestedPort) && requestedPort > 0 ? requestedPort : DEFAULT_PORT;

// AMAZON_MODE: 'demo' (default) or 'live' (requires valid PA-API 5.0 credentials)
const AMAZON_MODE = (process.env.AMAZON_MODE || 'demo').toLowerCase();
const IS_LIVE = AMAZON_MODE === 'live';

if (IS_LIVE) {
  const missing = ['ACCESS_KEY', 'SECRET_KEY', 'PARTNER_TAG'].filter(k => !process.env[k]);
  if (missing.length) {
    console.warn(`[server] AMAZON_MODE=live but missing: ${missing.join(', ')}. Falling back to demo.`);
  }
}
console.log(`[server] Amazon mode: ${AMAZON_MODE.toUpperCase()}`);

const productCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a minute.', items: [] }
});

// ---------------------------------------------------------------------------
// DEMO DATA
// Clearly-labelled placeholder products. NOT real Amazon listings.
// Images: Unsplash (free). Replace with PA-API data once credentials approved.
// ---------------------------------------------------------------------------

const DEMO_PRODUCTS = {
  women: [
    { id: 'd-w1', asin: '', title: '[DEMO] Floral Anarkali Kurta Set', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80&auto=format&fit=crop', price: '1,299', currency: 'INR', affiliate_url: '', category: 'ethnic-wear', clothingType: 'Kurtis', occasion: 'Festival', gender: 'Women', age_group: 'Adult 18-35' },
    { id: 'd-w2', asin: '', title: '[DEMO] Pastel Co-ord Set', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80&auto=format&fit=crop', price: '1,799', currency: 'INR', affiliate_url: '', category: 'co-ord-sets', clothingType: 'Co-ord Sets', occasion: 'Casual', gender: 'Women', age_group: 'Adult 18-35' },
    { id: 'd-w3', asin: '', title: '[DEMO] Silk Saree with Blouse', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80&auto=format&fit=crop', price: '3,499', currency: 'INR', affiliate_url: '', category: 'traditional-sarees', clothingType: 'Sarees', occasion: 'Wedding', gender: 'Women', age_group: 'Adult 18-35' },
    { id: 'd-w4', asin: '', title: '[DEMO] Floral Midi Dress', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80&auto=format&fit=crop', price: '999', currency: 'INR', affiliate_url: '', category: 'dresses', clothingType: 'Dresses', occasion: 'Casual', gender: 'Women', age_group: 'Adult 18-35' },
    { id: 'd-w5', asin: '', title: '[DEMO] Formal Blazer Set', image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80&auto=format&fit=crop', price: '2,199', currency: 'INR', affiliate_url: '', category: 'office-wear', clothingType: 'Blazers', occasion: 'Office', gender: 'Women', age_group: 'Adult 18-35' },
    { id: 'd-w6', asin: '', title: '[DEMO] Denim Jacket & Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80&auto=format&fit=crop', price: '1,599', currency: 'INR', affiliate_url: '', category: 'jeans-denim', clothingType: 'Jeans & Tops', occasion: 'Casual', gender: 'Women', age_group: 'Adult 18-35' },
    { id: 'd-w7', asin: '', title: '[DEMO] Bridal Lehenga Set', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&auto=format&fit=crop', price: '8,999', currency: 'INR', affiliate_url: '', category: 'wedding-guest', clothingType: 'Lehengas', occasion: 'Wedding', gender: 'Women', age_group: 'Adult 18-35' },
    { id: 'd-w8', asin: '', title: '[DEMO] Sequin Party Dress', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&q=80&auto=format&fit=crop', price: '2,499', currency: 'INR', affiliate_url: '', category: 'party-wear', clothingType: 'Dresses', occasion: 'Party', gender: 'Women', age_group: 'Adult 18-35' },
    { id: 'd-w9', asin: '', title: '[DEMO] Summer Linen Co-ord', image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&q=80&auto=format&fit=crop', price: '1,299', currency: 'INR', affiliate_url: '', category: 'summer-outfits', clothingType: 'Co-ord Sets', occasion: 'Travel', gender: 'Women', age_group: 'Adult 18-35' },
    { id: 'd-w10', asin: '', title: '[DEMO] Minimalist White Dress', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80&auto=format&fit=crop', price: '1,099', currency: 'INR', affiliate_url: '', category: 'minimalist', clothingType: 'Dresses', occasion: 'Casual', gender: 'Women', age_group: 'Adult 18-35' },
  ],
  men: [
    { id: 'd-m1', asin: '', title: '[DEMO] Slim Fit Formal Shirt', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80&auto=format&fit=crop', price: '799', currency: 'INR', affiliate_url: '', category: 'tops-shirts', clothingType: 'Formal Shirts', occasion: 'Office', gender: 'Men', age_group: 'Adult 18-35' },
    { id: 'd-m2', asin: '', title: '[DEMO] Casual Chinos', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&auto=format&fit=crop', price: '1,199', currency: 'INR', affiliate_url: '', category: 'casual-wear', clothingType: 'Smart Casual', occasion: 'Casual', gender: 'Men', age_group: 'Adult 18-35' },
    { id: 'd-m3', asin: '', title: '[DEMO] Kurta Pyjama Set', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80&auto=format&fit=crop', price: '1,499', currency: 'INR', affiliate_url: '', category: 'ethnic-wear', clothingType: 'Kurtis', occasion: 'Festival', gender: 'Men', age_group: 'Adult 18-35' },
    { id: 'd-m4', asin: '', title: '[DEMO] Slim Fit Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80&auto=format&fit=crop', price: '1,099', currency: 'INR', affiliate_url: '', category: 'jeans-denim', clothingType: 'Jeans & Tops', occasion: 'Casual', gender: 'Men', age_group: 'Adult 18-35' },
    { id: 'd-m5', asin: '', title: '[DEMO] Athleisure Track Set', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&auto=format&fit=crop', price: '1,299', currency: 'INR', affiliate_url: '', category: 'athleisure', clothingType: 'Streetwear', occasion: 'Casual', gender: 'Men', age_group: 'Adult 18-35' },
    { id: 'd-m6', asin: '', title: '[DEMO] Linen Summer Shirt', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80&auto=format&fit=crop', price: '899', currency: 'INR', affiliate_url: '', category: 'summer-outfits', clothingType: 'Formal Shirts', occasion: 'Travel', gender: 'Men', age_group: 'Adult 18-35' },
    { id: 'd-m7', asin: '', title: '[DEMO] Navy Blazer & Chinos', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80&auto=format&fit=crop', price: '3,499', currency: 'INR', affiliate_url: '', category: 'office-wear', clothingType: 'Blazers', occasion: 'Office', gender: 'Men', age_group: 'Adult 18-35' },
    { id: 'd-m8', asin: '', title: '[DEMO] Wedding Sherwani', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop', price: '6,999', currency: 'INR', affiliate_url: '', category: 'wedding-guest', clothingType: 'Indo-Western', occasion: 'Wedding', gender: 'Men', age_group: 'Adult 18-35' },
  ],
  girl: [
    { id: 'd-g1', asin: '', title: '[DEMO] Floral Frock', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80&auto=format&fit=crop', price: '599', currency: 'INR', affiliate_url: '', category: 'dresses', clothingType: 'Dresses', occasion: 'Casual', gender: 'Girl', age_group: 'Kids 2-5' },
    { id: 'd-g2', asin: '', title: '[DEMO] Ethnic Lehenga Set', image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80&auto=format&fit=crop', price: '899', currency: 'INR', affiliate_url: '', category: 'ethnic-wear', clothingType: 'Lehengas', occasion: 'Festival', gender: 'Girl', age_group: '6-12' },
    { id: 'd-g3', asin: '', title: '[DEMO] Casual T-Shirt & Skirt', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80&auto=format&fit=crop', price: '499', currency: 'INR', affiliate_url: '', category: 'casual-wear', clothingType: 'Casual', occasion: 'Casual', gender: 'Girl', age_group: '6-12' },
    { id: 'd-g4', asin: '', title: '[DEMO] Party Wear Dress', image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80&auto=format&fit=crop', price: '799', currency: 'INR', affiliate_url: '', category: 'party-wear', clothingType: 'Dresses', occasion: 'Party', gender: 'Girl', age_group: '6-12' },
    { id: 'd-g5', asin: '', title: '[DEMO] School Uniform Set', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80&auto=format&fit=crop', price: '699', currency: 'INR', affiliate_url: '', category: 'college-outfits', clothingType: 'Everyday', occasion: 'College', gender: 'Girl', age_group: '6-12' },
  ],
  boy: [
    { id: 'd-b1', asin: '', title: '[DEMO] Casual Shirt & Shorts', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80&auto=format&fit=crop', price: '549', currency: 'INR', affiliate_url: '', category: 'casual-wear', clothingType: 'Casual', occasion: 'Casual', gender: 'Boy', age_group: 'Kids 2-5' },
    { id: 'd-b2', asin: '', title: '[DEMO] Ethnic Kurta Set', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80&auto=format&fit=crop', price: '699', currency: 'INR', affiliate_url: '', category: 'ethnic-wear', clothingType: 'Kurtis', occasion: 'Festival', gender: 'Boy', age_group: '6-12' },
    { id: 'd-b3', asin: '', title: '[DEMO] Denim Jeans & T-Shirt', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80&auto=format&fit=crop', price: '649', currency: 'INR', affiliate_url: '', category: 'jeans-denim', clothingType: 'Jeans & Tops', occasion: 'Casual', gender: 'Boy', age_group: '6-12' },
    { id: 'd-b4', asin: '', title: '[DEMO] Track Suit', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&auto=format&fit=crop', price: '799', currency: 'INR', affiliate_url: '', category: 'athleisure', clothingType: 'Streetwear', occasion: 'Casual', gender: 'Boy', age_group: '6-12' },
    { id: 'd-b5', asin: '', title: '[DEMO] Party Wear Suit', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80&auto=format&fit=crop', price: '1,299', currency: 'INR', affiliate_url: '', category: 'party-wear', clothingType: 'Smart Casual', occasion: 'Party', gender: 'Boy', age_group: '6-12' },
  ],
};

// Filter demo products by gender, then optionally by category, clothingType, occasion
function getDemoProducts(gender, ageGroup, category, style, clothingType, occasion) {
  const key = gender.toLowerCase();
  let pool = DEMO_PRODUCTS[key] || DEMO_PRODUCTS.women;

  // Filter by category slug
  if (category) {
    const byCategory = pool.filter(p => p.category === category);
    if (byCategory.length >= 2) pool = byCategory;
  } else if (style) {
    const byStyle = pool.filter(p => p.category === style);
    if (byStyle.length >= 2) pool = byStyle;
  }

  // Filter by clothingType
  if (clothingType) {
    const byType = pool.filter(p =>
      p.clothingType && p.clothingType.toLowerCase() === clothingType.toLowerCase()
    );
    if (byType.length >= 1) pool = byType;
  }

  // Filter by occasion
  if (occasion) {
    const byOccasion = pool.filter(p =>
      p.occasion && p.occasion.toLowerCase() === occasion.toLowerCase()
    );
    if (byOccasion.length >= 1) pool = byOccasion;
  }

  // Deterministic shuffle so same query always returns same order
  const seed = `${gender}${ageGroup}${category}${style}${clothingType}${occasion}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) & 0xffffffff;
  const shuffled = [...pool].sort((a, b) => {
    const ha = (hash ^ a.id.charCodeAt(a.id.length - 1)) & 0xff;
    const hb = (hash ^ b.id.charCodeAt(b.id.length - 1)) & 0xff;
    return ha - hb;
  });

  return shuffled.slice(0, 6);
}

// ---------------------------------------------------------------------------
// STYLE -> SEARCH KEYWORD MAPPING
// ---------------------------------------------------------------------------

const GENDER_KEYWORDS = { Men: 'men', Women: 'women', Boy: 'boys', Girl: 'girls' };

const AGE_KEYWORDS = {
  'Kids 2-5': 'kids', '6-12': 'kids', 'Teen 13-17': 'teen',
  'Adult 18-35': 'adult', '35+': 'adult'
};

const STYLE_KEYWORDS = {
  'traditional': 'traditional ethnic india',
  'western': 'western fashion',
  'casual': 'casual wear',
  'college-outfits': 'college casual',
  'office-wear': 'formal office wear',
  'street-style': 'streetwear',
  'festive-looks': 'festive ethnic',
  'ethnic-wear': 'ethnic wear india',
  'co-ord-sets': 'co-ord set',
  'party-wear': 'party wear',
  'wedding-guest': 'wedding guest outfit',
  'traditional-sarees': 'saree silk cotton',
  'kurtis-kurta': 'kurti kurta set',
  'jeans-denim': 'jeans denim',
  'tops-shirts': 'tops shirts',
  'dresses': 'dress',
  'winter-wear': 'winter jacket sweater',
  'summer-outfits': 'summer outfit linen',
  'minimalist': 'minimalist fashion',
  'athleisure': 'athleisure sportswear',
  'vacation-travel': 'travel outfit',
  'shoes-sneakers': 'shoes sneakers',
  'bags-accessories': 'bags accessories',
  'mens-fashion': 'men fashion',
  'womens-fashion': 'women fashion',
  'formal-dress': 'formal dress',
  'casual-wear': 'casual wear',
  'western-wear': 'western wear',
  'party-wear': 'party wear',
};

function buildSearchKeyword(gender, ageGroup, categoryOrStyle) {
  const g = GENDER_KEYWORDS[gender] || gender.toLowerCase();
  const a = AGE_KEYWORDS[ageGroup] || '';
  const c = STYLE_KEYWORDS[categoryOrStyle] || (categoryOrStyle || '').replace(/-/g, ' ');
  return [g, a, c].filter(Boolean).join(' ').trim() || 'fashion clothing india';
}

// ---------------------------------------------------------------------------
// AMAZON PA-API v5 REQUEST SIGNING (AWS4-HMAC-SHA256)
// ---------------------------------------------------------------------------

function hmac(key, value) {
  return crypto.createHmac('sha256', key).update(value).digest();
}

function signPaapiRequest({ body, accessKey, secretKey, region = 'eu-west-1', service = 'ProductAdvertisingAPI' }) {
  const date = new Date();
  const amzDate = date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const dateStamp = amzDate.slice(0, 8);
  const host = 'webservices.amazon.in';
  const payload = JSON.stringify(body);
  const payloadHash = crypto.createHash('sha256').update(payload).digest('hex');

  const headers = {
    'content-type': 'application/json',
    host,
    'x-amz-date': amzDate,
    'x-amz-target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems'
  };

  const canonicalHeaders = Object.entries(headers)
    .sort(([l], [r]) => l.localeCompare(r))
    .map(([k, v]) => `${k.toLowerCase()}:${String(v).trim()}\n`)
    .join('');

  const signedHeaders = Object.keys(headers).map(k => k.toLowerCase()).sort().join(';');
  const canonicalRequest = ['POST', '/paapi5/searchitems', '', canonicalHeaders, signedHeaders, payloadHash].join('\n');

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const signedString = [
    'AWS4-HMAC-SHA256', amzDate, credentialScope,
    crypto.createHash('sha256').update(canonicalRequest).digest('hex')
  ].join('\n');

  const kDate    = hmac(`AWS4${secretKey}`, dateStamp);
  const kRegion  = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  const kSigning = hmac(kService, 'aws4_request');
  const signature = hmac(kSigning, signedString).toString('hex');

  return {
    ...headers,
    Authorization: `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`
  };
}

// ---------------------------------------------------------------------------
// LIVE AMAZON PRODUCT FETCH
// ---------------------------------------------------------------------------

async function fetchAmazonProducts(searchKeyword) {
  const accessKey = process.env.ACCESS_KEY;
  const secretKey = process.env.SECRET_KEY;
  const partnerTag = process.env.PARTNER_TAG;

  if (!accessKey || !secretKey || !partnerTag) {
    throw new Error('Amazon credentials missing. Set ACCESS_KEY, SECRET_KEY, PARTNER_TAG in .env');
  }

  for (const searchIndex of ['Apparel', 'Fashion']) {
    const payload = {
      Keywords: searchKeyword,
      SearchIndex: searchIndex,
      PartnerTag: partnerTag,
      PartnerType: 'Associates',
      Marketplace: 'www.amazon.in',
      ItemCount: 10,
      Resources: ['Images.Primary.Large', 'ItemInfo.Title', 'Offers.Listings.Price', 'DetailPageURL']
    };

    const reqHeaders = signPaapiRequest({ body: payload, accessKey, secretKey });
    const response = await fetch('https://webservices.amazon.in/paapi5/searchitems', {
      method: 'POST', headers: reqHeaders, body: JSON.stringify(payload)
    });

    const text = await response.text();
    const body = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw new Error(body?.Errors?.[0]?.Message || 'Amazon API request failed');
    }

    const items = (body.SearchResult?.Items || []).map(item => ({
      id:            item.ASIN || '',
      asin:          item.ASIN || '',
      title:         item.ItemInfo?.Title?.DisplayValue || 'Amazon product',
      image:         item.Images?.Primary?.Large?.URL || item.Images?.Primary?.Medium?.URL || '',
      price:         item.Offers?.Listings?.[0]?.Price?.DisplayAmount || null,
      currency:      'INR',
      affiliate_url: item.DetailPageURL || '',
      category:      '',
      gender:        '',
      age_group:     '',
    })).filter(p => p.affiliate_url || p.title);

    if (items.length > 0) return items;
  }
  return [];
}

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

const normalizeText = (v = '') => String(v).trim();

const VALID_GENDERS    = ['Men', 'Women', 'Boy', 'Girl'];
const VALID_AGE_GROUPS = ['Kids 2-5', '6-12', 'Teen 13-17', 'Adult 18-35', '35+'];

function validateStyleParams(gender, ageGroup) {
  if (!VALID_GENDERS.includes(gender))
    return `Invalid gender. Must be one of: ${VALID_GENDERS.join(', ')}`;
  if (!VALID_AGE_GROUPS.includes(ageGroup))
    return `Invalid age group. Must be one of: ${VALID_AGE_GROUPS.join(', ')}`;
  return null;
}

// ---------------------------------------------------------------------------
// EXPRESS
// ---------------------------------------------------------------------------

app.use(cors());
app.use(express.json());

// --- Legacy /api/products (kept for backward compatibility with MyStyle.jsx) ---

const legacyGenderKw = { Men: 'men', Women: 'women', Boy: 'boys', Girl: 'girls' };
const legacyAgeKw = {
  'Kids 2-5': 'kids', '6-12': 'kids', 'Teen 13-17': 'teen',
  'Adult 18-35': 'adult', '35+': 'adult'
};

app.get('/api/products', rateLimiter, async (req, res) => {
  const gender = normalizeText(req.query.gender) || 'Women';
  const age    = normalizeText(req.query.age)    || 'Adult 18-35';
  const type   = normalizeText(req.query.type)   || 'shirts';
  const g = legacyGenderKw[gender] || gender.toLowerCase();
  const a = legacyAgeKw[age]       || age.toLowerCase();
  const keywords = [g, a, type].filter(Boolean).join(' ');
  const cacheKey = `legacy|${gender}|${age}|${type}`.toLowerCase();

  const cached = productCache.get(cacheKey);
  if (cached) return res.json(cached);

  if (!IS_LIVE || !process.env.ACCESS_KEY) {
    const demoItems = getDemoProducts(gender, age, '', type, '', '');
    const payload = {
      items: demoItems.map(p => ({ title: p.title, image: p.image, price: p.price, url: p.affiliate_url })),
      query: keywords, fetchedAt: new Date().toISOString(), demo: true
    };
    productCache.set(cacheKey, payload);
    return res.json(payload);
  }

  try {
    const raw = await fetchAmazonProducts(keywords);
    const items = raw.map(p => ({ title: p.title, image: p.image, price: p.price, url: p.affiliate_url }));
    const payload = { items, query: keywords, fetchedAt: new Date().toISOString(), demo: false };
    productCache.set(cacheKey, payload);
    return res.json(payload);
  } catch (err) {
    return res.status(502).json({
      items: [], error: 'Amazon product search is currently unavailable.',
      debug: err.message, query: keywords
    });
  }
});

// --- /api/style-recommendations ---
// GET /api/style-recommendations?gender=Women&age_group=Adult+18-35&category=ethnic-wear
//   &style=festive-looks&clothing_type=Sarees&occasion=Wedding&colour=Red&season=Summer

app.get('/api/style-recommendations', rateLimiter, async (req, res) => {
  const gender       = normalizeText(req.query.gender)        || 'Women';
  const ageGroup     = normalizeText(req.query.age_group)     || 'Adult 18-35';
  const category     = normalizeText(req.query.category)      || '';
  const style        = normalizeText(req.query.style)         || '';
  const clothingType = normalizeText(req.query.clothing_type) || '';
  const occasion     = normalizeText(req.query.occasion)      || '';
  const colour       = normalizeText(req.query.colour)        || '';
  const season       = normalizeText(req.query.season)        || '';

  const validationError = validateStyleParams(gender, ageGroup);
  if (validationError) {
    return res.status(400).json({ success: false, error: validationError, products: [] });
  }

  const cacheKey = `recs|${gender}|${ageGroup}|${category}|${style}|${clothingType}|${occasion}`.toLowerCase();
  const cached = productCache.get(cacheKey);
  if (cached) return res.json(cached);

  if (!IS_LIVE || !process.env.ACCESS_KEY) {
    const payload = {
      success: true,
      products: [],
      demo: false,
      error: 'Amazon product search is not configured for this environment. The local StyleMatch gallery remains available.',
      query: buildSearchKeyword(gender, ageGroup, category || style || clothingType),
      fetchedAt: new Date().toISOString()
    };
    productCache.set(cacheKey, payload);
    return res.json(payload);
  }

  try {
    const keyword = buildSearchKeyword(gender, ageGroup, category || style || clothingType);
    const raw = await fetchAmazonProducts(keyword);
    const products = raw.map(p => ({ ...p, gender, age_group: ageGroup, category: category || p.category }));
    const payload = { success: true, products, demo: false, query: keyword, fetchedAt: new Date().toISOString() };
    productCache.set(cacheKey, payload);
    return res.json(payload);
  } catch (err) {
    return res.status(502).json({
      success: false, products: [],
      error: 'Amazon product search is currently unavailable. Please try again later.',
      debug: err.message
    });
  }
});

// --- Health check ---

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', mode: AMAZON_MODE, timestamp: new Date().toISOString() });
});

// ---------------------------------------------------------------------------
// STARTUP
// ---------------------------------------------------------------------------

process.on('uncaughtException',  err => console.error('[server] Uncaught exception:', err));
process.on('unhandledRejection', err => console.error('[server] Unhandled rejection:', err));

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`StyleMatch backend listening on http://localhost:${PORT}`);
  console.log(`Amazon mode: ${AMAZON_MODE.toUpperCase()}`);
  console.log('Frontend: http://localhost:5173');
});

server.on('error', err => {
  console.error(`[server] Failed to start on port ${PORT}. ${err.code === 'EADDRINUSE' ? 'Port already in use.' : err.message}`);
  process.exit(1);
});
