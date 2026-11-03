import React, { useState, useEffect, useRef } from 'react';
import { TreePine, HeartHandshake, Sparkles, Users, Info } from 'lucide-react';
import { statsData } from '../data/statsData';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  TreePine,
  HeartHandshake,
  Sparkles,
  Users
};

function SingleCounter({ targetValue, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const duration = 2200; // ms

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo easing function
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * targetValue);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(targetValue);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, targetValue]);

  return (
    <span ref={elementRef} className="stat-number-display">
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const { t, language } = useLanguage();

  const getTranslatedLabel = (stat) => {
    if (stat.id === 'trees-planted') return t('stats.treesLabel');
    if (stat.id === 'meals-served') return t('stats.mealsLabel');
    if (stat.id === 'water-bodies') return t('stats.waterLabel');
    if (stat.id === 'volunteers') return t('stats.volunteersLabel');
    return stat.label;
  };

  return (
    <div className="stats-banner">
      <div className="stats-grid">
        {statsData.map((stat) => {
          const IconComponent = iconMap[stat.icon] || Sparkles;

          return (
            <div key={stat.id} className="stat-item-card">
              <div className="stat-icon-wrap">
                <IconComponent size={28} />
              </div>

              <SingleCounter
                targetValue={stat.numericValue}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />

              <div className="stat-label-title">{getTranslatedLabel(stat)}</div>
              <p className="stat-desc">{stat.description}</p>
            </div>
          );
        })}
      </div>

      <div className="stats-audit-notice">
        <Info size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
        <span>{t('stats.transparencyNote')}</span>
      </div>
    </div>
  );
}

