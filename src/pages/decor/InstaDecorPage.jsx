import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./InstaDecorPage.css";

// Save these thirteen images in src/assets using the filenames below.
import decorHero from "../../assets/decor-hero.webp";
import decor01 from "../../assets/decor-01.webp";
import decor02 from "../../assets/decor-02.webp";
import decor03 from "../../assets/decor-03.webp";
import decor04 from "../../assets/decor-04.webp";
import decor05 from "../../assets/decor-05.webp";
import decor06 from "../../assets/decor-06.webp";
import decor07 from "../../assets/decor-07.webp";
import decor08 from "../../assets/decor-08.webp";
import decor09 from "../../assets/decor-09.webp";
import decor10 from "../../assets/decor-10.webp";
import decor11 from "../../assets/decor-11.webp";
import decorQuote from "../../assets/decor-quote.webp";

const gallery = [decor01, decor02, decor03, decor04, decor05, decor06, decor07, decor08, decor09, decor10, decor11];

function ArrowIcon() {
  return <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 19 5M7 5h12v12" /></svg>;
}

export function InstaDecorPage() {
  const [heroConfetti, setHeroConfetti] = useState(false);
  const heroBurstTimer = useRef(null);
  const heroFrame = useRef(null);

  useEffect(() => () => {
    window.clearTimeout(heroBurstTimer.current);
    window.cancelAnimationFrame(heroFrame.current);
  }, []);

  function celebrateHero() {
    window.clearTimeout(heroBurstTimer.current);
    window.cancelAnimationFrame(heroFrame.current);
    setHeroConfetti(false);
    heroFrame.current = window.requestAnimationFrame(() => {
      heroFrame.current = window.requestAnimationFrame(() => {
        setHeroConfetti(true);
        heroBurstTimer.current = window.setTimeout(() => setHeroConfetti(false), 1100);
      });
    });
  }

  const [selectedImage, setSelectedImage] = useState(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const elements = pageRef.current?.querySelectorAll(".ip-decor-reveal");
    if (!elements?.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (selectedImage === null) return;
    previousFocusRef.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") setSelectedImage(null);
      if (event.key === "ArrowRight") setSelectedImage((current) => (current + 1) % gallery.length);
      if (event.key === "ArrowLeft") setSelectedImage((current) => (current - 1 + gallery.length) % gallery.length);
      if (event.key === "Tab") {
        const controls = Array.from(document.querySelectorAll(".ip-decor-lightbox button"));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [selectedImage === null]);

  return (
    <main className="ip-decor ip-decor-animated" ref={pageRef}>
      <section className="ip-decor-hero" aria-labelledby="ip-decor-title">
        <div className="ip-decor-container ip-decor-hero-grid">
          <div className="ip-decor-hero-copy ip-decor-reveal ip-decor-reveal-left">
            <p className="ip-decor-eyebrow"><span /> MADE FOR YOUR MOMENT</p>
            <h1 id="ip-decor-title">INSTA <span>DECOR.</span></h1>
            <h2>Every celebration deserves something special.</h2>
            <p className="ip-decor-intro-heading">More About Our Customized Decor</p>
            <p>At Insta Party, we believe that every event should be as unique as the person or occasion it celebrates. That’s why we offer fully customised decor options designed to bring your vision to life.</p>
            <a className="ip-decor-button ip-decor-button-dark ip-hero-party-button" href="#ip-decor-gallery" onMouseEnter={celebrateHero} onFocus={celebrateHero} onTouchStart={celebrateHero}>EXPLORE OUR DECOR <ArrowIcon /><span className={heroConfetti ? "ip-hero-confetti is-bursting" : "ip-hero-confetti"} aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i key={index} style={{ "--piece": index }} />)}</span></a>
          </div>
          <div className="ip-decor-hero-visual ip-decor-reveal ip-decor-reveal-right"><div className="ip-decor-hero-image"><img src={decorHero} alt="Customised Insta Party event decorations" fetchPriority="high" /></div></div>
        </div>
      </section>

      <section className="ip-decor-showcase" id="ip-decor-gallery" aria-labelledby="ip-decor-gallery-title">
        <div className="ip-decor-container">
          <div className="ip-decor-showcase-heading ip-decor-reveal">
            <p className="ip-decor-eyebrow"><span /> CREATED AROUND YOU</p>
            <h2 id="ip-decor-gallery-title">TAILORED TO <span>YOUR THEME.</span></h2>
            <p>Whether you have a specific theme in mind or need some inspiration, our team works closely with you to create decor that perfectly matches your vision.</p>
          </div>
          <div className="ip-decor-gallery">
            {gallery.map((src, index) => (
              <button className={`ip-decor-gallery-item ip-decor-gallery-item-${index + 1} ip-decor-reveal`} style={{ "--decor-delay": `${(index % 4) * 65}ms` }} key={index} type="button" onClick={() => setSelectedImage(index)} aria-label={`View decoration photograph ${index + 1} of ${gallery.length}`}>
                <img src={src} alt={`Insta Party customised event decor example ${index + 1}`} loading="lazy" />
                <span className="ip-decor-gallery-view">VIEW PHOTO <ArrowIcon /></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="ip-decor-quote" aria-labelledby="ip-decor-quote-title">
        <div className="ip-decor-container ip-decor-quote-grid">
          <div className="ip-decor-quote-image ip-decor-reveal ip-decor-reveal-left"><img src={decorQuote} alt="Beautifully styled Insta Party event setting" loading="lazy" /></div>
          <div className="ip-decor-quote-copy ip-decor-reveal ip-decor-reveal-right">
            <p className="ip-decor-eyebrow"><span /> LET'S MAKE IT YOURS</p>
            <h2 id="ip-decor-quote-title">IMPORTANT NOTICE ABOUT <span>INSTA DECOR.</span></h2>
            <p>Due to customization, pricing is done upon enquiry.</p>
            <Link to="/contact-us" className="ip-decor-button ip-decor-button-red">CONTACT FOR QUOTE <ArrowIcon /></Link>
          </div>
        </div>
      </section>

      {selectedImage !== null && (
        <div className="ip-decor-lightbox" role="dialog" aria-modal="true" aria-label="InstaDecor photograph viewer" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedImage(null); }}>
          <button ref={closeButtonRef} className="ip-decor-lightbox-close" type="button" aria-label="Close photograph viewer" onClick={() => setSelectedImage(null)}>×</button>
          <button className="ip-decor-lightbox-prev" type="button" aria-label="Previous photograph" onClick={() => setSelectedImage((selectedImage - 1 + gallery.length) % gallery.length)}>‹</button>
          <figure><img src={gallery[selectedImage]} alt={`Insta Party decoration photograph ${selectedImage + 1}`} /><figcaption>{selectedImage + 1} / {gallery.length}</figcaption></figure>
          <button className="ip-decor-lightbox-next" type="button" aria-label="Next photograph" onClick={() => setSelectedImage((selectedImage + 1) % gallery.length)}>›</button>
        </div>
      )}
    </main>
  );
}
