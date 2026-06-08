import { useEffect, useRef } from 'react';

export default function BrainScene() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let cleanup = null;
    const loadBrain = async () => {
      try {
        const { initBrain } = await import('../brain.js');
        if (canvasRef.current && containerRef.current) {
          cleanup = initBrain(canvasRef.current, containerRef.current);
        }
      } catch (e) {
        console.warn('Brain scene failed to load:', e);
      }
    };
    loadBrain();
    return () => { if (cleanup) cleanup(); };
  }, []);

  return (
    <div ref={containerRef} className="brain-wrap" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto' }}>
      <canvas ref={canvasRef} id="brainCanvas" style={{ width: '100%', height: '100%' }} />
      <div className="hud-panel hud-l" style={{ position: 'absolute', top: 32, left: 32 }}>
        <div className="hud-title">SYSTEM STATUS</div>
        <div className="hud-row"><span className="hud-label">Model</span><span className="hud-val">LightAlzNet v1.0</span></div>
        <div className="hud-row"><span className="hud-label">Backend</span><span className="hud-val">Tauri 2.5</span></div>
        <div className="hud-row"><span className="hud-label">Inference</span><span className="hud-val">~10 ms / slice</span></div>
        <div className="hud-row"><span className="hud-label">Parameters</span><span className="hud-val">0.63 M</span></div>
      </div>
      <div className="hud-panel hud-r" style={{ position: 'absolute', top: 32, right: 32 }}>
        <div className="hud-title">TELEMETRY</div>
        <div className="hud-row"><span className="hud-label">FPS</span><span className="hud-val hud-live">60</span></div>
        <div className="hud-row"><span className="hud-label">Slices</span><span className="hud-val">18</span></div>
        <div className="hud-row"><span className="hud-label">Particles</span><span className="hud-val">120</span></div>
        <div className="hud-row"><span className="hud-label">Resolution</span><span className="hud-val">256 x 256</span></div>
      </div>
    </div>
  );
}
