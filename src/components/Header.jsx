import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.webp";
import "./Header.css";

const links = [
  { label: "Home", to: "/" },
  { label: "Insta Play", to: "/insta-play" },
  { label: "Insta Decor", to: "/insta-decor" },
  { label: "Insta Hire", to: "/insta-hire" },
  { label: "Insta Gallery", to: "/insta-gallery" },
  { label: "About Us", to: "/about-us" },
  { label: "Contact Us", to: "/contact-us" },
  { label: "Terms & Conditions", to: "/terms" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const closeMenu = () => setOpen(false);
  const isActive = (to) => (pathname.replace(/\/+$/, "") || "/") === to;

  return (
    <header className="ip2-header">
      <div className="ip2-inner">
        <Link className="ip2-brand" to="/" aria-label="Insta Party home" onClick={closeMenu}>
          <img src={logo} alt="Insta Party logo" />
          <span className="ip2-brand-word">Instaparty<small>WE BRING THE PARTY TO YOU</small></span>
        </Link>
        <nav className={open ? "ip2-nav is-open" : "ip2-nav"} id="ip2-navigation" aria-label="Main navigation">
          {links.map(({ label, to }, index) => (
            <Link key={to} to={to} style={{ "--nav-index": index }}
              className={isActive(to) ? "is-active" : ""}
              aria-current={isActive(to) ? "page" : undefined} onClick={closeMenu}>
              {label}
            </Link>
          ))}
          <Link className="ip2-mobile-cta" to="/contact-us" onClick={closeMenu}>LET'S CELEBRATE <svg aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}><path d="M5 19 19 5M7 5h12v12" /></svg></Link>
        </nav>
        <Link className="ip2-cta" to="/contact-us" onClick={closeMenu}>LET'S CELEBRATE <span aria-hidden="true"><svg aria-hidden="true" focusable="false" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}><path d="M5 19 19 5M7 5h12v12" /></svg></span></Link>
        <button className={open ? "ip2-menu is-open" : "ip2-menu"} type="button"
          aria-label={open ? "Close menu" : "Open menu"} aria-controls="ip2-navigation"
          aria-expanded={open} onClick={() => setOpen(value => !value)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
