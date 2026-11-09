import React, { useEffect } from 'react';
import { X, Calendar, Clock, User, Share2, Tag, ArrowLeft } from 'lucide-react';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

export default function BlogModal({ article, onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" style={{ maxWidth: '820px', padding: 0 }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" style={{ zIndex: 10 }} onClick={onClose} aria-label={t('blog.closeBtn')}>
          <X size={20} />
        </button>

        <div style={{ height: 'clamp(200px, 35vw, 320px)', width: '100%', position: 'relative', overflow: 'hidden' }}>
          <img
            src={article.image}
            alt={article.title}
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
            {article.categoryLabel}
          </div>
        </div>

        <div className="modal-inner-body">
          <h2 style={{ fontSize: 'clamp(1.35rem, 3.5vw, 1.85rem)', color: 'var(--color-forest-900)', marginBottom: '1rem', lineHeight: '1.25' }}>
            {article.title}
          </h2>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.25rem',
            marginBottom: '1.5rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--color-border-card)',
            fontSize: '0.88rem',
            color: 'var(--color-text-muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={15} style={{ color: 'var(--color-forest-700)' }} />
              <span>{article.author}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={15} style={{ color: 'var(--color-forest-700)' }} />
              <span>{article.date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={15} style={{ color: 'var(--color-forest-700)' }} />
              <span>{article.readTime}</span>
            </div>
          </div>

          <div style={{
            fontSize: '1.02rem',
            color: 'var(--color-text-main)',
            lineHeight: '1.8',
            marginBottom: '2rem',
            whiteSpace: 'pre-line'
          }}>
            {article.content}
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--color-sage-100)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--color-forest-800)'
                }}
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button variant="outline" size="sm" onClick={onClose} icon={ArrowLeft} iconPosition="left">
              {t('blog.backToArticles')}
            </Button>
            <Button to="/volunteer" variant="sprout" size="sm">
              {t('blog.participateBtn')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
