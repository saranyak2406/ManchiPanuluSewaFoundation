import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trees, Droplets, Sparkles, Sprout } from 'lucide-react';
import CircularStamp from './CircularStamp';

export default function Hero() {
  return (
    <section className="envarn-hero-section">
      <div className="container">
        {/* Top Split: Left Content + Right Circular Stamp */}
        <div className="envarn-hero-top">
          {/* Left Text & Call to Actions */}
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

          {/* Right Circular Stamp Emblem */}
          <div className="envarn-stamp-container">
            <CircularStamp size={160} />
          </div>
        </div>

        {/* Full Landscape Image Showcase with 3 Pillar Interactive Badges */}
        <div className="hero-landscape-banner-wrap">
          <div className="hero-landscape-card">
            <img
              src="/hero-heart-nature.jpg"
              alt="Manchi Panulu Seva Foundation - Hands of Humanity and Nature Holding Sacred Green Heart"
              className="hero-landscape-full-img"
              loading="eager"
            />

            {/* Pillar 1 Badge: Seva / Humanity */}
            <div className="landscape-floating-pill pill-seva">
              <span className="pill-dot dot-seva"></span>
              <Heart size={14} className="pill-icon" />
              <span>Seva: Social Service</span>
            </div>

            {/* Pillar 2 Badge: Environment / Sacred Waters */}
            <div className="landscape-floating-pill pill-environment">
              <span className="pill-dot dot-env"></span>
              <Droplets size={14} className="pill-icon" />
              <span>Environment: Water & Planet</span>
            </div>

            {/* Pillar 3 Badge: Plants / Nature Protection */}
            <div className="landscape-floating-pill pill-plants">
              <span className="pill-dot dot-plants"></span>
              <Trees size={14} className="pill-icon" />
              <span>Plants: Nature Protection</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
