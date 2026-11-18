import { shopTheLookData, buildAmazonSearchUrl } from './shopTheLookData.js';

const STYLE_LOOKS = [
  {
    style: 'ethnic-wear',
    label: 'Ethnic Wear',
    ideas: [
      'Floral Georgette Anarkali Suit',
      'Pastel Embroidered Sharara Set',
      'Printed Straight Kurta Set',
      'Festive Mirror-Work Sharara',
      'Classic Chikankari Kurta Set',
      'Jewel-Tone Silk Sharara',
      'Soft Cotton Anarkali Set',
      'Layered Jacket-Style Kurta',
      'Modern Dhoti Kurta Set',
    ],
  },
  {
    style: 'western',
    label: 'Western',
    ideas: [
      'Floral Georgette Midi Dress',
      'Pastel Tiered Day Dress',
      'Printed Wrap Midi Dress',
      'Weekend Fit-and-Flare Dress',
      'Soft Knit Shirt Dress',
      'Minimal Black Midi Dress',
      'Relaxed Linen Day Dress',
      'Bright Brunch Floral Dress',
      'Classic Belted Midi Dress',
    ],
  },
  {
    style: 'casual',
    label: 'Casual',
    ideas: [
      'High-Waist Jeans and Striped Tee',
      'Relaxed Weekend Denim Look',
      'Soft Knit Top and Mom Jeans',
      'Everyday Shirt and Blue Jeans',
      'Classic Tee and Straight Denim',
      'Laid-Back Linen Shirt and Jeans',
      'Weekend Top and Denim Look',
      'Monochrome Tee and Jeans',
      'Casual Layered Denim Outfit',
    ],
  },
  {
    style: 'college-outfits',
    label: 'College Look',
    ideas: [
      'Oversized Graphic Sweatshirt Look',
      'Campus Hoodie and Platform Sneakers',
      'Comfy Fleece Top and Backpack',
      'Graphic Sweatshirt and Jeans',
      'Layered Campus Sweatshirt Look',
      'Pastel Sweatshirt and Trainers',
      'Relaxed Campus Denim Outfit',
      'Winter College Hoodie Look',
      'Classic Sweatshirt and Sneakers',
    ],
  },
  {
    style: 'office-wear',
    label: 'Office Wear',
    ideas: [
      'Tailored Blazer and Trousers',
      'Classic Single-Breasted Office Suit',
      'Smart Neutral Workwear Set',
      'Soft Knit Top and Tailored Pants',
      'Minimal Monochrome Office Look',
      'Structured Blazer Work Outfit',
      'Polished Blazer and Pumps',
      'Modern Tailored Trouser Suit',
      'Winter Blazer and Trousers',
    ],
  },
  {
    style: 'street-style',
    label: 'Street Style',
    ideas: [
      'Cropped Bomber and Cargo Trousers',
      'Oversized Bomber Streetwear Look',
      'Utility Cargo Pants and Street Trainers',
      'Layered Bomber and Denim Outfit',
      'Graphic Tee and Cargo Pants',
      'Urban Bomber Jacket Look',
      'Relaxed Cargo Streetwear Set',
      'Monochrome Cargo Outfit',
      'Statement Jacket and Street Trainers',
    ],
  },
  {
    style: 'festive-looks',
    label: 'Festive Look',
    ideas: [
      'Brocade Silk Lehenga Choli',
      'Embroidered Festive Lehenga Set',
      'Pastel Zari Lehenga Look',
      'Traditional Jewel-Tone Lehenga',
      'Bright Wedding Guest Lehenga',
      'Mirror-Work Celebration Lehenga',
      'Classic Gold-Detail Lehenga Set',
      'Winter Wedding Lehenga Look',
    ],
  },
  {
    style: 'co-ord-sets',
    label: 'Co-ord Sets',
    ideas: [
      'Pastel Linen Top and Palazzo Set',
      'Printed Crop Top Co-ord Set',
      'Soft Linen Two-Piece Outfit',
      'Flared Palazzo Co-ord Set',
      'Relaxed Weekend Linen Co-ord',
      'Minimal Matching Top and Trousers',
      'Winter Knit Co-ord Set',
      'Monochrome Palazzo Co-ordinates',
    ],
  },
  {
    style: 'party-wear',
    label: 'Party Wear',
    ideas: [
      'Midnight Sequin Party Dress',
      'Satin Cocktail Dress',
      'Statement Sequin Evening Dress',
      'Classic Black Party Dress',
      'Velvet Celebration Dress',
      'Shimmering Partywear Dress',
      'Winter Velvet Party Look',
      'Elegant Evening Sequin Dress',
    ],
  },
  {
    style: 'traditional-sarees',
    label: 'Sarees',
    ideas: [
      'Royal Kanjivaram Silk Saree',
      'Lightweight Printed Silk Saree',
      'Festive Zari Border Saree',
      'Soft Chiffon Wedding Saree',
      'Pastel Organza Saree Look',
      'Traditional Temple-Work Saree',
      'Modern Ready-to-Wear Saree Look',
      'Winter Wedding Silk Saree',
    ],
  },
  {
    style: 'athleisure',
    label: 'Athleisure',
    ideas: [
      'Ribbed Leggings and Zip Jacket',
      'Everyday Seamless Activewear Set',
      'Lightweight Running and Gym Look',
      'Yoga Leggings and Training Top',
      'Relaxed Jogger Activewear Set',
      'Winter Workout Layering Set',
      'Sporty Compression Leggings Look',
      'Travel-Ready Athleisure Outfit',
    ],
  },
  {
    style: 'daily-wear',
    label: 'Daily Wear',
    baseStyle: 'casual',
    ideas: [
      'Daily Striped Tee and Jeans',
      'Easy Everyday Denim Outfit',
      'Soft Tee and Mom Jeans',
      'Comfortable Cotton Top and Denim',
      'Daily Shirt and Blue Jeans',
      'Lightweight Tee and Denim Layers',
      'Simple Everyday Jeans Look',
      'Relaxed Daily Denim Outfit',
    ],
  },
];

