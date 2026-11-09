export const blogData = [
  {
    id: "why-native-trees-matter-afforestation",
    title: "Why Planting Native Trees is Vital for Indian Ecosystems",
    category: "VrukshaSewa",
    categoryLabel: "VrukshaSewa (Nature Protection)",
    author: "Green Stewardship Team",
    date: "October 18, 2025",
    readTime: "5 min read",
    image: "/pillars/tree-plantation.jpg",
    excerpt: "Monoculture eucalyptus or ornamental exotic trees may grow quickly, but indigenous species like Peepal, Neem, and Banyan sustain 10x more native pollinators and birds while preserving ground aquifers.",
    content: `
When embarking on tree plantation campaigns, the choice of saplings defines whether we are truly revitalizing ecology or inadvertently depleting groundwater.

In recent decades, fast-growing exotic trees such as eucalyptus and acacia gained popularity for their rapid canopy development. However, these species drink vast amounts of subterranean water and offer little to no nutritional sustenance to indigenous birds, bees, and insects.

At Manchi Panulu Sewa Foundation, our policy is uncompromising:
1. **Indigenous Focus**: We strictly propagate native flora such as *Azadirachta indica* (Neem), *Ficus religiosa* (Peepal), *Ficus benghalensis* (Banyan), *Syzygium cumini* (Jamun), and *Pongamia pinnata* (Karanja).
2. **Deep Root Architecture**: Native trees feature deep taproot structures that naturally open hardpan subsoil, allowing monsoon precipitation to percolate into underground aquifers rather than washing away as runoff.
3. **Biodiversity Sanctuaries**: A single mature Banyan tree can support over 30 bird species, thousands of insect varieties, and offer a natural cooling effect equivalent to 10 commercial air conditioning units running continuously.

Planting a tree is not a one-day event; it is an intergenerational bond. With proper mulching, micro-drip hydration, and community tree custodians, we ensure every sapling thrives into a self-sustaining eco-pillar.
    `,
    tags: ["Afforestation", "Native Species", "Biodiversity", "Eco-Tips"]
  },
  {
    id: "annadhanam-power-of-shared-meal",
    title: "The Dignity of Annadhanam: More Than Just Food Relief",
    category: "Sewa",
    categoryLabel: "Social Service",
    author: "Human Welfare Wing",
    date: "November 12, 2025",
    readTime: "4 min read",
    image: "/pillars/annadanam.jpg",
    excerpt: "Serving food to someone in distress is an act of deep reverence. Discover how our community kitchen combines food safety, balanced nutrition, and compassionate human connection.",
    content: `
In Telugu culture and ancient Indian philosophy, *Annadhanam* is revered as *Maha Dhanam* — the highest form of giving. Food is not merely fuel for the body; it is the fundamental basis of human peace, health, and dignity.

Every afternoon outside regional government hospitals, you will encounter families who have traveled across districts with sick relatives. Every rupee they possess is budgeted for medicine or tests; food becomes an afterthought, leading to malnutrition and severe exhaustion among caregivers.

Our approach to food service rests upon three pillars:
- **Purity and Cleanliness**: Food is prepared in a certified stainless steel facility under rigorous sanitation standards.
- **Nutritional Balance**: Meals include protein-rich lentils, seasonal greens, carbohydrates, and healthy fats to restore vitality.
- **Service with Respect**: We do not merely distribute rations from a truck. Our volunteers sit alongside community members, serve them with folded hands, and listen to their stories.

Good deeds ("Manchi Panulu") begin with an open heart and a warm plate. By alleviating daily hunger, we give families the mental strength to endure life's steepest medical and economic hurdles.
    `,
    tags: ["Social Sewa", "Annadhanam", "Community Support", "Dignity"]
  },
  {
    id: "restoring-urban-lakes-stepwells",
    title: "Restoring the Lifelines: How Community Lake Cleanups Revive Cities",
    category: "Environment",
    categoryLabel: "Environmental Service",
    author: "Water Stewardship Council",
    date: "December 05, 2025",
    readTime: "6 min read",
    image: "/gallery/lake-cleanup.jpg",
    excerpt: "Urban lakes are not sewage sumps—they are our frontline defense against flash floods and groundwater depletion. Here is our step-by-step restoration blueprint.",
    content: `
Centuries ago, the Deccan plateau was engineered with interconnected cascade tanks and stepwells (*Baolis*) that held every drop of monsoon rainfall, preventing floods while keeping water tables accessible year-round.

Modern urbanization, encroachment, and reckless plastic dumping turned many of these pristine tanks into stagnant cesspools choked by water hyacinth and industrial refuse.

Through the *Jal Punarjeevana* initiative, Manchi Panulu Sewa Foundation applies a low-cost, high-impact restoration blueprint:
1. **Mechanical & Volunteer De-weeding**: Removing hyacinth blankets that block sunlight and suffocate aquatic life.
2. **Inlet De-silting & Trash Traps**: Installing floating barriers and trash traps at municipal stormwater inlets to catch plastic bottles before they sink into the lake bed.
3. **Phytoremediation with Native Vetiver**: Planting dense clumps of *Vetiver* grass along lake shores. Vetiver roots plunge up to 10 feet into the soil, anchoring banks and absorbing heavy metals naturally.
4. **Community Ownership**: Training local morning walkers, fishermen, and student eco-clubs as 'Lake Protectors' who prevent dumping and log water quality monthly.

Clean water is the birthright of every living creature. Reclaiming one lake at a time revitalizes urban climate resilience and safeguards our common heritage.
    `,
    tags: ["Water Conservation", "Lake Revival", "Plog Run", "Zero Waste"]
  },
  {
    id: "becoming-an-active-volunteer",
    title: "Stepping into Sewa: How You Can Make a Tangible Difference",
    category: "Sewa",
    categoryLabel: "Volunteer Guide",
    author: "Volunteer Operations",
    date: "January 14, 2026",
    readTime: "4 min read",
    image: "/gallery/education-kits.jpg",
    excerpt: "You do not need vast wealth or endless free hours to effect meaningful change. Discover how a single Sunday morning can transform your outlook and heal our world.",
    content: `
Many well-meaning citizens hesitate to volunteer because they believe NGOs require full-time commitments or high specialized skills.

At Manchi Panulu Sewa Foundation, we believe that every pair of hands holds infinite potential for kindness. Whether you can dedicate two hours on a Sunday morning or offer professional skills from home, your contribution ripples outward:
- **Field & Tree Plantation Volunteer**: Join our weekend planting drives, prepare soil pits, and water sapling beds.
- **Food Prep & Distribution Sewa**: Assist our kitchen team in packing balanced meal parcels and coordinating orderly distribution.
- **Eco-Trail & Lake Cleaner**: Participate in plogging runs, cleanups, and community awareness rallies.
- **Skills-Based Sewa**: Lend your digital marketing, photography, accounting, or content writing expertise to elevate the foundation's visibility.

Sewa isn't just about what you give; it deeply enriches your own peace of mind, creates lasting friendships with purpose-driven individuals, and grounds you in humility.
    `,
    tags: ["Volunteering", "Grassroots", "Youth Action", "Social Impact"]
  }
];

