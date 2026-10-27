import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./PrivacyPolicyPage.css";

const policySections = [
  {
    title: "Information we collect",
    paragraphs: ["When you contact Insta Party or enquire about a booking, we may collect your first and last name, email address, telephone number, area, preferred booking date and time, selected services or soft-play package, and any details you choose to include in your message.", "We may also receive information you provide through direct email or other communications with us. Some technical information, such as basic server logs, may be processed when you visit the website."],
  },
  {
    title: "Why we use your information",
    paragraphs: ["We use this information to respond to enquiries, prepare quotations, arrange and manage bookings, communicate about events, provide our services, maintain necessary business records, and protect the security of our website.", "The contact form identifies the information required to submit an enquiry. Providing additional booking details is optional, but leaving them out may limit how accurately we can respond."],
  },
  {
    title: "Who receives your information",
    paragraphs: ["Enquiries submitted through this website are delivered to Insta Party's business email address. Authorised team members may access enquiries to assist with quotations and bookings.", "Venture Technologies provides website development and technical email-delivery services and may process enquiry information as a service provider. Other hosting, email, and technology providers may process information where needed to operate the website and communications. We do not sell your personal information."],
  },
  {
    title: "Instagram gallery and external links",
    paragraphs: ["Our website may display images and posts from Insta Party's public Instagram account. Selecting a post may take you to Instagram, where Meta's own privacy practices apply.", "We are not responsible for the privacy practices of third-party websites. Please review their policies when visiting external links."],
  },
  {
    title: "Cookies and website technology",
    paragraphs: ["The website may use essential technical storage or cookies necessary for functionality and security. If we introduce analytics, advertising cookies, or other optional tracking technologies, we will update this notice and implement any required choices or notices before enabling them."],
  },
  {
    title: "How we protect and retain information",
    paragraphs: ["We aim to use reasonable technical and organisational safeguards to protect personal information against unauthorised access, loss, or misuse. No internet-based system can be guaranteed completely secure.", "We retain enquiry and booking information only for as long as reasonably necessary for the purposes described here, to manage our business, or to meet applicable legal obligations, after which it should be securely deleted or de-identified."],
  },
  {
    title: "Your privacy rights",
    paragraphs: ["Subject to applicable law, you may request access to personal information we hold about you, ask for incorrect information to be corrected, request deletion where appropriate, or object to certain processing.", "You may also lodge a complaint with South Africa's Information Regulator if you believe your personal information has been handled unlawfully."],
  },
  {
    title: "International processing",
    paragraphs: ["Some website, email, or social-media service providers may process data outside South Africa. Where this happens, we will take appropriate steps required by applicable data-protection law. The specific providers and locations should be confirmed before the website goes live."],
  },
  {
    title: "Changes to this policy",
    paragraphs: ["We may update this policy when our services, website functionality, or legal obligations change. The revised version will be published on this page with an updated effective date."],
  },
];

export function PrivacyPolicyPage() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".ip-privacy [data-privacy-reveal]");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("ip-privacy-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ip-privacy-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="ip-privacy ip-privacy-motion">
      <section className="ip-privacy-hero">
        <div className="ip-privacy-hero-orb" aria-hidden="true" />
        <div className="ip-privacy-container ip-privacy-hero-inner">
          <span className="ip-privacy-kicker">YOUR TRUST MATTERS</span>
          <h1>Privacy <span>Policy.</span></h1>
          <p>Every great celebration starts with trust. Here's how Insta Party handles the information you share with us.</p>
          <span className="ip-privacy-date">Last updated: 27 October 2026</span>
        </div>
      </section>

      <section className="ip-privacy-main">
        <div className="ip-privacy-container ip-privacy-layout">
          <aside className="ip-privacy-sidebar" data-privacy-reveal>
            <span className="ip-privacy-kicker">THE IMPORTANT STUFF</span>
            <h2>Simple, clear, <span>transparent.</span></h2>
            <p>This notice explains how we handle personal information when you browse our website or contact us about an event.</p>
            <div className="ip-privacy-sidebar-card">
              <strong>Questions about your data?</strong>
              <a href="mailto:info@instaparty.co.za">info@instaparty.co.za</a>
            </div>
          </aside>

          <div className="ip-privacy-content">
            <div className="ip-privacy-intro" data-privacy-reveal>
              <h3>Who we are</h3>
              <p>Insta Party provides party planning, décor, soft play and event-related services in South Africa. For enquiries about personal information collected through this website, contact us at <a href="mailto:info@instaparty.co.za">info@instaparty.co.za</a>.</p>
              <p>We aim to handle personal information responsibly and in accordance with South Africa's Protection of Personal Information Act (POPIA).</p>
            </div>
            {policySections.map((section) => (
              <section className="ip-privacy-section" key={section.title} data-privacy-reveal>
                <h3>{section.title}</h3>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
            <section className="ip-privacy-section" data-privacy-reveal>
              <h3>Contact and complaints</h3>
              <p>To ask a privacy question or exercise your rights, email <a href="mailto:info@instaparty.co.za">info@instaparty.co.za</a>. You can also contact South Africa's Information Regulator through its official website.</p>
              <p><strong>Business address:</strong> To be confirmed by Insta Party before publication.</p>
            </section>
          </div>
        </div>
      </section>

      <section className="ip-privacy-cta" data-privacy-reveal>
        <div className="ip-privacy-container ip-privacy-cta-inner">
          <div>
            <span className="ip-privacy-kicker">LET'S MAKE MEMORIES</span>
            <h2>Questions? <span>Let's chat.</span></h2>
            <p>We're always happy to help with your next celebration.</p>
          </div>
          <Link to="/contact-us" className="ip-privacy-button">CONTACT US <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
        </div>
      </section>
    </main>
  );
}