const LOOK_LIMITS = [9, 9, 9, 9, 8, 8, 8, 8, 8, 8, 8, 8];
const SEASONS = ['Winter', 'Summer', 'Monsoon', 'All Season'];
const WINTER_LAYER_IMAGE =
  'https://images.unsplash.com/photo-1548624149-f2c6e8d8a4c4?w=800&q=80&auto=format&fit=crop';
const GENDER_FALLBACK_STYLES = {
  Men: {
    western: 'casual',
    'college-outfits': 'casual',
    'street-style': 'casual',
    'festive-looks': 'ethnic-wear',
    'co-ord-sets': 'casual',
    'party-wear': 'office-wear',
    athleisure: 'casual',
    'daily-wear': 'casual',
  },
};

const parsePrice = (price) => {
  const amount = Number(String(price || '').replace(/[^\d]/g, ''));
  return Number.isFinite(amount) ? amount : 0;
};

const formatPrice = (amount) => `₹${amount.toLocaleString('en-IN')}`;
const audienceLabel = (audience) => (
  audience === 'Girl' ? 'Girls' : audience === 'Boy' ? 'Boys' : audience
);

function matchesStyle(look, targetStyle) {
  return look.style === targetStyle;
}

function findBaseLooks(style, audience, ageGroup) {
  const targetStyle = style.baseStyle || style.style;
  const matchesAge = (look) => !look.ageGroups || look.ageGroups.includes(ageGroup);
  const matchesAudience = (look) => audience === 'All' || look.gender === audience;

  let matches = shopTheLookData.filter((look) => (
    matchesStyle(look, targetStyle)
    && matchesAudience(look)
    && (ageGroup === 'All Ages' || matchesAge(look))
  ));

  if (!matches.length && audience !== 'All') {
    const fallbackStyle = GENDER_FALLBACK_STYLES[audience]?.[targetStyle]
      || GENDER_FALLBACK_STYLES[audience]?.default;
    if (fallbackStyle) {
      matches = shopTheLookData.filter((look) => (
        look.gender === audience
        && matchesStyle(look, fallbackStyle)
        && (ageGroup === 'All Ages' || matchesAge(look))
      ));
    }
  }

  return matches;
}

function createLook(style, idea, variantIndex, selection, index) {
  const baseLooks = findBaseLooks(
    style,
    selection.audience || 'All',
    selection.ageGroup || 'All Ages',
  );
  const baseLook = baseLooks[variantIndex % baseLooks.length];
  if (!baseLook) return null;

  const season = SEASONS[variantIndex % SEASONS.length];
  const isWinter = season === 'Winter';
  const ageOptions = baseLook.ageGroups || ['Adult 18-35'];
  const ageGroup = selection.ageGroup && selection.ageGroup !== 'All Ages'
    ? selection.ageGroup
    : ageOptions[variantIndex % ageOptions.length];
  const sourceItems = baseLook.items || [];
  const items = sourceItems.map((item, itemIndex) => {
    const itemType = item.type || item.name;
    const itemQuery = itemIndex === 0
      ? `${idea} ${baseLook.gender} ${ageGroup}`
      : `${itemType} to match ${idea} ${baseLook.gender} ${ageGroup}`;
    return {
      ...item,
      id: `${style.style}-${variantIndex}-${itemIndex}`,
      name: itemIndex === 0 ? idea : `${itemType} to match ${idea}`,
      amazonQuery: itemQuery,
      amazonUrl: buildAmazonSearchUrl(itemQuery),
      similarQuery: `similar ${item.type || item.name} ${baseLook.gender}`,
      similarUrl: buildAmazonSearchUrl(`similar ${item.type || item.name} ${baseLook.gender}`),
    };
  });

  if (isWinter) {
    const layerQuery = `${idea} warm shawl cardigan jacket ${baseLook.gender} ${ageGroup}`;
    items.push({
      id: `${style.style}-${variantIndex}-winter-layer`,
      name: style.style === 'ethnic-wear' || style.style === 'traditional-sarees'
        ? 'Matching Warm Shawl'
        : 'Warm Layering Jacket',
      type: 'Winter Layer',
      category: 'Winter Wear',
      price: '₹899',
      image: WINTER_LAYER_IMAGE,
      amazonQuery: layerQuery,
      amazonUrl: buildAmazonSearchUrl(layerQuery),
      similarQuery: `winter layering clothes ${baseLook.gender}`,
      similarUrl: buildAmazonSearchUrl(`winter layering clothes ${baseLook.gender}`),
    });
  }

  const total = items.reduce((sum, item) => sum + parsePrice(item.price), 0);

  return {
    id: `look-${index + 1}`,
    title: idea,
    style: style.style,
    styleLabel: style.label,
    season,
    audience: baseLook.gender,
    audienceLabel: audienceLabel(baseLook.gender),
    ageGroup,
    amazonUrl: items[0]?.amazonUrl || buildAmazonSearchUrl(`${idea} ${baseLook.gender} ${ageGroup}`),
    total: formatPrice(total),
    items,
  };
}

export function getStyleLooks(selection = {}) {
  const looks = [];

  STYLE_LOOKS.forEach((style, styleIndex) => {
    const count = LOOK_LIMITS[styleIndex];
    style.ideas.slice(0, count).forEach((idea, variantIndex) => {
      const look = createLook(style, idea, variantIndex, selection, looks.length);
      if (look) looks.push(look);
    });
  });

  return looks.filter(Boolean);
}
