import { useState, useCallback } from 'react';

const defaultPages = Array.from({ length: 8 }, (_, i) => `assets/paper-page-${i + 1}.png`);

export default function PaperCarousel({ pages = defaultPages }) {
  const [current, setCurrent] = useState(0);
  const total = pages.length;

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? total - 1 : c - 1)), [total]);
  const next = useCallback(() => setCurrent((c) => (c === total - 1 ? 0 : c + 1)), [total]);

  return (
    <div className="carousel" style={{ flex: 1, minHeight: 0, gap: 8 }}>
      <div className="carousel-track">
        <button className="carousel-btn prev" aria-label="Previous" onClick={prev}>
          <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        {pages.map((src, i) => (
          <div key={i} className={`carousel-slide${i === current ? ' active' : ''}`}>
            <img src={src} alt={`Paper page ${i + 1}`} loading="lazy" />
          </div>
        ))}

        <button className="carousel-btn next" aria-label="Next" onClick={next}>
          <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <div className="carousel-dots">
        {pages.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      <div className="carousel-page-label">
        {current + 1} / {total}
      </div>
    </div>
  );
}
