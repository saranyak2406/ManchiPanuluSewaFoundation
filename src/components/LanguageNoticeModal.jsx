import React from 'react';
import { Globe, X, Check, HeartHandshake } from 'lucide-react';
import Button from './Button';

export default function LanguageNoticeModal({ isOpen, onClose, selectedLang }) {
  if (!isOpen) return null;

  const content = {
    te: {
      title: "తెలుగు అనువాదం రాబోతోంది (Telugu Support)",
      subtitle: "మంచి పనుల సేవా ఫౌండేషన్",
      greeting: "నమస్కారం!",
      message: "మంచి పనుల సేవా ఫౌండేషన్ అధికారిక వెబ్‌సైట్ పూర్తి తెలుగు అనువాదం ప్రస్తుతం స్వచ్ఛంద అనువాదకుల ద్వారా రూపొందించబడుతోంది. ప్రస్తుతం వెబ్‌సైట్ ప్రామాణిక ఆంగ్లంలో అందుబాటులో ఉంది.",
      pillars: "మా ప్రధాన మూడు సూత్రాలు: మొక్కలు (ప్రకృతి రక్షణ) • సేవా (మానవ సంక్షేమం) • పర్యావరణ సేవా (కాలుష్య నిర్మూలన & జల సంరక్షణ).",
      actionText: "ఆంగ్ల వెర్షన్‌ను కొనసాగించండి"
    },
    hi: {
      title: "हिन्दी अनुवाद आगामी (Hindi Support)",
      subtitle: "मंची पनुलु सेवा फाउंडेशन",
      greeting: "नमस्ते!",
      message: "मंची पनुलु सेवा फाउंडेशन की आधिकारिक वेबसाइट का पूर्ण हिन्दी संस्करण हमारे स्वयंसेवी अनुवादकों द्वारा अंतिम रूप दिया जा रहा है। वर्तमान में वेबसाइट मानक अंग्रेजी में उपलब्ध है।",
      pillars: "हमारे तीन मुख्य स्तंभ: वृक्षारोपण (प्रकृति संरक्षण) • सेवा (मानव कल्याण) • पर्यावरण सेवा (जल एवं स्वच्छता संवर्धन)।",
      actionText: "अंग्रेजी संस्करण जारी रखें"
    }
  };

  const current = content[selectedLang] || content.te;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(120, 201, 83, 0.15)',
            color: 'var(--color-forest-700)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <Globe size={32} />
          </div>
          <h3 style={{ marginBottom: '0.35rem', color: 'var(--color-forest-900)' }}>{current.title}</h3>
          <p style={{ fontWeight: '700', color: 'var(--color-forest-600)', fontSize: '0.95rem' }}>{current.subtitle}</p>
        </div>

        <div style={{
          backgroundColor: 'var(--color-sage-100)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.5rem',
          borderLeft: '4px solid var(--color-forest-700)'
        }}>
          <p style={{ fontWeight: '700', color: 'var(--color-forest-900)', marginBottom: '0.5rem' }}>{current.greeting}</p>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', lineHeight: '1.6', marginBottom: '0.75rem' }}>
            {current.message}
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-forest-800)', fontWeight: '600' }}>
            {current.pillars}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="primary" onClick={onClose} icon={Check}>
            {current.actionText}
          </Button>
        </div>
      </div>
    </div>
  );
}

