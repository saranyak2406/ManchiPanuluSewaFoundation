import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Trees, Filter, Search, Sparkles } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailModal from '../components/ProjectDetailModal';
import Button from '../components/Button';
import { getProjectsData } from '../data/projectsData';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectsPage() {
  const { t, language } = useLanguage();
  const currentProjects = getProjectsData(language);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeStatus, setActiveStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { label: t('projects.allDisciplines'), value: 'All' },
    { label: t('projects.filterVruksha'), value: 'TreePlantation' },
    { label: t('projects.filterEducation'), value: 'Education' },
    { label: t('projects.filterMedical'), value: 'Medical' },
    { label: t('projects.filterAnnadanam'), value: 'Annadanam' },
    { label: t('projects.filterFuneral'), value: 'Funeral' },
    { label: t('projects.filterOrphan'), value: 'Orphan' },
    { label: t('projects.filterEnv'), value: 'Environment' }
  ];

  const statuses = [
    { label: t('projects.allStatus'), value: 'All' },
    { label: t('projects.ongoing'), value: 'Ongoing' },
    { label: t('projects.completed'), value: 'Completed' },
    { label: t('projects.upcoming'), value: 'Upcoming' }
  ];

  const filteredProjects = useMemo(() => {
    return currentProjects.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' ||
        project.category === activeCategory ||
        ((activeCategory === 'TreePlantation' || activeCategory === 'VrukshaSewa') &&
          (project.category === 'TreePlantation' || project.category === 'VrukshaSewa')) ||
        ((activeCategory === 'Annadanam' || activeCategory === 'Sewa') &&
          (project.category === 'Annadanam' || project.category === 'Sewa'));
      const matchesStatus =
        activeStatus === 'All' ||
        project.status.toLowerCase() === activeStatus.toLowerCase() ||
        (activeStatus === 'Ongoing' && (project.status === 'Ongoing' || project.status === 'కొనసాగుతోంది' || project.status === 'जारी')) ||
        (activeStatus === 'Completed' && (project.status === 'Completed' || project.status === 'పూర్తయింది' || project.status === 'पूर्ण')) ||
        (activeStatus === 'Upcoming' && (project.status === 'Upcoming' || project.status === 'రాబోతోంది' || project.status === 'आगामी'));
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [currentProjects, activeCategory, activeStatus, searchQuery]);

  return (
    <>
      {/* Page Hero - Matching User's Target Design Exactly */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner-unboxed">
            <div className="page-hero-eyebrow">
              <Trees size={16} />
              <span>{t('projects.badge')}</span>
            </div>
            <h1 className="page-hero-title-exact">
              {t('projects.heroTitle')}
            </h1>
            <div className="page-hero-accent-line"></div>
            <p className="page-hero-desc-exact">
              {t('projects.heroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="section section-white">
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            backgroundColor: 'var(--color-sage-100)',
            padding: '1.5rem 1.75rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-card)'
          }}>
            {/* Search Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-pill)',
              border: '1.5px solid var(--color-border-card)',
              padding: '0.4rem 1.25rem',
              gap: '0.6rem'
            }}>
              <Search size={18} style={{ color: 'var(--color-forest-700)' }} />
              <input
                type="text"
                placeholder={t('projects.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  color: 'var(--color-text-main)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}
                >
                  {t('projects.clear')}
                </button>
              )}
            </div>

            {/* Category & Status Filter Pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {/* Category Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.value);
                      setSearchParams(cat.value === 'All' ? {} : { category: cat.value });
                    }}
                    className={`filter-pill ${activeCategory === cat.value ? 'active' : ''}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Status Chips */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginRight: '0.35rem' }}>
                  {t('projects.statusLabel')}
                </span>
                {statuses.map((status) => (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() => setActiveStatus(status.value)}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      backgroundColor: activeStatus === status.value ? 'var(--color-forest-900)' : '#FFFFFF',
                      color: activeStatus === status.value ? '#FFFFFF' : 'var(--color-text-muted)',
                      border: '1px solid var(--color-border-card)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section section-sage">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border-card)'
            }}>
              <Trees size={48} style={{ color: 'var(--color-forest-600)', margin: '0 auto 1rem auto' }} />
              <h3 style={{ color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>{t('projects.noProjects')}</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                {t('projects.noProjectsDesc')}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveCategory('All');
                  setActiveStatus('All');
                  setSearchQuery('');
                }}
              >
                {t('projects.resetFilters')}
              </Button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.75rem'
            }}>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(proj) => setSelectedProject(proj)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
