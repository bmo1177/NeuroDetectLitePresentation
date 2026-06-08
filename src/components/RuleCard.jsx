import { useState } from 'react';

const colorMap = {
  red: { bg: 'var(--red-bg)', color: 'var(--red)', border: 'var(--red-bdr)' },
  amber: { bg: 'var(--amber-bg)', color: 'var(--amber)', border: 'var(--amber-bdr)' },
  green: { bg: 'var(--green-bg)', color: 'var(--green)', border: 'var(--green-bdr)' },
  gray: { bg: '#64748b', color: '#fff', border: 'rgba(100,116,139,.3)' },
};

export default function RuleCard({ id, alert, condition, frontText, backText, color }) {
  const [flipped, setFlipped] = useState(false);
  const c = colorMap[color] || colorMap.gray;

  return (
    <div
      className={`rule${flipped ? ' flipped' : ''}`}
      style={{ borderColor: c.border }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="rule-f">
        <div className="rule-h">
          <div className="rule-n" style={{ background: c.bg, color: c.color }}>{id}</div>
          <span className="rule-l" style={{ color: color === 'gray' ? '#94a3b8' : c.color }}>{alert}</span>
        </div>
        <code>{condition}</code>
        <span className="rule-hint">click to flip &rarr;</span>
      </div>
      <div className="rule-b">
        <div className="rule-d">{frontText}</div>
        <span className="rule-hint">&larr; back</span>
      </div>
    </div>
  );
}
