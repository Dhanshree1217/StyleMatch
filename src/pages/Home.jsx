import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ArrowRight, Heart, Sparkles, Shirt, Palette, Star, Mail, Play, Layers } from 'lucide-react';

// Hero – unique, not reused anywhere else
const HERO_IMG = 'blob:https://chatgpt.com/1daf57ec-578e-4dd5-9ade-cd0f13dec120';

// Category images – each URL is unique per category
const CAT_IMGS = {
  'co-ord-sets':        'https://wholetex.sgp1.cdn.digitaloceanspaces.com/full/women-cotton-co-ord-set-1768994116-6180.jpg',
  'formal-dress':       'https://rukminim3.flixcart.com/image/480/640/xif0q/shirt/s/e/d/m-whitesatin-dress-com-original-imagz7mhjhb5as3f.jpeg?q=80',
  'ethnic-wear':        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn6k9d6b0kv2_hViLZaDWBjRk3oDHgkEKycpVYcF5BIITXiT9R5z01Tjk&s=10',
  'street-style':       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdofxni0X4OWYeMF0AIWNOe518dGQZ4mLQFtjtcXhYKUdRBkiPi7iInxjE&s=10',
  'festive-looks':      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwSXSQ4WWyOTLrgaIQEj55XBP2Mi7WFDAvkN1r5jkAQAMatbW7EUYSsGRa&s=10',
  'office-wear':        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr20YYCrzmaSEUMMclqzuDFLM7L7Cd9m_kvOaDNGLNnQ&s=10',
  'casual-wear':        'https://louisphilippe.abfrl.in/blog/wp-content/uploads/2024/07/LP-376-dsadf.jpg',
  'college-outfits':    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROuqiYD9otV-2XTOQpTp0RC0Alv1A9m2CT314edG02P_5e1EM9KV4Hids&s=10',
  'western-wear':       'https://images.meesho.com/images/products/844022647/3dszb_512.webp?width=512',
  'party-wear':         'https://tapee.in/cdn/shop/files/GratefulOccasionWearEmbroideredGreenSilkLongGownWithDupatta_4.png?v=1766141994&width=1024',
  'wedding-guest':      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkfFe7ePJOMKvjicQfKEPMVSn5iGr1yuVn0bh4jPPfXjLY_64bvY_4O1Rt&s=10',
  'traditional-sarees': 'https://assets0.mirraw.com/images/12911209/image_zoom.jpeg?1728970860',
  'kurtis-kurta':       'https://www.anantexports.in/cdn/shop/files/IMG-20260419-WA0036.jpg',
  'jeans-denim':        'https://cdn.shopify.com/s/files/1/0340/9644/7533/files/Women_s_Solid_Color_Pocket_Casual_Loose_Fit_Jeans_480x480.jpg',
  'tops-shirts':        'https://assets.myntassets.com/w_200,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2025/DECEMBER/22/JaWeV1Ah_45607330d4dc4714b2a22f7a1afe60c4.jpg', 
  'dresses':            'https://nolabels.in/cdn/shop/files/Blue_Dress_for_women_99cdd005-23f1-4972-8f19-ac776d6b3e13.jpg?v=1791203835&width=1080',
  'winter-wear':        'https://hips.hearstapps.com/hmg-prod/images/gettyimages-1461552909-65775e9c51e7a.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=640:*',
  'summer-outfits':     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGEtDx9B8fb2wPsKFe4HXOEaTYWggbnlxAq3Hv8HRkR_GC3ic1NfpJ_VU&s=10',
  'minimalist':         'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
  'athleisure':         'https://row.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F8urtyqugdt2l%2F36mqkcnBYPoZj8JwfGqwOK%2Fd4c54f0d1635651dca00b1de18a754fd%2FAthleisure_-_desktop.jpg&w=3840&q=85',
  'vacation-travel':    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPvw8rAwTsuxA8ynWxCEKEDJrgWxrYLhZAQCZaf6kxH8g5Ejl5JlW43Qg&s=10',
  'shoes-sneakers':     'https://assets.myntassets.com/assets/images/2024/JULY/29/6xDjrKNT_1c000df180b841b690cd7ac98984e554.jpg',
  'bags-accessories':   'https://preview.redd.it/lv-bag-accessories-which-ones-worth-it-v0-jwrdmyzn61ec1.jpg?width=1080&crop=smart&auto=webp&s=fcf43bfd6603bc6dbe9549184d8afd5586822391',
  'mens-fashion':       'https://www.shutterstock.com/shutterstock/photos/295915793/display_1500/stock-photo-looking-perfect-in-any-style-collage-of-smiling-young-man-wearing-different-clothing-and-looking-295915793.jpg',
  'womens-fashion':     'https://glance.com/_next/image?url=https%3A%2F%2Fglance-web.glance-cdn.com%2Fcheerful_interracial_best_friends_standing_against_wall_talking_spending_time_together_women_only_friendship_togetherness_concept_91022b475d.jpg&w=1920&q=75',
};

