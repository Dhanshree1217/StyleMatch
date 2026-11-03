const fs = require('fs');
const file = './src/pages/MyColorProfile.jsx';
let src = fs.readFileSync(file, 'utf8');

const newGallery = `const OUTFIT_GALLERY = {
  'Navy Blue':     [
    { img:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80', title:'Navy Blazer', category:'Office' },
    { img:'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80', title:'Navy Formal Shirt', category:'Office' },
    { img:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80', title:'Navy Salwar Suit', category:'Traditional' },
  ],
  'Emerald Green': [
    { img:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80', title:'Emerald Saree', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=600&q=80', title:'Emerald Kurti', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80', title:'Emerald Formal Suit', category:'Office' },
  ],
  'Burgundy':      [
    { img:'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&q=80', title:'Burgundy Saree', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80', title:'Burgundy Evening Gown', category:'Party' },
    { img:'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80', title:'Burgundy Midi Dress', category:'Western' },
  ],
  'Lavender':      [
    { img:'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80', title:'Lavender Co-ord Set', category:'Western' },
    { img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80', title:'Lavender Casual Set', category:'College' },
    { img:'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80', title:'Lavender Party Co-ord', category:'Party' },
  ],
  'Soft Pink':     [
    { img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', title:'Pink Lehenga', category:'Wedding' },
    { img:'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&q=80', title:'Pink Party Co-ord', category:'Party' },
    { img:'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80', title:'Pink Salwar Suit', category:'Traditional' },
  ],
  'Teal':          [
    { img:'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&q=80', title:'Teal Saree', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', title:'Teal Kurti', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80', title:'Teal Smart Casual', category:'Office' },
  ],
  'Royal Blue':    [
    { img:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80', title:'Royal Blue Blazer', category:'Office' },
    { img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80', title:'Royal Blue Dress', category:'Office' },
    { img:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80', title:'Royal Blue Salwar Suit', category:'Traditional' },
  ],
  'Rose Pink':     [
    { img:'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&q=80', title:'Rose Party Co-ord', category:'Party' },
    { img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', title:'Rose Lehenga', category:'Wedding' },
    { img:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80', title:'Rose Satin Dress', category:'Party' },
  ],
  'Plum':          [
    { img:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80', title:'Plum Evening Dress', category:'Party' },
    { img:'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&q=80', title:'Plum Sequin Dress', category:'Party' },
    { img:'https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?w=600&q=80', title:'Plum Saree', category:'Traditional' },
  ],
  'Emerald':       [
    { img:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80', title:'Emerald Saree', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=600&q=80', title:'Emerald Kurti', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80', title:'Emerald Dress', category:'Western' },
  ],
  'Peach':         [
    { img:'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80', title:'Peach Maxi Dress', category:'Western' },
    { img:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', title:'Peach Kurti', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80', title:'Peach Co-ord Set', category:'Western' },
  ],
  'Coral':         [
    { img:'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&q=80', title:'Coral Summer Dress', category:'Seasonal' },
    { img:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', title:'Coral Kurti', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80', title:'Coral Salwar Suit', category:'Traditional' },
  ],
  'Olive Green':   [
    { img:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80', title:'Olive Casual Look', category:'Western' },
    { img:'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600&q=80', title:'Olive Smart Casual', category:'Office' },
    { img:'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80', title:'Olive Jeans Look', category:'Western' },
  ],
  'Mustard':       [
    { img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80', title:'Mustard Co-ord Set', category:'Western' },
    { img:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', title:'Mustard Kurti', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&q=80', title:'Mustard Summer Dress', category:'Seasonal' },
  ],
  'Wine':          [
    { img:'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&q=80', title:'Wine Saree', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80', title:'Wine Midi Dress', category:'Western' },
    { img:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80', title:'Wine Evening Gown', category:'Party' },
  ],
  'Turquoise':     [
    { img:'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&q=80', title:'Turquoise Saree', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80', title:'Turquoise Co-ord Set', category:'Western' },
    { img:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', title:'Turquoise Kurti', category:'Traditional' },
  ],
  'Rust':          [
    { img:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80', title:'Rust Salwar Suit', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=600&q=80', title:'Rust Kurti', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80', title:'Rust Casual Look', category:'Western' },
  ],
  'Maroon':        [
    { img:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80', title:'Maroon Saree', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', title:'Maroon Lehenga', category:'Wedding' },
    { img:'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80', title:'Maroon Dress', category:'Western' },
  ],
  'Cream':         [
    { img:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80', title:'Cream Linen Dress', category:'Western' },
    { img:'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80', title:'Cream Minimal Look', category:'College' },
    { img:'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80', title:'Cream Lehenga', category:'Wedding' },
  ],
  'Terracotta':    [
    { img:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80', title:'Terracotta Salwar Suit', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', title:'Terracotta Kurti', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80', title:'Terracotta Casual', category:'Western' },
  ],
  'Warm Beige':    [
    { img:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80', title:'Beige Linen Dress', category:'Western' },
    { img:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80', title:'Beige Blazer', category:'Office' },
    { img:'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80', title:'Beige Minimal Look', category:'College' },
  ],
  'Deep Teal':     [
    { img:'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&q=80', title:'Deep Teal Saree', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80', title:'Teal Formal Dress', category:'Office' },
    { img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80', title:'Teal Smart Casual', category:'Office' },
  ],
  'White':         [
    { img:'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80', title:'White Formal Shirt', category:'Office' },
    { img:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80', title:'White Linen Dress', category:'Western' },
    { img:'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80', title:'White Minimal Look', category:'College' },
  ],
  'Cobalt Blue':   [
    { img:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80', title:'Cobalt Blue Blazer', category:'Office' },
    { img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80', title:'Cobalt Blue Dress', category:'Office' },
    { img:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80', title:'Cobalt Blue Salwar Suit', category:'Traditional' },
  ],
  'Orange':        [
    { img:'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&q=80', title:'Orange Summer Dress', category:'Seasonal' },
    { img:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80', title:'Orange Salwar Suit', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', title:'Orange Kurti', category:'Traditional' },
  ],
  'Magenta':       [
    { img:'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&q=80', title:'Magenta Party Co-ord', category:'Party' },
    { img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', title:'Magenta Lehenga', category:'Wedding' },
    { img:'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80', title:'Magenta Co-ord Set', category:'Western' },
  ],
  'Forest Green':  [
    { img:'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80', title:'Forest Green Suit', category:'Office' },
    { img:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80', title:'Forest Green Saree', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=600&q=80', title:'Forest Green Kurti', category:'Traditional' },
  ],
  'Bright Yellow': [
    { img:'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&q=80', title:'Yellow Summer Dress', category:'Seasonal' },
    { img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80', title:'Yellow Co-ord Set', category:'Western' },
    { img:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80', title:'Yellow Kurti', category:'Traditional' },
  ],
  'Fuchsia':       [
    { img:'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&q=80', title:'Fuchsia Party Co-ord', category:'Party' },
    { img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', title:'Fuchsia Lehenga', category:'Wedding' },
    { img:'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&q=80', title:'Fuchsia Sequin Dress', category:'Party' },
  ],
  'Gold':          [
    { img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', title:'Gold Lehenga', category:'Wedding' },
    { img:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80', title:'Gold Saree', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&q=80', title:'Gold Sequin Dress', category:'Party' },
  ],
  'Bright Red':    [
    { img:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80', title:'Red Saree', category:'Traditional' },
    { img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', title:'Red Lehenga', category:'Wedding' },
    { img:'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80', title:'Red Dress', category:'Western' },
  ],
  'Lime Green':    [
    { img:'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&q=80', title:'Lime Summer Dress', category:'Seasonal' },
    { img:'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80', title:'Lime Co-ord Set', category:'Western' },
    { img:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80', title:'Lime Casual Look', category:'College' },
  ],
  'Ivory':         [
    { img:'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80', title:'Ivory Lehenga', category:'Wedding' },
    { img:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80', title:'Ivory Linen Dress', category:'Western' },
    { img:'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80', title:'Ivory Minimal Look', category:'College' },
  ],
};`;

// Find and replace the OUTFIT_GALLERY block
const start = src.indexOf('const OUTFIT_GALLERY = {');
const end = src.indexOf('\n};', start) + 3;
if (start === -1) { console.error('OUTFIT_GALLERY not found'); process.exit(1); }
src = src.slice(0, start) + newGallery + src.slice(end);
fs.writeFileSync(file, src, 'utf8');
console.log('OUTFIT_GALLERY updated, length:', src.length);
