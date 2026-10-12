import logo from "../assets/logo.webp";
import "./Footer.css";

const explore = [
  { label: "Home", href: "#home" },
  { label: "What We Do", href: "#magic" },
  { label: "Our Work", href: "#work" },
  { label: "Contact Us", href: "#contact" },
];

const services = [
  { label: "Insta Play", href: "#magic" },
  { label: "Insta Decor", href: "#magic" },
  { label: "Insta Hire", href: "#magic" },
];

export function Footer() {
  return (
    <footer className="ip-footer">
      <div className="ip-footer-inner">
        <div className="ip-footer-top">
          <div className="ip-footer-brand">
            <a href="#home" className="ip-footer-logo" aria-label="Insta Party - back to top">
              <img src={logo} alt="" />
              <span>insta<strong>party</strong></span>
            </a>
            <p>Big celebrations, little moments,<br />and everything worth remembering.</p>
            <span className="ip-footer-tagline">WE BRING THE PARTY TO YOU.</span>
          </div>

          <nav className="ip-footer-column" aria-label="Footer navigation">
            <h2>EXPLORE</h2>
            {explore.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
          </nav>

          <nav className="ip-footer-column" aria-label="Our services">
            <h2>THE GOOD STUFF</h2>
            {services.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
          </nav>

          <div className="ip-footer-celebrate">
            <span>GOT SOMETHING TO CELEBRATE?</span>
            <p>LET'S MAKE<br /><em>IT HAPPEN.</em></p>
            <a href="#contact" className="ip-footer-cta">LET'S CHAT <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="ip-footer-bottom">
          <span>© {new Date().getFullYear()} Insta Party. All rights reserved.</span>
          <a href="https://venturetechnologies.co" target="_blank" rel="noopener noreferrer">Website by <strong>Venture</strong> <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </footer>
  );
}
