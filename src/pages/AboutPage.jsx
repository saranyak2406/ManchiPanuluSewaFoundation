import React, { useMemo } from 'react';
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
import MilestonesTimeline from '../components/MilestonesTimeline';

export default function AboutPage() {
  const { t, language } = useLanguage();

  const milestones = useMemo(() => [
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
  ], [t]);

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

            <div className="teaser-visual-col">
              <div className="teaser-image-frame">
                <img
                  src="/hero-foundation-action.jpg"
                  alt="Manchi Panulu Sewa Foundation Nature Protection"
                  style={{ height: 'clamp(220px, 50vw, 420px)' }}
                />
              </div>

              {/* Official Trust Emblem Seal */}
              <div className="teaser-floating-card about-emblem-pill" style={{
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
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ minWidth: 0 }}>
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
            <div className="mission-vision-card">
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'rgba(34, 100, 70, 0.1)',
                color: 'var(--color-forest-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                flexShrink: 0
              }}>
                <Compass size={28} />
              </div>
              <h3 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', color: 'var(--color-forest-900)', marginBottom: '1rem', lineHeight: '1.25' }}>
                {t('about.missionTitle')}
              </h3>
              <p style={{ lineHeight: '1.8', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                {t('about.missionDesc')}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-forest-800)', fontWeight: 600 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-forest-600)', flexShrink: 0 }} />
                  <span>{t('about.missionB1')}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-forest-600)', flexShrink: 0 }} />
                  <span>{t('about.missionB2')}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-forest-600)', flexShrink: 0 }} />
                  <span>{t('about.missionB3')}</span>
                </li>
              </ul>
            </div>

            {/* Vision Card */}
            <div className="mission-vision-card">
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'rgba(226, 179, 87, 0.15)',
                color: '#A06E1A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                flexShrink: 0
              }}>
                <Sparkles size={28} />
              </div>
              <h3 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', color: 'var(--color-forest-900)', marginBottom: '1rem', lineHeight: '1.25' }}>
                {t('about.visionTitle')}
              </h3>
              <p style={{ lineHeight: '1.8', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                {t('about.visionDesc')}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-forest-800)', fontWeight: 600 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-forest-600)', flexShrink: 0 }} />
                  <span>{t('about.visionB1')}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-forest-600)', flexShrink: 0 }} />
                  <span>{t('about.visionB2')}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-forest-600)', flexShrink: 0 }} />
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

          <MilestonesTimeline milestones={milestones} />

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
