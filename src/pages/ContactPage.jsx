import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare
} from 'lucide-react';
import Button from '../components/Button';
import { complianceInfo } from '../data/statsData';
import { getFaqData } from '../data/faqData';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
  const { t, language } = useLanguage();
  const currentFaqs = getFaqData(language);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = t('contact.errName');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = t('contact.errEmail');
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = t('contact.errMessage');
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Page Hero - Matching User's Target Design Exactly */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner-unboxed">
            <div className="page-hero-eyebrow">
              <Mail size={16} />
              <span>{t('contact.badge')}</span>
            </div>
            <h1 className="page-hero-title-exact">
              {language === 'en' ? (
                <>We Would Love<br />to Hear From You</>
              ) : (
                t('contact.heroTitle')
              )}
            </h1>
            <div className="page-hero-accent-line"></div>
            <p className="page-hero-desc-exact">
              {t('contact.heroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards & Form Split Section */}
      <section className="section section-white">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 3.5rem)'
          }}>
            {/* Left Column: Official Contact Channels */}
            <div>
              <div className="eyebrow-badge">
                <MessageSquare size={14} />
                <span>{t('contact.hubBadge')}</span>
              </div>
              <h2 style={{ color: 'var(--color-forest-900)', marginBottom: '1.25rem' }}>
                {t('contact.hubTitle')}
              </h2>
              <p style={{ lineHeight: '1.7', color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
                {t('contact.hubDesc')}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {/* Office Address */}
                <div className="contact-info-card">
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: 'var(--color-forest-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}>{t('contact.officeTitle')}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.5', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                      {complianceInfo.officeAddress}
                    </p>
                  </div>
                </div>

                {/* Helpline Phone */}
                <div className="contact-info-card">
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: 'var(--color-forest-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={22} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}>{t('contact.helplineTitle')}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                      {complianceInfo.helplinePhone}
                    </p>
                  </div>
                </div>

                {/* Official Email */}
                <div className="contact-info-card">
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: 'var(--color-forest-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}>{t('contact.emailTitle')}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', overflowWrap: 'break-word', wordBreak: 'break-all' }}>
                      {complianceInfo.officialEmail}
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="contact-info-card">
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: 'var(--color-forest-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={22} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}>{t('contact.hoursTitle')}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                      {complianceInfo.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div>
              <div className="contact-form-card">
                {isSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <div style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(120, 201, 83, 0.2)',
                      color: 'var(--color-forest-700)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem'
                    }}>
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 style={{ fontSize: '1.75rem', color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>
                      {t('contact.successTitle')}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>
                      {t('contact.successDesc')}
                    </p>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'General Inquiry',
                          message: ''
                        });
                      }}
                    >
                      {t('contact.sendAnotherBtn')}
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontSize: '1.65rem', color: 'var(--color-forest-900)', marginBottom: '0.4rem' }}>
                      {t('contact.formTitle')}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem' }}>
                      {t('contact.formSubtitle')}
                    </p>

                    <form onSubmit={handleSubmit} noValidate>
                      <div className="form-group">
                        <label className="form-label">{t('contact.formName')}</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`form-input ${errors.name ? 'has-error' : ''}`}
                          placeholder={t('contact.formNamePlaceholder')}
                        />
                        {errors.name && <span className="form-error-msg">{errors.name}</span>}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
                        <div className="form-group">
                          <label className="form-label">{t('contact.formEmail')}</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`form-input ${errors.email ? 'has-error' : ''}`}
                            placeholder={t('contact.formEmailPlaceholder')}
                          />
                          {errors.email && <span className="form-error-msg">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                          <label className="form-label">{t('contact.formPhone')}</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="form-input"
                            placeholder={t('contact.formPhonePlaceholder')}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">{t('contact.formSubject')}</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="form-select"
                        >
                          <option value="General Inquiry">{t('contact.optGeneral')}</option>
                          <option value="Tree Plantation Partnership">{t('contact.optTree')}</option>
                          <option value="Hospital Food Sewa Sponsorship">{t('contact.optFood')}</option>
                          <option value="Lake Cleanup & Water Conservation">{t('contact.optWater')}</option>
                          <option value="Volunteer Coordination">{t('contact.optVolunteer')}</option>
                          <option value="CSR & Institutional Collaboration">{t('contact.optCsr')}</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">{t('contact.formMessage')}</label>
                        <textarea
                          rows="4"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={`form-textarea ${errors.message ? 'has-error' : ''}`}
                          placeholder={t('contact.formMessagePlaceholder')}
                        ></textarea>
                        {errors.message && <span className="form-error-msg">{errors.message}</span>}
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        icon={Send}
                        style={{ width: '100%', marginTop: '0.75rem' }}
                      >
                        {t('contact.sendBtn')}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow-badge">
              <HelpCircle size={14} />
              <span>{t('contact.faqBadge')}</span>
            </div>
            <h2 className="section-title">{t('contact.faqTitle')}</h2>
            <p className="section-subtitle">
              {t('contact.faqSubtitle')}
            </p>
          </div>

          <div className="faq-accordion">
            {currentFaqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${openFaqIndex === idx ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaqIndex === idx}
                >
                  <span>{faq.question}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp size={20} style={{ color: 'var(--color-forest-700)', flexShrink: 0 }} />
                  ) : (
                    <ChevronDown size={20} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
