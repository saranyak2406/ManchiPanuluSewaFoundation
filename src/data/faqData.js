export const faqData = [
  {
    question: "What does 'Manchi Panulu Sewa Foundation' stand for?",
    answer: "In Telugu, 'Manchi Panulu' translates to 'Good Deeds' and 'Sewa' signifies 'Selfless Service'. Our foundation is built upon six non-negotiable pillars: Tree Plantation (Nature & Afforestation), Education Support (Child Literacy & Schooling), Medical Help (Emergency & Preventative Care), Annadanam (Hunger Alleviation), Free Funeral Services (Dignified Final Rites), and Orphan Children Care (Shelter, Nurture & Protection). We believe every single act of kindness creates a sustainable, compassionate tomorrow."
  },
  {
    question: "How do you ensure the long-term survival of planted saplings?",
    answer: "We never conduct 'photo-op' tree drives. For every sapling planted, we select indigenous climate-hardy species (Neem, Peepal, Banyan, Jamun), install tree guards or drip-lines where appropriate, and assign volunteer 'Tree Guardians' who monitor and document growth for a minimum of 36 months."
  },
  {
    question: "How are donations utilized, and can I receive a tax receipt?",
    answer: "100% of public contributions are allocated directly to grassroots field initiatives (saplings, compost, raw grains, meal preparation, cleaning gloves and safety equipment). Every Indian donor receives an instant digital acknowledgment receipt with transaction reference. Note: 80G tax exemption details are subject to statutory registration status (currently in-process of statutory registration)."
  },
  {
    question: "Can international supporters make a financial contribution?",
    answer: "In compliance with Indian statutory regulations (Foreign Contribution Regulation Act - FCRA), non-profits must hold valid FCRA clearance to accept direct overseas foreign inward remittances. We do not claim international donation eligibility without necessary statutory clearance. International friends and well-wishers can register their details through our International Inquiries desk, support our international awareness campaigns, or partner with authorized international affiliate networks."
  },
  {
    question: "How can I register as a volunteer, and do I need prior experience?",
    answer: "No prior experience is necessary! Anyone passionate about nature, human welfare, and environmental cleanliness can register on our 'Join Our Mission' page. We offer weekend field drives, kitchen prep sewa, digital content creation, and eco-workshop educator tracks."
  },
  {
    question: "Can I sponsor food or saplings for a personal celebration?",
    answer: "Yes! Many community members sponsor Annadhanam (meals) or a grove of 25+ saplings in commemoration of birthdays, anniversaries, or in loving memory of departed family members. You can specify this in your donation or contact our sewa coordination desk."
  }
];

