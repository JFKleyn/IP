import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { Reveal } from "../../components/Reveal";
import event1 from "../../assets/event-1.webp";
import event2 from "../../assets/event-2.webp";
import event3 from "../../assets/event-3.webp";
import event4 from "../../assets/event-4.webp";
import event5 from "../../assets/event-5.webp";
import event6 from "../../assets/event-6.webp";

const events = [
  { image: event2, name: "Birthday celebrations", caption: "Big birthday energy." },
  { image: event4, name: "Soft play and jumping castles", caption: "Little people. Big fun." },
  { image: event3, name: "Special occasions", caption: "The beautiful details." },
  { image: event6, name: "Styled events", caption: "An occasion to remember." },
  { image: event1, name: "Kids' parties", caption: "Play all day." },
  { image: event5, name: "Balloon styling", caption: "Make an entrance." },
];


const services = [
  {
    id: "play",
    path: "/insta-play",
    eyebrow: "FOR THE LITTLE PARTY PEOPLE",
    title: "INSTA PLAY",
    description: "Big laughs, little feet and hours of fun. Playtime magic for their special day.",
    image: event4,
    alt: "White jumping castle set up for a children's party",
  },
  {
    id: "decor",
    path: "/insta-decor",
    eyebrow: "THE WOW-FACTOR DETAILS",
    title: "INSTA DECOR",
    description: "Balloons, beautiful backdrops and those finishing touches everyone remembers.",
    image: event5,
    alt: "Colourful balloon arrangement at an event entrance",
  },
  {
    id: "hire",
    path: "/insta-hire",
    eyebrow: "THE PERFECT FINISHING TOUCH",
    title: "INSTA HIRE",
    description: "Thoughtful event pieces that bring the whole celebration together.",
    image: event3,
    alt: "Elegant event drinks station and display",
  },
];

