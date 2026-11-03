import React, { useState } from 'react';
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
  ArrowRight,
  CheckCircle2,
  Send,
  HelpCircle
} from 'lucide-react';
import Button from '../components/Button';
import { servicesData } from '../data/servicesData';

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
  Megaphone
};

export default function ServicesPage() {
  const [requestFormOpen, setRequestFormOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    serviceType: 'Plants – Nature Protection',
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
        serviceType: 'Plants – Nature Protection',
        details: ''
      });
    }, 4000);
  };

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="eyebrow-badge" style={{ backgroundColor: 'rgba(120, 201, 83, 0.15)', color: 'var(--color-sprout-light)', borderColor: 'rgba(120, 201, 83, 0.3)' }}>
              <Trees size={15} />
              <span>Our Core Disciplines</span>
            </div>
            <h1 className="page-hero-title">
              Three Pillars of Dedicated Service
            </h1>
            <p className="page-hero-desc">
              Holistic community action structured across three dedicated domains: nurturing indigenous plant life, providing direct social care to vulnerable lives, and cleaning and restoring living waterbodies.
            </p>
          </div>
        </div>
      </section>

      {/* Deep-Dive into the 3 Pillars */}
      {servicesData.map((service, index) => {
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '3.5rem',
                alignItems: 'center',
                marginBottom: '3.5rem'
              }}>
                <div style={{ order: isReversed ? 2 : 1 }}>
                  <div className="eyebrow-badge" style={{ color: service.color, borderColor: service.color }}>
                    <span>{service.badge}</span>
                  </div>
                  <h2 style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>
                    {service.pillar}
                  </h2>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-forest-600)', marginBottom: '1.25rem' }}>
                    {service.subtitle} — <em>{service.tagline}</em>
                  </div>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                    {service.summary}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Button to="/donate" variant="sprout" size="md">
                      Sponsor This Pillar
                    </Button>
                    <button
                      type="button"
                      className="btn btn-outline btn-md"
                      onClick={() => {
                        setFormData({ ...formData, serviceType: `${service.pillar} – ${service.subtitle}` });
                        setRequestFormOpen(true);
                      }}
                    >
                      Request In Your Area
                    </button>
                  </div>
                </div>

                <div style={{ order: isReversed ? 1 : 2 }}>
                  <div style={{
                    borderRadius: 'var(--radius-2xl)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-lg)',
                    border: '4px solid #FFFFFF',
                    height: '420px'
                  }}>
                    <img
                      src={service.heroImage}
                      alt={`${service.pillar} - ${service.subtitle}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* 4 Detailed Program Cards for this Pillar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.75rem'
              }}>
                {service.programs.map((prog, pIdx) => {
                  const IconComp = iconMap[prog.icon] || CheckCircle2;

                  return (
                    <div
                      key={pIdx}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2rem',
                        border: '1px solid var(--color-border-card)',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
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
                        marginBottom: '1.25rem'
                      }}>
                        <IconComp size={26} />
                      </div>
                      <h4 style={{ fontSize: '1.25rem', color: 'var(--color-forest-900)', marginBottom: '0.75rem' }}>
                        {prog.title}
                      </h4>
                      <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '1.25rem', flex: 1 }}>
                        {prog.description}
                      </p>
                      <div style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--color-forest-700)',
                        paddingTop: '0.85rem',
                        borderTop: '1px solid var(--color-border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}>
                        <CheckCircle2 size={14} />
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
              <span>How We Execute</span>
            </div>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>Our 4-Stage Grassroots Framework</h2>
            <p className="section-subtitle" style={{ color: 'var(--color-text-light-muted)' }}>
              From initial need verification to multi-year stewardship, every project follows a disciplined process.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                color: 'var(--color-sprout-light)',
                fontWeight: 800,
                marginBottom: '0.75rem'
              }}>
                01
              </div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Need Assessment</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light-muted)' }}>
                Field surveys mapping soil condition, patient queues at hospitals, or waste accumulation along waterbodies.
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                color: 'var(--color-sprout-light)',
                fontWeight: 800,
                marginBottom: '0.75rem'
              }}>
                02
              </div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Community Mobilization</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light-muted)' }}>
                Engaging local school eco-clubs, neighborhood elders, and passionate volunteers to ensure mutual co-ownership.
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                color: 'var(--color-sprout-light)',
                fontWeight: 800,
                marginBottom: '0.75rem'
              }}>
                03
              </div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Disciplined Action</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light-muted)' }}>
                Procuring indigenous saplings, hygienic kitchen cooking, and specialized safety gear for systematic execution.
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                color: 'var(--color-sprout-light)',
                fontWeight: 800,
                marginBottom: '0.75rem'
              }}>
                04
              </div>
              <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Long-Term Monitoring</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-light-muted)' }}>
                Post-plantation sapling audits for 36 months and consistent water quality tracking with transparent community logs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modal: Request Seva in Your Area */}
      {requestFormOpen && (
        <div className="modal-overlay" onClick={() => setRequestFormOpen(false)} role="dialog" aria-modal="true">
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setRequestFormOpen(false)} aria-label="Close modal">
              ×
            </button>

            <h3 style={{ fontSize: '1.6rem', color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>
              Request Seva in Your Neighborhood
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Know an area that desperately needs tree plantation, a hospital perimeter requiring food relief, or an abandoned pond needing revival? Tell us!
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
                <h4 style={{ marginBottom: '0.5rem' }}>Request Received!</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                  Thank you! Our volunteer field coordinator will review the location details and reach out to you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Ramesh Kumar"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
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
                    <label className="form-label">Email Address</label>
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
                  <label className="form-label">Service Domain *</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="form-select"
                  >
                    <option value="Plants – Nature Protection">Plants – Tree Plantation & Sapling Drive</option>
                    <option value="Seva – Social Service">Seva – Food Relief & Community Support</option>
                    <option value="Environment Seva – Environmental Service">Environment Seva – Lake Cleanup & Waste Reduction</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Location / Area Name *</label>
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
                  <label className="form-label">Details of the Need / Observation *</label>
                  <textarea
                    required
                    rows="3"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="form-textarea"
                    placeholder="Briefly describe the area, why assistance is needed, and any local volunteer support available."
                  ></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <Button variant="outline" size="md" onClick={() => setRequestFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="md" icon={Send}>
                    Submit Request
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

