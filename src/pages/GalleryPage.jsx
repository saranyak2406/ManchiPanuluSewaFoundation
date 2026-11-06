import React, { useState } from 'react';
import { Camera, Film, Image as ImageIcon, Play, Sparkles } from 'lucide-react';
import GalleryModal from '../components/GalleryModal';
import { galleryData } from '../data/galleryData';
import { useLanguage } from '../context/LanguageContext';

export default function GalleryPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const categories = [
    { label: 'All Moments', value: 'All' },
    { label: 'VrukshaSewa (Afforestation)', value: 'VrukshaSewa' },
    { label: 'Social Sewa', value: 'Sewa' },
    { label: 'Environmental Service', value: 'Environment' },
    { label: 'Video Features', value: 'video' }
  ];

  const filteredItems = galleryData.filter((item) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'video') return item.type === 'video';
    return (
      item.category === activeCategory ||
      ((activeCategory === 'VrukshaSewa' || activeCategory === 'Plants') && (item.category === 'VrukshaSewa' || item.category === 'Plants')) ||
      (activeCategory === 'Sewa' && item.category === 'Seva')
    );
  });

  const currentItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  const handlePrev = () => {
    if (selectedItemIndex !== null && selectedItemIndex > 0) {
      setSelectedItemIndex(selectedItemIndex - 1);
    } else {
      setSelectedItemIndex(filteredItems.length - 1);
    }
  };

  const handleNext = () => {
    if (selectedItemIndex !== null && selectedItemIndex < filteredItems.length - 1) {
      setSelectedItemIndex(selectedItemIndex + 1);
    } else {
      setSelectedItemIndex(0);
    }
  };

  return (
    <>
      {/* Page Hero - Matching User's Target Design Exactly */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner-unboxed">
            <div className="page-hero-eyebrow">
              <Camera size={16} />
              <span>{t('home.galleryBadge')}</span>
            </div>
            <h1 className="page-hero-title-exact">
              {t('home.galleryTitle')}
            </h1>
            <div className="page-hero-accent-line"></div>
            <p className="page-hero-desc-exact">
              {t('home.gallerySubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Main Section */}
      <section className="section section-sage">
        <div className="container">
          {/* Category Filter Pills */}
          <div className="gallery-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                className={`filter-pill ${activeCategory === cat.value ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Items Grid */}
          <div className="gallery-grid">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="gallery-item"
                onClick={() => setSelectedItemIndex(index)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title}`}
              >
                <img src={item.image} alt={item.title} loading="lazy" />

                {item.type === 'video' && (
                  <div className="video-play-indicator">
                    <Play size={22} fill="#0A2316" />
                  </div>
                )}

                <div className="gallery-item-overlay">
                  <span className="gallery-overlay-badge">
                    {item.type === 'video' ? `Video • ${item.videoDuration}` : item.categoryLabel}
                  </span>
                  <div className="gallery-overlay-title">{item.title}</div>
                  <div className="gallery-overlay-meta">
                    {item.location} • {item.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <GalleryModal
        item={currentItem}
        onClose={() => setSelectedItemIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}

