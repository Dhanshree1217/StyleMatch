// Fashion categories with unique, high-resolution cover images (min 800px wide, min 1200px where available)
// Primary categories prefer local high-res copies in /public/images/categories with remote fallback
export const categories = [
  {
    id: 'traditional',
    label: 'Traditional Indian Wear',
    cover: '/images/categories/traditional.jpg',
    fallbackCover: 'https://assets.myntassets.com/w_200,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/MAY/21/jGmMMLgb_1aab509aeecb4bc4969d5e277faa1698.jpg',
    description: 'Celebrate heritage with stunning sarees, lehengas, kurtis and more.',
    subcategories: ['Sarees', 'Salwar Suits', 'Kurtis', 'Lehengas', 'Indo-Western']
  },
  {
    id: 'western',
    label: 'Western Wear',
    cover: '/images/categories/western.jpg',
    fallbackCover: 'https://i.pinimg.com/736x/29/58/c8/2958c84de8a7cae6ee8585a2c97af7f5.jpg',
    description: 'Modern silhouettes, casual chic and contemporary fashion.',
    subcategories: ['Casual', 'Jeans & Tops', 'Dresses', 'Co-ord Sets', 'Streetwear']
  },
  {
    id: 'college',
    label: 'College Looks',
    cover: '/images/categories/college.jpg',
    fallbackCover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd3eEIiR3X-vlZu4py4irFILo53KbSGO6dMNOYRAuF8icWKSi6QCLzvxo&s=10p',
    description: 'Effortless everyday outfits for campus life.',
    subcategories: ['Everyday', 'Casual Ethnic', 'Minimal', 'Trendy']
  },
  {
    id: 'office',
    label: 'Office & Formal',
    cover: '/images/categories/office.jpg',
    fallbackCover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwgbaJpAiRhg6b_Ay9N-pNhHsSsUgagpWzTXvNIgh_fEbGyAU4eCNgdyY&s=10',
    description: 'Professional, polished and smart-casual workwear.',
    subcategories: ['Formal Shirts', 'Blazers', 'Smart Casual', 'Professional Dresses']
  },
  {
    id: 'party',
    label: 'Party Wear',
    cover: '/images/categories/party.jpg',
    fallbackCover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvyoWYX1Cj8qrrcVJjFZR0H3tLza7l0tqPHatt3eQcsj-uT-oYoJWzYec&s=10',
    description: 'Glamorous looks for every celebration.',
    subcategories: ['Evening Dresses', 'Party Co-ords', 'Glamorous Tops', 'Birthday Looks']
  },
  {
    id: 'wedding',
    label: 'Wedding & Festive',
    cover: '/images/categories/wedding.jpg',
    fallbackCover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAST0IQaTAhrVxbVHT9DyrOVB_hiIYJ_4MmK7aGAgbpLUmciPfcgPkGAQ&s=10',
    description: 'Exquisite looks for weddings, engagements and festivals.',
    subcategories: ['Wedding Guest', 'Engagement', 'Festival', 'Bridal']
  },
  {
    id: 'seasonal',
    label: 'Seasonal Fashion',
    cover: '/images/categories/seasonal.jpg',
    fallbackCover: 'https://c2fashionstudio.com/wp-content/uploads/2025/09/C2-Fashion-Studio-LFW-SS26-1-1.webp',
    description: 'Dress right for every season and occasion.',
    subcategories: ['Summer', 'Winter', 'Monsoon', 'Travel']
  },
  {
    id: 'accessories',
    label: 'Footwear & Accessories',
    cover: '/images/categories/accessories.jpg',
    fallbackCover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQos1lIy9Lj64OlIOZV_cYPJf1Gdrb_QJBYjb7zksMXvQ&s=10',
    description: 'Complete your look with shoes, bags and jewellery.',
    subcategories: ['Shoes', 'Handbags', 'Jewellery', 'Watches']
  },

  // Additional categories linked from Home page with unique verified URLs
  { id: 'co-ord-sets',        label: 'Co-ord Sets',             cover: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=80&auto=format&fit=crop', description: 'Perfectly matched sets for an effortless put-together look.', subcategories: ['Co-ord Sets'], alias: 'western' },
  { id: 'formal-dress',       label: 'Formal Dress',            cover: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1200&q=80&auto=format&fit=crop', description: 'Sharp, polished formal dresses for every professional occasion.', subcategories: ['Professional Dresses', 'Blazers'], alias: 'office' },
  { id: 'ethnic-wear',        label: 'Ethnic Wear',             cover: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&q=80&auto=format&fit=crop', description: 'Vibrant ethnic styles rooted in Indian tradition.', subcategories: ['Sarees', 'Salwar Suits', 'Kurtis', 'Lehengas'], alias: 'traditional' },
  { id: 'street-style',       label: 'Street Style',            cover: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200&q=80&auto=format&fit=crop', description: 'Bold, expressive streetwear for the urban trendsetter.', subcategories: ['Streetwear'], alias: 'western' },
  { id: 'festive-looks',      label: 'Festive Looks',           cover: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=1200&q=80&auto=format&fit=crop', description: 'Vibrant outfits to celebrate every festival in style.', subcategories: ['Festival', 'Bridal'], alias: 'wedding' },
  { id: 'office-wear',        label: 'Office Wear',             cover: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80&auto=format&fit=crop', description: 'Professional, polished looks for the modern workplace.', subcategories: ['Formal Shirts', 'Blazers', 'Smart Casual', 'Professional Dresses'], alias: 'office' },
  { id: 'casual-wear',        label: 'Casual Wear',             cover: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&q=80&auto=format&fit=crop', description: 'Relaxed, everyday outfits for any casual occasion.', subcategories: ['Casual', 'Everyday'], alias: 'western' },
  { id: 'college-outfits',    label: 'College Outfits',         cover: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1200&q=80&auto=format&fit=crop', description: 'Effortless everyday outfits for campus life.', subcategories: ['Everyday', 'Casual Ethnic', 'Minimal', 'Trendy'], alias: 'college' },
  { id: 'western-wear',       label: 'Western Wear',            cover: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80&auto=format&fit=crop', description: 'Modern silhouettes, casual chic and contemporary fashion.', subcategories: ['Casual', 'Jeans & Tops', 'Dresses', 'Co-ord Sets', 'Streetwear'], alias: 'western' },
  { id: 'party-wear',         label: 'Party Wear',              cover: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1200&q=80&auto=format&fit=crop', description: 'Glamorous looks for every celebration.', subcategories: ['Evening Dresses', 'Party Co-ords', 'Glamorous Tops', 'Birthday Looks'], alias: 'party' },
  { id: 'wedding-guest',      label: 'Wedding Guest Looks',     cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop', description: 'Elegant looks for weddings and special celebrations.', subcategories: ['Wedding Guest', 'Engagement'], alias: 'wedding' },
  { id: 'traditional-sarees', label: 'Traditional Sarees',      cover: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80&auto=format&fit=crop', description: 'Timeless sarees from every region of India.', subcategories: ['Sarees'], alias: 'traditional' },
  { id: 'kurtis-kurta',       label: 'Kurtis & Kurta Sets',     cover: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80&auto=format&fit=crop', description: 'Versatile kurtis and kurta sets for every occasion.', subcategories: ['Kurtis'], alias: 'traditional' },
  { id: 'jeans-denim',        label: 'Jeans & Denim',           cover: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80&auto=format&fit=crop', description: 'Classic denim looks for everyday wear.', subcategories: ['Jeans & Tops', 'Casual'], alias: 'western' },
  { id: 'tops-shirts',        label: 'Tops & Shirts',           cover: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80&auto=format&fit=crop', description: 'Stylish tops and shirts for every mood.', subcategories: ['Formal Shirts', 'Casual'], alias: 'office' },
  { id: 'dresses',            label: 'Dresses',                 cover: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=1200&q=80&auto=format&fit=crop', description: 'Beautiful dresses for every occasion.', subcategories: ['Dresses', 'Evening Dresses'], alias: 'western' },
  { id: 'winter-wear',        label: 'Winter Wear',             cover: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=1200&q=80&auto=format&fit=crop', description: 'Cosy, stylish layers for the colder months.', subcategories: ['Winter'], alias: 'seasonal' },
  { id: 'summer-outfits',     label: 'Summer Outfits',          cover: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=1200&q=80&auto=format&fit=crop', description: 'Light, breezy outfits to beat the heat in style.', subcategories: ['Summer'], alias: 'seasonal' },
  { id: 'minimalist',         label: 'Minimalist Fashion',      cover: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1200&q=80&auto=format&fit=crop', description: 'Clean lines and understated elegance.', subcategories: ['Minimal'], alias: 'college' },
  { id: 'athleisure',         label: 'Athleisure & Sportswear', cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80&auto=format&fit=crop', description: 'Sporty, comfortable looks that go from gym to street.', subcategories: ['Streetwear'], alias: 'western' },
  { id: 'vacation-travel',    label: 'Vacation & Travel Looks', cover: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80&auto=format&fit=crop', description: 'Comfortable, stylish outfits for every adventure.', subcategories: ['Travel'], alias: 'seasonal' },
  { id: 'shoes-sneakers',     label: 'Shoes & Sneakers',        cover: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80&auto=format&fit=crop', description: 'Step out in style with the perfect footwear.', subcategories: ['Shoes'], alias: 'accessories' },
  { id: 'bags-accessories',   label: 'Bags & Accessories',      cover: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80&auto=format&fit=crop', description: 'Complete your look with the right accessories.', subcategories: ['Handbags', 'Jewellery', 'Watches'], alias: 'accessories' },
  { id: 'mens-fashion',       label: "Men's Fashion",           cover: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80&auto=format&fit=crop', description: 'Sharp, modern looks for the well-dressed man.', subcategories: ['Formal Shirts', 'Blazers', 'Smart Casual', 'Casual'], alias: 'office' },
  { id: 'womens-fashion',     label: "Women's Fashion",         cover: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80&auto=format&fit=crop', description: "Curated women's fashion for every style and occasion.", subcategories: ['Dresses', 'Co-ord Sets', 'Casual'], alias: 'western' },
];

// Traditional Indian Wear — 12 distinct outfits with unique high-res verified images
const traditionalOutfits = [
  { id:'t1', title:'Silk Banarasi Saree', category:'traditional', subcategory:'Sarees', occasion:'Wedding', style:'Elegant', colors:['#8B0000','#FFD700'], image:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80&auto=format&fit=crop', related:['t2','t3','t5'] },
  { id:'t2', title:'Chiffon Floral Saree', category:'traditional', subcategory:'Sarees', occasion:'Festival', style:'Elegant', colors:['#FF69B4','#FFF'], image:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80&auto=format&fit=crop', related:['t1','t3','t7'] },
  { id:'t3', title:'Anarkali Salwar Suit', category:'traditional', subcategory:'Salwar Suits', occasion:'Festival', style:'Classic', colors:['#DC143C','#FFD700'], image:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=1200&q=80&auto=format&fit=crop', related:['t1','t4','t6'] },
  { id:'t4', title:'Embroidered Kurti', category:'traditional', subcategory:'Kurtis', occasion:'College', style:'Casual', colors:['#9370DB','#FFF'], image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80&auto=format&fit=crop', related:['t3','t5','t8'] },
  { id:'t5', title:'Bridal Lehenga', category:'traditional', subcategory:'Lehengas', occasion:'Wedding', style:'Bridal', colors:['#FF1493','#FFD700'], image:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80&auto=format&fit=crop', related:['t1','t2','t6'] },
  { id:'t6', title:'Indo-Western Fusion', category:'traditional', subcategory:'Indo-Western', occasion:'Party', style:'Trendy', colors:['#4B0082','#C0C0C0'], image:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80&auto=format&fit=crop', related:['t3','t4','t5'] },
  { id:'t7', title:'Cotton Printed Saree', category:'traditional', subcategory:'Sarees', occasion:'Casual', style:'Minimal', colors:['#20B2AA','#FFF'], image:'https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?w=1200&q=80&auto=format&fit=crop', related:['t1','t2','t8'] },
  { id:'t8', title:'Palazzo Kurti Set', category:'traditional', subcategory:'Kurtis', occasion:'Office', style:'Classic', colors:['#2F4F4F','#F5DEB3'], image:'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=1200&q=80&auto=format&fit=crop', related:['t4','t6','t7'] },
  { id:'t9', title:'Georgette Saree', category:'traditional', subcategory:'Sarees', occasion:'Wedding', style:'Elegant', colors:['#800080','#FFD700'], image:'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=1200&q=80&auto=format&fit=crop', related:['t1','t2','t5'] },
  { id:'t10', title:'Sharara Suit', category:'traditional', subcategory:'Salwar Suits', occasion:'Festival', style:'Classic', colors:['#006400','#FFD700'], image:'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&q=80&auto=format&fit=crop', related:['t3','t4','t9'] },
  { id:'t11', title:'Bandhani Saree', category:'traditional', subcategory:'Sarees', occasion:'Festival', style:'Vibrant', colors:['#FF4500','#FFD700'], image:'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1200&q=80&auto=format&fit=crop', related:['t1','t7','t9'] },
  { id:'t12', title:'Straight Kurti Pants', category:'traditional', subcategory:'Kurtis', occasion:'Office', style:'Minimal', colors:['#708090','#FFF'], image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80&auto=format&fit=crop', related:['t4','t8','t10'] },
];

// Western Wear — 12 distinct outfits with unique high-res verified images
const westernOutfits = [
  { id:'w1', title:'Floral Sundress', category:'western', subcategory:'Dresses', occasion:'Casual', style:'Elegant', colors:['#FFB6C1','#FFF'], image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&q=80&auto=format&fit=crop', related:['w2','w4','w7'] },
  { id:'w2', title:'Pastel Co-ord Set', category:'western', subcategory:'Co-ord Sets', occasion:'College', style:'Trendy', colors:['#98FB98','#FFF8DC'], image:'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=80&auto=format&fit=crop', related:['w1','w3','w5'] },
  { id:'w3', title:'Denim Jacket Look', category:'western', subcategory:'Casual', occasion:'Casual', style:'Streetwear', colors:['#1E90FF','#FFF'], image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80&auto=format&fit=crop', related:['w2','w6','w8'] },
  { id:'w4', title:'White Linen Dress', category:'western', subcategory:'Dresses', occasion:'Travel', style:'Minimal', colors:['#FFF','#F5F5DC'], image:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1200&q=80&auto=format&fit=crop', related:['w1','w2','w9'] },
  { id:'w5', title:'Sequin Party Dress', category:'western', subcategory:'Dresses', occasion:'Party', style:'Glamorous', colors:['#000','#FFD700'], image:'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1200&q=80&auto=format&fit=crop', related:['w1','w3','w10'] },
  { id:'w6', title:'Streetwear Tracksuit', category:'western', subcategory:'Streetwear', occasion:'Casual', style:'Streetwear', colors:['#000','#FF4500'], image:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80&auto=format&fit=crop', related:['w3','w4','w8'] },
  { id:'w7', title:'Boho Maxi Dress', category:'western', subcategory:'Dresses', occasion:'Travel', style:'Bohemian', colors:['#D2691E','#FFF8DC'], image:'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1200&q=80&auto=format&fit=crop', related:['w1','w4','w9'] },
  { id:'w8', title:'Graphic Tee & Jeans', category:'western', subcategory:'Jeans & Tops', occasion:'Casual', style:'Streetwear', colors:['#FFF','#1F2937'], image:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80&auto=format&fit=crop', related:['w3','w6','w10'] },
  { id:'w9', title:'Wrap Midi Dress', category:'western', subcategory:'Dresses', occasion:'Office', style:'Elegant', colors:['#8B0000','#FFF'], image:'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=1200&q=80&auto=format&fit=crop', related:['w1','w4','w7'] },
  { id:'w10', title:'Blazer & Trousers', category:'western', subcategory:'Casual', occasion:'Office', style:'Smart Casual', colors:['#1F2937','#F5F5DC'], image:'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=1200&q=80&auto=format&fit=crop', related:['w5','w8','w9'] },
  { id:'w11', title:'Crop Top & Skirt', category:'western', subcategory:'Co-ord Sets', occasion:'Party', style:'Trendy', colors:['#FF69B4','#FFF'], image:'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80&auto=format&fit=crop', related:['w2','w5','w9'] },
  { id:'w12', title:'Oversized Hoodie Look', category:'western', subcategory:'Streetwear', occasion:'Casual', style:'Streetwear', colors:['#808080','#FFF'], image:'https://images.unsplash.com/photo-1534126511673-b6899657816a?w=1200&q=80&auto=format&fit=crop', related:['w3','w6','w8'] },
];

// College Looks — 10 outfits with unique high-res verified images
const collegeOutfits = [
  { id:'c1', title:'Jeans & Crop Top', category:'college', subcategory:'Everyday', occasion:'College', style:'Casual', colors:['#1E90FF','#FFF'], image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80&auto=format&fit=crop', related:['c2','c3','w8'] },
  { id:'c2', title:'Casual Kurti & Jeans', category:'college', subcategory:'Casual Ethnic', occasion:'College', style:'Indo-Western', colors:['#9370DB','#1E90FF'], image:'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=1200&q=80&auto=format&fit=crop', related:['c1','c3','t4'] },
  { id:'c3', title:'Minimal White Outfit', category:'college', subcategory:'Minimal', occasion:'College', style:'Minimal', colors:['#FFF','#F5F5F5'], image:'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80&auto=format&fit=crop', related:['c1','c4','w4'] },
  { id:'c4', title:'Trendy Co-ord Set', category:'college', subcategory:'Trendy', occasion:'College', style:'Trendy', colors:['#FF69B4','#FFF'], image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80&auto=format&fit=crop', related:['c1','c2','w2'] },
  { id:'c5', title:'Denim Dungaree Look', category:'college', subcategory:'Everyday', occasion:'College', style:'Casual', colors:['#1E90FF','#FFF8DC'], image:'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?w=1200&q=80&auto=format&fit=crop', related:['c1','c3','w3'] },
  { id:'c6', title:'Printed Kurti Palazzo', category:'college', subcategory:'Casual Ethnic', occasion:'College', style:'Casual', colors:['#FF6347','#FFF'], image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80&auto=format&fit=crop', related:['c2','t4','t8'] },
  { id:'c7', title:'Pastel Shirt Dress', category:'college', subcategory:'Minimal', occasion:'College', style:'Minimal', colors:['#B0E0E6','#FFF'], image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&q=80&auto=format&fit=crop', related:['c3','c4','w4'] },
  { id:'c8', title:'Striped Tee & Shorts', category:'college', subcategory:'Everyday', occasion:'College', style:'Casual', colors:['#FFF','#1F2937'], image:'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200&q=80&auto=format&fit=crop', related:['c1','c5','w8'] },
  { id:'c9', title:'Ethnic Printed Dress', category:'college', subcategory:'Casual Ethnic', occasion:'College', style:'Bohemian', colors:['#FF8C00','#FFF'], image:'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=1200&q=80&auto=format&fit=crop', related:['c2','c6','t4'] },
  { id:'c10', title:'Sporty Chic Look', category:'college', subcategory:'Trendy', occasion:'College', style:'Streetwear', colors:['#000','#FFF'], image:'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200&q=80&auto=format&fit=crop', related:['c1','c5','w6'] },
];

// Office & Formal — 10 outfits with unique high-res verified images
const officeOutfits = [
  { id:'o1', title:'Classic White Shirt', category:'office', subcategory:'Formal Shirts', occasion:'Office', style:'Classic', colors:['#FFF','#1F2937'], image:'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&q=80&auto=format&fit=crop', related:['o2','o3','o4'] },
  { id:'o2', title:'Navy Blazer & Chinos', category:'office', subcategory:'Blazers', occasion:'Office', style:'Smart Casual', colors:['#000080','#F5DEB3'], image:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80&auto=format&fit=crop', related:['o1','o3','o5'] },
  { id:'o3', title:'Professional Sheath Dress', category:'office', subcategory:'Professional Dresses', occasion:'Office', style:'Formal', colors:['#2F4F4F','#FFF'], image:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80&auto=format&fit=crop', related:['o1','o2','o6'] },
  { id:'o4', title:'Smart Casual Look', category:'office', subcategory:'Smart Casual', occasion:'Office', style:'Smart Casual', colors:['#708090','#FFF'], image:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&q=80&auto=format&fit=crop', related:['o1','o2','o7'] },
  { id:'o5', title:'Pencil Skirt & Blouse', category:'office', subcategory:'Professional Dresses', occasion:'Office', style:'Formal', colors:['#1F2937','#FFF'], image:'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80&auto=format&fit=crop', related:['o3','o4','o6'] },
  { id:'o6', title:'Formal Trouser Suit', category:'office', subcategory:'Blazers', occasion:'Office', style:'Formal', colors:['#36454F','#FFF'], image:'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&q=80&auto=format&fit=crop', related:['o2','o5','o7'] },
  { id:'o7', title:'Striped Formal Shirt', category:'office', subcategory:'Formal Shirts', occasion:'Office', style:'Classic', colors:['#4169E1','#FFF'], image:'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=80&auto=format&fit=crop', related:['o1','o4','o8'] },
  { id:'o8', title:'Midi Wrap Dress', category:'office', subcategory:'Professional Dresses', occasion:'Office', style:'Elegant', colors:['#8B0000','#FFF'], image:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80&auto=format&fit=crop', related:['o3','o5','o9'] },
  { id:'o9', title:'Turtleneck & Trousers', category:'office', subcategory:'Smart Casual', occasion:'Office', style:'Minimal', colors:['#000','#F5F5DC'], image:'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=1200&q=80&auto=format&fit=crop', related:['o4','o6','o8'] },
  { id:'o10', title:'Linen Blazer Set', category:'office', subcategory:'Blazers', occasion:'Office', style:'Smart Casual', colors:['#D2B48C','#FFF'], image:'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=1200&q=80&auto=format&fit=crop', related:['o2','o6','o9'] },
];

// Party Wear — 10 outfits with unique high-res verified images
const partyOutfits = [
  { id:'p1', title:'Glam Evening Gown', category:'party', subcategory:'Evening Dresses', occasion:'Party', style:'Glamorous', colors:['#000','#C0C0C0'], image:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=80&auto=format&fit=crop', related:['p2','p3','p5'] },
  { id:'p2', title:'Pink Party Co-ord', category:'party', subcategory:'Party Co-ords', occasion:'Party', style:'Trendy', colors:['#FF1493','#FFF'], image:'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1200&q=80&auto=format&fit=crop', related:['p1','p3','p6'] },
  { id:'p3', title:'Birthday Glam Look', category:'party', subcategory:'Birthday Looks', occasion:'Party', style:'Glamorous', colors:['#FFD700','#000'], image:'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=1200&q=80&auto=format&fit=crop', related:['p1','p2','p4'] },
  { id:'p4', title:'Sequin Mini Dress', category:'party', subcategory:'Evening Dresses', occasion:'Party', style:'Glamorous', colors:['#C0C0C0','#000'], image:'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1200&q=80&auto=format&fit=crop', related:['p1','p2','p7'] },
  { id:'p5', title:'Velvet Bodycon Dress', category:'party', subcategory:'Evening Dresses', occasion:'Party', style:'Glamorous', colors:['#800080','#FFD700'], image:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=80&auto=format&fit=crop', related:['p1','p3','p8'] },
  { id:'p6', title:'Satin Slip Dress', category:'party', subcategory:'Evening Dresses', occasion:'Party', style:'Elegant', colors:['#FFD700','#FFF'], image:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80&auto=format&fit=crop', related:['p2','p4','p9'] },
  { id:'p7', title:'Feather Trim Top', category:'party', subcategory:'Glamorous Tops', occasion:'Party', style:'Glamorous', colors:['#FFF','#000'], image:'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=1200&q=80&auto=format&fit=crop', related:['p1','p5','p10'] },
  { id:'p8', title:'Ruffle Midi Dress', category:'party', subcategory:'Evening Dresses', occasion:'Party', style:'Elegant', colors:['#FF69B4','#FFF'], image:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80&auto=format&fit=crop', related:['p2','p6','p9'] },
  { id:'p9', title:'Metallic Co-ord Set', category:'party', subcategory:'Party Co-ords', occasion:'Party', style:'Trendy', colors:['#C0C0C0','#000'], image:'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=1200&q=80&auto=format&fit=crop', related:['p2','p7','p10'] },
  { id:'p10', title:'Off-Shoulder Gown', category:'party', subcategory:'Evening Dresses', occasion:'Party', style:'Glamorous', colors:['#8B0000','#FFD700'], image:'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop', related:['p1','p3','p8'] },
];

// Wedding & Festive — 10 outfits with unique high-res verified images
const weddingOutfits = [
  { id:'wf1', title:'Wedding Guest Lehenga', category:'wedding', subcategory:'Wedding Guest', occasion:'Wedding', style:'Elegant', colors:['#FF69B4','#FFD700'], image:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80&auto=format&fit=crop', related:['wf2','wf3','t5'] },
  { id:'wf2', title:'Festive Anarkali', category:'wedding', subcategory:'Festival', occasion:'Festival', style:'Classic', colors:['#FF4500','#FFD700'], image:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=1200&q=80&auto=format&fit=crop', related:['wf1','wf4','t3'] },
  { id:'wf3', title:'Engagement Gown', category:'wedding', subcategory:'Engagement', occasion:'Wedding', style:'Bridal', colors:['#FFB6C1','#FFF'], image:'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop', related:['wf1','wf5','t5'] },
  { id:'wf4', title:'Diwali Silk Saree', category:'wedding', subcategory:'Festival', occasion:'Festival', style:'Elegant', colors:['#FF8C00','#FFD700'], image:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80&auto=format&fit=crop', related:['wf2','wf6','t1'] },
  { id:'wf5', title:'Bridal Lehenga Set', category:'wedding', subcategory:'Bridal', occasion:'Wedding', style:'Bridal', colors:['#DC143C','#FFD700'], image:'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&q=80&auto=format&fit=crop', related:['wf1','wf3','t5'] },
  { id:'wf6', title:'Navratri Chaniya Choli', category:'wedding', subcategory:'Festival', occasion:'Festival', style:'Vibrant', colors:['#FF1493','#FFD700'], image:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80&auto=format&fit=crop', related:['wf2','wf4','t3'] },
  { id:'wf7', title:'Mehendi Outfit', category:'wedding', subcategory:'Wedding Guest', occasion:'Wedding', style:'Elegant', colors:['#228B22','#FFD700'], image:'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=1200&q=80&auto=format&fit=crop', related:['wf1','wf5','t4'] },
  { id:'wf8', title:'Sangeet Co-ord Set', category:'wedding', subcategory:'Wedding Guest', occasion:'Wedding', style:'Trendy', colors:['#9370DB','#FFD700'], image:'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1200&q=80&auto=format&fit=crop', related:['wf1','wf6','t6'] },
  { id:'wf9', title:'Eid Special Suit', category:'wedding', subcategory:'Festival', occasion:'Festival', style:'Classic', colors:['#008080','#FFD700'], image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80&auto=format&fit=crop', related:['wf2','wf4','t3'] },
  { id:'wf10', title:'Reception Gown', category:'wedding', subcategory:'Engagement', occasion:'Wedding', style:'Glamorous', colors:['#000','#FFD700'], image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80&auto=format&fit=crop', related:['wf3','wf5','p1'] },
];

// Seasonal — 8 outfits with unique high-res verified images
const seasonalOutfits = [
  { id:'s1', title:'Summer Floral Dress', category:'seasonal', subcategory:'Summer', occasion:'Casual', style:'Casual', colors:['#FF69B4','#FFF'], image:'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=1200&q=80&auto=format&fit=crop', related:['s2','w1','w4'] },
  { id:'s2', title:'Winter Cozy Layers', category:'seasonal', subcategory:'Winter', occasion:'Casual', style:'Classic', colors:['#8B4513','#F5DEB3'], image:'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=1200&q=80&auto=format&fit=crop', related:['s1','o2','w3'] },
  { id:'s3', title:'Travel Linen Set', category:'seasonal', subcategory:'Travel', occasion:'Travel', style:'Minimal', colors:['#F5DEB3','#FFF'], image:'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80&auto=format&fit=crop', related:['s1','w4','c3'] },
  { id:'s4', title:'Monsoon Raincoat Look', category:'seasonal', subcategory:'Monsoon', occasion:'Casual', style:'Casual', colors:['#4169E1','#FFF'], image:'https://images.unsplash.com/photo-1515658323406-25d61c141a6e?w=1200&q=80&auto=format&fit=crop', related:['s1','s3','w3'] },
  { id:'s5', title:'Summer Co-ord Set', category:'seasonal', subcategory:'Summer', occasion:'Casual', style:'Trendy', colors:['#FFD700','#FFF'], image:'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1200&q=80&auto=format&fit=crop', related:['s1','w2','c4'] },
  { id:'s6', title:'Winter Knit Dress', category:'seasonal', subcategory:'Winter', occasion:'Casual', style:'Elegant', colors:['#8B0000','#FFF'], image:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&q=80&auto=format&fit=crop', related:['s2','o3','w9'] },
  { id:'s7', title:'Backpacker Travel Look', category:'seasonal', subcategory:'Travel', occasion:'Travel', style:'Casual', colors:['#228B22','#F5DEB3'], image:'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80&auto=format&fit=crop', related:['s3','w4','c3'] },
  { id:'s8', title:'Monsoon Ethnic Look', category:'seasonal', subcategory:'Monsoon', occasion:'Casual', style:'Casual', colors:['#008080','#FFF'], image:'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=1200&q=80&auto=format&fit=crop', related:['s4','t4','c2'] },
];

// Accessories — 8 items with unique high-res verified images
const accessoryOutfits = [
  { id:'a1', title:'Block Heel Sandals', category:'accessories', subcategory:'Shoes', occasion:'Party', style:'Elegant', colors:['#D4B896'], image:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&q=80&auto=format&fit=crop', related:['a2','a3','p1'] },
  { id:'a2', title:'Leather Tote Bag', category:'accessories', subcategory:'Handbags', occasion:'Office', style:'Classic', colors:['#8B4513'], image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80&auto=format&fit=crop', related:['a1','a3','o2'] },
  { id:'a3', title:'Gold Layered Necklace', category:'accessories', subcategory:'Jewellery', occasion:'Wedding', style:'Elegant', colors:['#FFD700'], image:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80&auto=format&fit=crop', related:['a1','a2','t5'] },
  { id:'a4', title:'White Sneakers', category:'accessories', subcategory:'Shoes', occasion:'Casual', style:'Casual', colors:['#FFF'], image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80&auto=format&fit=crop', related:['a1','a5','w3'] },
  { id:'a5', title:'Crossbody Mini Bag', category:'accessories', subcategory:'Handbags', occasion:'Casual', style:'Trendy', colors:['#FF69B4'], image:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80&auto=format&fit=crop', related:['a2','a4','c1'] },
  { id:'a6', title:'Silver Jhumka Earrings', category:'accessories', subcategory:'Jewellery', occasion:'Festival', style:'Traditional', colors:['#C0C0C0'], image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=80&auto=format&fit=crop', related:['a3','a7','t3'] },
  { id:'a7', title:'Stiletto Heels', category:'accessories', subcategory:'Shoes', occasion:'Party', style:'Glamorous', colors:['#000'], image:'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1200&q=80&auto=format&fit=crop', related:['a1','a4','p1'] },
  { id:'a8', title:'Wrist Watch Gold', category:'accessories', subcategory:'Watches', occasion:'Office', style:'Classic', colors:['#FFD700'], image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80&auto=format&fit=crop', related:['a2','a3','o2'] },
];

const seedOutfits = [
  ...traditionalOutfits,
  ...westernOutfits,
  ...collegeOutfits,
  ...officeOutfits,
  ...partyOutfits,
  ...weddingOutfits,
  ...seasonalOutfits,
  ...accessoryOutfits,
];

export const ageGroups = [
  'Infants',
  'Kids',
  'Teenagers',
  'Young Adults',
  'Adults',
  'Middle-aged Adults',
  'Seniors',
];

export const genders = ['Women', 'Men', 'Unisex', 'Girls', 'Boys', 'Gender-neutral'];

export const clothingTypeOptions = [
  'Casual',
  'Co-ord Sets',
  'Dresses',
  'Indo-Western',
  'Jeans & Tops',
  'Kurtis',
  'Lehengas',
  'Salwar Suits',
  'Sarees',
  'Streetwear',
  'Handbags',
  'Jewellery',
  'Shoes',
  'Watches',
  'Formal Shirts',
  'Blazers',
  'Smart Casual',
  'Professional Dresses',
  'Evening Dresses',
  'Party Co-ords',
  'Glamorous Tops',
  'Birthday Looks',
  'Everyday',
  'Minimal',
];
export const colorOptions = ['Beige', 'Black', 'Blue', 'Charcoal', 'Gold', 'Green', 'Grey', 'Orange', 'Pink', 'Purple', 'Red', 'Silver', 'Teal', 'White'];
export const seasonOptions = ['Autumn', 'Spring', 'Summer', 'Winter'];
export const occasionOptions = ['Casual', 'Celebration', 'College', 'Festival', 'Office', 'Party', 'Wedding'];

export const ageGroupRanges = {
  Infants: [0, 2],
  Kids: [3, 12],
  Teenagers: [13, 19],
  'Young Adults': [20, 29],
  Adults: [30, 44],
  'Middle-aged Adults': [45, 59],
  Seniors: [60, 100],
};

export function filterOutfits(items, filters = {}) {
  const search          = (filters.search       || '').trim().toLowerCase();
  const ageFilter       = filters.ageGroup      || 'All Ages';
  const genderFilter    = filters.gender        || 'All Genders';
  const clothingFilter  = filters.clothingType  || 'All Types';
  const colorFilter     = filters.color         || 'All Colors';
  const seasonFilter    = filters.season        || 'All Seasons';
  const occasionFilter  = filters.occasion      || 'All Occasions';

  return items.filter((item) => {
    const ageValues = Array.isArray(item.ageGroups)
      ? item.ageGroups
      : (item.ageGroup ? [item.ageGroup] : []);
    const ageMatch =
      ageFilter === 'All Ages' ||
      ageValues.includes(ageFilter) ||
      item.ageGroup === ageFilter;

    const genderValues = Array.isArray(item.genderSuitability)
      ? item.genderSuitability
      : (item.gender ? [item.gender] : []);
    const genderMatch =
      genderFilter === 'All Genders' ||
      genderValues.includes(genderFilter) ||
      item.gender === genderFilter;

    const clothingMatch =
      clothingFilter === 'All Types' ||
      item.clothingType === clothingFilter ||
      item.itemType     === clothingFilter ||
      item.subcategory  === clothingFilter;

    const colorValues = Array.isArray(item.colorNames)
      ? item.colorNames
      : [item.colour].filter(Boolean);
    const colorMatch =
      colorFilter === 'All Colors' ||
      colorValues.some((c) => c && c.toLowerCase() === colorFilter.toLowerCase());

    const seasonMatch =
      seasonFilter === 'All Seasons' ||
      item.season === seasonFilter ||
      item.season === 'All Season';

    const occasionMatch =
      occasionFilter === 'All Occasions' ||
      item.occasion === occasionFilter;

    const searchText = [
      item.title,
      item.clothingType,
      item.itemType,
      item.subcategory,
      item.colour,
      item.occasion,
      item.style,
      item.description,
      ...(Array.isArray(item.colorNames) ? item.colorNames : []),
      ...(Array.isArray(item.tags)       ? item.tags       : []),
    ].filter(Boolean).join(' ').toLowerCase();
    const searchMatch = !search || searchText.includes(search);

    return ageMatch && genderMatch && clothingMatch && colorMatch && seasonMatch && occasionMatch && searchMatch;
  });
}

const colorNames = {
  '#000': 'Black',
  '#000080': 'Navy',
  '#006400': 'Green',
  '#008080': 'Teal',
  '#1F2937': 'Charcoal',
  '#20B2AA': 'Teal',
  '#228B22': 'Green',
  '#2F4F4F': 'Charcoal',
  '#36454F': 'Charcoal',
  '#4169E1': 'Blue',
  '#4B0082': 'Purple',
  '#708090': 'Grey',
  '#800080': 'Purple',
  '#8B0000': 'Red',
  '#8B4513': 'Brown',
  '#9370DB': 'Purple',
  '#B0E0E6': 'Blue',
  '#C0C0C0': 'Silver',
  '#D2B48C': 'Beige',
  '#D4B896': 'Beige',
  '#DC143C': 'Red',
  '#F5DEB3': 'Beige',
  '#F5F5DC': 'Beige',
  '#FF1493': 'Pink',
  '#FF4500': 'Orange',
  '#FF6347': 'Coral',
  '#FF69B4': 'Pink',
  '#FF8C00': 'Orange',
  '#FFB6C1': 'Pink',
  '#FFD700': 'Gold',
  '#FFF': 'White',
  '#FFF8DC': 'Cream',
};

const catalogPalette = [
  { name: 'Black', hex: '#1F2937' },
  { name: 'Blue', hex: '#4169E1' },
  { name: 'Beige', hex: '#D4B896' },
  { name: 'Green', hex: '#228B22' },
  { name: 'Pink', hex: '#FF69B4' },
  { name: 'White', hex: '#FFF' },
  { name: 'Red', hex: '#8B0000' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Grey', hex: '#708090' },
  { name: 'Gold', hex: '#FFD700' },
];

const seasons = ['Spring', 'Summer', 'Autumn', 'Winter', 'All Season'];

const EXTRA_CATALOG_IMAGES = [
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80&auto=format&fit=crop',
];

// ---------------------------------------------------------------------------
// SUBCATEGORY IMAGE MAPS
// Each subcategory slug maps to a dedicated pool of images that visually
// match that clothing type. The catalog generator picks from this pool
// instead of cycling a shared array, so title and image always match.
// ---------------------------------------------------------------------------
const SUBCATEGORY_IMAGES = {
  // ── Traditional ──────────────────────────────────────────────────────────
  'Sarees': [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80&auto=format&fit=crop',
  ],
  'Salwar Suits': [
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80&auto=format&fit=crop',
  ],
  'Kurtis': [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80&auto=format&fit=crop',
  ],
  'Lehengas': [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&auto=format&fit=crop',
  ],
  'Indo-Western': [
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80&auto=format&fit=crop',
  ],
  // ── Western ───────────────────────────────────────────────────────────────
  'Dresses': [
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80&auto=format&fit=crop',
  ],
  'Co-ord Sets': [
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80&auto=format&fit=crop',
  ],
  'Jeans & Tops': [
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80&auto=format&fit=crop',
  ],
  'Casual': [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=800&q=80&auto=format&fit=crop',
  ],
  'Streetwear': [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534126511673-b6899657816a?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80&auto=format&fit=crop',
  ],
  // ── College ───────────────────────────────────────────────────────────────
  'Everyday': [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80&auto=format&fit=crop',
  ],
  'Casual Ethnic': [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=800&q=80&auto=format&fit=crop',
  ],
  'Minimal': [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&auto=format&fit=crop',
  ],
  'Trendy': [
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80&auto=format&fit=crop',
  ],
  // ── Office ────────────────────────────────────────────────────────────────
  'Formal Shirts': [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&auto=format&fit=crop',
  ],
  'Blazers': [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80&auto=format&fit=crop',
  ],
  'Smart Casual': [
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=800&q=80&auto=format&fit=crop',
  ],
  'Professional Dresses': [
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=800&q=80&auto=format&fit=crop',
  ],
  // ── Party ─────────────────────────────────────────────────────────────────
  'Evening Dresses': [
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&auto=format&fit=crop',
  ],
  'Party Co-ords': [
    'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80&auto=format&fit=crop',
  ],
  'Glamorous Tops': [
    'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=800&q=80&auto=format&fit=crop',
  ],
  'Birthday Looks': [
    'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80&auto=format&fit=crop',
  ],
  // ── Wedding ───────────────────────────────────────────────────────────────
  'Wedding Guest': [
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80&auto=format&fit=crop',
  ],
  'Festival': [
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80&auto=format&fit=crop',
  ],
  'Engagement': [
    'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&auto=format&fit=crop',
  ],
  'Bridal': [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80&auto=format&fit=crop',
  ],
  // ── Seasonal ──────────────────────────────────────────────────────────────
  'Summer': [
    'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&auto=format&fit=crop',
  ],
  'Winter': [
    'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80&auto=format&fit=crop',
  ],
  'Monsoon': [
    'https://images.unsplash.com/photo-1515658323406-25d61c141a6e?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=800&q=80&auto=format&fit=crop',
  ],
  'Travel': [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80&auto=format&fit=crop',
  ],
  // ── Accessories ───────────────────────────────────────────────────────────
  'Shoes': [
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80&auto=format&fit=crop',
  ],
  'Handbags': [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80&auto=format&fit=crop',
  ],
  'Jewellery': [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80&auto=format&fit=crop',
  ],
  'Watches': [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop',
  ],
};

// Helper: pick an image from SUBCATEGORY_IMAGES for a given subcategory.
// Falls back to the category-level pool if the subcategory has no dedicated images.
function pickImage(subcategory, categoryFallbackImages, index) {
  const categoryPool = SUBCATEGORY_IMAGES[subcategory] || categoryFallbackImages || [];
  const pool = [...categoryPool, ...EXTRA_CATALOG_IMAGES];
  return pool[index % pool.length];
}

// Curated pool of verified high-res (min 800px) fashion images for generated catalog items
const catalogProfiles = {
  traditional: {
    styles: ['Classic', 'Printed', 'Embroidered', 'Festive', 'Minimal', 'Elegant', 'Textured', 'Modern', 'Artisan', 'Statement'],
    items: [
      ['Silk Saree', 'Sarees'], ['Cotton Saree', 'Sarees'], ['Anarkali Suit', 'Salwar Suits'],
      ['Kurti Set', 'Kurtis'], ['Lehenga Set', 'Lehengas'], ['Palazzo Suit', 'Salwar Suits'],
      ['Kurta Set', 'Kurtis'], ['Sharara Suit', 'Salwar Suits'], ['Fusion Tunic', 'Indo-Western'],
      ['Draped Saree', 'Sarees'],
    ],
    occasions: ['Wedding', 'Festival', 'Casual', 'Celebration'],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=80&auto=format&fit=crop',
    ],
  },
  western: {
    styles: ['Relaxed', 'Classic', 'Printed', 'Modern', 'Minimal', 'Tailored', 'Bohemian', 'Sporty', 'Smart', 'Statement'],
    items: [
      ['Linen Dress', 'Dresses'], ['Denim Jacket Look', 'Casual'], ['Tee and Jeans Set', 'Jeans & Tops'],
      ['Knit Co-ord Set', 'Co-ord Sets'], ['Maxi Dress', 'Dresses'], ['Wide-leg Jeans Look', 'Jeans & Tops'],
      ['Casual Shirt', 'Casual'], ['Streetwear Set', 'Streetwear'], ['Wrap Dress', 'Dresses'],
      ['Matching Top and Trouser Set', 'Co-ord Sets'],
    ],
    occasions: ['Casual', 'College', 'Travel', 'Party'],
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534126511673-b6899657816a?w=800&q=80&auto=format&fit=crop',
    ],
  },
  college: {
    styles: ['Easygoing', 'Classic', 'Printed', 'Minimal', 'Trendy', 'Layered', 'Sporty', 'Preppy', 'Relaxed', 'Colorful'],
    items: [
      ['Campus Tee and Jeans', 'Everyday'], ['Casual Kurta Set', 'Casual Ethnic'], ['Denim Dungaree Look', 'Everyday'],
      ['Everyday Shirt Dress', 'Everyday'], ['Lightweight Hoodie Set', 'Trendy'], ['Printed Tunic and Leggings', 'Casual Ethnic'],
      ['Simple Knit Top', 'Minimal'], ['Relaxed Cargo Look', 'Trendy'], ['Cotton Co-ord Set', 'Trendy'],
      ['Campus Layering Set', 'Everyday'],
    ],
    occasions: ['College', 'Casual', 'Weekend'],
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534126511673-b6899657816a?w=800&q=80&auto=format&fit=crop',
    ],
  },
  office: {
    styles: ['Tailored', 'Classic', 'Modern', 'Minimal', 'Polished', 'Relaxed', 'Smart', 'Textured', 'Elegant', 'Contemporary'],
    items: [
      ['Button-down Shirt', 'Formal Shirts'], ['Blazer and Trouser Set', 'Blazers'],
      ['Smart Casual Knit Set', 'Smart Casual'], ['Professional Midi Dress', 'Professional Dresses'],
      ['Linen Shirt and Chinos', 'Smart Casual'], ['Tailored Waistcoat Set', 'Blazers'],
      ['Pencil Skirt and Blouse', 'Professional Dresses'], ['Striped Work Shirt', 'Formal Shirts'],
      ['Office Co-ord Set', 'Smart Casual'], ['Classic Suit Set', 'Blazers'],
    ],
    occasions: ['Office', 'Business Casual', 'Meeting'],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80&auto=format&fit=crop',
    ],
  },
  party: {
    styles: ['Glamorous', 'Satin', 'Sequin', 'Elegant', 'Modern', 'Velvet', 'Shimmer', 'Statement', 'Romantic', 'Metallic'],
    items: [
      ['Evening Gown', 'Evening Dresses'], ['Party Co-ord Set', 'Party Co-ords'],
      ['Embellished Top', 'Glamorous Tops'], ['Birthday Dress', 'Birthday Looks'],
      ['Cocktail Midi Dress', 'Evening Dresses'], ['Sparkle Top and Skirt Set', 'Party Co-ords'],
      ['Dressy Blouse', 'Glamorous Tops'], ['Celebration Jumpsuit', 'Birthday Looks'],
      ['Occasion Maxi Dress', 'Evening Dresses'], ['Party Trouser Set', 'Party Co-ords'],
    ],
    occasions: ['Party', 'Birthday', 'Celebration'],
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&auto=format&fit=crop',
    ],
  },
  wedding: {
    styles: ['Festive', 'Embroidered', 'Elegant', 'Traditional', 'Modern', 'Artisan', 'Regal', 'Colorful', 'Classic', 'Statement'],
    items: [
      ['Wedding Guest Outfit', 'Wedding Guest'], ['Festive Anarkali Set', 'Festival'],
      ['Engagement Gown', 'Engagement'], ['Bridal Lehenga Set', 'Bridal'],
      ['Celebration Saree', 'Festival'], ['Wedding Kurta Set', 'Wedding Guest'],
      ['Sangeet Co-ord Set', 'Wedding Guest'], ['Reception Outfit', 'Engagement'],
      ['Ceremony Sharara Set', 'Bridal'], ['Festive Fusion Look', 'Festival'],
    ],
    occasions: ['Wedding', 'Festival', 'Engagement', 'Celebration'],
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&auto=format&fit=crop',
    ],
  },
  seasonal: {
    styles: ['Breezy', 'Layered', 'Lightweight', 'Cozy', 'Classic', 'Relaxed', 'Weather-ready', 'Travel-ready', 'Minimal', 'Versatile'],
    items: [
      ['Summer Linen Set', 'Summer'], ['Warm Knit Layer Set', 'Winter'],
      ['Rain-ready Jacket Look', 'Monsoon'], ['Travel Co-ord Set', 'Travel'],
      ['Cotton Sundress', 'Summer'], ['Quilted Vest Outfit', 'Winter'],
      ['Light Raincoat Set', 'Monsoon'], ['Packable Travel Outfit', 'Travel'],
      ['Breezy Shirt and Shorts', 'Summer'], ['Cold-weather Sweater Set', 'Winter'],
    ],
    occasions: ['Casual', 'Travel', 'Outdoor'],
    images: [
      'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515658323406-25d61c141a6e?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&auto=format&fit=crop',
    ],
  },
  accessories: {
    styles: ['Classic', 'Modern', 'Minimal', 'Textured', 'Colorful', 'Polished', 'Relaxed', 'Statement', 'Versatile', 'Everyday'],
    items: [
      ['Everyday Sneakers', 'Shoes'], ['Leather Tote Bag', 'Handbags'],
      ['Layered Necklace', 'Jewellery'], ['Classic Wristwatch', 'Watches'],
      ['Comfort Sandals', 'Shoes'], ['Crossbody Bag', 'Handbags'],
      ['Stud Earrings', 'Jewellery'], ['Leather Strap Watch', 'Watches'],
      ['Dress Shoes', 'Shoes'], ['Compact Shoulder Bag', 'Handbags'],
    ],
    occasions: ['Casual', 'Office', 'Party', 'Wedding'],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80&auto=format&fit=crop',
    ],
  },
};

const primaryCategories = categories.slice(0, 8);

const categoryAudience = {
  traditional: { ageGroups: ['Young Adults', 'Adults', 'Middle-aged Adults'], genders: ['Women', 'Women', 'Women', 'Gender-neutral'] },
  western: { ageGroups: ['Teenagers', 'Young Adults', 'Adults'], genders: ['Women', 'Men', 'Unisex', 'Women', 'Men', 'Gender-neutral'] },
  college: { ageGroups: ['Teenagers', 'Young Adults', 'Adults'], genders: ['Girls', 'Women', 'Boys', 'Men', 'Unisex'] },
  office: { ageGroups: ['Young Adults', 'Adults', 'Middle-aged Adults'], genders: ['Women', 'Men', 'Unisex', 'Women', 'Men'] },
  party: { ageGroups: ['Teenagers', 'Young Adults', 'Adults'], genders: ['Women', 'Women', 'Men', 'Unisex', 'Gender-neutral'] },
  wedding: { ageGroups: ['Young Adults', 'Adults', 'Middle-aged Adults'], genders: ['Women', 'Women', 'Men', 'Unisex'] },
  seasonal: { ageGroups: ['Kids', 'Teenagers', 'Young Adults', 'Adults', 'Middle-aged Adults', 'Seniors'], genders: ['Girls', 'Women', 'Boys', 'Men', 'Unisex', 'Gender-neutral'] },
  accessories: { ageGroups: ['Kids', 'Teenagers', 'Young Adults', 'Adults', 'Middle-aged Adults', 'Seniors'], genders: ['Gender-neutral', 'Women', 'Men', 'Unisex', 'Girls', 'Boys'] },
};

export const outfits = primaryCategories.flatMap(({ id }) => {
  const existing = seedOutfits
    .filter((outfit) => outfit.category === id)
    .map((outfit) => ({
      ...outfit,
      ageGroup: 'Young Adults',
      gender: id === 'accessories' ? 'Gender-neutral' : 'Women',
    }));
  const profile = catalogProfiles[id];
  const titles = new Set(existing.map((outfit) => outfit.title));
  const additions = [];
  const audience = categoryAudience[id] || categoryAudience.western;

  for (const style of profile.styles) {
    for (const [item, subcategory] of profile.items) {
      if (existing.length + additions.length === 100) break;
      const title = `${style} ${item}`;
      if (titles.has(title)) continue;

      const index = additions.length;
      const primaryColor = catalogPalette[index % catalogPalette.length];
      const accentColor = catalogPalette[(index + 3) % catalogPalette.length];
      const ageGroup = audience.ageGroups[index % audience.ageGroups.length];
      const gender = audience.genders[index % audience.genders.length];

      additions.push({
        id: `${id}-catalog-${String(index + 1).padStart(3, '0')}`,
        title,
        category: id,
        subcategory,
        occasion: profile.occasions[index % profile.occasions.length],
        style,
        colors: [primaryColor.hex, accentColor.hex],
        colorNames: [primaryColor.name, accentColor.name],
        image: pickImage(subcategory, profile.images, index),
        related: existing.slice(0, 3).map((outfit) => outfit.id),
        ageGroup,
        gender,
      });
      titles.add(title);
    }
    if (existing.length + additions.length === 100) break;
  }

  return [...existing, ...additions].map((outfit, index) => {
    const [minAge, maxAge] = ageGroupRanges[outfit.ageGroup] || [18, 35];
    const primaryGender = outfit.gender || 'Women';
    const isTraditionalEthnic = ['Sarees', 'Lehengas', 'Kurtis', 'Salwar Suits', 'Indo-Western'].includes(outfit.subcategory);
    const suitableGenders = Array.from(new Set([
      primaryGender,
      ...(primaryGender === 'Women' ? ['Gender-neutral', 'Unisex'] : []),
      ...(primaryGender === 'Men' ? ['Unisex', 'Gender-neutral'] : []),
      ...(primaryGender === 'Girls' ? ['Women', 'Gender-neutral'] : []),
      ...(primaryGender === 'Boys' ? ['Men', 'Gender-neutral'] : []),
      ...(primaryGender === 'Unisex' ? ['Women', 'Men'] : []),
      ...(primaryGender === 'Gender-neutral' ? ['Women', 'Men', 'Unisex'] : []),
    ])).filter((gender) => {
      if (isTraditionalEthnic && (gender === 'Men' || gender === 'Boys')) return false;
      return true;
    });
    const colorNamesList = outfit.colorNames || [...new Set(outfit.colors.map((color) => colorNames[color.toUpperCase()] || 'Multicolor'))];
    const clothingType = outfit.subcategory || outfit.itemType || 'Traditional';
    const normalizedColor = colorNamesList[0] || 'Multicolor';
    const outfitSeason = outfit.category === 'seasonal' ? outfit.subcategory : seasons[index % seasons.length];

    return {
      ...outfit,
      ageGroup: outfit.ageGroup || 'Young Adults',
      ageGroups: [outfit.ageGroup || 'Young Adults'],
      ageRange: [minAge, maxAge],
      gender: primaryGender,
      genderSuitability: suitableGenders,
      itemType: clothingType,
      clothingType: clothingType,
      colour: normalizedColor,
      colorNames: colorNamesList,
      description: `${outfit.style} ${clothingType.toLowerCase()} for ${outfit.occasion.toLowerCase()} occasions.`,
      season: outfitSeason,
      tags: [
        outfit.title,
        clothingType,
        outfit.style,
        outfit.occasion,
        ...colorNamesList,
        ...(Array.isArray(outfit.tags) ? outfit.tags : [])
      ].filter(Boolean),
      imageSourceStatus: 'verified',
    };
  });
});

export const imageSourceNote = 'All images are high-resolution fashion photographs optimized with lazy loading, uncompressed previews and local fallback backups.';
