import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CircleDollarSign, ExternalLink, LoaderCircle, SearchX, Shirt, ShoppingBag } from 'lucide-react';
import SafeImage from '../components/SafeImage';

const STYLE_SELECTION_KEY = 'styleMatch.selection';

const STYLE_CHIPS = [
  { value: '', label: 'All Styles' },
  { value: 'ethnic-wear', label: 'Ethnic Wear' },
  { value: 'western', label: 'Western' },
  { value: 'casual', label: 'Casual' },
  { value: 'college-outfits', label: 'College Look' },
  { value: 'office-wear', label: 'Office Wear' },
  { value: 'street-style', label: 'Street Style' },
  { value: 'festive-looks', label: 'Festive Look' },
  { value: 'co-ord-sets', label: 'Co-ord Sets' },
  { value: 'party-wear', label: 'Party Wear' },
  { value: 'traditional-sarees', label: 'Sarees' },
  { value: 'athleisure', label: 'Athleisure' },
];

const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  { value: 'tops-shirts', label: 'Tops & Shirts' },
  { value: 'jeans-denim', label: 'Jeans & Denim' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'kurtis-kurta', label: 'Kurtis & Kurtas' },
  { value: 'winter-wear', label: 'Winter Wear' },
  { value: 'summer-outfits', label: 'Summer Outfits' },
  { value: 'shoes-sneakers', label: 'Shoes & Sneakers' },
  { value: 'bags-accessories', label: 'Bags & Accessories' },
];

const PRICE_OPTIONS = [
  { label: 'Any price', value: 'all' },
  { label: 'Under ₹999', value: '0-999' },
  { label: '₹1,000 – ₹2,499', value: '1000-2499' },
  { label: '₹2,500 – ₹4,999', value: '2500-4999' },
  { label: '₹5,000+', value: '5000+' },
];

const parsePrice = (amount) => {
  if (!amount) return Number.POSITIVE_INFINITY;
  const cleaned = `${amount}`.replace(/[^\d.]/g, '').replace(/\.(?=.*\.)/g, '');
  const numeric = Number(cleaned || 0);
  return Number.isFinite(numeric) ? numeric : Number.POSITIVE_INFINITY;
};

const readSelectionFromStorage = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STYLE_SELECTION_KEY) || '{}');
    const category = ['Men', 'Women', 'Boy', 'Girl'].includes(saved.category) ? saved.category : 'Women';
    const ageGroup = ['Kids 2-5', '6-12', 'Teen 13-17', 'Adult 18-35', '35+'].includes(saved.ageGroup) ? saved.ageGroup : 'Adult 18-35';
    return { category, ageGroup };
  } catch {
    return { category: 'Women', ageGroup: 'Adult 18-35' };
  }
};

