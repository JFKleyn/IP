import { useEffect, useRef, useState } from "react";
import "./InstaPlayPage.css";

// Place these images in src/assets, using the filenames below.
import playHero from "../../assets/play-hero.webp";
import playStandard from "../../assets/play-standard.webp";
import playTrain from "../../assets/play-train.webp";
import playNeutral from "../../assets/play-neutral.webp";
import playMedium from "../../assets/play-medium.webp";
import playLarge from "../../assets/play-large.webp";
import playCastle from "../../assets/play-bounce-castle.webp";
import playPastel from "../../assets/play-white-pastel.webp";
import playWater from "../../assets/play-water-slide.webp";
import playSafety from "../../assets/play-safety.webp";

const packages = [
  { title: "Small (Standard Set)", detail: "SMALL 5–8 CHILDREN", image: playStandard },
  { title: "Small (Train Set)", detail: "MEDIUM 5–8 CHILDREN", image: playTrain },
  { title: "Small (Neutral Set)", detail: "SMALL 5–8 CHILDREN", image: playNeutral },
  { title: "Medium", detail: "MEDIUM 8–10 CHILDREN", image: playMedium },
  { title: "Large", detail: "LARGE 10+ CHILDREN", image: playLarge },
  { title: "Bounce Castle", detail: "Includes balloons (Themed)", image: playCastle },
  { title: "Small (White Pastel)", detail: "3–5 CHILDREN", image: playPastel },
  { title: "Water Slide", detail: "8m Lollipop Waterslide", image: playWater },
];

const setupInformation = {
  outdoor: [
    "A shaded area is ideal for an outdoor party set up as Soft Play material can become hot and uncomfortable when in direct sunlight. We can set up under a gazebo if necessary. If needed one can be hired from us at an additional cost.",
    "Our Soft play equipment is not waterproof and under no circumstances can it be used in a pool area or outside during rain. Should it start raining you are required to bring the Soft Play equipment under cover.",
  ],
  indoor: [
    "A spacious area with no obstacles i.e. stairs, that could cause harm to children playing, is required for an indoor party set up. Please note mat size for your chosen package. We will not be held responsible for equipment not ‘fitting’ in the space available.",
  ],
};

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 19 5M7 5h12v12" /></svg>;
}

