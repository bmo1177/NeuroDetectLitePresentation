import { useEffect } from 'react';

export function useKeyboard({ go, current, total, toggleThumbnails, toggleShortcuts, toggleMediaGallery, overlaysOpen, lightboxOpen, mediaGalleryOpen, closeLightbox, closeMediaGallery, closeAllOverlays, editorToggle }) {
  useEffect(() => {
    const handler = (e) => {
      if (overlaysOpen()) {
        if (e.key === 'Escape') closeAllOverlays();
        return;
      }
      if (mediaGalleryOpen) {
        if (e.key === 'Escape') closeMediaGallery();
        else if (e.key === 'm' || e.key === 'M') toggleMediaGallery();
        return;
      }
      if (lightboxOpen) {
        if (e.key === 'Escape') closeLightbox();
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(current + 1); }
      else if (e.key === 'ArrowLeft') go(current - 1);
      else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(total - 1);
      else if (e.key === 'g' || e.key === 'G') toggleThumbnails();
      else if (e.key === '?') toggleShortcuts();
      else if (e.key === 'm' || e.key === 'M') toggleMediaGallery();
      else if (e.key === 'e' || e.key === 'E') editorToggle();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [go, current, total, toggleThumbnails, toggleShortcuts, toggleMediaGallery, overlaysOpen, lightboxOpen, mediaGalleryOpen, closeLightbox, closeMediaGallery, closeAllOverlays, editorToggle]);
}
