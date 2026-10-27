import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './ContactPage.css';

const INTERESTS = ['Decor', 'Softplay', 'Catering / Slushie Machine', 'Bounce Castle', 'Lollipop Water Slide'];
const PACKAGES = ['Small (Standard Set)', 'Small (Train Set)', 'Small (Neutral Set)', 'Small (Pastel Set)', 'Medium', 'Large'];
const initial = { firstName: '', lastName: '', email: '', telephone: '', area: '', bookingDate: '', time: '', interests: [], packages: [], message: '', website: '' };

function SocialIcon({ type }) {
  if (type === 'instagram') return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M13.7 21v-8.2h2.8l.4-3.3h-3.2V7.4c0-1 .3-1.6 1.6-1.6H17V2.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4v2.3H7.5v3.3h2.8V21z"/></svg>;
}

export function ContactPage() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const targets = [...root.querySelectorAll("[data-contact-reveal]")];
    root.classList.add("ip-contact-motion");
    let firstFrame, secondFrame;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ip-contact-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: "0px 0px 0px 0px" });
    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => targets.forEach(target => observer.observe(target)));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      observer.disconnect();
      root.classList.remove("ip-contact-motion");
    };
  }, []);

  const update = (name, value) => setForm(prev => ({ ...prev, [name]: value }));
  const toggle = (name, value) => setForm(prev => ({ ...prev, [name]: prev[name].includes(value) ? prev[name].filter(item => item !== value) : [...prev[name], value] }));

  async function submit(event) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setStatus({ type: '', message: '' });
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Unable to send your enquiry. Please try again.');
      setStatus({ type: 'success', message: 'Thank you! Your enquiry has been sent. We’ll be in touch soon.' });
      setForm(initial);
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Something went wrong. Please try again.' });
    } finally { setSending(false); }
  }

  return (
    <main className="ip-contact" ref={rootRef}>
      <section className="ip-contact-hero">
        <div className="ip-contact-container ip-contact-hero-inner" data-contact-reveal>
          <p className="ip-contact-kicker">LET'S MAKE IT HAPPEN</p>
          <h1>LET'S PLAN <span>YOUR PARTY.</span></h1>
          <p>Have a question or ready to book? Tell us a little about your celebration and we'll take it from there.</p>
        </div>
        <div className="ip-contact-hero-circle" aria-hidden="true" />
      </section>

      <section className="ip-contact-main">
        <div className="ip-contact-container ip-contact-layout">
          <aside className="ip-contact-info" data-contact-reveal>
            <p className="ip-contact-kicker">GET IN TOUCH</p>
            <h2>WE'D LOVE TO <span>HEAR FROM YOU.</span></h2>
            <p>Whether you're planning a birthday bash, a beautiful picnic or a celebration worth remembering, we're here to help bring it to life.</p>
            <div className="ip-contact-info-block">
              <span className="ip-contact-info-label">EMAIL US</span>
              <a href="mailto:info@instaparty.co.za">info@instaparty.co.za</a>
            </div>
            <div className="ip-contact-info-block">
              <span className="ip-contact-info-label">FIND US ON SOCIAL</span>
              <div className="ip-contact-socials">
                <a href="https://www.facebook.com/share/1D2jckWf48/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook"><SocialIcon type="facebook" /></a>
                <a href="https://www.instagram.com/instapartydurban/" target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon type="instagram" /></a>
              </div>
            </div>
            <div className="ip-contact-aside-note"><span>GOOD TIMES START HERE.</span><span className="ip-contact-note-dot" aria-hidden="true" /></div>
          </aside>

          <div className="ip-contact-form-wrap" data-contact-reveal>
            <div className="ip-contact-form-intro">
              <p className="ip-contact-kicker">SEND AN ENQUIRY</p>
              <h2>TELL US ABOUT <span>YOUR EVENT.</span></h2>
              <p>Fill in the details below and we'll get back to you as soon as possible.</p>
            </div>
            <form onSubmit={submit} className="ip-contact-form">
              <div className="ip-contact-two">
                <label>First name <span>*</span><input value={form.firstName} onChange={e => update('firstName', e.target.value)} autoComplete="given-name" required maxLength={100} /></label>
                <label>Last name <span>*</span><input value={form.lastName} onChange={e => update('lastName', e.target.value)} autoComplete="family-name" required maxLength={100} /></label>
              </div>
              <div className="ip-contact-two">
                <label>Email <span>*</span><input type="email" value={form.email} onChange={e => update('email', e.target.value)} autoComplete="email" required maxLength={254} /></label>
                <label>Telephone number<input type="tel" value={form.telephone} onChange={e => update('telephone', e.target.value)} autoComplete="tel" maxLength={35} /></label>
              </div>
              <label>Area<input value={form.area} onChange={e => update('area', e.target.value)} placeholder="Where is your event?" maxLength={150} /></label>
              <div className="ip-contact-two">
                <label>Booking date<input type="date" value={form.bookingDate} onChange={e => update('bookingDate', e.target.value)} /></label>
                <label>Time<input type="time" value={form.time} onChange={e => update('time', e.target.value)} /></label>
              </div>
              <fieldset className="ip-contact-options">
                <legend>I'm interested in</legend>
                <div className="ip-contact-checks">{INTERESTS.map(item => <label key={item} className="ip-contact-check"><input type="checkbox" checked={form.interests.includes(item)} onChange={() => toggle('interests', item)} /><span>{item}</span></label>)}</div>
              </fieldset>
              {form.interests.includes('Softplay') && <fieldset className="ip-contact-options ip-contact-packages">
                <legend>Soft Play Package</legend>
                <div className="ip-contact-checks">{PACKAGES.map(item => <label key={item} className="ip-contact-check"><input type="checkbox" checked={form.packages.includes(item)} onChange={() => toggle('packages', item)} /><span>{item}</span></label>)}</div>
              </fieldset>}
              <label>Questions or message<textarea value={form.message} onChange={e => update('message', e.target.value)} rows="5" maxLength={5000} placeholder="Tell us what you're dreaming up..." /></label>
              <div className="ip-contact-honeypot" aria-hidden="true"><label>Website<input value={form.website} onChange={e => update('website', e.target.value)} tabIndex={-1} autoComplete="off" /></label></div>
              <button className="ip-contact-submit" type="submit" disabled={sending}>{sending ? 'SENDING...' : 'SEND ENQUIRY'}<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" /></svg></button>
              {status.message && <p className={`ip-contact-status ip-contact-status-${status.type}`} role="status">{status.message}</p>}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
