import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Globe, ChevronDown, Sparkles } from 'lucide-react';
import Button from './Button';
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

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Our Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
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
            <Link to="/" className="brand-logo" aria-label="Manchi Panulu Seva Foundation Home">
              <div className="brand-icon-wrapper">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#143F2B" />
                  <path d="M12 4C8 8 7 13 12 18C17 13 16 8 12 4Z" fill="#78C953" />
                  <path d="M12 7V17M12 11L14.5 9M12 13.5L9.5 11.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="12" cy="3.5" r="1.5" fill="#E2B357" />
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-title">MANCHI PANULU</span>
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

            {/* Action Buttons: Language Selector + Donate Button + Mobile Toggle */}
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
                  <Globe size={16} />
                  <span>{selectedLang === 'en' ? 'EN' : selectedLang === 'te' ? 'తె' : 'हि'}</span>
                  <ChevronDown size={14} />
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

              {/* Donate Button */}
              <Button to="/donate" variant="sprout" size="sm" icon={Heart} iconPosition="left">
                Donate Now
              </Button>

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
                <span className="brand-title" style={{ fontSize: '1.15rem' }}>MANCHI PANULU</span>
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
              <Button to="/donate" variant="sprout" size="md" icon={Heart} style={{ width: '100%' }}>
                Donate Now
              </Button>
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

