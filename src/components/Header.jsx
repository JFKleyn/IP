import { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import "./Header.css";

// Keep the existing Insta Party page names while the mock-up is being built.
const links = [
  { label: "Home", href: "#home" },
  { label: "Insta Play", href: "#insta-play" },
  { label: "Insta Decor", href: "#insta-decor" },
  { label: "Insta Hire", href: "#insta-hire" },
  { label: "Insta Gallery", href: "#insta-gallery" },
  { label: "About Us", href: "#about-us" },
  { label: "Contact Us", href: "#contact" },
  { label: "Terms & Conditions", href: "#terms-and-conditions" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => window.location.hash || "#home");

  useEffect(() => {
    function updateActive() { setActive(window.location.hash || "#home"); }
    window.addEventListener("hashchange", updateActive);
    return () => window.removeEventListener("hashchange", updateActive);
  }, []);

  function select(href) {
    setActive(href);
    setOpen(false);
  }

  return (
    <header className="ip2-header">
      <div className="ip2-inner">
        <a className="ip2-brand" href="#home" aria-label="Insta Party home" onClick={() => select("#home")}>
          <img src={logo} alt="Insta Party logo" />
          <span className="ip2-brand-word">insta<span>party</span><small>WE BRING THE PARTY TO YOU</small></span>
        </a>
        <nav className={open ? "ip2-nav is-open" : "ip2-nav"} id="ip2-navigation" aria-label="Main navigation">
          {links.map(({ label, href }) => (
            <a key={href} href={href} className={active === href ? "is-active" : ""}
               aria-current={active === href ? "page" : undefined} onClick={() => select(href)}>
              {label}
            </a>
          ))}
          <a className="ip2-mobile-cta" href="#contact" onClick={() => select("#contact")}>LET'S CELEBRATE <svg aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}><path d="M5 19 19 5M7 5h12v12" /></svg></a>
        </nav>
        <a className="ip2-cta" href="#contact" onClick={() => select("#contact")}>LET'S CELEBRATE <span aria-hidden="true"><svg aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}><path d="M5 19 19 5M7 5h12v12" /></svg></span></a>
        <button className={open ? "ip2-menu is-open" : "ip2-menu"} type="button"
          aria-label={open ? "Close menu" : "Open menu"} aria-controls="ip2-navigation"
          aria-expanded={open} onClick={() => setOpen(value => !value)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
