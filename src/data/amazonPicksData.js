// ============================================================================
// DYNAMIC AMAZON FASHION PICKS DATA LAYER
// Complete catalog across Women, Men, Girls, Boys, all categories & price bands.
// ============================================================================

import { buildAmazonSearchUrl } from './shopTheLookData.js';

export const AMAZON_FASHION_PICKS = [
  // --------------------------------------------------------------------------
  // WOMEN - KURTIS & SAREES & ETHNIC WEAR
  // --------------------------------------------------------------------------
  {
    id: 'ap-w-eth-1',
    title: 'BIBA Women Printed Cotton Straight Kurta Pant Set with Dupatta',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'kurtis-kurta',
    style: 'ethnic-wear',
    price: '₹1,499',
    originalPrice: '₹2,999',
    discount: '50% off',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80&auto=format&fit=crop',
    rating: 4.4,
    reviewsCount: 1840,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Teal Green', 'Mustard Yellow', 'Rani Pink'],
    amazonUrl: buildAmazonSearchUrl('biba women printed cotton kurta pant set with dupatta'),
    similarUrl: buildAmazonSearchUrl('women straight cotton kurta sets with dupatta'),
    similarItems: [
      { label: 'Anarkali Kurta Sets', query: 'women anarkali kurta pant set cotton' },
      { label: 'A-Line Floral Kurtis', query: 'women a line floral printed kurti' },
      { label: 'Chanderi Silk Kurtas', query: 'chanderi silk kurta pant set' },
    ],
    description: '100% pure combed cotton with detailed yoke embroidery and breathable straight-fit trousers.',
  },
  {
    id: 'ap-w-sar-2',
    title: 'Soru Fashion Women Banarasi Pure Soft Silk Zari Woven Saree',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'kurtis-kurta',
    style: 'traditional-sarees',
    price: '₹2,699',
    originalPrice: '₹5,999',
    discount: '55% off',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&auto=format&fit=crop',
    rating: 4.5,
    reviewsCount: 2190,
    sizes: ['Free Size (5.5m Saree + 0.8m Blouse)'],
    colors: ['Wine Gold', 'Royal Blue', 'Emerald Green'],
    amazonUrl: buildAmazonSearchUrl('banarasi soft silk zari saree for women wedding'),
    similarUrl: buildAmazonSearchUrl('kanjivaram silk sarees for women wedding'),
    similarItems: [
      { label: 'Kanjeevaram Bridal Sarees', query: 'kanjeevaram pure silk saree bridal' },
      { label: 'Organza Floral Sarees', query: 'organza floral print saree party wear' },
      { label: 'Chiffon Zari Sarees', query: 'chiffon festive saree with zari border' },
    ],
    description: 'Heavy brocade zari weaving on lustrous silk with contrasting rich pallu and matching unstitched blouse.',
  },
  {
    id: 'ap-w-fes-3',
    title: 'Aurelia Women Festive Foil Print Flared Anarkali Suit Set',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'kurtis-kurta',
    style: 'festive-looks',
    price: '₹1,899',
    originalPrice: '₹3,799',
    discount: '50% off',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80&auto=format&fit=crop',
    rating: 4.3,
    reviewsCount: 1120,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Maroon Gold', 'Deep Teal', 'Navy Blue'],
    amazonUrl: buildAmazonSearchUrl('aurelia women festive foil print anarkali suit set'),
    similarUrl: buildAmazonSearchUrl('festive anarkali suit sets for women'),
    similarItems: [
      { label: 'Sharara Festive Sets', query: 'women festive sharara suit set' },
      { label: 'Palazzo Festive Suits', query: 'festive palazzo suit women party' },
      { label: 'Angrakha Kurta Sets', query: 'angrakha festive kurta set women' },
    ],
    description: 'Gold foil print detailing on flared rayon silhouette with matching churidar and chiffon dupatta.',
  },
  {
    id: 'ap-w-eth-budget',
    title: 'GoSriKi Women Cotton Blend Straight Printed Kurti with Pant',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'kurtis-kurta',
    style: 'ethnic-wear',
    price: '₹699',
    originalPrice: '₹1,599',
    discount: '56% off',
    image: 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=800&q=80&auto=format&fit=crop',
    rating: 4.2,
    reviewsCount: 3410,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy Floral', 'Mustard Yellow', 'Sage Green'],
    amazonUrl: buildAmazonSearchUrl('gosriki women cotton blend straight kurti with pant'),
    similarUrl: buildAmazonSearchUrl('daily wear cotton kurtis for women under 999'),
    similarItems: [
      { label: 'Daily Cotton Kurtis', query: 'cotton kurtis under 500 women' },
      { label: 'Printed Kurti Combos', query: 'combo pack kurtis for women' },
      { label: 'Short Tunics', query: 'women short cotton kurtis tops' },
    ],
    description: 'Lightweight everyday cotton blend with geometric print and comfortable elasticated trouser waist.',
  },

  // --------------------------------------------------------------------------
  // WOMEN - DRESSES (Western, Casual, Party, Co-ords)
  // --------------------------------------------------------------------------
  {
    id: 'ap-w-drs-1',
    title: 'Berrylush Women Floral Print Georgette Tiered Fit & Flare Midi Dress',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'dresses',
    style: 'western',
    price: '₹999',
    originalPrice: '₹1,999',
    discount: '50% off',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&auto=format&fit=crop',
    rating: 4.4,
    reviewsCount: 2450,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blush Pink Floral', 'Sky Blue Floral', 'Navy Blue'],
    amazonUrl: buildAmazonSearchUrl('berrylush women floral georgette tiered midi dress'),
    similarUrl: buildAmazonSearchUrl('floral midi dresses for women summer western'),
    similarItems: [
      { label: 'A-Line Wrap Dresses', query: 'women a line floral wrap dress' },
      { label: 'Square Neck Sundresses', query: 'square neck floral sundress women' },
      { label: 'Puff Sleeve Dresses', query: 'puff sleeve tiered dress midi' },
    ],
    description: 'Breezy georgette with crepe lining, flattering cinched waist and tiered ruffled hemline.',
  },
  {
    id: 'ap-w-pty-2',
    title: 'Miss Chase Women Sequin Embroidered Bodycon Evening Party Dress',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'dresses',
    style: 'party-wear',
    price: '₹1,899',
    originalPrice: '₹3,999',
    discount: '53% off',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80&auto=format&fit=crop',
    rating: 4.4,
    reviewsCount: 1680,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Midnight Black', 'Metallic Silver', 'Emerald Green'],
    amazonUrl: buildAmazonSearchUrl('miss chase women sequin bodycon party dress evening'),
    similarUrl: buildAmazonSearchUrl('women cocktail evening party dresses sequin'),
    similarItems: [
      { label: 'Cowl Neck Satin Dresses', query: 'women cowl neck satin slip party dress' },
      { label: 'Velvet Evening Gowns', query: 'velvet bodycon evening dress women' },
      { label: 'One Shoulder Dresses', query: 'one shoulder party dress women' },
    ],
    description: 'Shimmering micro-sequins on high-stretch knit with concealed back zip and flattering slit.',
  },
  {
    id: 'ap-w-crd-3',
    title: 'Harpa Women Pastel Textured Linen Blend Crop Top & Wide Palazzo Set',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'dresses',
    style: 'co-ord-sets',
    price: '₹1,499',
    originalPrice: '₹2,999',
    discount: '50% off',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80&auto=format&fit=crop',
    rating: 4.3,
    reviewsCount: 920,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Sage Mint', 'Buttercup Yellow', 'Peach Orange'],
    amazonUrl: buildAmazonSearchUrl('harpa women linen crop top and palazzo co ord set'),
    similarUrl: buildAmazonSearchUrl('women two piece co ord sets matching summer'),
    similarItems: [
      { label: 'Blazer & Shorts Sets', query: 'women blazer shorts co ord set' },
      { label: 'Printed Resort Sets', query: 'women printed resort matching set' },
      { label: 'Ribbed Knit Co-ords', query: 'women ribbed knit co ord set' },
    ],
    description: 'Coordinated two-piece set in breathable textured linen blend with stretch back and side pockets.',
  },

  // --------------------------------------------------------------------------
  // WOMEN - JEANS & DENIM (Casual, Street Style, College)
  // --------------------------------------------------------------------------
  {
    id: 'ap-w-jns-1',
    title: "Levi's Women 711 Skinny Fit High-Rise Stretch Denim Jeans",
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'jeans-denim',
    style: 'casual',
    price: '₹2,199',
    originalPrice: '₹3,999',
    discount: '45% off',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&auto=format&fit=crop',
    rating: 4.5,
    reviewsCount: 3820,
    sizes: ['26', '28', '30', '32', '34'],
    colors: ['Dark Indigo', 'Mid Vintage Blue', 'Washed Black'],
    amazonUrl: buildAmazonSearchUrl('levis women 711 skinny fit high rise jeans'),
    similarUrl: buildAmazonSearchUrl('levis jeans for women high rise stretch'),
    similarItems: [
      { label: 'Levi 721 High Rise Skinny', query: 'levis 721 high rise skinny jeans women' },
      { label: 'Mom Fit Denim', query: 'women mom fit high waist denim jeans' },
      { label: 'Wide Leg Baggy Jeans', query: 'women wide leg high waist jeans denim' },
    ],
    description: 'Iconic Levi’s stretch denim engineered to sculpt and hold. Classic five-pocket styling.',
  },
  {
    id: 'ap-w-str-jns-2',
    title: 'Kotty Women High-Waist Wide-Leg Multi-Pocket Utility Cargo Jeans',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'jeans-denim',
    style: 'street-style',
    price: '₹1,099',
    originalPrice: '₹2,499',
    discount: '56% off',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop',
    rating: 4.3,
    reviewsCount: 1410,
    sizes: ['26', '28', '30', '32'],
    colors: ['Washed Black', 'Vintage Denim Blue', 'Olive Khaki'],
    amazonUrl: buildAmazonSearchUrl('kotty women high waist wide leg cargo jeans'),
    similarUrl: buildAmazonSearchUrl('women streetwear cargo pants wide leg denim'),
    similarItems: [
      { label: 'Baggy Parachute Pants', query: 'women baggy parachute cargo pants' },
      { label: 'Carpenter Jeans', query: 'women high rise carpenter jeans' },
      { label: 'Distressed Boyfriend Jeans', query: 'women distressed boyfriend jeans' },
    ],
    description: 'Heavyweight rigid cotton twill with deep utilitarian flap pockets and relaxed wide legs.',
  },

  // --------------------------------------------------------------------------
  // WOMEN - TOPS & SHIRTS (Office, College, Casual)
  // --------------------------------------------------------------------------
  {
    id: 'ap-w-top-1',
    title: 'Allen Solly Women Cotton Regular Fit Crisp Formal Office Shirt',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'tops-shirts',
    style: 'office-wear',
    price: '₹1,199',
    originalPrice: '₹2,299',
    discount: '48% off',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80&auto=format&fit=crop',
    rating: 4.4,
    reviewsCount: 1950,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pure White', 'Powder Blue', 'Soft Pink'],
    amazonUrl: buildAmazonSearchUrl('allen solly women cotton formal shirt office wear'),
    similarUrl: buildAmazonSearchUrl('women formal shirts office cotton slim fit'),
    similarItems: [
      { label: 'French Cuff Work Shirts', query: 'women formal shirt with french cuff' },
      { label: 'Silk Satin Blouses', query: 'women satin formal button down blouse' },
      { label: 'Peplum Formal Tops', query: 'women formal peplum top office wear' },
    ],
    description: 'Premium combed cotton with easy-care wrinkle resistance and clean spread collar.',
  },
  {
    id: 'ap-w-top-2',
    title: 'Bewakoof Women Oversized 100% Cotton Graphic Campus Sweatshirt',
    gender: 'Women',
    ageGroup: 'Teen 13-17',
    category: 'tops-shirts',
    style: 'college-outfits',
    price: '₹799',
    originalPrice: '₹1,599',
    discount: '50% off',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80&auto=format&fit=crop',
    rating: 4.4,
    reviewsCount: 2890,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Oatmeal Heather', 'Olive Green', 'Baby Pink'],
    amazonUrl: buildAmazonSearchUrl('bewakoof women oversized graphic cotton sweatshirt'),
    similarUrl: buildAmazonSearchUrl('women college oversized sweatshirts aesthetic'),
    similarItems: [
      { label: 'Crop College Hoodies', query: 'women crop hoodie college casual' },
      { label: 'Graphic Cotton Tees', query: 'women oversized vintage graphic tee' },
      { label: 'Varsity Jackets', query: 'women college varsity bomber jacket' },
    ],
    description: 'Heavyweight bio-washed 280 GSM cotton fleece with ribbed drop-shoulder design.',
  },

  // --------------------------------------------------------------------------
  // WOMEN - SHOES & SNEAKERS
  // --------------------------------------------------------------------------
  {
    id: 'ap-w-sh-1',
    title: 'Bata Women Formal Leatherette Block Heel Work Pumps (2 Inch)',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'shoes-sneakers',
    style: 'office-wear',
    price: '₹999',
    originalPrice: '₹1,999',
    discount: '50% off',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80&auto=format&fit=crop',
    rating: 4.3,
    reviewsCount: 3120,
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    colors: ['Classic Black', 'Nude Blush', 'Deep Tan'],
    amazonUrl: buildAmazonSearchUrl('bata women formal block heel pumps office wear'),
    similarUrl: buildAmazonSearchUrl('women formal block heel pumps comfortable'),
    similarItems: [
      { label: 'Pointed Toe Work Loafers', query: 'women pointed toe leather loafers' },
      { label: 'Kitten Heel Pumps', query: 'women kitten heel pointed court shoes' },
      { label: 'Comfort Wedge Shoes', query: 'women formal comfort wedge shoes' },
    ],
    description: 'Cushioned memory insole with anti-skid rubber outsole and sturdy 2-inch block heel.',
  },
  {
    id: 'ap-w-sh-2',
    title: 'Red Tape Women Clean White Minimalist Walking & Casual Sneakers',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'shoes-sneakers',
    style: 'casual',
    price: '₹1,299',
    originalPrice: '₹4,999',
    discount: '74% off',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop',
    rating: 4.4,
    reviewsCount: 5410,
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    colors: ['All White', 'White & Rose Gold', 'White with Green Heel'],
    amazonUrl: buildAmazonSearchUrl('red tape women white casual sneakers shoes lace up'),
    similarUrl: buildAmazonSearchUrl('white casual sneakers for women memory foam'),
    similarItems: [
      { label: 'Platform Chunky Sneakers', query: 'women chunky platform sneakers retro' },
      { label: 'Canvas Slip-On Trainers', query: 'women slip on canvas casual shoes' },
      { label: 'Mesh Running Shoes', query: 'women lightweight mesh running shoes' },
    ],
    description: 'High-density memory foam footbed with durable synthetic leather upper that wipes clean easily.',
  },
  {
    id: 'ap-w-sh-3',
    title: 'Catwalk Women Metallic Strappy Stiletto Evening Party Heels (3.5 Inch)',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'shoes-sneakers',
    style: 'party-wear',
    price: '₹1,799',
    originalPrice: '₹3,499',
    discount: '49% off',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80&auto=format&fit=crop',
    rating: 4.2,
    reviewsCount: 890,
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    colors: ['Metallic Silver', 'Shimmering Gold', 'Jet Black'],
    amazonUrl: buildAmazonSearchUrl('catwalk women metallic strappy stiletto heels party'),
    similarUrl: buildAmazonSearchUrl('women stiletto heels metallic evening party sandals'),
    similarItems: [
      { label: 'Clear PVC Heels', query: 'clear strap stiletto party heels women' },
      { label: 'Pointed Court Pumps', query: 'pointed toe stiletto court pumps women' },
      { label: 'Ankle Tie Lace Heels', query: 'ankle wrap lace up stiletto heels' },
    ],
    description: 'Sleek cross-strap silhouette with anti-slip rubber tipped stiletto heel and padded insole.',
  },

  // --------------------------------------------------------------------------
  // WOMEN - BAGS & ACCESSORIES (Handbags, Watches, Jewellery)
  // --------------------------------------------------------------------------
  {
    id: 'ap-w-bag-1',
    title: 'Lavie Women Betula Faux Leather Structured Top-Handle Laptop Tote Bag',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'bags-accessories',
    style: 'office-wear',
    price: '₹1,499',
    originalPrice: '₹3,999',
    discount: '62% off',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop',
    rating: 4.5,
    reviewsCount: 3120,
    sizes: ['Large (38 x 28 x 12 cm)'],
    colors: ['Tan Brown', 'Classic Black', 'Muted Grey'],
    amazonUrl: buildAmazonSearchUrl('lavie women structured tote bag top handle laptop'),
    similarUrl: buildAmazonSearchUrl('women formal laptop tote handbags leather'),
    similarItems: [
      { label: 'Satchel Handbags', query: 'women formal satchel shoulder handbag' },
      { label: 'Shoulder Baguette Bags', query: 'women baguette shoulder bag leather' },
      { label: 'Crossbody Hobo Bags', query: 'women hobo leather shoulder handbag' },
    ],
    description: 'Scratch-resistant saffiano vegan leather with dedicated padded 14-inch laptop divider.',
  },
  {
    id: 'ap-w-bag-2',
    title: 'ZOUK Women Handmade Vegan Leather Floral Printed Crossbody Bag',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'bags-accessories',
    style: 'casual',
    price: '₹1,299',
    originalPrice: '₹2,699',
    discount: '52% off',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80&auto=format&fit=crop',
    rating: 4.6,
    reviewsCount: 1940,
    sizes: ['Medium (24 x 18 x 7 cm)'],
    colors: ['Mughal Motif Floral', 'Ikat Chevron', 'Mandala Black'],
    amazonUrl: buildAmazonSearchUrl('zouk women vegan leather printed crossbody bag'),
    similarUrl: buildAmazonSearchUrl('women vegan leather crossbody sling bags stylish'),
    similarItems: [
      { label: 'Half-Moon Saddle Bags', query: 'half moon saddle crossbody bag women' },
      { label: 'Canvas Everyday Totes', query: 'women organic canvas shoulder tote' },
      { label: 'Mini Sling Pouches', query: 'women small mobile phone sling bag' },
    ],
    description: 'PeTA approved 100% vegan leather with Indian artisan printed fabric and brass metal zippers.',
  },
  {
    id: 'ap-w-wat-3',
    title: 'Fastrack Analog Rose Gold Stainless Steel Mesh Watch for Women',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'bags-accessories',
    style: 'western',
    price: '₹1,595',
    originalPrice: '₹2,495',
    discount: '36% off',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80&auto=format&fit=crop',
    rating: 4.4,
    reviewsCount: 2650,
    sizes: ['32mm Dial'],
    colors: ['Rose Gold White Dial', 'Silver Grey', 'Matte Black'],
    amazonUrl: buildAmazonSearchUrl('fastrack analog watch for women rose gold mesh strap'),
    similarUrl: buildAmazonSearchUrl('women analog watches minimalist rose gold mesh'),
    similarItems: [
      { label: 'Titan Raga Watches', query: 'titan raga analog watch for women' },
      { label: 'Fossil Leather Watches', query: 'fossil analog leather watch women' },
      { label: 'Ceramic Dial Watches', query: 'women ceramic bracelet analog watch' },
    ],
    description: 'Japanese quartz movement with scratch-resistant mineral crystal and 30m water resistance.',
  },

  // --------------------------------------------------------------------------
  // WOMEN - ATHLEISURE & WINTER & SUMMER
  // --------------------------------------------------------------------------
  {
    id: 'ap-w-ath-1',
    title: 'Clovia Women High-Waist Seamless Activewear Tummy Control Leggings',
    gender: 'Women',
    ageGroup: 'Adult 18-35',
    category: 'summer-outfits',
    style: 'athleisure',
    price: '₹799',
    originalPrice: '₹1,699',
    discount: '53% off',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80&auto=format&fit=crop',
    rating: 4.4,
    reviewsCount: 2210,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal Grey', 'Midnight Black', 'Teal Blue'],
    amazonUrl: buildAmazonSearchUrl('clovia women high waist seamless gym leggings'),
    similarUrl: buildAmazonSearchUrl('women gym workout leggings high waist seamless'),
    similarItems: [
      { label: 'Workout Sports Bras', query: 'women padded high impact sports bra' },
      { label: 'Gym Activewear Sets', query: 'women workout activewear set gym' },
      { label: 'Athletic Joggers', query: 'women lightweight athletic joggers' },
    ],
    description: 'Squat-proof 4-way stretch fabric with sweat-wicking dry-fit yarn and wide non-roll waistband.',
  },

  // --------------------------------------------------------------------------
  // MEN - CURATED AMAZON PRODUCTS
  // --------------------------------------------------------------------------
  {
    id: 'ap-m-sh-1',
    title: 'Van Heusen Men 100% Cotton Regular Fit Formal Office Dress Shirt',
    gender: 'Men',
    ageGroup: 'Adult 18-35',
    category: 'tops-shirts',
    style: 'office-wear',
    price: '₹1,299',
    originalPrice: '₹2,499',
    discount: '48% off',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80&auto=format&fit=crop',
    rating: 4.4,
    reviewsCount: 3120,
    sizes: ['38', '40', '42', '44'],
    colors: ['Crisp White', 'Sky Blue', 'French Blue'],
    amazonUrl: buildAmazonSearchUrl('van heusen men cotton formal shirt office slim fit'),
    similarUrl: buildAmazonSearchUrl('men pure cotton formal shirts office wear'),
    similarItems: [
      { label: 'French Cuff Shirts', query: 'men formal shirt french cuff white' },
      { label: 'Striped Dress Shirts', query: 'men striped formal shirt business' },
      { label: 'Linen Casual Shirts', query: 'men 100 pure linen shirt casual' },
    ],
    description: '100% long-staple combed cotton with easy-iron technology and reinforced spread collar.',
  },
  {
    id: 'ap-m-jns-2',
    title: "Levi's Men 511 Slim Fit Stretch Denim Jeans",
    gender: 'Men',
    ageGroup: 'Adult 18-35',
    category: 'jeans-denim',
    style: 'casual',
    price: '₹2,399',
    originalPrice: '₹4,499',
    discount: '47% off',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&auto=format&fit=crop',
    rating: 4.5,
    reviewsCount: 4890,
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Dark Wash Indigo', 'Mid Blue Vintage', 'Solid Black'],
    amazonUrl: buildAmazonSearchUrl('levis men 511 slim fit stretch jeans'),
    similarUrl: buildAmazonSearchUrl('men slim fit stretch denim jeans levis'),
    similarItems: [
      { label: '512 Slim Tapered Jeans', query: 'levis 512 slim taper jeans men' },
      { label: 'Stretch Chino Trousers', query: 'men slim fit stretch chino pants' },
      { label: 'Regular Fit Denims', query: 'men regular fit straight denim jeans' },
    ],
    description: 'Classic 5-pocket denim with extra stretch built in for all-day comfort and mobility.',
  },
  {
    id: 'ap-m-eth-3',
    title: 'Manyavar Men Silk Blend Embroidered Kurta Churidar Festive Set',
    gender: 'Men',
    ageGroup: 'Adult 18-35',
    category: 'kurtis-kurta',
    style: 'ethnic-wear',
    price: '₹2,999',
    originalPrice: '₹6,999',
    discount: '57% off',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&auto=format&fit=crop',
    rating: 4.5,
    reviewsCount: 1650,
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    colors: ['Ivory Gold', 'Maroon & Zari', 'Navy Blue'],
    amazonUrl: buildAmazonSearchUrl('manyavar men kurta pyjama set wedding ethnic'),
    similarUrl: buildAmazonSearchUrl('men ethnic wedding kurta pyjama sets'),
    similarItems: [
      { label: 'Nehru Jacket Sets', query: 'men kurta pyjama with nehru jacket set' },
      { label: 'Indo Western Sherwanis', query: 'men indo western sherwani suit wedding' },
      { label: 'Pure Cotton Kurtas', query: 'men pure cotton short kurta casual' },
    ],
    description: 'Royal brocade jacquard collar with hand-embroidered threadwork and drawcord churidar.',
  },
  {
    id: 'ap-m-sneaker-4',
    title: 'Puma Men Smash v2 Leather Low-Top Casual White Sneakers',
    gender: 'Men',
    ageGroup: 'Adult 18-35',
    category: 'shoes-sneakers',
    style: 'casual',
    price: '₹1,799',
    originalPrice: '₹3,999',
    discount: '55% off',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop',
    rating: 4.4,
    reviewsCount: 7120,
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: ['All White', 'White & Black Formstrip', 'Navy Blue'],
    amazonUrl: buildAmazonSearchUrl('puma men smash v2 white leather casual sneakers'),
    similarUrl: buildAmazonSearchUrl('men white leather casual sneakers shoes'),
    similarItems: [
      { label: 'Canvas Low Tops', query: 'men canvas casual low top sneakers' },
      { label: 'Casual Penny Loafers', query: 'men casual leather penny loafers' },
      { label: 'Retro Suede Trainers', query: 'men retro suede casual trainers' },
    ],
    description: 'Soft genuine leather upper with Puma SoftFoam+ comfort insert and durable herringbone rubber grip.',
  },

  // --------------------------------------------------------------------------
  // GIRLS - CURATED PRODUCTS
  // --------------------------------------------------------------------------
  {
    id: 'ap-g-eth-1',
    title: 'Hopscotch Girls Brocade Festive Flared Lehenga Choli with Dupatta',
    gender: 'Girl',
    ageGroup: '6-12',
    category: 'kurtis-kurta',
    style: 'ethnic-wear',
    price: '₹1,299',
    originalPrice: '₹2,899',
    discount: '55% off',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&q=80&auto=format&fit=crop',
    rating: 4.4,
    reviewsCount: 820,
    sizes: ['4-5 Years', '6-7 Years', '8-9 Years', '10-11 Years'],
    colors: ['Rani Pink & Gold', 'Yellow & Peacock Blue'],
    amazonUrl: buildAmazonSearchUrl('hopscotch girls brocade lehenga choli set festive'),
    similarUrl: buildAmazonSearchUrl('girls ethnic festive lehenga choli sets kids'),
    similarItems: [
      { label: 'Girls Anarkali Frocks', query: 'girls anarkali suit ethnic dress' },
      { label: 'Sharara Sets for Girls', query: 'girls ethnic sharara kurta set' },
      { label: 'Pattu Pavadai Sets', query: 'kids pattu pavadai silk lehenga girls' },
    ],
    description: 'Woven brocade lehenga with soft 100% cotton lining that prevents itching during long events.',
  },
  {
    id: 'ap-g-drs-2',
    title: 'Naughty Ninos Girls 100% Cotton Flared Floral Print Summer Dress',
    gender: 'Girl',
    ageGroup: '6-12',
    category: 'dresses',
    style: 'western',
    price: '₹699',
    originalPrice: '₹1,499',
    discount: '53% off',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80&auto=format&fit=crop',
    rating: 4.5,
    reviewsCount: 1150,
    sizes: ['3-4 Years', '5-6 Years', '7-8 Years', '9-10 Years'],
    colors: ['Blush Pink Floral', 'Sky Blue Floral', 'Sunny Yellow'],
    amazonUrl: buildAmazonSearchUrl('girls 100 cotton flared floral print summer frock dress'),
    similarUrl: buildAmazonSearchUrl('girls casual cotton dresses frocks summer'),
    similarItems: [
      { label: 'Party Wear Frocks', query: 'girls net party wear frock dress' },
      { label: 'Denim Pinafore Dresses', query: 'girls denim dungaree pinafore dress' },
      { label: 'Tiered Casual Dresses', query: 'girls tiered casual summer dress' },
    ],
    description: 'Pure breathable cotton with cute ruffle cap sleeves and tie-up back sash for a snug fit.',
  },

  // --------------------------------------------------------------------------
  // BOYS - CURATED PRODUCTS
  // --------------------------------------------------------------------------
  {
    id: 'ap-b-eth-1',
    title: 'AJ DEZINES Boys Silk Blend Kurta Pyjama & Nehru Jacket Set',
    gender: 'Boy',
    ageGroup: '6-12',
    category: 'kurtis-kurta',
    style: 'ethnic-wear',
    price: '₹1,399',
    originalPrice: '₹2,999',
    discount: '53% off',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80&auto=format&fit=crop',
    rating: 4.4,
    reviewsCount: 940,
    sizes: ['4-5 Years', '6-7 Years', '8-9 Years', '10-11 Years'],
    colors: ['Mustard & Navy', 'Maroon & Cream', 'Mint Green'],
    amazonUrl: buildAmazonSearchUrl('aj dezines boys kurta pyjama nehru jacket set ethnic'),
    similarUrl: buildAmazonSearchUrl('boys ethnic festive kurta pyjama jacket sets kids'),
    similarItems: [
      { label: 'Dhoti Kurta Sets', query: 'boys dhoti kurta ethnic set' },
      { label: 'Indo-Western Suits', query: 'boys indo western sherwani suit' },
      { label: 'Cotton Pathani Suits', query: 'boys cotton pathani suit' },
    ],
    description: 'Cotton-silk blend that is lightweight and non-itchy with floral jacquard waistcoat.',
  },
  {
    id: 'ap-b-cas-2',
    title: 'U.S. Polo Assn. Boys Cotton Regular Fit Checked Casual Shirt',
    gender: 'Boy',
    ageGroup: '6-12',
    category: 'tops-shirts',
    style: 'casual',
    price: '₹799',
    originalPrice: '₹1,599',
    discount: '50% off',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80&auto=format&fit=crop',
    rating: 4.4,
    reviewsCount: 1420,
    sizes: ['5-6 Years', '7-8 Years', '9-10 Years', '11-12 Years'],
    colors: ['Red & Navy Check', 'Blue & White Check'],
    amazonUrl: buildAmazonSearchUrl('us polo assn boys cotton casual checked shirt'),
    similarUrl: buildAmazonSearchUrl('boys cotton casual shirts regular fit kids'),
    similarItems: [
      { label: 'Graphic Cotton T-Shirts', query: 'boys cotton graphic print t shirts' },
      { label: 'Denim Casual Shirts', query: 'boys casual denim shirt button down' },
      { label: 'Polo Neck T-Shirts', query: 'boys solid cotton polo t shirt' },
    ],
    description: '100% pre-washed breathable cotton with iconic embroidered logo on the chest pocket.',
  },
];

