export default function BrainScene() {
  return (
    <div className="brain-wrap" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg viewBox="0 0 800 600" style={{ width: '100%', height: '100%', opacity: 0.18 }}>
        <defs>
          <radialGradient id="brainGlow" cx="50%" cy="45%" r="45%">
            <stop offset="0%" stopColor="#0D7377" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0D7377" stopOpacity="0" />
          </radialGradient>
          <filter id="brainBlur"><feGaussianBlur stdDeviation="2" /></filter>
        </defs>
        <circle cx="400" cy="270" r="200" fill="url(#brainGlow)" />
        <g filter="url(#brainBlur)" stroke="#0D7377" strokeWidth="1.2" fill="none" opacity="0.7">
          <ellipse cx="400" cy="270" rx="160" ry="140">
            <animateTransform attributeName="transform" type="rotate" values="0 400 270;3 400 270;0 400 270;-3 400 270;0 400 270" dur="8s" repeatCount="indefinite" />
          </ellipse>
          <path d="M400 130 Q320 200 340 270 Q360 340 400 410 Q440 340 460 270 Q480 200 400 130Z">
            <animateTransform attributeName="transform" type="rotate" values="0 400 270;-2 400 270;0 400 270;2 400 270;0 400 270" dur="6s" repeatCount="indefinite" />
          </path>
          <path d="M280 200 Q340 180 400 200 Q460 180 520 200" strokeDasharray="4 6" />
          <path d="M290 260 Q345 240 400 260 Q455 240 510 260" strokeDasharray="3 5" />
          <path d="M300 320 Q350 300 400 320 Q450 300 500 320" strokeDasharray="4 6" />
          <circle cx="350" cy="240" r="3" fill="#0D7377" opacity="0.5">
            <animate attributeName="r" values="2;5;2" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="450" cy="250" r="3" fill="#0D7377" opacity="0.5">
            <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="300" r="2" fill="#16A34A" opacity="0.4">
            <animate attributeName="r" values="2;4;2" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
        {[...Array(6)].map((_, i) => (
          <circle key={i} cx={320 + i * 32} cy={420} r="1" fill="#0D7377" opacity="0.3">
            <animate attributeName="cy" values={`${420 + (i % 2) * 8};${410 - (i % 2) * 8};${420 + (i % 2) * 8}`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}
