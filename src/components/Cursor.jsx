import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);
  const mx = useRef(0), my = useRef(0);
  const rx = useRef(0), ry = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      mx.current = e.clientX; my.current = e.clientY;
      cursorRef.current.style.left = e.clientX + 'px';
      cursorRef.current.style.top  = e.clientY + 'px';
    };
    document.addEventListener('mousemove', onMove);

    let raf;
    const animate = () => {
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      ringRef.current.style.left = rx.current + 'px';
      ringRef.current.style.top  = ry.current + 'px';
      raf = requestAnimationFrame(animate);
    };
    animate();

    const grow = () => {
      cursorRef.current.style.width  = '20px';
      cursorRef.current.style.height = '20px';
      ringRef.current.style.width    = '55px';
      ringRef.current.style.height   = '55px';
    };
    const shrink = () => {
      cursorRef.current.style.width  = '12px';
      cursorRef.current.style.height = '12px';
      ringRef.current.style.width    = '38px';
      ringRef.current.style.height   = '38px';
    };

    const targets = document.querySelectorAll('a, button, .p-card, .skill-icon-item, .stat-item');
    targets.forEach(el => { el.addEventListener('mouseenter', grow); el.addEventListener('mouseleave', shrink); });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      targets.forEach(el => { el.removeEventListener('mouseenter', grow); el.removeEventListener('mouseleave', shrink); });
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
}
