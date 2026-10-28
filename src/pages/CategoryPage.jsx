import { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Search, SlidersHorizontal, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { ageGroupRanges, ageGroups, categories, genders, imageSourceNote, outfits } from '../data/fashionData';
import { useAuth } from '../context/AuthContext';
import { getSavedOutfits, saveOutfits } from '../utils/storage';

function FashionImg({ src, alt, className }) {
  const [err, setErr] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (err) {
    return <div className={`${className} fashion-image-unavailable`} role="img" aria-label={`${alt}; image unavailable`}>Image unavailable</div>;
  }
  return <img src={src} alt={alt} className={`${className}${loaded ? ' loaded' : ' loading'}`} onLoad={() => setLoaded(true)} onError={() => setErr(true)} loading="lazy" />;
}

export default function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // All hooks declared unconditionally before any conditional return
  const [search, setSearch] = useState('');
  const [subFilter, setSubFilter] = useState('All');
  const [occasionFilter, setOccasionFilter] = useState('All');
  const [colorFilter, setColorFilter] = useState('All Colors');
  const [seasonFilter, setSeasonFilter] = useState('All Seasons');
  const [ageFilter, setAgeFilter] = useState('All Ages');
  const [genderFilter, setGenderFilter] = useState('All Genders');
  const filterKey = JSON.stringify([categoryId, search, subFilter, occasionFilter, colorFilter, seasonFilter, ageFilter, genderFilter]);
  const [pagination, setPagination] = useState({ filterKey: '', visibleCount: 20 });
  const visibleCount = pagination.filterKey === filterKey ? pagination.visibleCount : 20;
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [savedIds, setSavedIds] = useState(() =>
    user ? getSavedOutfits(user.username).map((o) => o.id) : []
  );

  const cat = categories.find((c) => c.id === categoryId);
  const effectiveCategoryId = cat?.alias || categoryId;

  const catOutfits = outfits.filter((o) => o.category === effectiveCategoryId);
  const occasions = [...new Set(catOutfits.map((o) => o.occasion))].sort();
  const itemTypes = [...new Set(catOutfits.map((o) => o.itemType))].sort();
  const colors = [...new Set(catOutfits.flatMap((o) => o.colorNames))].sort();
  const seasons = [...new Set(catOutfits.map((o) => o.season))].sort();
  const filtered = catOutfits.filter((o) => {
    const q = search.trim().toLowerCase();
    const searchableText = [o.title, o.itemType, o.subcategory, o.occasion, o.style, o.description, ...o.colorNames].join(' ').toLowerCase();
    const matchSearch = !q || searchableText.includes(q);
    const matchSub = subFilter === 'All' || o.itemType === subFilter;
    const matchOcc = occasionFilter === 'All' || o.occasion === occasionFilter;
    const matchAge = ageFilter === 'All Ages' || o.ageGroups.includes(ageFilter);
    const matchGender = genderFilter === 'All Genders' || o.genderSuitability.includes(genderFilter);
    const matchColor = colorFilter === 'All Colors' || o.colorNames.includes(colorFilter);
    const matchSeason = seasonFilter === 'All Seasons' || o.season === seasonFilter;
    return matchSearch && matchSub && matchOcc && matchAge && matchGender && matchColor && matchSeason;
  });
  const activeFilters = [
    search.trim() && `Search: ${search.trim()}`,
    ageFilter !== 'All Ages' && `Age: ${ageFilter} (${ageGroupRanges[ageFilter][0]}–${ageGroupRanges[ageFilter][1]} years)`,
    genderFilter !== 'All Genders' && `Gender: ${genderFilter}`,
    subFilter !== 'All' && `Type: ${subFilter}`,
    occasionFilter !== 'All' && `Occasion: ${occasionFilter}`,
    colorFilter !== 'All Colors' && `Color: ${colorFilter}`,
    seasonFilter !== 'All Seasons' && `Season: ${seasonFilter}`,
  ].filter(Boolean);
  const clearFilters = () => {
    setSearch('');
    setSubFilter('All');
    setOccasionFilter('All');
    setColorFilter('All Colors');
    setSeasonFilter('All Seasons');
    setAgeFilter('All Ages');
    setGenderFilter('All Genders');
  };

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
          <nav className="cat-breadcrumb" aria-label="Breadcrumb">
            <Link to="/dashboard">Dashboard</Link><span aria-hidden="true">/</span><span aria-current="page">{cat.label}</span>
          </nav>
          <div className="cat-hero">
            <FashionImg src={cat.cover} alt={cat.label} className="cat-hero-img" />
            <div className="cat-hero-overlay">
              <span className="cat-hero-tag">Collection · 100 styles</span>
              <h1>{cat.label}</h1>
              <p>{cat.description}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="cat-filters">
          <div className="cat-search-wrap">
            <Search size={16} />
            <input aria-label="Search fashion items" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search items, colours, occasions..." />
            {search && <button aria-label="Clear search" onClick={() => setSearch('')}><X size={14} /></button>}
          </div>
          <div className="cat-demographic-filters">
            <label className="cat-select">
              <span>Age Group</span>
              <select aria-label="Age Group" value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
                <option value="All Ages">All Ages</option>
                {ageGroups.map((age) => <option key={age} value={age}>{age} ({ageGroupRanges[age][0]}–{ageGroupRanges[age][1]} years)</option>)}
              </select>
            </label>
            <label className="cat-select">
              <span>Gender</span>
              <select aria-label="Gender" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                <option value="All Genders">All Genders</option>
                {genders.map((gender) => <option key={gender} value={gender}>{gender}</option>)}
              </select>
            </label>
          </div>
          <div className="cat-demographic-filters">
            <label className="cat-select">
              <span>Clothing Type</span>
              <select aria-label="Clothing Type" value={subFilter} onChange={(e) => setSubFilter(e.target.value)}>
                <option value="All">All Types</option>
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
            {itemTypes.map((s) => (
              <button key={s} className={`chip ${subFilter === s ? 'active' : ''}`} aria-pressed={subFilter === s} onClick={() => setSubFilter(subFilter === s ? 'All' : s)}>{s}</button>
            ))}
          </div>
          <div className="cat-filter-chips">
            <button className={`chip ${occasionFilter === 'All' ? 'active' : ''}`} aria-pressed={occasionFilter === 'All'} onClick={() => setOccasionFilter('All')}>All Occasions</button>
            {occasions.map((o) => (
              <button key={o} className={`chip ${occasionFilter === o ? 'active' : ''}`} aria-pressed={occasionFilter === o} onClick={() => setOccasionFilter(occasionFilter === o ? 'All' : o)}>{o}</button>
            ))}
          </div>
        </div>

        <div className="cat-results-heading">
          <p className="cat-count" aria-live="polite">{filtered.length} item{filtered.length !== 1 ? 's' : ''} found</p>
          <button className="cat-clear-filters" onClick={clearFilters} disabled={activeFilters.length === 0}>Clear All Filters</button>
        </div>
        {activeFilters.length > 0 && (
          <div className="cat-active-filters" aria-label="Active filters">
            {activeFilters.map((filter) => <span key={filter} className="cat-active-filter">{filter}</span>)}
          </div>
        )}

        {/* Gallery */}
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
              <div key={outfit.id} className="fashion-card" role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedOutfit(outfit); }} onClick={() => setSelectedOutfit(outfit)}>
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
                  <p className="fashion-description">{outfit.description}</p>
                  <p className="fashion-audience">{outfit.ageGroup} ({outfit.ageRange[0]}–{outfit.ageRange[1]} years) · {outfit.genderSuitability.join(', ')}</p>
                  <div className="fashion-meta">
                    <span className="fashion-occasion">{outfit.occasion}</span>
                    <div className="fashion-colors">
                      {outfit.colors.map((c, index) => <span key={`${c}-${index}`} className="fc-dot" style={{ background: c }} title={outfit.colorNames[index]} />)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {filtered.length > visibleCount && (
          <div className="cat-load-more">
            <button className="btn-outline" onClick={() => setPagination({ filterKey, visibleCount: visibleCount + 20 })}>
              Load More ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}
        <p className="cat-image-note">{imageSourceNote}</p>

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
