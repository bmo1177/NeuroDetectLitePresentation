import { useEffect, useRef } from 'react';

export default function MermaidDiagram({ chart, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !chart) return;
    let cancelled = false;
    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#E0F4F5',
            primaryBorderColor: '#0D7377',
            primaryTextColor: '#0B1728',
            lineColor: '#94A3B8',
            secondaryColor: '#F0FDF4',
            secondaryBorderColor: '#16A34A',
            tertiaryColor: '#F8FAFC',
            tertiaryBorderColor: '#CBD5E1',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '22px',
            edgeLabelBackground: '#FFFFFF',
            clusterBkg: '#F1F5F9',
            clusterBorder: '#E2E8F0',
          },
          flowchart: { htmlLabels: true, curve: 'monotoneX', padding: 10, nodeSpacing: 28, rankSpacing: 38, useMaxWidth: false },
        });
        const id = 'm' + Math.random().toString(36).slice(2, 9);
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (e) {
        console.warn('Mermaid render failed:', e);
      }
    };
    render();
    return () => { cancelled = true; };
  }, [chart]);

  return <div ref={ref} className={`mermaid ${className}`} />;
}
