import { useState, useMemo, useEffect } from 'react';
import {
  ExternalLink,
  ShoppingBag,
  Sparkles,
  Star,
  Layers,
  ArrowRight,
} from 'lucide-react';
import SafeImage from './SafeImage';
import AmazonProductModal from './AmazonProductModal';
import { getShopTheLookRecommendations } from '../data/shopTheLookData';
import './ShopTheLook.css';

export default function ShopTheLook({ selection = {}, activeStyle = '', onStyleSelect }) {
  // Get all looks matching the demographic and style
  const availableLooks = useMemo(() => {
    return getShopTheLookRecommendations(selection, activeStyle);
  }, [selection, activeStyle]);

  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If selection or style changes, reset look index
  useEffect(() => {
    setActiveLookIndex(0);
    setSelectedItem(null);
  }, [selection.category, activeStyle]);

  const currentLook = availableLooks[activeLookIndex] || availableLooks[0];

  if (!currentLook) return null;

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="stl-section" aria-label="Amazon Shop The Complete Look">
      {/* Header with Amazon & Complete Look Badges */}
      <div className="stl-header">
        <div className="stl-header-badges">
          <span className="stl-amazon-badge">
            <ShoppingBag size={14} /> Amazon India Fashion
          </span>
          <span className="stl-feature-pill">
            <Sparkles size={13} /> Complete Look Ensemble
          </span>
        </div>
        <h2>Amazon Shop The Complete Look</h2>
        <p>
          Interactive head-to-toe styling for{' '}
          <strong>
            {selection.category || 'Women'} • {selection.ageGroup || 'Adult 18-35'}
          </strong>
          {activeStyle ? ` (Filtered for ${activeStyle.replace('-', ' ')})` : ''}. Click any piece
          directly on the fashion model or browse the item list below to view genuine Amazon India
          product details, check sizes, explore similar styles, and buy individual pieces separately.
        </p>

        {/* Look Switcher (if multiple looks available for this selection) */}
        {availableLooks.length > 1 && (
          <div className="stl-look-tabs" role="tablist" aria-label="Available Complete Looks">
            {availableLooks.map((look, idx) => (
              <button
                key={look.id}
                type="button"
                role="tab"
                aria-selected={activeLookIndex === idx}
                className={`stl-tab-btn ${activeLookIndex === idx ? 'active' : ''}`}
                onClick={() => {
                  setActiveLookIndex(idx);
                  setSelectedItem(null);
                }}
              >
                <span>{look.title.split('&')[0]}</span>
                <span className="stl-tab-tag">{look.occasion}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Showcase: Left Model Viewport + Right Items Breakdown */}
      <div className="stl-showcase-grid">
        {/* Left Column: Full-body Model Outfit with Clickable Hotspots */}
        <div className="stl-model-card">
          <div className="stl-model-viewport">
            <SafeImage
              src={currentLook.modelImage}
              alt={currentLook.title}
              name={currentLook.title}
              className="stl-model-img"
              fallbackSrc="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&q=80&auto=format&fit=crop"
            />

            <div className="stl-hint-badge">
              <Sparkles size={12} /> Click any pin to shop the item
            </div>

            {/* Interactive Pins on Model */}
            {currentLook.items.map((item, index) => {
              const isActive = selectedItem?.id === item.id;
              return (
                <button
                  key={`pin-${item.id}`}
                  type="button"
                  className={`stl-pin ${isActive ? 'active' : ''}`}
                  style={{
                    left: `${item.hotspot?.x || 50}%`,
                    top: `${item.hotspot?.y || 50}%`,
                  }}
                  onClick={() => handleSelectItem(item)}
                  aria-label={`View ${item.name} on Amazon India`}
                >
                  <span>{index + 1}</span>
                  <div className="stl-pin-tooltip">
                    <strong>{item.type || item.name}</strong>
                    <span>{item.price} • Click to view</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="stl-model-footer">
            <div className="stl-model-meta-row">
              <span className="stl-model-title">{currentLook.title}</span>
              <span className="stl-model-total">{currentLook.estimatedTotal}</span>
            </div>
            <p className="stl-model-desc">{currentLook.subtitle}</p>
          </div>
        </div>

        {/* Right Column: Individual Outfit Items List */}
        <div className="stl-items-pane">
          <div className="stl-items-header">
            <h3>
              <Layers size={18} /> Pieces in this Look
              <span className="stl-items-badge">{currentLook.items.length} items</span>
            </h3>
            <p className="stl-items-note">
              Click any item to inspect details or buy directly on Amazon India
            </p>
          </div>

          <div className="stl-items-list">
            {currentLook.items.map((item, index) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <article
                  key={item.id}
                  className={`stl-item-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectItem(item)}
                >
                  <div className="stl-item-thumb-wrap">
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      name={item.name}
                      className="stl-item-thumb"
                      fallbackSrc="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80&auto=format&fit=crop"
                    />
                    <span className="stl-item-pin-num">{index + 1}</span>
                  </div>

                  <div className="stl-item-info">
                    <div className="stl-item-tag-row">
                      <span className="stl-item-type">{item.type}</span>
                      <span className="stl-item-rating">
                        <Star size={12} fill="#f59e0b" color="#f59e0b" />
                        <strong>{item.rating}</strong> ({item.reviewsCount})
                      </span>
                    </div>

                    <h4 className="stl-item-title">{item.name}</h4>

                    <div className="stl-item-pricing">
                      <span className="stl-price-now">{item.price}</span>
                      {item.originalPrice && (
                        <span className="stl-price-orig">{item.originalPrice}</span>
                      )}
                      {item.discount && (
                        <span className="stl-price-disc">{item.discount}</span>
                      )}
                    </div>
                  </div>

                  <div className="stl-item-actions" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={item.amazonUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="stl-btn-amazon-primary"
                      title="Buy on Amazon India"
                    >
                      <ShoppingBag size={14} /> Buy on Amazon <ExternalLink size={12} />
                    </a>
                    <button
                      type="button"
                      className="stl-btn-details"
                      onClick={() => handleSelectItem(item)}
                    >
                      View Details & Similar
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Shop This Complete Look Summary Bar */}
      <div className="stl-complete-bar">
        <div className="stl-complete-info">
          <div className="stl-complete-icon">
            <ShoppingBag size={22} />
          </div>
          <div className="stl-complete-text">
            <h4>Shop This Complete Look ({currentLook.items.length} Pieces)</h4>
            <p>
              Explore and buy each piece separately on Amazon India. You are never forced to buy the
              entire outfit together.
            </p>
          </div>
        </div>

        <div className="stl-complete-actions">
          <button
            type="button"
            className="stl-btn-amazon-primary"
            onClick={() => handleSelectItem(currentLook.items[0])}
          >
            Start Exploring Pieces <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Reusable Product Modal Inspector */}
      <AmazonProductModal
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={handleCloseModal}
      />
    </section>
  );
}
