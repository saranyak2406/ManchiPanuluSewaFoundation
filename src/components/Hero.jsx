import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ArrowDown, Heart, Trees, Droplets, Sparkles } from 'lucide-react';
import CircularStamp from './CircularStamp';

export default function Hero() {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      // Calculate normalized mouse position from -1 to 1
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

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="envarn-hero-fullscreen-3d">
      {/* 3D Background Layer - Shifted down for zero overlap */}
      <div
        className="hero-3d-bg-layer"
        style={{
          transform: `scale(1.06) translate3d(${mousePos.x * -16}px, ${mousePos.y * -12}px, 0)`
        }}
      />

      {/* 3D Volumetric Sunbeam / Ambient Glow Layer */}
      <div
        className="hero-3d-sunbeam"
        style={{
          transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 15}px, 0)`
        }}
      />

      {/* 3D Floating Botanical Leaves Particles Layer */}
      <div className="hero-3d-leaves-layer" aria-hidden="true">
        {/* Leaf 1: Top Left Foreground */}
        <div
          className="floating-leaf leaf-1"
          style={{
            transform: `translate3d(${mousePos.x * 35}px, ${mousePos.y * 25}px, 0) rotate(${mousePos.x * 15}deg)`
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="#3D5A2B">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
          </svg>
        </div>

        {/* Leaf 2: Center Top Floating */}
        <div
          className="floating-leaf leaf-2"
          style={{
            transform: `translate3d(${mousePos.x * -25}px, ${mousePos.y * -30}px, 0) rotate(${mousePos.y * 20}deg)`
          }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="#587E3E">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
          </svg>
        </div>

        {/* Leaf 3: Right Floating Golden Accent */}
        <div
          className="floating-leaf leaf-3"
          style={{
            transform: `translate3d(${mousePos.x * 40}px, ${mousePos.y * 35}px, 0) rotate(${mousePos.x * -25}deg)`
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#C89945">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
          </svg>
        </div>

        {/* Leaf 4: Bottom Right Blurred Foreground */}
        <div
          className="floating-leaf leaf-4"
          style={{
            transform: `translate3d(${mousePos.x * -45}px, ${mousePos.y * -35}px, 0) rotate(${mousePos.y * -15}deg)`
          }}
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="#2E4822" style={{ filter: 'blur(1.5px)' }}>
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
          </svg>
        </div>
      </div>

      {/* Main Foreground Container */}
      <div className="container envarn-hero-container">
        {/* Top Content Row: Left Frosted Card + Right 3D Stamp */}
        <div className="envarn-hero-top">
          {/* Left Text Block with 3D Glass Depth */}
          <div
            className="hero-glass-text-card"
            style={{
              transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 8}px, 20px)`
            }}
          >
            <div className="eyebrow-pill-badge">
              <Sprout size={15} />
              <span>MANCHI PANULU SEVA FOUNDATION</span>
            </div>

            <h1 className="envarn-hero-heading-3d">
              Good Deeds Today,<br />
              <span className="heading-sub-gradient">Restoring the Future</span>
            </h1>

            <p className="envarn-hero-subheading-3d">
              Serving Humanity, Protecting Nature, Building a Sustainable Future. We're on a mission to heal the planet and uplift lives — one tree, one community, one generation at a time.
            </p>

            <div className="envarn-hero-buttons">
              <Link to="/volunteer" className="btn-envarn-primary-3d">
                <span>Join The Mission</span>
              </Link>
              <Link to="/donate" className="btn-envarn-outline-3d">
                <span>Donate Now</span>
              </Link>
            </div>
          </div>

          {/* Right 3D Floating Rotating Stamp */}
          <div
            className="envarn-stamp-container-3d"
            style={{
              transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -14}px, 40px)`
            }}
          >
            <CircularStamp size={170} />
          </div>
        </div>

        {/* Bottom Bar: Explore Pill Anchor with 3D Float */}
        <div className="envarn-hero-bottom-bar">
          <button
            type="button"
            onClick={scrollToServices}
            className="hero-scroll-pill-3d"
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
