import { useEffect, useRef } from 'react';

export default function Lightbox({ show, close, mediaEl, speed, setSpeed }) {
  const contentRef = useRef(null);
  const cloneRef = useRef(null);

  useEffect(() => {
    if (!show || !mediaEl || !contentRef.current) return;
    const content = contentRef.current;
    content.innerHTML = '';
    const clone = mediaEl.cloneNode(true);
    cloneRef.current = clone;
    content.appendChild(clone);
    if (clone.tagName === 'VIDEO') {
      clone.controls = true;
      clone.style.maxHeight = '80vh';
      clone.style.maxWidth = '100%';
      clone.playbackRate = speed || 3;
      clone.play().catch(() => {});
    }
  }, [show, mediaEl, speed]);

  useEffect(() => {
    if (!cloneRef.current || cloneRef.current.tagName !== 'VIDEO') return;
    cloneRef.current.playbackRate = speed || 1;
  }, [speed]);

  const toggleFullscreen = () => {
    const el = contentRef.current?.querySelector('video, img');
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      const lb = contentRef.current?.closest('.media-lightbox');
      if (lb?.requestFullscreen) lb.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div className={`media-lightbox${show ? ' show' : ''}`} onClick={(e) => {
      if (e.target.classList.contains('media-lightbox')) close();
    }}>
      <button className="lightbox-close" aria-label="Close" onClick={close}>
        <svg className="ico" style={{ width: 17, height: 17, color: '#fff' }} viewBox="0 0 24 24">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <div className="lightbox-content-wrapper" ref={contentRef} />
      {show && (
        <div className="lightbox-controls">
          <span>Speed:</span>
          <button className={`speed-btn${speed === 1 ? ' active' : ''}`} onClick={() => setSpeed(1)}>1&times;</button>
          <button className={`speed-btn${speed === 2 ? ' active' : ''}`} onClick={() => setSpeed(2)}>2&times;</button>
          <button className={`speed-btn${speed === 3 ? ' active' : ''}`} onClick={() => setSpeed(3)}>3&times;</button>
          <span style={{ marginLeft: 12, opacity: 0.5 }}>|</span>
          <button className="speed-btn" id="lightboxFullscreen" onClick={toggleFullscreen}>
            <svg style={{ width: 14, height: 14, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }} viewBox="0 0 24 24">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
