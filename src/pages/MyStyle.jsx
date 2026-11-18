import { useMemo, useState } from 'react';
import { ExternalLink, Shirt, ShoppingBag, Sparkles } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AmazonDatasetProducts from '../components/AmazonDatasetProducts';
import { getStyleLooks } from '../data/styleLooksData';
import './MyStyle.css';

const STYLE_FILTERS = [
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
  { value: 'daily-wear', label: 'Daily Wear' },
];

const SEASON_FILTERS = ['All Seasons', 'Winter', 'Summer', 'Monsoon', 'All Season'];
const AUDIENCE_FILTERS = [
  { value: 'All', label: 'Everyone' },
  { value: 'Women', label: 'Women' },
  { value: 'Men', label: 'Men' },
  { value: 'Girl', label: 'Girls' },
  { value: 'Boy', label: 'Boys' },
];
const AGE_FILTERS = [
  'All Ages',
  'Kids 2-5',
  '6-12',
  'Teen 13-17',
  'Adult 18-35',
  '35+',
];
export default function MyStyle() {
  const [audience, setAudience] = useState('All');
  const [ageGroup, setAgeGroup] = useState('All Ages');
  const [activeStyle, setActiveStyle] = useState('');
  const [activeSeason, setActiveSeason] = useState('All Seasons');
  const [expandedLookId, setExpandedLookId] = useState(null);
  const looks = useMemo(
    () => getStyleLooks({ audience, ageGroup }),
    [audience, ageGroup],
  );
  const visibleLooks = useMemo(() => looks.filter((look) => (
    (!activeStyle || look.style === activeStyle)
    && (activeSeason === 'All Seasons' || look.season === activeSeason)
  )), [looks, activeSeason, activeStyle]);
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main ms-dashboard-main ms-lookbook-main">
        <header className="ms-lookbook-header">
          <div>
            <p className="ms-lookbook-eyebrow"><Sparkles size={14} /> StyleMatch Lookbook</p>
            <h1>My Style</h1>
            <p>100 complete outfit ideas. Pick a look, check every piece and shop similar items.</p>
          </div>
        </header>

        <section className="ms-lookbook-filters" aria-label="Filter looks">
          <div className="ms-filter-group">
            <h2>For</h2>
            <div className="ms-filter-chips" role="tablist" aria-label="Filter by audience">
              {AUDIENCE_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  role="tab"
                  aria-selected={audience === filter.value}
                  className={`ms-filter-chip ${audience === filter.value ? 'active' : ''}`}
                  onClick={() => setAudience(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="ms-filter-group">
            <h2>Age</h2>
            <div className="ms-filter-chips" role="tablist" aria-label="Filter by age">
              {AGE_FILTERS.map((age) => (
                <button
                  key={age}
                  type="button"
                  role="tab"
                  aria-selected={ageGroup === age}
                  className={`ms-filter-chip ${ageGroup === age ? 'active' : ''}`}
                  onClick={() => setAgeGroup(age)}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          <div className="ms-filter-group">
            <h2>Season</h2>
            <div className="ms-filter-chips" role="tablist" aria-label="Filter by season">
              {SEASON_FILTERS.map((season) => (
                <button
                  key={season}
                  type="button"
                  role="tab"
                  aria-selected={activeSeason === season}
                  className={`ms-filter-chip ${activeSeason === season ? 'active' : ''}`}
                  onClick={() => setActiveSeason(season)}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>

          <div className="ms-filter-group">
            <h2>Style</h2>
            <div className="ms-filter-chips" role="tablist" aria-label="Filter by style">
              {STYLE_FILTERS.map((style) => (
                <button
                  key={style.value || 'all'}
                  type="button"
                  role="tab"
                  aria-selected={activeStyle === style.value}
                  className={`ms-filter-chip ${activeStyle === style.value ? 'active' : ''}`}
                  onClick={() => setActiveStyle(style.value)}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <AmazonDatasetProducts />

        <div className="ms-lookbook-results">
          <h2>{activeSeason === 'All Seasons' ? 'All looks' : `${activeSeason} looks`}</h2>
          <span>{visibleLooks.length} looks</span>
        </div>

        {visibleLooks.length === 0 ? (
          <div className="ms-lookbook-empty">
            <Shirt size={28} />
            <p>No looks match these filters.</p>
            <button
              type="button"
              className="ms-filter-chip"
              onClick={() => {
                setAudience('All');
                setAgeGroup('All Ages');
                setActiveStyle('');
                setActiveSeason('All Seasons');
              }}
            >
              Show all looks
            </button>
          </div>
        ) : (
          <section className="ms-lookbook-grid" aria-label="Complete outfit looks">
            {visibleLooks.map((look) => {
              const isExpanded = expandedLookId === look.id;
              return (
                <article className={`ms-look-card ${isExpanded ? 'expanded' : ''}`} key={look.id}>
                  <div className="ms-look-image-wrap">
                    <a
                      className="ms-look-image-link"
                      href={look.amazonUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      aria-label={`Shop ${look.title} on Amazon India`}
                    >
                      <div className="ms-look-placeholder" aria-hidden="true">
                        <Shirt size={38} />
                        <span>See real outfit photos on Amazon</span>
                      </div>
                      <span className="ms-look-season">{look.season}</span>
                      <span className="ms-look-shop-badge">
                        <ShoppingBag size={13} /> Shop on Amazon
                      </span>
                    </a>
                  </div>
                  <button
                    type="button"
                    className="ms-look-card-toggle"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedLookId(isExpanded ? null : look.id)}
                  >
                    <div className="ms-look-card-copy">
                      <span className="ms-look-style">{look.styleLabel}</span>
                      <h3>{look.title}</h3>
                      <span className="ms-look-audience">
                        {look.audienceLabel} · {look.ageGroup}
                      </span>
                      <div className="ms-look-card-meta">
                        <span><Shirt size={14} /> {look.items.length} pieces</span>
                        <strong>{look.total}</strong>
                      </div>
                      <span className="ms-look-open-label">
                        {isExpanded ? 'Hide pieces' : 'See complete look'}
                      </span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="ms-look-pieces">
                      <h4>Pieces in this look</h4>
                      {look.items.map((item) => (
                        <div className="ms-look-piece" key={item.id}>
                          <div className="ms-look-piece-icon" aria-hidden="true">
                            <Shirt size={18} />
                          </div>
                          <div className="ms-look-piece-info">
                            <strong>{item.name}</strong>
                            <span>{item.price || 'See price on Amazon'}</span>
                          </div>
                          <div className="ms-look-piece-links">
                            <a
                              href={item.amazonUrl}
                              target="_blank"
                              rel="nofollow sponsored noopener noreferrer"
                              aria-label={`See ${item.name} on Amazon India`}
                            >
                              Amazon <ExternalLink size={12} />
                            </a>
                            <a
                              href={item.similarUrl}
                              target="_blank"
                              rel="nofollow sponsored noopener noreferrer"
                              aria-label={`See similar items to ${item.name} on Amazon India`}
                            >
                              Similar <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>
                      ))}
                      <div className="ms-look-total">
                        <span>Estimated total</span>
                        <strong>{look.total}</strong>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        )}

        <footer className="ms-lookbook-note">
          <ShoppingBag size={14} />
          Amazon photos and current prices open when you shop a look. Demo mode has no official
          Amazon photo feed, so unrelated photos are hidden. Prices here are estimates.
          As an Amazon Associate I earn from qualifying purchases.
        </footer>
      </main>
    </div>
  );
}
