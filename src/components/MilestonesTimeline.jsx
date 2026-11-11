import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const STEP_THEMES = [
  {
    outer: '#16452C',
    inner: '#4E8F67',
    year: '#143D28',
    title: '#16452C',
    tint: 'rgba(255, 255, 255, 0.56)',
    border: 'rgba(22, 69, 44, 0.24)',
    glow: 'rgba(22, 69, 44, 0.34)'
  },
  {
    outer: '#265D75',
    inner: '#619CB5',
    year: '#1E4C61',
    title: '#23566C',
    tint: 'rgba(255, 255, 255, 0.56)',
    border: 'rgba(38, 93, 117, 0.24)',
    glow: 'rgba(38, 93, 117, 0.34)'
  },
  {
    outer: '#2C6B37',
    inner: '#67AD6E',
    year: '#22562B',
    title: '#286032',
    tint: 'rgba(255, 255, 255, 0.56)',
    border: 'rgba(44, 107, 55, 0.24)',
    glow: 'rgba(44, 107, 55, 0.34)'
  },
  {
    outer: '#8C5E14',
    inner: '#CC9A3E',
    year: '#734C0D',
    title: '#7F5410',
    tint: 'rgba(255, 255, 255, 0.56)',
    border: 'rgba(140, 94, 20, 0.26)',
    glow: 'rgba(140, 94, 20, 0.34)'
  }
];

function buildStepPath(width, top, bottom, isLeftLoop) {
  const midX = Math.round(width / 2);
  const padX = 18;
  const h = bottom - top;
  const maxR = Math.max(40, Math.floor((midX - padX) * 0.46));
  const r = Math.min(h / 2, maxR);

  if (isLeftLoop) {
    const lx = padX;
    const d = [
      `M ${midX} ${top}`,
      `L ${lx + r} ${top}`,
      `A ${r} ${r} 0 0 0 ${lx} ${top + r}`,
      `L ${lx} ${bottom - r}`,
      `A ${r} ${r} 0 0 0 ${lx + r} ${bottom}`,
      `L ${midX} ${bottom}`
    ].join(' ');
    const cont = d.replace(/^M\s+[\d.]+\s+[\d.]+\s*/, '');
    return { d, cont, top, bottom };
  }

  const rx = width - padX;
  const d = [
    `M ${midX} ${top}`,
    `L ${rx - r} ${top}`,
    `A ${r} ${r} 0 0 1 ${rx} ${top + r}`,
    `L ${rx} ${bottom - r}`,
    `A ${r} ${r} 0 0 1 ${rx - r} ${bottom}`,
    `L ${midX} ${bottom}`
  ].join(' ');
  const cont = d.replace(/^M\s+[\d.]+\s+[\d.]+\s*/, '');
  return { d, cont, top, bottom };
}

