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
  Eye
} from 'lucide-react';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import StatsCounter from '../components/StatsCounter';
import ProjectDetailModal from '../components/ProjectDetailModal';
import BlogModal from '../components/BlogModal';
import Button from '../components/Button';
import { projectsData } from '../data/projectsData';
import { galleryData } from '../data/galleryData';
import { blogData } from '../data/blogData';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const featuredProjects = projectsData.slice(0, 3);
  const previewGallery = galleryData.slice(0, 6);
  const latestArticles = blogData.slice(0, 3);

  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Impact Counters Banner */}
      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <StatsCounter />
        </div>
      </section>

      {/* 4. About the Foundation Teaser */}
      <section className="section section-white">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3.5rem',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center'
            }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  borderRadius: 'var(--radius-2xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '4px solid #FFFFFF'
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80"
                    alt="Manchi Panulu Sewa Foundation in Action - Vruksha, Manava, Prakruthi & Aashraya Sewa"
                    style={{ width: '100%', height: '460px', objectFit: 'cover' }}
                  />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '-1.5rem',
                  right: '-1rem',
                  background: 'var(--color-forest-900)',
                  color: '#FFFFFF',
                  padding: '1.5rem 1.75rem',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)',
                  maxWidth: '280px'
                }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-sprout-light)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Grassroots Ethos
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800 }}>
                    "Every seed planted is a prayer for tomorrow."
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
      <section className="section section-sage" style={{ paddingTop: '3.5rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="section-header" style={{ maxWidth: '720px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
            <div className="eyebrow-badge" style={{ margin: '0 auto 0.85rem auto' }}>
              <Sparkles size={14} />
              <span>Core Mandate</span>
            </div>
            <h2 style={{ color: 'var(--color-forest-900)', marginBottom: '1rem', fontSize: 'clamp(2rem, 3.2vw, 2.6rem)' }}>
              Four Pillars of Dedicated Sewa
            </h2>
            <p style={{ color: 'var(--color-forest-700)', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Rooted in soil, driven by compassion, and committed to ecological rejuvenation and uplifting every vulnerable life.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem'
          }}>
            {/* Pillar 01 */}
            <div className="pillar-home-card">
              <div className="pillar-home-badge">PILLAR 01 — TREE & NATURE PROTECTION</div>
              <div className="pillar-home-icon-wrap" style={{ background: 'rgba(27, 77, 52, 0.1)', color: '#1B4D34' }}>
                <Trees size={26} />
              </div>
              <h3 className="pillar-home-title">Vruksha Sewa</h3>
              <div className="pillar-home-tagline">Rooting Hope, Greening Tomorrow</div>
              <p className="pillar-home-desc">
                Dedicated to afforestation, indigenous tree plantation, sapling distribution, and nurturing green landscapes.
              </p>
              <Link to="/services#vrukshasewa" className="pillar-home-link">
                <span>Explore Pillar</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Pillar 02 */}
            <div className="pillar-home-card">
              <div className="pillar-home-badge">PILLAR 02 — HUMANITARIAN & SOCIAL SERVICE</div>
              <div className="pillar-home-icon-wrap" style={{ background: 'rgba(44, 74, 56, 0.1)', color: '#2C4A38' }}>
                <Heart size={26} />
              </div>
              <h3 className="pillar-home-title">Manava Sewa</h3>
              <div className="pillar-home-tagline">Compassion in Action, Humanity at Heart</div>
              <p className="pillar-home-desc">
                Providing nutritious meals, clothing, educational assistance, disaster relief, and compassionate support for elderly and vulnerable individuals.
              </p>
              <Link to="/services#manava-sewa" className="pillar-home-link">
                <span>Explore Pillar</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Pillar 03 */}
            <div className="pillar-home-card">
              <div className="pillar-home-badge">PILLAR 03 — ENVIRONMENTAL CONSERVATION</div>
              <div className="pillar-home-icon-wrap" style={{ background: 'rgba(24, 61, 47, 0.1)', color: '#183D2F' }}>
                <Globe size={26} />
              </div>
              <h3 className="pillar-home-title">Prakruthi Sewa</h3>
              <div className="pillar-home-tagline">Restoring Nature, Sustaining Life</div>
              <p className="pillar-home-desc">
                Revitalizing water bodies, organizing cleanliness drives, reducing plastic pollution, and promoting sustainable, zero-waste communities.
              </p>
              <Link to="/services#prakruthi-sewa" className="pillar-home-link">
                <span>Explore Pillar</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Pillar 04 */}
            <div className="pillar-home-card">
              <div className="pillar-home-badge">PILLAR 04 — POVERTY RELIEF & EMPOWERMENT</div>
              <div className="pillar-home-icon-wrap" style={{ background: 'rgba(30, 59, 47, 0.1)', color: '#1E3B2F' }}>
                <Users size={26} />
              </div>
              <h3 className="pillar-home-title">Aashraya Sewa</h3>
              <div className="pillar-home-tagline">Restoring Dignity, Empowering Lives</div>
              <p className="pillar-home-desc">
                Supporting economically disadvantaged families through essential supplies, emergency medical assistance, livelihood opportunities, and self-reliance initiatives.
              </p>
              <Link to="/services#aashraya-sewa" className="pillar-home-link">
                <span>Explore Pillar</span>
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
              <span>Ground Action</span>
            </div>
            <h2 className="section-title">Our Ongoing & Completed Projects</h2>
            <p className="section-subtitle">
              From restoring depleted urban water tanks to planting micro-forests, explore how our volunteers turn intention into enduring reality.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
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
              View All Ongoing & Completed Projects
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
              <span>Visual Archive</span>
            </div>
            <h2 className="section-title">Moments of Sewa in Action</h2>
            <p className="section-subtitle">
              A glimpse into weekend plantations, community meal circles, lake desilting drives, and environmental youth workshops.
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
              Explore Full Photo & Video Gallery
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
              <span>Wisdom & Guides</span>
            </div>
            <h2 className="section-title">Stories, Perspectives & Eco-Knowledge</h2>
            <p className="section-subtitle">
              Read insights on indigenous tree cultivation, community hunger alleviation models, and practical environmental stewardship.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
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
                    <span>Read Article</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Button to="/blog" variant="outline" size="md" icon={ArrowRight}>
              Read All Articles
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
              <span>Step Forward in Sewa</span>
            </div>
            <h2 style={{ color: '#FFFFFF', marginBottom: '1.5rem' }}>
              Your Good Deed Today Can Seed a Flourishing Tomorrow
            </h2>
            <p style={{ color: 'var(--color-text-light-muted)', fontSize: '1.2rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
              Whether you plant a sapling, sponsor wholesome meals for hospital attendants, or lend your voice to environmental conservation — every hand matters.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center' }}>
              <Button to="/volunteer" variant="sprout" size="lg" icon={Users}>
                Register as a Volunteer
              </Button>
              <Button to="/donate" variant="gold" size="lg" icon={Heart}>
                Make a Contribution
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
    </>
  );
}

