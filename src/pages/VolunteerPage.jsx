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
    tracks: ['Vruksha Sewa'],
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableTracks = [
    { id: 'Vruksha Sewa', label: 'Vruksha Sewa (Tree Planting, Nurseries & Afforestation)' },
    { id: 'Manava Sewa', label: 'Manava Sewa (Nutritious Meals, Annadhanam & Hospital Relief)' },
    { id: 'Prakruthi Sewa', label: 'Prakruthi Sewa (Waterbody Revival, Lake Cleanups & Plastic Eradication)' },
    { id: 'Aashraya Sewa', label: 'Aashraya Sewa (Poverty Relief, Ration Kits, Blankets & Health Aid)' },
    { id: 'Eco-Education Workshops', label: 'Youth Eco-Clubs (School Workshops & Seed Balls)' },
    { id: 'Digital & Content Sewa', label: 'Digital, Media & Photography Support' }
  ];

  const handleTrackToggle = (trackId) => {
    setFormData((prev) => {
      const exists = prev.tracks.includes(trackId);
      if (exists) {
        if (prev.tracks.length === 1) return prev; // keep at least one
        return { ...prev, tracks: prev.tracks.filter((t) => t !== trackId) };
      } else {
        return { ...prev, tracks: [...prev.tracks, trackId] };
      }
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full name (at least 3 characters)';
    }

    const phoneRegex = /^[+]?[0-9\s-]{10,14}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      errs.phone = 'Please provide a valid 10-digit mobile number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.city.trim()) {
      errs.city = 'Please indicate your city or district';
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

    // Fire confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#78C953', '#E2B357', '#123826', '#38A169']
      });
    } catch (err) {
      // fallback if canvas-confetti is not rendered
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
              <span>{t('hero.volunteerBtn')}</span>
            </div>
            <h1 className="page-hero-title-exact">
              Be the Change: Volunteer in Sewa
            </h1>
            <div className="page-hero-accent-line"></div>
            <p className="page-hero-desc-exact">
              Nothing matches the fulfillment of digging soil for a future banyan tree or serving warm food to a tired hospital caretaker. Join our family of grassroots volunteers.
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
                <span>Why Join Us?</span>
              </div>
              <h2 style={{ color: 'var(--color-forest-900)', marginBottom: '1.25rem' }}>
                Meaningful Grassroots Action, Zero Bureaucracy
              </h2>
              <p style={{ lineHeight: '1.7', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                At Manchi Panulu Sewa Foundation, volunteers are not observers; they are the heart, hands, and moral compass of every drive. Whether you have 2 hours on a Sunday or want to lead monthly drives in your mandal, you are deeply welcome.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: 'var(--color-forest-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <Trees size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem' }}>Direct Environmental Impact</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Plant indigenous saplings, nurse native seed varieties, and restore depleted green spaces.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: 'var(--color-forest-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <Heart size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem' }}>Alleviate Human Suffering</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Serve fresh, hygienic food with love to daily-wage workers and patient attendants outside hospitals.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#FFFFFF', color: 'var(--color-forest-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem' }}>Volunteer Certificate of Honor</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Receive verified volunteer sewa hours and recognition for civic leadership and college credits.</p>
                  </div>
                </div>
              </div>

              {/* Quotes Card */}
              <div style={{
                backgroundColor: 'var(--color-forest-900)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-sprout-light)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Volunteer Voice
                </div>
                <blockquote style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', lineHeight: '1.6', marginBottom: '1rem', fontStyle: 'italic' }}>
                  "Spending Sunday mornings planting trees with Manchi Panulu has given my week real meaning. You go back home tired physically, but deeply at peace inside."
                </blockquote>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light-muted)' }}>
                  — Swathi Rao, Weekend Field Volunteer since 2024
                </div>
              </div>
            </div>

            {/* Right Column: Registration Form or Success Screen */}
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
                      Welcome to the Sewa Family!
                    </h3>

                    <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '1.75rem' }}>
                      Thank you, <strong>{formData.fullName}</strong>. Your volunteer registration has been logged successfully. Our regional volunteer coordinator will contact you via WhatsApp/Phone within 48 hours for onboarding into upcoming weekend drives.
                    </p>

                    <div style={{
                      backgroundColor: 'var(--color-sage-100)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      marginBottom: '2rem',
                      textAlign: 'left',
                      fontSize: '0.9rem'
                    }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-forest-900)', marginBottom: '0.4rem' }}>Registration Summary:</div>
                      <div><strong>Location:</strong> {formData.city}</div>
                      <div><strong>Availability:</strong> {formData.availability}</div>
                      <div><strong>Selected Tracks:</strong> {formData.tracks.join(', ')}</div>
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
                          tracks: ['Vruksha Sewa'],
                          message: ''
                        });
                      }}
                    >
                      Register Another Volunteer
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontSize: '1.65rem', color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>
                      Volunteer Registration Form
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem' }}>
                      Fill in your details to get enrolled in our volunteer coordination group.
                    </p>

                    <form onSubmit={handleSubmit} noValidate>
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                          placeholder="e.g. Sravanthi Reddy"
                        />
                        {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div className="form-group">
                          <label className="form-label">Mobile Number (WhatsApp) *</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`form-input ${errors.phone ? 'has-error' : ''}`}
                            placeholder="e.g. 9876543210"
                          />
                          {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
                        </div>

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
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div className="form-group">
                          <label className="form-label">City / Town / Mandal *</label>
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className={`form-input ${errors.city ? 'has-error' : ''}`}
                            placeholder="e.g. Hyderabad, Secunderabad, Vizag"
                          />
                          {errors.city && <span className="form-error-msg">{errors.city}</span>}
                        </div>

                        <div className="form-group">
                          <label className="form-label">Profession / Student</label>
                          <input
                            type="text"
                            value={formData.occupation}
                            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                            className="form-input"
                            placeholder="e.g. Software Engineer / Student"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Availability</label>
                        <select
                          value={formData.availability}
                          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                          className="form-select"
                        >
                          <option value="Weekends (Saturday & Sunday)">Weekends (Saturday & Sunday)</option>
                          <option value="Weekday Mornings">Weekday Mornings</option>
                          <option value="Flexible / As Needed">Flexible / As Needed</option>
                          <option value="Remote Digital Support">Remote Digital Support</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Areas of Interest (Select all that apply) *</label>
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
                        <label className="form-label">Short Note or Prior Volunteering Experience</label>
                        <textarea
                          rows="3"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="form-textarea"
                          placeholder="Tell us what excites you about volunteering with us..."
                        ></textarea>
                      </div>

                      <Button
                        type="submit"
                        variant="sprout"
                        size="lg"
                        icon={Send}
                        style={{ width: '100%', marginTop: '1rem' }}
                      >
                        Submit Volunteer Registration
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

