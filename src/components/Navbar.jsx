import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, Heart } from 'lucide-react';
import LanguageNoticeModal from './LanguageNoticeModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [langModalOpen, setLangModalOpen] = useState(false);
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Our Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact us', path: '/contact' },
  ];

  const handleLanguageSelect = (langCode) => {
    setSelectedLang(langCode);
    setLangDropdownOpen(false);
    if (langCode !== 'en') {
      setLangModalOpen(true);
    }
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Brand Logo */}
            <Link to="/" className="brand-logo" aria-label="Manchi Panulu Seva Foundation">
              <div className="brand-icon-wrapper">
                {/* Sprout emblem inside curved badge */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 14C8.5 14 6 11.5 6 8C9.5 8 12 10.5 12 14Z" fill="currentColor" />
                  <path d="M12 16C15.5 16 18 13.5 18 10C14.5 10 12 12.5 12 16Z" fill="currentColor" />
                  <path d="M12 9C10.5 6.5 12 3 12 3C12 3 13.5 6.5 12 9Z" fill="currentColor" />
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-title">Manchi Panulu</span>
                <span className="brand-subtitle">SEVA FOUNDATION</span>
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

            {/* Right Actions: Language Switcher & Pill Button */}
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
                  <span>{selectedLang === 'en' ? 'EN' : selectedLang === 'te' ? 'తె' : 'हि'}</span>
                  <ChevronDown size={13} />
                </button>

                {langDropdownOpen && (
                  <div className="lang-menu">
                    <button
                      type="button"
                      className={`lang-item ${selectedLang === 'en' ? 'active' : ''}`}
                      onClick={() => handleLanguageSelect('en')}
                    >
                      <span>English</span>
                      <span className="lang-subtext">Default</span>
                    </button>
                    <button
                      type="button"
                      className={`lang-item ${selectedLang === 'te' ? 'active' : ''}`}
                      onClick={() => handleLanguageSelect('te')}
                    >
                      <span>తెలుగు (Telugu)</span>
                      <span className="lang-subtext">Preview</span>
                    </button>
                    <button
                      type="button"
                      className={`lang-item ${selectedLang === 'hi' ? 'active' : ''}`}
                      onClick={() => handleLanguageSelect('hi')}
                    >
                      <span>हिन्दी (Hindi)</span>
                      <span className="lang-subtext">Preview</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Envarn-style dark solid rounded pill button */}
              <Link to="/donate" className="btn-envarn-pill-nav">
                Donate Now
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                className="mobile-nav-toggle"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open Navigation Menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)} />
          <div className="mobile-drawer">
            <div className="drawer-header">
              <div className="brand-text">
                <span className="brand-title" style={{ fontSize: '1.2rem' }}>Manchi Panulu</span>
                <span className="brand-subtitle">SEVA FOUNDATION</span>
              </div>
              <button
                type="button"
                className="mobile-nav-toggle"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="drawer-nav-list">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}
                >
                  {link.name}
                </NavLink>
              ))}
              <NavLink to="/volunteer" className={({ isActive }) => `drawer-nav-item ${isActive ? 'active' : ''}`}>
                Join Our Mission
              </NavLink>
            </nav>

            <div className="drawer-footer">
              <Link to="/donate" className="btn-envarn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Donate Now
              </Link>
              <div style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                "Good Deeds Today, A Better Tomorrow"
              </div>
            </div>
          </div>
        </>
      )}

      {/* Language Preview Modal */}
      <LanguageNoticeModal
        isOpen={langModalOpen}
        onClose={() => setLangModalOpen(false)}
        selectedLang={selectedLang}
      />
    </>
  );
}
