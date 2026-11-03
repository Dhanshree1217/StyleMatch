import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SafeImage from '../components/SafeImage';
import { useAuth } from '../context/AuthContext';
import { getColorProfile, saveColorProfile } from '../utils/storage';
import { Palette, Save, CheckCircle } from 'lucide-react';

const SKIN_TONES = [
  { label: 'Fair',        color: '#FDEBD0', textColor: '#5a3e2b' },
  { label: 'Light',       color: '#F5CBA7', textColor: '#5a3e2b' },
  { label: 'Light Medium',color: '#E59866', textColor: '#fff' },
  { label: 'Medium',      color: '#CA6F1E', textColor: '#fff' },
  { label: 'Olive',       color: '#A04000', textColor: '#fff' },
  { label: 'Tan',         color: '#784212', textColor: '#fff' },
  { label: 'Deep',        color: '#4A235A', textColor: '#fff' },
  { label: 'Rich Deep',   color: '#1C1C1C', textColor: '#fff' },
];

const SKIN_TONE_PALETTES = {
  Fair: [
    { name: 'Emerald Green', hex: '#0f766e' },
    { name: 'Royal Blue', hex: '#1d4ed8' },
    { name: 'Wine', hex: '#7f1d1d' },
    { name: 'Lavender', hex: '#8b5cf6' },
    { name: 'Ivory', hex: '#f5f5f4' },
    { name: 'Soft Pink', hex: '#ec4899' },
  ],
  Light: [
    { name: 'Rose Pink', hex: '#e11d48' },
    { name: 'Cobalt Blue', hex: '#2563eb' },
    { name: 'Plum', hex: '#7c3aed' },
    { name: 'Muted Sage', hex: '#6b8f71' },
    { name: 'Peach', hex: '#fb923c' },
    { name: 'Ivory', hex: '#f5f5f4' },
  ],
  'Light Medium': [
    { name: 'Coral', hex: '#f97316' },
    { name: 'Teal', hex: '#0f766e' },
    { name: 'Olive Green', hex: '#6b8e23' },
    { name: 'Mustard', hex: '#d97706' },
    { name: 'Terracotta', hex: '#c2410c' },
    { name: 'Wine', hex: '#7f1d1d' },
  ],
  Medium: [
    { name: 'Gold', hex: '#d4a017' },
    { name: 'Emerald Green', hex: '#0f766e' },
    { name: 'Royal Blue', hex: '#1d4ed8' },
    { name: 'Maroon', hex: '#7f1d1d' },
    { name: 'Cream', hex: '#fef3c7' },
    { name: 'Rust', hex: '#b45309' },
  ],
  Olive: [
    { name: 'Deep Teal', hex: '#0f766e' },
    { name: 'Terracotta', hex: '#c2410c' },
    { name: 'Gold', hex: '#d4a017' },
    { name: 'Warm Beige', hex: '#d6b89a' },
    { name: 'Plum', hex: '#7c3aed' },
    { name: 'Forest Green', hex: '#14532d' },
  ],
  Tan: [
    { name: 'Cobalt Blue', hex: '#2563eb' },
    { name: 'Orange', hex: '#f97316' },
    { name: 'Forest Green', hex: '#14532d' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Magenta', hex: '#db2777' },
    { name: 'Gold', hex: '#d4a017' },
  ],
  Deep: [
    { name: 'Bright Red', hex: '#dc2626' },
    { name: 'Royal Blue', hex: '#1d4ed8' },
    { name: 'Emerald Green', hex: '#0f766e' },
    { name: 'Fuchsia', hex: '#db2777' },
    { name: 'Gold', hex: '#d4a017' },
    { name: 'Ivory', hex: '#f5f5f4' },
  ],
  'Rich Deep': [
    { name: 'Gold', hex: '#d4a017' },
    { name: 'Bright Red', hex: '#dc2626' },
    { name: 'Cobalt Blue', hex: '#2563eb' },
    { name: 'Lime Green', hex: '#84cc16' },
    { name: 'Magenta', hex: '#db2777' },
    { name: 'Ivory', hex: '#f5f5f4' },
  ],
};

const COLOR_OUTFIT_LIBRARY = {
  'Emerald Green': [
    { img: 'https://img2.ogaanindia.com/pub/media/catalog/product/cache/3f6619daccdb194398d06464ab49fa6e/p/h/ph22031.jpg', title: 'Emerald Saree' },
    { img: 'https://www.vaasvajaipur.com/cdn/shop/files/ChatGPT_Image_May_4_2026_10_41_36_PM.png?crop=center&height=800&v=1777914741&width=600', title: 'Emerald Kurti Set' },
    { img: 'https://i.etsystatic.com/56611634/r/il/828ce7/7695025443/il_570xN.7695025443_gj8i.jpg', title: 'Emerald Formal Suit' },
    { img: 'https://www.bullionknot.com/cdn/shop/files/khushi_1.jpg?v=1775908824', title: 'Emerald Anarkali' },
    { img: 'https://www.nidraa.in/cdn/shop/files/20012503_2_M.jpg?v=1738388715&width=2048', title: 'Emerald Co-ord Set' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhpnWigVce0MqJXhaR2BefIpq9CCWmb10zxUGrvt69E3CQmqQEvyAMYJR5&s=10', title: 'Emerald Festival Look' },
  ],
  'Royal Blue': [
    { img: 'https://d1fufvy4xao6k9.cloudfront.net/looks/3038/royal-blue-double-breasted-blazer-with-light-trousers-and-brown-loafers.jpg', title: 'Royal Blue Blazer' },
    { img: 'https://kyleefashion.com/cdn/shop/files/IMG_7399.jpg?v=1687345459', title: 'Royal Blue Co-ord Set' },
    { img: 'https://i.pinimg.com/736x/45/79/45/457945c49dbe55ba2a673b40bdc8d1a1.jpg', title: 'Royal Blue Dress' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoUZYlXpbK5S6gDJoSpF8JDgr-4xHu18dxrTVXwVWiaQKzg45K7DfyNBHA&s=10', title: 'Royal Blue Saree' },
    { img: 'https://www.iraho.com/cdn/shop/files/1_aae6deaf-8464-46bc-8e50-f497e3d4ded6.jpg?v=1772867438&width=1445', title: 'Royal Blue Anarkali' },
    { img: 'https://images.meesho.com/images/products/1034408201/wtmnl_512.webp?width=512', title: 'Royal Blue Formal Shirt' },
  ],
  Wine: [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpo3JAJ_PP-1-6uoioc6DqJpJ_9VlnDjioGYtd1N9KlA89eDPbg1SYYDgX&s=10', title: 'Wine Saree' },
    { img: 'https://glamourental.com/cdn/shop/products/Wine_Color_Net_Embroidered_Anarkali_Gowns_with_Dupatta_-_Clearance.jpg?v=1731594888', title: 'Wine Evening Gown' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd2D6VZAhO5DHxdgx-jVvi9mcY4BxBZe6oYpiH5LnM0fpeGYXIXwFExbg&s=10', title: 'Wine Midi Dress' },
    { img: 'https://manyavar.scene7.com/is/image/manyavar/LB9286_422-WINE_444.4358_23-12-2024-16-59:283x395?dpr=on,2.625', title: 'Wine Lehenga' },
    { img: 'https://www.royalexport.in/product-img/wine-color-rayon-kurti-pant-se2-1690022136.jpg', title: 'Wine Kurti' },
    { img: 'https://themanatomy.com/cdn/shop/files/Wine_Shirt_Light_Grey_pant.png?v=1774618750&width=2048', title: 'Wine Office Set' },
  ],
  Lavender: [
    { img: 'https://assets.ajio.com/medias/sys_master/root/20240905/HqIf/66d9df471d763220fac8a0b0/-473Wx593H-700380266-lavender-MODEL.jpg', title: 'Lavender Co-ord Set' },
    { img: 'https://linentrail.com/cdn/shop/files/1L9A0147_747fae61-73bd-4214-9c42-acbdd92309bc.jpg?v=1745775191&width=1080', title: 'Lavender Casual Set' },
    { img: 'https://phenav.com/wp-content/uploads/2024/06/PHV_1021_Lavender-8-scaled.jpg', title: 'Lavender Party Co-ord' },
    { img: 'https://assets0.mirraw.com/images/13190890/image_zoom.jpeg?1744024415', title: 'Lavender Lehenga' },
    { img: 'https://img.tatacliq.com/images/i17//1348Wx2000H/MP000000021784522_1348Wx2000H_202404031846081.jpeg', title: 'Lavender Kurti' },
    { img: 'https://www.shauryasanadhya.com/cdn/shop/products/DSC1914.jpg?v=1745482559', title: 'Lavender Dress' },
  ],
  Ivory: [
    { img: 'https://ik.imagekit.io/4sjmoqtje/kalki-usa/tr:w-1400,c-at_max/cdn/shop/files/ivory-resham-embellished-silk-bridal-lehenga-set-with-two-duapattas-sg365088-1_5db83bb6-e379-43e4-9c71-e7d03d83eda2.jpg?v=1764055138', title: 'Ivory Linen Dress' },
    { img: 'https://m.media-amazon.com/images/I/817MNmGNciL._AC_UY1100_.jpg', title: 'Ivory Minimal Look' },
    { img: 'https://i.pinimg.com/736x/d7/fd/d9/d7fdd9b7aaea886654e4d12ef8fbd96f.jpg', title: 'Ivory Lehenga' },
    { img: 'https://www.ottostore.com/cdn/shop/files/ChatGPT_Image_Aug_22_2026_11_43_45_AM.png?v=1787380490', title: 'Ivory Formal Shirt' },
    { img: 'https://labeliris.com/cdn/shop/files/LabelIris3044.jpg?v=1774702864&width=3335', title: 'Ivory Blazer Set' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeWmIKtbp4OyjDuZAwKRsX5yxr6FfC50VVwKPNgxPC71nvO03_vWelMBUc&s=10', title: 'Ivory Festive Kurti' },
  ],
  'Soft Pink': [
    { img: 'https://img2.ogaanindia.com/pub/media/catalog/product/cache/3f6619daccdb194398d06464ab49fa6e/a/k/akkritikharbandabridal1.jpg', title: 'Pink Lehenga' },
    { img: 'https://img.tatacliq.com/images/i25//1348Wx2000H/MP000000027458550_1348Wx2000H_202507210932004.jpeg', title: 'Pink Party Co-ord' },
    { img: 'https://royalanarkali.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2024/05/baby-pink-georgette-thread-embroidery-salwar-suit-be-170-baby-pink.jpeg.webp', title: 'Pink Salwar Suit' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQejyG14JtwQ1xFkhBFvOUvp2pR0mh7OGtkEGQTgldBKdoWHLwthBs1zaQ&s=10', title: 'Pink Satin Dress' },
    { img: 'https://www.fabfunda.com/product-img/cotton-fabric-pink-colour-top-1744288016.jpeg', title: 'Pink Casual Set' },
    { img: 'https://www.truewest.in/cdn/shop/files/CaptureOneCatalog3192copy.jpg?v=1776564532&width=1946', title: 'Pink Midi Gown' },
  ],
  'Rose Pink': [
    { img: 'https://www.elahe.in/cdn/shop/files/185_136d3401-400f-43fa-a896-4c8a5cfb148a_2048x.jpg?v=1729321815', title: 'Rose Party Co-ord' },
    { img: 'https://www.mohifashion.com/cdn/shop/articles/E-39.jpg?v=1763146863', title: 'Rose Lehenga' },
    { img: 'https://assets2.andaazfashion.com/media/catalog/product/n/e/net-and-silk-party-wear-gown-in-rose-pink-colour-lstv04197-1.jpg?tr=w-800,h-1200,c-at_max,q-70', title: 'Rose Satin Dress' },
    { img: 'https://memy.co.in/cdn/shop/files/391_13_9696f918-31d2-4467-8920-a03ae9eac950.jpg?v=1754546461&width=900', title: 'Rose Co-ord Set' },
    { img: 'https://ekantastudio.com/cdn/shop/files/E5A325A1-AA69-4420-A01D-E36391ABED27.png?v=1769598616', title: 'Rose Kurti' },
    { img: 'https://www.azazie.com/blog/wp-content/uploads/2026/03/Image20260311163458-740x1024.jpg', title: 'Rose Minimal Dress' },
  ],
  Plum: [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXqlaeaIg9YhBGCeKFxWgGY0bDE_dDYlIm7rEcmRuLl9-SxHkjReLynM0&s=10', title: 'Plum Evening Dress' },
    { img: 'https://www.onehoneyboutique.com/cdn/shop/products/TK069-6.jpg?v=1765189747&width=2048', title: 'Plum Sequin Dress' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSINgwEccghoyjzuuX_WFSCMFkn0xsfrXE639v_v33GBabwdmJD8BfZMmSe&s=10', title: 'Plum Saree' },
    { img: 'https://img.faballey.com/images/Product/XLH50171Z/d3.jpg', title: 'Plum Festive Lehenga' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPr3-NOpPc7xcfRNVmfdq5Ac9OCxq1sqg2M6AszzdUaT01GNGg1Lq6NTxQ&s=10', title: 'Plum Dupatta Set' },
    { img: 'https://i.etsystatic.com/41232345/r/il/e1c5d3/6715347056/il_570xN.6715347056_qftu.jpg', title: 'Plum Occasion Suit' },
  ],
  Coral: [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN54I7UdAu2zZfxgj5_phdXUwSGGZSHmFPibwLnTZ3j0Ce8LyUHkb-nv-6&s=10', title: 'Coral Summer Dress' },
    { img: 'https://www.zibaa.in/cdn/shop/files/Coral_Chikankari_kurti_d8918b3d-f2a2-41cc-ae01-1ba1542f2029.webp?v=1762972241&width=1300', title: 'Coral Kurti' },
    { img: 'https://images.biba.in/dw/image/v2/BKQK_PRD/on/demandware.static/-/Sites-biba-product-catalog/default/dw94a0f998/images/ss26/skdbask31741ss26crl_1.jpg?sw=900&sh=1350&q=100&strip=false', title: 'Coral Salwar Suit' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp8B2kAaY6o2lDO9o4vZshE-TFKZfEEZxhwxAZuNeKxmEG8sKGKgkvNGw&s=10', title: 'Coral Co-ord Set' },
    { img: 'https://www.lindseybrown.com/cdn/shop/files/Coral_Orange_off_the_shoulder_silk_maxi_dress_to_wear_on_holiday_by_Lindsey_Brown_luxury_resort_wear.jpg?v=1758193561&width=2048', title: 'Coral Maxidress' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Z_uoB50DUqlmVblWy9a3QPVzQZUa694aFps5XIVjekwNXPRrI2KSYT8&s=10', title: 'Coral Smart Casual' },
  ],
  Teal: [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSucrwiNru73jRQGtjrrCCIc8wj530yETJnKEd3c3NrEcReU0AQwSDinqX0&s=10', title: 'Teal Saree' },
    { img: 'https://img.theloom.in/live/media/catalog/product/cache/101a419f04e4161b4f9f2458eaa9a195/r/a/rayku04mfg-tealgha4_4_.jpg', title: 'Teal Kurti' },
    { img: 'https://tigc.in/cdn/shop/files/1225-SHSOCS-02-03_7.jpg?v=1777715834&width=360', title: 'Teal Smart Casual' },
    { img: 'https://studiominc.com.au/cdn/shop/files/teal.lustre.front.2_1080x.jpg?v=1700619341', title: 'Teal Formal Dress' },
    { img: 'https://i.pinimg.com/originals/68/dc/72/68dc722abdf5f16e6150fcd212f756d3.jpg', title: 'Teal Gown' },
    { img: 'https://snipesmenswear.com/cdn/shop/files/IMG_00027_359261ae-efc5-4c1b-87c4-eedf284f22dd.png?v=1787231074', title: 'Teal Blazer' },
  ],
  'Olive Green': [
    { img: 'https://fashionbites.in/wp-content/uploads/2026/03/Styled-Olive-Green-Cotton-Co-ord-Set-for-Women.jpg', title: 'Olive Green Co-ord Set' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvMudQweE8rVU5-_nV3NkBLvlpQiIcOCZ6Zhq-HrAf-6AhBk9jK0posMkw&s=10', title: 'Olive Green Casual Look' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcw_1_TePggYklPgakS7GzOVjB7IFaIb2tUWJbGe7-KI3ZJvK0iwW4KGin&s=10', title: 'Olive Green Dress' },
    { img: 'https://static1.squarespace.com/static/5bedbe59fcf7fdd30dddd883/5cb259afe2c483d25099d2b0/68a46d45fca699004f667b44/1791571138969/DSC04724.jpg?format=1500w', title: 'Olive Green Saree' },
    { img: 'https://ekantastudio.com/cdn/shop/files/DSC04622.jpg?v=1790841433', title: 'Olive Green Kurti Set' },
    { img: 'https://d1fufvy4xao6k9.cloudfront.net/images/blog/posts/2025/09/olive_green_suit.jpg', title: 'Olive Green Suit' },
  ],
  Gold: [
    { img: 'https://thenodmag.com/_next/image?url=https%3A%2F%2Fassets.thenodmag.com%2Fwebsite-assets%2Fsuhanakhan2_The_Wedding_Collective_e8dba3bd93-odrdkqaapsixnqd-3x4.jpg&w=2048&q=95', title: 'Gold Lehenga' },
    { img: 'https://www.thedressoutlet.com/cdn/shop/files/cb131_champagne.jpg?format=webp&v=1764847836&width=800', title: 'Gold Saree' },
    { img: 'https://shreeman.in/cdn/shop/files/IMG_5410.png?v=1786804223&width=1206', title: 'Gold Sequin Dress' },
    { img: 'https://medias.utsavfashion.com/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/w/o/woven-art-silk-kurta-jacket-set-in-cream-v1-mhg2268.jpg', title: 'Gold Party Co-ord' },
    { img: 'https://ik.imagekit.io/4sjmoqtje/kalki-usa/tr:w-1400,c-at_max/cdn/shop/files/beige-gold-heavy-work-bridal-lehenga-set-with-two-dupattas-sg370239-4.jpg?v=1762774533', title: 'Gold Anarkali' },
    { img: 'https://i.pinimg.com/736x/cb/b8/83/cbb8833779fde24b9a4b6f6c14c09933.jpg', title: 'Gold Casual Set' },
  ],
  'Bright Red': [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFEEBOtIVgCv6tjCS19XYvruOfSbm3OrEt1yzvOe2EIuWMOAuDTASSwQ&s=10', title: 'Red Saree' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ01E-tXa9pdTN0PKoALRNu0ty0rWWuLPbm7QLHXnaXm92oyrduE0xOJjM&s=10', title: 'Red Lehenga' },
    { img: 'https://subhvastra.in/cdn/shop/files/khushimali_14_1755521117_3701901898741100133_35460578157_2048x.jpg?v=1755582186', title: 'Red Dress' },
    { img: 'https://i.pinimg.com/736x/68/af/4b/68af4b251780d45bf94ca2a8439d66ce.jpg', title: 'Red Gown' },
    { img: 'https://www.wforwoman.com/cdn/shop/files/23AUSTKW10463-117469_1.jpg?v=1721302590', title: 'Red Kurti' },
    { img: 'https://www.pyoor.co.in/cdn/shop/files/Laila_Set_in_Red_in_Eastern_Fit_4.webp?v=1763977827&width=1024', title: 'Red Statement Set' },
  ],
  'Cobalt Blue': [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLT8copIlcs9qHu86BQV2O8ZqQq754y66Rs2G7PgA-_UUynBkum_yauKS3&s=10', title: 'Cobalt Blue Blazer' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnngB1uyNKIS5zfZ75Y4P-aqWHtXN0yfeRLJfj5e0tJ0P9Ej-c6lzYCRw&s=10', title: 'Cobalt Blue Dress' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN9yTMLeFZRc9dvtnB7Kcca432-r5aqsQrem2zMR67TG1kfhkwQT2IBvO_&s=10', title: 'Cobalt Blue Salwar Suit' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-D4fqSRHPpiSonObj122XyRHyNEsAVXo1X6fmWaNMBuJMDbj_E5gWiY&s=10', title: 'Cobalt Co-ord Set' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh8TTN99RjijunsRI_q2c0-acGWVccENo1Xr1EUVe4SvJYx1iXvqs8n5Ps&s=10', title: 'Cobalt Blue Shirt' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_a--vXMWvrROvDn16DlVEWxUNvfm5C-IItKYf-Dv0keLafWptEiL3AdUx&s=10', title: 'Cobalt Blue Kurti' },
  ],
  'Lime Green': [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEbiaUxBmJVLBEcrvjUWLgPujQX690SfZKN7waUH59JCnW5u7Q12k7cWU&s=10', title: 'Lime Summer Dress' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYuIc0pOlMtZuEV5qCaEy_aepJDbyn1AUAONfhHmM-Q5kZXQU2FHMMMx0&s=10', title: 'Lime Co-ord Set' },
    { img: 'https://d1fufvy4xao6k9.cloudfront.net/images/blog/posts/2024/10/hockerty_httpss.mj.runykxim67hiz8_the_full-body_photo_of_woma_d76fb0da-9e07-4ba6-bbc9-88bc8c0cc251_1.jpg', title: 'Lime Casual Look' },
    { img: 'https://assets0.mirraw.com/images/11798217/ACW7933_zoom.jpg?1693375864', title: 'Lime Suit' },
    { img: 'https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/14932568/2021/7/26/466d8407-04eb-4f3b-bfa9-b0557177b8d11627286115210PeopleMenGreenWashedColourblockedDenimJacketwithEmbroidered1.jpg', title: 'Lime Denim Set' },
    { img: 'https://www.kalkifashion.com/cdn/shop/files/sg383490-1.jpg?v=1784527423', title: 'Lime Kurti' },
  ],
  Magenta: [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwvZzOw74E81NPRsnDYoZBm3kgrS-y-M7bnf8fXdjkCiNK0WLZRINB80Y&s=10', title: 'Magenta Party Co-ord' },
    { img: 'https://in.g3fashion.com/cdn/shop/files/1791973258_2115_MAGENTA.jpg?v=1792152519&width=460', title: 'Magenta Lehenga' },
    { img: 'https://taractara.com/cdn/shop/files/magenta-sequin-embellished-co-ord-set-9460859.jpg?v=1792262292', title: 'Magenta Co-ord Set' },
    { img: 'https://cdn-1.azazie.com/upimg/h65/3f/b7/12ec8c756e341f083b673febaa213fb7.jpg', title: 'Magenta Sequin Gown' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFFpnGsAKanVlzinSnQNnivpInQEDNCHYVAwNsBoX3NVkqwo7dga3npyo&s=10', title: 'Magenta Festive Dress' },
    { img: 'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/g/o/gota-embellished-cotton-anarkali-suit-in-magenta-v1-kjn4673.jpg', title: 'Magenta Anarkali' },
  ],
  'Muted Sage': [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPaGKKZRBtCCYF2d2GqnCMWN5itwr933L83vwUKdjiLQ&s', title: 'Sage Casual Look' },
    { img: 'https://seemagujral.com/cdn/shop/files/Untitleddesign-2025-04-11T120906.928.png?v=1744353567', title: 'Sage Spring Set' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGWany40fGWj-G_SemeWxm52cyF3Q8bmdOpk92_63KWFGgFvAO5N_nfd0&s=10', title: 'Sage Co-ord' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp-_E-Isz9DSBgkfi6mfXFdi5bUFIx-3YOSGVudZ7rKtSGjcddXNAc1m8&s=10', title: 'Sage Blazer Dress' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgnRh0C5fRFiuWXmPpN91B4i96pXpPr1NWt8yYlcmWoG6WdHUsqiwvL4M&s=10', title: 'Sage Kurti Set' },
    { img: 'https://assets2.andaazfashion.com/media/catalog/product/s/o/soft-silk-sage-green-dori-embroidered-heavy-saree-sarv167538-1.jpg', title: 'Sage Festive Look' },
  ],
  Peach: [
    { img: 'https://www.iwearmystyle.in/cdn/shop/files/FotoJet_5.png?v=1751034754', title: 'Peach Maxi Dress' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc4uyGrg8mc2LQvHt2CBo5h5BPJSaWcysZ6UgjKmtIOT6EjYVIs8l_Diah&s=10', title: 'Peach Kurti' },
    { img: 'https://www.soch.com/media/catalog/product/p/e/peach_roman_silk_geometric_print_co-ord_set_with_mirror_work_womens_soch-fws5ks10741d_01.jpg', title: 'Peach Co-ord Set' },
    { img: 'https://www.shauryasanadhya.com/cdn/shop/files/Label-194_1400x.jpg?v=1745481870', title: 'Peach Lehenga' },
    { img: 'https://cdn.sewmamasew.com/wp-content/uploads/2026/05/Peach-Midi-Dress-With-Sandals-Spring-Outfit.jpg', title: 'Peach Midi Dress' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvl46_NrjSDhhNl_EOrPEyBxT1uTGM68rgI-yMu5TsElpFEKBqnYGe-Fk&s=10', title: 'Peach Linen Set' },
  ],
  'Deep Teal': [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEGGnFdAPhgD3XT15BNVJBsNbnJj2qd75GOGhiHnSGo9OtLQJR0eQu5Jw&s=10', title: 'Deep Teal Saree' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk8G4ifWDBqrG1RGRE-NdGHpZRqif4HQfOrhE_3s58f5culBxbwFvfsvrr&s=10', title: 'Teal Formal Dress' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsaXwpz8_kiMY5SIqYbdJPaSEe6s1hU1Kbsb53RuzSTFYRrUt9SkFl-iA6&s=10', title: 'Teal Smart Casual' },
    { img: 'https://missrunway.com.au/cdn/shop/files/azaliah.teal.front.jpg?crop=center&height=2088&v=1760581085&width=1492', title: 'Teal Evening Dress' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDYYB6alOntk96sJOmmWekbIpIgWEXXhEPnxURwGz9XDj6Wukx-QckbIPa&s=10', title: 'Teal Suit' },
    { img: 'https://i.pinimg.com/736x/b8/76/78/b87678d2a294e87c3bf40a883171ee6f.jpg', title: 'Teal Blazer' },
  ],
  'Forest Green': [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0cOMVqI4AkHI2c2xYGJuZvVAyASS1K1-dZeBoyE42foTuS3pYlTDjcU8g&s=10', title: 'Forest Green Suit' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWT4RPxosx4Yn-AplQaKGq3PJG12uhj2yY36xmeLPIQzRTR2LgsbX50gbh&s=10', title: 'Forest Green Saree' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfRiNBV70Fblk_fTtPxyYXG4GcNzZqy-Q46Yz3KA0jPCOFXbNmK4-YrOQ&s=10', title: 'Forest Green Kurti' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwU1ChOyErYAipYk5gzivm_AEnQV9ukJulE6bSrRLkCcauPr7YEt3WssEm&s=10', title: 'Forest Green Casual Look' },
    { img: 'https://neroindia.com/cdn/shop/files/3_729c916b-f85d-49f3-a9e0-abc89f333246.jpg?v=1737917614&width=1080', title: 'Forest Green Co-ord' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvf6-TxX6z8BceLDADLMGcNEOtn5tqyd6NF-GdEIBvJhw7wfPCLr3vwPM_&s=10', title: 'Forest Green Dress' },
  ],
  'Warm Beige': [
    { img: 'https://cdn.shopify.com/s/files/1/0757/0767/9011/files/unnamed_70.png?v=1749184040', title: 'Beige Linen Dress' },
    { img: 'https://cdn.shopify.com/s/files/1/0526/5496/4893/files/beige-blazer-for-men_480x480.jpg?v=1710760304', title: 'Beige Blazer' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2RUS-h4Dxb3izg7-1rdtBMSAXsJ0rkaqOpK7Ayi7bU4uoOUztcnWf9_Q&s=10', title: 'Beige Minimal Look' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3-zpeZyg6B-yuVZuLcfvjbe2QJapcar7DV9rlGfBrY04uuuGAtN_noI4&s=10', title: 'Beige Lehenga' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0jAYurylKLYgkxK3yNmtz27HwTGCfWcSgVMkGNlCyzA&s', title: 'Beige Kurti Set' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ZbTeoRzaAHAZ7LC2Ob8-ff9XwbMUn0WMS6DAmPWFu-3ALpGtBDYaFEU&s=10', title: 'Beige Co-ord' },
  ],
  White: [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKjuee4LMzQTMHSEOx6Z0iAV2kRN7WEzkonpi-IgdU8lsjRbnfJnn4ajYB&s=10', title: 'White Formal Shirt' },
    { img: 'https://i.etsystatic.com/32501528/r/il/4777b5/5074098702/il_570xN.5074098702_jjkj.jpg', title: 'White Linen Dress' },
    { img: 'https://www.revitalash.com/cdn/shop/articles/revitalash-0902-blog-2.0-hero-banner_dac48005-3159-4d3e-887f-085902fe0777.jpg?v=1756155374', title: 'White Minimal Look' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSePDqGQI501GU9kjtsHvQClpr9BmsZ8XalViW7antKZHUnpwUa4m-l9nQ&s=10', title: 'White Lehenga' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwULNXYwQwguph5Y_9kuS_qydS5o0WqiR-v5i7eQX4EYV8Iot30X4-jpB-&s=10', title: 'White Blazer Set' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyqae1pBP3EPM_5Ji6IdKG4axuxrVmxNQ56SCKwdtXYC91AlH6RmgmBSk&s=10', title: 'White Festive Look' },
  ],
  Orange: [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe0QGACgrVe_eeP0bdMpwmXtxGDKajlAH6VhAjvewfnu45212KCAfS2qUZ&s=10', title: 'Orange Summer Dress' },
    { img: 'https://sheetalbatra.com/cdn/shop/files/6571_copy.jpg?v=1769668599&width=800', title: 'Orange Salwar Suit' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1JyNNq6mROY7JfproebLAULtdjVv6k3jFz0GTJNlsagT_DxmyLFDZCtvX&s=10', title: 'Orange Kurti' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF03pzGBG-3XJ3GmRGX2F_IhMnpXxRXJWRggpnmilX_eG2ZY9JCMojrBs&s=10', title: 'Orange Co-ord Set' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMBZ8j9aP4RQkcTUUwFnRAHxc9sOsC4eNLS1B22lFHly_qzypNk48ZYJxD&s=10', title: 'Orange Maxi Dress' },
    { img: 'https://cdn.shopify.com/s/files/1/0028/6559/4412/files/Orange_t-shirt_article_5.jpg?v=1781369953', title: 'Orange Smart Casual' },
  ],
  Mustard: [
    { img: 'https://clothsvilla.com/cdn/shop/files/masterd-yellow-premium-readymade-anarkali-suit-set-faux-blooming-with-heavy-sequins-thread-embroidery_3.jpg?format=webp&v=1754904996&width=480', title: 'Mustard Co-ord Set' },
    { img: 'https://www.fabfunda.com/product-img/trendy-collection-mustard-yell-1746863852.jpeg', title: 'Mustard Kurti' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTry2SxoMFuPxZkD5fls1xSDR0itfaGiYgr85YCTnxQMZpTxkg2J-XIwwPM&s=10', title: 'Mustard Summer Dress' },
    { img: 'https://assets.myntassets.com/w_200,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/OCTOBER/7/49f610b2946c48a2a0b201645afddcf5.jpg', title: 'Mustard Lehenga' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRJ7BI1L_vhvj2yoUF1kkYWss_scMzHmY3AIrIC8deEhtSl5SGViOjEiMp&s=10', title: 'Mustard Festive Set' },
    { img: 'https://www.royalexport.in/product-img/mustard-cotton-lehenga-choli-w1-1756883353.jpg', title: 'Mustard Kurta Set' },
  ],
  Terracotta: [
    { img: 'https://cdn.sewmamasew.com/wp-content/uploads/2026/05/Terracotta-Off-Shoulder-Dress-with-Statement-Earrings.jpg', title: 'Terracotta Salwar Suit' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRuvjZXp9T0dDgD105-aCcTCyBEQP7H9puNI7wrh4B3HmMlOAiOYCrpHJa&s=10', title: 'Terracotta Kurti' },
    { img: 'https://cdn.shopify.com/s/files/1/0572/1679/4779/files/BB1265.webp?v=1778140856', title: 'Terracotta Casual Look' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwQ0OyfDfX_Q4g4HYsRJC7LzZxTSK9KfmpWUrpFb1bZX27bgtBg6v6uOI&s=10', title: 'Terracotta Co-ord Set' },
    { img: 'https://i.etsystatic.com/46621316/r/il/62b428/8245811382/il_fullxfull.8245811382_a414.jpg', title: 'Terracotta Minimal Dress' },
    { img: 'https://zebeinindia.com/cdn/shop/files/linen-men-mandarin-collar-shirt-terracotta.jpg?v=1791087488&width=2048', title: 'Terracotta Midi Dress' },
  ],
  Maroon: [
    { img: 'https://tiimg.tistatic.com/fp/1/005/336/full-sleeves-maroon-color-women-dress-with-neck-design-964.jpg', title: 'Maroon Saree' },
    { img: 'https://medias.utsavfashion.com/media/catalog/product/cache/1/image/500x/040ec09b1e35df139433887a97daa66f/s/o/solid-color-velvet-dress-in-maroon-v1-tve502.jpg', title: 'Maroon Lehenga' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEEJ1y2D71SzPgLCFkO0l_4mkxFJjbwzd6OBI9uSiM7Mv8cbbsJlBko8g&s=10', title: 'Maroon Dress' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe5d47lTqXhN1rkbhiEGKS03QOkfn_BKeSvEuD9ngTex1nF7TQBnPzuHG1&s=10', title: 'Maroon Evening Gown' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgPFMamIi1-tXyEY5hix8e3BTHNFI-xuA_2caGfQNSChwcGc-a3YXSNb1W&s=10', title: 'Maroon Anarkali' },
    { img: 'https://shop.tinybaby.in/cdn/shop/files/D.NO.2246MAROON.jpg?v=1702039111', title: 'Maroon Kurti' },
  ],
  'Fuchsia': [
    { img: 'https://static.cilory.com/759332-thickbox_default/fuchsia-pink-flared-georgette-maxi-dress.jpg', title: 'Fuchsia Party Co-ord' },
    { img: 'https://i.pinimg.com/736x/78/31/b7/7831b756d29785db47d9def24e87d01b.jpg', title: 'Fuchsia Lehenga' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4rE4lSpqIM8ZFwXItwj2uqOOrV8itLCCFXigWkGPTOjtC9igGHv-GUgM&s=10', title: 'Fuchsia Sequin Dress' },
    { img: 'https://assets2.andaazfashion.com/media/catalog/product/f/u/fuchsia-pink-satin-saree-with-printed-work-for-diwali-festival-sarv192508-1.jpg?tr=w-800,h-1200,c-at_max,q-70', title: 'Fuchsia Co-ord Set' },
    { img: 'https://img.perniaspopupshop.com/catalog/product/k/i/kiara_advani_in_devnaagri_1.jpg?impolicy=detailimageprod', title: 'Fuchsia Occasion Gown' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_bWIfF2r0k8LcyhgGImD_ZOGX9TQu3IXGtUsniTnvf_WNL3Ocu886aU&s=10', title: 'Fuchsia Festive Suit' },
  ],
  Cream: [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ceODoFryFMIRiUQ2NnDPeMO8nDd6gAwuN9oXfLeM0d0q8suj0M9DTGc&s=10', title: 'Cream Linen Dress' },
    { img: 'https://tumuh.in/cdn/shop/files/987358943.jpg?v=1787911148&width=480', title: 'Cream Minimal Look' },
    { img: 'https://images.cbazaar.com/images/cream-silk-jacquard-printed-bandhgala-suit-for-men-sudkkbct255991-u.jpg', title: 'Cream Lehenga' },
    { img: 'https://medias.utsavfashion.com/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/h/a/hand-embroidered-art-silk-palazzo-suit-in-light-beige-v1-kch15758.jpg', title: 'Cream Blazer Set' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwCXiqlA-mjJUbQO1lQNkDYW4WkkuSfXaGQbMICIL3mGXn6mnfJSZO0IY&s=10', title: 'Cream Kurti Set' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjn9XSXZxrtHN3F1E7vw5QkGAQUWNrsI8panB7Q3eDEorFuWG_yiSyuS0&s=10', title: 'Cream Formal Shirt' },
  ],
  'Rust': [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnYVpB7-Ug2rPRdYXMNXyz1Jt-01jueuc9ZcT_npIrgtKsUlj1n0LUWlJC&s=10', title: 'Rust Salwar Suit' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ80sHoCJfyp4FyJEdFiEQ3PM_DkIWZ4-p9Fb6Buxhode_9jM8e1Mph6WQ&s=10', title: 'Rust Kurti' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRboQ1RZkqOX3XQv7bYJ9IR1wGn1YDCOhW8H-hyeu8JAmnCsOcmRak9dZjk&s=10', title: 'Rust Casual Look' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTAk1_S0trPFBOTT3kM9aYauEGvlHB-wn6z-D_cZAyQ1z8iRBqiyr8lOI&s=10', title: 'Rust Co-ord Set' },
    { img: 'https://ik.imagekit.io/4sjmoqtje/kalki-usa/tr:c-at_max/cdn/shop/files/rust-banarasi-silk-kurta-jacket-set-for-men-with-embroidery-sg327189-1.jpg?v=1761897069&w=1000', title: 'Rust Midi Dress' },
    { img: 'https://m.media-amazon.com/images/I/61Qyv8+1ZdL._AC_UY1100_.jpg', title: 'Rust Festive Kurti' },
  ],
  'Muted Sage': [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_SngVM37iTuElnRi8TEWHKNwJXu8dAaxxidPbhfy8vliCAv25ElyEQAs&s=10', title: 'Sage Casual Look' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZrd3gysbYX48TFcMt8nYvvvhucO-kz4dEXzco5nov4SGg1QCrUyDgu1Z5&s=10',title: 'sage casual look'}, 
    { img: 'https://www.fabiliciousfashion.com/cdn/shop/files/muted-sage-green-silk-kurta-jacket-setindowestern-for-mencontrast-by-parth-7234742_1800x1800.jpg?v=1755619024', title: 'Sage Co-ord' },
    { img: 'https://www.shadidress.com/wp-content/uploads/2026/09/Pakistani-Sage-Green-Embroidered-Angrakha-Dress.webp', title: 'Sage Blazer Dress' },
    { img: 'https://i.pinimg.com/236x/80/e4/00/80e400591d0f9588b58a33f36b6dd2a2.jpg', title: 'Sage Kurti Set' },
    { img: 'https://www.5feet11.com/cdn/shop/files/IMG179_1080x1080.jpg?v=1769878593', title: 'Sage Festive Look' },
  ],
};

const UNDERTONES = ['Warm', 'Cool', 'Neutral', 'Not Sure'];
const HAIR_COLORS = ['Black', 'Dark Brown', 'Light Brown', 'Blonde', 'Red', 'Grey', 'White', 'Other'];
const EYE_COLORS = ['Black', 'Dark Brown', 'Light Brown', 'Hazel', 'Green', 'Blue', 'Grey'];
const emptyProfile = { skinTone: '', undertone: '', hairColor: '', eyeColor: '' };

export default function MyColorProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [profile, setProfile] = useState(() =>
    user ? (getColorProfile(user.username) || emptyProfile) : emptyProfile
  );
  const [selectedColor, setSelectedColor] = useState(null);
  const [saved, setSaved] = useState(false);

  if (!user) { navigate('/login', { replace: true }); return null; }

  const activeTone = profile.skinTone;

  const recommendedColors = useMemo(() => {
    if (!activeTone) return [];
    return SKIN_TONE_PALETTES[activeTone] || [];
  }, [activeTone]);

  const effectiveSelectedColor = useMemo(() => {
    if (!selectedColor) return null;
    return recommendedColors.some(color => color.name === selectedColor) ? selectedColor : null;
  }, [recommendedColors, selectedColor]);

  const galleryOutfits = useMemo(() => {
    if (!activeTone) return [];
    if (effectiveSelectedColor) return COLOR_OUTFIT_LIBRARY[effectiveSelectedColor] || [];

    return recommendedColors
      .flatMap(color => (COLOR_OUTFIT_LIBRARY[color.name] || []).slice(0, 2))
      .slice(0, 8);
  }, [activeTone, effectiveSelectedColor, recommendedColors]);

  const handleSave = () => {
    saveColorProfile(user.username, profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="cp-main">

        {/* Header */}
        <div className="cp-header">
          <h1 className="cp-title">Find Your Perfect Colours</h1>
          <p className="cp-subtitle">Select your skin tone to discover clothing colours that complement you.</p>
        </div>

        {/* Skin Tone Selector */}
        <section className="cp-section">
          <h2 className="cp-section-title"><Palette size={18} /> Select Your Skin Tone</h2>
          <div className="cp-skin-grid">
            {SKIN_TONES.map(tone => (
              <button
                key={tone.label}
                className={`cp-skin-card ${activeTone === tone.label ? 'cp-skin-card--active' : ''}`}
                onClick={() => { setProfile(p => ({ ...p, skinTone: tone.label })); setSelectedColor(null); }}
                aria-pressed={activeTone === tone.label}
              >
                <span className="cp-skin-circle" style={{ background: tone.color }} />
                <span className="cp-skin-label">{tone.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Recommended Colours */}
        {activeTone && (
          <section className="cp-section">
            <h2 className="cp-section-title">Colours That Suit Your Skin Tone</h2>
            <p className="cp-section-sub">Click a colour to see matching outfits.</p>
            <div className="cp-color-grid">
              {recommendedColors.map(c => (
                <button
                  key={c.name}
                  className={`cp-color-card ${effectiveSelectedColor === c.name ? 'cp-color-card--active' : ''}`}
                  onClick={() => setSelectedColor(selectedColor === c.name ? null : c.name)}
                  aria-pressed={effectiveSelectedColor === c.name}
                >
                  <span
                    className="cp-color-swatch"
                    style={{
                      background: c.hex,
                      border: c.hex === '#ffffff' || c.hex === '#fffde7' || c.hex === '#fff8e1' ? '1.5px solid #e0e0e0' : 'none'
                    }}
                  />
                  <span className="cp-color-name">{c.name}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Outfit Gallery */}
        {activeTone && (
          <section className="cp-section">
            {galleryOutfits.length > 0 ? (
              <>
                <h2 className="cp-section-title">
                  {effectiveSelectedColor ? `Outfits in ${effectiveSelectedColor}` : 'Outfits in Your Matching Colours'}
                </h2>
                <div className="cp-outfit-grid">
                  {galleryOutfits.map((item, i) => (
                    <div key={`${item.title}-${i}`} className="cp-outfit-card">
                      <div className="cp-outfit-img-wrap">
                        <SafeImage
                          src={item.img}
                          alt={item.title}
                          name={item.title}
                          className="cp-outfit-img"
                          fallbackSrc="/images/fallback.jpg"
                        />
                      </div>
                      <p className="cp-outfit-title">{item.title}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="cp-empty-state">
                <h2 className="cp-section-title">No matching outfits found</h2>
                <p className="cp-empty-text">Try another colour or switch to a different skin tone to explore fresh combinations.</p>
              </div>
            )}
          </section>
        )}

        {/* Additional Details + Save */}
        <section className="cp-section cp-details-section">
          <h2 className="cp-section-title">Additional Details <span className="cp-optional">(optional)</span></h2>
          <div className="cp-details-grid">
            <div className="cp-detail-group">
              <label>Undertone</label>
              <div className="cp-chips">
                {UNDERTONES.map(u => (
                  <button
                    key={u}
                    className={`chip ${profile.undertone === u ? 'active' : ''}`}
                    onClick={() => setProfile(p => ({ ...p, undertone: u }))}
                  >{u}</button>
                ))}
              </div>
            </div>
            <div className="cp-detail-group">
              <label>Hair Colour</label>
              <select value={profile.hairColor} onChange={e => setProfile(p => ({ ...p, hairColor: e.target.value }))}>
                <option value="">Select</option>
                {HAIR_COLORS.map(h => <option key={h}>{h}</option>)}
              </select>
            </div>
            <div className="cp-detail-group">
              <label>Eye Colour</label>
              <select value={profile.eyeColor} onChange={e => setProfile(p => ({ ...p, eyeColor: e.target.value }))}>
                <option value="">Select</option>
                {EYE_COLORS.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
          </div>
          <button className="btn-primary cp-save-btn" onClick={handleSave}>
            <Save size={16} /> Save My Colour Profile
          </button>
          {saved && (
            <div className="alert alert-success" style={{ marginTop: '1rem' }}>
              <CheckCircle size={16} /> Colour profile saved successfully!
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
