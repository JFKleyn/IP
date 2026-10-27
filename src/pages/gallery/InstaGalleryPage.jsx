import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './InstaGalleryPage.css';

// Mock gallery images already used elsewhere on the site.
// Once the Instagram API is connected, replace MOCK_POSTS with API results
// containing { id, image, permalink, caption } and set isLiveFeed to true.
import decor01 from '../../assets/decor-01.webp';
import decor02 from '../../assets/decor-02.webp';
import decor03 from '../../assets/decor-03.webp';
import decor04 from '../../assets/decor-04.webp';
import decor05 from '../../assets/decor-05.webp';
import decor06 from '../../assets/decor-06.webp';
import decor07 from '../../assets/decor-07.webp';
import decor08 from '../../assets/decor-08.webp';
import decor09 from '../../assets/decor-09.webp';
import decor10 from '../../assets/decor-10.webp';
import decor11 from '../../assets/decor-11.webp';
import candyStand from '../../assets/hire-candy-stand.webp';
import drinksWall from '../../assets/hire-drinks-wall.webp';
import miniCart from '../../assets/hire-mini-cart.webp';
import largeCart from '../../assets/hire-large-cart.webp';
import furniture from '../../assets/hire-furniture.webp';
import miniCandy from '../../assets/hire-mini-candy.webp';
import event1 from '../../assets/event-1.webp';
import event2 from '../../assets/event-2.webp';
import event3 from '../../assets/event-3.webp';
import event4 from '../../assets/event-4.webp';
import event5 from '../../assets/event-5.webp';
import event6 from '../../assets/event-6.webp';
import bounceCastle from '../../assets/play-bounce-castle.webp';
import waterSlide from '../../assets/play-water-slide.webp';
import playLarge from '../../assets/play-large.webp';
import playMedium from '../../assets/play-medium.webp';
import playNeutral from '../../assets/play-neutral.webp';
import playTrain from '../../assets/play-train.webp';
import playStandard from '../../assets/play-standard.webp';
import playWhitePastel from '../../assets/play-white-pastel.webp';
import playSafety from '../../assets/play-safety.webp';
import decorHero from '../../assets/decor-hero.webp';
import hireHero from '../../assets/hire-hero.webp';
import playHero from '../../assets/play-hero.webp';
import decorQuote from '../../assets/decor-quote.webp';

const photos = [decor01, event1, decor04, bounceCastle, event3, decor07, candyStand, event2, decor02, miniCart, decor10, event4, drinksWall, decor05, playLarge, decor09, event5, furniture, decor03, playNeutral, decor11, miniCandy, event6, decor08, waterSlide, largeCart, playMedium, decor06, playTrain, playStandard, playWhitePastel, playSafety, decorHero, hireHero, playHero, decorQuote];
const MOCK_POSTS = photos.map((image, index) => ({ id: `preview-${index + 1}`, image, caption: `Insta Party celebration ${index + 1}` }));
const BATCH_SIZE = 24;
const INSTAGRAM_PROFILE = 'https://www.instagram.com/instapartydurban/';

function InstagramIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>;
}
function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 19 5M8 5h11v11"/></svg>;
}

