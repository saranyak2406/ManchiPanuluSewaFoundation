import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Send,
  CheckCircle2
} from 'lucide-react';
import Button from './Button';
import { complianceInfo } from '../data/statsData';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim() && emailInput.includes('@')) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer-main-grid">
          {/* Column 1: Brand & Ethos */}
          <div className="footer-brand-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.25rem' }}>
              <img
                src="/logo.jpg"
                alt="Manchi Panulu Sewa Foundation Logo"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid rgba(120, 201, 83, 0.4)',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                  flexShrink: 0
                }}
              />
              <div>
                <h3 className="footer-brand-title" style={{ marginBottom: '0.2rem', lineHeight: '1.15' }}>
                  {t('nav.brandTitle')}
                </h3>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-sprout-light)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {t('nav.brandSubtitle')}
                </div>
              </div>
            </div>
            <div className="footer-tagline">{t('footer.quote')}</div>
            <p className="footer-desc">
              {t('footer.brandDesc')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-light-muted)' }}>
                <MapPin size={16} style={{ color: 'var(--color-sprout-light)', flexShrink: 0 }} />
                <span>{complianceInfo.officeAddress}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-light-muted)' }}>
                <Phone size={16} style={{ color: 'var(--color-sprout-light)', flexShrink: 0 }} />
                <span>{complianceInfo.helplinePhone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-light-muted)' }}>
                <Mail size={16} style={{ color: 'var(--color-sprout-light)', flexShrink: 0 }} />
                <span>{complianceInfo.officialEmail}</span>
              </div>
            </div>

            <div className="social-links-row">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" fill="currentColor" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Six Core Pillars */}
          <div>
            <h4 className="footer-heading">{t('footer.pillarsTitle')}</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/services#tree-plantation" className="footer-link">
                  {t('footer.p1')}
                </Link>
              </li>
              <li>
                <Link to="/services#education-support" className="footer-link">
                  {t('footer.p2')}
                </Link>
              </li>
              <li>
                <Link to="/services#medical-help" className="footer-link">
                  {t('footer.p3')}
                </Link>
              </li>
              <li>
                <Link to="/services#annadanam" className="footer-link">
                  {t('footer.p4')}
                </Link>
              </li>
              <li>
                <Link to="/services#funeral-services" className="footer-link">
                  {t('footer.p5')}
                </Link>
              </li>
              <li>
                <Link to="/services#orphan-care" className="footer-link">
                  {t('footer.p6')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="footer-heading">{t('footer.quickNav')}</h4>
            <ul className="footer-links-list">
              <li><Link to="/about" className="footer-link">{t('nav.about')}</Link></li>
              <li><Link to="/services" className="footer-link">{t('nav.services')}</Link></li>
              <li><Link to="/projects" className="footer-link">{t('nav.projects')}</Link></li>
              <li><Link to="/gallery" className="footer-link">{t('nav.gallery')}</Link></li>
              <li><Link to="/blog" className="footer-link">{t('nav.blog')}</Link></li>
              <li><Link to="/volunteer" className="footer-link">{t('hero.volunteerBtn')}</Link></li>
              <li><Link to="/contact" className="footer-link">{t('nav.contact')}</Link></li>
              <li><Link to="/donate" className="footer-link">{t('nav.donate')}</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Direct Impact */}
          <div>
            <h4 className="footer-heading">{t('footer.stayConnectedTitle')}</h4>
            <p className="footer-desc">
              {t('footer.stayConnectedDesc')}
            </p>

            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="newsletter-input-group">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="btn btn-sprout btn-sm" aria-label={t('footer.subscribeBtn')}>
                  <Send size={15} />
                </button>
              </div>

              {subscribed && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-sprout-light)', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={16} />
                  <span>{t('footer.subscribedMsg')}</span>
                </div>
              )}
            </form>

            <div style={{ marginTop: '1.75rem' }}>
              <Button to="/donate" variant="gold" size="sm" icon={ArrowRight}>
                {t('footer.supportCauseBtn')}
              </Button>
            </div>
          </div>
        </div>

        {/* Regulatory & Transparency Disclaimer */}
        <div className="footer-compliance-bar">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <ShieldCheck size={22} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
            <div className="compliance-text">
              {t('footer.complianceNotice')}
            </div>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {t('nav.brandTitle')} {t('nav.brandSubtitle')}. {t('footer.rights')}
          </div>
          <div style={{ display: 'flex', gap: '0.85rem', fontSize: '0.82rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span>{t('footer.mandateP1')}</span>
            <span>•</span>
            <span>{t('footer.mandateP2')}</span>
            <span>•</span>
            <span>{t('footer.mandateP3')}</span>
            <span>•</span>
            <span>{t('footer.mandateP4')}</span>
            <span>•</span>
            <span>{t('footer.mandateP5')}</span>
            <span>•</span>
            <span>{t('footer.mandateP6')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
