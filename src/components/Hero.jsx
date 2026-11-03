import React from 'react';
import { ArrowRight, Heart, Trees, ShieldCheck, Sparkles, Sprout, Users } from 'lucide-react';
import Button from './Button';

export default function Hero() {
  return (
    <section className="hero-wrapper">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Bold Typography & CTAs */}
          <div className="hero-content">
            <div className="eyebrow-badge">
              <Sprout size={16} />
              <span>MANCHI PANULU SEVA FOUNDATION</span>
            </div>

            <h1 className="hero-title">
              Good Deeds Today, <br />
              <span className="highlight-gold">A Better Tomorrow.</span>
            </h1>

            <p className="hero-subtitle">
              Serving Humanity, Protecting Nature, Building a Sustainable Future. Join hands with our grassroots movement to plant indigenous forests, nourish lives in need, and revive our sacred waterways.
            </p>

            <div className="hero-actions">
              <Button to="/volunteer" variant="primary" size="lg" icon={ArrowRight}>
                Join Our Mission
              </Button>
              <Button to="/donate" variant="sprout" size="lg" icon={Heart} iconPosition="left">
                Donate Now
              </Button>
            </div>

            {/* Trust & Transparency Badges */}
            <div className="hero-trust-badges">
              <div className="trust-item">
                <ShieldCheck size={20} />
                <span>100% Grassroots NGO</span>
              </div>
              <div className="trust-item">
                <Trees size={20} />
                <span>Native Flora Conservation</span>
              </div>
              <div className="trust-item">
                <Users size={20} />
                <span>Volunteer Powered</span>
              </div>
            </div>
          </div>

          {/* Right Column: Nature Visual Composition with Floating Cards */}
          <div className="hero-visual-card">
            {/* Top Floating Badge */}
            <div className="floating-stat-badge badge-top">
              <div className="badge-icon">
                <Trees size={22} />
              </div>
              <div>
                <div className="badge-text-title">Plants & Nature</div>
                <div className="badge-text-val">48,500+ Saplings</div>
              </div>
            </div>

            {/* Main Hero Image */}
            <div className="hero-image-frame">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
                alt="Manchi Panulu Seva Foundation Nature Protection"
                loading="eager"
              />
            </div>

            {/* Bottom Floating Badge */}
            <div className="floating-stat-badge badge-bottom">
              <div className="badge-icon" style={{ backgroundColor: 'rgba(226, 179, 87, 0.2)', color: '#8F661A' }}>
                <Heart size={22} />
              </div>
              <div>
                <div className="badge-text-title">Seva in Action</div>
                <div className="badge-text-val">1,25,000+ Meals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

