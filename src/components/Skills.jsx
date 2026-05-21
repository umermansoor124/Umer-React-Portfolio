import { useEffect, useRef, useState } from 'react';
import './Skills.css';

const ICONS = [
  { icon: 'fab fa-html5',    label: 'HTML5' },
  { icon: 'fab fa-css3-alt', label: 'CSS3' },
  { icon: 'fab fa-js-square',label: 'JS' },
  { icon: 'fab fa-react',    label: 'React' },
  { icon: 'fab fa-node-js',  label: 'Node' },
  { icon: 'fab fa-python',   label: 'Python' },
  { icon: 'fas fa-database', label: 'MongoDB' },
  { icon: 'fab fa-git-alt',  label: 'Git' },
];

const BARS = [
  { label: 'HTML / CSS',      pct: 100 },
  { label: 'JAVASCRIPT',      pct: 90 },
  { label: 'REACT.JS',        pct: 93 },
  { label: 'PYTHON',          pct: 75 },
  { label: 'NODE / MONGODB',  pct: 89 },
];

export default function Skills() {
  const titleRef  = useRef(null);
  const barsRef   = useRef(null);
  const iconsRef  = useRef([]);
  const [barsActive, setBarsActive] = useState(false);
  const [iconVisible, setIconVisible] = useState([]);
  const [barCounts, setBarCounts] = useState(BARS.map(() => 0));

  useEffect(() => {
    // Title observer
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    if (titleRef.current) obs.observe(titleRef.current);

    // Bars observer
    const barsObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setBarsActive(true); e.target.classList.add('visible'); barsObs.disconnect(); }
    }, { threshold: 0.2 });
    if (barsRef.current) barsObs.observe(barsRef.current);

    // Icons observer
    const iconObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = parseInt(e.target.dataset.idx);
          setIconVisible(prev => { const n = [...prev]; n[idx] = true; return n; });
          iconObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    iconsRef.current.forEach(el => { if (el) iconObs.observe(el); });

    return () => { obs.disconnect(); barsObs.disconnect(); iconObs.disconnect(); };
  }, []);

  // Animate bar counts
  useEffect(() => {
    if (!barsActive) return;
    BARS.forEach((bar, i) => {
      let c = 0;
      const t = setInterval(() => {
        c += 2;
        if (c >= bar.pct) { c = bar.pct; clearInterval(t); }
        setBarCounts(prev => { const n = [...prev]; n[i] = c; return n; });
      }, 18);
    });
  }, [barsActive]);

  return (
    <section id="skills" className="skills">
      <h2 className="section-title slide-left" ref={titleRef}>TECH_STACK</h2>
      <div className="skills-layout">
        <div className="skills-icons-grid">
          {ICONS.map((item, i) => (
            <div
              key={item.label}
              className={`skill-icon-item${iconVisible[i] ? ' visible' : ''}`}
              ref={el => iconsRef.current[i] = el}
              data-idx={i}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className={`skill-bars slide-right${barsActive ? ' visible' : ''}`} ref={barsRef}>
          {BARS.map((bar, i) => (
            <div className="skill-bar-item" key={bar.label}>
              <div className="skill-bar-header">
                <span>{bar.label}</span>
                <span className="bar-pct">{barCounts[i]}%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: barsActive ? `${bar.pct}%` : '0%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
