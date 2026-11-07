import React, { useEffect } from 'react';
import { X, MapPin, Calendar, Film, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

export default function GalleryModal({ item, onClose, onPrev, onNext }) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div className="lightbox-modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close-btn" onClick={onClose} aria-label={t('gallery.modalClose')}>
          <X size={20} />
        </button>

        <div className="lightbox-media-wrap">
          <img src={item.image} alt={item.title} />

          {item.type === 'video' && (
            <div style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              backgroundColor: 'rgba(12, 38, 26, 0.85)',
              backdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-pill)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem'
            }}>
              <Film size={16} />
              <span>{t('gallery.videoDuration')} ({item.videoDuration})</span>
            </div>
          )}

          {/* Prev/Next Navigation Controls */}
          {onPrev && (
            <button
              onClick={onPrev}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {onNext && (
            <button
              onClick={onNext}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        <div className="lightbox-details-wrap">
          <div style={{
            display: 'inline-block',
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-forest-700)',
            marginBottom: '0.4rem'
          }}>
            {item.categoryLabel}
          </div>

          <h3 style={{ fontSize: '1.5rem', color: 'var(--color-forest-900)', marginBottom: '0.75rem' }}>
            {item.title}
          </h3>

          <p style={{ fontSize: '0.98rem', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            {item.description}
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--color-border-card)',
            fontSize: '0.88rem',
            color: 'var(--color-text-muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={16} style={{ color: 'var(--color-forest-700)' }} />
              <span>{item.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={16} style={{ color: 'var(--color-forest-700)' }} />
              <span>{item.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
