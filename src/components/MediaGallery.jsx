import { useEffect, useRef } from 'react';

export default function MediaGallery({ show, close, go, slides }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!show || !gridRef.current || !slides) return;
    const grid = gridRef.current;
    grid.innerHTML = '';

    const mediaItems = [];
    slides.forEach((slide, idx) => {
      slide.querySelectorAll('img, video').forEach((m) => {
        mediaItems.push({ el: m, slideIndex: idx });
      });
    });

    if (mediaItems.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px 16px;color:var(--text3)">
        <svg style="width:40px;height:40px;margin-bottom:12px;opacity:0.4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg><br/>No media found in slides.</div>`;
      return;
    }

    mediaItems.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'media-gallery-item';
      const thumbDiv = document.createElement('div');
      thumbDiv.className = 'mg-thumb';
      const labelDiv = document.createElement('div');
      labelDiv.className = 'mg-label';
      labelDiv.textContent = `Slide ${item.slideIndex + 1}`;

      if (item.el.tagName === 'IMG') {
        const img = document.createElement('img');
        img.src = item.el.src;
        img.alt = item.el.alt || '';
        thumbDiv.appendChild(img);
      } else {
        const vid = document.createElement('video');
        const src = item.el.querySelector('source') ? item.el.querySelector('source').src : item.el.src;
        vid.src = src;
        vid.muted = true;
        vid.loop = true;
        vid.autoplay = true;
        vid.playsInline = true;
        vid.style.width = '100%';
        vid.style.height = '100%';
        vid.style.objectFit = 'cover';
        thumbDiv.appendChild(vid);
        vid.play().catch(() => {});
      }

      card.appendChild(thumbDiv);
      card.appendChild(labelDiv);
      card.addEventListener('click', () => {
        go(item.slideIndex);
        close();
      });
      grid.appendChild(card);
    });
  }, [show, slides, go, close]);

  return (
    <div
      className={`media-gallery-overlay${show ? ' show' : ''}`}
      onClick={(e) => { if (e.target.classList.contains('media-gallery-overlay')) close(); }}
    >
      <div className="media-gallery-header">
        <h3>Media Gallery</h3>
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>
          Click an item to jump to its slide &amp; view fullscreen
        </span>
        <button className="media-gallery-close" aria-label="Close" onClick={close}>
          <svg className="ico" style={{ width: 17, height: 17, color: '#fff' }} viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div className="media-gallery-grid" ref={gridRef} />
    </div>
  );
}
