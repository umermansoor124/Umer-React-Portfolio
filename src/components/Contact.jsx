import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const SERVICE_ID  = 'service_uxz4rm7';
const TEMPLATE_ID = 'template_t7y8klq';
const PUBLIC_KEY  = 'rkxhDsBPKRJOuA9fX';

export default function Contact() {
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    [infoRef, formRef].forEach(r => r.current && obs.observe(r.current));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
      .then(() => {
        setStatus('sent');
        e.target.reset();
        setTimeout(() => setStatus('idle'), 2500);
      })
      .catch((err) => {
        console.error('EmailJS Error:', err);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      });
  };

  const btnText =
    status === 'sending' ? 'TRANSMITTING...'    :
    status === 'sent'    ? 'DATA TRANSMITTED ✓' :
    status === 'error'   ? 'FAILED — RETRY'     :
                           'TRANSMIT MESSAGE';

  const btnStyle =
    status === 'sent'    ? { background: 'var(--accent)', color: '#000' } :
    status === 'sending' ? { background: '#1a1a1a', color: 'var(--accent)', opacity: 0.8 } :
    status === 'error'   ? { background: '#ff3333', color: '#fff' } :
                           {};

  return (
    <section id="contact" className="contact">
      <div className="c-container">
        <div className="c-info slide-left" ref={infoRef}>
          <h2 className="c-title">LET'S<br />CONNECT.</h2>
          <p className="c-sub">Open to freelance projects, collabs, and full-time opportunities. Drop a message and I'll get back to you fast.</p>
          <div className="social-box">
            <a href="https://github.com/umermansoor124" target="_blank" rel="noreferrer" className="social-link neo-shadow-sm">
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:umer58984@gmail.com" className="social-link neo-shadow-sm">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://www.linkedin.com/in/umer-mansoor-170101391/" target="_blank" rel="noreferrer" className="social-link neo-shadow-sm">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="c-form-box slide-right" ref={formRef}>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>FULL_NAME</label>
              <input
                type="text"
                name="from_name"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="input-group">
              <label>EMAIL_ADDRESS</label>
              <input
                type="email"
                name="from_email"
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="input-group">
              <label>MESSAGE_PAYLOAD</label>
              <textarea
                rows="4"
                name="message"
                placeholder="Describe your inquiry..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="submit-btn"
              style={btnStyle}
              disabled={status === 'sending'}
            >
              {btnText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}