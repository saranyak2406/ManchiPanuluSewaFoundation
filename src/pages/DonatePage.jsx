import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Copy,
  Check,
  ShieldCheck,
  Building,
  Globe,
  Info,
  Download,
  CheckCircle2,
  Trees,
  GraduationCap,
  HeartPulse,
  Utensils,
  Flame,
  HeartHandshake,
  Sparkles,
  Receipt,
  Eye,
  Trash2,
  Clock
} from 'lucide-react';
import Button from '../components/Button';
import { complianceInfo } from '../data/statsData';
import { useLanguage } from '../context/LanguageContext';
import {
  preloadFoundationLogo,
  generateDonationReceiptPdf,
  triggerUrlDownload
} from '../utils/receiptGenerator';

const TRANSACTIONS_STORAGE_KEY = 'mpsf_donation_transactions';

export default function DonatePage() {
  const { t, language } = useLanguage();
  const [donorTab, setDonorTab] = useState('domestic'); // 'domestic' | 'international'
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [customAmount, setCustomAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // 6 Dedicated Sewa Pillars for Multi-Selection Choice Chips
  const pillarsList = [
    {
      id: 'tree-plantation',
      num: '01',
      label: language === 'te' ? 'వృక్షారోపణ' : language === 'hi' ? 'वृक्षारोपण' : 'Tree Plantation',
      icon: Trees,
      color: '#1B4D34',
      lightBg: '#EBF6EE',
      borderColor: '#1B4D34'
    },
    {
      id: 'education-support',
      num: '02',
      label: language === 'te' ? 'విద్యా సహాయం' : language === 'hi' ? 'शिक्षा सहायता' : 'Education Support',
      icon: GraduationCap,
      color: '#1E40AF',
      lightBg: '#EFF6FF',
      borderColor: '#1E40AF'
    },
    {
      id: 'medical-help',
      num: '03',
      label: language === 'te' ? 'వైద్య సహాయం' : language === 'hi' ? 'चिकित्सा सहायता' : 'Medical Help',
      icon: HeartPulse,
      color: '#DC2626',
      lightBg: '#FEF2F2',
      borderColor: '#DC2626'
    },
    {
      id: 'annadanam',
      num: '04',
      label: language === 'te' ? 'అన్నదానం' : language === 'hi' ? 'अन्नदान' : 'Annadanam',
      icon: Utensils,
      color: '#D97706',
      lightBg: '#FFFBEB',
      borderColor: '#D97706'
    },
    {
      id: 'funeral-services',
      num: '05',
      label: language === 'te' ? 'ఉచిత అంత్యక్రియలు' : language === 'hi' ? 'निःशुल्क अंतिम संस्कार' : 'Free Funeral Services',
      icon: Flame,
      color: '#4B5563',
      lightBg: '#F3F4F6',
      borderColor: '#4B5563'
    },
    {
      id: 'orphan-care',
      num: '06',
      label: language === 'te' ? 'అనాథ పిల్లల సంరక్షణ' : language === 'hi' ? 'अनाथ बाल देखभाल' : 'Orphan Children Care',
      icon: HeartHandshake,
      color: '#9333EA',
      lightBg: '#FAF5FF',
      borderColor: '#9333EA'
    }
  ];

  const [selectedPillars, setSelectedPillars] = useState([
    'tree-plantation',
    'education-support',
    'medical-help',
    'annadanam',
    'funeral-services',
    'orphan-care'
  ]);

  const handleTogglePillar = (id) => {
    setSelectedPillars((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one pillar selected
        return prev.filter((p) => p !== id);
      }
      return [...prev, id];
    });
  };

  const handleToggleAllPillars = () => {
    if (selectedPillars.length === pillarsList.length) {
      setSelectedPillars([pillarsList[0].id]);
    } else {
      setSelectedPillars(pillarsList.map((p) => p.id));
    }
  };

  const resolveAllocatedCause = (txOrPillars) => {
    if (!txOrPillars) return '';
    if (Array.isArray(txOrPillars)) {
      if (txOrPillars.length === pillarsList.length) {
        return t('donate.allPillarsSelected');
      }
      return pillarsList
        .filter((p) => txOrPillars.includes(p.id))
        .map((p) => p.label)
        .join(', ');
    }
    if (Array.isArray(txOrPillars.pillarIds) && txOrPillars.pillarIds.length > 0) {
      if (txOrPillars.pillarIds.length === pillarsList.length) {
        return t('donate.allPillarsSelected');
      }
      const matched = pillarsList
        .filter((p) => txOrPillars.pillarIds.includes(p.id))
        .map((p) => p.label);
      if (matched.length > 0) {
        return matched.join(', ');
      }
    }
    if (txOrPillars.causeKey) {
      return t(`donate.${txOrPillars.causeKey}`);
    }
    return txOrPillars.cause || t('donate.allPillarsSelected');
  };

  const activeAllocatedCause = resolveAllocatedCause(selectedPillars);

  // Form State
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [internationalCountry, setInternationalCountry] = useState('United States');

  // Persisted Donation Transactions State
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      // ignore storage read errors
    }
    return [];
  });
  const [downloadingTxId, setDownloadingTxId] = useState(null);

  // Donation Receipt State & Generated PDF State
  const [receiptData, setReceiptData] = useState(null);
  const [receiptPdf, setReceiptPdf] = useState({
    url: null,
    filename: '',
    generating: false,
    downloaded: false,
    error: ''
  });
  const extraUrlsRef = useRef([]);
  const txSectionRef = useRef(null);
  const justSubmittedRef = useRef(false);
  const amountInputRef = useRef(null);

  useEffect(() => {
    preloadFoundationLogo();
    return () => {
      extraUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      extraUrlsRef.current = [];
    };
  }, []);

  const receiptTitleText = t('donate.receiptTitle');

  const closeReceiptModal = useCallback(() => {
    setReceiptData(null);
    setReceiptPdf({ url: null, filename: '', generating: false, downloaded: false, error: '' });
    if (justSubmittedRef.current) {
      justSubmittedRef.current = false;
      setTimeout(() => {
        txSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
  }, []);

  // Dynamically resolve allocated cause in current UI language for modal preview & PDF generation
  const resolvedReceiptCause = resolveAllocatedCause(receiptData);

  // Pre-build the official PDF receipt when receiptData opens so clicking Download triggers synchronously
  useEffect(() => {
    if (!receiptData) return;

    let cancelled = false;
    let createdUrl = null;

    const localizedReceipt = resolvedReceiptCause
      ? { ...receiptData, cause: resolvedReceiptCause }
      : receiptData;

    generateDonationReceiptPdf(localizedReceipt, {
      subtitle: receiptTitleText
    })
      .then(({ blob, filename }) => {
        createdUrl = URL.createObjectURL(blob);
        if (cancelled) {
          URL.revokeObjectURL(createdUrl);
          return;
        }
        setReceiptPdf((prev) => ({
          ...prev,
          url: createdUrl,
          filename,
          generating: false,
          error: ''
        }));
      })
      .catch((err) => {
        console.error('Failed to pre-generate receipt PDF:', err);
        if (!cancelled) {
          setReceiptPdf((prev) => ({
            ...prev,
            url: null,
            generating: false
          }));
        }
      });

    return () => {
      cancelled = true;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [receiptData, receiptTitleText, resolvedReceiptCause]);

  // Allow Escape key to close the receipt modal
  useEffect(() => {
    if (!receiptData) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeReceiptModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [receiptData, closeReceiptModal]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('manchipanulu.sewa@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 3000);
  };

  const persistTransactions = (nextList) => {
    setTransactions(nextList);
    try {
      localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(nextList));
    } catch {
      // ignore storage quota errors
    }
  };

  const handleSimulateDonation = (e) => {
    e.preventDefault();
    const finalAmount = parseFloat(customAmount);

    if (!finalAmount || Number.isNaN(finalAmount) || finalAmount <= 0) {
      setAmountError(t('donate.errInvalidAmount'));
      amountInputRef.current?.focus();
      return;
    }

    setAmountError('');
    const now = new Date();
    const locale = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

    const receipt = {
      receiptNo: `MPSF-REC-${Math.floor(100000 + Math.random() * 900000)}`,
      date: now.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' }),
      time: now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }),
      createdAt: now.getTime(),
      donorName: donorName || (language === 'te' ? 'దయగల దాత' : language === 'hi' ? 'उदार दानदाता' : 'Kind Benefactor'),
      donorEmail: donorEmail || 'donor@example.com',
      donorPhone: donorTab === 'domestic' ? (donorPhone || 'N/A') : 'International',
      donorPan: donorPan || 'N/A',
      country: donorTab === 'international' ? (internationalCountry || 'International') : 'India',
      amount: finalAmount,
      currency: donorTab === 'domestic' ? 'INR' : selectedCurrency,
      pillarIds: [...selectedPillars],
      cause: activeAllocatedCause,
      type: donorTab
    };

    const updatedTransactions = [receipt, ...transactions].slice(0, 25);
    persistTransactions(updatedTransactions);

    justSubmittedRef.current = true;
    setReceiptPdf({ url: null, filename: '', generating: true, downloaded: false, error: '' });
    setReceiptData(receipt);

    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#78C953', '#E2B357', '#0C261A', '#38A169']
      });
    } catch {
      // ignore confetti failures
    }
  };

  const handleDownloadReceipt = async () => {
    if (!receiptData) return;

    // Synchronous download using pre-generated Object URL so desktop & mobile browsers never block it
    if (receiptPdf?.url) {
      triggerUrlDownload(receiptPdf.url, receiptPdf.filename);
      setReceiptPdf((prev) => ({ ...prev, downloaded: true, error: '' }));
      return;
    }

    // Fallback async build if user clicked instantaneously before background build completed
    setReceiptPdf((prev) => ({ ...prev, generating: true, error: '' }));
    try {
      const localizedReceipt = resolvedReceiptCause
        ? { ...receiptData, cause: resolvedReceiptCause }
        : receiptData;
      const { blob, filename } = await generateDonationReceiptPdf(localizedReceipt, {
        subtitle: t('donate.receiptTitle')
      });
      const url = URL.createObjectURL(blob);
      extraUrlsRef.current.push(url);
      triggerUrlDownload(url, filename);
      setReceiptPdf({ url, filename, generating: false, downloaded: true, error: '' });
    } catch (err) {
      console.error('Receipt generation failed:', err);
      setReceiptPdf((prev) => ({
        ...prev,
        generating: false,
        error: 'Unable to generate PDF receipt. Please try again.'
      }));
    }
  };

  const handleDownloadTransactionPdf = async (tx) => {
    if (!tx) return;
    setDownloadingTxId(tx.receiptNo);
    try {
      const displayCause = resolveAllocatedCause(tx);
      const localizedTx = displayCause ? { ...tx, cause: displayCause } : tx;
      const { blob, filename } = await generateDonationReceiptPdf(localizedTx, {
        subtitle: t('donate.receiptTitle')
      });
      const url = URL.createObjectURL(blob);
      extraUrlsRef.current.push(url);
      triggerUrlDownload(url, filename);
    } catch (err) {
      console.error('Transaction PDF generation failed:', err);
    } finally {
      setTimeout(() => setDownloadingTxId(null), 500);
    }
  };

  const handleViewTransactionReceipt = (tx) => {
    justSubmittedRef.current = false;
    setReceiptPdf({ url: null, filename: '', generating: true, downloaded: false, error: '' });
    setReceiptData(tx);
  };

  const handleClearTransactions = () => {
    persistTransactions([]);
  };

  return (
    <>
      {/* Page Hero - Matching User's Target Design Exactly */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner-unboxed">
            <div className="page-hero-eyebrow">
              <Heart size={16} />
              <span>{t('donate.badge')}</span>
            </div>
            <h1 className="page-hero-title-exact">
              {t('donate.heroTitle')}
            </h1>
            <div className="page-hero-accent-line"></div>
            <p className="page-hero-desc-exact" style={{ whiteSpace: 'pre-line', maxWidth: '640px' }}>
              {t('donate.heroDesc')}
            </p>

            {/* 6 Pillars Overview Strip inside Hero */}
            <div className="hero-pillars-pill-row" style={{ marginTop: '1.1rem', display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              <span className="hero-pillar-chip" title={t('hero.chip1')}>
                <span className="pillar-chip-dot dot-tree"></span>
                <span>{t('hero.chip1')}</span>
              </span>
              <span className="hero-pillar-chip" title={t('hero.chip2')}>
                <span className="pillar-chip-dot dot-education"></span>
                <span>{t('hero.chip2')}</span>
              </span>
              <span className="hero-pillar-chip" title={t('hero.chip3')}>
                <span className="pillar-chip-dot dot-medical"></span>
                <span>{t('hero.chip3')}</span>
              </span>
              <span className="hero-pillar-chip" title={t('hero.chip4')}>
                <span className="pillar-chip-dot dot-annadanam"></span>
                <span>{t('hero.chip4')}</span>
              </span>
              <span className="hero-pillar-chip" title={t('hero.chip5')}>
                <span className="pillar-chip-dot dot-funeral"></span>
                <span>{t('hero.chip5')}</span>
              </span>
              <span className="hero-pillar-chip" title={t('hero.chip6')}>
                <span className="pillar-chip-dot dot-orphan"></span>
                <span>{t('hero.chip6')}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Donation Container */}
      <section className="section section-sage">
        <div className="container">
          {/* Six Pillars Banner - Exact Width of Tab Bar */}
          <div className="donate-pillars-banner-wrapper">
            <div className="donate-pillars-banner-card">
              <img
                src="/6pillars.png"
                alt="Six Pillars of Dedicated Sewa - Tree Plantation, Education Support, Medical Help, Annadanam, Free Funeral Services, Orphan Children Care"
                className="donate-pillars-banner-img"
              />
            </div>
          </div>

          {/* Domestic vs International Tabs */}
          <div className="donation-tabs-wrapper">
            <div className="donation-tabs-switch">
              <button
                type="button"
                className={`donate-tab-btn ${donorTab === 'domestic' ? 'active' : ''}`}
                onClick={() => {
                  setDonorTab('domestic');
                  setCustomAmount('');
                  setAmountError('');
                }}
              >
                🇮🇳 {t('donate.domesticTab')}
              </button>
              <button
                type="button"
                className={`donate-tab-btn ${donorTab === 'international' ? 'active' : ''}`}
                onClick={() => {
                  setDonorTab('international');
                  setCustomAmount('');
                  setAmountError('');
                }}
              >
                🌐 {t('donate.intlTab')}
              </button>
            </div>
          </div>

          {/* TAB 1: DOMESTIC INDIAN DONORS */}
          {donorTab === 'domestic' && (
            <div className="donation-grid">
              {/* Left Column: Contribution Amount and Form */}
              <div className="donation-card-main">
                <h3 style={{ fontSize: 'clamp(1.35rem, 4.5vw, 1.65rem)', color: 'var(--color-forest-900)', marginBottom: '0.4rem', lineHeight: '1.2' }}>
                  {language === 'te' ? 'మీ విరాళం మొత్తాన్ని నమోదు చేయండి' : language === 'hi' ? 'अपनी दान राशि दर्ज करें' : 'Enter Your Contribution Amount'}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.55' }}>
                  {t('donate.chooseDesc')}
                </p>

                {/* Multi-Selection Choice Chips: Select Your Contribution For */}
                <div className="donate-choice-chips-wrapper">
                  <div className="donate-choice-chips-header">
                    <div className="donate-choice-chips-title-group">
                      <div className="donate-choice-chips-title">
                        <Sparkles size={16} style={{ color: 'var(--color-sprout-dark, #2E7D32)' }} />
                        <span>{t('donate.selectContributionFor')}</span>
                      </div>
                      <span className="donate-choice-chips-sub">{t('donate.selectPillarsSub')}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleAllPillars}
                      className="donate-choice-chips-toggle-btn"
                    >
                      {selectedPillars.length === pillarsList.length ? t('donate.deselectAll') : t('donate.selectAll')}
                    </button>
                  </div>

                  <div className="donate-choice-chips-grid">
                    {pillarsList.map((pillar) => {
                      const isSelected = selectedPillars.includes(pillar.id);
                      const IconComp = pillar.icon;
                      return (
                        <div
                          key={pillar.id}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={0}
                          onClick={() => handleTogglePillar(pillar.id)}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault();
                              handleTogglePillar(pillar.id);
                            }
                          }}
                          className={`donate-choice-chip ${isSelected ? 'selected' : ''}`}
                          style={{
                            borderColor: isSelected ? pillar.borderColor : '#E2E8F0',
                            backgroundColor: isSelected ? pillar.lightBg : '#FFFFFF'
                          }}
                        >
                          <div
                            className="donate-chip-checkbox"
                            style={{
                              backgroundColor: isSelected ? pillar.color : '#FFFFFF',
                              borderColor: isSelected ? pillar.color : '#CBD5E1'
                            }}
                          >
                            {isSelected && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
                          </div>

                          <div
                            className="donate-chip-icon-wrap"
                            style={{
                              backgroundColor: isSelected ? '#FFFFFF' : pillar.lightBg,
                              color: pillar.color
                            }}
                          >
                            <IconComp size={16} />
                          </div>

                          <div className="donate-chip-content">
                            <span className="donate-chip-number" style={{ color: pillar.color }}>
                              Pillar {pillar.num}
                            </span>
                            <span className="donate-chip-label" title={pillar.label}>
                              {pillar.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="donate-choice-chips-summary">
                    <span>
                      <strong>{selectedPillars.length}</strong> / 6 {t('donate.selectedCount')}:
                      <span style={{ marginLeft: '0.4rem', color: 'var(--color-forest-900)', fontWeight: 600 }}>
                        {activeAllocatedCause}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Direct Amount Input Field */}
                <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                  <label className="form-label" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>
                    {language === 'te' ? 'విరాళం మొత్తం (INR ₹) *' : language === 'hi' ? 'दान राशि (INR ₹) *' : 'Contribution Amount (INR ₹) *'}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{
                      position: 'absolute',
                      left: '1.1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      color: 'var(--color-forest-700)',
                      pointerEvents: 'none'
                    }}>
                      ₹
                    </span>
                    <input
                      ref={amountInputRef}
                      type="number"
                      min="1"
                      step="any"
                      required
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        if (amountError) setAmountError('');
                      }}
                      className="form-input"
                      placeholder={t('donate.customAmountPlaceholder')}
                      style={{
                        paddingLeft: '2.6rem',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'var(--color-forest-900)',
                        height: '52px',
                        backgroundColor: '#FFFFFF',
                        border: amountError ? '2px solid #DC2626' : '2px solid rgba(27, 77, 52, 0.25)'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.45rem', fontSize: '0.82rem', color: amountError ? '#DC2626' : 'var(--color-text-muted)' }}>
                    <span>{amountError || (language === 'te' ? 'మీ స్వంత మొత్తాన్ని నమోదు చేయండి (కనిష్ట ₹1)' : language === 'hi' ? 'अपनी इच्छानुसार राशि दर्ज करें (न्यूनतम ₹1)' : 'Type your own contribution amount (min ₹1)')}</span>
                    {customAmount && !Number.isNaN(Number(customAmount)) && Number(customAmount) > 0 && (
                      <strong style={{ color: 'var(--color-forest-700)' }}>
                        ₹{Number(customAmount).toLocaleString('en-IN')}
                      </strong>
                    )}
                  </div>
                </div>

                {/* Donor Details for Receipt */}
                <h4 style={{ fontSize: '1.2rem', color: 'var(--color-forest-900)', marginBottom: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-card)' }}>
                  {t('donate.donorInfoTitle')}
                </h4>

                <form onSubmit={handleSimulateDonation}>
                  <div className="form-group">
                    <label className="form-label">{t('donate.fullName')}</label>
                    <input
                      type="text"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="form-input"
                      placeholder={t('donate.fullNamePlaceholder')}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">{t('donate.email')}</label>
                      <input
                        type="email"
                        required
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="form-input"
                        placeholder={t('donate.emailPlaceholder')}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('donate.phone')}</label>
                      <input
                        type="tel"
                        required
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="form-input"
                        placeholder={t('donate.phonePlaceholder')}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('donate.panLabel')}</label>
                    <input
                      type="text"
                      maxLength="10"
                      value={donorPan}
                      onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                      className="form-input"
                      placeholder={t('donate.panPlaceholder')}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="sprout"
                    size="lg"
                    icon={Heart}
                    style={{ width: '100%', marginTop: '1rem' }}
                  >
                    {t('donate.confirmBtn')}
                  </Button>
                </form>

                {/* 80G Disclaimer */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  <Info size={16} style={{ color: 'var(--color-forest-700)', flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    {t('donate.taxNotice')}
                  </span>
                </div>
              </div>

              {/* Right Column: Instant UPI QR & Bank Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* UPI QR Code Box */}
                <div className="upi-qr-card">
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-sprout-light)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                    {t('donate.badge')}
                  </div>
                  <h4 style={{ color: '#FFFFFF', marginBottom: '1.25rem' }}>{t('donate.upiTitle')}</h4>

                  <div className="upi-qr-box">
                    <svg width="190" height="190" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" fill="white" />
                      <rect x="10" y="10" width="26" height="26" rx="4" fill="#0C261A" />
                      <rect x="15" y="15" width="16" height="16" rx="2" fill="white" />
                      <rect x="18" y="18" width="10" height="10" rx="1" fill="#0C261A" />
                      <rect x="64" y="10" width="26" height="26" rx="4" fill="#0C261A" />
                      <rect x="69" y="15" width="16" height="16" rx="2" fill="white" />
                      <rect x="72" y="18" width="10" height="10" rx="1" fill="#0C261A" />
                      <rect x="10" y="64" width="26" height="26" rx="4" fill="#0C261A" />
                      <rect x="15" y="69" width="16" height="16" rx="2" fill="white" />
                      <rect x="18" y="72" width="10" height="10" rx="1" fill="#0C261A" />
                      <rect x="42" y="12" width="6" height="6" fill="#1B4D34" />
                      <rect x="52" y="12" width="6" height="6" fill="#78C953" />
                      <rect x="42" y="24" width="16" height="6" fill="#0C261A" />
                      <rect x="42" y="34" width="6" height="16" fill="#1B4D34" />
                      <rect x="52" y="34" width="6" height="6" fill="#78C953" />
                      <rect x="12" y="42" width="12" height="6" fill="#0C261A" />
                      <rect x="28" y="42" width="8" height="8" fill="#1B4D34" />
                      <rect x="64" y="42" width="12" height="6" fill="#78C953" />
                      <rect x="80" y="42" width="8" height="8" fill="#0C261A" />
                      <rect x="42" y="56" width="16" height="6" fill="#1B4D34" />
                      <rect x="64" y="56" width="6" height="16" fill="#0C261A" />
                      <rect x="76" y="56" width="12" height="6" fill="#78C953" />
                      <rect x="42" y="68" width="8" height="8" fill="#78C953" />
                      <rect x="54" y="68" width="6" height="20" fill="#0C261A" />
                      <rect x="68" y="76" width="20" height="6" fill="#1B4D34" />
                      <rect x="76" y="86" width="12" height="6" fill="#78C953" />
                      <circle cx="50" cy="50" r="10" fill="#0C261A" />
                      <circle cx="50" cy="50" r="8" fill="#78C953" />
                    </svg>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-light-muted)', marginBottom: '0.75rem' }}>
                    Google Pay • PhonePe • Paytm • BHIM • Amazon Pay
                  </div>

                  <div
                    className="upi-id-pill"
                    onClick={handleCopyUpi}
                    title="Click to copy UPI ID"
                  >
                    <span>manchipanulu.sewa@upi</span>
                    {copiedUpi ? <Check size={16} color="#78C953" /> : <Copy size={16} />}
                  </div>
                  {copiedUpi && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-sprout-light)', fontWeight: 600 }}>
                      ✓ {t('donate.upiCopied')}
                    </div>
                  )}
                </div>

                {/* Bank Account Details Card */}
                <div className="bank-details-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                    <Building size={22} style={{ color: 'var(--color-forest-700)' }} />
                    <h4 style={{ color: 'var(--color-forest-900)' }}>{t('donate.bankTitle')}</h4>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Beneficiary:</span>
                      <strong style={{ color: 'var(--color-forest-900)', wordBreak: 'break-word', textAlign: 'right' }}>Manchi Panulu Sewa Foundation</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Bank:</span>
                      <strong style={{ color: 'var(--color-forest-900)' }}>State Bank of India (SBI)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Account Number:</span>
                      <strong style={{ fontFamily: 'monospace', color: 'var(--color-forest-900)' }}>41234567890</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>IFSC Code:</span>
                      <strong style={{ fontFamily: 'monospace', color: 'var(--color-forest-900)' }}>SBIN0012345</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Account Type:</span>
                      <strong style={{ color: 'var(--color-forest-900)' }}>Current / Trust Account</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERNATIONAL SUPPORTERS */}
          {donorTab === 'international' && (
            <div style={{ maxWidth: '960px', margin: '0 auto' }}>
              <div className="donation-card-main">
                {/* Mandatory Regulatory Clearance Notice */}
                <div className="regulatory-notice-box" style={{ marginTop: 0, marginBottom: '2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <ShieldCheck size={26} style={{ color: '#A06E1A', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ fontSize: '1rem', display: 'block', marginBottom: '0.35rem' }}>
                        {t('donate.intlNotice')}
                      </strong>
                      <p style={{ fontSize: '0.9rem', color: '#6C521E', lineHeight: '1.6' }}>
                        {t('donate.intlDesc')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Currency Switcher */}
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-forest-900)' }}>
                    Preferred Global Currency:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {['USD', 'EUR', 'GBP'].map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setSelectedCurrency(curr)}
                        style={{
                          padding: '0.45rem 1.1rem',
                          borderRadius: 'var(--radius-pill)',
                          border: '1.5px solid var(--color-border-card)',
                          backgroundColor: selectedCurrency === curr ? 'var(--color-forest-900)' : '#FFFFFF',
                          color: selectedCurrency === curr ? '#FFFFFF' : 'var(--color-text-main)',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {curr} ({curr === 'USD' ? '$' : curr === 'EUR' ? '€' : '£'})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Multi-Selection Choice Chips: Select Your Contribution For */}
                <div className="donate-choice-chips-wrapper">
                  <div className="donate-choice-chips-header">
                    <div className="donate-choice-chips-title-group">
                      <div className="donate-choice-chips-title">
                        <Sparkles size={16} style={{ color: 'var(--color-sprout-dark, #2E7D32)' }} />
                        <span>{t('donate.selectContributionFor')}</span>
                      </div>
                      <span className="donate-choice-chips-sub">{t('donate.selectPillarsSub')}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleAllPillars}
                      className="donate-choice-chips-toggle-btn"
                    >
                      {selectedPillars.length === pillarsList.length ? t('donate.deselectAll') : t('donate.selectAll')}
                    </button>
                  </div>

                  <div className="donate-choice-chips-grid">
                    {pillarsList.map((pillar) => {
                      const isSelected = selectedPillars.includes(pillar.id);
                      const IconComp = pillar.icon;
                      return (
                        <div
                          key={pillar.id}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={0}
                          onClick={() => handleTogglePillar(pillar.id)}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault();
                              handleTogglePillar(pillar.id);
                            }
                          }}
                          className={`donate-choice-chip ${isSelected ? 'selected' : ''}`}
                          style={{
                            borderColor: isSelected ? pillar.borderColor : '#E2E8F0',
                            backgroundColor: isSelected ? pillar.lightBg : '#FFFFFF'
                          }}
                        >
                          <div
                            className="donate-chip-checkbox"
                            style={{
                              backgroundColor: isSelected ? pillar.color : '#FFFFFF',
                              borderColor: isSelected ? pillar.color : '#CBD5E1'
                            }}
                          >
                            {isSelected && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
                          </div>

                          <div
                            className="donate-chip-icon-wrap"
                            style={{
                              backgroundColor: isSelected ? '#FFFFFF' : pillar.lightBg,
                              color: pillar.color
                            }}
                          >
                            <IconComp size={16} />
                          </div>

                          <div className="donate-chip-content">
                            <span className="donate-chip-number" style={{ color: pillar.color }}>
                              Pillar {pillar.num}
                            </span>
                            <span className="donate-chip-label" title={pillar.label}>
                              {pillar.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="donate-choice-chips-summary">
                    <span>
                      <strong>{selectedPillars.length}</strong> / 6 {t('donate.selectedCount')}:
                      <span style={{ marginLeft: '0.4rem', color: 'var(--color-forest-900)', fontWeight: 600 }}>
                        {activeAllocatedCause}
                      </span>
                    </span>
                  </div>
                </div>

                {/* International Amount Input Field */}
                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label className="form-label" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>
                    {language === 'te' ? `విరాళం మొత్తం (${selectedCurrency}) *` : language === 'hi' ? `दान राशि (${selectedCurrency}) *` : `Enter Contribution Amount (${selectedCurrency}) *`}
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{
                      position: 'absolute',
                      left: '1.1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      color: 'var(--color-forest-700)',
                      pointerEvents: 'none'
                    }}>
                      {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : '£'}
                    </span>
                    <input
                      ref={amountInputRef}
                      type="number"
                      min="1"
                      step="any"
                      required
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        if (amountError) setAmountError('');
                      }}
                      className="form-input"
                      placeholder={selectedCurrency === 'USD' ? 'e.g. 50' : selectedCurrency === 'EUR' ? 'e.g. 45' : 'e.g. 40'}
                      style={{
                        paddingLeft: '2.5rem',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'var(--color-forest-900)',
                        height: '52px',
                        backgroundColor: '#FFFFFF',
                        border: amountError ? '2px solid #DC2626' : '2px solid rgba(27, 77, 52, 0.25)'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.45rem', fontSize: '0.82rem', color: amountError ? '#DC2626' : 'var(--color-text-muted)' }}>
                    <span>{amountError || (language === 'te' ? 'మీ స్వంత మొత్తాన్ని నమోదు చేయండి' : language === 'hi' ? 'अपनी इच्छानुसार राशि दर्ज करें' : 'Type your own contribution amount')}</span>
                    {customAmount && !Number.isNaN(Number(customAmount)) && Number(customAmount) > 0 && (
                      <strong style={{ color: 'var(--color-forest-700)' }}>
                        {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : '£'}{Number(customAmount).toLocaleString()}
                      </strong>
                    )}
                  </div>
                </div>

                {/* International Inquiry Form */}
                <h4 style={{ fontSize: '1.25rem', color: 'var(--color-forest-900)', marginBottom: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-card)' }}>
                  {t('donate.intlRegInterest')}
                </h4>

                <form onSubmit={handleSimulateDonation}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">{t('donate.fullName')}</label>
                      <input
                        type="text"
                        required
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="form-input"
                        placeholder={t('donate.fullNamePlaceholder')}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('donate.email')}</label>
                      <input
                        type="email"
                        required
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="form-input"
                        placeholder={t('donate.emailPlaceholder')}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Country of Residence *</label>
                      <input
                        type="text"
                        required
                        value={internationalCountry}
                        onChange={(e) => setInternationalCountry(e.target.value)}
                        className="form-input"
                        placeholder="e.g. United States, United Kingdom, UAE, Germany"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Organization / Individual</label>
                      <input
                        type="text"
                        value={donorPan}
                        onChange={(e) => setDonorPan(e.target.value)}
                        className="form-input"
                        placeholder="Individual / Diaspora Foundation / Corporate CSR"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={Globe}
                    style={{ width: '100%', marginTop: '1rem' }}
                  >
                    {t('donate.intlRegInterest')}
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Transaction History Section (Shown Below Donation Section After Donations) */}
      {transactions.length > 0 && (
        <section
          ref={txSectionRef}
          id="donation-transactions"
          className="section donation-transactions-section"
          aria-labelledby="tx-history-heading"
        >
          <div className="container">
            <div className="tx-history-header">
              <div>
                <div className="badge" style={{ marginBottom: '0.65rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Receipt size={15} />
                  <span>{t('donate.txBadge')}</span>
                </div>
                <h2 id="tx-history-heading" style={{ fontSize: 'clamp(1.5rem, 3.8vw, 2.15rem)', color: 'var(--color-forest-900)', marginBottom: '0.35rem' }}>
                  {t('donate.txTitle')}
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', maxWidth: '640px' }}>
                  {t('donate.txSubtitle')}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--color-forest-900)',
                  backgroundColor: 'var(--color-sage-100)',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--color-border-card)'
                }}>
                  {transactions.length}{' '}
                  {transactions.length === 1 ? t('donate.txTotalCountSingle') : t('donate.txTotalCount')}
                </span>
                <button
                  type="button"
                  onClick={handleClearTransactions}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                    background: 'transparent',
                    border: '1px solid var(--color-border-card)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '0.42rem 0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={14} />
                  <span>{t('donate.txClearHistory')}</span>
                </button>
              </div>
            </div>

            <div className="tx-list">
              {transactions.map((tx, idx) => {
                const isLatest = idx === 0;
                const isDomesticTx = tx.type === 'domestic';
                const formattedAmount =
                  tx.currency === 'INR'
                    ? `₹${Number(tx.amount).toLocaleString('en-IN')}`
                    : `${tx.currency} ${tx.amount}`;
                const displayCause = resolveAllocatedCause(tx);

                return (
                  <div
                    key={tx.receiptNo}
                    className={`tx-card ${isLatest ? 'tx-card--latest' : ''}`}
                    data-receipt-no={tx.receiptNo}
                  >
                    <div className="tx-card-top">
                      <div className="tx-receipt-id-group">
                        <span className="tx-receipt-code">{tx.receiptNo}</span>
                        {isLatest && (
                          <span className="tx-badge-latest">{t('donate.txLatestBadge')}</span>
                        )}
                        <span className="tx-badge-status">
                          <CheckCircle2 size={13} />
                          <span>
                            {isDomesticTx
                              ? t('donate.txStatusVerified')
                              : t('donate.txStatusInternational')}
                          </span>
                        </span>
                      </div>

                      <div className="tx-date-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Clock size={14} />
                        <span>{tx.date}{tx.time ? ` • ${tx.time}` : ''}</span>
                      </div>
                    </div>

                    <div className="tx-body-grid">
                      <div>
                        <span className="tx-field-label">{t('donate.donorLabel').replace(':', '')}</span>
                        <div className="tx-field-primary">{tx.donorName}</div>
                        <div className="tx-field-secondary">
                          {tx.donorEmail}
                          {tx.donorPan && tx.donorPan !== 'N/A' ? ` • ${isDomesticTx ? 'PAN' : 'Org'}: ${tx.donorPan}` : ''}
                        </div>
                      </div>

                      <div>
                        <span className="tx-field-label">{t('donate.causeLabel').replace(':', '')}</span>
                        <div className="tx-field-primary" style={{ fontSize: '0.94rem' }}>{displayCause}</div>
                        <div className="tx-field-secondary">
                          {t('donate.txMethodLabel')}{' '}
                          {isDomesticTx ? t('donate.txMethodDomestic') : `${t('donate.txMethodIntl')} (${tx.country || tx.currency})`}
                        </div>
                      </div>

                      <div>
                        <span className="tx-field-label">{t('donate.amountLabel').replace(':', '')}</span>
                        <div className="tx-amount-display">{formattedAmount}</div>
                      </div>

                      <div className="tx-actions-group">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Eye}
                          iconPosition="left"
                          onClick={() => handleViewTransactionReceipt(tx)}
                        >
                          {t('donate.txViewReceipt')}
                        </Button>
                        <Button
                          variant="sprout"
                          size="sm"
                          icon={Download}
                          iconPosition="left"
                          disabled={downloadingTxId === tx.receiptNo}
                          onClick={() => handleDownloadTransactionPdf(tx)}
                        >
                          {downloadingTxId === tx.receiptNo
                            ? t('donate.txDownloading')
                            : t('donate.txDownloadPdf')}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Official Receipt Modal */}
      {receiptData && (
        <div className="modal-overlay" onClick={closeReceiptModal} role="dialog" aria-modal="true">
          <div className="modal-card" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeReceiptModal} aria-label={t('donate.closeBtn')}>
              ×
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(120, 201, 83, 0.2)',
                color: 'var(--color-forest-700)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.85rem'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: 'clamp(1.35rem, 4.5vw, 1.7rem)', color: 'var(--color-forest-900)', marginBottom: '0.25rem', lineHeight: '1.25' }}>
                {t('donate.receiptTitle')}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                {t('stats.transparencyBadge')} • {complianceInfo.registrationPlaceholder}
              </p>
            </div>

            <div style={{
              backgroundColor: 'var(--color-sage-100)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1rem, 3.5vw, 1.65rem)',
              marginBottom: '1.5rem',
              border: '1px dashed var(--color-forest-700)',
              fontSize: '0.92rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem 0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{t('donate.receiptNo')}</span>
                <strong style={{ fontFamily: 'monospace', color: 'var(--color-forest-900)' }}>{receiptData.receiptNo}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem 0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{t('donate.receiptDate')}</span>
                <span>{receiptData.date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem 0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{t('donate.donorLabel')}</span>
                <strong style={{ wordBreak: 'break-word' }}>{receiptData.donorName}</strong>
              </div>
              {receiptData.donorEmail && (
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem 0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Email:</span>
                  <span style={{ wordBreak: 'break-all' }}>{receiptData.donorEmail}</span>
                </div>
              )}
              {receiptData.donorPan && receiptData.donorPan !== 'N/A' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem 0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>{receiptData.type === 'domestic' ? 'PAN (80G):' : 'Organization:'}</span>
                  <strong style={{ fontFamily: 'monospace' }}>{receiptData.donorPan}</strong>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.25rem 0.75rem', marginBottom: '0.75rem', paddingTop: '0.4rem', borderTop: '1px solid rgba(27, 77, 52, 0.14)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{t('donate.amountLabel')}</span>
                <strong style={{ fontSize: '1.25rem', color: 'var(--color-forest-900)' }}>
                  {receiptData.currency === 'INR'
                    ? `₹${Number(receiptData.amount).toLocaleString('en-IN')}`
                    : `${receiptData.currency} ${receiptData.amount}`}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem 0.75rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{t('donate.causeLabel')}</span>
                <span style={{ textAlign: 'right', fontWeight: 600 }}>
                  {resolvedReceiptCause}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="sprout"
                size="md"
                icon={receiptPdf.downloaded ? Check : Download}
                onClick={handleDownloadReceipt}
                disabled={receiptPdf.generating && !receiptPdf.url}
              >
                {receiptPdf.generating && !receiptPdf.url
                  ? t('donate.preparingBtn')
                  : receiptPdf.downloaded
                    ? t('donate.downloadedBtn')
                    : t('donate.downloadBtn')}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={closeReceiptModal}
              >
                {t('donate.closeBtn')}
              </Button>
            </div>

            {receiptPdf.downloaded && receiptPdf.url && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(120, 201, 83, 0.14)',
                border: '1px solid rgba(27, 77, 52, 0.2)',
                textAlign: 'center',
                fontSize: '0.85rem',
                color: 'var(--color-forest-900)'
              }}>
                <div>
                  <strong>✓ {t('donate.downloadSuccessMsg')}</strong>{' '}
                  <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'inline-block' }}>({receiptPdf.filename})</span>
                </div>
                <div style={{ marginTop: '0.3rem' }}>
                  <a
                    href={receiptPdf.url}
                    download={receiptPdf.filename}
                    style={{
                      color: 'var(--color-forest-700)',
                      fontWeight: 700,
                      textDecoration: 'underline'
                    }}
                  >
                    {t('donate.saveManuallyLink')}
                  </a>
                </div>
              </div>
            )}

            {receiptPdf.error && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                textAlign: 'center',
                fontSize: '0.85rem',
                color: '#991B1B'
              }}>
                {receiptPdf.error}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
