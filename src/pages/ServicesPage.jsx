import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Trees,
  Sprout,
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
  Utensils,
  Users,
  Sparkles,
  Globe,
  Trash2,
  Droplets,
  Megaphone,
  BookOpen,
  HeartPulse,
  Activity,
  Flame,
  ShieldAlert,
  CheckCircle2,
  Send
} from 'lucide-react';
import Button from '../components/Button';
import { getServicesData } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Trees,
  Sprout,
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
  Utensils,
  Users,
  Sparkles,
  Globe,
  Trash2,
  Droplets,
  Megaphone,
  BookOpen,
  HeartPulse,
  Activity,
  Flame,
  ShieldAlert
};

export default function ServicesPage() {
  const { t, language } = useLanguage();
  const location = useLocation();
  const currentServices = getServicesData(language);

  // Auto-scroll to specific pillar if URL contains a hash (e.g. /services#tree-plantation)
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const scrollToPillar = () => {
        const el = document.getElementById(targetId);
        if (el) {
          const headerOffset = 115;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          return true;
        }
        return false;
      };

      // Execute on next tick once DOM elements are rendered
      const timer = setTimeout(scrollToPillar, 120);
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.pathname, currentServices]);

  const [requestFormOpen, setRequestFormOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    serviceType: 'Tree Plantation – Green Earth & Afforestation',
    details: ''
  });

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setRequestFormOpen(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        location: '',
        serviceType: 'Tree Plantation – Green Earth & Afforestation',
        details: ''
      });
    }, 4000);
  };

  return (
    <>
      {/* Page Hero - Matching User's Target Design Exactly */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner-unboxed">
            <div className="page-hero-eyebrow">
              <Trees size={16} />
              <span>{t('services.badge')}</span>
            </div>
            <h1 className="page-hero-title-exact">
              {t('services.heroTitle')}
            </h1>
            <div className="page-hero-accent-line"></div>
            <p className="page-hero-desc-exact">
              {t('services.heroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Deep-Dive into the 4 Pillars */}
      {currentServices.map((service, index) => {
        const isReversed = index % 2 !== 0;

        return (
          <section
            key={service.id}
            id={service.id}
            className={`section ${index % 2 === 0 ? 'section-white' : 'section-sage'}`}
          >
            <div className="container">
              {/* Header for this pillar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: 'clamp(1.5rem, 3vw, 3.5rem)',
                alignItems: 'center',
                marginBottom: 'clamp(2rem, 4vw, 3.5rem)'
              }}>
                <div className={isReversed ? 'service-pillar-text--reversed' : ''} style={{ minWidth: 0 }}>
                  <div className="eyebrow-badge" style={{ color: service.color, borderColor: service.color }}>
                    <span>{service.badge}</span>
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.55rem, 3.6vw, 3.2rem)', color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>
                    {service.pillar}
                  </h2>
                  <div style={{ fontSize: 'clamp(1.02rem, 2.2vw, 1.25rem)', fontWeight: 700, color: 'var(--color-forest-600)', marginBottom: '1.25rem' }}>
                    {service.subtitle} — <em>{service.tagline}</em>
                  </div>
                  <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: '1.8', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                    {service.summary}
                  </p>
                  <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                    <Button to="/donate" variant="sprout" size="md">
                      {t('donate.badge')}
                    </Button>
                    <button
                      type="button"
                      className="btn btn-outline btn-md"
                      onClick={() => {
                        setFormData({ ...formData, serviceType: `${service.pillar} – ${service.subtitle}` });
                        setRequestFormOpen(true);
                      }}
                    >
                      {t('services.requestSupportBtn')}
                    </button>
                  </div>
                </div>

                <div className={isReversed ? 'service-pillar-media--reversed' : ''} style={{ minWidth: 0 }}>
                  <div style={{
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)',
                    border: '4px solid #FFFFFF',
                    height: 'auto',
                    minHeight: 'clamp(190px, 44vw, 260px)',
                    maxHeight: '420px'
                  }}>
                    <img
                      src={service.heroImage}
                      alt={`${service.pillar} - ${service.subtitle}`}
                      style={{ width: '100%', height: 'clamp(190px, 44vw, 380px)', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* 4 Detailed Program Cards for this Pillar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '1.75rem'
              }}>
                {service.programs.map((prog, pIdx) => {
                  const IconComp = iconMap[prog.icon] || CheckCircle2;

                  return (
                    <div
                      key={pIdx}
                      className="service-detail-program-card"
                    >
                      <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        backgroundColor: 'var(--color-sage-100)',
                        color: 'var(--color-forest-700)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.25rem',
                        flexShrink: 0
                      }}>
                        <IconComp size={26} />
                      </div>
                      <h4 className="service-detail-program-title">
                        {prog.title}
                      </h4>
                      <p className="service-detail-program-desc">
                        {prog.description}
                      </p>
                      <div className="service-detail-program-metrics">
                        <CheckCircle2 size={14} style={{ flexShrink: 0 }} />
                        <span>{prog.metrics}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* Execution Methodology */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow-badge">
              <Sparkles size={14} />
              <span>{t('services.howWeWorkBadge')}</span>
            </div>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>{t('services.howWeWorkTitle')}</h2>
            <p className="section-subtitle" style={{ color: 'var(--color-text-light-muted)' }}>
              {t('services.howWeWorkSubtitle')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '1.5rem'
          }}>
            <div className="service-step-card">
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                color: 'var(--color-sprout-light)',
                fontWeight: 800,
                marginBottom: '0.75rem'
              }}>
                01
              </div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}>{t('services.step1Title')}</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light-muted)', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                {t('services.step1Desc')}
              </p>
            </div>

            <div className="service-step-card">
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                color: 'var(--color-sprout-light)',
                fontWeight: 800,
                marginBottom: '0.75rem'
              }}>
                02
              </div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}>{t('services.step2Title')}</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light-muted)', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                {t('services.step2Desc')}
              </p>
            </div>

            <div className="service-step-card">
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                color: 'var(--color-sprout-light)',
                fontWeight: 800,
                marginBottom: '0.75rem'
              }}>
                03
              </div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}>{t('services.step3Title')}</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light-muted)', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                {t('services.step3Desc')}
              </p>
            </div>

            <div className="service-step-card">
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                color: 'var(--color-sprout-light)',
                fontWeight: 800,
                marginBottom: '0.75rem'
              }}>
                04
              </div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}>{t('services.step4Title')}</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light-muted)', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                {t('services.step4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modal: Request Sewa in Your Area */}
      {requestFormOpen && (
        <div className="modal-overlay" onClick={() => setRequestFormOpen(false)} role="dialog" aria-modal="true">
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setRequestFormOpen(false)} aria-label="Close modal">
              ×
            </button>

            <h3 style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.6rem)', color: 'var(--color-forest-900)', marginBottom: '0.5rem', paddingRight: '2.25rem' }}>
              {t('services.modalTitle')}
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              {t('services.modalSubtitle')}
            </p>

            {formSubmitted ? (
              <div style={{
                backgroundColor: 'rgba(120, 201, 83, 0.15)',
                border: '1px solid var(--color-forest-600)',
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                textAlign: 'center',
                color: 'var(--color-forest-900)'
              }}>
                <CheckCircle2 size={42} style={{ color: 'var(--color-forest-700)', marginBottom: '0.75rem' }} />
                <h4 style={{ marginBottom: '0.5rem' }}>{t('services.modalSuccessTitle')}</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                  {t('services.modalSuccessDesc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit}>
                <div className="form-group">
                  <label className="form-label">{t('services.modalName')}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Ramesh Kumar"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">{t('services.modalPhone')}</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                      placeholder="+91 98765 XXXXX"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('services.modalEmail')}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                      placeholder="name@email.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('services.modalServiceType')}</label>
                  <input
                    type="text"
                    required
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('services.modalLocation')}</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Near Zilla Parishad High School, Amberpet"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('services.modalDetails')}</label>
                  <textarea
                    required
                    rows="3"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="form-textarea"
                    placeholder="Briefly describe the area, why assistance is needed, and any local volunteer support available."
                  ></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <Button variant="outline" size="md" onClick={() => setRequestFormOpen(false)}>
                    {t('projects.closeBtn')}
                  </Button>
                  <Button type="submit" variant="primary" size="md" icon={Send}>
                    {t('services.modalSubmit')}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
