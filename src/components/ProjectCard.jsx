import React from 'react';
import { MapPin, Users, Target, ArrowRight } from 'lucide-react';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectCard({ project, onSelect }) {
  const { t } = useLanguage();
  const {
    title,
    categoryLabel,
    status,
    badgeColor,
    location,
    volunteersCount,
    achievedMetric,
    shortDescription,
    image
  } = project;

  return (
    <div className="project-card">
      <div className="project-thumb-wrap">
        <img src={image} alt={title} loading="lazy" />
        <span className={`project-status-tag ${badgeColor}`}>
          {status}
        </span>
      </div>

      <div className="project-card-body">
        <span className="project-category-badge">{categoryLabel}</span>
        <h4 className="project-card-title">{title}</h4>
        <p className="project-card-desc">{shortDescription}</p>

        <div className="project-metrics-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={15} style={{ color: 'var(--color-forest-700)' }} />
            <span>{location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Users size={15} style={{ color: 'var(--color-forest-700)' }} />
            <span>{volunteersCount}</span>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--color-sage-100)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.65rem 0.85rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.82rem',
          color: 'var(--color-forest-800)',
          fontWeight: '600'
        }}>
          <Target size={16} style={{ color: 'var(--color-forest-700)', flexShrink: 0 }} />
          <span>{achievedMetric}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelect && onSelect(project)}
          icon={ArrowRight}
          style={{ width: '100%' }}
        >
          {t('projects.viewDetails')}
        </Button>
      </div>
    </div>
  );
}
