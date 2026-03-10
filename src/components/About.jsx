import { useEffect, useRef } from 'react';
import './About.css';

export default function About() {
  const titleRef    = useRef(null);
  const terminalRef = useRef(null);
  const textRef     = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    [titleRef, terminalRef, textRef].forEach(r => r.current && obs.observe(r.current));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="about">
      <h2 className="section-title slide-left" ref={titleRef}>ABOUT_ME</h2>
      <div className="about-container">
        <div className="terminal slide-left" ref={terminalRef} style={{ transitionDelay: '0.15s' }}>
          <div className="t-head">
            <div className="t-dot red"></div>
            <div className="t-dot yellow"></div>
            <div className="t-dot green"></div>
            <span className="t-filename">developer.config.js</span>
          </div>
          <div className="t-body">
            <p className="t-comment">// Initializing developer profile...</p>
            <p><span className="t-blue">const</span> developer = {'{'}</p>
            <p>&nbsp;&nbsp;name: <span className="t-val">'Umer Mansoor'</span>,</p>
            <p>&nbsp;&nbsp;education: <span className="t-val">'Aptech Diploma'</span>,</p>
            <p>&nbsp;&nbsp;location: <span className="t-val">'Karachi, Pakistan'</span>,</p>
            <p>&nbsp;&nbsp;specialty: <span className="t-val">'Full-Stack Dev'</span>,</p>
            <p>&nbsp;&nbsp;status: <span className="t-g">'OPEN_TO_WORK'</span></p>
            <p>{'}'};</p><br />
            <p className="t-comment">// Profile loaded ✓</p>
          </div>
        </div>

        <div className="about-text slide-right" ref={textRef} style={{ transitionDelay: '0.15s' }}>
          <p>I am a motivated and detail-oriented Web Developer skilled in creating <strong>responsive and dynamic web applications</strong>. I focus on building efficient, user-friendly, and visually appealing interfaces.</p>
          <p>With a strong foundation in both <strong>front-end and back-end technologies</strong>, I'm a quick learner who adapts to new tools and frameworks rapidly to solve complex problems.</p>
          <p>Currently based in <strong>Karachi</strong>, open to remote opportunities and freelance collaboration worldwide.</p>
        </div>
      </div>
    </section>
  );
}
