import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trees,
  Heart,
  Globe,
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
            <h3 className="footer-brand-title">{t('nav.brandTitle')}</h3>
            <div className="footer-tagline">{t('footer.quote')}</div>
            <p className="footer-desc">
              Dedicated to serving humanity, protecting nature, and building a sustainable future through grassroots community action across India.
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

          {/* Column 2: Three Service Pillars */}
          <div>
            <h4 className="footer-heading">Our Three Pillars</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/services#plants-nature-protection" className="footer-link">
                  Plants – Nature Protection
                </Link>
              </li>
              <li>
                <Link to="/services#social-sewa" className="footer-link">
                  Sewa – Social Service
                </Link>
              </li>
              <li>
                <Link to="/services#environment-sewa" className="footer-link">
                  Environment Sewa
                </Link>
              </li>
              <li>
                <Link to="/projects?category=Plants" className="footer-link">
                  Miyawaki Tree Drives
                </Link>
              </li>
              <li>
                <Link to="/projects?category=Sewa" className="footer-link">
                  Daily Food Relief (Annadhanam)
                </Link>
              </li>
              <li>
                <Link to="/projects?category=Environment" className="footer-link">
                  Lake & Waterbody Revival
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
            <h4 className="footer-heading">Stay Connected</h4>
            <p className="footer-desc">
              Subscribe to our monthly newsletter for stories of impact, upcoming volunteer plantation drives, and transparent project updates.
            </p>

            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="newsletter-input-group">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="btn btn-sprout btn-sm" aria-label="Subscribe to newsletter">
                  <Send size={15} />
                </button>
              </div>

              {subscribed && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-sprout-light)', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={16} />
                  <span>Thank you! You are subscribed to updates.</span>
                </div>
              )}
            </form>

            <div style={{ marginTop: '1.75rem' }}>
              <Button to="/donate" variant="gold" size="sm" icon={ArrowRight}>
                Support A Cause
              </Button>
            </div>
          </div>
        </div>

        {/* Regulatory & Transparency Disclaimer */}
        <div className="footer-compliance-bar">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <ShieldCheck size={22} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
            <div className="compliance-text">
              <strong>Statutory & Transparency Notice:</strong> {complianceInfo.foundationName} is a community-driven initiative. {complianceInfo.registeredType}. {complianceInfo.registrationPlaceholder}. Indian donors receive donation receipts ({complianceInfo.taxDeduction80G}). <strong>International Visitors Note:</strong> {complianceInfo.fcraStatus}
            </div>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Manchi Panulu Sewa Foundation. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.82rem' }}>
            <span>Protect Nature</span>
            <span>•</span>
            <span>Serve Humanity</span>
            <span>•</span>
            <span>Preserve the Environment</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
