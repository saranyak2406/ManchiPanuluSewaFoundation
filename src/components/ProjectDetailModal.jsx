import React, { useEffect } from 'react';
import { X, MapPin, Users, Target, CheckCircle2, Heart, ArrowRight } from 'lucide-react';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectDetailModal({ project, onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" style={{ maxWidth: '780px', padding: 0 }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" style={{ zIndex: 10 }} onClick={onClose} aria-label={t('projects.closeBtn')}>
          <X size={20} />
        </button>

        <div style={{ height: '300px', width: '100%', position: 'relative', overflow: 'hidden' }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1.5rem',
            background: 'rgba(12, 38, 26, 0.9)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            {project.status} • {project.categoryLabel}
          </div>
        </div>

        <div style={{ padding: '2rem 2.25rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-forest-900)', marginBottom: '0.75rem' }}>
            {project.title}
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={16} style={{ color: 'var(--color-forest-700)' }} />
              <span>{project.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Users size={16} style={{ color: 'var(--color-forest-700)' }} />
              <span>{project.volunteersCount}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Target size={16} style={{ color: 'var(--color-forest-700)' }} />
              <span>{project.targetMetric}</span>
            </div>
          </div>

          <p style={{ fontSize: '1.02rem', color: 'var(--color-text-main)', lineHeight: '1.7', marginBottom: '1.75rem' }}>
            {project.fullDescription}
          </p>

          <h4 style={{ fontSize: '1.15rem', color: 'var(--color-forest-900)', marginBottom: '1rem' }}>
            {t('projects.highlightsLabel')}
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {project.keyHighlights.map((highlight, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--color-text-main)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-forest-600)', flexShrink: 0, marginTop: '2px' }} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div style={{
            backgroundColor: 'var(--color-sage-100)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{t('projects.fundsLabel')}</div>
              <div style={{ fontSize: '1.35rem', fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--color-forest-900)' }}>
                {project.fundsRaised} <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>of {project.fundsTarget}</span>
              </div>
            </div>
            <Button to="/donate" variant="sprout" size="sm" icon={Heart}>
              {t('projects.supportProjectBtn')}
            </Button>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button variant="outline" size="md" onClick={onClose}>
              {t('projects.closeBtn')}
            </Button>
            <Button to="/volunteer" variant="primary" size="md" icon={ArrowRight}>
              {t('projects.joinVolunteerBtn')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
