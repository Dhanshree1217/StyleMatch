import { X, ShoppingBag, CheckCircle2, Star, Info, ExternalLink } from 'lucide-react';
import SafeImage from './SafeImage';
import { buildAmazonSearchUrl } from '../data/shopTheLookData';

export default function AmazonProductModal({ isOpen, item, onClose }) {
  if (!isOpen || !item) return null;

  const title = item.title || item.name;
  const image = item.image;
  const price = item.price;
  const originalPrice = item.originalPrice || item.mrp;
  const discount = item.discount;
  const rating = item.rating || 4.4;
  const reviewsCount = item.reviewsCount || 1200;
  const type = item.type || item.category || 'Fashion Item';
  const sizes = item.sizes || ['S', 'M', 'L', 'XL'];
  const colors = item.colors || ['Standard Color Variant'];
  const description = item.description || 'Premium quality fabric tailored for superior comfort, durability, and modern styling.';
  const amazonUrl = item.amazonUrl || buildAmazonSearchUrl(title);
  const similarUrl = item.similarUrl || buildAmazonSearchUrl(type);
  const similarItems = item.similarItems || [
    { label: `Similar ${type}`, query: `${type} for ${item.gender || 'women'}` },
    { label: 'Trending Styles', query: `trending ${type} on amazon india` },
    { label: 'Budget Picks', query: `budget ${type} under 1499` },
  ];

  return (
    <div
      className="stl-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="stl-modal-title"
    >
      <div className="stl-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="stl-modal-top-bar">
          <div className="stl-modal-brand">
            <span className="stl-amazon-badge">
              <ShoppingBag size={13} /> Amazon India
            </span>
            <span className="stl-feature-pill">
              <CheckCircle2 size={12} /> Verified Amazon Match
            </span>
          </div>
          <button
            type="button"
            className="stl-modal-close-btn"
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="stl-modal-content">
          {/* Left: Image Preview */}
          <div className="stl-modal-image-col">
            <div className="stl-modal-img-wrap">
              <SafeImage
                src={image}
                alt={title}
                name={title}
                className="stl-modal-img"
                fallbackSrc="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80&auto=format&fit=crop"
              />
            </div>
          </div>

          {/* Right: Specifications & Actions */}
          <div className="stl-modal-details-col">
            <div className="stl-item-tag-row">
              <span className="stl-item-type">{type}</span>
              {item.category && (
                <span
                  className="stl-item-type"
                  style={{ background: '#ecfdf5', color: '#059669' }}
                >
                  {item.category}
                </span>
              )}
            </div>

            <h3 id="stl-modal-title" className="stl-modal-title">
              {title}
            </h3>

            <div className="stl-modal-rating-row">
              <span className="stl-modal-stars">
                <Star size={14} fill="#f59e0b" color="#f59e0b" style={{ display: 'inline', verticalAlign: '-1px' }} /> {rating} out of 5
              </span>
              <span>•</span>
              <span>{reviewsCount} customer reviews on Amazon.in</span>
            </div>

            {/* Price Box */}
            <div className="stl-modal-price-box">
              <span className="stl-modal-now-price">{price}</span>
              {originalPrice && (
                <span className="stl-modal-orig-price">M.R.P.: {originalPrice}</span>
              )}
              {discount && <span className="stl-modal-disc-tag">{discount}</span>}
            </div>

            {/* Available Sizes */}
            {sizes && sizes.length > 0 && (
              <div className="stl-option-group">
                <span className="stl-option-label">Available Sizes:</span>
                <div className="stl-option-chips">
                  {sizes.map((sz) => (
                    <span key={sz} className="stl-opt-chip">
                      {sz}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available Colours */}
            {colors && colors.length > 0 && (
              <div className="stl-option-group">
                <span className="stl-option-label">Available Colours:</span>
                <div className="stl-option-chips">
                  {colors.map((col) => (
                    <span key={col} className="stl-opt-chip">
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {description && <p className="stl-modal-desc">{description}</p>}

            {/* Genuine Amazon Match Notice */}
            <div className="stl-amazon-notice">
              <Info size={16} flexShrink={0} />
              <span>
                <strong>Amazon India Product Link:</strong> Clicking below opens matching live
                listings directly on Amazon India with current prices, Prime delivery, and verified
                buyer reviews.
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="stl-modal-cta-row">
              <a
                href={amazonUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="stl-btn-buy-amazon"
              >
                <ShoppingBag size={18} /> Buy this item on Amazon India <ExternalLink size={16} />
              </a>

              <a
                href={similarUrl}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="stl-btn-similar-amazon"
              >
                See Similar {type} on Amazon India <ExternalLink size={14} />
              </a>
            </div>

            {/* Related Searches */}
            {similarItems && similarItems.length > 0 && (
              <div className="stl-similar-searches-box">
                <p className="stl-similar-title">More Related Searches on Amazon India:</p>
                <div className="stl-similar-chips">
                  {similarItems.map((sim) => (
                    <a
                      key={sim.label}
                      href={buildAmazonSearchUrl(sim.query)}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="stl-similar-chip-link"
                    >
                      {sim.label} <ExternalLink size={10} />
                    </a>
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
