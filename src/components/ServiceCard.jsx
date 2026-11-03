import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Button from './Button';

export default function ServiceCard({ service }) {
  const { id, pillar, subtitle, summary, heroImage, badge, programs } = service;

  return (
    <div className="service-pillar-card" id={id}>
      <div className="pillar-image-wrap">
        <img src={heroImage} alt={`${pillar} - ${subtitle}`} loading="lazy" />
        <span className="pillar-badge">{badge}</span>
      </div>

      <div className="pillar-content">
        <h3 className="pillar-title">{pillar}</h3>
        <div className="pillar-subtitle">{subtitle}</div>
        <p className="pillar-summary">{summary}</p>

        <ul className="pillar-programs-list">
          {programs.map((prog, idx) => (
            <li key={idx} className="program-item">
              <span className="program-bullet">
                <Check size={12} strokeWidth={3} />
              </span>
              <span>{prog.title}</span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
          <Button to={`/services#${id}`} variant="outline" size="sm" icon={ArrowRight}>
            Explore Programs
          </Button>
          <Button to="/donate" variant="sprout" size="sm">
            Support
          </Button>
        </div>
      </div>
    </div>
  );
}

