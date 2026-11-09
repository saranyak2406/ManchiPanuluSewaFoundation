import React from 'react';
import {
  ShieldCheck,
  Award,
  Trees,
  Heart,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  Target,
  ArrowRight
} from 'lucide-react';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { t, language } = useLanguage();

  const milestones = [
    {
      year: t('about.m1Year'),
      title: t('about.m1Title'),
      desc: t('about.m1Desc')
    },
    {
      year: t('about.m2Year'),
      title: t('about.m2Title'),
      desc: t('about.m2Desc')
    },
    {
      year: t('about.m3Year'),
      title: t('about.m3Title'),
      desc: t('about.m3Desc')
    },
    {
      year: t('about.m4Year'),
      title: t('about.m4Title'),
      desc: t('about.m4Desc')
    }
  ];

  return (
    <>
      {/* Page Hero - Matching User's Target Design Exactly */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner-unboxed">
            <div className="page-hero-eyebrow">
              <Compass size={16} />
              <span>{t('about.badge')}</span>
            </div>
            <h1 className="page-hero-title-exact">
              {language === 'en' ? (
                <>Good Deeds Rooted in<br className="hidden-mobile-br" /> Soil, Sustained by<br className="hidden-mobile-br" /> Compassion</>
              ) : (
                t('about.heroTitle')
              )}
            </h1>
            <div className="page-hero-accent-line"></div>
            <p className="page-hero-desc-exact">
              {t('about.heroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story & Ethos */}
      <section className="section section-white">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 3.5rem)',
            alignItems: 'center'
          }}>
            <div>
              <div className="eyebrow-badge">
                <Sparkles size={14} />
                <span>{t('about.heritageBadge')}</span>
              </div>
              <h2 style={{ color: 'var(--color-forest-900)', marginBottom: '1.25rem' }}>
                {t('about.meaningTitle')}
              </h2>
              <p style={{ marginBottom: '1.25rem', lineHeight: '1.8' }}>
                {t('about.meaningP1')}
              </p>
              <p style={{ marginBottom: '1.25rem', lineHeight: '1.8' }}>
                {t('about.meaningP2')}
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--color-forest-900)', fontWeight: 600 }}>
                {t('about.mandate')}
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '4px solid #FFFFFF'
              }}>
                <img
                  src="/hero-foundation-action.jpg"
                  alt="Manchi Panulu Sewa Foundation Nature Protection"
                  style={{ width: '100%', height: '420px', objectFit: 'cover' }}
                />
              </div>

              {/* Official Trust Emblem Seal */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '16px',
                backgroundColor: '#FFFFFF',
                borderRadius: '999px',
                padding: '0.45rem 1rem 0.45rem 0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                boxShadow: '0 8px 24px rgba(12, 38, 26, 0.18)',
                border: '1.5px solid rgba(27, 77, 52, 0.15)'
              }}>
                <img
                  src="/logo.jpg"
                  alt="Official Trust Emblem"
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-forest-900)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Official Trust Emblem
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#2E7D32', fontWeight: 600 }}>
                    మంచి పనులు మన బాధ్యత
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow-badge">
              <Target size={14} />
              <span>{t('about.lightsBadge')}</span>
            </div>
            <h2 className="section-title">{t('about.missionVisionTitle')}</h2>
            <p className="section-subtitle">
              {t('about.missionVisionSubtitle')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.75rem'
          }}>
            {/* Mission Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              border: '1px solid var(--color-border-card)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'rgba(34, 100, 70, 0.1)',
                color: 'var(--color-forest-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Compass size={28} />
              </div>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--color-forest-900)', marginBottom: '1rem' }}>
                {t('about.missionTitle')}
              </h3>
              <p style={{ lineHeight: '1.8', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                {t('about.missionDesc')}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-forest-800)', fontWeight: 600 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-forest-600)' }} />
                  <span>{t('about.missionB1')}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-forest-600)' }} />
                  <span>{t('about.missionB2')}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-forest-600)' }} />
                  <span>{t('about.missionB3')}</span>
                </li>
              </ul>
            </div>

            {/* Vision Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              border: '1px solid var(--color-border-card)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'rgba(226, 179, 87, 0.15)',
                color: '#A06E1A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Sparkles size={28} />
              </div>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--color-forest-900)', marginBottom: '1rem' }}>
                {t('about.visionTitle')}
              </h3>
              <p style={{ lineHeight: '1.8', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                {t('about.visionDesc')}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-forest-800)', fontWeight: 600 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-gold)' }} />
                  <span>{t('about.visionB1')}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-gold)' }} />
                  <span>{t('about.visionB2')}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-gold)' }} />
                  <span>{t('about.visionB3')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow-badge">
              <ShieldCheck size={14} />
              <span>{t('about.tenetsBadge')}</span>
            </div>
            <h2 className="section-title">{t('about.valuesTitle')}</h2>
            <p className="section-subtitle">
              {t('about.valuesSubtitle')}
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-box">
                <Trees size={24} />
              </div>
              <h4 style={{ color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>{t('about.val1Title')}</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                {t('about.val1Desc')}
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-box">
                <Heart size={24} />
              </div>
              <h4 style={{ color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>{t('about.val2Title')}</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                {t('about.val2Desc')}
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h4 style={{ color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>{t('about.val3Title')}</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                {t('about.val3Desc')}
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-box">
                <Users size={24} />
              </div>
              <h4 style={{ color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>{t('about.val4Title')}</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                {t('about.val4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow-badge">
              <Award size={14} />
              <span>{t('about.journeyBadge')}</span>
            </div>
            <h2 className="section-title">{t('about.milestonesTitle')}</h2>
            <p className="section-subtitle">
              {t('about.milestonesSubtitle')}
            </p>
          </div>

          <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {milestones.map((m, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '1.5rem',
                backgroundColor: '#FFFFFF',
                padding: '1.75rem',
                borderRadius: 'var(--radius-lg)',
                borderLeft: '5px solid var(--color-forest-700)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: 'var(--color-forest-900)',
                  flexShrink: 0
                }}>
                  {m.year}
                </div>
                <div>
                  <h4 style={{ color: 'var(--color-forest-900)', marginBottom: '0.4rem' }}>{m.title}</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Button to="/volunteer" variant="primary" size="lg" icon={ArrowRight}>
              {t('about.writeNextChapter')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