export default function MilestonesTimeline({ milestones }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const rowRefs = useRef([]);

  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !('IntersectionObserver' in window);
  });
  const [activeIdx, setActiveIdx] = useState(null);
  const [geom, setGeom] = useState({ width: 0, height: 0, paths: [], fullPath: '' });

  // Scroll-reveal observer for sequential serpentine draw animation
  useEffect(() => {
    const target = sectionRef.current;
    if (!target || isVisible) return;

    const rect = target.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isVisible]);

  // Measure desktop serpentine rows accurately across font loads, language switches & resizes
  useLayoutEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    let rafId = 0;

    const measure = () => {
      const width = stageEl.clientWidth;
      const height = stageEl.clientHeight;
      if (!width || !height) return;

      const paths = [];
      for (let i = 0; i < milestones.length; i++) {
        const rowEl = rowRefs.current[i];
        if (!rowEl) continue;
        const top = rowEl.offsetTop;
        const bottom = top + rowEl.offsetHeight;
        paths.push(buildStepPath(width, top, bottom, i % 2 === 0));
      }

      if (paths.length === 0) return;

      const fullPath = paths
        .map((p, idx) => (idx === 0 ? p.d : p.cont))
        .join(' ');

      setGeom((prev) => {
        if (
          prev.width === width &&
          prev.height === height &&
          prev.fullPath === fullPath
        ) {
          return prev;
        }
        return { width, height, paths, fullPath };
      });
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measure);
    };

    measure();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleMeasure) : null;
    if (ro) {
      ro.observe(stageEl);
      rowRefs.current.forEach((el) => {
        if (el) ro.observe(el);
      });
    }

    window.addEventListener('resize', scheduleMeasure);
    document.fonts?.ready?.then(scheduleMeasure).catch(() => {});

    return () => {
      cancelAnimationFrame(rafId);
      ro?.disconnect();
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [milestones]);

  const midX = geom.width > 0 ? Math.round(geom.width / 2) : 0;
  const firstTop = geom.paths[0]?.top ?? 0;
  const lastBottom = geom.paths[geom.paths.length - 1]?.bottom ?? 0;

  return (
    <div
      ref={sectionRef}
      className={`milestones-serpentine-root ${isVisible ? 'is-visible' : ''}`}
    >
      {/* Desktop & Tablet Alternating Serpentine Ribbon Timeline */}
      <div className="milestones-serp-desktop">
        <div ref={stageRef} className="milestones-serp-stage">
          {geom.width > 0 && geom.height > 0 && geom.paths.length === milestones.length && (
            <svg
              className="milestones-serp-svg"
              width={geom.width}
              height={geom.height}
              viewBox={`0 0 ${geom.width} ${geom.height}`}
              aria-hidden="true"
            >
              {geom.paths.map((seg, idx) => {
                const theme = STEP_THEMES[idx % STEP_THEMES.length];
                const isActive = activeIdx === idx;
                const delaySec = `${(idx * 0.6 + 0.05).toFixed(2)}s`;

                return (
                  <g
                    key={idx}
                    className={`milestones-serp-step-group ${isActive ? 'is-active' : ''}`}
                    style={{
                      '--step-delay': delaySec,
                      '--step-glow': theme.glow
                    }}
                  >
                    {/* Subtle depth shadow under ribbon */}
                    <path
                      d={seg.d}
                      pathLength="1000"
                      className="milestones-serp-path milestones-serp-path--shadow"
                      stroke="rgba(16, 36, 22, 0.14)"
                      strokeWidth={isActive ? 24 : 21}
                      transform="translate(0, 3)"
                    />
                    {/* Outer rich saturated ribbon */}
                    <path
                      d={seg.d}
                      pathLength="1000"
                      className="milestones-serp-path milestones-serp-path--outer"
                      stroke={theme.outer}
                      strokeWidth={isActive ? 21 : 18}
                    />
                    {/* Inner lighter core ribbon */}
                    <path
                      d={seg.d}
                      pathLength="1000"
                      className="milestones-serp-path milestones-serp-path--inner"
                      stroke={theme.inner}
                      strokeWidth={isActive ? 11 : 9}
                    />
                    {/* Crisp dimensional top highlight */}
                    <path
                      d={seg.d}
                      pathLength="1000"
                      className="milestones-serp-path milestones-serp-path--highlight"
                      stroke="rgba(255, 255, 255, 0.36)"
                      strokeWidth={2}
                    />
                  </g>
                );
              })}

              {/* Continuous gliding traveler pulse along full S-curve */}
              {isVisible && geom.fullPath && (
                <g className="milestones-serp-traveler">
                  <circle r="9" fill="#78C953" opacity="0.34">
                    <animateMotion dur="7.5s" repeatCount="indefinite" path={geom.fullPath} begin="2.5s" />
                  </circle>
                  <circle r="4.2" fill="#FFFFFF" stroke="#16452C" strokeWidth="1.8">
                    <animateMotion dur="7.5s" repeatCount="indefinite" path={geom.fullPath} begin="2.5s" />
                  </circle>
                </g>
              )}

              {/* Start Ring Node (Top Center matching reference anchor) */}
              <g transform={`translate(${midX}, ${firstTop})`}>
                <g className="milestones-serp-anchor-node">
                  <circle r="15" fill="#162414" />
                  <circle r="6.5" fill="#FFFFFF" />
                </g>
              </g>

              {/* Terminal Node (Bottom Center) */}
              <g transform={`translate(${midX}, ${lastBottom})`}>
                <g
                  className="milestones-serp-end-node"
                  style={{ '--end-delay': `${(milestones.length * 0.6 + 0.05).toFixed(2)}s` }}
                >
                  <circle r="13" fill="#734C0D" />
                  <circle r="5.5" fill="#FFFFFF" />
                </g>
              </g>
            </svg>
          )}

          {/* Alternating Milestone Rows */}
          <div className="milestones-serp-rows">
            {milestones.map((m, idx) => {
              const theme = STEP_THEMES[idx % STEP_THEMES.length];
              const isLeftLoop = idx % 2 === 0;
              const isActive = activeIdx === idx;
              const yearRevealDelay = `${(idx * 0.6 + 0.25).toFixed(2)}s`;
              const contentRevealDelay = `${(idx * 0.6 + 0.35).toFixed(2)}s`;

              const bayNode = (
                <div
                  className={`milestones-serp-bay ${isLeftLoop ? 'milestones-serp-bay--left' : 'milestones-serp-bay--right'}`}
                  style={{ '--reveal-delay': yearRevealDelay }}
                >
                  <div
                    className="milestones-serp-year"
                    style={{ color: theme.year }}
                  >
                    {m.year}
                  </div>
                </div>
              );

              const contentNode = (
                <div
                  className={`milestones-serp-content ${isLeftLoop ? 'milestones-serp-content--right' : 'milestones-serp-content--left'}`}
                  style={{
                    '--reveal-delay': contentRevealDelay,
                    backgroundColor: isActive ? theme.tint : 'transparent',
                    borderColor: isActive ? theme.border : 'transparent'
                  }}
                >
                  <h4
                    className="milestones-serp-title"
                    style={{ color: theme.title }}
                  >
                    {m.title}
                  </h4>
                  <p className="milestones-serp-desc">
                    {m.desc}
                  </p>
                </div>
              );

              return (
                <div
                  key={idx}
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  tabIndex={0}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onMouseLeave={() => setActiveIdx(null)}
                  onFocus={() => setActiveIdx(idx)}
                  onBlur={() => setActiveIdx(null)}
                  className={`milestones-serp-row ${isLeftLoop ? 'is-left-loop' : 'is-right-loop'} ${isActive ? 'is-active' : ''}`}
                >
                  {isLeftLoop ? (
                    <>
                      {bayNode}
                      {contentNode}
                    </>
                  ) : (
                    <>
                      {contentNode}
                      {bayNode}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Compact Animated Curved-Ribbon View (< 720px) */}
      <div className="milestones-serp-mobile">
        <div className="milestones-mob-track" aria-hidden="true">
          <span className="milestones-mob-start-dot" />
          <span className="milestones-mob-spine" />
        </div>
        <div className="milestones-mob-list">
          {milestones.map((m, idx) => {
            const theme = STEP_THEMES[idx % STEP_THEMES.length];
            const delaySec = `${(idx * 0.22 + 0.1).toFixed(2)}s`;

            return (
              <div
                key={idx}
                className="milestones-mob-item"
                style={{
                  '--mob-delay': delaySec,
                  '--step-outer': theme.outer,
                  '--step-inner': theme.inner,
                  '--step-title': theme.title
                }}
              >
                <div className="milestones-mob-curve-badge">
                  <span className="milestones-mob-year">{m.year}</span>
                </div>
                <div className="milestones-mob-card">
                  <h4 className="milestones-mob-title" style={{ color: theme.title }}>
                    {m.title}
                  </h4>
                  <p className="milestones-mob-desc">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

