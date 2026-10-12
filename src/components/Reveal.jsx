import { useEffect, useRef } from "react";
import "./Reveal.css";

export function Reveal({ children, delay = 0, direction = "up", distance = 54, threshold = 0.12 }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const element = wrapper?.firstElementChild;
    if (!wrapper || !element) return;

    const show = () => wrapper.classList.add("ip-reveal--visible");
    if (!("IntersectionObserver" in window)) {
      show();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        show();
        observer.disconnect();
      }
    }, { threshold, rootMargin: "0px 0px -35px 0px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={wrapperRef}
      className="ip-reveal"
      data-reveal-direction={direction}
      style={{
        display: "contents",
        "--ip-reveal-delay": `${delay}ms`,
        "--ip-reveal-distance": `${distance}px`,
      }}
    >
      {children}
    </div>
  );
}
