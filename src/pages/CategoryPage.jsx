import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Heart, LoaderCircle, Search, ShoppingBag, SlidersHorizontal, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import SafeImage from '../components/SafeImage';
import {
  ageGroupRanges,
  ageGroups,
  categories,
  clothingTypeOptions,
  colorOptions,
  genders,
  imageSourceNote,
  occasionOptions,
  outfits,
  seasonOptions,
  filterOutfits,
} from '../data/fashionData';
import { useAuth } from '../context/AuthContext';
import { getSavedOutfits, saveOutfits } from '../utils/storage';
import { getProducts, buildAmazonSearchUrl, categoryToProductParams } from '../services/productService';

// ─── Amazon Picks panel ───────────────────────────────────────────────────────

function AmazonPicksPanel({ categoryId, filters }) {
  const [picks, setPicks]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDemo, setIsDemo]   = useState(false);
  const [error, setError]     = useState('');
  const [open, setOpen]       = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError('');
      const params = categoryToProductParams(categoryId, filters);
      const result = await getProducts(params);
      if (!cancelled) {
        setPicks(result.products.slice(0, 6));
        setIsDemo(result.demo);
        setError(result.error || '');
        setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [categoryId, filters.gender, filters.ageGroup, filters.clothingType, filters.occasion, filters.color, filters.season, filters.search]);

  if (!open) {
    return (
      <div className="ap-collapsed">
        <button className="ap-toggle-btn" onClick={() => setOpen(true)}>
          <ShoppingBag size={15} /> Show Amazon Picks
        </button>
      </div>
    );
  }

  return (
    <div className="ap-panel">
      <div className="ap-panel-head">
        <div className="ap-panel-title">
          <ShoppingBag size={16} />
          <span>Amazon Picks</span>
          {isDemo && <span className="ap-demo-badge">Demo</span>}
        </div>
        <button className="ap-toggle-btn" onClick={() => setOpen(false)}>Hide</button>
      </div>

      {isDemo && (
        <p className="ap-demo-notice">
          Sample products shown. Real Amazon India picks appear after live credentials are configured.
        </p>
      )}

      {loading ? (
        <div className="ap-loading"><LoaderCircle className="spin" size={20} /> Loading picks…</div>
      ) : error ? (
        <p className="ap-error">{error}</p>
      ) : picks.length === 0 ? (
        <p className="ap-empty">No picks found for this selection.</p>
      ) : (
        <div className="ap-grid">
          {picks.map((p, i) => (
            <div key={p.id || i} className="ap-card">
              <div className="ap-card-img-wrap">
                <SafeImage
                  src={p.image}
                  alt={p.title}
                  name={p.title}
                  className="ap-card-img"
                  fallbackSrc="/images/fallback.jpg"
                />
                {isDemo && <span className="ap-card-demo-tag">Demo</span>}
              </div>
              <div className="ap-card-body">
                <p className="ap-card-title">{p.title}</p>
                {p.price && <p className="ap-card-price">{p.price}</p>}
                {p.affiliateUrl ? (
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="ap-shop-btn"
                  >
                    Shop on Amazon <ExternalLink size={11} />
                  </a>
                ) : (
                  <a
                    href={buildAmazonSearchUrl(p.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ap-shop-btn ap-shop-btn--search"
                  >
                    Search on Amazon <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="ap-affiliate-note">
        As an Amazon Associate I earn from qualifying purchases.
      </p>
    </div>
  );
}

// ─── Main CategoryPage ────────────────────────────────────────────────────────

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [search, setSearch]               = useState('');
  const [subFilter, setSubFilter]         = useState('All Types');
  const [occasionFilter, setOccasionFilter] = useState('All Occasions');
  const [colorFilter, setColorFilter]     = useState('All Colors');
  const [seasonFilter, setSeasonFilter]   = useState('All Seasons');
  const [ageFilter, setAgeFilter]         = useState('All Ages');
  const [genderFilter, setGenderFilter]   = useState('All Genders');

  const filterKey = JSON.stringify([categoryId, search, subFilter, occasionFilter, colorFilter, seasonFilter, ageFilter, genderFilter]);
  const [pagination, setPagination]       = useState({ filterKey: '', visibleCount: 20 });
  const visibleCount = pagination.filterKey === filterKey ? pagination.visibleCount : 20;

  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [savedIds, setSavedIds] = useState(() =>
    user ? getSavedOutfits(user.username).map((o) => o.id) : []
  );

  const cat = categories.find((c) => c.id === categoryId);
  const effectiveCategoryId = cat?.alias || categoryId;

  const catOutfits  = outfits.filter((o) => o.category === effectiveCategoryId);
  const occasions   = [...new Set([...occasionOptions,    ...catOutfits.map((o) => o.occasion)])].sort();
  const categoryTypeList = Array.isArray(cat?.subcategories) ? cat.subcategories : clothingTypeOptions;
  const itemTypes   = [...new Set([...categoryTypeList, ...catOutfits.map((o) => o.clothingType || o.itemType || o.subcategory)])].sort();
  const colors      = [...new Set([...colorOptions,        ...catOutfits.flatMap((o) => o.colorNames || [o.colour]).filter(Boolean)])].sort();
  const seasons     = [...new Set([...seasonOptions,       ...catOutfits.map((o) => o.season).filter(Boolean)])].sort();

  const filtered = filterOutfits(catOutfits, {
    search,
    ageGroup:     ageFilter,
    gender:       genderFilter,
    clothingType: subFilter,
    color:        colorFilter,
    season:       seasonFilter,
    occasion:     occasionFilter,
  });

  const activeFilters = [
    search.trim()                    && `Search: ${search.trim()}`,
    ageFilter    !== 'All Ages'      && `Age: ${ageFilter} (${ageGroupRanges[ageFilter][0]}–${ageGroupRanges[ageFilter][1]} years)`,
    genderFilter !== 'All Genders'   && `Gender: ${genderFilter}`,
    subFilter    !== 'All Types'     && `Type: ${subFilter}`,
    occasionFilter !== 'All Occasions' && `Occasion: ${occasionFilter}`,
    colorFilter  !== 'All Colors'    && `Color: ${colorFilter}`,
    seasonFilter !== 'All Seasons'   && `Season: ${seasonFilter}`,
  ].filter(Boolean);

  const clearFilters = () => {
    setSearch(''); setSubFilter('All Types'); setOccasionFilter('All Occasions');
    setColorFilter('All Colors'); setSeasonFilter('All Seasons');
    setAgeFilter('All Ages'); setGenderFilter('All Genders');
    setPagination({ filterKey: '', visibleCount: 20 });
  };

  const relatedOutfits = useMemo(() => {
    if (!selectedOutfit) return [];
    return (selectedOutfit.related || []).map((rid) => outfits.find((o) => o.id === rid)).filter(Boolean);
  }, [selectedOutfit]);

  // Amazon panel filters object (re-used by AmazonPicksPanel)
  const amazonFilters = {
    gender:       genderFilter,
    ageGroup:     ageFilter,
    clothingType: subFilter,
    occasion:     occasionFilter,
    color:        colorFilter,
    season:       seasonFilter,
    search,
  };

  if (!user) { navigate('/login', { replace: true }); return null; }

  const toggleSave = (outfit) => {
    const current = getSavedOutfits(user.username);
    const exists  = current.find((o) => o.id === outfit.id);
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
          <nav className="cat-breadcrumb" aria-label="Breadcrumb">
            <Link to="/dashboard">Dashboard</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{cat.label}</span>
          </nav>
          <div className="cat-hero">
            <SafeImage
              src={cat.cover}
              fallbackSrc={cat.fallbackCover || '/images/fallback.jpg'}
              alt={cat.label}
              name={cat.label}
              className="cat-hero-img"
            />
            <div className="cat-hero-overlay">
              <span className="cat-hero-tag">Collection · {catOutfits.length} styles</span>
              <h1>{cat.label}</h1>
              <p>{cat.description}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="cat-filters">
          <div className="cat-search-wrap">
            <Search size={16} />
            <input
              aria-label="Search fashion items"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items, colours, occasions…"
            />
            {search && <button aria-label="Clear search" onClick={() => setSearch('')}><X size={14} /></button>}
          </div>
          <div className="cat-demographic-filters">
            <label className="cat-select">
              <span>Age Group</span>
              <select aria-label="Age Group" value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
                <option value="All Ages">All Ages</option>
                {ageGroups.map((age) => (
                  <option key={age} value={age}>{age} ({ageGroupRanges[age][0]}–{ageGroupRanges[age][1]} years)</option>
                ))}
              </select>
            </label>
            <label className="cat-select">
              <span>Gender</span>
              <select aria-label="Gender" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                <option value="All Genders">All Genders</option>
                {genders.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </label>
          </div>
          <div className="cat-demographic-filters">
            <label className="cat-select">
              <span>Clothing Type</span>
              <select aria-label="Clothing Type" value={subFilter} onChange={(e) => setSubFilter(e.target.value)}>
                <option value="All Types">All Types</option>
                {itemTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <label className="cat-select">
              <span>Colour</span>
              <select aria-label="Colour" value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
                <option value="All Colors">All Colours</option>
                {colors.map((color) => <option key={color} value={color}>{color}</option>)}
              </select>
            </label>
            <label className="cat-select">
              <span>Season</span>
              <select aria-label="Season" value={seasonFilter} onChange={(e) => setSeasonFilter(e.target.value)}>
                <option value="All Seasons">All Seasons</option>
                {seasons.map((season) => <option key={season} value={season}>{season}</option>)}
              </select>
            </label>
          </div>
          <div className="cat-filter-chips">
            {itemTypes.filter((type) => categoryTypeList.includes(type)).map((s) => (
              <button
                key={s}
                className={`chip ${subFilter === s ? 'active' : ''}`}
                aria-pressed={subFilter === s}
                onClick={() => setSubFilter(subFilter === s ? 'All Types' : s)}
              >{s}</button>
            ))}
          </div>
          <div className="cat-filter-chips">
            <button
              className={`chip ${occasionFilter === 'All Occasions' ? 'active' : ''}`}
              aria-pressed={occasionFilter === 'All Occasions'}
              onClick={() => setOccasionFilter('All Occasions')}
            >All Occasions</button>
            {occasions.map((o) => (
              <button
                key={o}
                className={`chip ${occasionFilter === o ? 'active' : ''}`}
                aria-pressed={occasionFilter === o}
                onClick={() => setOccasionFilter(occasionFilter === o ? 'All Occasions' : o)}
              >{o}</button>
            ))}
          </div>
        </div>

        <div className="cat-results-heading">
          <p className="cat-count" aria-live="polite">
            {filtered.length} item{filtered.length !== 1 ? 's' : ''} found
          </p>
          <button className="cat-clear-filters" onClick={clearFilters} disabled={activeFilters.length === 0}>
            Clear All Filters
          </button>
        </div>

        {activeFilters.length > 0 && (
          <div className="cat-active-filters" aria-label="Active filters">
            {activeFilters.map((f) => <span key={f} className="cat-active-filter">{f}</span>)}
          </div>
        )}

        {/* Amazon Picks panel */}
        <AmazonPicksPanel categoryId={categoryId} filters={amazonFilters} />

        {/* Style Gallery */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <SlidersHorizontal size={48} />
            <h3>No looks found</h3>
            <p>Try adjusting your filters.</p>
            <button className="btn-outline" onClick={clearFilters}>Clear All Filters</button>
          </div>
        ) : (
          <div className="fashion-gallery">
            {filtered.slice(0, visibleCount).map((outfit) => (
              <div
                key={outfit.id}
                className="fashion-card"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedOutfit(outfit); }}
                onClick={() => setSelectedOutfit(outfit)}
              >
                <div className="fashion-card-img">
                  <SafeImage
                    src={outfit.image}
                    alt={outfit.title}
                    name={outfit.title}
                    className="fashion-img"
                    fallbackSrc="/images/fallback.jpg"
                  />
                  <button
                    className={`fashion-fav ${savedIds.includes(outfit.id) ? 'saved' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleSave(outfit); }}
                    aria-label="Save look"
                  >
                    <Heart size={15} fill={savedIds.includes(outfit.id) ? '#be123c' : 'none'} />
                  </button>
                  <div className="fashion-card-hover"><span>View Look</span></div>
                </div>
                <div className="fashion-card-info">
                  <span className="fashion-sub">{outfit.subcategory}</span>
                  <h4>{outfit.title}</h4>
                  <p className="fashion-description">{outfit.description}</p>
                  <p className="fashion-audience">
                    {outfit.ageGroup} ({outfit.ageRange[0]}–{outfit.ageRange[1]} years) · {outfit.genderSuitability.join(', ')}
                  </p>
                  <div className="fashion-meta">
                    <span className="fashion-occasion">{outfit.occasion}</span>
                    <div className="fashion-colors">
                      {outfit.colors.map((c, idx) => (
                        <span key={`${c}-${idx}`} className="fc-dot" style={{ background: c }} title={outfit.colorNames[idx]} />
                      ))}
                    </div>
                  </div>
                  {/* Shop on Amazon button */}
                  <a
                    href={buildAmazonSearchUrl(`${outfit.title} ${outfit.subcategory}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cat-amazon-btn"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Shop ${outfit.title} on Amazon`}
                  >
                    <ShoppingBag size={13} /> Shop on Amazon <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length > visibleCount && (
          <div className="cat-load-more">
            <button
              className="btn-outline"
              onClick={() => setPagination({ filterKey, visibleCount: visibleCount + 20 })}
            >
              Load More ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}
        <p className="cat-image-note">{imageSourceNote}</p>

        {/* Outfit Detail Modal */}
        {selectedOutfit && (
          <div className="outfit-modal-overlay" onClick={() => setSelectedOutfit(null)}>
            <div className="outfit-modal" onClick={(e) => e.stopPropagation()}>
              <button className="outfit-modal-close" onClick={() => setSelectedOutfit(null)} aria-label="Close modal">
                <X size={20} />
              </button>
              <div className="outfit-modal-body">
                <div className="outfit-modal-left">
                  <SafeImage
                    src={selectedOutfit.image}
                    alt={selectedOutfit.title}
                    name={selectedOutfit.title}
                    className="outfit-modal-img"
                    fallbackSrc="/images/fallback.jpg"
                  />
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
                      {selectedOutfit.colors.map((c) => (
                        <span key={c} className="fc-dot lg" style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                  <div className="outfit-modal-actions">
                    <button className="btn-primary" onClick={() => toggleSave(selectedOutfit)}>
                      <Heart size={16} fill={savedIds.includes(selectedOutfit.id) ? '#fff' : 'none'} />
                      {savedIds.includes(selectedOutfit.id) ? 'Saved' : 'Save Look'}
                    </button>
                    <a
                      href={buildAmazonSearchUrl(`${selectedOutfit.title} ${selectedOutfit.subcategory}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                    >
                      <ShoppingBag size={15} /> Shop on Amazon
                    </a>
                    <Link to="/wardrobe" className="btn-outline">Add to Wardrobe</Link>
                  </div>
                  {relatedOutfits.length > 0 && (
                    <div className="outfit-related">
                      <p>Similar Looks</p>
                      <div className="outfit-related-grid">
                        {relatedOutfits.map((r) => (
                          <div key={r.id} className="outfit-related-card" onClick={() => setSelectedOutfit(r)}>
                            <SafeImage
                              src={r.image}
                              alt={r.title}
                              name={r.title}
                              className="outfit-related-img"
                              fallbackSrc="/images/fallback.jpg"
                            />
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
