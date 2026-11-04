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
      {/* 3D Realistic Background Layer - using newly generated clean backdrop with heart, sun, and moss */}
      <div
        className="hero-3d-bg-layer"
        style={{
          transform: `scale(1.04) translate3d(${mousePos.x * -12}px, ${mousePos.y * -8}px, 0)`
        }}
      />

      {/* 3D Volumetric Sunbeam Glow behind heart */}
      <div
        className="hero-3d-sunbeam"
        style={{
          transform: `translate3d(${mousePos.x * 16}px, ${mousePos.y * 12}px, 0)`
        }}
      />

      {/* 3D Floating Botanical Leaves Particles */}
      <div className="hero-3d-leaves-layer" aria-hidden="true">
        <div
          className="floating-leaf leaf-1"
          style={{
            transform: `translate3d(${mousePos.x * 28}px, ${mousePos.y * 18}px, 0) rotate(${mousePos.x * 10}deg)`
          }}
        >
          <svg width="42" height="42" viewBox="0 0 24 24" fill="#3D5A2B">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
          </svg>
        </div>

        <div
          className="floating-leaf leaf-2"
          style={{
            transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -22}px, 0) rotate(${mousePos.y * 16}deg)`
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#587E3E">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
          </svg>
        </div>

        <div
          className="floating-leaf leaf-3"
          style={{
            transform: `translate3d(${mousePos.x * 32}px, ${mousePos.y * 26}px, 0) rotate(${mousePos.x * -18}deg)`
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#C89945">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
          </svg>
        </div>

        <div
          className="floating-leaf leaf-4"
          style={{
            transform: `translate3d(${mousePos.x * -34}px, ${mousePos.y * -25}px, 0) rotate(${mousePos.y * -12}deg)`
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="#2E4822" style={{ filter: 'blur(1.5px)' }}>
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
          </svg>
        </div>
      </div>

      {/* Main Foreground Container */}
      <div className="container envarn-hero-container">
        {/* Top Content Row: Left Unboxed Text Perfectly Blended Into Meadow */}
        <div className="envarn-hero-top">
          <div
            className="hero-natural-text-block"
            style={{
              transform: `translate3d(${mousePos.x * 5}px, ${mousePos.y * 4}px, 0)`
            }}
          >
            {/* Minimal Subtag with Accent Lines */}
            <div className="hero-subtag-banner">
              <span className="subtag-line" aria-hidden="true"></span>
              <span className="subtag-text">{t('hero.subtag')}</span>
              <span className="subtag-line" aria-hidden="true"></span>
            </div>

            {/* Editorial Serif Heading Matching User's Image */}
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

            {/* Subtitle Matching User's Image */}
            <p className="envarn-hero-subheading-exact">
              {t('hero.subtitleLine1')}<br className="hidden-mobile-br" />
              {t('hero.subtitleLine2')}
            </p>

            {/* Two Action Buttons Matching User's Image */}
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
          </div>
        </div>
      </div>
    </section>
  );
}