export function getBlogData(lang = 'en') {
  if (lang === 'te') {
    return [
      {
        ...blogData[0],
        title: "భారతీయ పర్యావరణ వ్యవస్థకు దేశీయ వృక్షాల పెంపకమే ఎందుకు ప్రాణాధారం?",
        categoryLabel: "వృక్ష సేవ (ప్రకృతి రక్షణ)",
        author: "హరిత పరిరక్షణ బృందం",
        date: "అక్టోబర్ 18, 2025",
        readTime: "5 నిమిషాల చదువు",
        excerpt: "యూకలిప్టస్ లేదా అలంకరణ విదేశీ మొక్కలు వేగంగా పెరిగినా, వేప, రావి, మర్రి వంటి దేశీయ వృక్షాలు మాత్రమే భూగర్భ జలాలను కాపాడుతూ 10 రెట్లు ఎక్కువ పక్షులు మరియు కీటకాలకు ఆశ్రయం ఇస్తాయి.",
        content: `
మొక్కలు నాటే ఉద్యమం చేపట్టినప్పుడు మనం ఎంచుకునే జాతులపైనే మన పర్యావరణ భవిష్యత్తు ఆధారపడి ఉంటుంది.

గత కొన్ని దశాబ్దాలుగా వేగంగా ఎదిగే యూకలిప్టస్ వంటి విదేశీ చెట్లను నాటడం ఎక్కువైంది. కానీ ఈ చెట్లు భూగర్భ జలాలను పీల్చేసి, స్థానిక పక్షులకు మరియు తేనెటీగలకు ఎలాంటి ఆహారాన్ని అందించలేవు.

మంచి పనులు సేవా ఫౌండేషన్‌లో మా విధానం స్పష్టంగా ఉంటుంది:
1. **దేశీయ చెట్ల ప్రాధాన్యత**: మేము వేప, రావి, మర్రి, నేరేడు, కానుగ వంటి స్వదేశీ వృక్షాలను మాత్రమే నాటుతాము.
2. **లోతైన వేర్ల నిర్మాణం**: దేశీయ చెట్ల వేర్లు నేల లోపలికి వెళ్లి వర్షపు నీటిని భూగర్భ జలాశయాలలోకి చేరవేస్తాయి.
3. **జీవవైవిధ్య నిలయాలు**: ఒక్క పెద్ద మర్రిచెట్టు 30కి పైగా పక్షి జాతులకు, వేలాది కీటకాలకు ఆహార ఆశ్రయాలను అందిస్తుంది.

చెట్టు నాటడం అనేది ఒక్కరోజు కార్యక్రమం కాదు; అది భావితరాలతో మనం చేసుకునే పవిత్ర ఒప్పందం.
        `,
        tags: ["అటవీకరణ", "దేశీయ చెట్లు", "జీవవైవిధ్యం", "హరిత సూచనలు"]
      },
      {
        ...blogData[1],
        title: "అన్నదాన పరమార్థం: కేవలం ఆహారం పంచడం కంటే ఎంతో ఉన్నతమైనది",
        categoryLabel: "సామాజిక సేవ",
        author: "మానవ సంక్షేమ విభాగం",
        date: "నవంబర్ 12, 2025",
        readTime: "4 నిమిషాల చదువు",
        excerpt: "ఆపదలో ఉన్నవారికి ప్రేమతో అన్నం పెట్టడం అత్యున్నతమైన దైవసేవ. మా కమ్యూనిటీ కిచెన్ పరిశుభ్రత, సంపూర్ణ పోషణ మరియు ఆప్యాయతలను ఎలా సమపాళ్లలో అందిస్తుందో తెలుసుకోండి.",
        content: `
మన సంస్కృతిలో అన్నదానాన్ని 'మహాదానం'గా కీర్తించారు. ఆహారం శరీరానికే కాదు, మనిషి ఆత్మగౌరవానికి మరియు ప్రశాంతతకు ప్రాణాధారం.

ప్రభుత్వ ఆసుపత్రుల ముందు రోగుల సహాయకులు తమ వద్ద ఉన్న ప్రతి రూపాయిని మందులకే వెచ్చిస్తూ, తాము పస్తులుంటారు. వారి అలసటను, ఆకలిని దూరం చేయడానికే అమృత ఆహారం ప్రారంభమైంది.

మా సేవా విధానం మూడు అంశాలపై ఆధారపడి ఉంటుంది:
- **పరిశుభ్రత**: ఆహారాన్ని స్టెయిన్‌లెస్ స్టీల్ వంటశాలలో కచ్చితమైన నాణ్యతతో వండుతాము.
- **సంపూర్ణ పోషకాహారం**: పప్పులు, తాజా ఆకుకూరలు మరియు పోషకాలతో కూడిన సమతుల్య భోజనం.
- **గౌరవంతో కూడిన సేవ**: చేతులెత్తి నమస్కరిస్తూ, కుటుంబ సభ్యుల వలే ప్రేమతో అన్నం వడ్డిస్తాము.
        `,
        tags: ["సామాజిక సేవ", "అన్నదానం", "కమ్యూనిటీ సపోర్ట్", "ఆత్మగౌరవం"]
      },
      {
        ...blogData[2],
        title: "నగరాల జీవనాళాలు: సరస్సుల పూడికతీత నగరాలకు ఎలా ప్రాణం పోస్తుంది?",
        categoryLabel: "పర్యావరణ సేవ",
        author: "జల పరిరక్షణ మండలి",
        date: "డిసెంబర్ 05, 2025",
        readTime: "6 నిమిషాల చదువు",
        excerpt: "నగరాల్లోని చెరువులు మురుగునీటి గుంటలు కావు—అవి వరదలను అడ్డుకునే మరియు భూగర్భ జలాలను పెంచే రక్షణ కవచాలు. మా చెరువుల పునరుద్ధరణ కార్యాచరణ ఇదే.",
        content: `
వందల ఏళ్ల క్రితం మన పూర్వీకులు ప్రతి వర్షపు బొట్టునూ ఒడిసిపట్టేందుకు గొలుసుకట్టు చెరువులను, అందమైన మెట్లబావులను నిర్మించారు. కానీ ఆధునిక పోకడలు, ప్లాస్టిక్ వ్యర్థాలు ఆ జలాశయాలను కాలుష్య కాసారాలుగా మార్చాయి.

'జల పునర్జీవనం' ద్వారా మంచి పనులు సేవా ఫౌండేషన్ చెరువులను ఈ విధంగా బాగుచేస్తోంది:
1. **గుర్రపుడెక్క తొలగింపు**: సూర్యరశ్మిని అడ్డుకునే పిచ్చిమొక్కలను వాలంటీర్లతో పూర్తిగా తొలగించడం.
2. **చెత్త ట్రాప్‌లు**: మురుగు కాలువల నుండి ప్లాస్టిక్ సీసాలు చెరువులోకి రాకుండా ఫ్లోటింగ్ బారికేడ్లను ఏర్పాటు చేయడం.
3. **వెటివర్ గడ్డి పెంపకం**: గట్ల వెంట వెటివర్ గడ్డిని నాటి నేల కోతను ఆపడం మరియు నీటిని సహజంగా శుద్ధి చేయడం.
4. **ప్రజల భాగస్వామ్యం**: స్థానికులను 'సరస్సు సంరక్షకులు'గా నియమించి వ్యర్థాలు వేయకుండా కాపాడటం.
        `,
        tags: ["జల సంరక్షణ", "చెరువుల బాగు", "ప్లోగ్ రన్", "జీరో వేస్ట్"]
      },
      {
        ...blogData[3],
        title: "సేవలో భాగస్వామ్యం: సమాజానికి మీ వంతు మేలు ఎలా చేయవచ్చు?",
        categoryLabel: "వాలంటీర్ గైడ్",
        author: "వాలంటీర్ సమన్వయ విభాగం",
        date: "జనవరి 14, 2026",
        readTime: "4 నిమిషాల చదువు",
        excerpt: "మార్పు తేవడానికి అపారమైన ధనమో లేదా రోజంతా ఖాళీ సమయమో అవసరం లేదు. కేవలం ఒక ఆదివారం ఉదయం ఇచ్చే సమయం ప్రపంచాన్ని ఎలా మార్చగలదో తెలుసుకోండి.",
        content: `
చాలామంది సేవ చేయాలనే తపన ఉన్నప్పటికీ తమకు సమయం సరిపోదని భావిస్తుంటారు. కానీ మంచి పనులు సేవా ఫౌండేషన్‌లో ప్రతి చిన్న సాయానికీ ఎంతో విలువ ఉంది:
- **మొక్కలు నాటే వాలంటీర్**: ఆదివారం ఉదయం మొక్కలు నాటడం మరియు నీరు పోయడం.
- **ఆహార పంపిణీ సేవ**: వంటశాలలో భోజనం ప్యాకింగ్ చేయడం మరియు రోగులకు అందించడం.
- **చెరువుల శుభ్రత**: సరస్సుల వద్ద ప్లాస్టిక్ వ్యర్థాలను ఏరివేయడం.
- **డిజిటల్ సేవ**: ఇంటి నుండే సోషల్ మీడియా, ఫోటోగ్రఫీ లేదా కంటెంట్ ద్వారా సంస్థకు సహకరించడం.

సేవ చేయడం వల్ల సమాజానికి మాత్రమే కాదు, మన మనస్సుకు ఎంతో ప్రశాంతత మరియు ఆనందం లభిస్తుంది.
        `,
        tags: ["వాలంటీరింగ్", "క్షేత్ర సేవ", "యువజన కార్యాచరణ", "సామాజిక ప్రభావం"]
      }
    ];
  }

  if (lang === 'hi') {
    return [
      {
        ...blogData[0],
        title: "भारतीय पारिस्थितिकी तंत्र के लिए देसी वृक्षारोपण क्यों जीवन रक्षक है?",
        categoryLabel: "वृक्ष सेवा (प्रकृति संरक्षण)",
        author: "हरित संरक्षण टीम",
        date: "18 अक्टूबर 2025",
        readTime: "5 मिनट पठन",
        excerpt: "युकलिप्टस या विदेशी सजावटी पौधे भले ही तेजी से बढ़ें, पर नीम, पीपल और बरगद जैसे देसी पेड़ ही भूजल की रक्षा करते हुए पक्षियों और तितलियों को जीवन देते हैं।",
        content: `
पौधरोपण अभियान चलाते समय पौधों का चुनाव ही यह तय करता है कि हम वास्तव में प्रकृति का पुनरुद्धार कर रहे हैं या अनजाने में भूजल को सुखा रहे हैं।

हाल के दशकों में तेजी से बढ़ने वाले युकलिप्टस जैसे विदेशी पेड़ों को खूब लगाया गया। पर ये पेड़ भूजल को सोख लेते हैं और पक्षियों व कीटों को कोई पोषण नहीं देते।

मंची पनुलु सेवा फाउंडेशन में हमारी नीति अटल है:
1. **देसी प्रजातियों को प्राथमिकता**: हम केवल नीम, पीपल, बरगद, जामुन और करंज जैसे स्थानीय पेड़ ही लगाते हैं।
2. **गहरी जड़ों की बनावट**: देसी पेड़ों की गहरी मूसला जड़ें बारिश के पानी को भूजल स्तर तक पहुंचाने में मदद करती हैं।
3. **जैवविविधता के केंद्र**: एक अकेला विशाल बरगद का पेड़ 30 से अधिक पक्षी प्रजातियों और हजारों कीटों को आश्रय प्रदान करता है।
        `,
        tags: ["वनीकरण", "देसी प्रजातियां", "जैवविविधता", "पर्यावरण सुझाव"]
      },
      {
        ...blogData[1],
        title: "अन्नदान की गरिमा: भोजन वितरण से कहीं बढ़कर एक पावन मानवीय सेवा",
        categoryLabel: "सामाजिक सेवा",
        author: "मानव कल्याण प्रभाग",
        date: "12 नवंबर 2025",
        readTime: "4 मिनट पठन",
        excerpt: "संकट में फंसे किसी व्यक्ति को भोजन कराना गहरी श्रद्धा का कार्य है। जानें कैसे हमारी रसोई स्वच्छता, संतुलित पोषण और आत्मीय सम्मान का संगम है।",
        content: `
भारतीय दर्शन में अन्नदान को 'महादान' कहा गया है। भोजन केवल शरीर का ईंधन नहीं है, यह मनुष्य के आत्मसम्मान और शांति का आधार है।

सरकारी अस्पतालों के बाहर हजारों परिवार अपने बीमार परिजनों के इलाज के लिए दूर-दराज से आते हैं। उनकी सारी जमा-पूंजी दवाओं में खर्च हो जाती है और वे भूखे पेट रहने को विवश होते हैं।

हमारी भोजन सेवा तीन सिद्धांतों पर टिकी है:
- **पवित्रता व स्वच्छता**: भोजन आधुनिक स्टेनलेस स्टील रसोई में पूरी स्वच्छता से तैयार होता है।
- **संतुलित पोषण**: दाल, मौसमी सब्जियां और पौष्टिक अनाज से भरपूर गर्म शाकाहारी भोजन।
- **ससम्मान सेवा**: हाथ जोड़कर, अपनों की तरह आदरपूर्वक भोजन परोसना।
        `,
        tags: ["सामाजिक सेवा", "अन्नदान", "सामुदायिक सहयोग", "गरिमा"]
      },
      {
        ...blogData[2],
        title: "जीवनदायिनी जलधाराएं: झीलों की सफाई से शहरों को नया जीवन कैसे मिलता है?",
        categoryLabel: "पर्यावरण सेवा",
        author: "जल संरक्षण परिषद",
        date: "05 दिसंबर 2025",
        readTime: "6 मिनट पठन",
        excerpt: "शहरी झीलें गंदे पानी के गड्ढे नहीं, बल्कि बाढ़ से बचाने और भूजल बढ़ाने की हमारी पहली रक्षा पंक्ति हैं। जानिए हमारा पुनरुद्धार मॉडल।",
        content: `
दक्कन के पठार पर सदियों पहले आपस में जुड़े तालाबों और ऐतिहासिक बावडियों का निर्माण किया गया था, जो बारिश की हर बूंद को संजोते थे।

'जल पुनर्जीवन' पहल के तहत हम झीलों को इस प्रकार नया जीवन देते हैं:
1. **जलकुंभी हटाना**: पानी की सतह को ढकने वाली हानिकारक खरपतवार को निकालना।
2. **कचरा जाल**: प्लास्टिक बोतलों को झील में जाने से रोकने हेतु फ्लोटिंग बैरियर लगाना।
3. **खस (वेटीवर) का रोपण**: किनारों पर वेटीवर घास लगाकर मिट्टी के कटाव को रोकना और पानी को प्राकृतिक रूप से छानना।
4. **जनसहभागिता**: स्थानीय निवासियों को 'झील रक्षक' बनाकर सतत स्वच्छता बनाए रखना।
        `,
        tags: ["जल संरक्षण", "झील पुनरुद्धार", "प्लॉग रन", "शून्य कचरा"]
      },
      {
        ...blogData[3],
        title: "सेवा में भागीदारी: आप समाज में एक ठोस बदलाव कैसे ला सकते हैं?",
        categoryLabel: "स्वयंसेवक गाइड",
        author: "स्वयंसेवक समन्वय विभाग",
        date: "14 जनवरी 2026",
        readTime: "4 मिनट पठन",
        excerpt: "बदलाव लाने के लिए अत्यधिक धन या हर दिन घंटों समय की जरूरत नहीं है। जानिए कैसे एक रविवार सुबह आपका जीवन और यह संसार दोनों बदल सकती है।",
        content: `
बहुत से लोग समाज सेवा करना चाहते हैं पर सोचते हैं कि उनके पास पर्याप्त समय नहीं है। पर मंची पनुलु सेवा फाउंडेशन में हर हाथ का स्वागत है:
- **पौधरोपण स्वयंसेवक**: रविवार को गड्ढे खोदने और पौधों को सींचने में सहयोग।
- **अन्नदान सेवा**: भोजन के पैकेट तैयार करना और जरूरतमंदों तक पहुंचाना।
- **झील सफाई**: तालाबों और पार्कों से प्लास्टिक कचरा साफ करना।
- **कौशल आधारित सेवा**: घर बैठे डिजिटल मीडिया, फोटोग्राफी या सामग्री लेखन में मदद करना।
        `,
        tags: ["स्वयंसेवा", "जमीनी कार्य", "युवा शक्ति", "सामाजिक प्रभाव"]
      }
    ];
  }

  return blogData;
}
