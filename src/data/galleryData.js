export const galleryData = [
  {
    id: "gal-1",
    title: "Miyawaki Forest Plantation Drive",
    category: "VrukshaSewa",
    categoryLabel: "VrukshaSewa (Afforestation)",
    date: "October 2025",
    location: "Green Belt Zone, Medchal",
    image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=80",
    description: "Volunteers and local school children planting over 1,500 native saplings during our Sunday afforestation drive.",
    type: "photo"
  },
  {
    id: "gal-2",
    title: "Nutritious Food Sewa at Hospital Shelter",
    category: "Sewa",
    categoryLabel: "Social Sewa",
    date: "November 2025",
    location: "Gandhi Hospital Shelter Outpost",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
    description: "Daily Annadhanam warm meal service providing hygienic, home-style nourishment to patient attendants and elders.",
    type: "photo"
  },
  {
    id: "gal-3",
    title: "Community Lake Bed Clean-up & Desilting",
    category: "Environment",
    categoryLabel: "Environmental Service",
    date: "December 2025",
    location: "Pedda Cheruvu Lakefront",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80",
    description: "Over 80 dedicated volunteers removing tons of non-biodegradable waste and clearing water inlet channels.",
    type: "photo"
  },
  {
    id: "gal-4",
    title: "Seed Ball Preparation Workshop with Children",
    category: "VrukshaSewa",
    categoryLabel: "VrukshaSewa (Afforestation)",
    date: "August 2025",
    location: "Zilla Parishad High School",
    image: "https://images.unsplash.com/photo-1618245472177-2a74ad3b994a?auto=format&fit=crop&w=1200&q=80",
    description: "Young students crafting 10,000 clay-and-compost seed balls embedded with native tree seeds for monsoon dispersal.",
    type: "photo"
  },
  {
    id: "gal-5",
    title: "Warm Blanket & Winter Relief Distribution",
    category: "Sewa",
    categoryLabel: "Social Sewa",
    date: "January 2026",
    location: "Old City Night Corridors",
    image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=1200&q=80",
    description: "Reaching vulnerable homeless individuals and daily wage workers during the peak winter cold wave.",
    type: "photo"
  },
  {
    id: "gal-6",
    title: "Plastic-Free Cloth Bag Campaign",
    category: "Environment",
    categoryLabel: "Environmental Service",
    date: "February 2026",
    location: "Rythu Bazaar & Weekly Market",
    image: "https://images.unsplash.com/photo-1745482035737-8cb1cc6d4471?auto=format&fit=crop&w=1200&q=80",
    description: "Replacing single-use carry bags by gifting organic cotton bags stitched by local women self-help collectives.",
    type: "photo"
  },
  {
    id: "gal-7",
    title: "Indigenous Sapling Nursery Management",
    category: "VrukshaSewa",
    categoryLabel: "VrukshaSewa (Afforestation)",
    date: "March 2026",
    location: "Foundation Central Nursery",
    image: "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80",
    description: "Tending to thousands of saplings before their monsoon free distribution to surrounding farming villages.",
    type: "photo"
  },
  {
    id: "gal-8",
    title: "Educational Kits Distribution Drive",
    category: "Sewa",
    categoryLabel: "Social Sewa",
    date: "June 2025",
    location: "Tribal Welfare School, Araku Valley",
    image: "https://images.unsplash.com/photo-1497486443155-158cceb6629a?auto=format&fit=crop&w=1200&q=80",
    description: "Equipping young minds with sustainable stationery, books, and solar study lamps for uninterrupted evening study.",
    type: "photo"
  },
  {
    id: "gal-9",
    title: "Wetland & Riverbank Eco-Restoration",
    category: "Environment",
    categoryLabel: "Environmental Service",
    date: "September 2025",
    location: "Musi River Tributary Buffer",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description: "Planting vetiver grass and riparian shrubs to prevent bank soil erosion and filter municipal stormwater.",
    type: "photo"
  },
  {
    id: "gal-video-1",
    title: "Story of Hope: The Haritha Forest Journey",
    category: "VrukshaSewa",
    categoryLabel: "Documentary Highlight",
    date: "Short Film Series",
    location: "Telangana Forest Strip",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    description: "A short documentary capturing how 200 passionate volunteers converted barren rocks into a lush green sanctuary.",
    type: "video",
    videoDuration: "4:15 min"
  },
  {
    id: "gal-video-2",
    title: "A Day in Amrutha Aahaaram Kitchen",
    category: "Sewa",
    categoryLabel: "Documentary Highlight",
    date: "Short Film Series",
    location: "Central Kitchen Hub",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
    description: "Step inside our volunteer-operated kitchen where 500+ fresh, wholesome meals are lovingly cooked and packaged every dawn.",
    type: "video",
    videoDuration: "3:40 min"
  }
];

