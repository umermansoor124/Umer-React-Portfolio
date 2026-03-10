import { useEffect, useState, useRef } from 'react';
import './Hero.css';

const ROLES = ['FULL_STACK_DEV', 'REACT_ENGINEER', 'UI_CRAFTSMAN', 'PYTHON_CODER'];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const roleIdx = useRef(0), charIdx = useRef(0), deleting = useRef(false);

  // Typing animation
  useEffect(() => {
    let timer;
    const tick = () => {
      const cur = ROLES[roleIdx.current];
      if (deleting.current) {
        setDisplayText(cur.slice(0, --charIdx.current));
      } else {
        setDisplayText(cur.slice(0, ++charIdx.current));
      }
      let delay = deleting.current ? 55 : 95;
      if (!deleting.current && charIdx.current === cur.length) { delay = 1800; deleting.current = true; }
      else if (deleting.current && charIdx.current === 0) {
        deleting.current = false;
        roleIdx.current = (roleIdx.current + 1) % ROLES.length;
        delay = 300;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []);

  // Parallax
  useEffect(() => {
    const shapes = [
      { el: document.getElementById('ps1'), sx: 0.03, sy: 0.05 },
      { el: document.getElementById('ps2'), sx: -0.04, sy: 0.03 },
      { el: document.getElementById('ps3'), sx: 0.05, sy: -0.04 },
      { el: document.getElementById('ps4'), sx: -0.02, sy: 0.06 },
    ];
    const onScroll = () => {
      const sy = window.scrollY;
      shapes.forEach(p => { if (p.el) p.el.style.transform = `translate(${sy * p.sx}px, ${sy * p.sy}px)`; });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="hero">
      <div className="parallax-bg">
        <div className="p-shape p-shape1" id="ps1"></div>
        <div className="p-shape p-shape2" id="ps2"></div>
        <div className="p-shape p-shape3" id="ps3"></div>
        <div className="p-shape p-shape4" id="ps4"></div>
      </div>

      <div className="status-tag neo-shadow-sm">
        <span className="pulse-dot"></span> SYSTEM_READY :: 2026_STABLE
      </div>

      <h1 className="main-title">
        UMER MANSOOR<br />
        <span className="outline">{displayText}</span>
        <span className="typing-cursor"></span>
      </h1>

      <div className="bio-box">
        <p>I engineer high-performance web applications and dynamic user interfaces.<br />
        <strong>JavaScript &bull; React.js &bull; Python &bull; Node.js &bull; MongoDB</strong></p>
      </div>

      <div className="hero-actions">
        <a href="https://github.com/umermansoor124?tab=repositories" target="_blank" rel="noreferrer" className="btn btn-black neo-shadow">
          <i className="fab fa-github"></i> VIEW GITHUB
        </a>
        <a href="/Umer_Mansoor_CV.pdf" download className="btn btn-white neo-shadow">
          <i className="fas fa-download"></i> DOWNLOAD CV
        </a>
      </div>
    </header>
  );
}
