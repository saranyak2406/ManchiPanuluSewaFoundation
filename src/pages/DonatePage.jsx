import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  QrCode,
  Copy,
  Check,
  ShieldCheck,
  Building,
  CreditCard,
  Globe,
  Info,
  Download,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import Button from '../components/Button';
import { complianceInfo } from '../data/statsData';
import { useLanguage } from '../context/LanguageContext';

export default function DonatePage() {
  const { t } = useLanguage();
  const [donorTab, setDonorTab] = useState('domestic'); // 'domestic' | 'international'
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedAmount, setSelectedAmount] = useState(1200);
  const [customAmount, setCustomAmount] = useState('');
  const [allocatedCause, setAllocatedCause] = useState('Where Most Needed (General Seva)');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Form State
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [internationalCountry, setInternationalCountry] = useState('United States');

  // Donation Receipt Simulation
  const [receiptData, setReceiptData] = useState(null);

  const domesticPresets = [
    { amount: 500, label: '5 Native Saplings' },
    { amount: 1200, label: '10 Wholesome Meals' },
    { amount: 2500, label: 'Lake Cleanup Equipment' },
    { amount: 5000, label: 'Urban Micro-Forest' }
  ];

  const internationalPresets = {
    USD: [
      { amount: 25, label: 'Nurture 10 Saplings' },
      { amount: 50, label: 'Feed 20 Caregivers' },
      { amount: 100, label: 'Waterbody Cleanup Gear' },
      { amount: 250, label: 'Sponsor Community Eco-Lab' }
    ],
    EUR: [
      { amount: 20, label: 'Nurture 10 Saplings' },
      { amount: 45, label: 'Feed 20 Caregivers' },
      { amount: 90, label: 'Waterbody Cleanup Gear' },
      { amount: 220, label: 'Sponsor Community Eco-Lab' }
    ],
    GBP: [
      { amount: 20, label: 'Nurture 10 Saplings' },
      { amount: 40, label: 'Feed 20 Caregivers' },
      { amount: 80, label: 'Waterbody Cleanup Gear' },
      { amount: 200, label: 'Sponsor Community Eco-Lab' }
    ]
  };

  const currentIntlPresets = internationalPresets[selectedCurrency] || internationalPresets.USD;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('manchipanulu.seva@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 3000);
  };

  const handleSimulateDonation = (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

    const receipt = {
      receiptNo: `MPSF-REC-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
      donorName: donorName || 'Kind Benefactor',
      donorEmail: donorEmail || 'kind.donor@example.com',
      donorPhone: donorPhone || 'N/A',
      donorPan: donorPan || 'N/A',
      amount: finalAmount,
      currency: donorTab === 'domestic' ? 'INR' : selectedCurrency,
      cause: allocatedCause,
      type: donorTab
    };

    setReceiptData(receipt);

    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#78C953', '#E2B357', '#0C261A', '#38A169']
      });
    } catch (err) {
      // ignore
    }
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
            <p className="page-hero-desc-exact">
              {t('donate.heroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Donation Container */}
      <section className="section section-sage">
        <div className="container">
          {/* Domestic vs International Tabs */}
          <div className="donation-tabs-wrapper">
            <div className="donation-tabs-switch">
              <button
                type="button"
                className={`donate-tab-btn ${donorTab === 'domestic' ? 'active' : ''}`}
                onClick={() => {
                  setDonorTab('domestic');
                  setSelectedAmount(1200);
                  setCustomAmount('');
                }}
              >
                🇮🇳 Domestic Donors (Indian INR ₹)
              </button>
              <button
                type="button"
                className={`donate-tab-btn ${donorTab === 'international' ? 'active' : ''}`}
                onClick={() => {
                  setDonorTab('international');
                  setSelectedAmount(50);
                  setCustomAmount('');
                }}
              >
                🌐 International Supporters & Diaspora
              </button>
            </div>
          </div>

          {/* TAB 1: DOMESTIC INDIAN DONORS */}
          {donorTab === 'domestic' && (
            <div className="donation-grid">
              {/* Left Column: Preset Selector and Form */}
              <div className="donation-card-main">
                <h3 style={{ fontSize: '1.65rem', color: 'var(--color-forest-900)', marginBottom: '0.4rem' }}>
                  Choose Your Contribution
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem' }}>
                  Select an impact amount or specify your own custom gift in Indian Rupees (₹).
                </p>

                {/* Preset Amounts */}
                <div className="preset-amounts-grid">
                  {domesticPresets.map((preset) => (
                    <button
                      key={preset.amount}
                      type="button"
                      className={`preset-amount-btn ${selectedAmount === preset.amount && !customAmount ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedAmount(preset.amount);
                        setCustomAmount('');
                      }}
                    >
                      <span className="preset-val">₹{preset.amount.toLocaleString('en-IN')}</span>
                      <span className="preset-impact">{preset.label}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                  <label className="form-label">Or Enter Custom Amount (INR ₹)</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--color-forest-700)' }}>
                      ₹
                    </span>
                    <input
                      type="number"
                      min="100"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(0);
                      }}
                      className="form-input"
                      placeholder="e.g. 10000"
                      style={{ paddingLeft: '2.4rem' }}
                    />
                  </div>
                </div>

                {/* Allocation Selector */}
                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label className="form-label">Allocate To Specific Pillar</label>
                  <select
                    value={allocatedCause}
                    onChange={(e) => setAllocatedCause(e.target.value)}
                    className="form-select"
                  >
                    <option value="Where Most Needed (General Seva)">Where Most Needed (General Seva)</option>
                    <option value="Plants – Indigenous Tree Plantation Drives">Plants – Indigenous Tree Plantation Drives</option>
                    <option value="Seva – Hospital Patient Food Relief (Annadhanam)">Seva – Hospital Patient Food Relief (Annadhanam)</option>
                    <option value="Environment Seva – Lake & River Revival Drives">Environment Seva – Lake & River Revival Drives</option>
                  </select>
                </div>

                {/* Donor Details for Receipt */}
                <h4 style={{ fontSize: '1.2rem', color: 'var(--color-forest-900)', marginBottom: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-card)' }}>
                  Donor Information for Digital Receipt
                </h4>

                <form onSubmit={handleSimulateDonation}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="form-input"
                      placeholder="As per PAN / Bank records"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Email Address (for Receipt) *</label>
                      <input
                        type="email"
                        required
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="form-input"
                        placeholder="receipt@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="form-input"
                        placeholder="10-digit mobile"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">PAN Number (Optional, for Indian 80G tax audit placeholder)</label>
                    <input
                      type="text"
                      maxLength="10"
                      value={donorPan}
                      onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                      className="form-input"
                      placeholder="e.g. ABCDE1234F"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="sprout"
                    size="lg"
                    icon={Heart}
                    style={{ width: '100%', marginTop: '1rem' }}
                  >
                    Generate Donation Acknowledgment & Receipt
                  </Button>
                </form>

                {/* 80G Disclaimer */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', marginTop: '1.5rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  <Info size={16} style={{ color: 'var(--color-forest-700)', flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    Tax Exemption Note: 80G certificate registration under Indian Income Tax Act is currently marked as a demonstration placeholder. Official receipts with statutory exemption codes will be issued once full certification is gazetted.
                  </span>
                </div>
              </div>

              {/* Right Column: Instant UPI QR & Bank Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* UPI QR Code Box */}
                <div className="upi-qr-card">
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-sprout-light)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                    Instant UPI Payment
                  </div>
                  <h4 style={{ color: '#FFFFFF', marginBottom: '1.25rem' }}>Scan with Any UPI App</h4>

                  <div className="upi-qr-box">
                    {/* Stylized QR Code SVG Placeholder */}
                    <svg width="190" height="190" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" fill="white" />
                      {/* Top-left locator */}
                      <rect x="10" y="10" width="26" height="26" rx="4" fill="#0C261A" />
                      <rect x="15" y="15" width="16" height="16" rx="2" fill="white" />
                      <rect x="18" y="18" width="10" height="10" rx="1" fill="#0C261A" />
                      {/* Top-right locator */}
                      <rect x="64" y="10" width="26" height="26" rx="4" fill="#0C261A" />
                      <rect x="69" y="15" width="16" height="16" rx="2" fill="white" />
                      <rect x="72" y="18" width="10" height="10" rx="1" fill="#0C261A" />
                      {/* Bottom-left locator */}
                      <rect x="10" y="64" width="26" height="26" rx="4" fill="#0C261A" />
                      <rect x="15" y="69" width="16" height="16" rx="2" fill="white" />
                      <rect x="18" y="72" width="10" height="10" rx="1" fill="#0C261A" />
                      {/* Data Pattern Mock */}
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
                      {/* Center Foundation Leaf Emblem */}
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
                    <span>manchipanulu.seva@upi</span>
                    {copiedUpi ? <Check size={16} color="#78C953" /> : <Copy size={16} />}
                  </div>
                  {copiedUpi && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-sprout-light)', fontWeight: 600 }}>
                      ✓ UPI ID Copied to Clipboard!
                    </div>
                  )}
                </div>

                {/* Bank Account Details Card */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2rem',
                  border: '1px solid var(--color-border-card)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                    <Building size={22} style={{ color: 'var(--color-forest-700)' }} />
                    <h4 style={{ color: 'var(--color-forest-900)' }}>Direct Bank Transfer (NEFT / IMPS)</h4>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Beneficiary Name:</span>
                      <strong style={{ color: 'var(--color-forest-900)' }}>Manchi Panulu Seva Foundation</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Bank Name:</span>
                      <strong style={{ color: 'var(--color-forest-900)' }}>State Bank of India (SBI)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Account Number:</span>
                      <strong style={{ fontFamily: 'monospace', color: 'var(--color-forest-900)' }}>41234567890 (Placeholder)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>IFSC Code:</span>
                      <strong style={{ fontFamily: 'monospace', color: 'var(--color-forest-900)' }}>SBIN0012345 (Placeholder)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        Notice to International & Overseas Donors (FCRA Regulatory Compliance)
                      </strong>
                      <p style={{ fontSize: '0.9rem', color: '#6C521E', lineHeight: '1.6' }}>
                        Under Indian law, non-profit entities require statutory clearance under the Foreign Contribution Regulation Act (FCRA) administered by the Ministry of Home Affairs to receive direct foreign inward wire contributions. <strong>Manchi Panulu Seva Foundation does not claim international donation eligibility without necessary statutory authorizations.</strong>
                      </p>
                      <p style={{ fontSize: '0.9rem', color: '#6C521E', lineHeight: '1.6', marginTop: '0.5rem' }}>
                        If you are an overseas citizen, NRI, or an international philanthropic body interested in supporting our environmental or social initiatives, please submit your inquiry below. We will coordinate through our approved international partnership networks or notify you once statutory overseas channels open.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Currency Switcher */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-forest-900)' }}>
                    Preferred Global Currency:
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['USD', 'EUR', 'GBP'].map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => {
                          setSelectedCurrency(curr);
                          setSelectedAmount(curr === 'USD' ? 50 : 40);
                        }}
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

                {/* International Presets */}
                <h4 style={{ fontSize: '1.2rem', color: 'var(--color-forest-900)', marginBottom: '1rem' }}>
                  Impact Sponsorship Tier
                </h4>
                <div className="preset-amounts-grid" style={{ marginBottom: '2rem' }}>
                  {currentIntlPresets.map((preset) => {
                    const symbol = selectedCurrency === 'USD' ? '$' : selectedCurrency === 'EUR' ? '€' : '£';
                    return (
                      <button
                        key={preset.amount}
                        type="button"
                        className={`preset-amount-btn ${selectedAmount === preset.amount && !customAmount ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedAmount(preset.amount);
                          setCustomAmount('');
                        }}
                      >
                        <span className="preset-val">{symbol}{preset.amount}</span>
                        <span className="preset-impact">{preset.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* International Inquiry Form */}
                <h4 style={{ fontSize: '1.25rem', color: 'var(--color-forest-900)', marginBottom: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-card)' }}>
                  Submit International Support Inquiry
                </h4>

                <form onSubmit={handleSimulateDonation}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="form-input"
                        placeholder="e.g. Michael Jenkins"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="form-input"
                        placeholder="e.g. m.jenkins@example.org"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
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

                  <div className="form-group">
                    <label className="form-label">Specific Pillar of Global Interest</label>
                    <select
                      value={allocatedCause}
                      onChange={(e) => setAllocatedCause(e.target.value)}
                      className="form-select"
                    >
                      <option value="Miyawaki Afforestation & Carbon Sequestration">Miyawaki Afforestation & Carbon Sequestration</option>
                      <option value="Direct Hunger Relief & Food Security (Annadhanam)">Direct Hunger Relief & Food Security (Annadhanam)</option>
                      <option value="Freshwater Wetland & Lake Revitalization">Freshwater Wetland & Lake Revitalization</option>
                      <option value="Youth Eco-Clubs & Environmental Education">Youth Eco-Clubs & Environmental Education</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={Globe}
                    style={{ width: '100%', marginTop: '1rem' }}
                  >
                    Submit International Partnership Pledge
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Simulated Receipt Modal */}
      {receiptData && (
        <div className="modal-overlay" onClick={() => setReceiptData(null)} role="dialog" aria-modal="true">
          <div className="modal-card" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setReceiptData(null)} aria-label="Close">
              ×
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(120, 201, 83, 0.2)',
                color: 'var(--color-forest-700)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--color-forest-900)', marginBottom: '0.25rem' }}>
                Thank You for Your Sacred Seva!
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Official Digital Acknowledgment Voucher
              </p>
            </div>

            <div style={{
              backgroundColor: 'var(--color-sage-100)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              marginBottom: '1.75rem',
              border: '1px dashed var(--color-forest-700)',
              fontSize: '0.92rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Receipt Reference:</span>
                <strong style={{ fontFamily: 'monospace', color: 'var(--color-forest-900)' }}>{receiptData.receiptNo}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Date:</span>
                <span>{receiptData.date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Donor Name:</span>
                <strong>{receiptData.donorName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Contribution Amount:</span>
                <strong style={{ fontSize: '1.2rem', color: 'var(--color-forest-900)' }}>
                  {receiptData.currency === 'INR' ? `₹${receiptData.amount.toLocaleString('en-IN')}` : `${receiptData.currency} ${receiptData.amount}`}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Designated Cause:</span>
                <span style={{ textAlign: 'right', maxWidth: '60%', fontWeight: 600 }}>{receiptData.cause}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-card)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Status:</span>
                <span style={{ color: 'var(--color-forest-700)', fontWeight: 700 }}>✓ Verified Pledge / Prototype Acknowledged</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Button
                variant="sprout"
                size="md"
                icon={Download}
                onClick={() => alert(`Receipt ${receiptData.receiptNo} simulated download started!`)}
              >
                Download Receipt Copy
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => setReceiptData(null)}
              >
                Close Window
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

