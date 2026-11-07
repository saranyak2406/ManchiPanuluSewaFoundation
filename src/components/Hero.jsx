import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x, y });
      });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: 0, y: 0 });
    };

    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove);
      heroEl.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={heroRef} className="envarn-hero-fullscreen-3d" id="home">
      {/* 3D Realistic Background Layer using the User's Image */}
      <div
        className="hero-3d-bg-layer"
        style={{
          transform: `scale(1.03) translate3d(${mousePos.x * -10}px, ${mousePos.y * -6}px, 0)`
        }}
      />

      {/* Subtle Depth Scrim for Pristine Legibility */}
      <div className="hero-backdrop-scrim" aria-hidden="true" />

      {/* Main Foreground Container */}
      <div className="container envarn-hero-container">
        <div className="envarn-hero-top">
          <div
            className="hero-natural-text-block"
            style={{
              transform: `translate3d(${mousePos.x * 4}px, ${mousePos.y * 3}px, 0)`
            }}
          >
            {/* Minimal Subtag with Accent Lines */}
            <div className="hero-subtag-banner">
              <span className="subtag-line" aria-hidden="true"></span>
              <span className="subtag-text">{t('hero.subtag')}</span>
              <span className="subtag-line" aria-hidden="true"></span>
            </div>

            {/* Editorial Serif Heading */}
            <h1 className="envarn-hero-heading-exact">
              {t('hero.titlePart1')}<br />
              {t('hero.titlePart2')}{' '}
              <span className="highlight-future">
                {t('hero.titleHighlight')}
                <svg
                  className="brush-swoosh"
                  viewBox="0 0 210 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9.5C52 4.2 130 3.2 206 8.5C146 11.8 72 11.2 3 9.5Z"
                    fill="#2E7D32"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="envarn-hero-subheading-exact">
              {t('hero.subtitleLine1')}{' '}<br className="hidden-mobile-br" />{t('hero.subtitleLine2')}
            </p>

            {/* Two Action Buttons */}
            <div className="envarn-hero-buttons-exact">
              <Link to="/donate" className="btn-hero-donate-exact" aria-label="Donate Now to Manchi Panulu Sewa Foundation">
                <Heart size={18} fill="#FFFFFF" color="#FFFFFF" className="btn-icon-heart" />
                <span>{t('hero.donateBtn')}</span>
                <ArrowRight size={17} className="btn-icon-arrow" />
              </Link>
              <Link to="/volunteer" className="btn-hero-mission-exact" aria-label="Join Our Mission as a Volunteer">
                <Users size={19} className="btn-icon-users" />
                <span>{t('hero.volunteerBtn')}</span>
              </Link>
            </div>

            {/* Four Pillars Quick Navigation Badges */}
            <div className="hero-pillars-pill-row">
              <Link to="/services#vrukshasewa" className="hero-pillar-chip">
                <span className="pillar-chip-dot dot-vruksha"></span>
                <span>{t('hero.chipVruksha')}</span>
              </Link>
              <Link to="/services#manava-sewa" className="hero-pillar-chip">
                <span className="pillar-chip-dot dot-manava"></span>
                <span>{t('hero.chipManava')}</span>
              </Link>
              <Link to="/services#prakruthi-sewa" className="hero-pillar-chip">
                <span className="pillar-chip-dot dot-prakruthi"></span>
                <span>{t('hero.chipPrakruthi')}</span>
              </Link>
              <Link to="/services#aashraya-sewa" className="hero-pillar-chip">
                <span className="pillar-chip-dot dot-aashraya"></span>
                <span>{t('hero.chipAashraya')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
