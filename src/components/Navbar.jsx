import { useState } from 'react';
import './Navbar.css';

export default function Navbar({ isDark, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <button className="theme-switcher neo-shadow-sm" onClick={toggleTheme} title="Toggle Theme">
        <i className={`fas ${isDark ? 'fa-moon' : 'fa-sun'}`}></i>
      </button>

      <nav className="navbar">
        <div className="logo">UMER<span className="logo-dot">.</span>DEV</div>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {[['#about','/ABOUT'],['#skills','/SKILLS'],['#projects','/PROJECTS'],['#contact','/CONTACT']].map(([href, label]) => (
            <a key={href} href={href} onClick={(e) => { e.preventDefault(); scrollTo(href); }}>{label}</a>
          ))}
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>
      </nav>
    </>
  );
}
