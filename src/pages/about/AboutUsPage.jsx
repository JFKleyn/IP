import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './AboutUsPage.css';

// Existing event photography and team portraits.
import event1 from '../../assets/event-1.webp';
import event3 from '../../assets/event-3.webp';
import decor04 from '../../assets/decor-04.webp';
import hireCandyStand from '../../assets/hire-candy-stand.webp';
import nici from '../../assets/nici.webp';
import cassandra from '../../assets/cassandra.webp';
import emmaLeigh from '../../assets/emma-leigh.webp';

const team = [
  { name: 'Nici Vorster', role: 'Decor Planner', image: nici },
  { name: 'Cassandra Wissing', role: 'Creative Planner', image: cassandra },
  { name: 'Emma-Leigh', role: 'Chief Testing Officer', image: emmaLeigh },
];

function ArrowIcon() {
  return <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 19 5M8 5h11v11" /></svg>;
}

export function AboutUsPage() {
  const rootRef = useRef(null);
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const targets = [...root.querySelectorAll("[data-about-reveal]")];
    root.classList.add("ip-about-motion");
    let firstFrame, secondFrame;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ip-about-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .1, rootMargin: "0px 0px -35px 0px" });
    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => targets.forEach(target => observer.observe(target)));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      observer.disconnect();
      root.classList.remove("ip-about-motion");
    };
  }, []);

  return (
    <main className="ip-about" ref={rootRef}>
      <section className="ip-about-hero">
        <div className="ip-about-container ip-about-hero-inner">
          <div className="ip-about-hero-copy" data-about-reveal>
            <p className="ip-about-kicker"><span /> GET TO KNOW US</p>
            <h1>THE PEOPLE BEHIND <span>THE PARTY.</span></h1>
            <p>We believe the best celebrations aren't just beautiful. They're the ones you remember long after the last guest leaves.</p>
            <a className="ip-about-button ip-about-button-red" href="#our-story">OUR STORY <ArrowIcon /></a>
          </div>
          <div className="ip-about-hero-image" data-about-reveal>
            <img src={event1} alt="Beautifully styled Insta Party celebration" fetchPriority="high" />
            <div className="ip-about-hero-sticker">MADE FOR<br /><strong>MEMORIES.</strong></div>
          </div>
        </div>
      </section>

      <section className="ip-about-story ip-about-section" id="our-story">
        <div className="ip-about-container ip-about-split">
          <div className="ip-about-photo ip-about-photo-portrait" data-about-reveal><img src={decor04} alt="Thoughtfully styled party decorations" loading="lazy" /></div>
          <div className="ip-about-copy" data-about-reveal>
            <p className="ip-about-kicker"><span /> A LITTLE ABOUT INSTA PARTY</p>
            <h2>ORDINARY MOMENTS.<br /><span>EXTRAORDINARY MEMORIES.</span></h2>
            <p className="ip-about-lead">At Insta Party, we are passionate about transforming ordinary moments into extraordinary memories.</p>
            <p>Specialising in themed parties, picnics and unique decor, we bring a touch of magic to every event. Our experienced team handles all the details, from setup to clean-up, so you can focus on enjoying the celebration with your loved ones.</p>
          </div>
        </div>
      </section>

      <section className="ip-about-promise ip-about-section">
        <div className="ip-about-container ip-about-split ip-about-split-reverse">
          <div className="ip-about-copy" data-about-reveal>
            <p className="ip-about-kicker"><span /> WHAT MATTERS TO US</p>
            <h2>OUR <span>PROMISE.</span></h2>
            <p className="ip-about-lead">Your celebration should feel as special as the people you're celebrating.</p>
            <p>With Insta Party, you're not just getting an event — you're creating lasting memories. Our commitment to excellence and personal touch ensures every celebration is unique and unforgettable.</p>
            <Link to="/contact-us" className="ip-about-text-link">LET'S PLAN SOMETHING SPECIAL <ArrowIcon /></Link>
          </div>
          <div className="ip-about-photo ip-about-photo-landscape" data-about-reveal><img src={hireCandyStand} alt="Insta Party candy stand set up for a celebration" loading="lazy" /></div>
        </div>
      </section>

      <section className="ip-about-team ip-about-section">
        <div className="ip-about-container">
          <div className="ip-about-section-heading" data-about-reveal>
            <p className="ip-about-kicker"><span /> MEET OUR TEAM</p>
            <h2>THE FACES BEHIND <span>THE FUN.</span></h2>
            <p>A creative crew who love bringing celebrations to life.</p>
          </div>
          <div className="ip-about-team-grid">
            {team.map((member, index) => (
              <article className="ip-about-team-card" key={member.name} data-about-reveal style={{ '--about-delay': `${index * 110}ms` }}>
                <div className="ip-about-team-photo"><img src={member.image} alt={member.name} loading="lazy" /></div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ip-about-cta">
        <img src={event3} alt="" loading="lazy" />
        <div className="ip-about-cta-overlay" />
        <div className="ip-about-container ip-about-cta-inner" data-about-reveal>
          <p className="ip-about-kicker">YOUR NEXT MEMORY STARTS HERE</p>
          <h2>LET'S MAKE IT <span>UNFORGETTABLE.</span></h2>
          <p>From little celebrations to big moments, we're here to bring your ideas to life.</p>
          <Link to="/contact-us" className="ip-about-button ip-about-button-red">BOOK NOW <ArrowIcon /></Link>
        </div>
      </section>
    </main>
  );
}
