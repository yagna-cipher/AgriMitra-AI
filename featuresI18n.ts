import { LanguageCode } from "../types";

export interface FeatureTranslations {
  farmHealth: {
    title: string;
    subtitle: string;
    overallScore: string;
    excellent: string;
    good: string;
    moderate: string;
    needsAttention: string;
    notEnoughData: string;
    howToImprove: string;
    cropHealth: string;
    soilHealth: string;
    waterIrrigation: string;
    weatherRisk: string;
    pestRisk: string;
    nutrition: string;
    points: string;
  };
  cropCalendar: {
    title: string;
    subtitle: string;
    selectCrop: string;
    variety: string;
    sowingDate: string;
    irrigationMethod: string;
    timeline: string;
    duration: string;
    irrigation: string;
    nutrition: string;
    pestMonitoring: string;
    importantActivities: string[];
    disclaimer: string;
    activeStage: string;
    completedStage: string;
    upcomingStage: string;
  };
  reminders: {
    title: string;
    subtitle: string;
    todayTasks: string;
    upcomingTasks: string;
    allTasks: string;
    addTask: string;
    taskName: string;
    category: string;
    date: string;
    time: string;
    cropOrField: string;
    notes: string;
    completed: string;
    pending: string;
    deleteTask: string;
    browserNotificationNote: string;
    noTasksYet: string;
  };
  earlyWarning: {
    title: string;
    subtitle: string;
    lowRisk: string;
    mediumRisk: string;
    highRisk: string;
    whyRiskExists: string;
    symptomsToMonitor: string;
    preventiveAction: string;
    whenToScan: string;
    disclaimer: string;
    scanNow: string;
  };
  cropRecommendation: {
    title: string;
    subtitle: string;
    location: string;
    soilPh: string;
    waterAvailability: string;
    season: string;
    landSize: string;
    irrigationType: string;
    findCrops: string;
    recommendedCrops: string;
    matchScore: string;
    growingPeriod: string;
    waterRequirement: string;
    marketPotential: string;
    mainRisks: string;
    keyTips: string;
    approxNotice: string;
  };
  market: {
    title: string;
    subtitle: string;
    selectCrop: string;
    selectMarket: string;
    liveDataUnavailableTitle: string;
    liveDataUnavailableDesc: string;
    officialMspTitle: string;
    category: string;
    qualityStandards: string;
    sellingStrategy: string;
    storageAdvice: string;
    enamNotice: string;
  };
  schemes: {
    title: string;
    subtitle: string;
    filterState: string;
    filterCategory: string;
    filterActivity: string;
    purpose: string;
    eligibility: string;
    benefits: string;
    howToApply: string;
    officialPortal: string;
    disclaimer: string;
    viewAll: string;
  };
  advisor: {
    title: string;
    subtitle: string;
    askPlaceholder: string;
    askButton: string;
    suggestionPrompts: string[];
    disclaimer: string;
  };
}