export function InstaGalleryPage() {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [previewIndex, setPreviewIndex] = useState(null);
  const pageRef = useRef(null);
  const closeRef = useRef(null);
  const isLiveFeed = false; // Switch to true when live API posts and permalinks are supplied.
  const posts = MOCK_POSTS;

  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    root.classList.add('ig-motion-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ig-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    // Start observing after the hidden initial state has been painted.
    // Otherwise the hero can appear immediately without its transition.
    const frame = window.requestAnimationFrame(() => {
      root.querySelectorAll('[data-ig-reveal]:not(.ig-visible)').forEach(el => observer.observe(el));
    });
    return () => { window.cancelAnimationFrame(frame); observer.disconnect(); root.classList.remove('ig-motion-ready'); };
  }, [visibleCount]);

  useEffect(() => {
    if (previewIndex === null) return;
    const oldOverflow = document.body.style.overflow;
    const oldFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = e => {
      if (e.key === 'Escape') setPreviewIndex(null);
      if (e.key === 'ArrowRight') setPreviewIndex(i => (i + 1) % Math.min(visibleCount, posts.length));
      if (e.key === 'ArrowLeft') setPreviewIndex(i => (i - 1 + Math.min(visibleCount, posts.length)) % Math.min(visibleCount, posts.length));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = oldOverflow; window.removeEventListener('keydown', onKeyDown); oldFocus?.focus?.(); };
  }, [previewIndex !== null, visibleCount, posts.length]);

  return <main className="ig-page" ref={pageRef}>
    <section className="ig-hero">
      <div className="ig-container ig-hero-inner">
        <div className="ig-kicker" data-ig-reveal>THE GOOD TIMES, CAPTURED.</div>
        <h1 data-ig-reveal>THE INSTA<span>GALLERY.</span></h1>
        <p data-ig-reveal>Big smiles. Beautiful details. Unforgettable celebrations.</p>
        <div className="ig-hero-bottom" data-ig-reveal><span>SCROLL TO EXPLORE</span><span className="ig-hero-line" /></div>
      </div>
      <span className="ig-hero-orb ig-hero-orb-one" aria-hidden="true" />
      <span className="ig-hero-orb ig-hero-orb-two" aria-hidden="true" />
    </section>

    <section className="ig-gallery-section" id="gallery" aria-labelledby="ig-gallery-title">
      <div className="ig-container">
        <div className="ig-section-heading" data-ig-reveal>
          <div><span className="ig-section-eyebrow">A LITTLE LOOK AT THE MAGIC</span><h2 id="ig-gallery-title">Every party has a <em>story.</em></h2></div>
          <p>From playful setups to picture-perfect moments, here's a peek at what we've been creating.</p>
        </div>

        <div className="ig-feed" data-ig-reveal>
          <div className="ig-profile">
            <div className="ig-avatar" aria-hidden="true"><span>insta<span>party</span></span></div>
            <div className="ig-profile-copy"><span className="ig-profile-label">FOLLOW THE FUN</span><h3>@instapartydurban</h3><p>We bring the party to you. Durban, KZN.</p></div>
            <a className="ig-follow" href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer"><InstagramIcon /><span>FOLLOW ON INSTAGRAM</span><ArrowIcon /></a>
          </div>
          <div className="ig-grid">
            {posts.slice(0, visibleCount).map((post, index) => (
              isLiveFeed && post.permalink ?
                <a className="ig-tile" href={post.permalink} key={post.id} target="_blank" rel="noopener noreferrer" aria-label={`View Instagram post: ${post.caption || index + 1}`} data-ig-reveal style={{ '--ig-delay': `${(index % 4) * 65}ms` }}>
                  <img src={post.image} alt={post.caption || `Insta Party post ${index + 1}`} loading={index < 8 ? 'eager' : 'lazy'} /><span className="ig-tile-overlay"><InstagramIcon /><span>VIEW POST <ArrowIcon /></span></span>
                </a> :
                <button className="ig-tile" type="button" key={post.id} onClick={() => setPreviewIndex(index)} aria-label={`Preview gallery photo ${index + 1}`} data-ig-reveal style={{ '--ig-delay': `${(index % 4) * 65}ms` }}>
                  <img src={post.image} alt={post.caption} loading={index < 8 ? 'eager' : 'lazy'} /><span className="ig-tile-overlay"><InstagramIcon /><span>VIEW PHOTO <ArrowIcon /></span></span>
                </button>
            ))}
          </div>
          <div className="ig-feed-footer">
            <span className="ig-count">SHOWING {Math.min(visibleCount, posts.length)} OF {posts.length} MOMENTS</span>
            {visibleCount < posts.length && <button className="ig-load" type="button" onClick={() => setVisibleCount(count => Math.min(count + BATCH_SIZE, posts.length))}>LOAD MORE MOMENTS <span>+</span></button>}
            <a className="ig-instagram-link" href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer"><InstagramIcon /> EXPLORE OUR INSTAGRAM <ArrowIcon /></a>
          </div>
        </div>
        <p className="ig-demo-note">Gallery preview — Instagram posts will appear here once the account is connected.</p>
      </div>
    </section>

    <section className="ig-cta"><div className="ig-container ig-cta-inner" data-ig-reveal><span>YOUR TURN TO MAKE MEMORIES</span><h2>LET'S MAKE SOMETHING <em>MAGICAL.</em></h2><p>Have a celebration in mind? We'd love to bring it to life.</p><Link to="/contact-us" className="ig-cta-button">LET'S PLAN YOUR PARTY <ArrowIcon /></Link></div></section>

    {previewIndex !== null && !isLiveFeed && <div className="ig-lightbox" role="dialog" aria-modal="true" aria-label="Gallery photo preview" onMouseDown={e => { if (e.target === e.currentTarget) setPreviewIndex(null); }}>
      <button ref={closeRef} className="ig-lightbox-close" type="button" onClick={() => setPreviewIndex(null)} aria-label="Close preview">×</button>
      <button className="ig-lightbox-nav ig-lightbox-prev" type="button" onClick={() => setPreviewIndex(i => (i - 1 + Math.min(visibleCount, posts.length)) % Math.min(visibleCount, posts.length))} aria-label="Previous image">‹</button>
      <img src={posts[previewIndex].image} alt={posts[previewIndex].caption} />
      <button className="ig-lightbox-nav ig-lightbox-next" type="button" onClick={() => setPreviewIndex(i => (i + 1) % Math.min(visibleCount, posts.length))} aria-label="Next image">›</button>
      <span className="ig-lightbox-count">{previewIndex + 1} / {Math.min(visibleCount, posts.length)}</span>
    </div>}
  </main>;
}
