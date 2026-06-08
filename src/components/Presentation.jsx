import React, { useState, useCallback, useRef, useEffect } from 'react';
import { slides } from '../data/slides';
import Navigation from './Navigation';
import Thumbnails from './Thumbnails';
import Shortcuts from './Shortcuts';
import Lightbox from './Lightbox';
import MediaGallery from './MediaGallery';
import EditMode from './EditMode';
import { useKeyboard } from '../hooks/useKeyboard';
import { useSwipe } from '../hooks/useSwipe';
import { useTilt } from '../hooks/useTilt';

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mediaEl, setMediaEl] = useState(null);
  const [lightboxSpeed, setLightboxSpeed] = useState(1);
  const [animLock, setAnimLock] = useState(false);

  const stageRef = useRef(null);
  const slideRefs = useRef([]);

  const total = slides.length;

  const go = useCallback(
    (n) => {
      if (animLock) return;
      const clamped = Math.max(0, Math.min(total - 1, n));
      if (clamped === current) return;
      setAnimLock(true);
      setCurrent(clamped);
      setTimeout(() => setAnimLock(false), 500);
    },
    [current, total, animLock]
  );

  /* Stage scaling: fit 1920×1080 into viewport */
  useEffect(() => {
    const scale = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const factor = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      const x = (window.innerWidth - 1920 * factor) / 2;
      const y = (window.innerHeight - 1080 * factor) / 2;
      stage.style.transform = `translate(${x}px, ${y}px) scale(${factor})`;
    };
    scale();
    window.addEventListener('resize', scale);
    return () => window.removeEventListener('resize', scale);
  }, []);

  /* Overlay helpers */
  const overlaysOpen = useCallback(
    () => showThumbnails || showShortcuts || showMediaGallery,
    [showThumbnails, showShortcuts, showMediaGallery]
  );

  const closeAllOverlays = useCallback(() => {
    setShowThumbnails(false);
    setShowShortcuts(false);
    setShowMediaGallery(false);
  }, []);

  const toggleThumbnails = useCallback(() => {
    setShowThumbnails((v) => !v);
    setShowShortcuts(false);
    setShowMediaGallery(false);
  }, []);

  const toggleShortcuts = useCallback(() => {
    setShowShortcuts((v) => !v);
    setShowThumbnails(false);
    setShowMediaGallery(false);
  }, []);

  const toggleMediaGallery = useCallback(() => {
    setShowMediaGallery((v) => !v);
    setShowThumbnails(false);
    setShowShortcuts(false);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setMediaEl(null);
  }, []);

  const closeMediaGallery = useCallback(() => setShowMediaGallery(false), []);

  /* Lightbox: intercept clicks on images/videos inside slides */
  useEffect(() => {
    const handler = (e) => {
      const target = e.target;
      if (
        target.tagName === 'IMG' &&
        target.closest('.slide-inner') &&
        !target.closest('.carousel')
      ) {
        e.preventDefault();
        setMediaEl(target);
        setLightboxOpen(true);
      }
      if (
        target.tagName === 'VIDEO' &&
        target.closest('.slide-inner') &&
        !target.closest('.media-lightbox')
      ) {
        e.preventDefault();
        setMediaEl(target);
        setLightboxOpen(true);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  /* Edit mode toggle ref */
  const editModeRef = useRef(null);
  const editorToggle = useCallback(() => {
    if (editModeRef.current) editModeRef.current();
  }, []);

  /* Hooks */
  useKeyboard({
    go,
    current,
    total,
    toggleThumbnails,
    toggleShortcuts,
    toggleMediaGallery,
    overlaysOpen,
    lightboxOpen,
    mediaGalleryOpen: showMediaGallery,
    closeLightbox,
    closeMediaGallery,
    closeAllOverlays,
    editorToggle,
  });

  useSwipe({ go, current, overlaysOpen });

  const { bannerVisible, requestPermission } = useTilt({
    go,
    current,
    overlaysOpen,
    lightboxOpen,
    mediaGalleryOpen: showMediaGallery,
  });

  /* ARIA announcer */
  useEffect(() => {
    const el = document.getElementById('slideAnnouncer');
    if (el) el.textContent = `Slide ${current + 1} of ${total}: ${slides[current].title}`;
  }, [current, total]);

  return (
    <>
      {/* ARIA live region */}
      <div
        role="status"
        aria-live="polite"
        id="slideAnnouncer"
        className="sr-only"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}
      />

      {/* Presentation chrome (outside stage) */}
      <Navigation
        current={current}
        total={total}
        go={go}
        bannerVisible={bannerVisible}
        requestPermission={requestPermission}
      />

      {/* DECK (FIXED 1920×1080 STAGE) */}
      <div className="deck-viewport">
        <main className="deck-stage" ref={stageRef}>
          {slides.map((slide, i) => {
            const isActive = i === current;
            const isNearby = Math.abs(i - current) <= 1;
            if (!isNearby) return null;
            return (
              <section
                key={slide.id}
                ref={(el) => { slideRefs.current[i] = el; }}
                className={`slide ${slide.className}`}
                data-title={slide.title}
                aria-label={slide.ariaLabel}
                style={{
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? 'auto' : 'none',
                  visibility: isActive ? 'visible' : 'hidden',
                  zIndex: isActive ? 1 : 0,
                }}
              >
                {slide.content()}
              </section>
            );
          })}
        </main>
      </div>

      {/* Grain overlay */}
      <div className="grain" />

      {/* Overlays */}
      <Thumbnails
        show={showThumbnails}
        close={() => setShowThumbnails(false)}
        go={go}
        slides={slideRefs.current}
      />
      <Shortcuts show={showShortcuts} close={() => setShowShortcuts(false)} />
      <Lightbox
        show={lightboxOpen}
        close={closeLightbox}
        mediaEl={mediaEl}
        speed={lightboxSpeed}
        setSpeed={setLightboxSpeed}
      />
      <MediaGallery
        show={showMediaGallery}
        close={closeMediaGallery}
        go={go}
        slides={slideRefs.current}
      />
      <EditMode slides={slideRefs.current} />
    </>
  );
}
