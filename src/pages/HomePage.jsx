import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trees,
  Heart,
  Globe,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  Calendar,
  Eye,
  X
} from 'lucide-react';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import StatsCounter from '../components/StatsCounter';
import ProjectDetailModal from '../components/ProjectDetailModal';
import BlogModal from '../components/BlogModal';
import Button from '../components/Button';
import { getProjectsData } from '../data/projectsData';
import { getGalleryData } from '../data/galleryData';
import { getBlogData } from '../data/blogData';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bannerModalOpen, setBannerModalOpen] = useState(false);

  const featuredProjects = getProjectsData(language).slice(0, 3);
  const previewGallery = getGalleryData(language).slice(0, 6);
  const latestArticles = getBlogData(language).slice(0, 3);

  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Impact Counters Banner */}
      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className="container">
          <StatsCounter />
        </div>
      </section>

      {/* 3. Official Foundation Charter & Registration Banner */}
      <section className="section charter-banner-section">
        <div className="container">
          <div
            className="charter-banner-card"
            onClick={() => setBannerModalOpen(true)}
            title={language === 'te' ? 'పూర్తి బ్యానర్ చూడటానికి క్లిక్ చేయండి' : language === 'hi' ? 'पूरा बैनर देखने के लिए क्लिक करें' : 'Click to view full foundation banner'}
          >
            <img
              src="/foundation-banner.jpg"
              alt="Manchi Panulu Sewa Foundation - Reg No 420/2026 - Service to Humanity Our Motto"
              className="charter-banner-image"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* 4. About the Foundation Teaser */}
      <section className="section section-white">
        <div className="container">
          <div className="unboxed-flow-wrapper">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(1.5rem, 3vw, 3.5rem)',
              alignItems: 'center'
            }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '4px solid #FFFFFF'
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80"
                    alt="Manchi Panulu Sewa Foundation Plantation"
                    style={{ width: '100%', height: '440px', objectFit: 'cover' }}
                  />
                </div>

                {/* Floating Ethos Quote Card */}
                <div style={{
                  position: 'absolute',
                  bottom: '-1.5rem',
                  right: '0.5rem',
                  maxWidth: 'calc(100% - 1rem)',
                  backgroundColor: 'var(--color-forest-900)',
                  color: '#FFFFFF',
                  padding: '1.25rem 1.75rem',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-sprout-light)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    {t('home.aboutBadge')}
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800 }}>
                    "{t('home.quote')}"
                  </div>
                </div>
              </div>

              <div>
                <div className="eyebrow-badge">
                  <Compass size={14} />
                  <span>{t('home.aboutBadge')}</span>
                </div>
                <h2 style={{ marginBottom: '1.25rem', color: 'var(--color-forest-900)' }}>
                  {t('home.aboutTitle')}
                </h2>
                <p style={{ marginBottom: '1.25rem', lineHeight: '1.7' }}>
                  {t('home.aboutP1')}
                </p>
                <p style={{ marginBottom: '1.75rem', lineHeight: '1.7' }}>
                  {t('home.aboutP2')}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-forest-800)' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--color-forest-600)' }} />
                    <span>{t('home.governance')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-forest-800)' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--color-forest-600)' }} />
                    <span>{t('home.nativePolicy')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-forest-800)' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--color-forest-600)' }} />
                    <span>{t('home.hygienicFood')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-forest-800)' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--color-forest-600)' }} />
                    <span>{t('home.zeroWaste')}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Button to="/about" variant="primary" size="md" icon={ArrowRight}>
                    {t('home.discoverStory')}
                  </Button>
                  <Button to="/volunteer" variant="outline" size="md">
                    {t('home.becomeVolunteer')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. Four Core Pillars of Sewa Showcase */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-header" style={{ maxWidth: '720px', margin: '0 auto 1.25rem auto', textAlign: 'center' }}>
            <div className="eyebrow-badge" style={{ margin: '0 auto 0.85rem auto' }}>
              <Sparkles size={14} />
              <span>{t('home.pillarsBadge')}</span>
            </div>
            <h2 style={{ color: 'var(--color-forest-900)', marginBottom: '1rem', fontSize: 'clamp(2rem, 3.2vw, 2.6rem)' }}>
              {t('home.pillarsTitle')}
            </h2>
            <p style={{ color: 'var(--color-forest-700)', fontSize: '1.05rem', lineHeight: '1.6' }}>
              {t('home.pillarsSubtitle')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1.5rem'
          }}>
            {/* Pillar 01 */}
            <div className="pillar-home-card">
              <div className="pillar-home-badge">{t('home.pillar1Badge')}</div>
              <div className="pillar-home-icon-wrap" style={{ background: 'rgba(27, 77, 52, 0.1)', color: '#1B4D34' }}>
                <Trees size={26} />
              </div>
              <h3 className="pillar-home-title">{t('home.pillar1Title')}</h3>
              <div className="pillar-home-tagline">{t('home.pillar1Tagline')}</div>
              <p className="pillar-home-desc">
                {t('home.pillar1Desc')}
              </p>
              <Link to="/services#vrukshasewa" className="pillar-home-link">
                <span>{t('home.explorePillar')}</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Pillar 02 */}
            <div className="pillar-home-card">
              <div className="pillar-home-badge">{t('home.pillar2Badge')}</div>
              <div className="pillar-home-icon-wrap" style={{ background: 'rgba(44, 74, 56, 0.1)', color: '#2C4A38' }}>
                <Heart size={26} />
              </div>
              <h3 className="pillar-home-title">{t('home.pillar2Title')}</h3>
              <div className="pillar-home-tagline">{t('home.pillar2Tagline')}</div>
              <p className="pillar-home-desc">
                {t('home.pillar2Desc')}
              </p>
              <Link to="/services#manava-sewa" className="pillar-home-link">
                <span>{t('home.explorePillar')}</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Pillar 03 */}
            <div className="pillar-home-card">
              <div className="pillar-home-badge">{t('home.pillar3Badge')}</div>
              <div className="pillar-home-icon-wrap" style={{ background: 'rgba(24, 61, 47, 0.1)', color: '#183D2F' }}>
                <Globe size={26} />
              </div>
              <h3 className="pillar-home-title">{t('home.pillar3Title')}</h3>
              <div className="pillar-home-tagline">{t('home.pillar3Tagline')}</div>
              <p className="pillar-home-desc">
                {t('home.pillar3Desc')}
              </p>
              <Link to="/services#prakruthi-sewa" className="pillar-home-link">
                <span>{t('home.explorePillar')}</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Pillar 04 */}
            <div className="pillar-home-card">
              <div className="pillar-home-badge">{t('home.pillar4Badge')}</div>
              <div className="pillar-home-icon-wrap" style={{ background: 'rgba(30, 59, 47, 0.1)', color: '#1E3B2F' }}>
                <Users size={26} />
              </div>
              <h3 className="pillar-home-title">{t('home.pillar4Title')}</h3>
              <div className="pillar-home-tagline">{t('home.pillar4Tagline')}</div>
              <p className="pillar-home-desc">
                {t('home.pillar4Desc')}
              </p>
              <Link to="/services#aashraya-sewa" className="pillar-home-link">
                <span>{t('home.explorePillar')}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Projects Section */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow-badge">
              <Trees size={14} />
              <span>{t('home.projectsBadge')}</span>
            </div>
            <h2 className="section-title">{t('home.projectsTitle')}</h2>
            <p className="section-subtitle">
              {t('home.projectsSubtitle')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.75rem'
          }}>
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Button to="/projects" variant="primary" size="lg" icon={ArrowRight}>
              {t('home.viewAllProjects')}
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Gallery Teaser */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow-badge">
              <Eye size={14} />
              <span>{t('home.galleryBadge')}</span>
            </div>
            <h2 className="section-title">{t('home.galleryTitle')}</h2>
            <p className="section-subtitle">
              {t('home.gallerySubtitle')}
            </p>
          </div>

          <div className="gallery-grid">
            {previewGallery.map((item) => (
              <Link to="/gallery" key={item.id} className="gallery-item">
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span className="gallery-overlay-badge">{item.categoryLabel}</span>
                  <div className="gallery-overlay-title">{item.title}</div>
                  <div className="gallery-overlay-meta">{item.location}</div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Button to="/gallery" variant="outline" size="md" icon={ArrowRight}>
              {t('home.exploreGallery')}
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Blog / Eco-Guides Preview */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow-badge">
              <Sparkles size={14} />
              <span>{t('home.blogBadge')}</span>
            </div>
            <h2 className="section-title">{t('home.blogTitle')}</h2>
            <p className="section-subtitle">
              {t('home.blogSubtitle')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.75rem'
          }}>
            {latestArticles.map((article) => (
              <div
                key={article.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
                }}
                onClick={() => setSelectedArticle(article)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{ height: '210px', overflow: 'hidden' }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-600)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    {article.categoryLabel} • {article.readTime}
                  </div>
                  <h4 style={{ fontSize: '1.25rem', color: 'var(--color-forest-900)', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                    {article.title}
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '1.25rem', flex: 1 }}>
                    {article.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--color-border-subtle)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-forest-700)' }}>
                    <span>{t('home.readArticle')}</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Button to="/blog" variant="outline" size="md" icon={ArrowRight}>
              {t('home.readAllArticles')}
            </Button>
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner (Join Our Mission & Donate) */}
      <section className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow-badge">
              <Heart size={14} />
              <span>{t('home.ctaBadge')}</span>
            </div>
            <h2 style={{ color: '#FFFFFF', marginBottom: '1.5rem' }}>
              {t('home.ctaTitle')}
            </h2>
            <p style={{ color: 'var(--color-text-light-muted)', fontSize: '1.2rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
              {t('home.ctaDesc')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center' }}>
              <Button to="/volunteer" variant="sprout" size="lg" icon={Users}>
                {t('home.ctaVolunteerBtn')}
              </Button>
              <Button to="/donate" variant="gold" size="lg" icon={Heart}>
                {t('home.ctaDonateBtn')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <BlogModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      {/* Official Foundation Charter Banner Modal */}
      {bannerModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setBannerModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-card"
            style={{ maxWidth: '1100px', width: '96%', padding: '1.25rem', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setBannerModalOpen(false)}
              aria-label="Close modal"
              style={{ top: '0.75rem', right: '0.75rem', zIndex: 10 }}
            >
              <X size={20} />
            </button>
            <img
              src="/foundation-banner.jpg"
              alt="Manchi Panulu Sewa Foundation - Reg No 420/2026 - Official Charter Banner"
              style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', display: 'block' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
