import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Shirt } from 'lucide-react';
import { loadAmazonDataset } from '../services/amazonDataset';
import './AmazonDatasetProducts.css';

function DatasetProductCard({ product }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="amazon-dataset-card">
      <div className="amazon-dataset-image">
        {product.imageUrl && !imageFailed ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="amazon-dataset-no-image">
            <Shirt size={28} aria-hidden="true" />
            <span>{imageFailed ? 'Product image failed to load' : 'No product image in CSV'}</span>
          </div>
        )}
      </div>
      <div className="amazon-dataset-product-copy">
        <h3>{product.name}</h3>
        {product.manufacturer && <span>{product.manufacturer}</span>}
        <p>{product.category}</p>
        <div className="amazon-dataset-product-meta">
          <strong>{product.price || 'Price not provided'}</strong>
          <span>{product.audience || 'Audience not specified'}</span>
        </div>
        {product.productUrl ? (
          <a href={product.productUrl} target="_blank" rel="noopener noreferrer">
            Open Amazon UK listing <ExternalLink size={13} />
          </a>
        ) : (
          <span>Product link not provided</span>
        )}
      </div>
    </article>
  );
}

export default function AmazonDatasetProducts({ compact = false }) {
  const [products, setProducts] = useState([]);
  const [imageFields, setImageFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeAudience, setActiveAudience] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let active = true;

    loadAmazonDataset()
      .then((dataset) => {
        if (!active) return;
        setProducts(dataset.products);
        setImageFields(dataset.imageFields);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category).filter(Boolean))].sort(),
    [products],
  );
  const audiences = useMemo(
    () => [...new Set(products.map((product) => product.audience).filter(Boolean))].sort(),
    [products],
  );
  const visibleProducts = useMemo(() => products.filter((product) => (
    (!activeAudience || product.audience === activeAudience)
    && (!activeCategory || product.category === activeCategory)
  )), [activeAudience, activeCategory, products]);
  const displayedProducts = compact && !showAll ? visibleProducts.slice(0, 8) : visibleProducts;
  const missingImages = !products.some((product) => product.imageUrl);
  const imageNotice = imageFields.length === 0
    ? 'No product image URL or image-filename columns are present in this CSV. Product photos cannot be shown; no unrelated images are used.'
    : 'The CSV has image fields, but none contain a usable product image URL or filename. No unrelated images are used.';
  const displayedCount = loading
    ? 'Loading…'
    : `${visibleProducts.length} product${visibleProducts.length === 1 ? '' : 's'}`;

  return (
    <section className={`amazon-dataset-section ${compact ? 'compact' : ''}`} aria-label="Products from Amazon dataset">
      <div className="amazon-dataset-heading">
        <div>
          <h2>Products from your Amazon dataset</h2>
          <p>Product names, categories, prices and Amazon UK links are mapped from the CSV records.</p>
        </div>
        <span className="amazon-dataset-count">{displayedCount}</span>
      </div>

      {!loading && !error && (
        <div className="amazon-dataset-filters">
          {audiences.length > 0 && (
            <div className="amazon-dataset-filter-group">
              <span>Audience terms in product name</span>
              <div className="amazon-dataset-filter-chips" aria-label="Filter dataset by audience">
                <button
                  type="button"
                  className={!activeAudience ? 'active' : ''}
                  aria-pressed={!activeAudience}
                  onClick={() => setActiveAudience('')}
                >
                  All
                </button>
                {audiences.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={activeAudience === value ? 'active' : ''}
                    aria-pressed={activeAudience === value}
                    onClick={() => setActiveAudience(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          )}
          {categories.length > 0 && (
            <label className="amazon-dataset-category-filter">
              <span>Dataset category</span>
              <select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)}>
                <option value="">All available categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>
          )}
        </div>
      )}

      {!loading && !error && missingImages && (
        <p className="amazon-dataset-data-note" role="status">
          {imageNotice}
        </p>
      )}

      {error ? (
        <p className="amazon-dataset-message" role="alert">{error}</p>
      ) : loading ? (
        <p className="amazon-dataset-message">Loading product records from the CSV…</p>
      ) : visibleProducts.length === 0 ? (
        <p className="amazon-dataset-message">No dataset products match these filters.</p>
      ) : (
        <>
          <div className="amazon-dataset-grid">
            {displayedProducts.map((product) => (
              <DatasetProductCard key={product.id} product={product} />
            ))}
          </div>
          {compact && visibleProducts.length > 8 && (
            <button
              type="button"
              className="amazon-dataset-show-all"
              onClick={() => setShowAll((current) => !current)}
            >
              {showAll ? 'Show fewer products' : `Show all ${visibleProducts.length} products`}
            </button>
          )}
        </>
      )}
    </section>
  );
}
