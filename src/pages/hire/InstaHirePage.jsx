import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './InstaHirePage.css';

import heroImage from '../../assets/hire-hero.webp';
import candyStand from '../../assets/hire-candy-stand.webp';
import drinksWall from '../../assets/hire-drinks-wall.webp';
import miniCart from '../../assets/hire-mini-cart.webp';
import largeCart from '../../assets/hire-large-cart.webp';
import furniture from '../../assets/hire-furniture.webp';
import miniCandy from '../../assets/hire-mini-candy.webp';

const hireItems = [
  { name: 'Candy Stand', image: candyStand },
  { name: 'Drinks Wall / Party Pack Stand', image: drinksWall },
  { name: 'Mini Cart', image: miniCart },
  { name: 'Large Cart', image: largeCart },
  { name: 'Furniture', image: furniture },
  { name: 'Mini Candy Stand', image: miniCandy },
];

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 19 5M7 5h12v12" /></svg>;
}

export function InstaHirePage() {
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

  useEffect(() => {
    const page = document.querySelector('.ih-page');
    const elements = page?.querySelectorAll('[data-ih-reveal]') || [];
    if (!('IntersectionObserver' in window)) return;
    page?.classList.add('ih-motion-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ih-is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -25px 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => { observer.disconnect(); page?.classList.remove('ih-motion-ready'); };
  }, []);

  return (
    <main className="ih-page">
      <section className="ih-hero" aria-labelledby="ih-title">
        <div className="ih-shell ih-hero-grid">
          <div className="ih-hero-copy" data-ih-reveal="left">
            <div className="ih-eyebrow"><span /> THE DETAILS MAKE THE PARTY.</div>
            <h1 id="ih-title">INSTA<span>HIRE.</span></h1>
            <h2>Everything you need to bring the celebration together.</h2>
            <p>From sweet treat stands and charming party carts to furniture and fun finishing touches, our hire collection helps turn your celebration into something special.</p>
            <p>Explore our available items and get in touch to book the perfect additions to your event.</p>
            <a className="ih-button ih-button-dark ip-hero-party-button" href="#hire-collection" onMouseEnter={celebrateHero} onFocus={celebrateHero} onTouchStart={celebrateHero}>EXPLORE HIRE OPTIONS <ArrowIcon /><span className={heroConfetti ? "ip-hero-confetti is-bursting" : "ip-hero-confetti"} aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i key={index} style={{ "--piece": index }} />)}</span></a>
          </div>
          <div className="ih-hero-visual" data-ih-reveal="right"><div className="ih-hero-accent" /><img src={heroImage} alt="Insta Party hire setup at an event" /></div>
        </div>
      </section>

      <section className="ih-collection" id="hire-collection" aria-labelledby="ih-collection-title">
        <div className="ih-shell">
          <div className="ih-section-intro" data-ih-reveal="up"><div className="ih-eyebrow"><span /> MAKE IT YOURS</div><h2 id="ih-collection-title">THE PARTY HIRE COLLECTION<span>.</span></h2><p>Find those extra touches that make your event feel just right.</p></div>
          <div className="ih-gallery-grid">
            {hireItems.map((item) => (
              <article className="ih-gallery-card" data-ih-reveal="up" key={item.name}>
                <Link className="ih-gallery-image-link" to="/contact-us" aria-label={`Enquire about ${item.name}`}>
                  <img className="ih-gallery-photo" src={item.image} alt={item.name} loading="lazy" />
                </Link>
                <div className="ih-gallery-details">
                  <h3 className="ih-gallery-name">{item.name}</h3>
                  <Link className="ih-gallery-book" to="/contact-us" aria-label={`Book now: ${item.name}`}>
                    BOOK NOW <ArrowIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ih-outro" aria-labelledby="ih-outro-title">
        <div className="ih-shell ih-outro-inner" data-ih-reveal="up"><div><div className="ih-eyebrow"><span /> LET'S MAKE IT MEMORABLE</div><h2 id="ih-outro-title">THE LITTLE DETAILS MAKE <span>BIG MEMORIES.</span></h2><p>Planning something special? Tell us what you have in mind and we'll help you find the right hire items for your celebration.</p></div><Link className="ih-button ih-button-red" to="/contact-us">CONTACT US <ArrowIcon /></Link></div>
      </section>
    </main>
  );
}
