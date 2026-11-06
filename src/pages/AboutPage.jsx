import React from 'react';
import {
  ShieldCheck,
  Award,
  Trees,
  Heart,
  Globe,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  FileText,
  Target,
  ArrowRight
} from 'lucide-react';
import Button from '../components/Button';
import { complianceInfo } from '../data/statsData';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { t, language } = useLanguage();
  const leadershipTeam = [
    {
      name: "Dr. K. Ramachandra Rao",
      role: "Founder & Chief Trustee (Placeholder)",
      bio: "Lifelong naturalist and social reformer with three decades of grassroots community service in rural afforestation and public health advocacy.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Smt. V. Annapurna",
      role: "Director of Social Sewa (Placeholder)",
      bio: "Pioneered community meal kitchens and disaster relief networks, coordinating over 100,000 nutritious meals across government hospitals.",
      image: "https://images.unsplash.com/photo-1753981031189-27bb7bd1c079?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Sri Ananth Narayanan",
      role: "Head of Environmental Stewardship (Placeholder)",
      bio: "Ecological engineer specializing in urban waterbody restoration, phytoremediation, and indigenous Miyawaki forest cultivation.",
      image: "https://images.unsplash.com/photo-1628272107134-c66c4b580952?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "The Seed of 'Manchi Panulu'",
      desc: "A small circle of friends and nature enthusiasts started weekend food distributions outside government shelters and planted 500 neem saplings."
    },
    {
      year: "2024",
      title: "Formal Trust Registration",
      desc: "Formally registered as Manchi Panulu Sewa Foundation with the four declared pillars: Vruksha Sewa, Manava Sewa, Prakruthi Sewa, and Aashraya Sewa."
    },
    {
      year: "2025",
      title: "First Miyawaki Forest & Lake Revival",
      desc: "Planted our flagship 4-acre Haritha Sankalpam urban forest and launched community desilting across 7 urban and peri-urban water tanks."
    },
    {
      year: "2026 & Beyond",
      title: "Scaling Grassroots Impact",
      desc: "Expanding to agroforestry support for marginal farmers, state-wide seed ball drives, and expanding our volunteer network to 10,000+ eco-warriors."
    }
  ];

  return (
    <>
      {/* Page Hero - Matching User's Target Design Exactly */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner-unboxed">
            <div className="page-hero-eyebrow">
              <Compass size={16} />
              <span>{t('about.badge')}</span>
            </div>
            <h1 className="page-hero-title-exact">
              {language === 'en' ? (
                <>Good Deeds Rooted in<br className="hidden-mobile-br" /> Soil, Sustained by<br className="hidden-mobile-br" /> Compassion</>
              ) : (
                t('about.heroTitle')
              )}
            </h1>
            <div className="page-hero-accent-line"></div>
            <p className="page-hero-desc-exact">
              {t('about.heroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story & Ethos */}
      <section className="section section-white">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}>
            <div>
              <div className="eyebrow-badge">
                <Sparkles size={14} />
                <span>Our Heritage</span>
              </div>
              <h2 style={{ color: 'var(--color-forest-900)', marginBottom: '1.25rem' }}>
                The Meaning of "Manchi Panulu"
              </h2>
              <p style={{ marginBottom: '1.25rem', lineHeight: '1.8' }}>
                In Telugu, <em>"Manchi Panulu"</em> simply translates to <strong>"Good Deeds"</strong>. In an era often dominated by haste and disconnection, we wanted our foundation to speak with honest, grounded simplicity.
              </p>
              <p style={{ marginBottom: '1.25rem', lineHeight: '1.8' }}>
                A good deed is not measured by its monetary scale; it is measured by its purity of intent and long-term consequence. When a volunteer plants a slow-growing Banyan sapling whose shade they may never sit under, that is a good deed. When our kitchen serves hot, nutritious food to an anxious family waiting outside an emergency ward, that is a good deed. When youth spend Sunday wading through marshland to liberate a waterbody from plastic suffocation, that is a good deed.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--color-forest-900)', fontWeight: 600 }}>
                Our fourfold mandate: <strong>Vruksha Sewa (Protect Nature) • Manava Sewa (Serve Humanity) • Prakruthi Sewa (Preserve Environment) • Aashraya Sewa (Empower the Poor).</strong>
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '4px solid #FFFFFF'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=1000&q=80"
                  alt="Manchi Panulu Sewa Foundation Nature Protection"
                  style={{ width: '100%', height: '420px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow-badge">
              <Target size={14} />
              <span>Guiding Lights</span>
            </div>
            <h2 className="section-title">Our Mission & Vision</h2>
            <p className="section-subtitle">
              Clear principles steering every seed we sow, every plate we serve, and every water channel we cleanse.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {/* Mission Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              border: '1px solid var(--color-border-card)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'rgba(34, 100, 70, 0.1)',
                color: 'var(--color-forest-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Compass size={28} />
              </div>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--color-forest-900)', marginBottom: '1rem' }}>
                Our Mission
              </h3>
              <p style={{ lineHeight: '1.8', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                To mobilize citizens and communities for proactive ecological restoration and direct humanitarian sewa; revitalizing green cover through native tree plantation, eradicating acute hunger among vulnerable hospital patients and homeless populations, and preserving freshwater ecosystems through community stewardship.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-forest-800)', fontWeight: 600 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-forest-600)' }} />
                  <span>Grassroots community participation</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-forest-600)' }} />
                  <span>Ecologically sound native flora focus</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-forest-600)' }} />
                  <span>Unconditional dignity in all service</span>
                </li>
              </ul>
            </div>

            {/* Vision Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              border: '1px solid var(--color-border-card)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'rgba(226, 179, 87, 0.15)',
                color: '#A06E1A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Sparkles size={28} />
              </div>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--color-forest-900)', marginBottom: '1rem' }}>
                Our Vision
              </h3>
              <p style={{ lineHeight: '1.8', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                A harmonious society where pristine nature and compassionate humanity flourish side by side — where no person suffers from preventable starvation, every degraded urban space is transformed into a thriving native canopy, and our historic waterbodies run clear and life-giving.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-forest-800)', fontWeight: 600 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-gold)' }} />
                  <span>Climate-resilient urban and rural green belts</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-gold)' }} />
                  <span>Zero hunger in urban hospital perimeters</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-gold)' }} />
                  <span>Plastic-free, rejuvenated wetlands and lakes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow-badge">
              <ShieldCheck size={14} />
              <span>Foundational Tenets</span>
            </div>
            <h2 className="section-title">Values We Live By</h2>
            <p className="section-subtitle">
              These principles govern every project we select, every penny we allocate, and every partnership we form.
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-box">
                <Trees size={24} />
              </div>
              <h4 style={{ color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>Ecological Integrity</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                We plant strictly indigenous, biodiversity-enriching species. We do not plant invasive or water-depleting exotics.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-box">
                <Heart size={24} />
              </div>
              <h4 style={{ color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>Compassionate Dignity</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                Social sewa is delivered with reverence, humility, and warm smiles. We honor the inherent sanctity of every human being.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h4 style={{ color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>Transparent Auditing</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                Clear accounting, photographic evidence for all drives, and publicly accessible impact records ensure total trust.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-box">
                <Users size={24} />
              </div>
              <h4 style={{ color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>Community Ownership</h4>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                We don't impose solutions from outside; we empower local residents and youth eco-ambassadors to safeguard their neighborhoods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Advisory Board */}
      <section className="section section-sage">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow-badge">
              <Users size={14} />
              <span>Leadership & Stewardship</span>
            </div>
            <h2 className="section-title">Board of Trustees & Coordinators</h2>
            <p className="section-subtitle">
              Passionate environmentalists, community organizers, and social workers guiding our initiatives.
            </p>
          </div>

          <div className="team-grid">
            {leadershipTeam.map((member, idx) => (
              <div key={idx} className="team-card">
                <div className="team-avatar-wrap">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <div className="team-card-body">
                  <h4 className="team-member-name">{member.name}</h4>
                  <div className="team-member-role">{member.role}</div>
                  <p className="team-member-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow-badge">
              <Award size={14} />
              <span>Our Journey</span>
            </div>
            <h2 className="section-title">Milestones in Good Deeds</h2>
            <p className="section-subtitle">
              How a heartfelt grassroots desire grew into a dedicated foundation.
            </p>
          </div>

          <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {milestones.map((m, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '1.5rem',
                backgroundColor: 'var(--color-sage-100)',
                padding: '1.75rem',
                borderRadius: 'var(--radius-lg)',
                borderLeft: '5px solid var(--color-forest-700)'
              }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: 'var(--color-forest-900)',
                  flexShrink: 0
                }}>
                  {m.year}
                </div>
                <div>
                  <h4 style={{ color: 'var(--color-forest-900)', marginBottom: '0.4rem' }}>{m.title}</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Button to="/volunteer" variant="primary" size="lg" icon={ArrowRight}>
              Write the Next Chapter With Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

