import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import "./Footer.css";

const explore = [
  { label: "Home", to: "/" },
  { label: "What We Do", to: "/insta-play" },
  { label: "Our Work", to: "/insta-gallery" },
  { label: "Contact Us", to: "/contact" },
];

const services = [
  { label: "Insta Play", to: "/insta-play" },
  { label: "Insta Decor", to: "/insta-decor" },
  { label: "Insta Hire", to: "/insta-hire" },
];

const socials = {
  facebook: "https://www.facebook.com/share/1D2jckWf48/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/instapartydurban/",
  whatsapp: "https://wa.me/27732791265",
};

function SocialIcon({ type }) {
  if (type === "facebook") return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.78-3.9 1.1 0 2.25.2 2.25.2v2.47H15.2c-1.25 0-1.64.77-1.64 1.56V12h2.79l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" /></svg>;
  if (type === "instagram") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5L3 20.7l1.4-4.8a8.5 8.5 0 1 1 16.1-4.1Z" />
      <path d="M8.6 8.1c-.4-.5-.8-.4-1.1.1-.5.8-.4 1.8.3 3 .8 1.5 2.4 3 4 3.9 1.5.8 2.7.9 3.5.2.4-.4.6-1.1.3-1.3l-2.1-1c-.3-.1-.5 0-.7.3l-.7.8c-1.3-.6-2.4-1.6-3-2.9l.7-.7c.2-.2.3-.5.2-.8Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ArrowIcon() {
  return <svg aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 19 5M7 5h12v12" /></svg>;
}

export function Footer() {
  return (
    <footer className="ip-footer">
      <div className="ip-footer-inner">
        <div className="ip-footer-top">
          <div className="ip-footer-brand">
            <Link to="/" className="ip-footer-logo" aria-label="Insta Party - Home">
              <img src={logo} alt="" />
              <span>Instaparty</span>
            </Link>
            <p>Big celebrations, little moments,<br />and everything worth remembering.</p>
            <span className="ip-footer-tagline">WE BRING THE PARTY TO YOU.</span>
            <div className="ip-footer-socials" aria-label="Social media">
              {Object.entries(socials).map(([type, url]) => (
                <a
                  key={type}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Insta Party ${type}`}
                  title={`Visit Insta Party on ${type === "whatsapp" ? "WhatsApp" : type === "facebook" ? "Facebook" : "Instagram"}`}
                >
                  <SocialIcon type={type} />
                </a>
              ))}
            </div>
          </div>

          <nav className="ip-footer-column" aria-label="Footer navigation">
            <h2>EXPLORE</h2>
            {explore.map((item) => <Link to={item.to} key={item.label}>{item.label}</Link>)}
          </nav>

          <nav className="ip-footer-column" aria-label="Our services">
            <h2>THE GOOD STUFF</h2>
            {services.map((item) => <Link to={item.to} key={item.label}>{item.label}</Link>)}
          </nav>

          <div className="ip-footer-celebrate">
            <span>GOT SOMETHING TO CELEBRATE?</span>
            <p>LET'S MAKE<br /><em>IT HAPPEN.</em></p>
            <Link to="/contact-us" className="ip-footer-cta">LET'S CHAT <span aria-hidden="true"><ArrowIcon /></span></Link>
          </div>
        </div>

        <div className="ip-footer-bottom">
          <span>© {new Date().getFullYear()} Insta Party. All rights reserved.</span>
          <Link to="/privacypolicy" className="ip-footer-privacy">Privacy Policy</Link>
          <a href="https://venturetechnologies.co" target="_blank" rel="noopener noreferrer">Website by <strong>Venture</strong> <span aria-hidden="true"><ArrowIcon /></span></a>
        </div>
      </div>
    </footer>
  );
}
