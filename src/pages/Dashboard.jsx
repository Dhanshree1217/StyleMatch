import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { getSavedOutfits, saveOutfits, getWardrobe } from '../utils/storage';
import { categories, outfits } from '../data/fashionData';
import { Search, Heart, ArrowRight, Shirt, Star, Palette, X, TrendingUp, Bookmark } from 'lucide-react';

function Img({ src, alt, className }) {
  const [err, setErr] = useState(false);
  return (
    <img
      src={err ? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=680&fit=crop' : src}
      alt={alt}
      className={className}
      onError={() => setErr(true)}
      loading="lazy"
    />
  );
}

function OutfitCard({ outfit, savedIds, onToggleSave, onSelect }) {
  const [err, setErr] = useState(false);
  return (
    <div className="dm-ocard" onClick={() => onSelect(outfit)}>
      <div className="dm-ocard-img-wrap">
        <img
          src={err ? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=680&fit=crop' : outfit.image}
          alt={outfit.title}
          className="dm-ocard-img"
          onError={() => setErr(true)}
          loading="lazy"
        />
        <button
          className={`dm-ocard-fav ${savedIds.includes(outfit.id) ? 'saved' : ''}`}
          onClick={e => { e.stopPropagation(); onToggleSave(outfit); }}
        >
          <Heart size={14} fill={savedIds.includes(outfit.id) ? '#be123c' : 'none'} />
        </button>
        <div className="dm-ocard-hover"><span>View Look</span></div>
      </div>
      <div className="dm-ocard-info">
        <span className="dm-ocard-sub">{outfit.subcategory}</span>
        <h4 className="dm-ocard-title">{outfit.title}</h4>
        <div className="dm-ocard-meta">
          <span>{outfit.occasion}</span>
          <div className="dm-ocard-colors">
            {outfit.colors.slice(0, 3).map(c => (
              <span key={c} style={{ background: c }} className="dm-color-dot" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OutfitModal({ outfit, savedIds, onToggleSave, onClose, onSelect }) {
  const related = (outfit.related || []).map(id => outfits.find(o => o.id === id)).filter(Boolean);
  return (
    <div className="od-overlay" onClick={onClose}>
      <div className="od-modal" onClick={e => e.stopPropagation()}>
        <button className="od-close" onClick={onClose}><X size={18} /></button>
        <div className="od-grid">
          <div className="od-left">
            <Img src={outfit.image} alt={outfit.title} className="od-main-img" />
          </div>
          <div className="od-right">
            <span className="od-sub">{outfit.subcategory}</span>
            <h2 className="od-title">{outfit.title}</h2>
            <div className="od-tags">
              <span className="od-tag">{outfit.occasion}</span>
              <span className="od-tag">{outfit.style}</span>
            </div>
            <div className="od-colors-row">
              <span className="od-label">Colors</span>
              <div className="od-colors">
                {outfit.colors.map(c => (
                  <span key={c} className="od-color-dot" style={{ background: c }} title={c} />
                ))}
              </div>
            </div>
            <div className="od-actions">
              <button
                className={`od-save-btn ${savedIds.includes(outfit.id) ? 'saved' : ''}`}
                onClick={() => onToggleSave(outfit)}
              >
                <Heart size={16} fill={savedIds.includes(outfit.id) ? '#fff' : 'none'} />
                {savedIds.includes(outfit.id) ? 'Saved' : 'Save Look'}
              </button>
              <Link to={`/category/${outfit.category}`} className="od-explore-btn">
                View Collection
              </Link>
            </div>
            {related.length > 0 && (
              <div className="od-related">
                <p className="od-label">Similar Looks</p>
                <div className="od-related-grid">
                  {related.map(r => (
                    <div key={r.id} className="od-related-card" onClick={() => onSelect(r)}>
                      <Img src={r.image} alt={r.title} className="od-related-img" />
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
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // All hooks declared unconditionally before any conditional return
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [savedIds, setSavedIds] = useState(() =>
    user ? getSavedOutfits(user.username).map(o => o.id) : []
  );
  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return outfits.filter(o =>
      o.title.toLowerCase().includes(q) ||
      o.category.toLowerCase().includes(q) ||
      o.occasion.toLowerCase().includes(q) ||
      o.style.toLowerCase().includes(q) ||
      o.subcategory.toLowerCase().includes(q)
    ).slice(0, 16);
  }, [search]);

  // Redirect after hooks
  if (!user) { navigate('/login', { replace: true }); return null; }

  const wardrobe = getWardrobe(user.username);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const toggleSave = outfit => {
    const cur = getSavedOutfits(user.username);
    const exists = cur.find(o => o.id === outfit.id);
    const updated = exists ? cur.filter(o => o.id !== outfit.id) : [...cur, outfit];
    saveOutfits(user.username, updated);
    setSavedIds(updated.map(o => o.id));
  };

  const featured = outfits.filter(o => ['t1','w1','p1','o2','wf1','c1','t5','w5'].includes(o.id));
  const trending = outfits.filter(o => ['w2','t3','c4','p2','s1','a1','wf2','c2','o3','w7','p5','t9'].includes(o.id));

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dm-main">

        {/* Topbar */}
        <div className="dm-topbar">
          <div className="dm-search">
            <Search size={16} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search outfits, styles, occasions, colors..."
            />
            {search && <button onClick={() => setSearch('')}><X size={14} /></button>}
          </div>
          <div className="dm-toplinks">
            <Link to="/wardrobe" className="dm-toplink"><Shirt size={15} /><span>Wardrobe</span></Link>
            <Link to="/style" className="dm-toplink"><Star size={15} /><span>My Style</span></Link>
            <Link to="/color-profile" className="dm-toplink"><Palette size={15} /><span>Colors</span></Link>
          </div>
        </div>

        {/* Search Results */}
        {search && (
          <div className="dm-section">
            <div className="dm-sec-head">
              <h3>{searchResults.length} results for "{search}"</h3>
              <button className="dm-clear" onClick={() => setSearch('')}>Clear</button>
            </div>
            {searchResults.length === 0 ? (
              <div className="dm-empty">
                <Search size={40} />
                <p>No outfits found. Try a different keyword.</p>
              </div>
            ) : (
              <div className="dm-masonry">
                {searchResults.map(o => (
                  <OutfitCard key={o.id} outfit={o} savedIds={savedIds} onToggleSave={toggleSave} onSelect={setSelected} />
                ))}
              </div>
            )}
          </div>
        )}

        {!search && (
          <>
            {/* Welcome */}
            <div className="dm-welcome">
              <div>
                <p className="dm-greet">{greeting}, <strong>{user.fullName}</strong></p>
                <h1 className="dm-headline">Find your next look.<br />Discover your personal style.</h1>
              </div>
              <div className="dm-welcome-stats">
                <div className="dm-stat">
                  <Bookmark size={18} />
                  <strong>{getSavedOutfits(user.username).length}</strong>
                  <span>Saved</span>
                </div>
                <div className="dm-stat">
                  <Shirt size={18} />
                  <strong>{wardrobe.length}</strong>
                  <span>Wardrobe</span>
                </div>
              </div>
            </div>

            {/* Category Pills — original 8 only */}
            <div className="dm-section dm-flush">
              <div className="dm-cat-pills">
                {categories.slice(0, 8).map(cat => (
                  <Link key={cat.id} to={`/category/${cat.id}`} className="dm-cat-pill">
                    <Img src={cat.cover} alt={cat.label} className="dm-cat-pill-img" />
                    <span>{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Hero Category Grid */}
            <div className="dm-section">
              <div className="dm-sec-head">
                <h3>Explore Collections</h3>
                <span className="dm-sec-sub">Tap any category to see all looks</span>
              </div>
              <div className="dm-hero-grid">
                {categories.slice(0, 8).map((cat, i) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    className={`dm-hero-card ${i === 0 ? 'span-col2' : ''} ${i === 5 ? 'span-col2' : ''}`}
                  >
                    <Img src={cat.cover} alt={cat.label} className="dm-hero-img" />
                    <div className="dm-hero-overlay">
                      <div>
                        <h4>{cat.label}</h4>
                        <p>{cat.description}</p>
                      </div>
                      <span className="dm-hero-cta">Explore <ArrowRight size={13} /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Looks Masonry */}
            <div className="dm-section">
              <div className="dm-sec-head">
                <h3>Featured Looks</h3>
                <Link to="/style" className="dm-see-all">See all <ArrowRight size={13} /></Link>
              </div>
              <div className="dm-masonry">
                {featured.map(o => (
                  <OutfitCard key={o.id} outfit={o} savedIds={savedIds} onToggleSave={toggleSave} onSelect={setSelected} />
                ))}
              </div>
            </div>

            {/* Trending Horizontal Scroll */}
            <div className="dm-section">
              <div className="dm-sec-head">
                <h3><TrendingUp size={17} /> Trending Now</h3>
              </div>
              <div className="dm-hscroll">
                {trending.map(o => (
                  <div key={o.id} className="dm-hcard" onClick={() => setSelected(o)}>
                    <div className="dm-hcard-img-wrap">
                      <Img src={o.image} alt={o.title} className="dm-hcard-img" />
                      <button
                        className={`dm-hcard-fav ${savedIds.includes(o.id) ? 'saved' : ''}`}
                        onClick={e => { e.stopPropagation(); toggleSave(o); }}
                      >
                        <Heart size={13} fill={savedIds.includes(o.id) ? '#be123c' : 'none'} />
                      </button>
                      <span className="dm-hcard-badge">{o.subcategory}</span>
                    </div>
                    <div className="dm-hcard-info">
                      <h5>{o.title}</h5>
                      <span>{o.occasion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Per-category preview rows — original 8 only */}
            {categories.slice(0, 8).map(cat => {
              const rows = outfits.filter(o => o.category === cat.id).slice(0, 6);
              if (rows.length === 0) return null;
              return (
                <div key={cat.id} className="dm-section">
                  <div className="dm-sec-head">
                    <h3>{cat.label}</h3>
                    <Link to={`/category/${cat.id}`} className="dm-see-all">
                      See all <ArrowRight size={13} />
                    </Link>
                  </div>
                  <div className="dm-row-grid">
                    {rows.map(o => (
                      <OutfitCard key={o.id} outfit={o} savedIds={savedIds} onToggleSave={toggleSave} onSelect={setSelected} />
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {selected && (
          <OutfitModal
            outfit={selected}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            onClose={() => setSelected(null)}
            onSelect={setSelected}
          />
        )}
      </main>
    </div>
  );
}
