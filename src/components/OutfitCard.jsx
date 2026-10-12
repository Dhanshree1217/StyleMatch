import { useState } from 'react';
import { Heart, Bookmark, BookmarkCheck } from 'lucide-react';

export default function OutfitCard({ outfit, onSave, isSaved }) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const fallback = `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop`;

  return (
    <div className="outfit-card">
      <div className="outfit-card-img-wrap">
        <img
          src={imgError ? fallback : outfit.image}
          alt={outfit.name}
          onError={() => setImgError(true)}
          loading="lazy"
        />
        <span className="outfit-badge">{outfit.occasion}</span>
        <button
          className={`outfit-like ${liked ? 'liked' : ''}`}
          onClick={() => setLiked(!liked)}
          aria-label="Like outfit"
        >
          <Heart size={16} fill={liked ? '#e11d48' : 'none'} />
        </button>
      </div>

      <div className="outfit-card-body">
        <h4>{outfit.name}</h4>
        <p className="outfit-desc">{outfit.description}</p>

        <div className="outfit-colors">
          {outfit.colors.map((c, i) => (
            <span key={i} className="color-dot" style={{ background: c }} title={c} />
          ))}
          <span className="color-label">{outfit.colorNames}</span>
        </div>

        <div className="outfit-tags">
          <span className="tag">{outfit.style}</span>
          <span className="tag">{outfit.clothing}</span>
        </div>

        <button
          className={`btn-save ${isSaved ? 'saved' : ''}`}
          onClick={() => onSave && onSave(outfit)}
        >
          {isSaved ? <><BookmarkCheck size={15} /> Saved</> : <><Bookmark size={15} /> Save Outfit</>}
        </button>
      </div>
    </div>
  );
}
