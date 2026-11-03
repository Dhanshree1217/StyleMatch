import { useState } from 'react';
import { Heart, Bookmark, BookmarkCheck } from 'lucide-react';
import SafeImage from './SafeImage';

export default function OutfitCard({ outfit, onSave, isSaved }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="outfit-card">
      <div className="outfit-card-img-wrap">
        <SafeImage
          src={outfit.image}
          alt={outfit.name || 'Outfit'}
          name={outfit.name || 'Outfit'}
          fallbackSrc="/images/fallback.jpg"
          className="outfit-card-img"
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
          {outfit.colors && outfit.colors.map((c, i) => (
            <span key={i} className="color-dot" style={{ background: c }} title={c} />
          ))}
          {outfit.colorNames && <span className="color-label">{outfit.colorNames}</span>}
        </div>

        <div className="outfit-tags">
          {outfit.style && <span className="tag">{outfit.style}</span>}
          {outfit.clothing && <span className="tag">{outfit.clothing}</span>}
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
