import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Trees, Filter, Search, Sparkles } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectDetailModal from '../components/ProjectDetailModal';
import Button from '../components/Button';
import { projectsData } from '../data/projectsData';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeStatus, setActiveStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { label: 'All Disciplines', value: 'All' },
    { label: 'Plants & Nature', value: 'Plants' },
    { label: 'Social Seva', value: 'Seva' },
    { label: 'Environmental Service', value: 'Environment' }
  ];

  const statuses = ['All', 'Ongoing', 'Completed', 'Upcoming'];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' || project.category === activeCategory;
      const matchesStatus =
        activeStatus === 'All' || project.status === activeStatus;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [activeCategory, activeStatus, searchQuery]);

  return (
    <>
      {/* Page Hero - Matching User's Target Design Exactly */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner-unboxed">
            <div className="page-hero-eyebrow">
              <Trees size={16} />
              <span>{t('home.projectsBadge')}</span>
            </div>
            <h1 className="page-hero-title-exact">
              {t('home.projectsTitle')}
            </h1>
            <div className="page-hero-accent-line"></div>
            <p className="page-hero-desc-exact">
              {t('home.projectsSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="section section-white" style={{ paddingTop: '2.5rem', paddingBottom: '2rem' }}>
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
                placeholder="Search projects by title, location or keywords..."
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
                  Clear
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
                  Status:
                </span>
                {statuses.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setActiveStatus(status)}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      backgroundColor: activeStatus === status ? 'var(--color-forest-900)' : '#FFFFFF',
                      color: activeStatus === status ? '#FFFFFF' : 'var(--color-text-muted)',
                      border: '1px solid var(--color-border-card)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section section-sage" style={{ paddingTop: '1rem' }}>
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
              <h3 style={{ color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>No projects match your filter</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Try adjusting your search criteria or resetting your filters.
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
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem'
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