export const FEATURES_I18N: Record<LanguageCode, FeatureTranslations> = {
  te: {
    farmHealth: {
      title: "వ్యవసాయ ఆరోగ్య స్కోర్",
      subtitle: "మీ పంటలు, నేల, నీరు మరియు వాతావరణ సమాచారంతో అంచనా వేయబడిన స్కోర్",
      overallScore: "మొత్తం ఫామ్ హెల్త్",
      excellent: "అద్భుతం",
      good: "మంచిది",
      moderate: "సాధారణం",
      needsAttention: "శ్రద్ధ అవసరం",
      notEnoughData: "పూర్తి సమాచారం లేదు",
      howToImprove: "స్కోర్‌ను ఎలా మెరుగుపరచుకోవాలి?",
      cropHealth: "పంట ఆరోగ్యం",
      soilHealth: "నేల ఆరోగ్యం",
      waterIrrigation: "నీటిపారుదల",
      weatherRisk: "వాతావరణ రిస్క్",
      pestRisk: "చీడపీడల ముప్పు",
      nutrition: "పోషకాల సమతుల్యత",
      points: "పాయింట్లు"
    },
    cropCalendar: {
      title: "పంట క్యాలెండర్",
      subtitle: "విత్తనం నుండి కోత వరకు పూర్తి కాలక్రమం & సూచనలు",
      selectCrop: "పంటను ఎంచుకోండి",
      variety: "రకం / వెరైటీ",
      sowingDate: "విత్తిన తేదీ",
      irrigationMethod: "నీటిపారుదల పద్ధతి",
      timeline: "పంట దశల కాలక్రమం",
      duration: "కాలవ్యవధి",
      irrigation: "నీటి యాజమాన్యం",
      nutrition: "ఎరువులు & పోషకాలు",
      pestMonitoring: "చీడపీడల గమనింపు",
      importantActivities: ["ముఖ్యమైన పనులు"],
      disclaimer: "గమనిక: ఈ కాలపరిమితులు సాధారణ అంచనా మాత్రమే. వాతావరణం, నేల మరియు రకాన్ని బట్టి వాస్తవ తేదీలు మారవచ్చు.",
      activeStage: "ప్రస్తుత దశ",
      completedStage: "పూర్తయింది",
      upcomingStage: "రాబోయే దశ"
    },
    reminders: {
      title: "స్మార్ట్ ఫామ్ రిమైండర్లు",
      subtitle: "తడి, ఎరువులు, పిచికారీ మరియు ముఖ్యమైన పనుల హెచ్చరికలు",
      todayTasks: "ఈరోజు చేయవలసిన పనులు",
      upcomingTasks: "రాబోయే పనులు",
      allTasks: "మొత్తం పనులు",
      addTask: "+ కొత్త పనిని చేర్చండి",
      taskName: "పని పేరు",
      category: "వర్గం",
      date: "తేదీ",
      time: "సమయం",
      cropOrField: "పంట / పొలం",
      notes: "ముఖ్యమైన గమనికలు",
      completed: "పూర్తయింది",
      pending: "చేయవలసి ఉంది",
      deleteTask: "తొలగించు",
      browserNotificationNote: "ఈ యాప్‌లో ఇన్-యాప్ రిమైండర్లు మరియు డాష్‌బోర్డ్ హెచ్చరికలు పనిచేస్తాయి.",
      noTasksYet: "ప్రస్తుతానికి పెండింగ్ పనులు ఏవీ లేవు."
    },
    earlyWarning: {
      title: "ముందస్తు చీడపీడల హెచ్చరిక",
      subtitle: "వాతావరణం & పంట దశ ఆధారంగా సంభావ్య తెగుళ్ల అంచనా",
      lowRisk: "తక్కువ రిస్క్",
      mediumRisk: "మధ్యస్థ రిస్క్",
      highRisk: "అధిక రిస్క్",
      whyRiskExists: "ఈ రిస్క్ ఎందుకు ఉంది?",
      symptomsToMonitor: "గమనించవలసిన లక్షణాలు",
      preventiveAction: "ముందస్తు రక్షణ చర్యలు",
      whenToScan: "మళ్ళీ ఎప్పుడు స్కాన్ చేయాలి?",
      disclaimer: "భద్రతా సూచన: చిత్రం ద్వారా స్పష్టమైన నిర్ధారణ లేకుండా తెగులు ఉందని ఖచ్చితంగా చెప్పలేము. ఇది ముందస్తు అప్రమత్తత కోసం మాత్రమే.",
      scanNow: "కెమెరాతో స్కాన్ చేయండి"
    },
    cropRecommendation: {
      title: "ఏ పంట వేయాలి?",
      subtitle: "నేల, సీజన్ & నీటి లభ్యత ఆధారంగా అనువైన పంటలు",
      location: "ప్రాంతం",
      soilPh: "నేల pH విలువ",
      waterAvailability: "నీటి లభ్యత",
      season: "సీజన్",
      landSize: "భూమి విస్తీర్ణం (ఎకరాలు)",
      irrigationType: "నీటిపారుదల",
      findCrops: "అనువైన పంటలను కనుగొనండి",
      recommendedCrops: "సిఫార్సు చేయబడిన పంటలు",
      matchScore: "సరిపోలిక శాతం",
      growingPeriod: "పంట కాలం",
      waterRequirement: "నీటి అవసరం",
      marketPotential: "మార్కెట్ సామర్థ్యం",
      mainRisks: "ముఖ్యమైన రిస్కులు",
      keyTips: "యాజమాన్య సూచనలు",
      approxNotice: "మార్కెట్ సమాచారం సాధారణ అంచనా మాత్రమే. ప్రస్తుత మార్కెట్ ధరలను నిర్ధారించుకోండి."
    },
    market: {
      title: "మార్కెట్ గైడ్ & MSP",
      subtitle: "కనీస మద్దతు ధర (MSP) & లాభదాయక విక్రయ సూచనలు",
      selectCrop: "పంటను ఎంచుకోండి",
      selectMarket: "మార్కెట్ / మండి ఎంచుకోండి",
      liveDataUnavailableTitle: "లైవ్ మార్కెట్ డేటా ప్రస్తుతం అందుబాటులో లేదు",
      liveDataUnavailableDesc: "అధికారిక ప్రభుత్వ కనీస మద్దతు ధర (MSP 2024-25) మరియు విక్రయ సలహాలు క్రింద ఇవ్వబడ్డాయి.",
      officialMspTitle: "ప్రభుత్వ కనీస మద్దతు ధర (MSP)",
      category: "వర్గం",
      qualityStandards: "నాణ్యతా ప్రమాణాలు (FAQ)",
      sellingStrategy: "అనువైన విక్రయ సమయం",
      storageAdvice: "నిల్వ యాజమాన్యం",
      enamNotice: "e-NAM జాతీయ పోర్టల్ ద్వారా దేశవ్యాప్త వ్యాపారులకు నేరుగా విక్రయించవచ్చు."
    },
    schemes: {
      title: "ప్రభుత్వ వ్యవసాయ పథకాలు",
      subtitle: "రైతుల కోసం ధృవీకరించబడిన కేంద్ర & రాష్ట్ర ప్రభుత్వ పథకాలు",
      filterState: "రాష్ట్రం",
      filterCategory: "రైతు వర్గం",
      filterActivity: "పథకం రకం",
      purpose: "పథకం ఉద్దేశం",
      eligibility: "ప్రాథమిక అర్హతలు",
      benefits: "లభించే ప్రయోజనాలు",
      howToApply: "దరఖాస్తు విధానం",
      officialPortal: "అధికారిక వెబ్‌సైట్",
      disclaimer: "ముఖ్య గమనిక: దరఖాస్తుకు ముందు అధికారిక ప్రభుత్వ పోర్టల్‌లో ప్రస్తుత నిబంధనలు తనిఖీ చేయండి.",
      viewAll: "అన్ని పథకాలు"
    },
    advisor: {
      title: "అగ్రి మిత్ర సలహాదారు",
      subtitle: "మీ పంట ప్రశ్నలకు వేగవంతమైన వ్యవసాయ నిపుణుల సమాధానాలు",
      askPlaceholder: "మీ పంట లేదా పొలం గురించి ఏదైనా అడగండి...",
      askButton: "అడగండి",
      suggestionPrompts: [
        "నా టమాటా ఆకులు పసుపు రంగులోకి మారుతున్నాయి, కారణం ఏమిటి?",
        "వరి పంటలో నీటి తడి ఎప్పుడు పెట్టాలి?",
        "మిరపలో తామర పురుగు నివారణకు సేంద్రీయ పద్ధతులు ఏమిటి?",
        "పత్తి పంటలో గులాబీ రంగు పురుగును ఎలా గుర్తించాలి?",
        "నేల పరీక్ష ప్రకారం ఎరువులు ఎలా వాడాలి?"
      ],
      disclaimer: "రసాయన మందులను వాడేటప్పుడు లేబుల్ సూచనలు పాటించండి మరియు రక్షణ తొడుగులు ధరించండి."
    }
  },

  hi: {
    farmHealth: {
      title: "कृषि स्वास्थ्य स्कोर",
      subtitle: "फसलों, मिट्टी, जल और मौसम के आधार पर समग्र स्कोर",
      overallScore: "फार्म हेल्थ",
      excellent: "उत्कृष्ट",
      good: "अच्छा",
      moderate: "मध्यम",
      needsAttention: "ध्यान देने की आवश्यकता",
      notEnoughData: "पर्याप्त डेटा नहीं है",
      howToImprove: "अपना स्कोर कैसे सुधारें?",
      cropHealth: "फसल स्वास्थ्य",
      soilHealth: "मिट्टी का स्वास्थ्य",
      waterIrrigation: "सिंचाई एवं जल",
      weatherRisk: "मौसम जोखिम",
      pestRisk: "कीट/रोग जोखिम",
      nutrition: "पोषण संतुलन",
      points: "अंक"
    },
    cropCalendar: {
      title: "फसल कैलेंडर",
      subtitle: "बुवाई से कटाई तक संपूर्ण समयरेखा और कार्य",
      selectCrop: "फसल चुनें",
      variety: "किस्म (वैरायटी)",
      sowingDate: "बुवाई की तिथि",
      irrigationMethod: "सिंचाई विधि",
      timeline: "फसल विकास चरण",
      duration: "अवधि",
      irrigation: "सिंचाई मार्गदर्शन",
      nutrition: "खाद एवं पोषण",
      pestMonitoring: "कीट व रोग निगरानी",
      importantActivities: ["महत्वपूर्ण कार्य"],
      disclaimer: "नोट: दी गई तारीखें केवल अनुमानित हैं। मौसम और किस्म के अनुसार बदलाव संभव है।",
      activeStage: "वर्तमान चरण",
      completedStage: "पूर्ण",
      upcomingStage: "आगामी चरण"
    },
    reminders: {
      title: "स्मार्ट फार्म रिमाइंडर",
      subtitle: "सिंचाई, खाद, छिड़काव और निरीक्षण के लिए कार्य अनुस्मारक",
      todayTasks: "आज के कार्य",
      upcomingTasks: "आगामी कार्य",
      allTasks: "सभी कार्य",
      addTask: "+ नया कार्य जोड़ें",
      taskName: "कार्य का नाम",
      category: "श्रेणी",
      date: "दिनांक",
      time: "समय",
      cropOrField: "फसल / खेत",
      notes: "टिप्पणी / निर्देश",
      completed: "पूर्ण",
      pending: "लंबित",
      deleteTask: "हटाएं",
      browserNotificationNote: "इस ऐप में इन-ऐप सूचनाएं और डैशबोर्ड अलर्ट सक्रिय हैं।",
      noTasksYet: "फिलहाल कोई लंबित कार्य नहीं है।"
    },
    earlyWarning: {
      title: "कीट एवं रोग पूर्व चेतावनी",
      subtitle: "मौसम और फसल चरण के आधार पर संभावित खतरों का आकलन",
      lowRisk: "कम जोखिम",
      mediumRisk: "मध्यम जोखिम",
      highRisk: "उच्च जोखिम",
      whyRiskExists: "यह जोखिम क्यों है?",
      symptomsToMonitor: "निगरानी योग्य लक्षण",
      preventiveAction: "निवारक उपाय",
      whenToScan: "पुनः स्कैन कब करें?",
      disclaimer: "सुरक्षा निर्देश: बिना स्पष्ट तस्वीर के किसी बीमारी की निश्चित पुष्टि नहीं की जा सकती। यह केवल प्रारंभिक निगरानी सलाह है।",
      scanNow: "कैमरे से स्कैन करें"
    },
    cropRecommendation: {
      title: "मुझे क्या उगाना चाहिए?",
      subtitle: "मिट्टी के pH, मौसम और जल उपलब्धता के अनुसार उपयुक्त फसलें",
      location: "स्थान / राज्य",
      soilPh: "मिट्टी का pH",
      waterAvailability: "जल उपलब्धता",
      season: "मौसम (ऋतु)",
      landSize: "भूमि का आकार (एकड़)",
      irrigationType: "सिंचाई साधन",
      findCrops: "उपयुक्त फसलें खोजें",
      recommendedCrops: "अनुशंसित फसलें",
      matchScore: "अनुकूलता स्कोर",
      growingPeriod: "फसल अवधि",
      waterRequirement: "जल आवश्यकता",
      marketPotential: "बाजार संभावना",
      mainRisks: "मुख्य जोखिम",
      keyTips: "प्रबंधन सुझाव",
      approxNotice: "बाजार की जानकारी केवल मौसमी अनुमान है। वास्तविक मंडी भाव सत्यापित करें।"
    },
    market: {
      title: "बाजार भाव एवं MSP",
      subtitle: "सरकारी न्यूनतम समर्थन मूल्य (MSP 2024-25) और बिक्री सलाह",
      selectCrop: "फसल चुनें",
      selectMarket: "मंडी / बाजार चुनें",
      liveDataUnavailableTitle: "लाइव मंडी डेटा फिलहाल उपलब्ध नहीं है",
      liveDataUnavailableDesc: "आधिकारिक सरकारी एमएसपी दरें और गुणवत्ता मानक नीचे दिए गए हैं।",
      officialMspTitle: "सरकारी न्यूनतम समर्थन मूल्य (MSP)",
      category: "श्रेणी",
      qualityStandards: "गुणवत्ता मानक (FAQ)",
      sellingStrategy: "बिक्री रणनीति",
      storageAdvice: "भंडारण सुझाव",
      enamNotice: "e-NAM पोर्टल के माध्यम से पंजीकृत मंडियों में उचित मूल्य प्राप्त करें।"
    },
    schemes: {
      title: "सरकारी कृषि योजनाएं",
      subtitle: "किसानों के लिए सत्यापित केंद्रीय एवं राज्य योजनाएं",
      filterState: "राज्य",
      filterCategory: "किसान श्रेणी",
      filterActivity: "योजना का प्रकार",
      purpose: "उद्देश्य",
      eligibility: "पात्रता",
      benefits: "लाभ",
      howToApply: "आवेदन कैसे करें",
      officialPortal: "आधिकारिक पोर्टल",
      disclaimer: "कृपया आवेदन करने से पहले आधिकारिक सरकारी पोर्टल पर वर्तमान नियमों की पुष्टि करें।",
      viewAll: "सभी योजनाएं"
    },
    advisor: {
      title: "अग्रि मित्र कृषि सलाहकार",
      subtitle: "अपनी फसलों और खेती से जुड़े सवाल पूछें",
      askPlaceholder: "अपनी फसल, बीमारी या खाद के बारे में पूछें...",
      askButton: "पूछें",
      suggestionPrompts: [
        "टमाटर की पत्तियां पीली क्यों पड़ रही हैं?",
        "धान में सिंचाई का सबसे सही समय क्या है?",
        "मिर्च में मरोड़िया रोग से बचाव के घरेलू उपाय क्या हैं?",
        "कपास में गुलाबी सुंडी से बचाव कैसे करें?",
        "मिट्टी की जांच रिपोर्ट के अनुसार खाद कैसे दें?"
      ],
      disclaimer: "कीटनाशक छिड़काव करते समय सुरक्षात्मक उपकरण पहनें और लेबल निर्देश पढ़ें।"
    }
  },

  // Fallback for English and other languages
  en: {
    farmHealth: {
      title: "AI Farm Health Score",
      subtitle: "Composite rating based on your crops, soil, water, and weather",
      overallScore: "Farm Health",
      excellent: "EXCELLENT",
      good: "GOOD",
      moderate: "MODERATE",
      needsAttention: "NEEDS ATTENTION",
      notEnoughData: "NOT ENOUGH DATA",
      howToImprove: "How Can I Improve My Score?",
      cropHealth: "Crop Health",
      soilHealth: "Soil Health",
      waterIrrigation: "Water & Irrigation",
      weatherRisk: "Weather Risk",
      pestRisk: "Pest & Disease Risk",
      nutrition: "Nutrition",
      points: "pts"
    },
    cropCalendar: {
      title: "Crop Calendar",
      subtitle: "Timeline from sowing to harvest with stage-by-stage guidance",
      selectCrop: "Select Crop",
      variety: "Variety",
      sowingDate: "Sowing Date",
      irrigationMethod: "Irrigation Method",
      timeline: "Growth Stages Timeline",
      duration: "Duration",
      irrigation: "Irrigation Guidance",
      nutrition: "Nutrition Guidance",
      pestMonitoring: "Pest / Disease Monitoring",
      importantActivities: ["Important Activities"],
      disclaimer: "DISCLAIMER: All dates and durations are approximate estimations. Actual dates vary with local weather, variety, and soil conditions.",
      activeStage: "Active Stage",
      completedStage: "Completed",
      upcomingStage: "Upcoming"
    },
    reminders: {
      title: "Smart Farm Reminders",
      subtitle: "Task schedules for irrigation, fertilizer, spraying, and monitoring",
      todayTasks: "Today's Tasks",
      upcomingTasks: "Upcoming Tasks",
      allTasks: "All Tasks",
      addTask: "+ Add Farm Task",
      taskName: "Task Name",
      category: "Category",
      date: "Date",
      time: "Time",
      cropOrField: "Crop / Field",
      notes: "Notes & Instructions",
      completed: "Completed",
      pending: "Pending",
      deleteTask: "Delete",
      browserNotificationNote: "In-app notifications and dashboard task alerts are active.",
      noTasksYet: "No pending tasks scheduled right now."
    },
    earlyWarning: {
      title: "Early Pest & Disease Warning",
      subtitle: "Predictive risk assessment based on growth stage and local weather",
      lowRisk: "LOW RISK",
      mediumRisk: "MEDIUM RISK",
      highRisk: "HIGH RISK",
      whyRiskExists: "Why This Risk Exists",
      symptomsToMonitor: "Symptoms To Monitor",
      preventiveAction: "Preventive Action",
      whenToScan: "When To Scan Again",
      disclaimer: "SAFETY ADVISORY: Potential risk indicator only. Do not assume definitive disease presence without image evidence.",
      scanNow: "Scan Crop With Camera"
    },
    cropRecommendation: {
      title: "What Should I Grow?",
      subtitle: "Agronomic matching based on soil pH, season, and water availability",
      location: "Location",
      soilPh: "Soil pH",
      waterAvailability: "Water Availability",
      season: "Season",
      landSize: "Land Size (Acres)",
      irrigationType: "Irrigation Method",
      findCrops: "Recommend Suitable Crops",
      recommendedCrops: "Recommended Crops",
      matchScore: "Suitability Score",
      growingPeriod: "Growing Period",
      waterRequirement: "Water Requirement",
      marketPotential: "Market Potential",
      mainRisks: "Main Risks",
      keyTips: "Key Management Tips",
      approxNotice: "Market information is based on seasonal historical trends. Real-time mandi prices should be verified before sowing."
    },
    market: {
      title: "Market Price Assistant & MSP",
      subtitle: "Official Government MSP benchmarks & harvest selling guidance",
      selectCrop: "Select Crop",
      selectMarket: "Select Market / Mandi",
      liveDataUnavailableTitle: "Live market data is currently unavailable",
      liveDataUnavailableDesc: "Official Government Minimum Support Price (MSP 2024-25) and advisory benchmarks are displayed below.",
      officialMspTitle: "Government MSP Benchmark (2024-25)",
      category: "Category",
      qualityStandards: "Quality Specifications (FAQ)",
      sellingStrategy: "Optimal Selling Window",
      storageAdvice: "Storage & Post-Harvest",
      enamNotice: "Leverage e-NAM national agriculture market portal to discover competitive bids."
    },
    schemes: {
      title: "Government Scheme Finder",
      subtitle: "Verified agricultural welfare schemes and subsidies for farmers",
      filterState: "State",
      filterCategory: "Farmer Category",
      filterActivity: "Farming Activity",
      purpose: "Purpose",
      eligibility: "Basic Eligibility",
      benefits: "Benefits",
      howToApply: "How To Apply",
      officialPortal: "Official Portal",
      disclaimer: "NOTICE: Verify current eligibility and application details on the official government portal.",
      viewAll: "All Schemes"
    },
    advisor: {
      title: "Ask Agri Mitra Farm Advisor",
      subtitle: "Conversational AI answers with actionable agricultural recommendations",
      askPlaceholder: "Ask about crop diseases, fertilizers, irrigation, or weather...",
      askButton: "Ask Advisor",
      suggestionPrompts: [
        "My tomato leaves are turning yellow, what could be the reason?",
        "When is the critical stage to irrigate paddy?",
        "What organic methods help prevent thrips in chilli?",
        "How do I recognize early Pink Bollworm in cotton?",
        "What fertilizer should I apply based on a neutral soil pH?"
      ],
      disclaimer: "Always read pesticide product labels and wear personal protective equipment before spraying."
    }
  },

  // Map other regional languages cleanly to English / Hindi / Telugu structures
  ta: {} as any,
  kn: {} as any,
  ml: {} as any,
  mr: {} as any,
  bn: {} as any,
  gu: {} as any,
  pa: {} as any
};

// Populate the rest of regional languages by defaulting to English with localized headings
const supportedOtherLangs: LanguageCode[] = ["ta", "kn", "ml", "mr", "bn", "gu", "pa"];
supportedOtherLangs.forEach((lang) => {
  FEATURES_I18N[lang] = {
    ...FEATURES_I18N.en,
    farmHealth: { ...FEATURES_I18N.en.farmHealth },
    cropCalendar: { ...FEATURES_I18N.en.cropCalendar },
    reminders: { ...FEATURES_I18N.en.reminders },
    earlyWarning: { ...FEATURES_I18N.en.earlyWarning },
    cropRecommendation: { ...FEATURES_I18N.en.cropRecommendation },
    market: { ...FEATURES_I18N.en.market },
    schemes: { ...FEATURES_I18N.en.schemes },
    advisor: { ...FEATURES_I18N.en.advisor }
  };
});
