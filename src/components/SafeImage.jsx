import { useState, useEffect, useMemo } from 'react';

/**
 * Global registry for tracking broken image URLs during the user's session.
 * Open your browser console (F12) and type `listFailedImages()` or `window.listFailedImages()`
 * to see a table of any images that failed to load.
 */
if (typeof window !== 'undefined') {
  if (!window.__STYLEMATCH_FAILED_IMAGES__) {
    window.__STYLEMATCH_FAILED_IMAGES__ = [];
  }

  window.listFailedImages = () => {
    const list = window.__STYLEMATCH_FAILED_IMAGES__ || [];
    if (list.length === 0) {
      console.log('%c[StyleMatch] All images loaded successfully! No broken URLs detected.', 'color: #10b981; font-weight: bold;');
    } else {
      console.group('%c[StyleMatch] Broken Image URLs Report (' + list.length + ' found)', 'color: #ef4444; font-weight: bold;');
      console.table(list);
      console.groupEnd();
    }
    return list;
  };

  window.__STYLEMATCH_LIST_FAILED_IMAGES__ = window.listFailedImages;
}

const logFailedUrl = (url, name) => {
  if (typeof window === 'undefined' || !url) return;

  const list = window.__STYLEMATCH_FAILED_IMAGES__ || [];
  const normalized = String(url).trim();

  // Prevent duplicate logs for the same URL
  if (!list.some((item) => item.url === normalized)) {
    const entry = {
      name: name || 'Fashion item',
      url: normalized,
      time: new Date().toLocaleTimeString(),
    };
    list.push(entry);
    window.__STYLEMATCH_FAILED_IMAGES__ = list;
    console.warn(`[StyleMatch] Image failed to load: ${normalized} (Item: "${entry.name}")`);
  }
};

/**
 * Reusable SafeImage Component
 * - Tries primary `src`
 * - On error, tries `fallbackSrc` (defaults to local `/images/fallback.jpg`)
 * - On error, tries any additional URLs in `backupSrcs`
 * - If all fail, renders a sleek gradient placeholder showing the item name
 * - Always includes referrerPolicy="no-referrer", loading="lazy", and object-fit: cover
 */
export default function SafeImage({
  src,
  alt = '',
  name = '',
  className = '',
  fallbackSrc = '/images/fallback.jpg',
  backupSrcs = [],
  style = {},
  placeholderStyle = {},
  ...restProps
}) {
  // Build a deduplicated candidate list of URLs to try in sequence
  const candidates = useMemo(() => {
    const list = [src, fallbackSrc, ...(Array.isArray(backupSrcs) ? backupSrcs : [])]
      .filter((u) => typeof u === 'string' && u.trim().length > 0);
    return [...new Set(list)];
  }, [src, fallbackSrc, backupSrcs]);

  const [candidateIndex, setCandidateIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(candidates.length === 0);

  // When src or candidates change, reset to try the first candidate
  useEffect(() => {
    setCandidateIndex(0);
    setAllFailed(candidates.length === 0);
  }, [candidates]);

  const currentSrc = candidates[candidateIndex];
  const itemName = (name || alt || 'Fashion Item').trim();

  const handleError = () => {
    if (currentSrc) {
      logFailedUrl(currentSrc, itemName);
    }

    if (candidateIndex + 1 < candidates.length) {
      // Advance to the next backup URL
      setCandidateIndex((prev) => prev + 1);
    } else {
      // All candidate URLs failed — show clean gradient placeholder
      setAllFailed(true);
    }
  };

  // If all candidate URLs failed or none was provided, render a gradient placeholder
  if (allFailed || !currentSrc) {
    return (
      <div
        className={`safe-image-placeholder ${className}`.trim()}
        role="img"
        aria-label={itemName}
        title={itemName}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '16px',
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 50%, #e0f2fe 100%)',
          color: '#7c3aed',
          width: '100%',
          height: '100%',
          minHeight: '120px',
          borderRadius: 'inherit',
          ...placeholderStyle,
          ...style,
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.8, marginBottom: '6px' }}
        >
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
        </svg>
        <span
          style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            lineHeight: 1.25,
            maxWidth: '90%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            color: '#4c1d95',
          }}
        >
          {itemName}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={itemName}
      className={className}
      style={{
        objectFit: 'cover',
        ...style,
      }}
      loading="lazy"
      referrerPolicy="no-referrer"
      decoding="async"
      onError={handleError}
      {...restProps}
    />
  );
}
