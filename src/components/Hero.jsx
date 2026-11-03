import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowDown, Heart, Trees, Droplets } from 'lucide-react';
import CircularStamp from './CircularStamp';

export default function Hero() {
  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="envarn-hero-fullscreen">
      <div className="container envarn-hero-container">
        {/* Top Content Row: Headline, Subtitle, Buttons + Rotating Stamp */}
        <div className="envarn-hero-top">
          {/* Left Text Block */}
          <div className="envarn-hero-text-block">
            <div className="eyebrow-pill-badge">
              <Sprout size={15} />
              <span>MANCHI PANULU SEVA FOUNDATION</span>
            </div>

            <h1 className="envarn-hero-heading">
              Good Deeds Today,<br />
              Restoring the Future
            </h1>

            <p className="envarn-hero-subheading">
              Serving Humanity, Protecting Nature, Building a Sustainable Future. We're on a mission to heal the planet and uplift lives — one tree, one community, one generation at a time.
            </p>

            <div className="envarn-hero-buttons">
              <Link to="/volunteer" className="btn-envarn-primary">
                Join The Mission
              </Link>
              <Link to="/donate" className="btn-envarn-outline">
                Donate Now
              </Link>
            </div>
          </div>

          {/* Right Rotating Stamp */}
          <div className="envarn-stamp-container">
            <CircularStamp size={160} />
          </div>
        </div>

        {/* Bottom Bar: Explore Pill Anchor */}
        <div className="envarn-hero-bottom-bar">
          <button
            type="button"
            onClick={scrollToServices}
            className="hero-scroll-pill"
            aria-label="Scroll to services"
          >
            <span>Explore Our Three Pillars of Seva</span>
            <ArrowDown size={15} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
