/**
 * productService.js
 *
 * Reusable frontend service for fetching Amazon product recommendations.
 *
 * SECURITY: This file contains NO Amazon API keys, secrets, or credentials.
 * All secrets live exclusively in server/.env and are read only by the backend.
 *
 * Architecture:
 *   React pages → productService.js → /api/style-recommendations (our backend)
 *                                   → Amazon PA-API 5.0 (backend only)
 *
 * Two modes (controlled by AMAZON_MODE in server/.env):
 *   demo  — returns clearly-labelled placeholder products (default, safe)
 *   live  — returns real Amazon India products (requires approved PA-API credentials)
 */

const API_BASE = '/api';

/**
 * Fetch product recommendations from the backend.
 *
 * @param {Object} params
 * @param {string} params.gender         'Women' | 'Men' | 'Girl' | 'Boy'
 * @param {string} params.ageGroup       'Kids 2-5' | '6-12' | 'Teen 13-17' | 'Adult 18-35' | '35+'
 * @param {string} [params.category]     category slug e.g. 'ethnic-wear'
 * @param {string} [params.style]        style slug e.g. 'festive-looks'
 * @param {string} [params.clothingType] e.g. 'Sarees'
 * @param {string} [params.occasion]     e.g. 'Wedding'
 * @param {string} [params.colour]       e.g. 'Red'
 * @param {string} [params.season]       e.g. 'Summer'
 * @param {string} [params.search]       free-text search
 *
 * @returns {Promise<{ products: Product[], demo: boolean, error: string|null }>}
 */
export async function getProducts({
  gender = 'Women',
  ageGroup = 'Adult 18-35',
  category = '',
  style = '',
  clothingType = '',
  occasion = '',
  colour = '',
  season = '',
  search = '',
} = {}) {
  try {
    const params = new URLSearchParams();
    if (gender)       params.set('gender', gender);
    if (ageGroup)     params.set('age_group', ageGroup);
    if (category)     params.set('category', category);
    if (style)        params.set('style', style);
    if (clothingType) params.set('clothing_type', clothingType);
    if (occasion)     params.set('occasion', occasion);
    if (colour)       params.set('colour', colour);
    if (season)       params.set('season', season);
    if (search)       params.set('search', search);

    const response = await fetch(`${API_BASE}/style-recommendations?${params.toString()}`);

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      return {
        products: [],
        demo: true,
        error: body.error || `Server error ${response.status}`,
      };
    }

    const data = await response.json();
    const products = (data.products || []).map(normaliseProduct);

    return {
      products,
      demo: !!data.demo,
      demoNotice: data.demo_notice || null,
      error: data.error || null,
    };
  } catch (err) {
    return {
      products: [],
      demo: true,
      error: err.message || 'Network error — could not reach the product service.',
    };
  }
}

/**
 * Normalise a raw product object from the API into a consistent shape.
 */
function normaliseProduct(raw) {
  return {
    id:           raw.id           || raw.asin || String(Math.random()),
    asin:         raw.asin         || '',
    title:        raw.title        || 'Fashion Product',
    image:        raw.image        || '',
    price:        raw.price        || null,
    currency:     raw.currency     || 'INR',
    affiliateUrl: raw.affiliate_url || raw.affiliateUrl || '',
    category:     raw.category     || '',
    gender:       raw.gender       || '',
    ageGroup:     raw.age_group    || raw.ageGroup || '',
    source:       raw.affiliate_url ? 'live' : 'demo',
  };
}

/**
 * Build a fallback Amazon India search URL.
 * Used only in demo mode when no real affiliate_url is available.
 * This is a plain search URL — it does NOT guarantee affiliate credit.
 */
export function buildAmazonSearchUrl(query, associateTag = '') {
  const params = new URLSearchParams({ k: query });
  if (associateTag) params.set('tag', associateTag);
  return `https://www.amazon.in/s?${params.toString()}`;
}

/**
 * Map a CategoryPage categoryId + filter state to getProducts() params.
 * This bridges the existing fashionData category system with the backend API.
 */
export function categoryToProductParams(categoryId, filters = {}) {
  const CATEGORY_MAP = {
    traditional:          'ethnic-wear',
    western:              'western-wear',
    college:              'college-outfits',
    office:               'office-wear',
    party:                'party-wear',
    wedding:              'wedding-guest',
    seasonal:             'summer-outfits',
    accessories:          'bags-accessories',
    'co-ord-sets':        'co-ord-sets',
    'formal-dress':       'formal-dress',
    'ethnic-wear':        'ethnic-wear',
    'street-style':       'street-style',
    'festive-looks':      'festive-looks',
    'office-wear':        'office-wear',
    'casual-wear':        'casual-wear',
    'college-outfits':    'college-outfits',
    'western-wear':       'western-wear',
    'party-wear':         'party-wear',
    'wedding-guest':      'wedding-guest',
    'traditional-sarees': 'traditional-sarees',
    'kurtis-kurta':       'kurtis-kurta',
    'jeans-denim':        'jeans-denim',
    'tops-shirts':        'tops-shirts',
    dresses:              'dresses',
    'winter-wear':        'winter-wear',
    'summer-outfits':     'summer-outfits',
    minimalist:           'minimalist',
    athleisure:           'athleisure',
    'vacation-travel':    'vacation-travel',
    'shoes-sneakers':     'shoes-sneakers',
    'bags-accessories':   'bags-accessories',
    'mens-fashion':       'mens-fashion',
    'womens-fashion':     'womens-fashion',
  };

  const GENDER_MAP = {
    Women: 'Women', Men: 'Men', Girls: 'Girl', Boys: 'Boy',
    Unisex: 'Women', 'Gender-neutral': 'Women', 'All Genders': 'Women',
  };

  const AGE_MAP = {
    Infants:              'Kids 2-5',
    Kids:                 '6-12',
    Teenagers:            'Teen 13-17',
    'Young Adults':       'Adult 18-35',
    Adults:               'Adult 18-35',
    'Middle-aged Adults': '35+',
    Seniors:              '35+',
    'All Ages':           'Adult 18-35',
  };

  return {
    category:     CATEGORY_MAP[categoryId] || categoryId,
    gender:       GENDER_MAP[filters.gender]  || 'Women',
    ageGroup:     AGE_MAP[filters.ageGroup]   || 'Adult 18-35',
    clothingType: filters.clothingType !== 'All Types'     ? filters.clothingType : '',
    occasion:     filters.occasion    !== 'All Occasions'  ? filters.occasion     : '',
    colour:       filters.color       !== 'All Colors'     ? filters.color        : '',
    season:       filters.season      !== 'All Seasons'    ? filters.season       : '',
    search:       filters.search || '',
  };
}
