import React, { useState } from 'react';
import { Camera, Film, Image as ImageIcon, Play, Sparkles } from 'lucide-react';
import GalleryModal from '../components/GalleryModal';
import { getGalleryData } from '../data/galleryData';
import { useLanguage } from '../context/LanguageContext';

export default function GalleryPage() {
  const { t, language } = useLanguage();
  const currentGallery = getGalleryData(language);

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const categories = [
    { label: t('gallery.allMoments'), value: 'All' },
    { label: t('gallery.catVruksha'), value: 'TreePlantation' },
    { label: t('gallery.catEducation'), value: 'Education' },
    { label: t('gallery.catMedical'), value: 'Medical' },
    { label: t('gallery.catAnnadanam'), value: 'Annadanam' },
    { label: t('gallery.catFuneral'), value: 'Funeral' },
    { label: t('gallery.catOrphan'), value: 'Orphan' },
    { label: t('gallery.catEnv'), value: 'Environment' },
    { label: t('gallery.catVideo'), value: 'video' }
  ];

  const filteredItems = currentGallery.filter((item) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'video') return item.type === 'video';
    return (
      item.category === activeCategory ||
      ((activeCategory === 'TreePlantation' || activeCategory === 'VrukshaSewa') &&
        (item.category === 'TreePlantation' || item.category === 'VrukshaSewa')) ||
      ((activeCategory === 'Annadanam' || activeCategory === 'Sewa') &&
        (item.category === 'Annadanam' || item.category === 'Sewa'))
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
              <span>{t('gallery.badge')}</span>
            </div>
            <h1 className="page-hero-title-exact">
              {t('gallery.heroTitle')}
            </h1>
            <div className="page-hero-accent-line"></div>
            <p className="page-hero-desc-exact">
              {t('gallery.heroDesc')}
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
                    <Play size={20} fill="#FFFFFF" />
                  </div>
                )}

                <div className="gallery-item-overlay">
                  <span className="gallery-overlay-badge">{item.categoryLabel}</span>
                  <div className="gallery-overlay-title">{item.title}</div>
                  <div className="gallery-overlay-meta">{item.location} • {item.date}</div>
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
