export type Language = 'English' | 'Hindi' | 'Punjabi' | 'Tamil' | 'Bengali' | 'Gujarati';

export const LANGUAGES: { code: Language; native: string; short: string }[] = [
  { code: 'English', native: 'English',   short: 'EN'  },
  { code: 'Hindi',   native: 'हिंदी',      short: 'हिं' },
  { code: 'Punjabi', native: 'ਪੰਜਾਬੀ',    short: 'ਪੰਜ' },
  { code: 'Tamil',   native: 'தமிழ்',     short: 'தமி' },
  { code: 'Bengali',  native: 'বাংলা',     short: 'বাং' },
  { code: 'Gujarati', native: 'ગુજરાતી',   short: 'ગુજ' },
];

export interface TranslationSet {
  nav: {
    home: string; symptoms: string; doctors: string; tips: string; profile: string;
  };
  home: {
    badge: string; title: string; titleHighlight: string; subtitle: string;
    getStarted: string; learnMore: string; whyTitle: string; viewAll: string;
    symptomCheckerTitle: string; symptomCheckerDesc: string;
    findDoctorsTitle: string; findDoctorsDesc: string;
    healthTipsTitle: string; healthTipsDesc: string;
    feelingUnwell: string; consultNow: string; checkNow: string;
  };
  symptoms: {
    greeting: string; subtitle: string; step1Title: string;
    textareaPlaceholder: string; continue: string; step2Title: string;
    durationLabel: string; severityLabel: string; severityHint: string;
    mild: string; moderate: string; severe: string; ageGroupLabel: string;
    back: string; analyzeNow: string; analyzing: string; analyzingSubtitle: string;
    analysisFailed: string; tryAgain: string;
    homeCareLabel: string; seeDoctorLabel: string; emergencyLabel: string;
    possibleConditions: string; homeCareTitle: string; disclaimer: string;
    startOver: string; findDoctor: string;
    chipLabels: Record<string, string>;
    durationLabels: Record<string, string>;
    ageGroupLabels: Record<string, string>;
  };
  doctors: {
    title: string; subtitle: string; searchPlaceholder: string;
    locating: string; mapUnavailable: string; mapHint: string;
    open: string; closed: string; call: string; directions: string;
    noResults: string; noResultsHint: string; bookAppointment: string;
  };
  tips: {
    title: string; subtitle: string; todayTitle: string;
    readMore: string; showLess: string; exploreTitle: string;
    categories: Record<string, string>;
  };
  profile: {
    healthSummary: string; emergencyContacts: string; recentChecks: string;
    logOut: string; fullName: string; phoneNumber: string;
    age: string; blood: string; allergies: string; ageUnit: string;
    save: string; edit: string; callAmbulance: string; ambulance: string;
    callHelpline: string; healthIndia: string; noContacts: string;
    addContact: string; contactName: string; contactRelation: string;
    contactPhone: string; verifiedCheck: string;
    appointmentsTitle: string; noAppointments: string;
    cancelAppt: string; upcomingAppt: string;
  };
  about: {
    title: string; subtitle: string; description: string;
    disclaimerTitle: string; disclaimerText: string;
  };
  common: {
    phoneError: string; ageError: string; noNotifications: string;
  };
  tipContent: Record<string, { title: string; shortDesc: string; fullDesc?: string }>;
}