export function getGalleryData(lang = 'en') {
  if (lang === 'te') {
    return [
      {
        ...galleryData[0],
        title: "మియావాకి అడవి పెంపకం డ్రైవ్",
        categoryLabel: "వృక్ష సేవ (అడవుల పెంపకం)",
        location: "గ్రీన్ బెల్ట్ జోన్, మేడ్చల్",
        description: "వారాంతపు సేవా కార్యక్రమంలో పాఠశాల విద్యార్థులు మరియు వాలంటీర్లు కలిసి 1,500 కంటే ఎక్కువ దేశీయ మొక్కలను నాటారు."
      },
      {
        ...galleryData[1],
        title: "ఆసుపత్రి వద్ద పౌష్టికాహార అన్నదానం",
        categoryLabel: "సామాజిక సేవ",
        location: "గాంధీ ఆసుపత్రి సేవా శిబిరం",
        description: "రోగుల సహాయకులకు మరియు వృద్ధులకు రోజూ పరిశుభ్రమైన, ఇంటి వంటి వేడి భోజనాన్ని అందించే నిరంతర సేవ."
      },
      {
        ...galleryData[2],
        title: "గ్రామ చెరువు పూడికతీత & శుభ్రత",
        categoryLabel: "పర్యావరణ సేవ",
        location: "పెద్ద చెరువు ప్రాంగణం",
        description: "80 మందికి పైగా వాలంటీర్లు కలిసి చెరువు గర్భం నుండి టన్నుల కొద్దీ ప్లాస్టిక్ వ్యర్థాలను తొలగించి, నీటి ప్రవాహ మార్గాలను శుభ్రపరిచారు."
      },
      {
        ...galleryData[3],
        title: "చిన్నారులతో విత్తన బంతుల (సీడ్ బాల్స్) తయారీ",
        categoryLabel: "వృక్ష సేవ (అడవుల పెంపకం)",
        location: "జిల్లా పరిషత్ ఉన్నత పాఠశాల",
        description: "వర్షాకాలంలో చల్లడానికి పాఠశాల విద్యార్థులు మట్టి, సేంద్రీయ ఎరువులతో 10,000 దేశీయ విత్తన బంతులను తయారు చేశారు."
      },
      {
        ...galleryData[4],
        title: "చలికాలంలో వెచ్చని దుప్పట్ల పంపిణీ",
        categoryLabel: "సామాజిక సేవ",
        location: "రాత్రి వేళల నిరాశ్రయుల ప్రాంతాలు",
        description: "తీవ్రమైన చలిగాలుల సమయంలో రోడ్డు పక్కన నివసించే నిస్సహాయులు మరియు కూలీలకు వెచ్చని దుప్పట్ల అందజేత."
      },
      {
        ...galleryData[5],
        title: "ప్లాస్టిక్ రహిత కాటన్ సంచుల ఉద్యమం",
        categoryLabel: "పర్యావరణ సేవ",
        location: "రైతు బజార్ & వారాంతపు సంత",
        description: "మహిళా సంఘాలు కుట్టిన కాటన్ సంచులను ప్రజలకు ఉచితంగా అందించి ప్లాస్టిక్ కవర్ల వాడకాన్ని అరికట్టే ప్రచారం."
      },
      {
        ...galleryData[6],
        title: "దేశీయ మొక్కల నర్సరీ సంరక్షణ",
        categoryLabel: "వృక్ష సేవ (అడవుల పెంపకం)",
        location: "ఫౌండేషన్ కేంద్ర నర్సరీ",
        description: "రైతులకు, గ్రామాలకు వర్షాకాలంలో ఉచితంగా పంపిణీ చేయడానికి వేలాది దేశీయ మొక్కల పోషణ."
      },
      {
        ...galleryData[7],
        title: "విద్యార్థులకు విద్యా కిట్ల పంపిణీ",
        categoryLabel: "సామాజిక సేవ",
        location: "గిరిజన సంక్షేమ పాఠశాల, అరకు లోయ",
        description: "పేద విద్యార్థులకు పుస్తకాలు, పర్యావరణ అనుకూల స్టేషనరీ మరియు సోలార్ స్టడీ ల్యాంప్స్ పంపిణీ."
      },
      {
        ...galleryData[8],
        title: "నదీ తీరాల పర్యావరణ పునరుద్ధరణ",
        categoryLabel: "పర్యావరణ సేవ",
        location: "నదీ పరీవాహక ప్రాంతం",
        description: "నేల కోతను అరికట్టడానికి మరియు వరద నీటిని సహజంగా శుద్ధి చేయడానికి వెటివర్ గడ్డి నాటడం."
      },
      {
        ...galleryData[9],
        title: "ఆశల కథ: హరిత అడవి ప్రయాణం",
        categoryLabel: "డాక్యుమెంటరీ విశేషం",
        location: "తెలంగాణ అటవీ ప్రాంతం",
        description: "200 మంది వాలంటీర్లు రాతి భూమిని పచ్చని నందనవనంగా ఎలా మార్చారో చూపించే లఘు డాక్యుమెంటరీ."
      },
      {
        ...galleryData[10],
        title: "అమృత ఆహారం వంటశాలలో ఒక రోజు",
        categoryLabel: "డాక్యుమెంటరీ విశేషం",
        location: "కేంద్ర వంటశాల",
        description: "రోజూ వేకువజామునే 500 మందికి పైగా రోగుల సహాయకుల కోసం ప్రేమతో వంటచేసే వాలంటీర్ల సేవా దృశ్యాలు."
      }
    ];
  }

  if (lang === 'hi') {
    return [
      {
        ...galleryData[0],
        title: "मियावाकी सघन वन पौधरोपण अभियान",
        categoryLabel: "वृक्ष सेवा (वनीकरण)",
        location: "ग्रीन बेल्ट जोन, मेडचल",
        description: "रविवार के अभियान में 1,500 से अधिक देसी पौधे लगाते स्कूली बच्चे और स्वयंसेवक।"
      },
      {
        ...galleryData[1],
        title: "अस्पताल में पौष्टिक अन्नदान सेवा",
        categoryLabel: "सामाजिक सेवा",
        location: "गांधी अस्पताल सेवा शिविर",
        description: "मरीजों के तीमारदारों और असहायों को घर जैसा स्वच्छ, ताजा व गर्म भोजन परोसने की दैनिक सेवा।"
      },
      {
        ...galleryData[2],
        title: "सामुदायिक तालाब की सफाई व गाद निकासी",
        categoryLabel: "पर्यावरण सेवा",
        location: "बड़ा तालाब परिसर",
        description: "80 से अधिक स्वयंसेवकों ने मिलकर झील से टन भर प्लास्टिक कचरा निकाला और जलमार्गों को साफ किया।"
      },
      {
        ...galleryData[3],
        title: "बच्चों के साथ बीज-गोला (सीड बॉल) निर्माण",
        categoryLabel: "वृक्ष सेवा (वनीकरण)",
        location: "जिला परिषद उच्च विद्यालय",
        description: "बारिश में बिखेरने हेतु स्कूली बच्चों ने मिट्टी और जैविक खाद से 10,000 बीज-गोले तैयार किए।"
      },
      {
        ...galleryData[4],
        title: "कड़ाके की ठंड में गर्म कंबल वितरण",
        categoryLabel: "सामाजिक सेवा",
        location: "रैन बसेरे व खुले गलियारे",
        description: "शीत लहर के दौरान खुले आसमान के नीचे सो रहे बेघरों और मजदूरों को कंबल व राहत सामग्री का वितरण।"
      },
      {
        ...galleryData[5],
        title: "प्लास्टिक मुक्ति सूती थैला अभियान",
        categoryLabel: "पर्यावरण सेवा",
        location: "साप्ताहिक सब्जी मंडी व बाजार",
        description: "महिला स्वयं सहायता समूहों द्वारा सिले सूती थैलों का मुफ्त वितरण कर पॉलीथीन मुक्ति का संदेश।"
      },
      {
        ...galleryData[6],
        title: "देसी पौध नर्सरी का संवर्धन",
        categoryLabel: "वृक्ष सेवा (वनीकरण)",
        location: "फाउंडेशन केंद्रीय नर्सरी",
        description: "किसानों व गांवों में निःशुल्क वितरण हेतु हजारों देसी पौधों की देखरेख व संवर्धन।"
      },
      {
        ...galleryData[7],
        title: "विद्यार्थियों को शैक्षिक किट वितरण",
        categoryLabel: "सामाजिक सेवा",
        location: "जनजातीय कल्याण विद्यालय, अराकू घाटी",
        description: "वंचित छात्रों को बैग, सोलर स्टडी लैंप और पर्यावरण अनुकूल कॉपियों का वितरण।"
      },
      {
        ...galleryData[8],
        title: "नदी तट व आर्द्रभूमि पारिस्थितिकी बहाली",
        categoryLabel: "पर्यावरण सेवा",
        location: "नदी तट बफर जोन",
        description: "मिट्टी के कटाव को रोकने और पानी को छानने के लिए खस (वेटीवर) के पौधे लगाना।"
      },
      {
        ...galleryData[9],
        title: "उम्मीद की कहानी: हरित वन यात्रा",
        categoryLabel: "वृत्तचित्र झलक",
        location: "तेलंगाना वन क्षेत्र",
        description: "200 स्वयंसेवकों ने बंजर पथरीली जमीन को कैसे हरे-भरे वन में बदला, इस पर एक प्रेरणादायक लघु फिल्म।"
      },
      {
        ...galleryData[10],
        title: "अमृत आहारम रसोई में एक दिन",
        categoryLabel: "वृत्तचित्र झलक",
        location: "केंद्रीय रसोई केंद्र",
        description: "प्रतिदिन भोर में 500 से अधिक लोगों के लिए प्रेम व सेवाभाव से भोजन तैयार करती स्वयंसेवक टीम।"
      }
    ];
  }

  return galleryData;
}
