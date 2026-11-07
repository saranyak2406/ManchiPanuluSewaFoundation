export const statsData = [
  {
    id: "trees-planted",
    numericValue: 48500,
    prefix: "",
    suffix: "+",
    label: "Native Trees Planted",
    description: "Across urban micro-forests, highways, schools & rural belts",
    icon: "TreePine",
    isPlaceholder: true,
    disclaimer: "Placeholder figure for demonstration and prototype audit."
  },
  {
    id: "meals-served",
    numericValue: 125000,
    prefix: "",
    suffix: "+",
    label: "Nutritious Meals Served",
    description: "Fresh hot Annadhanam at hospital shelters & vulnerable areas",
    icon: "HeartHandshake",
    isPlaceholder: true,
    disclaimer: "Placeholder figure for demonstration and prototype audit."
  },
  {
    id: "cleanups-conducted",
    numericValue: 74,
    prefix: "",
    suffix: " Drives",
    label: "Lake & City Cleanups",
    description: "Tons of non-biodegradable waste diverted from waterbodies",
    icon: "Sparkles",
    isPlaceholder: true,
    disclaimer: "Placeholder figure for demonstration and prototype audit."
  },
  {
    id: "volunteers-mobilized",
    numericValue: 3200,
    prefix: "",
    suffix: "+",
    label: "Registered Volunteers",
    description: "Active citizens, youths & community eco-guardians",
    icon: "Users",
    isPlaceholder: true,
    disclaimer: "Placeholder figure for demonstration and prototype audit."
  }
];

export function getStatsData(lang = 'en') {
  if (lang === 'te') {
    return [
      {
        id: "trees-planted",
        numericValue: 48500,
        prefix: "",
        suffix: "+",
        label: "నాటిన దేశీయ వృక్షాలు",
        description: "నగర చిట్టడవులు, రహదారులు, పాఠశాలలు మరియు గ్రామీణ ప్రాంతాలలో",
        icon: "TreePine"
      },
      {
        id: "meals-served",
        numericValue: 125000,
        prefix: "",
        suffix: "+",
        label: "అందించిన పౌష్టికాహార భోజనాలు",
        description: "ప్రభుత్వ ఆసుపత్రులు మరియు నిరుపేద ప్రాంతాలలో తాజా వేడి అన్నదానం",
        icon: "HeartHandshake"
      },
      {
        id: "cleanups-conducted",
        numericValue: 74,
        prefix: "",
        suffix: " కార్యక్రమాలు",
        label: "జలాశయాల పూడికతీత & శుభ్రత",
        description: "చెరువులు మరియు బావుల నుండి టన్నుల కొద్దీ ప్లాస్టిక్ వ్యర్థాల తొలగింపు",
        icon: "Sparkles"
      },
      {
        id: "volunteers-mobilized",
        numericValue: 3200,
        prefix: "",
        suffix: "+",
        label: "క్రియాశీల వాలంటీర్లు",
        description: "నిస్వార్థ పౌరులు, కళాశాల యువత మరియు పర్యావరణ పరిరక్షకులు",
        icon: "Users"
      }
    ];
  }

  if (lang === 'hi') {
    return [
      {
        id: "trees-planted",
        numericValue: 48500,
        prefix: "",
        suffix: "+",
        label: "रोपे गए देसी वृक्ष",
        description: "शहरी सूक्ष्म-वनों, राजमार्गों, विद्यालयों और ग्रामीण अंचलों में",
        icon: "TreePine"
      },
      {
        id: "meals-served",
        numericValue: 125000,
        prefix: "",
        suffix: "+",
        label: "परोसा गया पौष्टिक भोजन",
        description: "सरकारी अस्पतालों और रैन बसेरों के बाहर ताजा व गर्म अन्नदान",
        icon: "HeartHandshake"
      },
      {
        id: "cleanups-conducted",
        numericValue: 74,
        prefix: "",
        suffix: " अभियान",
        label: "झील व पर्यावरण स्वच्छता",
        description: "जलस्रोतों से मीट्रिक टन प्लास्टिक और अपशिष्ट का सुरक्षित निस्तारण",
        icon: "Sparkles"
      },
      {
        id: "volunteers-mobilized",
        numericValue: 3200,
        prefix: "",
        suffix: "+",
        label: "पंजीकृत स्वयंसेवक",
        description: "जागरूक नागरिक, युवा छात्र एवं समर्पित पर्यावरण रक्षक",
        icon: "Users"
      }
    ];
  }

  return statsData;
}

export const complianceInfo = {
  foundationName: "Manchi Panulu Sewa Foundation",
  registeredType: "Non-Governmental Non-Profit Organization (Registered Trust / Section 8 Placeholder)",
  registrationPlaceholder: "Reg. No. MPSF/AP-TS/2024/XXXX (Placeholder)",
  panPlaceholder: "AAATM0000A (Placeholder)",
  taxDeduction80G: "80G Tax Exemption Certificate under Indian Income Tax Act (Pending / In-Process Placeholder)",
  fcraStatus: "FCRA (Foreign Contribution Regulation Act) registration is in-process/compliance. Currently accepting domestic contributions only; international donors can register interest for authorized foreign routing channels.",
  defaultCurrency: "INR (₹)",
  supportedCurrencies: ["INR (₹)", "USD ($)", "EUR (€)", "GBP (£)"],
  officeAddress: "Plot No. 42, Santhi Nagar, Beside Green Park, Hyderabad / Visakhapatnam, India - 500034 (Placeholder)",
  helplinePhone: "+91 98765 43210 (Placeholder Helpline)",
  officialEmail: "contact@manchipanulusewa.org (Placeholder)",
  volunteerEmail: "volunteer@manchipanulusewa.org",
  donationsEmail: "donations@manchipanulusewa.org",
  workingHours: "Monday to Saturday: 9:00 AM – 6:30 PM IST"
};