export default function MyStyle() {
  const navigate = useNavigate();
  const [selection, setSelection] = useState(readSelectionFromStorage);
  const [activeStyle, setActiveStyle] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDemo, setIsDemo] = useState(false);
  const [fetchVersion, setFetchVersion] = useState(0);

  useEffect(() => {
    const savedSelection = readSelectionFromStorage();
    if (!savedSelection.category || !savedSelection.ageGroup) {
      navigate('/', { replace: true });
      return;
    }
    setSelection(savedSelection);
  }, [navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams({
          gender: selection.category,
          age_group: selection.ageGroup,
          ...(category && { category }),
          ...(activeStyle && { style: activeStyle }),
        });

        const response = await fetch(`/api/style-recommendations?${params}`);

        if (!response.ok) throw new Error('Unable to load products right now.');

        const data = await response.json();

        if (!data.success) throw new Error(data.error || 'Failed to load recommendations.');

        setProducts(Array.isArray(data.products) ? data.products : []);
        setIsDemo(!!data.demo);
      } catch (loadError) {
        setProducts([]);
        setError(loadError.message || 'Something went wrong while fetching product suggestions.');
      } finally {
        setLoading(false);
      }
    };

    if (selection.category && selection.ageGroup) fetchProducts();
  }, [selection, activeStyle, category, fetchVersion]);

  const filteredProducts = useMemo(() => {
    if (priceRange === 'all') return products;
    return products.filter((product) => {
      const amount = parsePrice(product.price);
      if (priceRange === '0-999') return amount < 999;
      if (priceRange === '1000-2499') return amount >= 1000 && amount <= 2499;
      if (priceRange === '2500-4999') return amount >= 2500 && amount <= 4999;
      if (priceRange === '5000+') return amount >= 5000;
      return true;
    });
  }, [priceRange, products]);

  // Deduplicate by id/asin
  const uniqueProducts = useMemo(() => {
    const seen = new Set();
    return filteredProducts.filter(p => {
      const key = p.id || p.asin || p.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [filteredProducts]);

  return (
    <div className="style-page-shell">
      <div className="style-page-header">
        <div>
          <button type="button" className="btn-ghost style-back-button" onClick={() => navigate('/')}>
            <ArrowLeft size={15} /> Change my selection
          </button>
          <h1>My Style</h1>
          <p>{selection.category} • {selection.ageGroup}</p>
        </div>
      </div>

      {/* Style filter chips */}
      <div className="ms-style-chips-wrap">
        <p className="ms-chips-label">Style</p>
        <div className="ms-style-chips">
          {STYLE_CHIPS.map(chip => (
            <button
              key={chip.value}
              type="button"
              className={`ms-chip ${activeStyle === chip.value ? 'active' : ''}`}
              onClick={() => setActiveStyle(chip.value)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category + price filters */}
      <div className="style-filter-bar">
        <div className="filter-field">
          <label htmlFor="categoryFilter">Category</label>
          <select id="categoryFilter" value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label htmlFor="priceFilter">Price range</label>
          <select id="priceFilter" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
            {PRICE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Demo mode notice */}
      {isDemo && !loading && (
        <div className="ms-demo-notice">
          <ShoppingBag size={15} />
          <span>
            <strong>Demo Mode:</strong> These are sample products for development. Real Amazon India products will appear once live credentials are configured.
          </span>
        </div>
      )}

      {loading ? (
        <div className="status-card loading-state">
          <LoaderCircle className="spin" size={30} />
          <h3>Finding styles for you…</h3>
          <p>Checking picks for {selection.category} • {selection.ageGroup}</p>
        </div>
      ) : error ? (
        <div className="status-card error-state">
          <SearchX size={30} />
          <h3>We hit a snag</h3>
          <p>{error}</p>
          <button type="button" className="btn-primary" onClick={() => setFetchVersion(v => v + 1)}>
            Try again
          </button>
        </div>
      ) : uniqueProducts.length === 0 ? (
        <div className="status-card empty-state">
          <Shirt size={30} />
          <h3>No matching products found</h3>
          <p>Try a different style or category for this profile.</p>
          <button type="button" className="btn-primary" onClick={() => { setActiveStyle(''); setCategory(''); setPriceRange('all'); }}>
            Reset filters
          </button>
        </div>
      ) : (
        <section className="product-grid">
          {uniqueProducts.map((product, index) => (
            <article key={product.id || `${product.title}-${index}`} className="product-card">
              <div className="product-image-wrap">
                {product.image ? (
                  <SafeImage
                    src={product.image}
                    alt={product.title}
                    name={product.title}
                    className="product-image"
                    fallbackSrc="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80&auto=format&fit=crop"
                  />
                ) : (
                  <div className="product-image-placeholder">
                    <CircleDollarSign size={28} />
                  </div>
                )}
                {isDemo && <span className="ms-demo-badge">Demo</span>}
              </div>
              <div className="product-body">
                <h3>{product.title}</h3>
                <p className="product-price">{product.price || 'See price on Amazon'}</p>
                {product.affiliate_url ? (
                  <a
                    href={product.affiliate_url}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="btn-primary product-buy-button"
                  >
                    Shop on Amazon <ExternalLink size={13} />
                  </a>
                ) : (
                  <span className="ms-demo-shop-btn">Shop on Amazon (Demo)</span>
                )}
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Affiliate disclosure – required by Amazon Associates Program */}
      <footer className="affiliate-footer">
        <p>As an Amazon Associate I earn from qualifying purchases.</p>
        {isDemo && <p className="ms-demo-footer-note">Product images are placeholders. No affiliate links are active in demo mode.</p>}
      </footer>
    </div>
  );
}