// Helper to filter and search Amazon picks dynamically with robust fallbacks
export const getFilteredAmazonPicks = ({
  gender = 'Women',
  ageGroup = 'Adult 18-35',
  style = '',
  category = '',
  priceRange = 'all',
}) => {
  const normGender = (gender || 'Women').trim().toLowerCase();

  // 1. Filter by gender
  let pool = AMAZON_FASHION_PICKS.filter(
    (p) => p.gender.toLowerCase() === normGender
  );

  if (pool.length === 0) {
    pool = AMAZON_FASHION_PICKS.filter((p) => p.gender === 'Women');
  }

  // 2. Filter by style if chosen
  let filtered = pool;
  if (style) {
    const styleMatches = filtered.filter(
      (p) =>
        p.style === style ||
        (p.styleAliases && p.styleAliases.includes(style))
    );
    if (styleMatches.length > 0) {
      filtered = styleMatches;
    }
  }

  // 3. Filter by category if chosen
  if (category) {
    const catMatches = filtered.filter((p) => p.category === category);
    if (catMatches.length > 0) {
      filtered = catMatches;
    }
  }

  // 4. Filter by price range
  const parseNumPrice = (pStr) => {
    const cleaned = String(pStr || '').replace(/[^\d.]/g, '');
    return Number(cleaned) || 0;
  };

  if (priceRange !== 'all') {
    const priceMatches = filtered.filter((p) => {
      const amt = parseNumPrice(p.price);
      if (priceRange === '0-999') return amt < 1000;
      if (priceRange === '1000-2499') return amt >= 1000 && amt <= 2499;
      if (priceRange === '2500-4999') return amt >= 2500 && amt <= 4999;
      if (priceRange === '5000+') return amt >= 5000;
      return true;
    });

    if (priceMatches.length > 0) {
      filtered = priceMatches;
    }
  }

  // Fallback safety: NEVER return an empty list unnecessarily
  let isFallback = false;
  if (filtered.length === 0) {
    isFallback = true;
    filtered = pool.slice(0, 8);
  }

  return {
    products: filtered,
    isFallback,
  };
};
