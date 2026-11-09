import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Clock, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import BlogModal from '../components/BlogModal';
import Button from '../components/Button';
import { getBlogData } from '../data/blogData';
import { useLanguage } from '../context/LanguageContext';

export default function BlogPage() {
  const { t, language } = useLanguage();
  const currentArticles = getBlogData(language);

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = [
    { label: t('blog.allArticles'), value: 'All' },
    { label: t('blog.catVruksha'), value: 'VrukshaSewa' },
    { label: t('blog.catSewa'), value: 'Sewa' },
    { label: t('blog.catEnv'), value: 'Environment' }
  ];

  const filteredArticles = useMemo(() => {
    return currentArticles.filter((article) => {
      const matchesCategory =
        activeCategory === 'All' ||
        article.category === activeCategory ||
        ((activeCategory === 'VrukshaSewa' || activeCategory === 'Plants') && (article.category === 'VrukshaSewa' || article.category === 'Plants')) ||
        (activeCategory === 'Sewa' && article.category === 'Seva');
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [currentArticles, activeCategory, searchQuery]);

  return (
    <>
      {/* Page Hero - Matching User's Target Design Exactly */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner-unboxed">
            <div className="page-hero-eyebrow">
              <BookOpen size={16} />
              <span>{t('blog.badge')}</span>
            </div>
            <h1 className="page-hero-title-exact">
              {t('blog.heroTitle')}
            </h1>
            <div className="page-hero-accent-line"></div>
            <p className="page-hero-desc-exact">
              {t('blog.heroDesc')}
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
                placeholder={t('blog.searchPlaceholder')}
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

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
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
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section section-sage">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.75rem'
          }}>
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="blog-card"
                onClick={() => setSelectedArticle(article)}
                style={{ cursor: 'pointer' }}
              >
                <div className="blog-thumb-wrap">
                  <img src={article.image} alt={article.title} loading="lazy" />
                  <span className="blog-category-tag">{article.categoryLabel}</span>
                </div>

                <div className="blog-card-body">
                  <div className="blog-meta-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={14} />
                      <span>{article.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={14} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="blog-card-title">{article.title}</h3>
                  <p className="blog-card-excerpt">{article.excerpt}</p>

                  <div className="blog-tags-row">
                    {article.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="blog-tag">#{tag}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--color-border-card)', color: 'var(--color-forest-700)', fontWeight: 600, fontSize: '0.88rem', marginTop: 'auto' }}>
                    <span>{t('blog.readArticle')}</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Detail Modal */}
      <BlogModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </>
  );
}
