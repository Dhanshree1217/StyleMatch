import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SafeImage from '../components/SafeImage';
import { ArrowRight, Heart, Sparkles, Shirt, Palette, Star, Mail, Play, Layers, ShoppingBag, LoaderCircle, ExternalLink } from 'lucide-react';

// Hero – high-resolution editorial fashion photograph
const HERO_IMG = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=1000&auto=format&fit=crop';

// Category images – clean, valid URLs so the dashboard can render polished category artwork
const CAT_IMGS = {
  'co-ord-sets':        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxhEPh3mU83eJMzUY29t58yY2fUvB_Jw0neRLDs8FK4ZAXe6DKrzOBVZI&s=10',
  'formal-dress':       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZZ3ZEIVlmUkpnx3oSbTWlrTfXUNNXXd7jYwXS5RC3cphXDlYx1KHjxp_K&s=10',
  'ethnic-wear':        'https://inchingindia.in/cdn/shop/files/DSC09209_x800.jpg?v=1763048463',
  'street-style':       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDXDCBa1OqtehHXAb3oPiXyxIHBm9z6gmVCp6q5VZIRU5i0e7dXPz6n-pY&s=10',
  'festive-looks':      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNFfovb57Ln6cfxodVoaQGw2s636I7kzoZjSBOsPjCAA&s=10',
  'office-wear':        'https://jdinstitute.ac.in/wp-content/uploads/2021/03/4-4-TIPS-FOR-MENS-OFFICE-WEAR.jpg',
  'casual-wear':        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQTneNyTg6-Iduu5_va0nUJPBUtWGmfroeAY7yDGZPqelW4VxpMup9FdK_&s=10',
  'college-outfits':    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtpehsBxfRFaMt9phrlr4F1EvP78m2SVlibUFDUy7FbjdpNlWwTw4bB4w&s=10',
  'western-wear':       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRICklZp-W_bV6lPieQU5_kfEh4OhEArb1CG8T-qp7Xmkbs6p_dzEXGDT8&s=10',
  'party-wear':         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxdb6OrI3FtX2CtMgyAit4qRki9nauycYbV6w_zsNCaTmX2XFnGQEkcsc&s=10p',
  'wedding-guest':      'https://littleboxindia.com/cdn/shop/collections/Sheer_Fishtail_Hem_Fitted_Bodycon_Maxi_Dress_in_Black_And_Red_219a2980-08bf-4ffc-820c-4eed5dffd71d_1200x1200.jpg?v=1783881102',
  'traditional-sarees': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_oRbUtifBUEVP1kXOumz37NsOsoyw7uf0irOxe7ZGi7ZsbbAV_0ToDhTB&s=10',
  'kurtis-kurta':       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQizgmukAg2amWsr1L_oQJvMbwwbW9SvNNJDzEbfZaQO5lmRtHp7I1XqFKx&s=10',
  'jeans-denim':        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80&auto=format&fit=crop',
  'tops-shirts':        'https://assets.myntassets.com/w_200,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2025/NOVEMBER/22/QbijvVj1_43d8025aadae495ca5cae4f1a016d840.jpg',
  'dresses':            'https://nolabels.in/cdn/shop/files/Blue_Dress_for_women_99cdd005-23f1-4972-8f19-ac776d6b3e13.jpg?v=1791203835&width=1080',
  'winter-wear':        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW-MF7HgwtbEilgY9SHsqdIL6cs-qsNQceXupYnMkQCDXHnfu_Kiam8HY&s=10',
  'summer-outfits':     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9yTXeR--QXeROFJJK_f2tIg_ap_u7n0h1YT4XD8Mq2WG991sf9RF-8Mgc&s=10',
  'minimalist':         'https://hips.hearstapps.com/hmg-prod/images/539d8fb7-ae4d-4755-a99f-768aa541bf2f.jpeg?crop=0.668xw:1xh;0.257xw,0xh&resize=640:*',
  'athleisure':         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT_egDmUfGxG8CGzmN8x5ZzRgz4oISaygS0FSwtApMOnZT7OB07RF3_YnR&s=10',
  'vacation-travel':    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaFYks_qFhJNiQ0Axt5wq1gMJALIN6H6XEnYiimv324-2ErlZK3Mp1Txan&s=10',
  'shoes-sneakers':     'https://www.campusshoes.com/cdn/shop/files/RUSTLE_22G-13439_WHITE-BLACK_01.webp?v=1775729410',
  'bags-accessories':   'https://preview.redd.it/lv-bag-accessories-which-ones-worth-it-v0-jwrdmyzn61ec1.jpg?width=640&crop=smart&auto=webp&s=70316d3a4ce3ab1a8dae01977b889568f9c4ee22',
  'mens-fashion':       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhAEJA-Q-UDBBnOTx6Ds30HOxQ01K4EPgx3Tr46Sykd_6qRHObe-0VrW7Y&s=10',
  'womens-fashion':     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeovP4ILFfiIgyE2EANftfUhLknktlG8f87Gpl4VnrU2d5oZB0UK1r9BhY&s=10',
};

