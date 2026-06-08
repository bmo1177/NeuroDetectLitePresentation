import { useMemo } from 'react';

export default function Thumbnails({ show, close, go, slides }) {
  const thumbs = useMemo(() => {
    if (!slides) return [];
    return slides.map((s, i) => {
      const title = s.getAttribute('data-title') || `Slide ${i + 1}`;
      return (
        <div
          key={i}
          className={`thumb${i === s.dataset?.activeIndex ? ' current' : ''}`}
          onClick={() => { go(i); close(); }}
        >
          <div className="thumb-num">{i + 1}</div>
          <div className="thumb-title">{title}</div>
        </div>
      );
    });
  }, [slides, go, close]);

  return (
    <div
      className={`thumb-overlay${show ? ' show' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <button className="thumb-close" aria-label="Close" onClick={close}>
        <svg className="ico" style={{ width: 17, height: 17, color: '#fff' }} viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <div className="thumb-grid">{thumbs}</div>
    </div>
  );
}
