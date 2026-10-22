import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import OutfitCard from '../components/OutfitCard';
import { useAuth } from '../context/AuthContext';
import { getSavedOutfits, saveOutfits, getWardrobe, getStylePrefs } from '../utils/storage';
import { filterOutfits, buildWardrobeOutfits } from '../data/outfits';
import { SlidersHorizontal, Star, Shirt } from 'lucide-react';

const OCCASIONS = ['All', 'Casual', 'College', 'Office', 'Party', 'Wedding', 'Festival', 'Travel'];
const CLOTHING = ['All', 'Traditional', 'Western', 'Indo-Western', 'Sportswear'];
const STYLES = ['All', 'Minimal', 'Elegant', 'Trendy', 'Classic', 'Streetwear'];
const BUDGETS = [
  { label: 'Any Budget', value: 'all' },
  { label: 'Budget Friendly', value: 'low' },
  { label: 'Mid Range', value: 'medium' },
  { label: 'Premium', value: 'high' },
];

export default function MyStyle() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // All hooks declared unconditionally before any conditional return
  const [filters, setFilters] = useState({ occasion: 'All', clothing: 'All', style: 'All', budget: 'all' });
  const [showFilters, setShowFilters] = useState(true);
  const [savedIds, setSavedIds] = useState(() =>
    user ? getSavedOutfits(user.username).map((o) => o.id) : []
  );

  // Redirect after hooks — satisfies rules-of-hooks
  if (!user) { navigate('/login', { replace: true }); return null; }

  const wardrobe = getWardrobe(user.username);
  const stylePrefs = getStylePrefs(user.username);
  const wardrobeOutfits = buildWardrobeOutfits(wardrobe, stylePrefs);
  const results = filterOutfits(filters);

  const handleSave = (outfit) => {
    const current = getSavedOutfits(user.username);
    const exists = current.find((o) => o.id === outfit.id);
    const updated = exists ? current.filter((o) => o.id !== outfit.id) : [...current, outfit];
    saveOutfits(user.username, updated);
    setSavedIds(updated.map((o) => o.id));
  };

  const isSaved = (id) => savedIds.includes(id);

  const setFilter = (key, val) => setFilters((f) => ({ ...f, [key]: val }));

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h2>My Style</h2>
            <p>Discover outfits tailored to your preferences</p>
          </div>
          <button className="btn-outline" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal size={16} /> {showFilters ? 'Hide' : 'Show'} Filters
          </button>
        </div>

        {/* ── From Your Wardrobe ── */}
        {wardrobeOutfits.length > 0 && (
          <div className="wardrobe-outfits-section">
            <div className="wardrobe-outfits-header">
              <Shirt size={16} />
              <span>From Your Wardrobe</span>
              <span className="wardrobe-outfits-count">{wardrobeOutfits.length} combination{wardrobeOutfits.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="outfit-grid">
              {wardrobeOutfits.map((outfit) => (
                <OutfitCard
                  key={outfit.id}
                  outfit={outfit}
                  onSave={handleSave}
                  isSaved={isSaved(outfit.id)}
                />
              ))}
            </div>
          </div>
        )}

        {showFilters && (
          <div className="style-filters">
            <div className="filter-group">
              <label>Occasion</label>
              <div className="filter-chips">
                {OCCASIONS.map((o) => (
                  <button
                    key={o}
                    className={`chip ${filters.occasion === o ? 'active' : ''}`}
                    onClick={() => setFilter('occasion', o)}
                  >{o}</button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Clothing Type</label>
              <div className="filter-chips">
                {CLOTHING.map((c) => (
                  <button
                    key={c}
                    className={`chip ${filters.clothing === c ? 'active' : ''}`}
                    onClick={() => setFilter('clothing', c)}
                  >{c}</button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Fashion Style</label>
              <div className="filter-chips">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    className={`chip ${filters.style === s ? 'active' : ''}`}
                    onClick={() => setFilter('style', s)}
                  >{s}</button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Budget</label>
              <div className="filter-chips">
                {BUDGETS.map((b) => (
                  <button
                    key={b.value}
                    className={`chip ${filters.budget === b.value ? 'active' : ''}`}
                    onClick={() => setFilter('budget', b.value)}
                  >{b.label}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="results-header">
          <span>{results.length} outfit{results.length !== 1 ? 's' : ''} found</span>
        </div>

        {results.length === 0 ? (
          <div className="empty-state">
            <Star size={56} />
            <h3>No outfits match your filters</h3>
            <p>Try adjusting your preferences to discover more styles.</p>
            <button className="btn-primary" onClick={() => setFilters({ occasion: 'All', clothing: 'All', style: 'All', budget: 'all' })}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="outfit-grid">
            {results.map((outfit) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                onSave={handleSave}
                isSaved={isSaved(outfit.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
