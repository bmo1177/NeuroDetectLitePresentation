import { useEffect } from 'react';

export function useSwipe({ go, current, overlaysOpen }) {
  useEffect(() => {
    let tx = 0;
    const onStart = (e) => { tx = e.touches[0].clientX; };
    const onEnd = (e) => {
      if (overlaysOpen()) return;
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) dx < 0 ? go(current + 1) : go(current - 1);
    };
    document.addEventListener('touchstart', onStart);
    document.addEventListener('touchend', onEnd);
    return () => {
      document.removeEventListener('touchstart', onStart);
      document.removeEventListener('touchend', onEnd);
    };
  }, [go, current, overlaysOpen]);
}
