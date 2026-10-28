// Fashion categories with unique cover images
export const categories = [
  { id: 'traditional', label: 'Traditional Indian Wear', cover: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&h=900&fit=crop', description: 'Celebrate heritage with stunning sarees, lehengas, kurtis and more.', subcategories: ['Sarees', 'Salwar Suits', 'Kurtis', 'Lehengas', 'Indo-Western'] },
  { id: 'western', label: 'Western Wear', cover: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700&h=900&fit=crop', description: 'Modern silhouettes, casual chic and contemporary fashion.', subcategories: ['Casual', 'Jeans & Tops', 'Dresses', 'Co-ord Sets', 'Streetwear'] },
  { id: 'college', label: 'College Looks', cover: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=700&h=900&fit=crop', description: 'Effortless everyday outfits for campus life.', subcategories: ['Everyday', 'Casual Ethnic', 'Minimal', 'Trendy'] },
  { id: 'office', label: 'Office & Formal', cover: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=700&h=900&fit=crop', description: 'Professional, polished and smart-casual workwear.', subcategories: ['Formal Shirts', 'Blazers', 'Smart Casual', 'Professional Dresses'] },
  { id: 'party', label: 'Party Wear', cover: 'https://images.unsplash.com/photo-1566479179817-0b9f4b4a5f3e?w=700&h=900&fit=crop', description: 'Glamorous looks for every celebration.', subcategories: ['Evening Dresses', 'Party Co-ords', 'Glamorous Tops', 'Birthday Looks'] },
  { id: 'wedding', label: 'Wedding & Festive', cover: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=700&h=900&fit=crop', description: 'Exquisite looks for weddings, engagements and festivals.', subcategories: ['Wedding Guest', 'Engagement', 'Festival', 'Bridal'] },
  { id: 'seasonal', label: 'Seasonal Fashion', cover: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=700&h=900&fit=crop', description: 'Dress right for every season and occasion.', subcategories: ['Summer', 'Winter', 'Monsoon', 'Travel'] },
  { id: 'accessories', label: 'Footwear & Accessories', cover: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&h=900&fit=crop', description: 'Complete your look with shoes, bags and jewellery.', subcategories: ['Shoes', 'Handbags', 'Jewellery', 'Watches'] },
  // Additional categories linked from Home page
  { id: 'co-ord-sets',        label: 'Co-ord Sets',             cover: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&h=900&fit=crop', description: 'Perfectly matched sets for an effortless put-together look.', subcategories: ['Co-ord Sets'], alias: 'western' },
  { id: 'formal-dress',       label: 'Formal Dress',            cover: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=700&h=900&fit=crop', description: 'Sharp, polished formal dresses for every professional occasion.', subcategories: ['Professional Dresses', 'Blazers'], alias: 'office' },
  { id: 'ethnic-wear',        label: 'Ethnic Wear',             cover: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&h=900&fit=crop', description: 'Vibrant ethnic styles rooted in Indian tradition.', subcategories: ['Sarees', 'Salwar Suits', 'Kurtis', 'Lehengas'], alias: 'traditional' },
  { id: 'street-style',       label: 'Street Style',            cover: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=700&h=900&fit=crop', description: 'Bold, expressive streetwear for the urban trendsetter.', subcategories: ['Streetwear'], alias: 'western' },
  { id: 'festive-looks',      label: 'Festive Looks',           cover: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=700&h=900&fit=crop', description: 'Vibrant outfits to celebrate every festival in style.', subcategories: ['Festival', 'Bridal'], alias: 'wedding' },
  { id: 'office-wear',        label: 'Office Wear',             cover: 'https://images.unsplash.com/photo-1600091166971-7f9faad6c498?w=700&h=900&fit=crop', description: 'Professional, polished looks for the modern workplace.', subcategories: ['Formal Shirts', 'Blazers', 'Smart Casual', 'Professional Dresses'], alias: 'office' },
  { id: 'casual-wear',        label: 'Casual Wear',             cover: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=700&h=900&fit=crop', description: 'Relaxed, everyday outfits for any casual occasion.', subcategories: ['Casual', 'Everyday'], alias: 'western' },
  { id: 'college-outfits',    label: 'College Outfits',         cover: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=700&h=900&fit=crop', description: 'Effortless everyday outfits for campus life.', subcategories: ['Everyday', 'Casual Ethnic', 'Minimal', 'Trendy'], alias: 'college' },
  { id: 'western-wear',       label: 'Western Wear',            cover: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700&h=900&fit=crop', description: 'Modern silhouettes, casual chic and contemporary fashion.', subcategories: ['Casual', 'Jeans & Tops', 'Dresses', 'Co-ord Sets', 'Streetwear'], alias: 'western' },
  { id: 'party-wear',         label: 'Party Wear',              cover: 'https://images.unsplash.com/photo-1566479179817-0b9f4b4a5f3e?w=700&h=900&fit=crop', description: 'Glamorous looks for every celebration.', subcategories: ['Evening Dresses', 'Party Co-ords', 'Glamorous Tops', 'Birthday Looks'], alias: 'party' },
  { id: 'wedding-guest',      label: 'Wedding Guest Looks',     cover: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=700&h=900&fit=crop', description: 'Elegant looks for weddings and special celebrations.', subcategories: ['Wedding Guest', 'Engagement'], alias: 'wedding' },
  { id: 'traditional-sarees', label: 'Traditional Sarees',      cover: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&h=900&fit=crop', description: 'Timeless sarees from every region of India.', subcategories: ['Sarees'], alias: 'traditional' },
  { id: 'kurtis-kurta',       label: 'Kurtis & Kurta Sets',     cover: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&h=900&fit=crop', description: 'Versatile kurtis and kurta sets for every occasion.', subcategories: ['Kurtis'], alias: 'traditional' },
  { id: 'jeans-denim',        label: 'Jeans & Denim',           cover: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=700&h=900&fit=crop', description: 'Classic denim looks for everyday wear.', subcategories: ['Jeans & Tops', 'Casual'], alias: 'western' },
  { id: 'tops-shirts',        label: 'Tops & Shirts',           cover: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=700&h=900&fit=crop', description: 'Stylish tops and shirts for every mood.', subcategories: ['Formal Shirts', 'Casual'], alias: 'office' },
  { id: 'dresses',            label: 'Dresses',                 cover: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=700&h=900&fit=crop', description: 'Beautiful dresses for every occasion.', subcategories: ['Dresses', 'Evening Dresses'], alias: 'western' },
  { id: 'winter-wear',        label: 'Winter Wear',             cover: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=700&h=900&fit=crop', description: 'Cosy, stylish layers for the colder months.', subcategories: ['Winter'], alias: 'seasonal' },
  { id: 'summer-outfits',     label: 'Summer Outfits',          cover: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&h=900&fit=crop', description: 'Light, breezy outfits to beat the heat in style.', subcategories: ['Summer'], alias: 'seasonal' },
  { id: 'minimalist',         label: 'Minimalist Fashion',      cover: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&h=900&fit=crop', description: 'Clean lines and understated elegance.', subcategories: ['Minimal'], alias: 'college' },
  { id: 'athleisure',         label: 'Athleisure & Sportswear', cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&h=900&fit=crop', description: 'Sporty, comfortable looks that go from gym to street.', subcategories: ['Streetwear'], alias: 'western' },
  { id: 'vacation-travel',    label: 'Vacation & Travel Looks', cover: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&h=900&fit=crop', description: 'Comfortable, stylish outfits for every adventure.', subcategories: ['Travel'], alias: 'seasonal' },
  { id: 'shoes-sneakers',     label: 'Shoes & Sneakers',        cover: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&h=900&fit=crop', description: 'Step out in style with the perfect footwear.', subcategories: ['Shoes'], alias: 'accessories' },
  { id: 'bags-accessories',   label: 'Bags & Accessories',      cover: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&h=900&fit=crop', description: 'Complete your look with the right accessories.', subcategories: ['Handbags', 'Jewellery', 'Watches'], alias: 'accessories' },
  { id: 'mens-fashion',       label: "Men's Fashion",           cover: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=700&h=900&fit=crop', description: 'Sharp, modern looks for the well-dressed man.', subcategories: ['Formal Shirts', 'Blazers', 'Smart Casual', 'Casual'], alias: 'office' },
  { id: 'womens-fashion',     label: "Women's Fashion",         cover: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700&h=900&fit=crop', description: "Curated women's fashion for every style and occasion.", subcategories: ['Dresses', 'Co-ord Sets', 'Casual'], alias: 'western' },
];

// Traditional Indian Wear — 12 distinct outfits
const traditionalOutfits = [
  { id:'t1', title:'Silk Banarasi Saree', category:'traditional', subcategory:'Sarees', occasion:'Wedding', style:'Elegant', colors:['#8B0000','#FFD700'], image:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=680&fit=crop', related:['t2','t3','t5'] },
  { id:'t2', title:'Chiffon Floral Saree', category:'traditional', subcategory:'Sarees', occasion:'Festival', style:'Elegant', colors:['#FF69B4','#FFF'], image:'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&h=680&fit=crop', related:['t1','t3','t7'] },
  { id:'t3', title:'Anarkali Salwar Suit', category:'traditional', subcategory:'Salwar Suits', occasion:'Festival', style:'Classic', colors:['#DC143C','#FFD700'], image:'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=500&h=680&fit=crop', related:['t1','t4','t6'] },
  { id:'t4', title:'Embroidered Kurti', category:'traditional', subcategory:'Kurtis', occasion:'College', style:'Casual', colors:['#9370DB','#FFF'], image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=680&fit=crop', related:['t3','t5','t8'] },
  { id:'t5', title:'Bridal Lehenga', category:'traditional', subcategory:'Lehengas', occasion:'Wedding', style:'Bridal', colors:['#FF1493','#FFD700'], image:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&h=680&fit=crop', related:['t1','t2','t6'] },
  { id:'t6', title:'Indo-Western Fusion', category:'traditional', subcategory:'Indo-Western', occasion:'Party', style:'Trendy', colors:['#4B0082','#C0C0C0'], image:'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&h=680&fit=crop', related:['t3','t4','t5'] },
  { id:'t7', title:'Cotton Printed Saree', category:'traditional', subcategory:'Sarees', occasion:'Casual', style:'Minimal', colors:['#20B2AA','#FFF'], image:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=680&fit=crop&crop=bottom', related:['t1','t2','t8'] },
  { id:'t8', title:'Palazzo Kurti Set', category:'traditional', subcategory:'Kurtis', occasion:'Office', style:'Classic', colors:['#2F4F4F','#F5DEB3'], image:'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=500&h=680&fit=crop&crop=top', related:['t4','t6','t7'] },
  { id:'t9', title:'Georgette Saree', category:'traditional', subcategory:'Sarees', occasion:'Wedding', style:'Elegant', colors:['#800080','#FFD700'], image:'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&h=680&fit=crop&crop=top', related:['t1','t2','t5'] },
  { id:'t10', title:'Sharara Suit', category:'traditional', subcategory:'Salwar Suits', occasion:'Festival', style:'Classic', colors:['#006400','#FFD700'], image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=680&fit=crop&crop=top', related:['t3','t4','t9'] },
  { id:'t11', title:'Bandhani Saree', category:'traditional', subcategory:'Sarees', occasion:'Festival', style:'Vibrant', colors:['#FF4500','#FFD700'], image:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&h=680&fit=crop&crop=top', related:['t1','t7','t9'] },
  { id:'t12', title:'Straight Kurti Pants', category:'traditional', subcategory:'Kurtis', occasion:'Office', style:'Minimal', colors:['#708090','#FFF'], image:'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&h=680&fit=crop&crop=top', related:['t4','t8','t10'] },
];

// Western Wear — 12 distinct outfits
const westernOutfits = [
  { id:'w1', title:'Floral Sundress', category:'western', subcategory:'Dresses', occasion:'Casual', style:'Elegant', colors:['#FFB6C1','#FFF'], image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=680&fit=crop', related:['w2','w4','w7'] },
  { id:'w2', title:'Pastel Co-ord Set', category:'western', subcategory:'Co-ord Sets', occasion:'College', style:'Trendy', colors:['#98FB98','#FFF8DC'], image:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=680&fit=crop', related:['w1','w3','w5'] },
  { id:'w3', title:'Denim Jacket Look', category:'western', subcategory:'Casual', occasion:'Casual', style:'Streetwear', colors:['#1E90FF','#FFF'], image:'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=680&fit=crop', related:['w2','w6','w8'] },
  { id:'w4', title:'White Linen Dress', category:'western', subcategory:'Dresses', occasion:'Travel', style:'Minimal', colors:['#FFF','#F5F5DC'], image:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=680&fit=crop', related:['w1','w2','w9'] },
  { id:'w5', title:'Sequin Party Dress', category:'western', subcategory:'Dresses', occasion:'Party', style:'Glamorous', colors:['#000','#FFD700'], image:'https://images.unsplash.com/photo-1566479179817-0b9f4b4a5f3e?w=500&h=680&fit=crop', related:['w1','w3','w10'] },
  { id:'w6', title:'Streetwear Tracksuit', category:'western', subcategory:'Streetwear', occasion:'Casual', style:'Streetwear', colors:['#000','#FF4500'], image:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=680&fit=crop', related:['w3','w4','w8'] },
  { id:'w7', title:'Boho Maxi Dress', category:'western', subcategory:'Dresses', occasion:'Travel', style:'Bohemian', colors:['#D2691E','#FFF8DC'], image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=680&fit=crop', related:['w1','w4','w9'] },
  { id:'w8', title:'Graphic Tee & Jeans', category:'western', subcategory:'Jeans & Tops', occasion:'Casual', style:'Streetwear', colors:['#FFF','#1F2937'], image:'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=680&fit=crop', related:['w3','w6','w10'] },
  { id:'w9', title:'Wrap Midi Dress', category:'western', subcategory:'Dresses', occasion:'Office', style:'Elegant', colors:['#8B0000','#FFF'], image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=680&fit=crop', related:['w1','w4','w7'] },
  { id:'w10', title:'Blazer & Trousers', category:'western', subcategory:'Casual', occasion:'Office', style:'Smart Casual', colors:['#1F2937','#F5F5DC'], image:'https://images.unsplash.com/photo-1600091166971-7f9faad6c498?w=500&h=680&fit=crop', related:['w5','w8','w9'] },
  { id:'w11', title:'Crop Top & Skirt', category:'western', subcategory:'Co-ord Sets', occasion:'Party', style:'Trendy', colors:['#FF69B4','#FFF'], image:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=680&fit=crop&crop=top', related:['w2','w5','w9'] },
  { id:'w12', title:'Oversized Hoodie Look', category:'western', subcategory:'Streetwear', occasion:'Casual', style:'Streetwear', colors:['#808080','#FFF'], image:'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=680&fit=crop&crop=top', related:['w3','w6','w8'] },
];

// College Looks — 10 outfits
const collegeOutfits = [
  { id:'c1', title:'Jeans & Crop Top', category:'college', subcategory:'Everyday', occasion:'College', style:'Casual', colors:['#1E90FF','#FFF'], image:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=680&fit=crop&crop=bottom', related:['c2','c3','w8'] },
  { id:'c2', title:'Casual Kurti & Jeans', category:'college', subcategory:'Casual Ethnic', occasion:'College', style:'Indo-Western', colors:['#9370DB','#1E90FF'], image:'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=500&h=680&fit=crop&crop=bottom', related:['c1','c3','t4'] },
  { id:'c3', title:'Minimal White Outfit', category:'college', subcategory:'Minimal', occasion:'College', style:'Minimal', colors:['#FFF','#F5F5F5'], image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=680&fit=crop&crop=top', related:['c1','c4','w4'] },
  { id:'c4', title:'Trendy Co-ord Set', category:'college', subcategory:'Trendy', occasion:'College', style:'Trendy', colors:['#FF69B4','#FFF'], image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=680&fit=crop&crop=top', related:['c1','c2','w2'] },
  { id:'c5', title:'Denim Dungaree Look', category:'college', subcategory:'Everyday', occasion:'College', style:'Casual', colors:['#1E90FF','#FFF8DC'], image:'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=680&fit=crop&crop=bottom', related:['c1','c3','w3'] },
  { id:'c6', title:'Printed Kurti Palazzo', category:'college', subcategory:'Casual Ethnic', occasion:'College', style:'Casual', colors:['#FF6347','#FFF'], image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=680&fit=crop&crop=bottom', related:['c2','t4','t8'] },
  { id:'c7', title:'Pastel Shirt Dress', category:'college', subcategory:'Minimal', occasion:'College', style:'Minimal', colors:['#B0E0E6','#FFF'], image:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=680&fit=crop&crop=top', related:['c3','c4','w4'] },
  { id:'c8', title:'Striped Tee & Shorts', category:'college', subcategory:'Everyday', occasion:'College', style:'Casual', colors:['#FFF','#1F2937'], image:'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=680&fit=crop&crop=top', related:['c1','c5','w8'] },
  { id:'c9', title:'Ethnic Printed Dress', category:'college', subcategory:'Casual Ethnic', occasion:'College', style:'Bohemian', colors:['#FF8C00','#FFF'], image:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&h=680&fit=crop&crop=bottom', related:['c2','c6','t4'] },
  { id:'c10', title:'Sporty Chic Look', category:'college', subcategory:'Trendy', occasion:'College', style:'Streetwear', colors:['#000','#FFF'], image:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=680&fit=crop&crop=top', related:['c1','c5','w6'] },
];

// Office & Formal — 10 outfits
const officeOutfits = [
  { id:'o1', title:'Classic White Shirt', category:'office', subcategory:'Formal Shirts', occasion:'Office', style:'Classic', colors:['#FFF','#1F2937'], image:'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&h=680&fit=crop', related:['o2','o3','o4'] },
  { id:'o2', title:'Navy Blazer & Chinos', category:'office', subcategory:'Blazers', occasion:'Office', style:'Smart Casual', colors:['#000080','#F5DEB3'], image:'https://images.unsplash.com/photo-1600091166971-7f9faad6c498?w=500&h=680&fit=crop', related:['o1','o3','o5'] },
  { id:'o3', title:'Professional Sheath Dress', category:'office', subcategory:'Professional Dresses', occasion:'Office', style:'Formal', colors:['#2F4F4F','#FFF'], image:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=680&fit=crop&crop=top', related:['o1','o2','o6'] },
  { id:'o4', title:'Smart Casual Look', category:'office', subcategory:'Smart Casual', occasion:'Office', style:'Smart Casual', colors:['#708090','#FFF'], image:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=680&fit=crop', related:['o1','o2','o7'] },
  { id:'o5', title:'Pencil Skirt & Blouse', category:'office', subcategory:'Professional Dresses', occasion:'Office', style:'Formal', colors:['#1F2937','#FFF'], image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=680&fit=crop&crop=bottom', related:['o3','o4','o6'] },
  { id:'o6', title:'Formal Trouser Suit', category:'office', subcategory:'Blazers', occasion:'Office', style:'Formal', colors:['#36454F','#FFF'], image:'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=680&fit=crop&crop=top', related:['o2','o5','o7'] },
  { id:'o7', title:'Striped Formal Shirt', category:'office', subcategory:'Formal Shirts', occasion:'Office', style:'Classic', colors:['#4169E1','#FFF'], image:'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=680&fit=crop&crop=top', related:['o1','o4','o8'] },
  { id:'o8', title:'Midi Wrap Dress', category:'office', subcategory:'Professional Dresses', occasion:'Office', style:'Elegant', colors:['#8B0000','#FFF'], image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=680&fit=crop&crop=bottom', related:['o3','o5','o9'] },
  { id:'o9', title:'Turtleneck & Trousers', category:'office', subcategory:'Smart Casual', occasion:'Office', style:'Minimal', colors:['#000','#F5F5DC'], image:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=680&fit=crop&crop=top', related:['o4','o6','o8'] },
  { id:'o10', title:'Linen Blazer Set', category:'office', subcategory:'Blazers', occasion:'Office', style:'Smart Casual', colors:['#D2B48C','#FFF'], image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=680&fit=crop&crop=top', related:['o2','o6','o9'] },
];

// Party Wear — 10 outfits
const partyOutfits = [
  { id:'p1', title:'Glam Evening Gown', category:'party', subcategory:'Evening Dresses', occasion:'Party', style:'Glamorous', colors:['#000','#C0C0C0'], image:'https://images.unsplash.com/photo-1566479179817-0b9f4b4a5f3e?w=500&h=680&fit=crop', related:['p2','p3','p5'] },
  { id:'p2', title:'Pink Party Co-ord', category:'party', subcategory:'Party Co-ords', occasion:'Party', style:'Trendy', colors:['#FF1493','#FFF'], image:'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&h=680&fit=crop&crop=bottom', related:['p1','p3','p6'] },
  { id:'p3', title:'Birthday Glam Look', category:'party', subcategory:'Birthday Looks', occasion:'Party', style:'Glamorous', colors:['#FFD700','#000'], image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=680&fit=crop&crop=bottom', related:['p1','p2','p4'] },
  { id:'p4', title:'Sequin Mini Dress', category:'party', subcategory:'Evening Dresses', occasion:'Party', style:'Glamorous', colors:['#C0C0C0','#000'], image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=680&fit=crop&crop=bottom', related:['p1','p2','p7'] },
  { id:'p5', title:'Velvet Bodycon Dress', category:'party', subcategory:'Evening Dresses', occasion:'Party', style:'Glamorous', colors:['#800080','#FFD700'], image:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=680&fit=crop&crop=center', related:['p1','p3','p8'] },
  { id:'p6', title:'Satin Slip Dress', category:'party', subcategory:'Evening Dresses', occasion:'Party', style:'Elegant', colors:['#FFD700','#FFF'], image:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=680&fit=crop&crop=bottom', related:['p2','p4','p9'] },
  { id:'p7', title:'Feather Trim Top', category:'party', subcategory:'Glamorous Tops', occasion:'Party', style:'Glamorous', colors:['#FFF','#000'], image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=680&fit=crop&crop=bottom', related:['p1','p5','p10'] },
  { id:'p8', title:'Ruffle Midi Dress', category:'party', subcategory:'Evening Dresses', occasion:'Party', style:'Elegant', colors:['#FF69B4','#FFF'], image:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&h=680&fit=crop&crop=bottom', related:['p2','p6','p9'] },
  { id:'p9', title:'Metallic Co-ord Set', category:'party', subcategory:'Party Co-ords', occasion:'Party', style:'Trendy', colors:['#C0C0C0','#000'], image:'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=680&fit=crop&crop=bottom', related:['p2','p7','p10'] },
  { id:'p10', title:'Off-Shoulder Gown', category:'party', subcategory:'Evening Dresses', occasion:'Party', style:'Glamorous', colors:['#8B0000','#FFD700'], image:'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=680&fit=crop&crop=bottom', related:['p1','p3','p8'] },
];

// Wedding & Festive — 10 outfits
const weddingOutfits = [
  { id:'wf1', title:'Wedding Guest Lehenga', category:'wedding', subcategory:'Wedding Guest', occasion:'Wedding', style:'Elegant', colors:['#FF69B4','#FFD700'], image:'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=680&fit=crop&crop=center', related:['wf2','wf3','t5'] },
  { id:'wf2', title:'Festive Anarkali', category:'wedding', subcategory:'Festival', occasion:'Festival', style:'Classic', colors:['#FF4500','#FFD700'], image:'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=500&h=680&fit=crop&crop=center', related:['wf1','wf4','t3'] },
  { id:'wf3', title:'Engagement Gown', category:'wedding', subcategory:'Engagement', occasion:'Wedding', style:'Bridal', colors:['#FFB6C1','#FFF'], image:'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&h=680&fit=crop&crop=bottom', related:['wf1','wf5','t5'] },
  { id:'wf4', title:'Diwali Silk Saree', category:'wedding', subcategory:'Festival', occasion:'Festival', style:'Elegant', colors:['#FF8C00','#FFD700'], image:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&h=680&fit=crop&crop=center', related:['wf2','wf6','t1'] },
  { id:'wf5', title:'Bridal Lehenga Set', category:'wedding', subcategory:'Bridal', occasion:'Wedding', style:'Bridal', colors:['#DC143C','#FFD700'], image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=680&fit=crop&crop=center', related:['wf1','wf3','t5'] },
  { id:'wf6', title:'Navratri Chaniya Choli', category:'wedding', subcategory:'Festival', occasion:'Festival', style:'Vibrant', colors:['#FF1493','#FFD700'], image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=680&fit=crop&crop=center', related:['wf2','wf4','t3'] },
  { id:'wf7', title:'Mehendi Outfit', category:'wedding', subcategory:'Wedding Guest', occasion:'Wedding', style:'Elegant', colors:['#228B22','#FFD700'], image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=680&fit=crop&crop=center', related:['wf1','wf5','t4'] },
  { id:'wf8', title:'Sangeet Co-ord Set', category:'wedding', subcategory:'Wedding Guest', occasion:'Wedding', style:'Trendy', colors:['#9370DB','#FFD700'], image:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=680&fit=crop&crop=center', related:['wf1','wf6','t6'] },
  { id:'wf9', title:'Eid Special Suit', category:'wedding', subcategory:'Festival', occasion:'Festival', style:'Classic', colors:['#008080','#FFD700'], image:'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&h=680&fit=crop&crop=center', related:['wf2','wf4','t3'] },
  { id:'wf10', title:'Reception Gown', category:'wedding', subcategory:'Engagement', occasion:'Wedding', style:'Glamorous', colors:['#000','#FFD700'], image:'https://images.unsplash.com/photo-1566479179817-0b9f4b4a5f3e?w=500&h=680&fit=crop&crop=center', related:['wf3','wf5','p1'] },
];

// Seasonal — 8 outfits
const seasonalOutfits = [
  { id:'s1', title:'Summer Floral Dress', category:'seasonal', subcategory:'Summer', occasion:'Casual', style:'Casual', colors:['#FF69B4','#FFF'], image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=680&fit=crop&crop=center', related:['s2','w1','w4'] },
  { id:'s2', title:'Winter Cozy Layers', category:'seasonal', subcategory:'Winter', occasion:'Casual', style:'Classic', colors:['#8B4513','#F5DEB3'], image:'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=680&fit=crop&crop=top', related:['s1','o2','w3'] },
  { id:'s3', title:'Travel Linen Set', category:'seasonal', subcategory:'Travel', occasion:'Travel', style:'Minimal', colors:['#F5DEB3','#FFF'], image:'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=680&fit=crop&crop=bottom', related:['s1','w4','c3'] },
  { id:'s4', title:'Monsoon Raincoat Look', category:'seasonal', subcategory:'Monsoon', occasion:'Casual', style:'Casual', colors:['#4169E1','#FFF'], image:'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=680&fit=crop&crop=top', related:['s1','s3','w3'] },
  { id:'s5', title:'Summer Co-ord Set', category:'seasonal', subcategory:'Summer', occasion:'Casual', style:'Trendy', colors:['#FFD700','#FFF'], image:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=680&fit=crop&crop=center', related:['s1','w2','c4'] },
  { id:'s6', title:'Winter Knit Dress', category:'seasonal', subcategory:'Winter', occasion:'Casual', style:'Elegant', colors:['#8B0000','#FFF'], image:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=680&fit=crop&crop=top', related:['s2','o3','w9'] },
  { id:'s7', title:'Backpacker Travel Look', category:'seasonal', subcategory:'Travel', occasion:'Travel', style:'Casual', colors:['#228B22','#F5DEB3'], image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=680&fit=crop&crop=top', related:['s3','w4','c3'] },
  { id:'s8', title:'Monsoon Ethnic Look', category:'seasonal', subcategory:'Monsoon', occasion:'Casual', style:'Casual', colors:['#008080','#FFF'], image:'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&h=680&fit=crop&crop=top', related:['s4','t4','c2'] },
];

// Accessories — 8 items
const accessoryOutfits = [
  { id:'a1', title:'Block Heel Sandals', category:'accessories', subcategory:'Shoes', occasion:'Party', style:'Elegant', colors:['#D4B896'], image:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop', related:['a2','a3','p1'] },
  { id:'a2', title:'Leather Tote Bag', category:'accessories', subcategory:'Handbags', occasion:'Office', style:'Classic', colors:['#8B4513'], image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop', related:['a1','a3','o2'] },
  { id:'a3', title:'Gold Layered Necklace', category:'accessories', subcategory:'Jewellery', occasion:'Wedding', style:'Elegant', colors:['#FFD700'], image:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop', related:['a1','a2','t5'] },
  { id:'a4', title:'White Sneakers', category:'accessories', subcategory:'Shoes', occasion:'Casual', style:'Casual', colors:['#FFF'], image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', related:['a1','a5','w3'] },
  { id:'a5', title:'Crossbody Mini Bag', category:'accessories', subcategory:'Handbags', occasion:'Casual', style:'Trendy', colors:['#FF69B4'], image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop&crop=top', related:['a2','a4','c1'] },
  { id:'a6', title:'Silver Jhumka Earrings', category:'accessories', subcategory:'Jewellery', occasion:'Festival', style:'Traditional', colors:['#C0C0C0'], image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop', related:['a3','a7','t3'] },
  { id:'a7', title:'Stiletto Heels', category:'accessories', subcategory:'Shoes', occasion:'Party', style:'Glamorous', colors:['#000'], image:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop&crop=top', related:['a1','a4','p1'] },
  { id:'a8', title:'Wrist Watch Gold', category:'accessories', subcategory:'Watches', occasion:'Office', style:'Classic', colors:['#FFD700'], image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop', related:['a2','a3','o2'] },
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

export const ageGroupRanges = {
  Infants: [0, 2],
  Kids: [3, 12],
  Teenagers: [13, 19],
  'Young Adults': [20, 29],
  Adults: [30, 44],
  'Middle-aged Adults': [45, 59],
  Seniors: [60, 100],
};

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
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=680&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&h=680&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=680&fit=crop',
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
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=680&fit=crop',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&h=680&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=680&fit=crop',
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
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=680&fit=crop',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&h=680&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=680&fit=crop',
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
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&h=680&fit=crop',
      'https://images.unsplash.com/photo-1600091166971-7f9faad6c498?w=500&h=680&fit=crop',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=680&fit=crop',
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
      'https://images.unsplash.com/photo-1566479179817-0b9f4b4a5f3e?w=500&h=680&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&h=680&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=680&fit=crop',
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
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=680&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=500&h=680&fit=crop',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&h=680&fit=crop',
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
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&h=680&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=680&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=680&fit=crop',
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
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    ],
  },
};

const primaryCategories = categories.slice(0, 8);

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

  for (const style of profile.styles) {
    for (const [item, subcategory] of profile.items) {
      if (existing.length + additions.length === 100) break;
      const title = `${style} ${item}`;
      if (titles.has(title)) continue;

      const index = additions.length;
      const audienceIndex = index % (ageGroups.length * genders.length);
      const primaryColor = catalogPalette[index % catalogPalette.length];
      const accentColor = catalogPalette[(index + 3) % catalogPalette.length];
      additions.push({
        id: `${id}-catalog-${String(index + 1).padStart(3, '0')}`,
        title,
        category: id,
        subcategory,
        occasion: profile.occasions[index % profile.occasions.length],
        style,
        colors: [primaryColor.hex, accentColor.hex],
        colorNames: [primaryColor.name, accentColor.name],
        image: profile.images[index % profile.images.length],
        related: existing.slice(0, 3).map((outfit) => outfit.id),
        ageGroup: ageGroups[audienceIndex % ageGroups.length],
        gender: genders[Math.floor(audienceIndex / ageGroups.length)],
      });
      titles.add(title);
    }
    if (existing.length + additions.length === 100) break;
  }

  return [...existing, ...additions].map((outfit, index) => {
    const [minAge, maxAge] = ageGroupRanges[outfit.ageGroup];
    const suitableGenders = outfit.gender === 'Women' && outfit.subcategory !== 'Sarees'
      ? ['Women', 'Gender-neutral']
      : [outfit.gender];

    return {
      ...outfit,
      ageGroups: [outfit.ageGroup],
      ageRange: [minAge, maxAge],
      genderSuitability: suitableGenders,
      itemType: outfit.subcategory,
      description: `${outfit.style} ${outfit.subcategory.toLowerCase()} for ${outfit.occasion.toLowerCase()} occasions.`,
      colorNames: outfit.colorNames || [...new Set(outfit.colors.map((color) => colorNames[color.toUpperCase()] || 'Multicolor'))],
      season: outfit.category === 'seasonal' ? outfit.subcategory : seasons[index % seasons.length],
      imageSourceStatus: 'unverified',
    };
  });
});

export const imageSourceNote = 'Image URLs are existing Unsplash sources. Availability and item-to-image matches have not been verified; review them before production use.';
