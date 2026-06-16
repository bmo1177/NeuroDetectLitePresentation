import { useEffect, useState } from 'react';

export function useTilt({ go, current, overlaysOpen, lightboxOpen, mediaGalleryOpen }) {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice) setBannerVisible(true);
  }, []);

  useEffect(() => {
    if (!bannerVisible) return;
    const timer = setTimeout(() => { setBannerDismissed(true); setBannerVisible(false); }, 8000);
    return () => clearTimeout(timer);
  }, [bannerVisible]);

  useEffect(() => {
    let lastTiltTime = 0;
    const COOLDOWN_MS = 800;
    const TILT_THRESHOLD = 30;

    const handleOrientation = (e) => {
      if (overlaysOpen() || lightboxOpen || mediaGalleryOpen) return;
      const gamma = e.gamma;
      if (gamma === null) return;
      const now = Date.now();
      if (now - lastTiltTime < COOLDOWN_MS) return;
      if (Math.abs(gamma) > TILT_THRESHOLD) {
        lastTiltTime = now;
        go(gamma > 0 ? current + 1 : current - 1);
      }
    };

    const requestPermissionAndStart = () => {
      if (typeof DeviceOrientationEvent !== 'undefined' &&
          typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(state => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          }).catch(() => {});
      } else if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    const onTouchStart = () => {
      requestPermissionAndStart();
    };

    document.addEventListener('touchstart', onTouchStart, { once: true });

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      document.removeEventListener('touchstart', onTouchStart);
    };
  }, [go, current, overlaysOpen, lightboxOpen, mediaGalleryOpen]);

  const dismissBanner = () => { setBannerDismissed(true); setBannerVisible(false); };
  const requestPermission = () => {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().catch(() => {});
    }
    dismissBanner();
  };

  return { bannerVisible: bannerVisible && !bannerDismissed, dismissBanner, requestPermission };
}
