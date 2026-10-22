import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Search, SlidersHorizontal, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { categories, outfits } from '../data/fashionData';
import { useAuth } from '../context/AuthContext';
import { getSavedOutfits, saveOutfits } from '../utils/storage';

function FashionImg({ src, alt, className }) {
  const [err, setErr] = useState(false);
  const fb = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=650&fit=crop';
  return <img src={err ? fb : src} alt={alt} className={className} onError={() => setErr(true)} loading="lazy" />;
}

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // All hooks declared unconditionally before any conditional return
  const [search, setSearch] = useState('');
  const [subFilter, setSubFilter] = useState('All');
  const [occasionFilter, setOccasionFilter] = useState('All');
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [savedIds, setSavedIds] = useState(() =>
    user ? getSavedOutfits(user.username).map((o) => o.id) : []
  );

  const cat = categories.find((c) => c.id === categoryId);
  const effectiveCategoryId = cat?.alias || categoryId;

  const catOutfits = useMemo(() => outfits.filter((o) => o.category === effectiveCategoryId), [effectiveCategoryId]);
  const occasions = useMemo(() => ['All', ...new Set(catOutfits.map((o) => o.occasion))], [catOutfits]);
  const filtered = useMemo(() => catOutfits.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch = !q || o.title.toLowerCase().includes(q) || o.style.toLowerCase().includes(q) || o.occasion.toLowerCase().includes(q);
    const matchSub = subFilter === 'All' || o.subcategory === subFilter;
    const matchOcc = occasionFilter === 'All' || o.occasion === occasionFilter;
    return matchSearch && matchSub && matchOcc;
  }), [catOutfits, search, subFilter, occasionFilter]);
  const relatedOutfits = useMemo(() => {
    if (!selectedOutfit) return [];
    return (selectedOutfit.related || []).map((rid) => outfits.find((o) => o.id === rid)).filter(Boolean);
  }, [selectedOutfit]);

  // Redirects after all hooks
  if (!user) { navigate('/login', { replace: true }); return null; }

  const toggleSave = (outfit) => {
    const current = getSavedOutfits(user.username);
    const exists = current.find((o) => o.id === outfit.id);
    const updated = exists ? current.filter((o) => o.id !== outfit.id) : [...current, outfit];
    saveOutfits(user.username, updated);
    setSavedIds(updated.map((o) => o.id));
  };

  if (!cat) return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main"><p>Category not found. <Link to="/dashboard">Go back</Link></p></main>
    </div>
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main cat-page">
        {/* Header */}
        <div className="cat-header">
          <button className="cat-back-btn" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={18} /> Back
          </button>
          <div className="cat-hero">
            <FashionImg src={cat.cover} alt={cat.label} className="cat-hero-img" />
            <div className="cat-hero-overlay">
              <span className="cat-hero-tag">Collection</span>
              <h1>{cat.label}</h1>
              <p>{cat.description}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="cat-filters">
          <div className="cat-search-wrap">
            <Search size={16} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search looks..." />
            {search && <button onClick={() => setSearch('')}><X size={14} /></button>}
          </div>
          <div className="cat-filter-chips">
            {(cat.subcategories || []).concat().map((s) => (
              <button key={s} className={`chip ${subFilter === s ? 'active' : ''}`} onClick={() => setSubFilter(subFilter === s ? 'All' : s)}>{s}</button>
            ))}
          </div>
          <div className="cat-filter-chips">
            {occasions.map((o) => (
              <button key={o} className={`chip ${occasionFilter === o ? 'active' : ''}`} onClick={() => setOccasionFilter(o)}>{o}</button>
            ))}
          </div>
        </div>

        <p className="cat-count">{filtered.length} look{filtered.length !== 1 ? 's' : ''}</p>

        {/* Gallery */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <SlidersHorizontal size={48} />
            <h3>No looks found</h3>
            <p>Try adjusting your filters.</p>
            <button className="btn-outline" onClick={() => { setSearch(''); setSubFilter('All'); setOccasionFilter('All'); }}>Clear Filters</button>
          </div>
        ) : (
          <div className="fashion-gallery">
            {filtered.map((outfit) => (
              <div key={outfit.id} className="fashion-card" onClick={() => setSelectedOutfit(outfit)}>
                <div className="fashion-card-img">
                  <FashionImg src={outfit.image} alt={outfit.title} className="fashion-img" />
                  <button className={`fashion-fav ${savedIds.includes(outfit.id) ? 'saved' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleSave(outfit); }}>
                    <Heart size={15} fill={savedIds.includes(outfit.id) ? '#be123c' : 'none'} />
                  </button>
                  <div className="fashion-card-hover"><span>View Look</span></div>
                </div>
                <div className="fashion-card-info">
                  <span className="fashion-sub">{outfit.subcategory}</span>
                  <h4>{outfit.title}</h4>
                  <div className="fashion-meta">
                    <span className="fashion-occasion">{outfit.occasion}</span>
                    <div className="fashion-colors">
                      {outfit.colors.map((c) => <span key={c} className="fc-dot" style={{ background: c }} />)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Outfit Detail Modal */}
        {selectedOutfit && (
          <div className="outfit-modal-overlay" onClick={() => setSelectedOutfit(null)}>
            <div className="outfit-modal" onClick={(e) => e.stopPropagation()}>
              <button className="outfit-modal-close" onClick={() => setSelectedOutfit(null)}><X size={20} /></button>
              <div className="outfit-modal-body">
                <div className="outfit-modal-left">
                  <FashionImg src={selectedOutfit.image} alt={selectedOutfit.title} className="outfit-modal-img" />
                </div>
                <div className="outfit-modal-right">
                  <span className="fashion-sub">{selectedOutfit.subcategory}</span>
                  <h2>{selectedOutfit.title}</h2>
                  <div className="outfit-modal-tags">
                    <span className="tag">{selectedOutfit.occasion}</span>
                    <span className="tag">{selectedOutfit.style}</span>
                  </div>
                  <div className="outfit-modal-colors">
                    <p>Colors</p>
                    <div className="fashion-colors">
                      {selectedOutfit.colors.map((c) => <span key={c} className="fc-dot lg" style={{ background: c }} />)}
                    </div>
                  </div>
                  <div className="outfit-modal-actions">
                    <button className={`btn-primary ${savedIds.includes(selectedOutfit.id) ? '' : ''}`}
                      onClick={() => toggleSave(selectedOutfit)}>
                      <Heart size={16} fill={savedIds.includes(selectedOutfit.id) ? '#fff' : 'none'} />
                      {savedIds.includes(selectedOutfit.id) ? 'Saved' : 'Save Look'}
                    </button>
                    <Link to="/wardrobe" className="btn-outline">Add to Wardrobe</Link>
                  </div>
                  {relatedOutfits.length > 0 && (
                    <div className="outfit-related">
                      <p>Similar Looks</p>
                      <div className="outfit-related-grid">
                        {relatedOutfits.map((r) => (
                          <div key={r.id} className="outfit-related-card" onClick={() => setSelectedOutfit(r)}>
                            <FashionImg src={r.image} alt={r.title} className="outfit-related-img" />
                            <span>{r.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
