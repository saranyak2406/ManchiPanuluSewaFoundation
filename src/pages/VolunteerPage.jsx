import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Users,
  CheckCircle2,
  Calendar,
  Heart,
  Trees,
  Sparkles,
  Award,
  Send,
  AlertCircle
} from 'lucide-react';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

export default function VolunteerPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    occupation: '',
    availability: 'Weekends (Saturday & Sunday)',
    tracks: ['Tree Plantation'],
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableTracks = [
    { id: 'Tree Plantation', label: t('volunteer.track1') },
    { id: 'Education Support', label: t('volunteer.track2') },
    { id: 'Medical Help', label: t('volunteer.track3') },
    { id: 'Annadanam', label: t('volunteer.track4') },
    { id: 'Free Funeral Services', label: t('volunteer.track5') },
    { id: 'Orphan Children Care', label: t('volunteer.track6') }
  ];

  const handleTrackToggle = (trackId) => {
    setFormData((prev) => {
      const exists = prev.tracks.includes(trackId);
      if (exists) {
        if (prev.tracks.length === 1) return prev;
        return { ...prev, tracks: prev.tracks.filter((t) => t !== trackId) };
      } else {
        return { ...prev, tracks: [...prev.tracks, trackId] };
      }
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errs.fullName = t('volunteer.errName');
    }

    const phoneRegex = /^[+]?[0-9\s-]{10,14}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      errs.phone = t('volunteer.errPhone');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = t('volunteer.errEmail');
    }

    if (!formData.city.trim()) {
      errs.city = t('volunteer.errCity');
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

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#78C953', '#E2B357', '#123826', '#38A169']
      });
    } catch (err) {
      // fallback
    }
  };

  return (
    <>
      {/* Page Hero - Matching User's Target Design Exactly */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner-unboxed">
            <div className="page-hero-eyebrow">
              <Users size={16} />
              <span>{t('volunteer.badge')}</span>
            </div>
            <h1 className="page-hero-title-exact">
              {t('volunteer.heroTitle')}
            </h1>
            <div className="page-hero-accent-line"></div>
            <p className="page-hero-desc-exact">
              {t('volunteer.heroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Benefits Section */}
      <section className="section section-sage">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 3.5rem)',
            alignItems: 'flex-start'
          }}>
            {/* Left Column: Why Volunteer */}
            <div>
              <div className="eyebrow-badge">
                <Sparkles size={14} />
                <span>{t('volunteer.whyBadge')}</span>
              </div>
              <h2 style={{ color: 'var(--color-forest-900)', marginBottom: '1.25rem' }}>
                {t('volunteer.whyTitle')}
              </h2>
              <p style={{ lineHeight: '1.7', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                {t('volunteer.whyDesc')}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: 'var(--color-forest-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <Trees size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem' }}>{t('volunteer.ben1Title')}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t('volunteer.ben1Desc')}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: 'var(--color-forest-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <Heart size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem' }}>{t('volunteer.ben2Title')}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t('volunteer.ben2Desc')}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: 'var(--color-forest-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem' }}>{t('volunteer.ben3Title')}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{t('volunteer.ben3Desc')}</p>
                  </div>
                </div>
              </div>

              {/* Quotes Card */}
              <div className="volunteer-quote-card">
                <div style={{ fontSize: '0.8rem', color: 'var(--color-sprout-light)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.08em' }}>
                  {t('volunteer.quoteBadge')}
                </div>
                <blockquote style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', lineHeight: '1.6', marginBottom: '1rem', fontStyle: 'italic', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                  {t('volunteer.quoteText')}
                </blockquote>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light-muted)', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                  {t('volunteer.quoteAuthor')}
                </div>
              </div>
            </div>

            {/* Right Column: Registration Form or Success Screen */}
            <div>
              <div className="volunteer-form-card">
                {isSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <div style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(120, 201, 83, 0.2)',
                      color: 'var(--color-forest-700)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem'
                    }}>
                      <CheckCircle2 size={40} />
                    </div>

                    <h3 style={{ fontSize: '1.8rem', color: 'var(--color-forest-900)', marginBottom: '0.75rem' }}>
                      {t('volunteer.successTitle')}
                    </h3>

                    <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '1.75rem' }}>
                      {t('volunteer.successMsg')}
                    </p>

                    <div style={{
                      backgroundColor: 'var(--color-sage-100)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      marginBottom: '2rem',
                      textAlign: 'left',
                      fontSize: '0.9rem'
                    }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-forest-900)', marginBottom: '0.4rem' }}>{t('volunteer.summaryTitle')}</div>
                      <div><strong>{t('volunteer.sumLocation')}</strong> {formData.city}</div>
                      <div><strong>{t('volunteer.sumAvail')}</strong> {formData.availability}</div>
                      <div><strong>{t('volunteer.sumTracks')}</strong> {formData.tracks.join(', ')}</div>
                    </div>

                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          phone: '',
                          email: '',
                          city: '',
                          occupation: '',
                          availability: 'Weekends (Saturday & Sunday)',
                          tracks: ['Tree Plantation'],
                          message: ''
                        });
                      }}
                    >
                      {t('volunteer.regAnotherBtn')}
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontSize: '1.65rem', color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>
                      {t('volunteer.formTitle')}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem' }}>
                      {t('volunteer.formSubtitle')}
                    </p>

                    <form onSubmit={handleSubmit} noValidate>
                      <div className="form-group">
                        <label className="form-label">{t('volunteer.fullName')}</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                          placeholder={t('volunteer.fullNamePlaceholder')}
                        />
                        {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div className="form-group">
                          <label className="form-label">{t('volunteer.phone')}</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`form-input ${errors.phone ? 'has-error' : ''}`}
                            placeholder={t('volunteer.phonePlaceholder')}
                          />
                          {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
                        </div>

                        <div className="form-group">
                          <label className="form-label">{t('volunteer.email')}</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`form-input ${errors.email ? 'has-error' : ''}`}
                            placeholder={t('volunteer.emailPlaceholder')}
                          />
                          {errors.email && <span className="form-error-msg">{errors.email}</span>}
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div className="form-group">
                          <label className="form-label">{t('volunteer.city')}</label>
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className={`form-input ${errors.city ? 'has-error' : ''}`}
                            placeholder={t('volunteer.cityPlaceholder')}
                          />
                          {errors.city && <span className="form-error-msg">{errors.city}</span>}
                        </div>

                        <div className="form-group">
                          <label className="form-label">{t('volunteer.occupation')}</label>
                          <input
                            type="text"
                            value={formData.occupation}
                            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                            className="form-input"
                            placeholder={t('volunteer.occupationPlaceholder')}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">{t('volunteer.availabilityLabel')}</label>
                        <select
                          value={formData.availability}
                          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                          className="form-select"
                        >
                          <option value="Weekends (Saturday & Sunday)">{t('volunteer.optWeekends')}</option>
                          <option value="Weekday Mornings">{t('volunteer.optWeekdays')}</option>
                          <option value="Flexible / As Needed">{t('volunteer.optFlexible')}</option>
                          <option value="Remote Digital Support">{t('volunteer.optRemote')}</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">{t('volunteer.tracksLabel')}</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.35rem' }}>
                          {availableTracks.map((track) => (
                            <label
                              key={track.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.65rem',
                                fontSize: '0.9rem',
                                color: 'var(--color-text-main)',
                                cursor: 'pointer',
                                padding: '0.5rem 0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: formData.tracks.includes(track.id) ? 'var(--color-sage-100)' : 'transparent',
                                border: `1px solid ${formData.tracks.includes(track.id) ? 'var(--color-forest-700)' : 'transparent'}`
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={formData.tracks.includes(track.id)}
                                onChange={() => handleTrackToggle(track.id)}
                                style={{ accentColor: 'var(--color-forest-700)', width: '16px', height: '16px' }}
                              />
                              <span>{track.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">{t('volunteer.noteLabel')}</label>
                        <textarea
                          rows="3"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="form-textarea"
                          placeholder={t('volunteer.notePlaceholder')}
                        ></textarea>
                      </div>

                      <Button
                        type="submit"
                        variant="sprout"
                        size="lg"
                        icon={Send}
                        style={{ width: '100%', marginTop: '1rem' }}
                      >
                        {t('volunteer.submitBtn')}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
