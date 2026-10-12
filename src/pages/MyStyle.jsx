import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import OutfitCard from '../components/OutfitCard';
import { getSession, getSavedOutfits, saveOutfits } from '../utils/storage';
import { filterOutfits } from '../data/outfits';
import { SlidersHorizontal, Star } from 'lucide-react';

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
  const user = getSession();
  const [filters, setFilters] = useState({ occasion: 'All', clothing: 'All', style: 'All', budget: 'all' });
  const [showFilters, setShowFilters] = useState(true);

  const results = filterOutfits(filters);
  const savedOutfits = getSavedOutfits(user.username);

  const handleSave = (outfit) => {
    const current = getSavedOutfits(user.username);
    const exists = current.find((o) => o.id === outfit.id);
    if (exists) {
      saveOutfits(user.username, current.filter((o) => o.id !== outfit.id));
    } else {
      saveOutfits(user.username, [...current, outfit]);
    }
  };

  const isSaved = (id) => getSavedOutfits(user.username).some((o) => o.id === id);

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