// Trending – 8 unique, high-resolution verified images
const TRENDING = [
  { id: 'tr1', title: 'Silk Banarasi Saree',  tag: 'Traditional', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOJh2qoGXvqZkn1hnVfA1JpUwUYx6IQjCLqDG87WDmFVBlfGKtsysPM00&s=10', likes: 284 },
  { id: 'tr2', title: 'Pastel Co-ord Set',    tag: 'Western',     img: 'https://stylum.in/cdn/shop/files/Pinkco-ordset01.png?v=1788871672', likes: 312 },
  { id: 'tr3', title: 'Floral Midi Dress',    tag: 'Casual',      img: 'https://ambraee.com/cdn/shop/files/Project_20250508_0008_e1800621-332f-4780-8da6-af0784380874.jpg?v=1747644308', likes: 198 },
  { id: 'tr4', title: 'Anarkali Suit',        tag: 'Festival',    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-WGH29kgomd6lo4AqxFFavB7wPrjUtDqABKyc6QIYq5c3vsVwovWx24&s=10', likes: 421 },
  { id: 'tr5', title: 'Power Blazer Look',    tag: 'Office',      img: 'https://www.whitebydinaaz.com/cdn/shop/files/39_5b4be167-2cd0-49ec-8bff-ab1556bdfc25.png?v=1750503904&width=1200', likes: 176 },
  { id: 'tr6', title: 'Denim Street Look',    tag: 'Street',      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm_xnQXqwmuKyQojzEyPba1qpQ248fimZ4exNKkM59KvOktl3tvdW0iM0&s=10', likes: 253 },
  { id: 'tr7', title: 'Bridal Lehenga',       tag: 'Wedding',     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn6RiKGPe7ADero-N8NnNSiVOsriv5hc9obMjVtvRSvycrrIap8vcJBlE&s=10', likes: 389 },
  { id: 'tr8', title: 'Linen Travel Set',     tag: 'Travel',      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzbjPo4MaFWdb0HorgnaRCA3XaronBQz2Jb6DKwscwLrL1igSIeQJzzuY&s=10', likes: 145 },
];

// Style inspiration rows – all unique high-resolution verified images
const INSPO_ROWS = [
  {
    id: 'ins1',
    label: 'College Edit',
    title: 'Campus-Ready Looks',
    desc: 'Effortless everyday outfits that take you from morning lectures to evening hangouts.',
    img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80&auto=format&fit=crop',
    backupSrcs: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80&auto=format&fit=crop',
    ],
    side1: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80&auto=format&fit=crop',
    side2: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80&auto=format&fit=crop',
    to: '/category/college-outfits',
    accent: '#7c3aed',
  },
  {
    id: 'ins2',
    label: 'Office Edit',
    title: 'Boardroom to Brunch',
    desc: 'Polished, professional looks that carry you through every meeting and beyond.',
    img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80&auto=format&fit=crop',
    backupSrcs: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80&auto=format&fit=crop',
    ],
    side1: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80&auto=format&fit=crop',
    side2: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80&auto=format&fit=crop',
    to: '/category/office-wear',
    accent: '#0e7490',
  },
  {
    id: 'ins3',
    label: 'Festive Edit',
    title: 'Celebrate in Style',
    desc: 'Vibrant ethnic and fusion looks for every festival, wedding and celebration.',
    img: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&q=80&auto=format&fit=crop',
    backupSrcs: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80&auto=format&fit=crop',
    ],
    side1: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80&auto=format&fit=crop',
    side2: 'https://i.etsystatic.com/64179390/r/il/7dcdb9/8290658330/il_fullxfull.8290658330_e5dh.jpg',
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

// ── SHOP YOUR STYLE COMPONENT ──────────────────────────────────────────────
const SHOP_GENDERS = ['Women', 'Men', 'Girl', 'Boy'];
const SHOP_STYLES = [
  { value: 'ethnic-wear', label: 'Ethnic Wear' },
  { value: 'western', label: 'Western' },
  { value: 'casual', label: 'Casual' },
  { value: 'college-outfits', label: 'College Look' },
  { value: 'office-wear', label: 'Office Wear' },
  { value: 'festive-looks', label: 'Festive' },
];

function ShopYourStyle() {
  const [gender, setGender] = useState('Women');
  const [style, setStyle] = useState('ethnic-wear');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams({ gender, age_group: 'Adult 18-35', style });
        const res = await fetch(`/api/style-recommendations?${params}`);
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        if (!cancelled) {
          setProducts(Array.isArray(data.products) ? data.products.slice(0, 4) : []);
          setIsDemo(!!data.demo);
        }
      } catch {
        if (!cancelled) setError('Could not load recommendations right now.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [gender, style]);

  return (
    <section className="hp-section hp-shop-style" id="shop-your-style">
      <div className="hp-section-head">
        <span className="hp-label">Shop Your Style</span>
        <h2>Trending For You</h2>
        <p>Personalised Amazon India picks based on your style preferences.</p>
      </div>

      {/* Gender + Style selectors */}
      <div className="sys-filters">
        <div className="sys-filter-group">
          {SHOP_GENDERS.map(g => (
            <button key={g} type="button" className={`sys-chip ${gender === g ? 'active' : ''}`} onClick={() => setGender(g)}>{g}</button>
          ))}
        </div>
        <div className="sys-filter-group">
          {SHOP_STYLES.map(s => (
            <button key={s.value} type="button" className={`sys-chip ${style === s.value ? 'active' : ''}`} onClick={() => setStyle(s.value)}>{s.label}</button>
          ))}
        </div>
      </div>

      {/* Demo notice */}
      {isDemo && !loading && (
        <div className="sys-demo-notice">
          <ShoppingBag size={14} />
          <span><strong>Demo Mode</strong> — Sample products shown. Real Amazon picks appear after live credentials are set up.</span>
        </div>
      )}

      {/* Product grid */}
      {loading ? (
        <div className="sys-loading">
          <LoaderCircle className="spin" size={28} />
          <span>Finding picks for you…</span>
        </div>
      ) : error ? (
        <div className="sys-error">{error}</div>
      ) : products.length === 0 ? (
        <div className="sys-empty"><Shirt size={24} /> No products found for this selection.</div>
      ) : (
        <div className="sys-grid">
          {products.map((p, i) => (
            <div key={p.id || i} className="sys-card">
              <div className="sys-card-img-wrap">
                <SafeImage src={p.image} alt={p.title} name={p.title} className="sys-card-img" fallbackSrc="/images/fallback.jpg" />
                {isDemo && <span className="sys-demo-badge">Demo</span>}
              </div>
              <div className="sys-card-body">
                <p className="sys-card-title">{p.title}</p>
                <p className="sys-card-price">{p.price || 'See price on Amazon'}</p>
                {p.affiliate_url ? (
                  <a href={p.affiliate_url} target="_blank" rel="nofollow sponsored noopener noreferrer" className="sys-shop-btn">
                    Shop on Amazon <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="sys-shop-btn disabled">Shop on Amazon</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="sys-footer-row">
        <Link to="/style" className="hp-cta-primary">See All Recommendations <ArrowRight size={15} /></Link>
        <p className="sys-affiliate-note">As an Amazon Associate I earn from qualifying purchases.</p>
      </div>
    </section>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

function Img({ src, alt, className, fallback, name }) {
  return (
    <SafeImage
      src={src}
      alt={alt}
      name={name || alt}
      className={className}
      fallbackSrc={fallback || '/images/fallback.jpg'}
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
            fallback="/images/fallback.jpg"
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
                name={cat.label}
                className="hp-cat-img"
                fallback="/images/fallback.jpg"
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
                <Img src={item.img} alt={item.title} name={item.title} className="hp-trend-img" />
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

      {/* SHOP YOUR STYLE – Amazon affiliate recommendations */}
      <ShopYourStyle />

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
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80&auto=format&fit=crop"
              alt="Virtual wardrobe styling"
              name="Virtual wardrobe styling"
              className="hp-discover-main"
            />
            <Img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop"
              alt="Colour matching accessories"
              name="Colour matching accessories"
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
              <Img
                src={row.img}
                alt={row.title}
                name={row.title}
                className="hp-inspo-img"
                backupSrcs={row.backupSrcs || []}
              />
            </div>
            <div className="hp-inspo-content">
              <span className="hp-label" style={{ color: row.accent }}>{row.label}</span>
              <h3>{row.title}</h3>
              <p>{row.desc}</p>
              <div className="hp-inspo-side-imgs">
                <Img
                  src={row.side1}
                  alt={row.title + ' look 1'}
                  name={row.title + ' look 1'}
                  className="hp-inspo-side"
                  backupSrcs={[row.img, row.side2].filter(Boolean)}
                />
                <Img
                  src={row.side2}
                  alt={row.title + ' look 2'}
                  name={row.title + ' look 2'}
                  className="hp-inspo-side"
                  backupSrcs={[row.img, row.side1].filter(Boolean)}
                />
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