export function getFaqData(lang = 'en') {
  if (lang === 'te') {
    return [
      {
        question: "'మంచి పనులు సేవా ఫౌండేషన్' అంటే ఏమిటి మరియు దీని ముఖ్య ఉద్దేశం ఏమిటి?",
        answer: "తెలుగులో 'మంచి పనులు' అంటే సమాజానికి, ప్రకృతికి మేలు చేసే నిస్వార్థ సత్కార్యాలు. మా ఫౌండేషన్ నాలుగు పవిత్ర స్తంభాలపై నిర్మితమైంది: వృక్ష సేవ (చెట్లు & ప్రకృతి రక్షణ), మానవ సేవ (మానవతా & సామాజిక సేవ), ప్రకృతి సేవ (పర్యావరణ పరిరక్షణ) మరియు ఆశ్రయ సేవ (పేదరిక నిర్మూలన & సాధికారత). ప్రతి చిన్న మంచి పని సుస్థిర రేపటి భవిష్యత్తును నిర్మిస్తుందని మేము బలంగా నమ్ముతాము."
      },
      {
        question: "నాటిన మొక్కలు ఎండిపోకుండా బతికేలా ఎలాంటి చర్యలు తీసుకుంటారు?",
        answer: "మేము కేవలం ఫోటోల కోసం మొక్కలు నాటే కార్యక్రమాలను నిర్వహించము. ప్రతి మొక్కకూ స్థానిక నేలకు అనువైన వేప, రావి, మర్రి, నేరేడు వంటి స్వదేశీ జాతులను ఎంచుకుంటాము. అవసరమైన చోట ట్రీ గార్డులు లేదా బిందు సేద్యం ఏర్పాటు చేసి, 'వృక్ష సంరక్షకులు'గా వాలంటీర్లను నియమించి కనీసం 36 నెలల పాటు వాటి పెరుగుదలను నమోదు చేస్తాము."
      },
      {
        question: "విరాళాల సొమ్మును ఎలా ఖర్చు చేస్తారు, పన్ను మినహాయింపు రసీదు లభిస్తుందా?",
        answer: "ప్రజల నుండి సేకరించిన విరాళాలలో 100% నేరుగా క్షేత్రస్థాయి కార్యక్రమాలకే (మొక్కలు, సేంద్రీయ ఎరువులు, ఆహార పదార్థాలు, భోజన తయారీ, చెరువుల శుభ్రత సామాగ్రి) వెచ్చిస్తాము. ప్రతి భారతీయ దాతకూ తక్షణ డిజిటల్ విరాళ రసీదు అందించబడుతుంది. (80G పన్ను మినహాయింపు చట్టబద్ధమైన రిజిస్ట్రేషన్ నిబంధనలకు లోబడి ఉంటుంది)."
      },
      {
        question: "విదేశాలలో ఉన్న ప్రవాసులు లేదా అంతర్జాతీయ దాతలు విరాళాలు ఇవ్వవచ్చా?",
        answer: "భారతీయ చట్టాల ప్రకారం (FCRA), విదేశాల నుండి నేరుగా నిధులు స్వీకరించడానికి చట్టబద్ధమైన అనుమతి అవసరం. పూర్తి అనుమతులు పొందే వరకు మేము చట్టానికి లోబడి మాత్రమే వ్యవహరిస్తాము. విదేశీ మిత్రులు మా అంతర్జాతీయ విచారణ డెస్క్ ద్వారా తమ ఆసక్తిని నమోదు చేసుకోవచ్చు లేదా ప్రపంచవ్యాప్త అవగాహన ప్రచారాలలో భాగస్వామ్యం కావచ్చు."
      },
      {
        question: "వాలంటీర్‌గా ఎలా చేరాలి, దీనికి మునుపటి అనుభవం అవసరమా?",
        answer: "ఎలాంటి ముందస్తు అనుభవం అవసరం లేదు! ప్రకృతి, పర్యావరణం మరియు మానవ సేవలపై ఆసక్తి ఉన్న ఎవరైనా మా 'మా ఉద్యమంలో చేరండి' పేజీలో నమోదు చేసుకోవచ్చు. వారాంతపు మొక్కల నాటే డ్రైవ్‌లు, అన్నదాన సేవ, లేదా ఇంటి నుండే డిజిటల్ మీడియా సహకారం వంటి వివిధ విభాగాలలో పనిచేయవచ్చు."
      },
      {
        question: "పుట్టినరోజులు లేదా ప్రత్యేక సందర్భాలలో అన్నదానం లేదా మొక్కలను స్పాన్సర్ చేయవచ్చా?",
        answer: "తప్పకుండా! చాలామంది దాతలు తమ లేదా తమ కుటుంబ సభ్యుల పుట్టినరోజులు, వివాహ వార్షికోత్సవాలు లేదా పెద్దల జ్ఞాపకార్థం ఆసుపత్రుల వద్ద అన్నదానాన్ని లేదా 25+ దేశీయ మొక్కల వనాన్ని స్పాన్సర్ చేస్తుంటారు. విరాళం ఇచ్చే సమయంలో లేదా మా సమన్వయ డెస్క్‌ను సంప్రదించి ఈ వివరాలను తెలియజేయవచ్చు."
      }
    ];
  }

  if (lang === 'hi') {
    return [
      {
        question: "'मंची पनुलु सेवा फाउंडेशन' का वास्तविक अर्थ और उद्देश्य क्या है?",
        answer: "तेलुगु में 'मंची पनुलु' का सीधा अर्थ है 'सत्कर्म या अच्छे कार्य'। हमारा फाउंडेशन चार पावन स्तंभों पर आधारित है: वृक्ष सेवा (प्रकृति संरक्षण), मानव सेवा (मानवीय सहायता), प्रकृति सेवा (पर्यावरण एवं जल संरक्षण) और आश्रय सेवा (निर्धनता निवारण)। हमारा विश्वास है कि आज का हर सत्कर्म कल के बेहतर विश्व की नींव है।"
      },
      {
        question: "रोपे गए पौधों की दीर्घकालिक सुरक्षा कैसे सुनिश्चित की जाती है?",
        answer: "हम केवल फोटो खिंचवाने हेतु पौधरोपण नहीं करते। प्रत्येक पौधे हेतु नीम, पीपल, बरगद जैसी स्थानीय देसी प्रजातियां चुनते हैं, ट्री-गार्ड या ड्रिप सिंचाई लगाते हैं और स्वयंसेवकों को 'वृक्ष संरक्षक' बनाकर कम से कम 36 महीनों तक उनकी वृद्धि की निगरानी करते हैं।"
      },
      {
        question: "दान राशि का उपयोग कैसे होता है, क्या मुझे कर छूट रसीद मिलेगी?",
        answer: "जनता से प्राप्त दान का 100% हिस्सा सीधे जमीनी सेवा कार्यों (पौधे, खाद, अनाज, भोजन पकाने के साधन और सफाई उपकरण) में प्रयुक्त होता है। सभी भारतीय दानदाताओं को तुरंत डिजिटल पावती रसीद दी जाती है। (80G कर छूट विधिक पंजीकरण नियमों के अंतर्गत है)।"
      },
      {
        question: "क्या विदेशों में रहने वाले प्रवासी भारतीय भी दान दे सकते हैं?",
        answer: "भारतीय नियमों (FCRA) के अनुसार विदेशों से सीधे बैंक खाते में दान लेने हेतु विशेष अनुमति अनिवार्य है। हम पूर्ण विधिक पारदर्शिता का पालन करते हैं। विदेशी मित्र हमारे अंतर्राष्ट्रीय पूछताछ डेस्क पर पंजीकरण करा सकते हैं अथवा हमारे वैश्विक जागरूकता अभियानों से जुड़ सकते हैं।"
      },
      {
        question: "स्वयंसेवक कैसे बनें, क्या इसके लिए कोई पूर्व अनुभव चाहिए?",
        answer: "किसी भी पूर्व अनुभव की आवश्यकता नहीं है! प्रकृति और मानवता की सेवा का जज्बा रखने वाला कोई भी व्यक्ति 'हमारे मिशन से जुड़ें' पृष्ठ पर पंजीकरण कर सकता है। सप्ताहांत पौधरोपण, भोजन सेवा, या घर बैठे डिजिटल सहयोग के रूप में कार्य किया जा सकता है।"
      },
      {
        question: "क्या जन्मदिन या पुण्यतिथि पर भोजन अथवा पौधरोपण प्रायोजित किया जा सकता है?",
        answer: "जी हाँ, बिल्कुल! अनेक दानदाता अपने परिजनों के जन्मदिन, विवाह वर्षगांठ अथवा पूर्वजों की स्मृति में अस्पताल में अन्नदान अथवा 25+ देसी पौधों का उपवन प्रायोजित करते हैं। आप दान करते समय इसका उल्लेख कर सकते हैं या हमारे सेवा डेस्क से संपर्क कर सकते हैं।"
      }
    ];
  }

  return faqData;
}
