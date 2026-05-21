import { useEffect, useRef } from 'react';
import PROJECTS from './projectsData';
import './Projects.css';

export default function Projects() {
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    if (titleRef.current) obs.observe(titleRef.current);

    const cardObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.05, rootMargin: '0px -30px 0px 0px' });
    cardRefs.current.forEach(el => { if (el) cardObs.observe(el); });

    return () => { obs.disconnect(); cardObs.disconnect(); };
  }, []);

  return (
    <section id="projects" className="projects">
      <div className="projects-header">
        <h2 className="title-ital slide-left" ref={titleRef}>CODE_VAULT</h2>
        <span className="title-count">{PROJECTS.length} PROJECTS</span>
        <span className="scroll-hint">
          <i className="fas fa-arrow-right"></i> SCROLL TO EXPLORE
        </span>
      </div>

      <div className="h-scroll-track">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className="p-card"
            ref={el => cardRefs.current[i] = el}
            style={{ transitionDelay: `${i * 0.05}s` }}
          >
            <div className={`p-img ${p.bg}`}>
              <span className="p-code-text">{p.code}</span>
            </div>

            <div className="p-body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="tags">
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="p-links">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="p-link p-link-live">
                    LIVE DEMO →
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="p-link p-link-gh">
                    VIEW CODE →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}