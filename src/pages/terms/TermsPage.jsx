import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './TermsPage.css';

import event1 from '../../assets/event-1.webp';
import event3 from '../../assets/event-3.webp';

function ArrowIcon() {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 19 5M8 5h11v11" /></svg>;
}

const cancellation = [
  { period: 'One month’s notice', refund: 'Full refund' },
  { period: 'Two weeks’ notice', refund: '50% of deposit paid' },
  { period: 'One week’s notice', refund: 'No refund' },
];

export function TermsPage() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const targets = [...root.querySelectorAll("[data-terms-reveal]")];
    root.classList.add("ip-terms-motion");
    let firstFrame, secondFrame;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ip-terms-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: "0px 0px -35px 0px" });
    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => targets.forEach(target => observer.observe(target)));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      observer.disconnect();
      root.classList.remove("ip-terms-motion");
    };
  }, []);

  return (
    <main className="ip-terms" ref={rootRef}>
      <section className="ip-terms-hero">
        <div className="ip-terms-container ip-terms-hero-layout">
          <div data-terms-reveal>
            <p className="ip-terms-kicker"><span /> THE IMPORTANT DETAILS</p>
            <h1>TERMS &amp; <span>CONDITIONS.</span></h1>
            <p className="ip-terms-intro">A little clarity goes a long way. Here’s what you need to know before we bring the party to you.</p>
            <a href="#payment-terms" className="ip-terms-btn ip-terms-btn-red">READ OUR TERMS <ArrowIcon /></a>
          </div>
          <div className="ip-terms-hero-photo" data-terms-reveal>
            <img src={event1} alt="A celebration styled by Insta Party" fetchPriority="high" />
            <div className="ip-terms-photo-tag">GOOD TIMES.<br /><strong>GREAT PLANNING.</strong></div>
          </div>
        </div>
        <div className="ip-terms-hero-circle" aria-hidden="true" />
      </section>

      <section className="ip-terms-section" id="payment-terms">
        <div className="ip-terms-container ip-terms-row">
          <div className="ip-terms-section-number" aria-hidden="true">01</div>
          <div className="ip-terms-section-body" data-terms-reveal>
            <p className="ip-terms-kicker"><span /> SECURING YOUR DATE</p>
            <h2>PAYMENT <span>TERMS.</span></h2>
            <p>A <strong>50% payment</strong> is required on booking. The remaining <strong>50% balance</strong> must reflect in our account at least <strong>24 hours before setup</strong>.</p>
            <p>Only electronic transfers are accepted. Our banking details are provided on your invoice, and proof of payment must be emailed to <a href="mailto:info@instaparty.co.za">info@instaparty.co.za</a>.</p>
            <div className="ip-terms-note"><span className="ip-terms-note-mark">!</span><p>Any damage to equipment or hired items will be charged in full to the customer.</p></div>
          </div>
        </div>
      </section>

      <section className="ip-terms-section ip-terms-section-tint" id="consent-indemnity">
        <div className="ip-terms-container ip-terms-row">
          <div className="ip-terms-section-number" aria-hidden="true">02</div>
          <div className="ip-terms-section-body" data-terms-reveal>
            <p className="ip-terms-kicker"><span /> BEFORE THE CELEBRATION</p>
            <h2>CONSENT &amp; <span>INDEMNITY.</span></h2>
            <p>When securing your booking, please complete the <strong>booking form (Form A)</strong> and <strong>indemnity form (Form B)</strong>, and provide a copy of your ID document.</p>
            <p>Please email these documents to <a href="mailto:info@instaparty.co.za">info@instaparty.co.za</a>. We will collect the originals during setup.</p>
            <div className="ip-terms-inline-photo"><img src={event3} alt="Insta Party event setup" loading="lazy" /></div>
          </div>
        </div>
      </section>

      <section className="ip-terms-section" id="cancellation-policy">
        <div className="ip-terms-container ip-terms-row">
          <div className="ip-terms-section-number" aria-hidden="true">03</div>
          <div className="ip-terms-section-body" data-terms-reveal>
            <p className="ip-terms-kicker"><span /> IF PLANS CHANGE</p>
            <h2>CANCELLATION <span>POLICY.</span></h2>
            <p>Should you wish to cancel your booking, please note the following terms:</p>
            <div className="ip-terms-policy-list">
              {cancellation.map((item) => (
                <div className="ip-terms-policy-item" key={item.period}>
                  <span className="ip-terms-policy-dot" aria-hidden="true" />
                  <strong>{item.period}</strong>
                  <span>{item.refund}</span>
                </div>
              ))}
            </div>
            <p className="ip-terms-small">Please contact our team as soon as possible if you need to change or cancel a booking.</p>
          </div>
        </div>
      </section>

      <section className="ip-terms-cta" data-terms-reveal>
        <div className="ip-terms-container ip-terms-cta-inner">
          <p className="ip-terms-kicker"><span /> WE'RE HERE TO HELP</p>
          <h2>READY TO MAKE <span>MEMORIES?</span></h2>
          <p>Have a question about our booking terms? Get in touch and we'll be happy to help.</p>
          <Link to="/contact-us" className="ip-terms-btn ip-terms-btn-red">CONTACT US <ArrowIcon /></Link>
        </div>
      </section>
    </main>
  );
}
