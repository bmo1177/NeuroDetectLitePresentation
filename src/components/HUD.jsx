export default function HUD() {
  return (
    <>
      <div className="hud-telemetry left" style={{ animation: 'fadeUp .5s var(--ease-out-expo) .3s both' }}>
        <div className="hud-title">System Status</div>
        <div className="hud-row"><span className="lbl">MRI Resolution</span><span className="val">256x256x160</span></div>
        <div className="hud-row"><span className="lbl">Modality</span><span className="val">T1-Weighted</span></div>
        <div className="hud-row"><span className="lbl">Noise Reduction</span><span className="val">N4 Bias Corr.</span></div>
        <div className="hud-row"><span className="lbl">Normalization</span><span className="val">MNI152 Space</span></div>
        <div className="hud-row"><span className="lbl">Segment Engine</span><span className="val">FSL BET v6.0</span></div>
      </div>
      <div className="hud-telemetry right" style={{ animation: 'fadeUp .5s var(--ease-out-expo) .4s both' }}>
        <div className="hud-title">Model Inference</div>
        <div className="hud-row"><span className="lbl">Active Model</span><span className="val">NeuroDetect-M5</span></div>
        <div className="hud-row"><span className="lbl">Grad-CAM Map</span><span className="val">Hippocampus L/R</span></div>
        <div className="hud-row"><span className="lbl">Parameters</span><span className="val">540k (INT8)</span></div>
        <div className="hud-row"><span className="lbl">Memory footprint</span><span className="val">1.93 MB</span></div>
        <div className="hud-row"><span className="lbl">Inference Latency</span><span className="val">9.84 ms</span></div>
      </div>
    </>
  );
}
