import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, Check } from 'lucide-react';
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

              {/* Envarn-style dark solid rounded pill button */}
              <Link to="/donate" className="btn-envarn-pill-nav">
                {t('nav.donate')}
              </Link>

              {/* Mobile Hamburger Trigger */}
              <button
                type="button"
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <div className="container mobile-menu-inner">
              <nav className="mobile-nav-links">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              <div className="mobile-drawer-bottom">
                {/* Mobile Language Switcher */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
                  <button
                    type="button"
                    className={`lang-item ${language === 'en' ? 'active' : ''}`}
                    onClick={() => handleLanguageSelect('en')}
                    style={{ padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(22, 36, 20, 0.15)' }}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    className={`lang-item ${language === 'te' ? 'active' : ''}`}
                    onClick={() => handleLanguageSelect('te')}
                    style={{ padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(22, 36, 20, 0.15)' }}
                  >
                    తెలుగు
                  </button>
                  <button
                    type="button"
                    className={`lang-item ${language === 'hi' ? 'active' : ''}`}
                    onClick={() => handleLanguageSelect('hi')}
                    style={{ padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(22, 36, 20, 0.15)' }}
                  >
                    हिन्दी
                  </button>
                </div>

                <Link to="/donate" className="btn-envarn-primary-seamless" style={{ width: '100%', textAlign: 'center' }}>
                  {t('nav.donate')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