// Trending – 8 unique images, none repeated from categories or hero
const TRENDING = [
  { id: 'tr1', title: 'Silk Banarasi Saree',  tag: 'Traditional', img: 'https://www.azafashions.com/blog/wp-content/uploads/2025/12/banner13.png',   likes: 284 },
  { id: 'tr2', title: 'Pastel Co-ord Set',    tag: 'Western',     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkW-uLsbsdL4i92plMN59Myxk_KU8RNI4MAeiBdrgPqmSUB3ikGDi-5So&s=10',   likes: 312 },
  { id: 'tr3', title: 'Floral Midi Dress',    tag: 'Casual',      img: 'https://i0.wp.com/thefashionhousemom.com/wp-content/uploads/2025/04/elegant-and-classic-casual-style-outfits-scaled.jpg?resize=1140%2C1710&ssl=1',   likes: 198 },
  { id: 'tr4', title: 'Anarkali Suit',        tag: 'Festival',    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkhsOwU80pKTm3UE3zcIhPplS7y0v54HImsC81W0Bg-KGw0kdNT28UmHDP&s=10',   likes: 421 },
  { id: 'tr5', title: 'Power Blazer Look',    tag: 'Office',      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgkAzJE2CXC7cb7_ZjPmNQl7SBOVu7fYU5ywCKIFfcT2v5VdWXXHf_n24S&s=10',   likes: 176 },
  { id: 'tr6', title: 'Denim Street Look',    tag: 'Street',      img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=540&fit=crop&crop=top',     likes: 253 },
  { id: 'tr7', title: 'Bridal Lehenga',       tag: 'Wedding',     img: 'https://manyavar.scene7.com/is/image/manyavar/UL5109V-407-MAROON1_22-07-2025-13-30:650x900?dpr=on,2.625',   likes: 389 },
  { id: 'tr8', title: 'Linen Travel Set',     tag: 'Travel',      img: 'https://www.cossetclothing.com/cdn/shop/files/58_a6c15fcc-eda9-4e15-8c2b-24ceb38ce397.png?v=1769597196&width=1500',   likes: 145 },
];

// Style inspiration rows – all unique images, none reused from above
const INSPO_ROWS = [
  {
    id: 'ins1',
    label: 'College Edit',
    title: 'Campus-Ready Looks',
    desc: 'Effortless everyday outfits that take you from morning lectures to evening hangouts.',
    img:   'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=560&fit=crop',
    side1: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=360&h=460&fit=crop',
    side2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuMwHA0PdE8C3zbdoBDxyQ0wD-c1cLGZkv2aru_ywhET8xhf5Gzi7YsASX&s=10',
    to: '/category/college-outfits',
    accent: '#7c3aed',
  },
  {
    id: 'ins2',
    label: 'Office Edit',
    title: 'Boardroom to Brunch',
    desc: 'Polished, professional looks that carry you through every meeting and beyond.',
    img:   'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=560&fit=crop',
    side1: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=360&h=460&fit=crop',
    side2: 'https://cdn.sewmamasew.com/wp-content/uploads/2026/05/Neutral-tailored-blazer-and-trousers-set-1.jpg',
    to: '/category/office-wear',
    accent: '#0e7490',
  },
  {
    id: 'ins3',
    label: 'Festive Edit',
    title: 'Celebrate in Style',
    desc: 'Vibrant ethnic and fusion looks for every festival, wedding and celebration.',
    img:   'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&h=560&fit=crop',
    side1: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=360&h=460&fit=crop',
    side2: 'https://i.pinimg.com/736x/c6/e6/61/c6e6614cb1c7d25b0cdee8a7ef9eb039.jpg',
    to: '/category/festive-looks',
    accent: '#b45309',
  },
];

const FEATURES = [
  { icon: <Shirt size={24} />,   title: 'My Wardrobe',   desc: 'Upload and organise your entire clothing collection. Filter by category, colour and occasion.', to: '/wardrobe',       color: '#C66A83' },
  { icon: <Star size={24} />,    title: 'My Style',      desc: 'Get AI-curated outfit recommendations based on your occasion, preference and fashion style.',   to: '/style',          color: '#7c3aed' },
  { icon: <Palette size={24} />, title: 'Color Profile', desc: 'Discover your perfect colour palette based on skin tone, undertone and personal preferences.',   to: '/color-profile',  color: '#0891b2' },
  { icon: <Layers size={24} />,  title: '3D Try-On',     desc: 'Visualise outfits on a customisable 3D avatar before you wear them.',                           to: '/wardrobe',       color: '#b45309' },
];

const STAR_LABELS = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

const ALL_CATEGORIES = [
  { id: 'co-ord-sets',        label: 'Co-ord Sets',             slug: 'co-ord-sets' },
  { id: 'formal-dress',       label: 'Formal Dress',            slug: 'formal-dress' },
  { id: 'ethnic-wear',        label: 'Ethnic Wear',             slug: 'ethnic-wear' },
  { id: 'street-style',       label: 'Street Style',            slug: 'street-style' },
  { id: 'festive-looks',      label: 'Festive Looks',           slug: 'festive-looks' },
  { id: 'office-wear',        label: 'Office Wear',             slug: 'office-wear' },
  { id: 'casual-wear',        label: 'Casual Wear',             slug: 'casual-wear' },
  { id: 'college-outfits',    label: 'College Outfits',         slug: 'college-outfits' },
  { id: 'western-wear',       label: 'Western Wear',            slug: 'western-wear' },
  { id: 'party-wear',         label: 'Party Wear',              slug: 'party-wear' },
  { id: 'wedding-guest',      label: 'Wedding Guest Looks',     slug: 'wedding-guest' },
  { id: 'traditional-sarees', label: 'Traditional Sarees',      slug: 'traditional-sarees' },
  { id: 'kurtis-kurta',       label: 'Kurtis & Kurta Sets',     slug: 'kurtis-kurta' },
  { id: 'jeans-denim',        label: 'Jeans & Denim',           slug: 'jeans-denim' },
  { id: 'tops-shirts',        label: 'Tops & Shirts',           slug: 'tops-shirts' },
  { id: 'dresses',            label: 'Dresses',                 slug: 'dresses' },
  { id: 'winter-wear',        label: 'Winter Wear',             slug: 'winter-wear' },
  { id: 'summer-outfits',     label: 'Summer Outfits',          slug: 'summer-outfits' },
  { id: 'minimalist',         label: 'Minimalist Fashion',      slug: 'minimalist' },
  { id: 'athleisure',         label: 'Athleisure & Sportswear', slug: 'athleisure' },
  { id: 'vacation-travel',    label: 'Vacation & Travel Looks', slug: 'vacation-travel' },
  { id: 'shoes-sneakers',     label: 'Shoes & Sneakers',        slug: 'shoes-sneakers' },
  { id: 'bags-accessories',   label: 'Bags & Accessories',      slug: 'bags-accessories' },
  { id: 'mens-fashion',       label: "Men's Fashion",           slug: 'mens-fashion' },
  { id: 'womens-fashion',     label: "Women's Fashion",         slug: 'womens-fashion' },
];

function Img({ src, alt, className, fallback }) {
  const [err, setErr] = useState(false);
  const fb = fallback || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop';
  return (
    <img
      src={err ? fb : src}
      alt={alt}
      className={className}
      onError={() => setErr(true)}
      loading="lazy"
    />
  );
}

export default function Home() {
  const [liked, setLiked] = useState({});
  const toggleLike = (id) => setLiked(p => ({ ...p, [id]: !p[id] }));

  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', rating: 0, title: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setFormErrors(p => ({ ...p, [e.target.name]: '' }));
  };

  const handleStarClick = (star) => {
    setForm(p => ({ ...p, rating: star }));
    setFormErrors(p => ({ ...p, rating: '' }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!form.rating) errs.rating = 'Please select a star rating.';
    if (!form.message.trim()) errs.message = 'Please write your review.';
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setReviews(p => [{ ...form, date: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) }, ...p]);
    setForm({ name: '', rating: 0, title: '', message: '' });
    setFormErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="hp-root">
      <Navbar />

      {/* HERO */}
      <section className="hp-hero">
        <div className="hp-hero-img-wrap">
          <Img
            src={HERO_IMG}
            alt="Fashion editorial hero"
            className="hp-hero-img"
            fallback="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=1000&fit=crop"
          />
          <div className="hp-hero-overlay" />
        </div>
        <div className="hp-hero-body">
          <div className="hp-hero-content">
            <span className="hp-eyebrow"><Sparkles size={12} /> New Season 2025</span>
            <h1 className="hp-hero-h1">
              Discover Your Style.<br />
              <em>Wear Your Confidence.</em>
            </h1>
            <p className="hp-hero-sub">
              StyleMatch is your personal AI stylist — upload your wardrobe, explore curated looks,
              match colours to your skin tone and try outfits on a 3D avatar.
            </p>
            <div className="hp-hero-ctas">
              <Link to="/signup" className="hp-cta-primary">Explore Collections <ArrowRight size={16} /></Link>
              <Link to="/signup" className="hp-cta-ghost"><Play size={14} /> Try Your Style</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="hp-stats-bar">
        {[['10K+', 'Happy Users'], ['500+', 'Outfit Styles'], ['25', 'Categories'], ['100%', 'Personalised']].map(([n, l]) => (
          <div key={l} className="hp-stat">
            <strong>{n}</strong>
            <span>{l}</span>
          </div>
        ))}
      </div>

      {/* SHOP BY CATEGORY */}
      <section className="hp-section hp-categories" id="collections">
        <div className="hp-section-head">
          <span className="hp-label">Collections</span>
          <h2>Shop by Category</h2>
          <p>From traditional elegance to modern streetwear — find your perfect style.</p>
        </div>
        <div className="hp-cat-grid">
          {ALL_CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/category/${cat.slug}`} className="hp-cat-card">
              <Img
                src={CAT_IMGS[cat.id]}
                alt={cat.label}
                className="hp-cat-img"
                fallback="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop"
              />
              <div className="hp-cat-overlay">
                <span className="hp-cat-name">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING LOOKS */}
      <section className="hp-section hp-trending" id="trending">
        <div className="hp-section-head">
          <span className="hp-label">Trending</span>
          <h2>Most Loved Looks</h2>
          <p>The outfits everyone is talking about right now.</p>
        </div>
        <div className="hp-trend-grid">
          {TRENDING.map((item) => (
            <div key={item.id} className="hp-trend-card">
              <div className="hp-trend-img-wrap">
                <Img src={item.img} alt={item.title} className="hp-trend-img" />
                <button
                  className={`hp-like-btn ${liked[item.id] ? 'liked' : ''}`}
                  onClick={() => toggleLike(item.id)}
                  aria-label="Like"
                >
                  <Heart size={14} fill={liked[item.id] ? '#C66A83' : 'none'} />
                </button>
                <span className="hp-trend-tag">{item.tag}</span>
              </div>
              <div className="hp-trend-info">
                <h5>{item.title}</h5>
                <span className="hp-trend-likes"><Heart size={11} /> {item.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DISCOVER YOUR STYLE */}
      <section className="hp-discover">
        <div className="hp-discover-inner">
          <div className="hp-discover-text">
            <span className="hp-label dark">Personalised for You</span>
            <h2>Discover Your Style with AI</h2>
            <p>
              Upload your own clothes to My Wardrobe and let StyleMatch suggest perfect outfit
              combinations. Our colour-matching engine analyses your skin tone and palette to
              recommend looks that truly suit you.
            </p>
            <ul className="hp-discover-list">
              <li><Sparkles size={15} /> Upload your wardrobe items</li>
              <li><Palette size={15} /> Get colour-matched recommendations</li>
              <li><Layers size={15} /> Try outfits on a 3D avatar</li>
            </ul>
            <Link to="/signup" className="hp-cta-primary">Try Virtual Outfit <ArrowRight size={16} /></Link>
          </div>
          <div className="hp-discover-imgs">
            <Img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=480&h=620&fit=crop"
              alt="Virtual wardrobe styling"
              className="hp-discover-main"
            />
            <Img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=220&h=280&fit=crop"
              alt="Colour matching accessories"
              className="hp-discover-accent"
            />
          </div>
        </div>
      </section>

      {/* STYLE INSPIRATION ROWS */}
      <section className="hp-section hp-inspo" id="editorial">
        <div className="hp-section-head">
          <span className="hp-label">Editorial</span>
          <h2>Style Inspiration</h2>
        </div>
        {INSPO_ROWS.map((row, i) => (
          <div key={row.id} className={`hp-inspo-row${i % 2 === 1 ? ' hp-inspo-row--rev' : ''}`}>
            <div className="hp-inspo-main-img">
              <Img src={row.img} alt={row.title} className="hp-inspo-img" />
            </div>
            <div className="hp-inspo-content">
              <span className="hp-label" style={{ color: row.accent }}>{row.label}</span>
              <h3>{row.title}</h3>
              <p>{row.desc}</p>
              <div className="hp-inspo-side-imgs">
                <Img src={row.side1} alt={row.title + ' look 1'} className="hp-inspo-side" />
                <Img src={row.side2} alt={row.title + ' look 2'} className="hp-inspo-side" />
              </div>
              <Link to={row.to} className="hp-cta-accent" style={{ background: row.accent }}>
                Explore Collection <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="hp-section hp-features" id="features">
        <div className="hp-section-head">
          <span className="hp-label">Features</span>
          <h2>Everything You Need to Style Yourself</h2>
          <p>Four powerful tools to help you look and feel your best every day.</p>
        </div>
        <div className="hp-feat-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="hp-feat-card" style={{ '--fc': f.color }}>
              <div className="hp-feat-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
              <Link to={f.to} className="hp-feat-link">Learn more <ArrowRight size={13} /></Link>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="hp-section hp-testi" id="reviews">
        <div className="hp-section-head">
          <span className="hp-label">Reviews</span>
          <h2>Share Your Experience</h2>
          <p>Your honest feedback helps others discover their style.</p>
        </div>
        <div className="hp-reviews-layout">
          {/* Write a Review form */}
          <div className="hp-review-form-wrap">
            <h3 className="hp-review-form-title">Write a Review</h3>
            {submitted && (
              <div className="hp-review-success">Your review has been posted. Thank you!</div>
            )}
            <form onSubmit={handleReviewSubmit} noValidate className="hp-review-form">
              <div className="hp-rf-group">
                <label>Your Name <span className="hp-rf-req">*</span></label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Enter your name"
                  maxLength={60}
                />
                {formErrors.name && <span className="hp-rf-error">{formErrors.name}</span>}
              </div>
              <div className="hp-rf-group">
                <label>Star Rating <span className="hp-rf-req">*</span></label>
                <div className="hp-star-picker">
                  {[1,2,3,4,5].map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`hp-star-btn ${form.rating >= s ? 'active' : ''}`}
                      onClick={() => handleStarClick(s)}
                      aria-label={`${s} star`}
                    >★</button>
                  ))}
                  {form.rating > 0 && <span className="hp-star-label">{STAR_LABELS[form.rating]}</span>}
                </div>
                {formErrors.rating && <span className="hp-rf-error">{formErrors.rating}</span>}
              </div>
              <div className="hp-rf-group">
                <label>Review Title <span className="hp-rf-opt">(optional)</span></label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="Summarise your experience"
                  maxLength={80}
                />
              </div>
              <div className="hp-rf-group">
                <label>Your Review <span className="hp-rf-req">*</span></label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleFormChange}
                  placeholder="Tell us what you think about StyleMatch..."
                  rows={4}
                  maxLength={600}
                />
                {formErrors.message && <span className="hp-rf-error">{formErrors.message}</span>}
              </div>
              <button type="submit" className="hp-cta-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Submit Review
              </button>
            </form>
          </div>
          {/* Submitted reviews */}
          <div className="hp-reviews-list">
            {reviews.length === 0 ? (
              <div className="hp-reviews-empty">
                <span className="hp-reviews-empty-icon">✦</span>
                <p>Be the first to share your experience.</p>
                <span>Reviews you submit will appear here.</span>
              </div>
            ) : (
              reviews.map((r, i) => (
                <div key={i} className="hp-testi-card">
                  <div className="hp-testi-stars">
                    {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  </div>
                  {r.title && <strong className="hp-review-card-title">{r.title}</strong>}
                  <p>&ldquo;{r.message}&rdquo;</p>
                  <div className="hp-testi-author">
                    <div className="hp-review-avatar">{r.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <strong>{r.name}</strong>
                      <span>{r.date}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="hp-cta-banner">
        <div className="hp-cta-banner-inner">
          <span className="hp-label dark">Get Started Today</span>
          <h2>Ready to Discover Your Style?</h2>
          <p>Create your free account and get personalised outfit recommendations crafted just for you.</p>
          <div className="hp-cta-banner-btns">
            <Link to="/signup" className="hp-cta-primary">Create Free Account <ArrowRight size={16} /></Link>
            <Link to="/login" className="hp-cta-ghost-dark">Sign In</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="hp-footer">
        <div className="hp-footer-top">
          <div className="hp-footer-brand">
            <div className="hp-footer-logo"><Sparkles size={18} /> StyleMatch</div>
            <p>Your personal AI fashion stylist. Discover, style and express yourself with confidence.</p>
          </div>
          <div className="hp-footer-cols">
            <div>
              <h5>Explore</h5>
              <a href="#collections">Categories</a>
              <a href="#trending">Trending</a>
              <Link to="/signup">My Wardrobe</Link>
              <Link to="/signup">My Style</Link>
            </div>
            <div>
              <h5>Account</h5>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/signup">Color Profile</Link>
            </div>
            <div>
              <h5>Company</h5>
              <a href="#collections">About StyleMatch</a>
              <a href="#contact">Contact Us</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
            </div>
          </div>
        </div>
        <div className="hp-footer-bottom" id="contact">
          <p>&copy; 2025 StyleMatch. Crafted with passion for fashion lovers.</p>
          <div className="hp-footer-contact">
            <a href="mailto:hello@stylematch.app"><Mail size={14} /> hello@stylematch.app</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