export function HomePage() {
  const [current, setCurrent] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const touchStart = useRef(null);
  const burstTimer = useRef(null);

  useEffect(() => {
    const interval = window.setInterval(() => setCurrent((index) => (index + 1) % events.length), 5200);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => () => window.clearTimeout(burstTimer.current), []);

  function celebrate() {
    window.clearTimeout(burstTimer.current);
    setConfetti(false);
    window.requestAnimationFrame(() => {
      setConfetti(true);
      burstTimer.current = window.setTimeout(() => setConfetti(false), 1100);
    });
  }

  function move(amount) {
    setCurrent((index) => (index + amount + events.length) % events.length);
  }

  return (
    <main className="ip-home">
      <section className="ip-hero" id="home" aria-label="Insta Party home">
        <div className="ip-hero-content">
          <div className="ip-hero-copy">
            <Reveal delay={70} direction="left"><p className="ip-eyebrow"><span className="ip-eyebrow-line" /> WE BRING THE PARTY TO YOU</p></Reveal>
            <Reveal delay={200} distance={75}><h1>GOOD<br /><span>TIMES</span><br />START <em>HERE.</em></h1></Reveal>
            <Reveal delay={380}><p className="ip-intro">The little details. The big reactions. The moments everyone remembers. We make celebrating feel effortless and a whole lot more fun.</p></Reveal>
            <Reveal delay={530}><div className="ip-actions">
              <Link className="ip-primary" to="/contact-us" onMouseEnter={celebrate} onFocus={celebrate} onTouchStart={celebrate}>
                LET'S PLAN A PARTY <span aria-hidden="true"><svg aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}><path d="M5 19 19 5M7 5h12v12" /></svg></span>
                <span className={confetti ? "ip-confetti is-bursting" : "ip-confetti"} aria-hidden="true">
                  {Array.from({ length: 14 }, (_, index) => <i key={index} style={{ "--piece": index }} />)}
                </span>
              </Link>
              <Link className="ip-secondary" to="/insta-gallery">EXPLORE OUR WORK <span aria-hidden="true">→</span></Link>
            </div></Reveal>
            <Reveal delay={660}><div className="ip-small-note"><span className="ip-note-dot" /> YOUR OCCASION, OUR FAVOURITE THING.</div></Reveal>
          </div>

          <Reveal direction="right" delay={300} distance={95}><div className="ip-showcase" onTouchStart={(e) => { touchStart.current = e.touches[0]?.clientX ?? null; }} onTouchEnd={(e) => {
            if (touchStart.current === null) return;
            const difference = (e.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
            if (Math.abs(difference) > 45) move(difference < 0 ? 1 : -1);
            touchStart.current = null;
          }}>
            <div className="ip-photo-frame">
              {events.map((event, index) => <img key={event.name} src={event.image} alt={event.name} className={index === current ? "ip-photo is-current" : "ip-photo"} aria-hidden={index !== current} loading={index < 2 ? "eager" : "lazy"} />)}
              <div className="ip-photo-gradient" />
              <div className="ip-photo-caption" key={current}><span>THE INSTA PARTY EXPERIENCE</span><strong>{events[current].caption}</strong></div>
            </div>
            <div className="ip-photo-controls">
              <button type="button" onClick={() => move(-1)} aria-label="Previous photo">←</button>
              <button type="button" onClick={() => move(1)} aria-label="Next photo">→</button>
            </div>
            <div className="ip-showcase-caption" aria-hidden="true">REAL PARTIES.<br />REAL MAGIC.</div>
          </div></Reveal>
        </div>
        <div className="ip-ribbon" aria-label="Party styling, balloons, soft play, event hire and unforgettable moments">
          <div className="ip-ribbon-track" aria-hidden="true">
            {Array.from({ length: 3 }, (_, index) => <span className="ip-ribbon-set" key={index}>PARTY STYLING <b>•</b> BALLOONS <b>•</b> SOFT PLAY <b>•</b> EVENT HIRE <b>•</b> BIG MEMORIES <b>•</b> </span>)}
          </div>
        </div>
      </section>
      <section className="ip-services" id="magic" aria-labelledby="ip-services-title">
        <div className="ip-services-inner">
          <div className="ip-services-heading">
            <Reveal direction="left"><div className="ip-services-heading-left">
              <span className="ip-services-kicker"><span className="ip-services-kicker-mark" /> THE GOOD STUFF STARTS HERE</span>
              <h2 id="ip-services-title">A LITTLE PARTY?<br /><span>A BIG CELEBRATION?</span><br /><em>WE DO IT ALL.</em></h2>
            </div></Reveal>
            <Reveal delay={170} direction="right"><div className="ip-services-heading-right">
              <p>From picture-perfect setups to play-all-day fun, we bring the ideas, the details and the energy that make it unforgettable.</p>
              <span className="ip-services-discover">FIND YOUR KIND OF MAGIC <span aria-hidden="true">↓</span></span>
            </div></Reveal>
          </div>

          <div className="ip-services-grid" aria-label="Insta Party services">
            {services.map((service) => (
              <Reveal key={service.id} delay={120 + services.findIndex((item) => item.id === service.id) * 170} direction="pop" distance={70}><Link
                to={service.path}
                aria-label={`Explore ${service.title}`}
                key={service.id}
                className={`ip-service-card ip-service-card--${service.id}`}
               
              >
                <img className="ip-service-card-image" src={service.image} alt={service.alt} loading="lazy" />
                <div className="ip-service-card-shade" aria-hidden="true" />
                <div className="ip-service-card-content">
                  <span className="ip-service-card-eyebrow">{service.eyebrow}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </Link></Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="ip-memory-wall" id="work" aria-labelledby="ip-memory-title">
        <div className="ip-memory-inner">
          <Reveal direction="up"><div className="ip-memory-heading">
            <p className="ip-memory-kicker">THE MOMENTS THAT MATTER</p>
            <h2 id="ip-memory-title">GOOD TIMES.<br /><span>GREAT MEMORIES.</span></h2>
            <p>Big celebrations, little surprises, and everything worth remembering.</p>
          </div></Reveal>
          <div className="ip-memory-board" aria-label="A collection of Insta Party celebrations">
            <Reveal direction="pop" delay={120} distance={95}><figure className="ip-memory-print ip-memory-print--one">
              <img src={event2} alt="Colourful birthday balloons and party decorations" loading="lazy" />
              <figcaption>The Big Birthdays</figcaption>
            </figure></Reveal>
            <Reveal direction="pop" delay={280} distance={95}><figure className="ip-memory-print ip-memory-print--two">
              <img src={event1} alt="Bright children's soft play setup" loading="lazy" />
              <figcaption>Little Adventures</figcaption>
            </figure></Reveal>
            <Reveal direction="pop" delay={440} distance={95}><figure className="ip-memory-print ip-memory-print--three">
              <img src={event6} alt="Celebration with balloons and special details" loading="lazy" />
              <figcaption>All the Details</figcaption>
            </figure></Reveal>
            <Reveal direction="pop" delay={600} distance={95}><figure className="ip-memory-print ip-memory-print--four">
              <img src={event3} alt="Elegant event drinks station" loading="lazy" />
              <figcaption>Cheers to That!</figcaption>
            </figure></Reveal>
            <Reveal delay={550} direction="left"><span className="ip-memory-note" aria-hidden="true">the best days<br />are worth keeping.</span></Reveal>
          </div>
          <Reveal delay={160}><Link className="ip-memory-link" to="/contact-us">LET'S MAKE SOME MEMORIES <span aria-hidden="true"><svg aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}><path d="M5 19 19 5M7 5h12v12" /></svg></span></Link></Reveal>
        </div>
      </section>
      <section className="ip-promise" aria-labelledby="ip-promise-title">
        <div className="ip-section-wrap ip-promise-layout">
          <Reveal direction="left" distance={85}><div className="ip-promise-lead">
            <p className="ip-section-label">MORE THAN JUST A PARTY</p>
            <h2 id="ip-promise-title"><span className="ip-promise-line ip-promise-line--light">YOU BRING<br />THE REASON.</span><span className="ip-promise-line ip-promise-line--dark">WE BRING<br />THE WOW.</span></h2>
          </div></Reveal>
          <Reveal direction="right" distance={85} delay={180}><div className="ip-promise-copy">
            <p>We believe the best celebrations feel like you. From the first idea to the finishing touches, it's all about making the moment yours.</p>
            <Link to="/contact-us" className="ip-promise-link">LET'S MAKE IT HAPPEN <span aria-hidden="true"><svg aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}><path d="M5 19 19 5M7 5h12v12" /></svg></span></Link>
          </div></Reveal>
        </div>
      </section>

      <section className="ip-how ip-how--party" aria-labelledby="ip-how-title">
        <div className="ip-section-wrap">
          <Reveal direction="left"><div className="ip-how-heading">
            <p className="ip-section-label">EASY PEASY, PARTY PLEASE</p>
            <h2 id="ip-how-title">THREE LITTLE STEPS.<br /><span>ONE BIG CELEBRATION.</span></h2>
            <p className="ip-how-subtitle">From the first hello to the final hooray, here's how the fun begins.</p>
          </div></Reveal>
          <div className="ip-party-steps">
            <Reveal direction="pop" delay={0} distance={85}><article className="ip-party-step ip-party-step--chat">
              <div className="ip-party-step-top"><span>IT STARTS WITH A HELLO</span></div>
              <div className="ip-party-speech" aria-hidden="true"><span>Hey!</span><span>Let's<br />party!</span></div>
              <div className="ip-party-step-bottom"><h3>LET'S<br />CHAT.</h3><p>Tell us what you're celebrating and what you have in mind.</p></div>
            </article></Reveal>
            <Reveal direction="pop" delay={190} distance={85}><article className="ip-party-step ip-party-step--create">
              <div className="ip-party-step-top"><span>LET THE IDEAS FLOW</span></div>
              <div className="ip-party-collage" aria-hidden="true">
                <img src={event5} alt="" loading="lazy" />
                <img src={event3} alt="" loading="lazy" />
              </div>
              <div className="ip-party-step-bottom"><h3>LET'S<br />CREATE.</h3><p>We'll help bring the details together for your kind of celebration.</p></div>
            </article></Reveal>
            <Reveal direction="pop" delay={380} distance={85}><article className="ip-party-step ip-party-step--celebrate">
              <div className="ip-party-step-top"><span>HERE'S TO THE GOOD STUFF</span></div>
              <div className="ip-party-photo" aria-hidden="true"><img src={event2} alt="" loading="lazy" /></div>
              <div className="ip-party-step-bottom"><h3>LET'S<br />PARTY.</h3><p>Enjoy the moments, the smiles and all the good stuff.</p></div>
            </article></Reveal>
          </div>
          <Reveal delay={240}><p className="ip-party-footnote">YOUR IDEA. OUR IMAGINATION. A WHOLE LOT OF FUN.</p></Reveal>
        </div>
      </section>

      <section className="ip-final-cta" id="contact" aria-labelledby="ip-final-title">
        <div className="ip-section-wrap ip-final-layout">
          <Reveal direction="left"><div>
            <p className="ip-section-label">YOUR NEXT CELEBRATION STARTS HERE</p>
            <h2 id="ip-final-title">GOT SOMETHING<br />TO <span>CELEBRATE?</span></h2>
            <p className="ip-final-sub">Tell us your idea. Let's make it a moment worth remembering.</p>
          </div></Reveal>
          <Reveal direction="right" delay={180} distance={90}><div className="ip-final-panel">
            <p>READY WHEN YOU ARE.</p>
            <strong>LET'S MAKE<br />SOME MAGIC.</strong>
            <span>Have a celebration in mind? Tell us what you're dreaming up, and let's make it happen.</span>
            <Link to="/contact-us" className="ip-final-button">CONTACT US <span aria-hidden="true"><svg aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}><path d="M5 19 19 5M7 5h12v12" /></svg></span></Link>
          </div></Reveal>
        </div>
      </section>
    </main>
  );
}