export const translations: Record<Language, TranslationSet> = {

  // ─── ENGLISH ─────────────────────────────────────────────────────────────
  English: {
    nav: { home: 'Home', symptoms: 'Symptoms', doctors: 'Find Doctors', tips: 'Health Tips', profile: 'Profile' },
    home: {
      badge: 'AI-Powered Healthcare',
      title: 'Your Personal', titleHighlight: 'Medical Assistant',
      subtitle: 'Get instant symptom analysis, connect with verified doctors, and receive personalized health tips tailored for Indian users.',
      getStarted: 'Get Started', learnMore: 'Learn More',
      whyTitle: 'Why SwasthAI?', viewAll: 'View all',
      symptomCheckerTitle: 'Symptom Checker',
      symptomCheckerDesc: 'AI analysis of your symptoms for quick, reliable preliminary insights directly from your phone.',
      findDoctorsTitle: 'Find Doctors',
      findDoctorsDesc: 'Find, review, and book verified local Indian doctors with real-time availability.',
      healthTipsTitle: 'Health Tips',
      healthTipsDesc: 'Personalized daily health advice curated for the Indian lifestyle and diet.',
      feelingUnwell: 'Feeling Unwell?', consultNow: 'Consult our AI helper right now', checkNow: 'Check Now',
    },
    symptoms: {
      greeting: "Hello! I'm SwasthAI", subtitle: 'Your personal health assistant.',
      step1Title: 'What are you feeling today?',
      textareaPlaceholder: 'Describe any other symptoms specifically...',
      continue: 'Continue', step2Title: 'A few more details...',
      durationLabel: 'How long have you had these symptoms?',
      severityLabel: 'Severity', severityHint: '1 = Very Mild, 10 = Completely Debilitating',
      mild: 'Mild', moderate: 'Moderate', severe: 'Severe',
      ageGroupLabel: 'Age Group', back: 'Back', analyzeNow: 'Analyze Now',
      analyzing: 'SwasthAI is analyzing...',
      analyzingSubtitle: 'Please wait while our medical AI reviews your symptoms against our database.',
      analysisFailed: 'Analysis Failed', tryAgain: 'Go Back & Try Again',
      homeCareLabel: 'Home Care Recommended', seeDoctorLabel: 'See a Doctor Soon',
      emergencyLabel: 'Seek Immediate Care!', possibleConditions: 'Possible Conditions',
      homeCareTitle: 'Suggested Home Care', disclaimer: 'MEDICAL DISCLAIMER:',
      startOver: 'Start Over', findDoctor: 'Find a Doctor',
      chipLabels: { Fever: 'Fever', Headache: 'Headache', Cough: 'Cough', Fatigue: 'Fatigue', Nausea: 'Nausea', 'Body Ache': 'Body Ache', 'Sore Throat': 'Sore Throat' },
      durationLabels: { 'Less than 24 hours': 'Less than 24 hours', '1-3 days': '1-3 days', '3-7 days': '3-7 days', 'More than a week': 'More than a week' },
      ageGroupLabels: { 'Under 18': 'Under 18', '18-35': '18-35', '36-50': '36-50', '51-65': '51-65', 'Over 65': 'Over 65' },
    },
    doctors: {
      title: 'Find Doctors', subtitle: 'Discover and book appointments with verified specialists near you.',
      searchPlaceholder: 'Search by city, pincode, or doctor name...',
      locating: 'Locating you...', mapUnavailable: 'Map view unavailable',
      mapHint: 'Add a Google Maps API Key to enable the interactive map.',
      open: 'Open Now', closed: 'Closed', call: 'Call', directions: 'Directions',
      noResults: 'No doctors found', noResultsHint: 'Try exploring a different area or specialty.',
      bookAppointment: 'Book',
    },
    tips: {
      title: 'Health Tips', subtitle: 'Daily insights curated specifically for your profile.',
      todayTitle: "Today's Top Tips", readMore: 'Read More', showLess: 'Show Less',
      exploreTitle: 'Explore All Articles',
      categories: { All: 'All', Nutrition: 'Nutrition', Fitness: 'Fitness', 'Mental Health': 'Mental Health', 'Seasonal Health': 'Seasonal Health' },
    },
    profile: {
      healthSummary: 'Health Summary', emergencyContacts: 'Emergency Contacts', recentChecks: 'Recent Checks',
      logOut: 'Log Out', fullName: 'Full Name', phoneNumber: 'Phone Number',
      age: 'Age', blood: 'Blood', allergies: 'Allergies', ageUnit: 'yrs',
      save: 'Save', edit: 'Edit', callAmbulance: 'Call 108', ambulance: 'Ambulance',
      callHelpline: 'Call Helpline', healthIndia: 'Health India',
      noContacts: 'No emergency contacts added yet.', addContact: 'Add emergency contact',
      contactName: 'Name', contactRelation: 'Relation (e.g. Sister)', contactPhone: 'Phone Number',
      verifiedCheck: 'Verified Check',
      appointmentsTitle: 'My Appointments', noAppointments: 'No appointments booked yet.',
      cancelAppt: 'Cancel', upcomingAppt: 'Upcoming',
    },
    about: {
      title: 'About SwasthAI', subtitle: 'Health Ministry Pilot Project',
      description: 'SwasthAI is a collaborative pilot initiative designed to provide accessible, AI-driven preliminary healthcare assistance to Indian citizens.',
      disclaimerTitle: 'Important Disclaimer',
      disclaimerText: 'This application uses Artificial Intelligence algorithms to analyze symptoms and provide generic health advice. It does not substitute professional medical diagnosis or treatment. In emergencies, always contact a registered medical practitioner or call 108.',
    },
    common: {
      phoneError: 'Enter a valid 10-digit Indian mobile number.',
      ageError: 'Enter a valid age between 0 and 120.',
      noNotifications: 'No new notifications.',
    },
    tipContent: {},
  },

  // ─── HINDI ───────────────────────────────────────────────────────────────
  Hindi: {
    nav: { home: 'होम', symptoms: 'लक्षण', doctors: 'डॉक्टर खोजें', tips: 'स्वास्थ्य सुझाव', profile: 'प्रोफ़ाइल' },
    home: {
      badge: 'एआई-संचालित स्वास्थ्य सेवा',
      title: 'आपका व्यक्तिगत', titleHighlight: 'चिकित्सा सहायक',
      subtitle: 'तत्काल लक्षण विश्लेषण प्राप्त करें, सत्यापित डॉक्टरों से जुड़ें, और भारतीय उपयोगकर्ताओं के लिए अनुकूलित व्यक्तिगत स्वास्थ्य सुझाव प्राप्त करें।',
      getStarted: 'शुरू करें', learnMore: 'और जानें',
      whyTitle: 'SwasthAI क्यों?', viewAll: 'सभी देखें',
      symptomCheckerTitle: 'लक्षण जांचकर्ता',
      symptomCheckerDesc: 'आपके फोन से सीधे त्वरित, विश्वसनीय प्रारंभिक जानकारी के लिए आपके लक्षणों का एआई विश्लेषण।',
      findDoctorsTitle: 'डॉक्टर खोजें',
      findDoctorsDesc: 'वास्तविक समय की उपलब्धता के साथ सत्यापित स्थानीय भारतीय डॉक्टरों को खोजें, समीक्षा करें और बुक करें।',
      healthTipsTitle: 'स्वास्थ्य सुझाव',
      healthTipsDesc: 'भारतीय जीवन शैली और आहार के लिए अनुकूलित व्यक्तिगत दैनिक स्वास्थ्य सलाह।',
      feelingUnwell: 'अस्वस्थ महसूस कर रहे हैं?', consultNow: 'अभी हमारे एआई सहायक से परामर्श लें', checkNow: 'अभी जांचें',
    },
    symptoms: {
      greeting: 'नमस्ते! मैं SwasthAI हूँ', subtitle: 'आपका व्यक्तिगत स्वास्थ्य सहायक।',
      step1Title: 'आज आपको कैसा महसूस हो रहा है?',
      textareaPlaceholder: 'किसी अन्य लक्षण का विस्तार से वर्णन करें...',
      continue: 'आगे बढ़ें', step2Title: 'कुछ और जानकारी...',
      durationLabel: 'ये लक्षण आपको कब से हैं?',
      severityLabel: 'गंभीरता', severityHint: '1 = बहुत हल्का, 10 = बहुत गंभीर',
      mild: 'हल्का', moderate: 'मध्यम', severe: 'गंभीर',
      ageGroupLabel: 'आयु वर्ग', back: 'पीछे', analyzeNow: 'अभी विश्लेषण करें',
      analyzing: 'SwasthAI विश्लेषण कर रहा है...',
      analyzingSubtitle: 'कृपया प्रतीक्षा करें, हमारा एआई आपके लक्षणों की जांच कर रहा है।',
      analysisFailed: 'विश्लेषण विफल', tryAgain: 'वापस जाएं और फिर प्रयास करें',
      homeCareLabel: 'घरेलू देखभाल की सलाह', seeDoctorLabel: 'जल्द डॉक्टर को दिखाएं',
      emergencyLabel: 'तत्काल चिकित्सा सहायता लें!', possibleConditions: 'संभावित स्थितियां',
      homeCareTitle: 'सुझाए गए घरेलू उपचार', disclaimer: 'चिकित्सा अस्वीकरण:',
      startOver: 'फिर से शुरू करें', findDoctor: 'डॉक्टर खोजें',
      chipLabels: { Fever: 'बुखार', Headache: 'सिरदर्द', Cough: 'खांसी', Fatigue: 'थकान', Nausea: 'मतली', 'Body Ache': 'शरीर दर्द', 'Sore Throat': 'गले में दर्द' },
      durationLabels: { 'Less than 24 hours': '24 घंटे से कम', '1-3 days': '1-3 दिन', '3-7 days': '3-7 दिन', 'More than a week': 'एक हफ्ते से ज्यादा' },
      ageGroupLabels: { 'Under 18': '18 से कम', '18-35': '18-35', '36-50': '36-50', '51-65': '51-65', 'Over 65': '65 से ऊपर' },
    },
    doctors: {
      title: 'डॉक्टर खोजें', subtitle: 'आपके पास सत्यापित विशेषज्ञों के साथ अपॉइंटमेंट खोजें और बुक करें।',
      searchPlaceholder: 'शहर, पिनकोड या डॉक्टर का नाम खोजें...',
      locating: 'आपको ढूंढ रहे हैं...', mapUnavailable: 'मानचित्र उपलब्ध नहीं',
      mapHint: 'इंटरैक्टिव मानचित्र सक्षम करने के लिए Google Maps API Key जोड़ें।',
      open: 'अभी खुला है', closed: 'बंद', call: 'कॉल करें', directions: 'दिशा-निर्देश',
      noResults: 'कोई डॉक्टर नहीं मिला', noResultsHint: 'कोई अन्य क्षेत्र या विशेषता आज़माएं।',
      bookAppointment: 'बुक करें',
    },
    tips: {
      title: 'स्वास्थ्य सुझाव', subtitle: 'आपकी प्रोफ़ाइल के लिए विशेष रूप से तैयार की गई दैनिक जानकारी।',
      todayTitle: 'आज के शीर्ष सुझाव', readMore: 'और पढ़ें', showLess: 'कम दिखाएं',
      exploreTitle: 'सभी लेख देखें',
      categories: { All: 'सभी', Nutrition: 'पोषण', Fitness: 'फिटनेस', 'Mental Health': 'मानसिक स्वास्थ्य', 'Seasonal Health': 'मौसमी स्वास्थ्य' },
    },
    profile: {
      healthSummary: 'स्वास्थ्य सारांश', emergencyContacts: 'आपातकालीन संपर्क', recentChecks: 'हाल की जांच',
      logOut: 'लॉग आउट', fullName: 'पूरा नाम', phoneNumber: 'फ़ोन नंबर',
      age: 'आयु', blood: 'रक्त समूह', allergies: 'एलर्जी', ageUnit: 'वर्ष',
      save: 'सहेजें', edit: 'संपादित करें', callAmbulance: '108 डायल करें', ambulance: 'एम्बुलेंस',
      callHelpline: 'हेल्पलाइन पर कॉल करें', healthIndia: 'स्वास्थ्य भारत',
      noContacts: 'अभी तक कोई आपातकालीन संपर्क नहीं जोड़ा गया।', addContact: 'आपातकालीन संपर्क जोड़ें',
      contactName: 'नाम', contactRelation: 'संबंध (जैसे बहन)', contactPhone: 'फ़ोन नंबर',
      verifiedCheck: 'सत्यापित',
      appointmentsTitle: 'मेरी अपॉइंटमेंट', noAppointments: 'अभी तक कोई अपॉइंटमेंट बुक नहीं की गई।',
      cancelAppt: 'रद्द करें', upcomingAppt: 'आगामी',
    },
    about: {
      title: 'SwasthAI के बारे में', subtitle: 'स्वास्थ्य मंत्रालय पायलट परियोजना',
      description: 'SwasthAI एक सहयोगी पायलट पहल है जो भारतीय नागरिकों को सुलभ, एआई-संचालित प्रारंभिक स्वास्थ्य सेवा प्रदान करने के लिए डिज़ाइन की गई है।',
      disclaimerTitle: 'महत्वपूर्ण अस्वीकरण',
      disclaimerText: 'यह एप्लिकेशन लक्षणों का विश्लेषण करने और सामान्य स्वास्थ्य सलाह देने के लिए कृत्रिम बुद्धिमत्ता एल्गोरिदम का उपयोग करती है। यह पेशेवर चिकित्सा निदान या उपचार का विकल्प नहीं है। आपात स्थिति में हमेशा किसी पंजीकृत चिकित्सक से संपर्क करें या 108 पर कॉल करें।',
    },
    common: {
      phoneError: 'एक वैध 10 अंकों का भारतीय मोबाइल नंबर दर्ज करें।',
      ageError: '0 से 120 के बीच एक वैध आयु दर्ज करें।',
      noNotifications: 'कोई नई सूचना नहीं है।',
    },
    tipContent: {
      t1: { title: 'मॉनसून स्वच्छता: डेंगू से बचाव', shortDesc: 'मच्छरों के प्रजनन को रोकने के लिए कूलरों और बर्तनों से रुके पानी को साप्ताहिक रूप से खाली करें।', fullDesc: 'भारतीय मॉनसून के दौरान, रुके हुए पानी की वजह से डेंगू और मलेरिया के मामले बढ़ जाते हैं। रेगिस्तान कूलर, पौधों के बर्तन, पुराने टायर और बर्ड बाथ को पूरी तरह खाली करके सुखाने की आदत बनाएं। मच्छर निरोधकों का उपयोग करें और भोर और शाम के दौरान पूरी बाजू के कपड़े पहनें। यदि अचानक तेज बुखार के साथ शरीर में दर्द हो, तो स्व-दवा की बजाय तुरंत चिकित्सा सहायता लें।' },
      t2: { title: 'गर्मी में हाइड्रेशन के राज', shortDesc: 'गर्मियों की चरम अवस्था में सादे पानी की तुलना में नींबू पानी क्यों बेहतर है।', fullDesc: 'जब भारत की गर्मी चरम पर होती है, तो पसीने के माध्यम से महत्वपूर्ण नमक खो देते हैं। सादा पानी पीने से आप हाइड्रेट होते हैं, लेकिन यह सोडियम और पोटेशियम की कमी पूरी नहीं करता। काले नमक के साथ नींबू पानी या ताज़ा नारियल पानी पीने से इलेक्ट्रोलाइट संतुलन तुरंत बहाल होता है और आप ऊर्जावान रहते हैं।' },
      t3: { title: 'भारतीय थाली को संतुलित करना', shortDesc: 'अपने दैनिक भोजन में सही प्रोटीन-से-कार्ब अनुपात कैसे सुनिश्चित करें।', fullDesc: 'पारंपरिक भारतीय आहार कभी-कभी चावल और रोटी पर निर्भरता के कारण कार्बोहाइड्रेट-भारी हो सकता है। अपनी थाली को संतुलित करने के लिए, आधी प्लेट सब्जियों से, एक चौथाई जटिल कार्ब्स (बाजरे की रोटी या भूरे चावल) से और एक चौथाई प्रोटीन (दाल, पनीर, अंडे) से भरें। घर का बना दही न केवल प्रोटीन जोड़ता है बल्कि पेट के स्वास्थ्य के लिए आवश्यक प्रोबायोटिक्स भी प्रदान करता है।' },
      t4: { title: 'सुबह की धूप की शक्ति', shortDesc: 'सुबह की मात्र 15 मिनट की धूप विटामिन डी और मूड को बेहतर कर सकती है।', fullDesc: 'धूप वाले देश में रहने के बावजूद, अधिकांश भारतीय इनडोर जीवनशैली के कारण विटामिन डी की कमी से पीड़ित हैं। सुबह 9 बजे से पहले 15-20 मिनट अपनी बाहों और पैरों को धूप में रखने से प्राकृतिक विटामिन डी संश्लेषण होता है। यह हड्डियों को मजबूत करता है, मूड स्थिर करता है, नींद की गुणवत्ता सुधारता है और प्रतिरक्षा प्रणाली को बढ़ावा देता है।' },
      t5: { title: 'अपनी डेस्क पर योग', shortDesc: 'लंबे काम के घंटों में गर्दन और पीठ दर्द से राहत के लिए 3 सरल स्ट्रेच।', fullDesc: 'लंबे समय तक बैठने से मुद्रा पर बुरा असर पड़ता है। ये तीन डेस्क-अनुकूल स्ट्रेच आज़माएं: 1. बैठी हुई रीढ़ का मोड़: कुर्सी पर बग़ल में बैठें, पीठ को पकड़ें और धीरे से मोड़ें। 2. गर्दन के रोल: ठुड्डी को छाती की तरफ झुकाएं और सिर को कंधे की तरफ घुमाएं। 3. कलाई स्ट्रेच: बांह फैलाएं और उंगलियों को पीछे खींचें। हर कुछ घंटों में 2 मिनट ये करने से पुराने दर्द से बचाव होता है।' },
      t6: { title: 'प्राणायाम से तनाव प्रबंधन', shortDesc: 'कैसे अनुलोम विलोम मिनटों में कोर्टिसोल को कम करता है।', fullDesc: 'तनाव कोर्टिसोल के स्राव को बढ़ाता है, जो समय के साथ उच्च रक्तचाप और चिंता का कारण बन सकता है। अनुलोम विलोम एक सरल योगिक श्वास तकनीक है जो मस्तिष्क के दोनों गोलार्धों को संतुलित करती है। एक नासिका से धीरे-धीरे श्वास लेकर दूसरे से छोड़ने से पैरासिम्पेथेटिक तंत्रिका तंत्र सक्रिय होता है। सोने से पहले केवल 5 मिनट इससे नींद की गुणवत्ता में काफी सुधार आता है।' },
    },
  },

  // ─── PUNJABI ─────────────────────────────────────────────────────────────
  Punjabi: {
    nav: { home: 'ਹੋਮ', symptoms: 'ਲੱਛਣ', doctors: 'ਡਾਕਟਰ ਲੱਭੋ', tips: 'ਸਿਹਤ ਸੁਝਾਅ', profile: 'ਪ੍ਰੋਫਾਈਲ' },
    home: {
      badge: 'AI-ਸੰਚਾਲਿਤ ਸਿਹਤ ਸੇਵਾ',
      title: 'ਤੁਹਾਡਾ ਨਿੱਜੀ', titleHighlight: 'ਡਾਕਟਰੀ ਸਹਾਇਕ',
      subtitle: 'ਤੁਰੰਤ ਲੱਛਣ ਵਿਸ਼ਲੇਸ਼ਣ ਪ੍ਰਾਪਤ ਕਰੋ, ਪ੍ਰਮਾਣਿਤ ਡਾਕਟਰਾਂ ਨਾਲ ਜੁੜੋ, ਅਤੇ ਭਾਰਤੀ ਉਪਭੋਗਤਾਵਾਂ ਲਈ ਵਿਅਕਤੀਗਤ ਸਿਹਤ ਸੁਝਾਅ ਪ੍ਰਾਪਤ ਕਰੋ।',
      getStarted: 'ਸ਼ੁਰੂ ਕਰੋ', learnMore: 'ਹੋਰ ਜਾਣੋ',
      whyTitle: 'SwasthAI ਕਿਉਂ?', viewAll: 'ਸਭ ਦੇਖੋ',
      symptomCheckerTitle: 'ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
      symptomCheckerDesc: 'ਤੁਹਾਡੇ ਫ਼ੋਨ ਤੋਂ ਸਿੱਧੇ ਤੁਰੰਤ, ਭਰੋਸੇਯੋਗ ਜਾਣਕਾਰੀ ਲਈ ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦਾ AI ਵਿਸ਼ਲੇਸ਼ਣ।',
      findDoctorsTitle: 'ਡਾਕਟਰ ਲੱਭੋ',
      findDoctorsDesc: 'ਅਸਲ-ਸਮੇਂ ਦੀ ਉਪਲਬਧਤਾ ਨਾਲ ਪ੍ਰਮਾਣਿਤ ਸਥਾਨੀ ਭਾਰਤੀ ਡਾਕਟਰਾਂ ਨੂੰ ਲੱਭੋ, ਸਮੀਖਿਆ ਕਰੋ ਅਤੇ ਬੁੱਕ ਕਰੋ।',
      healthTipsTitle: 'ਸਿਹਤ ਸੁਝਾਅ',
      healthTipsDesc: 'ਭਾਰਤੀ ਜੀਵਨ ਸ਼ੈਲੀ ਅਤੇ ਖੁਰਾਕ ਲਈ ਅਨੁਕੂਲਿਤ ਵਿਅਕਤੀਗਤ ਰੋਜ਼ਾਨਾ ਸਿਹਤ ਸਲਾਹ।',
      feelingUnwell: 'ਬਿਮਾਰ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ?', consultNow: 'ਹੁਣੇ ਸਾਡੇ AI ਸਹਾਇਕ ਤੋਂ ਸਲਾਹ ਲਓ', checkNow: 'ਹੁਣੇ ਜਾਂਚੋ',
    },
    symptoms: {
      greeting: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ SwasthAI ਹਾਂ', subtitle: 'ਤੁਹਾਡਾ ਨਿੱਜੀ ਸਿਹਤ ਸਹਾਇਕ।',
      step1Title: 'ਅੱਜ ਤੁਸੀਂ ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ?',
      textareaPlaceholder: 'ਕਿਸੇ ਹੋਰ ਲੱਛਣ ਦਾ ਵਿਸਤਾਰ ਨਾਲ ਵਰਣਨ ਕਰੋ...',
      continue: 'ਅੱਗੇ ਵਧੋ', step2Title: 'ਕੁਝ ਹੋਰ ਜਾਣਕਾਰੀ...',
      durationLabel: 'ਇਹ ਲੱਛਣ ਕਦੋਂ ਤੋਂ ਹਨ?',
      severityLabel: 'ਗੰਭੀਰਤਾ', severityHint: '1 = ਬਹੁਤ ਹਲਕਾ, 10 = ਬਹੁਤ ਗੰਭੀਰ',
      mild: 'ਹਲਕਾ', moderate: 'ਮੱਧਮ', severe: 'ਗੰਭੀਰ',
      ageGroupLabel: 'ਉਮਰ ਵਰਗ', back: 'ਪਿੱਛੇ', analyzeNow: 'ਹੁਣੇ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
      analyzing: 'SwasthAI ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਿਹਾ ਹੈ...',
      analyzingSubtitle: 'ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ, ਸਾਡਾ AI ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦੀ ਜਾਂਚ ਕਰ ਰਿਹਾ ਹੈ।',
      analysisFailed: 'ਵਿਸ਼ਲੇਸ਼ਣ ਅਸਫਲ ਰਿਹਾ', tryAgain: 'ਵਾਪਸ ਜਾਓ ਅਤੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ',
      homeCareLabel: 'ਘਰੇਲੂ ਦੇਖਭਾਲ ਦੀ ਸਲਾਹ', seeDoctorLabel: 'ਜਲਦੀ ਡਾਕਟਰ ਕੋਲ ਜਾਓ',
      emergencyLabel: 'ਤੁਰੰਤ ਡਾਕਟਰੀ ਮਦਦ ਲਓ!', possibleConditions: 'ਸੰਭਾਵਿਤ ਸਥਿਤੀਆਂ',
      homeCareTitle: 'ਸੁਝਾਏ ਘਰੇਲੂ ਉਪਚਾਰ', disclaimer: 'ਡਾਕਟਰੀ ਚੇਤਾਵਨੀ:',
      startOver: 'ਦੁਬਾਰਾ ਸ਼ੁਰੂ ਕਰੋ', findDoctor: 'ਡਾਕਟਰ ਲੱਭੋ',
      chipLabels: { Fever: 'ਬੁਖ਼ਾਰ', Headache: 'ਸਿਰਦਰਦ', Cough: 'ਖੰਘ', Fatigue: 'ਥਕਾਵਟ', Nausea: 'ਮਤਲੀ', 'Body Ache': 'ਸਰੀਰ ਦਰਦ', 'Sore Throat': 'ਗਲੇ ਵਿੱਚ ਦਰਦ' },
      durationLabels: { 'Less than 24 hours': '24 ਘੰਟਿਆਂ ਤੋਂ ਘੱਟ', '1-3 days': '1-3 ਦਿਨ', '3-7 days': '3-7 ਦਿਨ', 'More than a week': 'ਇੱਕ ਹਫ਼ਤੇ ਤੋਂ ਵੱਧ' },
      ageGroupLabels: { 'Under 18': '18 ਤੋਂ ਘੱਟ', '18-35': '18-35', '36-50': '36-50', '51-65': '51-65', 'Over 65': '65 ਤੋਂ ਵੱਧ' },
    },
    doctors: {
      title: 'ਡਾਕਟਰ ਲੱਭੋ', subtitle: 'ਆਪਣੇ ਨੇੜੇ ਪ੍ਰਮਾਣਿਤ ਮਾਹਿਰਾਂ ਨਾਲ ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ।',
      searchPlaceholder: 'ਸ਼ਹਿਰ, ਪਿਨਕੋਡ ਜਾਂ ਡਾਕਟਰ ਦਾ ਨਾਮ ਖੋਜੋ...',
      locating: 'ਤੁਹਾਨੂੰ ਲੱਭ ਰਹੇ ਹਾਂ...', mapUnavailable: 'ਨਕਸ਼ਾ ਉਪਲਬਧ ਨਹੀਂ',
      mapHint: 'ਇੰਟਰਐਕਟਿਵ ਨਕਸ਼ਾ ਸਮਰੱਥ ਕਰਨ ਲਈ Google Maps API Key ਜੋੜੋ।',
      open: 'ਹੁਣ ਖੁੱਲਾ ਹੈ', closed: 'ਬੰਦ', call: 'ਕਾਲ ਕਰੋ', directions: 'ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼',
      noResults: 'ਕੋਈ ਡਾਕਟਰ ਨਹੀਂ ਮਿਲਿਆ', noResultsHint: 'ਕੋਈ ਹੋਰ ਖੇਤਰ ਜਾਂ ਵਿਸ਼ੇਸ਼ਤਾ ਅਜ਼ਮਾਓ।',
      bookAppointment: 'ਬੁੱਕ ਕਰੋ',
    },
    tips: {
      title: 'ਸਿਹਤ ਸੁਝਾਅ', subtitle: 'ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ ਲਈ ਵਿਸ਼ੇਸ਼ ਰੂਪ ਵਿੱਚ ਤਿਆਰ ਕੀਤੀ ਰੋਜ਼ਾਨਾ ਜਾਣਕਾਰੀ।',
      todayTitle: 'ਅੱਜ ਦੇ ਚੋਟੀ ਦੇ ਸੁਝਾਅ', readMore: 'ਹੋਰ ਪੜ੍ਹੋ', showLess: 'ਘੱਟ ਦਿਖਾਓ',
      exploreTitle: 'ਸਾਰੇ ਲੇਖ ਦੇਖੋ',
      categories: { All: 'ਸਭ', Nutrition: 'ਪੋਸ਼ਣ', Fitness: 'ਫਿਟਨੈਸ', 'Mental Health': 'ਮਾਨਸਿਕ ਸਿਹਤ', 'Seasonal Health': 'ਮੌਸਮੀ ਸਿਹਤ' },
    },
    profile: {
      healthSummary: 'ਸਿਹਤ ਸੰਖੇਪ', emergencyContacts: 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ', recentChecks: 'ਹਾਲੀਆ ਜਾਂਚਾਂ',
      logOut: 'ਲਾਗ ਆਊਟ', fullName: 'ਪੂਰਾ ਨਾਮ', phoneNumber: 'ਫ਼ੋਨ ਨੰਬਰ',
      age: 'ਉਮਰ', blood: 'ਖੂਨ', allergies: 'ਐਲਰਜੀਆਂ', ageUnit: 'ਸਾਲ',
      save: 'ਸੁਰੱਖਿਅਤ ਕਰੋ', edit: 'ਸੋਧੋ', callAmbulance: '108 ਕਾਲ ਕਰੋ', ambulance: 'ਐਂਬੂਲੈਂਸ',
      callHelpline: 'ਹੈਲਪਲਾਈਨ ਕਾਲ ਕਰੋ', healthIndia: 'ਸਿਹਤ ਭਾਰਤ',
      noContacts: 'ਹਾਲੇ ਕੋਈ ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ ਨਹੀਂ ਜੋੜਿਆ।', addContact: 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ ਜੋੜੋ',
      contactName: 'ਨਾਮ', contactRelation: 'ਰਿਸ਼ਤਾ (ਜਿਵੇਂ ਭੈਣ)', contactPhone: 'ਫ਼ੋਨ ਨੰਬਰ',
      verifiedCheck: 'ਪ੍ਰਮਾਣਿਤ',
      appointmentsTitle: 'ਮੇਰੀਆਂ ਅਪੌਇੰਟਮੈਂਟਾਂ', noAppointments: 'ਹਾਲੇ ਕੋਈ ਅਪੌਇੰਟਮੈਂਟ ਬੁੱਕ ਨਹੀਂ ਕੀਤੀ।',
      cancelAppt: 'ਰੱਦ ਕਰੋ', upcomingAppt: 'ਆਉਣ ਵਾਲੀਆਂ',
    },
    about: {
      title: 'SwasthAI ਬਾਰੇ', subtitle: 'ਸਿਹਤ ਮੰਤਰਾਲਾ ਪਾਇਲਟ ਪ੍ਰੋਜੈਕਟ',
      description: 'SwasthAI ਇੱਕ ਸਹਿਯੋਗੀ ਪਾਇਲਟ ਪਹਿਲਕਦਮੀ ਹੈ ਜੋ ਭਾਰਤੀ ਨਾਗਰਿਕਾਂ ਨੂੰ ਸੁਲਭ, AI-ਸੰਚਾਲਿਤ ਪ੍ਰਾਇਮਰੀ ਸਿਹਤ ਸਹਾਇਤਾ ਪ੍ਰਦਾਨ ਕਰਨ ਲਈ ਤਿਆਰ ਕੀਤੀ ਗਈ ਹੈ।',
      disclaimerTitle: 'ਮਹੱਤਵਪੂਰਨ ਚੇਤਾਵਨੀ',
      disclaimerText: 'ਇਹ ਐਪਲੀਕੇਸ਼ਨ ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਨ ਲਈ AI ਐਲਗੋਰਿਦਮ ਵਰਤਦੀ ਹੈ। ਇਹ ਪੇਸ਼ੇਵਰ ਡਾਕਟਰੀ ਨਿਦਾਨ ਦਾ ਬਦਲ ਨਹੀਂ ਹੈ। ਐਮਰਜੈਂਸੀ ਵਿੱਚ ਹਮੇਸ਼ਾ 108 ਡਾਇਲ ਕਰੋ।',
    },
    common: {
      phoneError: 'ਇੱਕ ਵੈਧ 10 ਅੰਕਾਂ ਦਾ ਭਾਰਤੀ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ।',
      ageError: '0 ਤੋਂ 120 ਦੇ ਵਿਚਕਾਰ ਇੱਕ ਵੈਧ ਉਮਰ ਦਰਜ ਕਰੋ।',
      noNotifications: 'ਕੋਈ ਨਵੀਂ ਸੂਚਨਾ ਨਹੀਂ।',
    },
    tipContent: {
      t1: { title: 'ਮੌਨਸੂਨ ਸਫ਼ਾਈ: ਡੇਂਗੂ ਤੋਂ ਬਚਾਅ', shortDesc: 'ਮੱਛਰਾਂ ਦੇ ਪ੍ਰਜਨਨ ਨੂੰ ਰੋਕਣ ਲਈ ਕੂਲਰਾਂ ਅਤੇ ਬਰਤਨਾਂ ਤੋਂ ਖੜ੍ਹਾ ਪਾਣੀ ਹਫ਼ਤਾਵਾਰੀ ਖਾਲੀ ਕਰੋ।', fullDesc: 'ਭਾਰਤੀ ਮੌਨਸੂਨ ਦੌਰਾਨ, ਖੜ੍ਹੇ ਪਾਣੀ ਕਾਰਨ ਡੇਂਗੂ ਅਤੇ ਮਲੇਰੀਆ ਦੇ ਕੇਸ ਵੱਧ ਜਾਂਦੇ ਹਨ। ਹਫ਼ਤੇਵਾਰੀ ਕੂਲਰ, ਬਰਤਨ ਅਤੇ ਪੁਰਾਣੇ ਟਾਇਰ ਖਾਲੀ ਕਰੋ। ਮੱਛਰ ਦੂਰ ਕਰਨ ਵਾਲੀਆਂ ਚੀਜ਼ਾਂ ਵਰਤੋ ਅਤੇ ਪੂਰੀ ਬਾਹਾਂ ਵਾਲੇ ਕੱਪੜੇ ਪਾਓ। ਅਚਾਨਕ ਤੇਜ਼ ਬੁਖ਼ਾਰ ਨਾਲ ਸਰੀਰ ਦਰਦ ਹੋਣ ਤੇ ਤੁਰੰਤ ਡਾਕਟਰ ਕੋਲ ਜਾਓ।' },
      t2: { title: 'ਗਰਮੀਆਂ ਵਿੱਚ ਨਮੀ ਦੇ ਰਾਜ਼', shortDesc: 'ਚਰਮ ਗਰਮੀਆਂ ਵਿੱਚ ਸਾਦੇ ਪਾਣੀ ਨਾਲੋਂ ਨਿੰਬੂ ਪਾਣੀ ਕਿਉਂ ਬਿਹਤਰ ਹੈ।', fullDesc: 'ਜਦੋਂ ਭਾਰਤ ਦੀ ਗਰਮੀ ਸਿਖਰ ਤੇ ਹੁੰਦੀ ਹੈ, ਪਸੀਨੇ ਰਾਹੀਂ ਜ਼ਰੂਰੀ ਨਮਕ ਖਤਮ ਹੁੰਦੇ ਹਨ। ਕਾਲੇ ਨਮਕ ਵਾਲਾ ਨਿੰਬੂ ਪਾਣੀ ਜਾਂ ਤਾਜ਼ਾ ਨਾਰੀਅਲ ਪਾਣੀ ਪੀਣ ਨਾਲ ਇਲੈਕਟ੍ਰੋਲਾਈਟ ਸੰਤੁਲਨ ਤੁਰੰਤ ਬਹਾਲ ਹੁੰਦਾ ਹੈ।' },
      t3: { title: 'ਭਾਰਤੀ ਥਾਲੀ ਨੂੰ ਸੰਤੁਲਿਤ ਕਰਨਾ', shortDesc: 'ਆਪਣੇ ਰੋਜ਼ਾਨਾ ਭੋਜਨ ਵਿੱਚ ਸਹੀ ਪ੍ਰੋਟੀਨ-ਕਾਰਬ ਅਨੁਪਾਤ ਕਿਵੇਂ ਯਕੀਨੀ ਕਰੀਏ।', fullDesc: 'ਰਵਾਇਤੀ ਭਾਰਤੀ ਖੁਰਾਕ ਕਈ ਵਾਰ ਚੌਲ ਅਤੇ ਰੋਟੀ ਤੇ ਬਹੁਤ ਨਿਰਭਰ ਹੁੰਦੀ ਹੈ। ਆਪਣੀ ਥਾਲੀ ਦਾ ਅੱਧਾ ਹਿੱਸਾ ਸਬਜ਼ੀਆਂ ਨਾਲ, ਇੱਕ ਚੌਥਾਈ ਕਾਰਬ (ਬਾਜਰੇ ਦੀ ਰੋਟੀ) ਨਾਲ ਅਤੇ ਇੱਕ ਚੌਥਾਈ ਪ੍ਰੋਟੀਨ (ਦਾਲ, ਪਨੀਰ) ਨਾਲ ਭਰੋ। ਘਰ ਦਾ ਦਹੀਂ ਪ੍ਰੋਬਾਇਓਟਿਕਸ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।' },
      t4: { title: 'ਸਵੇਰੇ ਦੀ ਧੁੱਪ ਦੀ ਸ਼ਕਤੀ', shortDesc: 'ਸਵੇਰੇ ਦੀ ਧੁੱਪ ਵਿੱਚ ਸਿਰਫ਼ 15 ਮਿੰਟ ਵਿਟਾਮਿਨ ਡੀ ਅਤੇ ਮੂਡ ਬਿਹਤਰ ਕਰ ਸਕਦੇ ਹਨ।', fullDesc: 'ਧੁੱਪ ਵਾਲੇ ਦੇਸ਼ ਵਿੱਚ ਰਹਿਣ ਦੇ ਬਾਵਜੂਦ ਬਹੁਤੇ ਭਾਰਤੀ ਵਿਟਾਮਿਨ ਡੀ ਦੀ ਕਮੀ ਤੋਂ ਪੀੜਤ ਹਨ। ਸਵੇਰੇ 9 ਵਜੇ ਤੋਂ ਪਹਿਲਾਂ 15-20 ਮਿੰਟ ਬਾਹਾਂ ਅਤੇ ਪੈਰਾਂ ਨੂੰ ਧੁੱਪ ਵਿੱਚ ਰੱਖਣ ਨਾਲ ਕੁਦਰਤੀ ਵਿਟਾਮਿਨ ਡੀ ਬਣਦਾ ਹੈ, ਹੱਡੀਆਂ ਮਜ਼ਬੂਤ ਹੁੰਦੀਆਂ ਹਨ ਅਤੇ ਨੀਂਦ ਬਿਹਤਰ ਆਉਂਦੀ ਹੈ।' },
      t5: { title: 'ਆਪਣੀ ਡੈਸਕ ਤੇ ਯੋਗਾ', shortDesc: 'ਲੰਬੇ ਕੰਮ ਦੇ ਘੰਟਿਆਂ ਦੌਰਾਨ ਗਰਦਨ ਅਤੇ ਪਿੱਠ ਦਰਦ ਲਈ 3 ਸਰਲ ਸਟ੍ਰੈਚ।', fullDesc: 'ਲੰਬੇ ਸਮੇਂ ਤੱਕ ਬੈਠਣ ਨਾਲ ਆਸਣ ਤੇ ਮਾੜਾ ਅਸਰ ਪੈਂਦਾ ਹੈ। ਇਹ ਤਿੰਨ ਡੈਸਕ-ਅਨੁਕੂਲ ਸਟ੍ਰੈਚ ਕਰੋ: 1. ਬੈਠ ਕੇ ਰੀੜ੍ਹ ਦੀ ਮੋੜ। 2. ਗਰਦਨ ਦੇ ਰੋਲ। 3. ਕਲਾਈ ਸਟ੍ਰੈਚ। ਹਰ ਕੁਝ ਘੰਟੇ ਬਾਅਦ 2 ਮਿੰਟ ਲਈ ਇਹ ਕਰਨ ਨਾਲ ਪੁਰਾਣੇ ਦਰਦ ਤੋਂ ਬਚਾਅ ਹੁੰਦਾ ਹੈ।' },
      t6: { title: 'ਪ੍ਰਾਣਾਯਾਮ ਨਾਲ ਤਣਾਅ ਪ੍ਰਬੰਧਨ', shortDesc: 'ਕਿਵੇਂ ਅਨੁਲੋਮ ਵਿਲੋਮ ਮਿੰਟਾਂ ਵਿੱਚ ਕੋਰਟੀਸੋਲ ਘਟਾਉਂਦਾ ਹੈ।', fullDesc: 'ਤਣਾਅ ਕੋਰਟੀਸੋਲ ਵਧਾਉਂਦਾ ਹੈ ਜੋ ਉੱਚ ਰਕਤਚਾਪ ਅਤੇ ਚਿੰਤਾ ਦਾ ਕਾਰਨ ਬਣ ਸਕਦਾ ਹੈ। ਅਨੁਲੋਮ ਵਿਲੋਮ ਵਿੱਚ ਇੱਕ ਨੱਕ ਤੋਂ ਸਾਹ ਲੈ ਕੇ ਦੂਜੇ ਤੋਂ ਛੱਡਣ ਨਾਲ ਪੈਰਾਸਿਮਪੈਥੈਟਿਕ ਤੰਤੂ ਪ੍ਰਣਾਲੀ ਸਰਗਰਮ ਹੁੰਦੀ ਹੈ। ਸੌਣ ਤੋਂ ਪਹਿਲਾਂ ਕੇਵਲ 5 ਮਿੰਟ ਇਹ ਕਰਨ ਨਾਲ ਨੀਂਦ ਦੀ ਗੁਣਵੱਤਾ ਬਿਹਤਰ ਹੁੰਦੀ ਹੈ।' },
    },
  },

  // ─── TAMIL ───────────────────────────────────────────────────────────────
  Tamil: {
    nav: { home: 'முகப்பு', symptoms: 'அறிகுறிகள்', doctors: 'மருத்துவர் கண்டுபிடி', tips: 'சுகாதார குறிப்புகள்', profile: 'சுயவிவரம்' },
    home: {
      badge: 'AI-சக்தி வாய்ந்த சுகாதார சேவை',
      title: 'உங்கள் தனிப்பட்ட', titleHighlight: 'மருத்துவ உதவியாளர்',
      subtitle: 'உடனடி அறிகுறி பகுப்பாய்வு பெறுங்கள், சரிபார்க்கப்பட்ட மருத்துவர்களுடன் இணைந்திருங்கள், இந்திய பயனர்களுக்கான தனிப்பயனாக்கப்பட்ட சுகாதார குறிப்புகள் பெறுங்கள்.',
      getStarted: 'தொடங்குங்கள்', learnMore: 'மேலும் அறிக',
      whyTitle: 'ஏன் SwasthAI?', viewAll: 'அனைத்தையும் பார்',
      symptomCheckerTitle: 'அறிகுறி சரிபார்ப்பு',
      symptomCheckerDesc: 'உங்கள் தொலைபேசியிலிருந்து நேரடியாக விரைவான, நம்பகமான தகவலுக்கான AI அறிகுறி பகுப்பாய்வு.',
      findDoctorsTitle: 'மருத்துவர் கண்டுபிடி',
      findDoctorsDesc: 'நிகழ்நேர கிடைக்கும் தன்மையுடன் சரிபார்க்கப்பட்ட உள்ளூர் மருத்துவர்களை கண்டுபிடித்து பதிவு செய்யுங்கள்.',
      healthTipsTitle: 'சுகாதார குறிப்புகள்',
      healthTipsDesc: 'இந்திய வாழ்க்கை முறை மற்றும் உணவுக்கு ஏற்ற தனிப்பயனாக்கப்பட்ட தினசரி சுகாதார ஆலோசனை.',
      feelingUnwell: 'உடல்நலமில்லாமல் உணர்கிறீர்களா?', consultNow: 'இப்போதே AI உதவியாளரிடம் ஆலோசிக்கவும்', checkNow: 'இப்போது சரிபார்க்கவும்',
    },
    symptoms: {
      greeting: 'வணக்கம்! நான் SwasthAI', subtitle: 'உங்கள் தனிப்பட்ட சுகாதார உதவியாளர்.',
      step1Title: 'இன்று நீங்கள் எப்படி உணர்கிறீர்கள்?',
      textareaPlaceholder: 'மற்ற அறிகுறிகளை விரிவாக விவரிக்கவும்...',
      continue: 'தொடரவும்', step2Title: 'சில கூடுதல் விவரங்கள்...',
      durationLabel: 'இந்த அறிகுறிகள் எவ்வளவு காலமாக உள்ளன?',
      severityLabel: 'தீவிரம்', severityHint: '1 = மிகவும் லேசான, 10 = மிகவும் கடுமையான',
      mild: 'லேசான', moderate: 'மிதமான', severe: 'கடுமையான',
      ageGroupLabel: 'வயது பிரிவு', back: 'பின்னால்', analyzeNow: 'இப்போது பகுப்பாய்வு செய்',
      analyzing: 'SwasthAI பகுப்பாய்வு செய்கிறது...',
      analyzingSubtitle: 'தயவுசெய்து காத்திருங்கள், எங்கள் AI உங்கள் அறிகுறிகளை ஆய்வு செய்கிறது.',
      analysisFailed: 'பகுப்பாய்வு தோல்வியடைந்தது', tryAgain: 'திரும்பிச் சென்று மீண்டும் முயற்சிக்கவும்',
      homeCareLabel: 'வீட்டு சிகிச்சை பரிந்துரைக்கப்படுகிறது', seeDoctorLabel: 'விரைவில் மருத்துவரை சந்தியுங்கள்',
      emergencyLabel: 'உடனடி மருத்துவ உதவி பெறுங்கள்!', possibleConditions: 'சாத்தியமான நிலைமைகள்',
      homeCareTitle: 'பரிந்துரைக்கப்பட்ட வீட்டு சிகிச்சை', disclaimer: 'மருத்துவ மறுப்பு:',
      startOver: 'மீண்டும் தொடங்கு', findDoctor: 'மருத்துவர் கண்டுபிடி',
      chipLabels: { Fever: 'காய்ச்சல்', Headache: 'தலைவலி', Cough: 'இருமல்', Fatigue: 'சோர்வு', Nausea: 'குமட்டல்', 'Body Ache': 'உடல் வலி', 'Sore Throat': 'தொண்டை வலி' },
      durationLabels: { 'Less than 24 hours': '24 மணி நேரத்திற்கும் குறைவாக', '1-3 days': '1-3 நாட்கள்', '3-7 days': '3-7 நாட்கள்', 'More than a week': 'ஒரு வாரத்திற்கும் அதிகமாக' },
      ageGroupLabels: { 'Under 18': '18க்கு கீழ்', '18-35': '18-35', '36-50': '36-50', '51-65': '51-65', 'Over 65': '65க்கு மேல்' },
    },
    doctors: {
      title: 'மருத்துவர் கண்டுபிடி', subtitle: 'உங்களுக்கு அருகில் சரிபார்க்கப்பட்ட நிபுணர்களுடன் சந்திப்புகளை பதிவு செய்யுங்கள்.',
      searchPlaceholder: 'நகரம், பின்கோடு அல்லது மருத்துவர் பெயர் மூலம் தேடு...',
      locating: 'உங்களை கண்டுபிடிக்கிறோம்...', mapUnavailable: 'வரைபடம் கிடைக்கவில்லை',
      mapHint: 'ஊடாடும் வரைபடத்தை செயல்படுத்த Google Maps API Key சேர்க்கவும்.',
      open: 'இப்போது திறந்திருக்கிறது', closed: 'மூடப்பட்டது', call: 'அழைப்பு', directions: 'வழிகாட்டுதல்கள்',
      noResults: 'மருத்துவர்கள் கிடைக்கவில்லை', noResultsHint: 'வேறு பகுதி அல்லது சிறப்புத்துவம் முயற்சிக்கவும்.',
      bookAppointment: 'பதிவு செய்',
    },
    tips: {
      title: 'சுகாதார குறிப்புகள்', subtitle: 'உங்கள் சுயவிவரத்திற்காக சிறப்பாக தொகுக்கப்பட்ட தினசரி தகவல்கள்.',
      todayTitle: 'இன்றைய சிறந்த குறிப்புகள்', readMore: 'மேலும் படிக்க', showLess: 'குறைவாக காட்டு',
      exploreTitle: 'அனைத்து கட்டுரைகளையும் ஆராயுங்கள்',
      categories: { All: 'அனைத்தும்', Nutrition: 'ஊட்டச்சத்து', Fitness: 'உடற்தகுதி', 'Mental Health': 'மன நலம்', 'Seasonal Health': 'பருவகால ஆரோக்கியம்' },
    },
    profile: {
      healthSummary: 'சுகாதார சுருக்கம்', emergencyContacts: 'அவசர தொடர்புகள்', recentChecks: 'சமீபத்திய சோதனைகள்',
      logOut: 'வெளியேறு', fullName: 'முழு பெயர்', phoneNumber: 'தொலைபேசி எண்',
      age: 'வயது', blood: 'இரத்தம்', allergies: 'ஒவ்வாமைகள்', ageUnit: 'வயது',
      save: 'சேமி', edit: 'திருத்து', callAmbulance: '108 அழை', ambulance: 'ஆம்புலன்ஸ்',
      callHelpline: 'உதவி எண்ணை அழை', healthIndia: 'சுகாதார இந்தியா',
      noContacts: 'இன்னும் அவசர தொடர்புகள் சேர்க்கப்படவில்லை.', addContact: 'அவசர தொடர்பை சேர்',
      contactName: 'பெயர்', contactRelation: 'உறவு (உதா. சகோதரி)', contactPhone: 'தொலைபேசி எண்',
      verifiedCheck: 'சரிபார்க்கப்பட்டது',
      appointmentsTitle: 'என் சந்திப்புகள்', noAppointments: 'இன்னும் சந்திப்புகள் பதிவு செய்யப்படவில்லை.',
      cancelAppt: 'ரத்து செய்', upcomingAppt: 'வரவிருக்கும்',
    },
    about: {
      title: 'SwasthAI பற்றி', subtitle: 'சுகாதார அமைச்சகம் பைலட் திட்டம்',
      description: 'SwasthAI என்பது இந்திய குடிமக்களுக்கு AI-இயக்கத்தின் மூலம் ஆரம்பகட்ட சுகாதார உதவி வழங்க வடிவமைக்கப்பட்ட ஒரு முன்னோடி முயற்சியாகும்.',
      disclaimerTitle: 'முக்கியமான மறுப்பு',
      disclaimerText: 'இந்த பயன்பாடு அறிகுறிகளை பகுப்பாய்வு செய்ய AI வழிமுறைகளை பயன்படுத்துகிறது. இது தொழில்முறை மருத்துவ நோய் கண்டறிதலுக்கு மாற்றாகாது. அவசரநிலைகளில் 108 ஐ அழைக்கவும்.',
    },
    common: {
      phoneError: 'சரியான 10 இலக்க இந்திய மொபைல் எண்ணை உள்ளிடவும்.',
      ageError: '0 முதல் 120 வரையிலான சரியான வயதை உள்ளிடவும்.',
      noNotifications: 'புதிய அறிவிப்புகள் இல்லை.',
    },
    tipContent: {
      t1: { title: 'மழைக்காலம் சுகாதாரம்: டெங்கு தடுப்பு', shortDesc: 'கொசு இனப்பெருக்கத்தை தடுக்க குளிரூட்டிகள் மற்றும் பாத்திரங்களிலிருந்து தேங்கிய நீரை வாராந்திரம் வெளியேற்றுங்கள்.' },
      t2: { title: 'கோடைகால நீர்ச்சத்து ரகசியங்கள்', shortDesc: 'கோடை உச்சத்தில் வெற்று நீரை விட நிம்பு பானி ஏன் சிறந்தது.' },
      t3: { title: 'இந்திய தாலியை சமப்படுத்துதல்', shortDesc: 'உங்கள் தினசரி உணவில் சரியான புரத-கார்ப் விகிதத்தை உறுதி செய்வது எப்படி.' },
      t4: { title: 'காலை வெயிலின் சக்தி', shortDesc: 'வெறும் 15 நிமிட காலை சூரிய வெளிப்பாடு வைட்டமின் டி மற்றும் மனநிலையை மேம்படுத்தலாம்.' },
      t5: { title: 'உங்கள் மேசையில் யோகா', shortDesc: 'நீண்ட வேலை நேரத்தில் கழுத்து மற்றும் முதுகு வலியை குறைக்க 3 எளிய நீட்சிகள்.' },
      t6: { title: 'பிராணாயாமத்தால் மன அழுத்த மேலாண்மை', shortDesc: 'அனுலோம் விலோம் நிமிடங்களில் கார்டிசோலை எவ்வாறு குறைக்கிறது.' },
    },
  },

  // ─── BENGALI ─────────────────────────────────────────────────────────────
  Bengali: {
    nav: { home: 'হোম', symptoms: 'উপসর্গ', doctors: 'ডাক্তার খুঁজুন', tips: 'স্বাস্থ্য টিপস', profile: 'প্রোফাইল' },
    home: {
      badge: 'AI-চালিত স্বাস্থ্যসেবা',
      title: 'আপনার ব্যক্তিগত', titleHighlight: 'চিকিৎসা সহকারী',
      subtitle: 'তাৎক্ষণিক উপসর্গ বিশ্লেষণ পান, যাচাইকৃত ডাক্তারদের সাথে যোগাযোগ করুন এবং ভারতীয় ব্যবহারকারীদের জন্য ব্যক্তিগতকৃত স্বাস্থ্য পরামর্শ পান।',
      getStarted: 'শুরু করুন', learnMore: 'আরও জানুন',
      whyTitle: 'কেন SwasthAI?', viewAll: 'সব দেখুন',
      symptomCheckerTitle: 'উপসর্গ পরীক্ষক',
      symptomCheckerDesc: 'আপনার ফোন থেকে সরাসরি দ্রুত, নির্ভরযোগ্য প্রাথমিক তথ্যের জন্য AI উপসর্গ বিশ্লেষণ।',
      findDoctorsTitle: 'ডাক্তার খুঁজুন',
      findDoctorsDesc: 'রিয়েল-টাইম প্রাপ্যতার সাথে যাচাইকৃত স্থানীয় ভারতীয় ডাক্তারদের খুঁজুন এবং অ্যাপয়েন্টমেন্ট নিন।',
      healthTipsTitle: 'স্বাস্থ্য টিপস',
      healthTipsDesc: 'ভারতীয় জীবনধারা ও খাদ্যাভ্যাসের জন্য উপযুক্ত ব্যক্তিগতকৃত দৈনিক স্বাস্থ্য পরামর্শ।',
      feelingUnwell: 'অসুস্থ বোধ করছেন?', consultNow: 'এখনই আমাদের AI সহকারীর সাথে পরামর্শ করুন', checkNow: 'এখনই পরীক্ষা করুন',
    },
    symptoms: {
      greeting: 'নমস্কার! আমি SwasthAI', subtitle: 'আপনার ব্যক্তিগত স্বাস্থ্য সহকারী।',
      step1Title: 'আজ আপনি কেমন অনুভব করছেন?',
      textareaPlaceholder: 'অন্য উপসর্গগুলি বিস্তারিতভাবে বর্ণনা করুন...',
      continue: 'এগিয়ে যান', step2Title: 'কিছু আরও বিবরণ...',
      durationLabel: 'এই উপসর্গগুলি কতদিন ধরে আছে?',
      severityLabel: 'তীব্রতা', severityHint: '1 = খুব হালকা, 10 = সম্পূর্ণ অক্ষম করা',
      mild: 'হালকা', moderate: 'মাঝারি', severe: 'তীব্র',
      ageGroupLabel: 'বয়সের গোষ্ঠী', back: 'পিছনে', analyzeNow: 'এখনই বিশ্লেষণ করুন',
      analyzing: 'SwasthAI বিশ্লেষণ করছে...',
      analyzingSubtitle: 'অনুগ্রহ করে অপেক্ষা করুন, আমাদের AI আপনার উপসর্গগুলি পর্যালোচনা করছে।',
      analysisFailed: 'বিশ্লেষণ ব্যর্থ হয়েছে', tryAgain: 'ফিরে যান এবং আবার চেষ্টা করুন',
      homeCareLabel: 'বাড়িতে চিকিৎসা পরামর্শ দেওয়া হচ্ছে', seeDoctorLabel: 'শীঘ্রই ডাক্তার দেখান',
      emergencyLabel: 'তাৎক্ষণিক চিকিৎসা সহায়তা নিন!', possibleConditions: 'সম্ভাব্য অবস্থা',
      homeCareTitle: 'পরামর্শকৃত ঘরোয়া যত্ন', disclaimer: 'চিকিৎসা দাবিত্যাগ:',
      startOver: 'আবার শুরু করুন', findDoctor: 'ডাক্তার খুঁজুন',
      chipLabels: { Fever: 'জ্বর', Headache: 'মাথাব্যথা', Cough: 'কাশি', Fatigue: 'ক্লান্তি', Nausea: 'বমি বমি ভাব', 'Body Ache': 'শরীর ব্যথা', 'Sore Throat': 'গলা ব্যথা' },
      durationLabels: { 'Less than 24 hours': '২৪ ঘন্টার কম', '1-3 days': '১-৩ দিন', '3-7 days': '৩-৭ দিন', 'More than a week': 'এক সপ্তাহের বেশি' },
      ageGroupLabels: { 'Under 18': '১৮ এর নিচে', '18-35': '১৮-৩৫', '36-50': '৩৬-৫০', '51-65': '৫১-৬৫', 'Over 65': '৬৫ এর উপরে' },
    },
    doctors: {
      title: 'ডাক্তার খুঁজুন', subtitle: 'আপনার কাছে যাচাইকৃত বিশেষজ্ঞদের সাথে অ্যাপয়েন্টমেন্ট খুঁজুন এবং বুক করুন।',
      searchPlaceholder: 'শহর, পিনকোড বা ডাক্তারের নাম অনুসন্ধান করুন...',
      locating: 'আপনাকে খুঁজছি...', mapUnavailable: 'মানচিত্র পাওয়া যাচ্ছে না',
      mapHint: 'ইন্টারেক্টিভ মানচিত্র সক্রিয় করতে Google Maps API Key যোগ করুন।',
      open: 'এখন খোলা আছে', closed: 'বন্ধ', call: 'কল করুন', directions: 'দিকনির্দেশনা',
      noResults: 'কোনো ডাক্তার পাওয়া যায়নি', noResultsHint: 'অন্য এলাকা বা বিশেষত্ব চেষ্টা করুন।',
      bookAppointment: 'বুক করুন',
    },
    tips: {
      title: 'স্বাস্থ্য টিপস', subtitle: 'আপনার প্রোফাইলের জন্য বিশেষভাবে তৈরি দৈনিক তথ্য।',
      todayTitle: 'আজকের শীর্ষ টিপস', readMore: 'আরও পড়ুন', showLess: 'কম দেখান',
      exploreTitle: 'সমস্ত নিবন্ধ অন্বেষণ করুন',
      categories: { All: 'সব', Nutrition: 'পুষ্টি', Fitness: 'ফিটনেস', 'Mental Health': 'মানসিক স্বাস্থ্য', 'Seasonal Health': 'মৌসুমী স্বাস্থ্য' },
    },
    profile: {
      healthSummary: 'স্বাস্থ্য সারসংক্ষেপ', emergencyContacts: 'জরুরি যোগাযোগ', recentChecks: 'সাম্প্রতিক পরীক্ষা',
      logOut: 'লগ আউট', fullName: 'পুরো নাম', phoneNumber: 'ফোন নম্বর',
      age: 'বয়স', blood: 'রক্ত', allergies: 'অ্যালার্জি', ageUnit: 'বছর',
      save: 'সংরক্ষণ', edit: 'সম্পাদনা', callAmbulance: '108 কল করুন', ambulance: 'অ্যাম্বুলেন্স',
      callHelpline: 'হেল্পলাইন কল করুন', healthIndia: 'স্বাস্থ্য ভারত',
      noContacts: 'এখনও কোনো জরুরি যোগাযোগ যোগ করা হয়নি।', addContact: 'জরুরি যোগাযোগ যোগ করুন',
      contactName: 'নাম', contactRelation: 'সম্পর্ক (যেমন বোন)', contactPhone: 'ফোন নম্বর',
      verifiedCheck: 'যাচাইকৃত',
      appointmentsTitle: 'আমার অ্যাপয়েন্টমেন্ট', noAppointments: 'এখনও কোনো অ্যাপয়েন্টমেন্ট বুক করা হয়নি।',
      cancelAppt: 'বাতিল', upcomingAppt: 'আসন্ন',
    },
    about: {
      title: 'SwasthAI সম্পর্কে', subtitle: 'স্বাস্থ্য মন্ত্রণালয় পাইলট প্রকল্প',
      description: 'SwasthAI হল একটি সহযোগিতামূলক পাইলট উদ্যোগ যা ভারতীয় নাগরিকদের AI-চালিত প্রাথমিক স্বাস্থ্যসেবা সহায়তা প্রদানের জন্য ডিজাইন করা হয়েছে।',
      disclaimerTitle: 'গুরুত্বপূর্ণ দাবিত্যাগ',
      disclaimerText: 'এই অ্যাপ্লিকেশনটি উপসর্গ বিশ্লেষণ করতে AI অ্যালগরিদম ব্যবহার করে। এটি পেশাদার চিকিৎসা রোগ নির্ণয়ের বিকল্প নয়। জরুরি অবস্থায় সর্বদা 108 কল করুন।',
    },
    common: {
      phoneError: 'একটি বৈধ ১০ সংখ্যার ভারতীয় মোবাইল নম্বর প্রবেশ করুন।',
      ageError: '0 থেকে 120 এর মধ্যে একটি বৈধ বয়স প্রবেশ করুন।',
      noNotifications: 'কোনো নতুন বিজ্ঞপ্তি নেই।',
    },
    tipContent: {
      t1: { title: 'বর্ষাকালীন স্বাস্থ্যবিধি: ডেঙ্গু প্রতিরোধ', shortDesc: 'মশার বংশবিস্তার রোধ করতে কুলার এবং পাত্র থেকে জমে থাকা পানি সাপ্তাহিক সরান।' },
      t2: { title: 'গ্রীষ্মকালীন হাইড্রেশন রহস্য', shortDesc: 'কেন চরম গ্রীষ্মে সাধারণ পানির চেয়ে নিম্বু পানি ভালো।' },
      t3: { title: 'ভারতীয় থালি সামঞ্জস্য করা', shortDesc: 'আপনার দৈনিক খাবারে সঠিক প্রোটিন-কার্ব অনুপাত কীভাবে নিশ্চিত করবেন।' },
      t4: { title: 'সকালের সূর্যালোকের শক্তি', shortDesc: 'মাত্র ১৫ মিনিটের ভোরের রোদ ভিটামিন ডি মাত্রা এবং মেজাজ উল্লেখযোগ্যভাবে উন্নত করতে পারে।' },
      t5: { title: 'আপনার ডেস্কে যোগব্যায়াম', shortDesc: 'দীর্ঘ কাজের সময় ঘাড় ও পিঠের ব্যথা উপশমে ৩টি সহজ স্ট্রেচ।' },
      t6: { title: 'প্রাণায়ামে মানসিক চাপ ব্যবস্থাপনা', shortDesc: 'কীভাবে অনুলোম বিলোম মিনিটের মধ্যে কর্টিসল কমায়।' },
    },
  },

  Gujarati: {
    nav: {
      home: 'હોમ', symptoms: 'લક્ષણો', doctors: 'ડોક્ટર', tips: 'ટિપ્સ', profile: 'પ્રોફાઇલ',
    },
    home: {
      badge: 'AI-સંચાલિત સ્વાસ્થ્ય સહાય',
      title: 'તમારું', titleHighlight: 'AI સ્વાસ્થ્ય',
      subtitle: 'ઝડપી, વિશ્વસનીય AI-સહાયિત ટ્રાઇઝ, ડૉક્ટર શોધ, અને ભારત માટે અનુકૂળ સ્વાસ્થ્ય ટિપ્સ.',
      getStarted: 'શરૂ કરો', learnMore: 'વધુ જાણો', whyTitle: 'SwasthAI કેમ?',
      viewAll: 'બધું જુઓ',
      symptomCheckerTitle: 'લક્ષણ તપાસ', symptomCheckerDesc: 'AI-સંચાલિત ત્વરિત ટ્રાઇઝ',
      findDoctorsTitle: 'ડૉક્ટર શોધો', findDoctorsDesc: 'નજીક, ઉપલબ્ધ ડૉક્ટર',
      healthTipsTitle: 'સ્વાસ્થ્ય ટિપ્સ', healthTipsDesc: 'ભારત-અનુકૂળ સ્વાસ્થ્ય સલાહ',
      feelingUnwell: 'અસ્વસ્થ અનુભવ થઈ રહ્યો છે?',
      consultNow: 'હવે સલાહ લો', checkNow: 'હવે તપાસ કરો',
    },
    symptoms: {
      greeting: 'આજે તમને કેવું લાગે છે?',
      subtitle: 'તમારા લક્ષણો વર્ણવો અને AI-સહાયિત ટ્રાઇઝ મેળવો.',
      step1Title: 'તમારા લક્ષણો પસંદ કરો અથવા ટાઇપ કરો',
      textareaPlaceholder: 'ઉદા. 3 દિવસથી માથાનો દુખાવો, ઠંડી ઉઠવી, ગળામાં સૂજ...',
      continue: 'આગળ વધો',
      step2Title: 'અમને વધુ જણાવો',
      durationLabel: 'લક્ષણો કેટલા સમયથી છે?',
      severityLabel: 'ગંભીરતા',
      severityHint: '1 = ખૂબ ઓછું, 10 = અસહ્ય',
      mild: 'ઓછું', moderate: 'સામાન્ય', severe: 'ગંભીર',
      ageGroupLabel: 'ઉંમર જૂથ',
      back: 'પાછા', analyzeNow: 'હવે વિશ્લેષણ કરો',
      analyzing: 'વિશ્લેષણ થઈ રહ્યું છે...',
      analyzingSubtitle: 'AI તમારા લક્ષણો, ઉંમર, અને ભારત-વિશિષ્ટ ડેટા ચકાસી રહ્યું છે.',
      analysisFailed: 'વિશ્લેષણ નિષ્ફળ', tryAgain: 'ફરી પ્રયાસ કરો',
      homeCareLabel: 'ઘરે સારવાર કરી શકો છો',
      seeDoctorLabel: 'ડૉક્ટરને મળો',
      emergencyLabel: 'તાત્કાલિક સ્વાસ્થ્ય સ્થિતિ',
      possibleConditions: 'સંભવિત કારણો',
      homeCareTitle: 'ઘરગથ્થુ ઉપચાર',
      disclaimer: 'ચેતવણી:',
      startOver: 'ફરી શરૂ કરો', findDoctor: 'ડૉક્ટર શોધો',
      chipLabels: {
        'Fever': 'તાવ', 'Headache': 'માથાનો દુખાવો', 'Cough': 'ઉધરસ',
        'Fatigue': 'થાક', 'Nausea': 'ઉબકા', 'Body Ache': 'શરીરનો દુખાવો', 'Sore Throat': 'ગળામાં દુખાવો',
      },
      durationLabels: {
        'Less than 24 hours': '24 કલાકથી ઓછું', '1-3 days': '1-3 દિવસ',
        '3-7 days': '3-7 દિવસ', 'More than a week': 'એક અઠવાડિયાથી વધારે',
      },
      ageGroupLabels: {
        'Under 18': '18 વર્ષથી ઓછી', '18-35': '18-35', '36-50': '36-50',
        '51-65': '51-65', 'Over 65': '65 વર્ષથી વધારે',
      },
    },
    doctors: {
      title: 'ડૉક્ટર શોધો', subtitle: 'નજીકના ક્લિનિક અને હૉસ્પિટલ',
      searchPlaceholder: 'શહેર, પિનકોડ અથવા ડૉક્ટરનું નામ શોધો...',
      locating: 'તમને શોધી રહ્યા છીએ...', mapUnavailable: 'નકશો ઉપલબ્ધ નથી',
      mapHint: 'ઇન્ટરેક્ટિવ નકશો સક્ષમ કરવા Google Maps API Key ઉમેરો.',
      open: 'હમણાં ખુલ્લું', closed: 'બંધ', call: 'ફોન કરો', directions: 'દિશા',
      noResults: 'કોઈ ડૉક્ટર મળ્યા નહીં', noResultsHint: 'બીજો વિસ્તાર અથવા વિશેષતા અજમાવો.',
      bookAppointment: 'બૂક કરો',
    },
    tips: {
      title: 'સ્વાસ્થ્ય ટિપ્સ', subtitle: 'તમારા પ્રોફાઇલ માટે ખાસ તૈયાર કરેલ દૈનિક માહિતી.',
      todayTitle: 'આજની ટોચની ટિપ્સ', readMore: 'વધુ વાંચો', showLess: 'ઓછું દેખાડો',
      exploreTitle: 'બધા લેખ જુઓ',
      categories: { All: 'બધા', Nutrition: 'પોષણ', Fitness: 'ફિટનેસ', 'Mental Health': 'માનસિક સ્વાસ્થ્ય', 'Seasonal Health': 'ઋતુ સ્વાસ્થ્ય' },
    },
    profile: {
      healthSummary: 'સ્વાસ્થ્ય સારાંશ', emergencyContacts: 'ઇમર્જન્સી સંપર્ક', recentChecks: 'તાજેતરની તપાસ',
      logOut: 'લૉગ આઉટ', fullName: 'પૂરું નામ', phoneNumber: 'ફોન નંબર',
      age: 'ઉંમર', blood: 'બ્લડ ગ્રૂપ', allergies: 'એલર્જી', ageUnit: 'વર્ષ',
      save: 'સાચવો', edit: 'ફેરફાર', callAmbulance: '108 ડાયલ કરો', ambulance: 'એમ્બ્યુલન્સ',
      callHelpline: 'હેલ્પલાઇન ડાયલ કરો', healthIndia: 'સ્વાસ્થ્ય ભારત',
      noContacts: 'હજી કોઈ ઇમર્જન્સી સંપર્ક ઉમેરવામાં આવ્યો નથી.', addContact: 'ઇમર્જન્સી સંપર્ક ઉમેરો',
      contactName: 'નામ', contactRelation: 'સંબંધ (જેવા કે બહેન)', contactPhone: 'ફોન નંબર',
      verifiedCheck: 'ચકાસાયેલ',
      appointmentsTitle: 'મારી એપોઇન્ટમેન્ટ', noAppointments: 'હજી કોઈ એપોઇન્ટમેન્ટ બૂક કરવામાં આવી નથી.',
      cancelAppt: 'રદ કરો', upcomingAppt: 'આગામી',
    },
    about: {
      title: 'SwasthAI વિશે', subtitle: 'આરોગ્ય મંત્રાલય પાઇલટ પ્રોજેક્ટ',
      description: 'SwasthAI એ ભારતીય નાગરિકોને AI-સંચાલિત પ્રાથમિક આરોગ્ય સહાય પ્રદાન કરવા માટે ડિઝાઇન કરાયેલ સહયોગી પાઇલટ પ્રકલ્પ છે.',
      disclaimerTitle: 'મહત્વની ચેતવણી',
      disclaimerText: 'આ એપ્લિકેશન લક્ષણ વિશ્લેષણ માટે AI અલ્ગોરિધમ ઉપયોગ કરે છે. આ વ્યાવસાયિક તબીબી નિદાનનો વિકલ્પ નથી. ઇમર્જન્સીમાં હંમેશા 108 ડાયલ કરો.',
    },
    common: {
      phoneError: 'માન્ય 10 અંકનો ભારતીય મોબાઇલ નંબર દાખલ કરો.',
      ageError: '0 થી 120 ની વચ્ચે માન્ય ઉંમર દાખલ કરો.',
      noNotifications: 'કોઈ નવી સૂચના નથી.',
    },
    tipContent: {
      t1: { title: 'ચોમાસા સ્વચ્છતા: ડેન્ગ્યુ નિવારણ', shortDesc: 'મચ્છરના ઉત્પત્તિ સ્થળ ઘટાડવા કૂલર અને વાસણોમાંથી ઊભું પાણી સાપ્તાહિક ખાલી કરો.' },
      t2: { title: 'ઉનાળા હાઇડ્રેશન ટિપ્સ', shortDesc: 'ઉનાળામાં સાદા પાણી કરતાં નિંબુ પાણી કેમ વધારે ફાયદાકારક છે.' },
      t3: { title: 'ભારતીય થાળી સંતુલન', shortDesc: 'રોજિંદા ભોજનમાં યોગ્ય પ્રોટીન-કાર્બ ગુણોત્તર કેવી રીતે સુનિશ્ચિત કરવો.' },
      t4: { title: 'સવારના સૂર્યપ્રકાશની શક્તિ', shortDesc: 'ફક્ત 15 મિનિટ વહેલી સવારનો સૂર્ય Vitamin D સ્તર અને મૂડ સુધારી શકે છે.' },
      t5: { title: 'ડેસ્ક પર યોગ', shortDesc: 'લાંબા કામ દરમ્યાન ગળા અને પીઠના દુખાવાથી રાહત મેળવવા 3 સ્ટ્રેચ.' },
      t6: { title: 'પ્રાણાયામ દ્વારા તણાવ વ્યવસ્થાપન', shortDesc: 'અનુલોમ-વિલોમ (વૈકલ્પિક નસ્ય શ્વસન) minutes ની અંદર cortisol ઘટાડે છે.' },
    },
  },
};
