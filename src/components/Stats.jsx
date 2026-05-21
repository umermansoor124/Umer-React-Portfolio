import { useEffect, useRef, useState } from 'react';
import './Stats.css';

const STATS = [
  { target: 7, suffix: '',   label: 'MEAN PROJECTS BUILT' },
  { target: 5,  suffix: '+',  label: 'LANGUAGES' },
  { target: 1.6,  suffix: 'YR', label: 'EXPERIENCE' },
  { target: 100,suffix: '%',  label: 'DEDICATION' },
];

function StatItem({ target, suffix, label, delay }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cur = 0;
    const step = Math.ceil(target / 60);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      setCount(cur);
    }, 18);
    return () => clearInterval(t);
  }, [visible, target]);

  return (
    <div className={`stat-item fade-up${visible ? ' visible' : ''}`} ref={ref} style={{ transitionDelay: delay }}>
      <div className="stat-num"><span>{count}</span><span className="stat-suffix">{suffix}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="stats-grid neo-shadow">
        {STATS.map((s, i) => (
          <StatItem key={s.label} {...s} delay={`${i * 0.1}s`} />
        ))}
      </div>
    </section>
  );
}
