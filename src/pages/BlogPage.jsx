import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Clock, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import BlogModal from '../components/BlogModal';
import Button from '../components/Button';
import { blogData } from '../data/blogData';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = [
    { label: 'All Articles', value: 'All' },
    { label: 'Plants & Afforestation', value: 'Plants' },
    { label: 'Social Seva', value: 'Seva' },
    { label: 'Environmental Service', value: 'Environment' }
  ];

  const filteredArticles = useMemo(() => {
    return blogData.filter((article) => {
      const matchesCategory =
        activeCategory === 'All' || article.category === activeCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="eyebrow-badge" style={{ backgroundColor: 'rgba(120, 201, 83, 0.15)', color: 'var(--color-sprout-light)', borderColor: 'rgba(120, 201, 83, 0.3)' }}>
              <BookOpen size={15} />
              <span>Articles & Reflections</span>
            </div>
            <h1 className="page-hero-title">
              Insights on Nature, Humanity & Preservation
            </h1>
            <p className="page-hero-desc">
              Thoughtful articles, field observations, and ecological guides authored by our volunteers, foresters, and community seva coordinators.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="section section-white" style={{ paddingTop: '2.5rem', paddingBottom: '1.5rem' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            backgroundColor: 'var(--color-sage-100)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-card)'
          }}>
            {/* Search Bar */}
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
                placeholder="Search articles by title, topic, or tags..."
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

            {/* Category Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setActiveCategory(cat.value)}
                  className={`filter-pill ${activeCategory === cat.value ? 'active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="section section-sage" style={{ paddingTop: '1rem' }}>
        <div className="container">
          {filteredArticles.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border-card)'
            }}>
              <BookOpen size={44} style={{ color: 'var(--color-forest-600)', margin: '0 auto 1rem auto' }} />
              <h3 style={{ color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>No articles found</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Try adjusting your search terms or selecting another category.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
              >
                Reset Search
              </Button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem'
            }}>
              {filteredArticles.map((article) => (
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
                    boxShadow: 'var(--shadow-sm)',
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
                  <div style={{ height: '220px', overflow: 'hidden' }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </div>

                  <div style={{ padding: '1.75rem', display: 'flex', flex: 1, flexDirection: 'column' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.6rem'
                    }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-forest-600)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {article.categoryLabel}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', color: 'var(--color-forest-900)', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                      {article.title}
                    </h3>

                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '1.25rem', flex: 1 }}>
                      {article.excerpt}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--color-border-subtle)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--color-forest-800)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                        <Calendar size={13} />
                        <span>{article.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-forest-700)' }}>
                        <span>Read Full Story</span>
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Article Reader Modal */}
      <BlogModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </>
  );
}

