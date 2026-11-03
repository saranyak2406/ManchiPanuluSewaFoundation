import React, { useState } from 'react';
import { Camera, Film, Image as ImageIcon, Play, Sparkles } from 'lucide-react';
import GalleryModal from '../components/GalleryModal';
import { galleryData } from '../data/galleryData';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const categories = [
    { label: 'All Moments', value: 'All' },
    { label: 'Plants & Afforestation', value: 'Plants' },
    { label: 'Social Seva', value: 'Seva' },
    { label: 'Environmental Service', value: 'Environment' },
    { label: 'Video Features', value: 'video' }
  ];

  const filteredItems = galleryData.filter((item) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'video') return item.type === 'video';
    return item.category === activeCategory;
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
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="eyebrow-badge" style={{ backgroundColor: 'rgba(120, 201, 83, 0.15)', color: 'var(--color-sprout-light)', borderColor: 'rgba(120, 201, 83, 0.3)' }}>
              <Camera size={15} />
              <span>Visual Chronicle</span>
            </div>
            <h1 className="page-hero-title">
              Our Visual Journey of Seva
            </h1>
            <p className="page-hero-desc">
              Every photograph and video documentary captures real people in selfless action — planting future forests, nourishing tired caregivers, and breathing life back into choked waterways.
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

