// Color compatibility rules for outfit matching.
// Maps a top's dominant hex color to compatible bottom colors with labels.

const colorRules = [
  {
    name: 'Pink / Blush',
    match: (hex) => /^#(f9a8|fbb6|f472|ec48|be18|fb7|fda4|fce7|fce)/i.test(hex) || isInRange(hex, [330, 360], 30, 60),
    bottoms: [
      { color: '#1D4ED8', label: 'Blue Jeans', hex: '#1D4ED8' },
      { color: '#FFFFFF', label: 'White Trousers', hex: '#FFFFFF' },
      { color: '#1F2937', label: 'Black Pants', hex: '#1F2937' },
      { color: '#D4B896', label: 'Beige Trousers', hex: '#D4B896' },
    ],
  },
  {
    name: 'White / Cream / Off-White',
    match: (hex) => isLight(hex, 90),
    bottoms: [
      { color: '#1F2937', label: 'Black Trousers', hex: '#1F2937' },
      { color: '#1D4ED8', label: 'Blue Jeans', hex: '#1D4ED8' },
      { color: '#D4B896', label: 'Beige Pants', hex: '#D4B896' },
      { color: '#4B5320', label: 'Olive-Green Trousers', hex: '#4B5320' },
    ],
  },
  {
    name: 'Black / Dark',
    match: (hex) => isDark(hex, 30),
    bottoms: [
      { color: '#1D4ED8', label: 'Blue Jeans', hex: '#1D4ED8' },
      { color: '#FFFFFF', label: 'White Trousers', hex: '#FFFFFF' },
      { color: '#6B7280', label: 'Grey Pants', hex: '#6B7280' },
      { color: '#D4B896', label: 'Beige Trousers', hex: '#D4B896' },
    ],
  },
  {
    name: 'Blue / Navy / Denim',
    match: (hex) => isInRange(hex, [200, 250], 30, 80),
    bottoms: [
      { color: '#F5F5DC', label: 'Beige Chinos', hex: '#F5F5DC' },
      { color: '#FFFFFF', label: 'White Pants', hex: '#FFFFFF' },
      { color: '#1F2937', label: 'Dark Trousers', hex: '#1F2937' },
      { color: '#6B7280', label: 'Grey Jeans', hex: '#6B7280' },
    ],
  },
  {
    name: 'Red / Coral / Orange',
    match: (hex) => isInRange(hex, [0, 30], 40, 80),
    bottoms: [
      { color: '#1F2937', label: 'Black Pants', hex: '#1F2937' },
      { color: '#F5F5DC', label: 'Beige Trousers', hex: '#F5F5DC' },
      { color: '#1D4ED8', label: 'Blue Jeans', hex: '#1D4ED8' },
      { color: '#FFFFFF', label: 'White Trousers', hex: '#FFFFFF' },
    ],
  },
  {
    name: 'Green / Olive',
    match: (hex) => isInRange(hex, [80, 160], 20, 70),
    bottoms: [
      { color: '#D4B896', label: 'Beige Pants', hex: '#D4B896' },
      { color: '#1F2937', label: 'Black Trousers', hex: '#1F2937' },
      { color: '#FFFFFF', label: 'White Pants', hex: '#FFFFFF' },
      { color: '#8B4513', label: 'Brown Trousers', hex: '#8B4513' },
    ],
  },
  {
    name: 'Yellow / Mustard',
    match: (hex) => isInRange(hex, [40, 65], 50, 90),
    bottoms: [
      { color: '#1F2937', label: 'Black Pants', hex: '#1F2937' },
      { color: '#FFFFFF', label: 'White Trousers', hex: '#FFFFFF' },
      { color: '#1D4ED8', label: 'Blue Jeans', hex: '#1D4ED8' },
      { color: '#6B7280', label: 'Grey Pants', hex: '#6B7280' },
    ],
  },
  {
    name: 'Purple / Lavender / Violet',
    match: (hex) => isInRange(hex, [260, 310], 20, 80),
    bottoms: [
      { color: '#1F2937', label: 'Black Pants', hex: '#1F2937' },
      { color: '#FFFFFF', label: 'White Trousers', hex: '#FFFFFF' },
      { color: '#D4B896', label: 'Beige Pants', hex: '#D4B896' },
      { color: '#6B7280', label: 'Grey Jeans', hex: '#6B7280' },
    ],
  },
];

// Default fallback
const defaultBottoms = [
  { color: '#1D4ED8', label: 'Blue Jeans', hex: '#1D4ED8' },
  { color: '#1F2937', label: 'Black Pants', hex: '#1F2937' },
  { color: '#D4B896', label: 'Beige Trousers', hex: '#D4B896' },
  { color: '#FFFFFF', label: 'White Trousers', hex: '#FFFFFF' },
];

// Hex → HSL helpers
function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      default: h = ((r - g) / d + 4) / 6;
    }
  }
  return [h * 360, s * 100, l * 100];
}

function isInRange(hex, [hMin, hMax], sMin, lMin) {
  try {
    const [h, s, l] = hexToHsl(hex);
    return h >= hMin && h <= hMax && s >= sMin && l >= lMin;
  } catch { return false; }
}

function isLight(hex, threshold) {
  try { return hexToHsl(hex)[2] >= threshold; } catch { return false; }
}

function isDark(hex, threshold) {
  try { return hexToHsl(hex)[2] <= threshold; } catch { return false; }
}

export function getMatchingBottoms(topColor) {
  if (!topColor) return defaultBottoms;
  for (const rule of colorRules) {
    if (rule.match(topColor)) return rule.bottoms;
  }
  return defaultBottoms;
}

export const DEMO_BOTTOMS = [
  { id: 'db1', name: 'Classic Blue Jeans', category: 'Bottoms', color: '#1D4ED8', imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=380&fit=crop', style: 'Casual', occasion: 'Casual' },
  { id: 'db2', name: 'Black Slim Trousers', category: 'Bottoms', color: '#1F2937', imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=300&h=380&fit=crop', style: 'Classic', occasion: 'Office' },
  { id: 'db3', name: 'Beige Chinos', category: 'Bottoms', color: '#D4B896', imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=380&fit=crop', style: 'Classic', occasion: 'Casual' },
  { id: 'db4', name: 'White Wide-Leg Pants', category: 'Bottoms', color: '#FFFFFF', imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=380&fit=crop', style: 'Elegant', occasion: 'Party' },
  { id: 'db5', name: 'Grey Joggers', category: 'Bottoms', color: '#6B7280', imageUrl: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=300&h=380&fit=crop', style: 'Streetwear', occasion: 'Casual' },
  { id: 'db6', name: 'Olive Cargo Pants', category: 'Bottoms', color: '#4B5320', imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&h=380&fit=crop', style: 'Streetwear', occasion: 'Casual' },
];

export const DEMO_SHOES = [
  { id: 'ds1', name: 'White Sneakers', color: '#FFFFFF', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
  { id: 'ds2', name: 'Black Heels', color: '#1F2937', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=200&fit=crop' },
  { id: 'ds3', name: 'Brown Loafers', color: '#8B4513', imageUrl: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=200&h=200&fit=crop' },
  { id: 'ds4', name: 'Nude Sandals', color: '#D4B896', imageUrl: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=200&h=200&fit=crop' },
];

export const DEMO_ACCESSORIES = [
  { id: 'da1', name: 'Gold Necklace', color: '#F59E0B', imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop' },
  { id: 'da2', name: 'Leather Handbag', color: '#8B4513', imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop' },
  { id: 'da3', name: 'Silver Earrings', color: '#C0C0C0', imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&fit=crop' },
];
