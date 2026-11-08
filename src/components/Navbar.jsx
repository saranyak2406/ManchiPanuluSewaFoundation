import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, Check, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.projects'), path: '/projects' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode);
    setLangDropdownOpen(false);
  };

  const handleLinkClick = (path) => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Brand Logo */}
            <Link
              to="/"
              className="brand-logo"
              aria-label="Manchi Panulu Sewa Foundation"
              onClick={() => handleLinkClick('/')}
            >
              <img
                src="/logo.jpg"
                alt="Manchi Panulu Sewa Foundation Logo"
                className="brand-logo-img"
              />
              <div className="brand-text">
                <span className="brand-title">{t('nav.brandTitle')}</span>
                <span className="brand-subtitle">{t('nav.brandSubtitle')}</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="nav-links-desktop" aria-label="Primary Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Actions: Language Switcher, Pill Button & Hamburger */}
            <div className="nav-actions">
              {/* Language Switcher */}
              <div className="lang-dropdown-wrapper">
                <button
                  type="button"
                  className="lang-btn"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  aria-expanded={langDropdownOpen}
                  aria-label="Select Language"
                >
                  <Globe size={15} />
                  <span>{language === 'en' ? 'EN' : language === 'te' ? 'తెలుగు' : 'हिन्दी'}</span>
                  <ChevronDown size={13} />
                </button>

                {langDropdownOpen && (
                  <div className="lang-menu">
                    <button
                      type="button"
                      className={`lang-item ${language === 'en' ? 'active' : ''}`}
                      onClick={() => handleLanguageSelect('en')}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span style={{ fontWeight: 600 }}>English</span>
                        <span className="lang-subtext">Global</span>
                      </div>
                      {language === 'en' && <Check size={14} style={{ color: 'var(--color-sprout)' }} />}
                    </button>
                    <button
                      type="button"
                      className={`lang-item ${language === 'te' ? 'active' : ''}`}
                      onClick={() => handleLanguageSelect('te')}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span style={{ fontWeight: 600 }}>తెలుగు (Telugu)</span>
                        <span className="lang-subtext">మాతృభాష</span>
                      </div>
                      {language === 'te' && <Check size={14} style={{ color: 'var(--color-sprout)' }} />}
                    </button>
                    <button
                      type="button"
                      className={`lang-item ${language === 'hi' ? 'active' : ''}`}
                      onClick={() => handleLanguageSelect('hi')}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span style={{ fontWeight: 600 }}>हिन्दी (Hindi)</span>
                        <span className="lang-subtext">राष्ट्रभाषा</span>
                      </div>
                      {language === 'hi' && <Check size={14} style={{ color: 'var(--color-sprout)' }} />}
                    </button>
                  </div>
                )}
              </div>

              {/* Envarn-style dark solid rounded pill button - Hidden on small mobile screens */}
              <Link to="/donate" className="btn-envarn-pill-nav nav-desktop-donate">
                {t('nav.donate')}
              </Link>

              {/* Mobile Hamburger Trigger */}
              <button
                type="button"
                className="mobile-nav-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Modal - Rendered into body via Portal so backdrop-filter NEVER traps it */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="mobile-drawer-overlay"
          onClick={() => setMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <aside className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <Link to="/" className="brand-logo" onClick={() => handleLinkClick('/')}>
                <img
                  src="/logo.jpg"
                  alt="Manchi Panulu Sewa Foundation Logo"
                  className="brand-logo-img mobile-drawer-logo"
                />
                <div className="brand-text">
                  <span className="brand-title" style={{ fontSize: '1.05rem' }}>{t('nav.brandTitle')}</span>
                  <span className="brand-subtitle" style={{ fontSize: '0.62rem' }}>{t('nav.brandSubtitle')}</span>
                </div>
              </Link>
              <button
                type="button"
                className="mobile-drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="drawer-nav-list" aria-label="Mobile Navigation List">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleLinkClick(link.path)}
                >
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </nav>

            <div className="drawer-footer">
              {/* Mobile Language Switcher Pills */}
              <div className="drawer-lang-selector">
                <button
                  type="button"
                  className={`drawer-lang-btn ${language === 'en' ? 'active' : ''}`}
                  onClick={() => handleLanguageSelect('en')}
                >
                  English
                </button>
                <button
                  type="button"
                  className={`drawer-lang-btn ${language === 'te' ? 'active' : ''}`}
                  onClick={() => handleLanguageSelect('te')}
                >
                  తెలుగు
                </button>
                <button
                  type="button"
                  className={`drawer-lang-btn ${language === 'hi' ? 'active' : ''}`}
                  onClick={() => handleLanguageSelect('hi')}
                >
                  हिन्दी
                </button>
              </div>

              <Link
                to="/donate"
                className="btn-drawer-donate"
                onClick={() => handleLinkClick('/donate')}
              >
                <Heart size={16} fill="#FFFFFF" color="#FFFFFF" />
                <span>{t('nav.donate')}</span>
              </Link>
            </div>
          </aside>
        </div>,
        document.body
      )}
    </>
  );
}