export function InstaPlayPage() {
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

  const [setup, setSetup] = useState("outdoor");
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const targets = page.querySelectorAll("[data-play-reveal]");
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    targets.forEach((target) => observer.observe(target));
    page.classList.add("ip-play-animate");
    return () => {
      observer.disconnect();
      page.classList.remove("ip-play-animate");
    };
  }, []);

  return (
    <main className="ip-play" ref={pageRef}>
      <section className="ip-play-hero" aria-labelledby="ip-play-title">
        <div className="ip-play-container ip-play-hero-grid">
          <div className="ip-play-hero-copy" data-play-reveal="left">
            <p className="ip-play-kicker"><span /> LITTLE FEET. BIG FUN.</p>
            <h1 id="ip-play-title">INSTA <span>PLAY.</span></h1>
            <p className="ip-play-hero-lead">Soft play, big smiles and endless little adventures.</p>
            <div className="ip-play-intro">
              <p>Insta Party offers Soft Play hire for children aged 6 months to 5 years. We bring the Party to You and allow for Mom and Dad to celebrate the special occasion with less to worry about.</p>
              <p>Soft Play allows for children to climb in a safe environment while using their imagination to create different structures/obstacles and have fun.</p>
              <p>Soft Play is hours of entertainment, and our packages allow you to choose what you feel is best suited for your event space and age group.</p>
            </div>
            <a className="ip-play-button ip-play-button-dark ip-hero-party-button" href="#ip-play-packages" onMouseEnter={celebrateHero} onFocus={celebrateHero} onTouchStart={celebrateHero}>EXPLORE PACKAGES <ArrowIcon /><span className={heroConfetti ? "ip-hero-confetti is-bursting" : "ip-hero-confetti"} aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i key={index} style={{ "--piece": index }} />)}</span></a>
          </div>
          <div className="ip-play-hero-visual" data-play-reveal="right"><div className="ip-play-hero-photo"><img src={playHero} alt="Insta Party soft play setup" /></div></div>
        </div>
      </section>

      <section className="ip-play-setup" aria-labelledby="ip-play-setup-title">
        <div className="ip-play-container">
          <div className="ip-play-section-heading" data-play-reveal="up"><p className="ip-play-kicker"><span /> BEFORE THE FUN BEGINS</p><h2 id="ip-play-setup-title">THE RIGHT SPACE.<br /><em>THE BEST PLAYTIME.</em></h2><p>Choose the right setup for your party</p></div>
          <div className="ip-play-setup-shell" data-play-reveal="up">
            <div className="ip-play-setup-tabs" role="tablist" aria-label="Party setup location">
              <button id="ip-play-tab-outdoor" type="button" role="tab" aria-selected={setup === "outdoor"} aria-controls="ip-play-setup-panel" className={setup === "outdoor" ? "is-active" : ""} onClick={() => setSetup("outdoor")}>OUTDOOR PLAY</button>
              <button id="ip-play-tab-indoor" type="button" role="tab" aria-selected={setup === "indoor"} aria-controls="ip-play-setup-panel" className={setup === "indoor" ? "is-active" : ""} onClick={() => setSetup("indoor")}>INDOOR PLAY</button>
            </div>
            <div key={setup} id="ip-play-setup-panel" role="tabpanel" aria-labelledby={`ip-play-tab-${setup}`} className="ip-play-setup-panel">
              <div className="ip-play-panel-label">{setup === "outdoor" ? "IDEAL PARTY SET UP — OUTDOORS" : "IDEAL PARTY SET UP — INDOORS"}</div>
              {setupInformation[setup].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="ip-play-packages" id="ip-play-packages" aria-labelledby="ip-play-packages-title">
        <div className="ip-play-container">
          <div className="ip-play-section-heading" data-play-reveal="up"><p className="ip-play-kicker"><span /> PICK YOUR KIND OF FUN</p><h2 id="ip-play-packages-title">SOFT PLAY <em>PACKAGES.</em></h2><p>A little something for every kind of celebration.</p></div>
          <div className="ip-play-package-grid">
            {packages.map((item) => <article key={item.title} className="ip-play-package-card" data-play-reveal="up" style={{ "--play-delay": `${(packages.indexOf(item) % 3) * 90}ms` }}>
              <div className="ip-play-package-image"><img src={item.image} alt={`${item.title} soft play package`} loading="lazy" /></div>
              <div className="ip-play-package-body"><h3>{item.title}</h3><p>{item.detail}</p><a href="/contact-us" className="ip-play-package-link">BOOK NOW <ArrowIcon /></a></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="ip-play-safety" aria-labelledby="ip-play-safety-title">
        <div className="ip-play-container ip-play-safety-grid">
          <div className="ip-play-safety-image" data-play-reveal="left"><img src={playSafety} alt="Child safety warning sign" loading="lazy" /></div>
          <div className="ip-play-safety-copy" data-play-reveal="right"><p className="ip-play-kicker"><span /> LITTLE PEOPLE, BIG PRIORITIES</p><h2 id="ip-play-safety-title">HEALTH &amp; <em>SAFETY.</em></h2>
            <p>All equipment is washed and sanitized after each use. We ask that you please don’t use any cleaning products on the equipment. Should you wish to wipe the equipment, please use a damp cloth only.</p>
            <p>We request that no shoes/socks are worn on the equipment.</p>
            <p>We request no food or liquid is taken onto the equipment. This can create a choking hazard – no responsibility will be accepted by Insta Party.</p>
            <p>A ‘safety sign’ will be put up during set up to warn your guests of the ‘rules’</p>
          </div>
        </div>
      </section>

      <section className="ip-play-cta" aria-labelledby="ip-play-cta-title"><div className="ip-play-container ip-play-cta-inner" data-play-reveal="up"><p className="ip-play-kicker"><span /> LET'S MAKE SOME MEMORIES</p><h2 id="ip-play-cta-title">MORE THAN JUST A<br /><em>JOYFUL EXPERIENCE!</em></h2><p>Ready to make your next celebration truly unforgettable? Contact us today and let Insta Party turn your event into a magical and memorable experience.</p><strong>BOOK NOW AND CREATE LASTING MEMORIES!</strong><a href="/contact-us" className="ip-play-button ip-play-button-light">BOOK NOW <ArrowIcon /></a></div></section>
    </main>
  );
}
