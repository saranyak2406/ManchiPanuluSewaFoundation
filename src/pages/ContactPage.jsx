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
import { faqData } from '../data/faqData';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
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
      errs.name = 'Please provide your full name';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters';
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
              {t('contact.heroTitle')}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem'
          }}>
            {/* Left Column: Official Contact Channels */}
            <div>
              <div className="eyebrow-badge">
                <MessageSquare size={14} />
                <span>Foundation Coordination Hub</span>
              </div>
              <h2 style={{ color: 'var(--color-forest-900)', marginBottom: '1.25rem' }}>
                Connect Directly with Our Seva Desk
              </h2>
              <p style={{ lineHeight: '1.7', color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
                Whether you are an individual wanting to volunteer, a school coordinating an environmental rally, or a family sponsoring a meal drive, our dedicated coordinators are ready to support.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {/* Office Address */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-sage-100)',
                  border: '1px solid var(--color-border-card)'
                }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: 'var(--color-forest-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem' }}>Registered Office Address (Placeholder)</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                      {complianceInfo.officeAddress}
                    </p>
                  </div>
                </div>

                {/* Helpline Phone */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-sage-100)',
                  border: '1px solid var(--color-border-card)'
                }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: 'var(--color-forest-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem' }}>Volunteer & Seva Helpline (Placeholder)</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                      {complianceInfo.helplinePhone}
                    </p>
                  </div>
                </div>

                {/* Official Email */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-sage-100)',
                  border: '1px solid var(--color-border-card)'
                }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: 'var(--color-forest-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem' }}>Official Inquiries Email</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                      {complianceInfo.officialEmail}
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--color-sage-100)',
                  border: '1px solid var(--color-border-card)'
                }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: 'var(--color-forest-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem' }}>Operating Hours</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                      {complianceInfo.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                border: '1px solid var(--color-border-card)',
                boxShadow: 'var(--shadow-md)'
              }}>
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
                      Message Received!
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>
                      Thank you, <strong>{formData.name}</strong>. Your inquiry regarding "{formData.subject}" has been successfully dispatched to our team. We will get back to you within 24 to 48 hours.
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
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontSize: '1.65rem', color: 'var(--color-forest-900)', marginBottom: '0.4rem' }}>
                      Send Us a Direct Message
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem' }}>
                      Please fill out this form and our desk will respond promptly.
                    </p>

                    <form onSubmit={handleSubmit} noValidate>
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`form-input ${errors.name ? 'has-error' : ''}`}
                          placeholder="e.g. Anjali Sharma"
                        />
                        {errors.name && <span className="form-error-msg">{errors.name}</span>}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div className="form-group">
                          <label className="form-label">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`form-input ${errors.email ? 'has-error' : ''}`}
                            placeholder="name@example.com"
                          />
                          {errors.email && <span className="form-error-msg">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                          <label className="form-label">Mobile Number</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="form-input"
                            placeholder="+91 98765 XXXXX"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Subject / Purpose of Contact</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="form-select"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Tree Plantation Partnership">Tree Plantation & Afforestation Partnership</option>
                          <option value="Hospital Food Seva Sponsorship">Hospital Food Seva Sponsorship (Annadhanam)</option>
                          <option value="Lake Cleanup & Water Conservation">Lake Cleanup & Waterbody Initiative</option>
                          <option value="Volunteer Coordination">Volunteer Coordination</option>
                          <option value="CSR & Institutional Collaboration">CSR & Institutional Collaboration</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Your Message *</label>
                        <textarea
                          rows="4"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={`form-textarea ${errors.message ? 'has-error' : ''}`}
                          placeholder="How can we assist you or collaborate with you?"
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
                        Send Message
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
              <span>Common Questions</span>
            </div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Clear answers regarding our operations, financial transparency, sapling monitoring, and volunteer commitments.
            </p>
          </div>

          <div className="faq-accordion">
            {faqData.map((faq, idx) => (
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

