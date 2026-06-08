import { useEffect } from 'react';

export default function Navigation({ current, total, go, bannerVisible, requestPermission }) {
  const progressWidth = total > 1 ? (current / (total - 1)) * 100 : 0;

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') go(current + 1);
      else if (e.key === 'ArrowLeft' || e.key === 'Backspace') go(current - 1);
      else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(total - 1);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [current, total, go]);

  const dots = [];
  for (let i = 0; i < total; i++) {
    dots.push(
      <div
        key={i}
        className={`dpip${i === current ? ' active' : ''}`}
        onClick={() => go(i)}
      />
    );
  }

  return (
    <>
      <div className="progress" style={{ width: `${progressWidth}%` }} />

      <div className="slide-dots">{dots}</div>

      <div className="slide-num">
        {current + 1} / {total}
      </div>

      <button
        className="arrow prev"
        aria-label="Previous"
        disabled={current === 0}
        onClick={() => go(current - 1)}
      >
        <svg className="ico" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button
        className="arrow next"
        aria-label="Next"
        disabled={current === total - 1}
        onClick={() => go(current + 1)}
      >
        <svg className="ico" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <div className="kbd-hint">
        <span className="kbd">&larr;</span><span className="kbd">&rarr;</span><span className="kbd">Space</span>
        <span style={{ color: 'var(--text3)', margin: '0 3px' }}>&middot;</span>
        <span className="kbd">G</span> overview
        <span style={{ color: 'var(--text3)', margin: '0 3px' }}>&middot;</span>
        <span className="kbd">E</span> edit
        <span style={{ color: 'var(--text3)', margin: '0 3px' }}>&middot;</span>
        <span className="kbd">?</span> shortcuts
        <span style={{ color: 'var(--text3)', margin: '0 3px' }}>&middot;</span>
        <span className="kbd">M</span> media
      </div>

      {bannerVisible && (
        <div className="tilt-banner" onClick={requestPermission}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20, flexShrink: 0 }}>
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
            <path d="M12 18h.01"/>
            <path d="M8 6l4-4 4 4"/>
            <path d="M8 18l4 4 4-4"/>
          </svg>
          <span>Tilt your phone to navigate</span>
          <span style={{ opacity: 0.5, fontSize: 12 }}>(tap to enable)</span>
        </div>
      )}
    </>
  );
}
