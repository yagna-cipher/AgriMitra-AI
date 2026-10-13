import { DiagnosisResult, LanguageCode } from "../types";

const BASE_DEMO_CASES: Record<string, any> = {
  "demo-rice-bph": {
    id: "demo-rice-bph",
    timestamp: "Today at 09:30 AM",
    cropIdentified: {
      te: "వరి (Paddy / Rice)",
      hi: "धान / चावल (Paddy / Rice)",
      ta: "நெல் (Paddy / Rice)",
      kn: "ಭತ್ತ (Paddy / Rice)",
      ml: "നെല്ല് (Paddy / Rice)",
      mr: "भात / धान (Paddy / Rice)",
      bn: "ধান (Paddy / Rice)",
      gu: "ડાંગર (Paddy / Rice)",
      pa: "ਝੋਨਾ (Paddy / Rice)",
      en: "Paddy / Rice"
    },
    cropVariety: "BPT 5204 (Samba Mahsuri)",
    growthStage: "Tillering / Panicle Initiation",
    problemDetected: {
      te: "సుడిదోమ (Brown Planthopper - BPH)",
      hi: "भूरा फुदका (Brown Planthopper - BPH)",
      ta: "பழுப்பு வெட்டுக்கிளி (BPH)",
      kn: "ಕಂದು ಜಿಗಿಹುಳು (BPH)",
      ml: "തവിട്ടു ചാഴി (BPH)",
      mr: "तांबडे तुडतुडे (BPH)",
      bn: "বাদামি ঘাসফড়িং (BPH)",
      gu: "કથ્થઈ તડતડિયા (BPH)",
      pa: "ਭੂਰਾ ਟਿੱਡਾ (BPH)",
      en: "Brown Planthopper (BPH)"
    },
    problemType: "pest",
    confidence: {
      level: "high",
      scorePercent: 94,
      reason: {
        te: "వరి దుబ్బుల మొదళ్ళ వద్ద సుడిదోమల గుంపులు మరియు ఆకులు సుడులు తిరిగి ఎండుతున్న లక్షణాలు స్పష్టంగా కనిపించాయి.",
        hi: "पौधों के आधार पर भूरे फुदके और गोलाकार सूखते हुए धब्बों (हॉपर बर्न) की स्पष्ट उपस्थिति।",
        en: "Clear presence of brown hopper nymphs and adults clustered at the base of tillers with characteristic hopper burn drying symptoms."
      }
    },
    isUrgentAlert: true,
    urgentAlertDetails: {
      title: {
        te: "🚨 అత్యవసర పంట హెచ్చరిక: వరిలో సుడిదోమ వ్యాప్తి",
        hi: "🚨 आपातकालीन फसल चेतावनी: धान में भूरा फुदका प्रकोप",
        en: "🚨 URGENT CROP ALERT: Brown Planthopper (BPH) Outbreak"
      },
      dangerReason: {
        te: "సుడిదోమలు వరి దుబ్బుల మొదలు నుంచి రసాన్ని పీల్చడం వల్ల పంట 48-72 గంటల్లో సుడులు తిరిగి ఎండిపోయి కుప్పకూలిపోతుంది (హాప్పర్ బర్న్). అధిక యూరియా మరియు నిల్వ నీరు దీనికి ప్రధాన కారణం.",
        hi: "भूरा फुदका पौधे के तने के आधार से रस चूसता है, जिससे 48-72 घंटों के भीतर पूरा खेत गोलाकार सूख जाता है (हॉपर बर्न)। अधिक यूरिया और रुका हुआ पानी इसे बढ़ाता है।",
        en: "BPH multiplies rapidly in humid, dense fields with excessive nitrogen. It sucks plant sap directly from the stem base, causing entire patches to wilt, dry, and collapse in a circular pattern ('hopper burn') within 48-72 hours."
      },
      emergencyActions: {
        te: [
          "పొలంలో నిల్వ ఉన్న నీటిని వెంటనే బయటకు తీసివేయండి (డ్రైన్ చేయండి). 3-4 రోజులు ఆరబెట్టండి.",
          "పైరు మధ్యలో ప్రతి 2-3 మీటర్లకు 30 సెం.మీ వెడల్పుతో బాటలు (పాదులు) తీసి గాలి, వెలుతురు మొదళ్ళకు తగిలేలా చేయండి.",
          "మందు పిచికారీని కేవలం వరి మొదళ్ళపై మాత్రమే పడేలా కోన్ నాజిల్ ద్వారా పిచికారీ చేయండి."
        ],
        hi: [
          "खेत से तुरंत पानी निकाल दें (खेत को 3-4 दिन सूखा रखें)।",
          "खेत में हर 2-3 मीटर पर हवा और धूप के लिए 30 सेमी के रास्ते (गलियारे) बनाएं।",
          "दवा का छिड़काव केवल पौधों के तने के आधार पर करें, ऊपर पत्तियों पर नहीं।"
        ],
        en: [
          "Drain standing water from the field immediately (alternate wetting and drying for 3-4 days).",
          "Open 30 cm alleyways (pathways) every 2 meters to allow sunlight and aeration into the base canopy.",
          "Direct any foliar spray specifically to the plant base, not the upper leaves."
        ]
      },
      whatNotToDo: {
        te: [
          "సింథటిక్ పైరెథ్రాయిడ్ (సైపర్‌మెథ్రిన్, డెల్టామెథ్రిన్ మొదలైనవి) మందులు అస్సలు వాడకండి. ఇవి మిత్ర పురుగులను చంపి సుడిదోమను మరింత పెంచుతాయి.",
          "ప్రస్తుతం పైపాటుగా యూరియా ఎరువును అస్సలు వేయకండి."
        ],
        hi: [
          "सिंथेटिक पाइरेथ्रोइड कीटनाशक (साइपरमेथ्रिन आदि) बिल्कुल न डालें, इससे मित्र कीट मरते हैं और फुदके तेजी से बढ़ते हैं।",
          "इस समय यूरिया खाद का छिड़काव या प्रयोग बिल्कुल बंद कर दें।"
        ],
        en: [
          "DO NOT apply synthetic pyrethroids (e.g. Cypermethrin, Deltamethrin) as they kill natural predators like spiders and trigger massive BPH resurgence.",
          "DO NOT apply excess Urea fertilizer right now."
        ]
      }
    },
    visibleSymptoms: {
      te: "పొలంలో వలయాకారంలో వరి పైరు ఎండిపోవడం (సుడులు తిరగడం); ఆకులు పసుపు రంగులోకి మారడం; మొదళ్ళ వద్ద రసం పీల్చిన గోధుమ రంగు గుర్తులు; నీటి మట్టానికి దగ్గరగా చిన్న చిన్న గోధుమ రంగు పురుగులు కనిపించడం.",
      hi: "खेत में गोलाकार रूप में पौधों का सूखना; पत्तियों का पीला पड़ना; तने के निचले हिस्से पर भूरे रंग के छोटे कीटों का झुंड दिखना।",
      en: "Circular drying patches of rice plants starting from center; yellowing leaves; brownish water-soaked feeding punctures at plant base; clusters of tiny brownish-black winged and wingless insects at the water line."
    },
    likelyCause: {
      te: "అధిక తేమ, ఎక్కువ యూరియా వాడకం, పొలంలో ఎల్లప్పుడూ నిల్వ ఉండే నీరు, మరియు గాలి వెలుతురు చొరబడని విధంగా దగ్గర దగ్గరగా నాటడం.",
      hi: "अधिक नमी, अत्यधिक यूरिया का उपयोग, खेत में लगातार पानी भरा रहना और पौधों के बीच हवा-धूप की कमी।",
      en: "High relative humidity, excessive nitrogen fertilizer application, continuous stagnation of standing water, and closely spaced transplanting without aeration alleys."
    },
    immediateActions: {
      te: [
        "పొలంలోని నీటిని 3-4 రోజుల పాటు పూర్తిగా తీసివేసి నేల ఆరేలా చేయండి.",
        "ప్రతి 2-3 మీటర్లకు ఒకసారి పైరును పక్కకు జరిపి బాటలు (ఎయిర్ అల్లేస్) ఏర్పాటు చేయండి.",
        "పైపాటుగా యూరియా వేయడం వెంటనే ఆపండి. మొదళ్ళను పరిశీలించి ఉధృతి ఉంటేనే సిఫార్సు చేసిన మందు పిచికారీ చేయండి.",
        "పిచికారీ చేసేటప్పుడు నాజిల్ కిందకు పెట్టి మొదళ్ళపై మందు పడేలా చూడండి."
      ],
      hi: [
        "खेत से पानी निकालकर 3-4 दिन खेत को सूखने दें।",
        "खेत में हवा और धूप के लिए 2-3 मीटर की दूरी पर रास्ते बनाएं।",
        "यूरिया डालना तुरंत बंद करें।",
        "दवा का छिड़काव सीधे तने के आधार पर करें।"
      ],
      en: [
        "Drain water from the field for 3-4 days to expose hopper nymphs to predators and dry microclimate.",
        "Form 'alleys' (paayilu) every 2 to 3 meters by bending aside rice rows to bring sunlight to the base.",
        "Inspect 20 random hills across the field; if >15-20 hoppers per hill are found, initiate base spray.",
        "Cease all top-dressing of Urea immediately."
      ]
    },
    actionPlan: {
      rightNow: {
        immediate: {
          te: [
            "పొలంలో నిల్వ ఉన్న నీటిని వెంటనే తీసివేసి 3-4 రోజులు ఆరబెట్టండి.",
            "మొక్కల మొదళ్ళకు గాలి తగిలేలా బాటలు తీయండి.",
            "పొలంలో 10 వేర్వేరు చోట్ల దుబ్బులను కదిలించి సుడిదోమల సంఖ్యను లెక్కించండి."
          ],
          hi: [
            "खेत से तुरंत पानी निकालें और 3-4 दिन सूखा रखें।",
            "खेत में गलियारे बनाकर तनों तक हवा-धूप पहुंचाएं।",
            "10 अलग-अलग स्थानों पर तनों पर फुदकों की संख्या गिनें।"
          ],
          en: [
            "Drain water from the field for 3-4 days immediately.",
            "Open walking alleys to aerate the crop base.",
            "Count hopper population at hill base in 10 different field spots."
          ]
        },
        avoid: {
          te: [
            "సైపర్‌మెథ్రిన్ లేదా ఇతర పైరెథ్రాయిడ్ మందులు వాడకండి.",
            "పై ఆకులపై మాత్రమే మందు చల్లకండి - మందు తప్పనిసరిగా మొదళ్ళకు చేరాలి."
          ],
          hi: [
            "सिंथेटिक पाइरेथ्रोइड कीटनाशकों का प्रयोग न करें।",
            "सिर्फ ऊपर की पत्तियों पर छिड़काव न करें, दवा तने तक पहुंचनी चाहिए।"
          ],
          en: [
            "Avoid synthetic pyrethroid chemicals (causes resurgence).",
            "Avoid spraying top foliage only—spray must reach the bottom 10 cm."
          ]
        },
        checkParts: {
          te: ["నీటి మట్టానికి 2-5 సెం.మీ ఎత్తులో ఉన్న మొదళ్ళు", "కింది ఆకుల వెనుక భాగం"],
          hi: ["पानी की सतह से 2-5 सेमी ऊपर का तना", "निचली पत्तियों की निचली सतह"],
          en: ["Base of tillers 2-5 cm above water level", "Underside of lower leaves"]
        }
      },
      next24Hours: {
        te: [
          "మిత్ర పురుగులైన సాలెపురుగులు మరియు మిరిడ్ బగ్స్ సంఖ్యను గమనించండి.",
          "సుడిదోమ తీవ్రత ఎక్కువగా ఉంటే పిచికారీకి స్ప్రేయర్ సిద్ధం చేసుకోండి."
        ],
        hi: [
          "खेत में मकड़ियों जैसे मित्र कीटों की स्थिति देखें।",
          "यदि फुदके अधिक हों तो तने पर छिड़काव हेतु दवा तैयार करें।"
        ],
        en: [
          "Monitor spider and mirid bug predator populations.",
          "Prepare sprayer with a cone nozzle pointed downwards to reach the base of tillers if threshold is breached."
        ]
      },
      next7Days: {
        te: [
          "తడి-ఆరి పద్ధతిలో (AWD) మాత్రమే నీరు అందించండి.",
          "కోత వరకు ప్రతి 3 రోజులకు ఒకసారి సుడిదోమ ఉనికిని తనిఖీ చేయండి."
        ],
        hi: [
          "वैकल्पिक गीला और सूखा (AWD) सिंचाई पद्धति अपनाएं।",
          "कटाई तक हर 3 दिन में कीट की स्थिति जांचें।"
        ],
        en: [
          "Practice alternate wetting and drying (AWD) irrigation.",
          "Re-evaluate pest density every 3 days until harvest."
        ]
      },
      whenToSeekExpert: {
        te: "నీరు తీసివేసి పిచికారీ చేసినప్పటికీ సుడులు పెరిగి పంట ఎండిపోతుంటే వెంటనే మీ మండల వ్యవసాయ అధికారి (MAO) లేదా కృషి విజ్ఞాన కేంద్రాన్ని (KVK) సంప్రదించండి.",
        hi: "पानी निकालने और दवा छिड़कने के बाद भी यदि फसल सूख रही हो, तो तुरंत कृषि अधिकारी या केवीके से संपर्क करें।",
        en: "If hopper burn patches continue spreading after drainage and targeted spray, contact your Mandal Agriculture Officer or KVK immediately."
      }
    },
    treatment: {
      approach: {
        te: "సమగ్ర సస్యరక్షణ (IPM): పొలంలో బాటలు తీయడం, సహజ మిత్ర పురుగులను రక్షించడం, మరియు ఆర్థిక నష్ట పరిమితి దాటినప్పుడు మాత్రమే మొదళ్ళపై రసాయన పిచికారీ చేయడం.",
        hi: "एकीकृत कीट प्रबंधन (IPM): गलियारे बनाना, मित्र कीटों का संरक्षण और आवश्यकता पड़ने पर ही तने पर सही दवा का छिड़काव।",
        en: "Integrated Pest Management (IPM) with emphasis on cultural alley formation, biological conservation of wolf spiders, and base-directed active ingredient application only if economic threshold is exceeded."
      },
      biologicalOrOrganic: {
        te: [
          "సహజ మిత్ర పురుగులైన సాలెపురుగులను రక్షించండి.",
          "వేప నూనె (Neem Oil 10,000 ppm) లీటరు నీటికి 2-3 మి.లీ కలిపి మొదళ్ళపై పిచికారీ చేయండి."
        ],
        hi: [
          "खेत में मौजूद मकड़ियों और मित्र कीटों को बचाएं।",
          "नीम का तेल (10,000 ppm) 2-3 मिली प्रति लीटर पानी में मिलाकर तने पर छिड़कें।"
        ],
        en: [
          "Conserve natural wolf spiders (Lycosa pseudoannulata) and mirid bugs (Cyrtorhinus lividipennis).",
          "Neem oil 10,000 ppm @ 2-3 ml per liter water directed to the tiller base."
        ]
      },
      culturalOrMechanical: {
        te: [
          "నాట్లు వేసేటప్పుడే ప్రతి 2 మీటర్లకు 30 సెం.మీ బాటలు తీయండి.",
          "ఆరుతడి (తడి-ఆరి) పద్ధతిలో నీరు పెట్టండి.",
          "మొక్క దృఢత్వాన్ని పెంచడానికి సిఫార్సు చేసిన పొటాష్ (MOP) ఎరువును వేయండి."
        ],
        hi: [
          "बुआई/रोपाई के समय 2 मीटर पर 30 सेमी गलियारे बनाएं।",
          "खेत में पानी लगातार न रोकें, सूखा-गीला चक्र रखें।",
          "तने को मजबूत करने हेतु पोटाश का उचित प्रयोग करें।"
        ],
        en: [
          "Create 30 cm alleys every 2 m during planting.",
          "Alternate Wetting and Drying (AWD) irrigation.",
          "Balanced potassium application (MOP) to strengthen stem culms."
        ]
      },
      chemicalDisclaimer: {
        te: "మందుల వాడకానికి ముందు డబ్బాపై ఉన్న లేబుల్ మరియు వ్యవసాయ శాఖ మార్గదర్శకాలను తప్పనిసరిగా పాటించండి.",
        hi: "दवा के प्रयोग से पहले लेबल पर दिए गए निर्देशों का पालन करें।",
        en: "Verify current state registration and always follow approved product label directions."
      },
      chemicalTreatment: {
        te: "పైమెట్రోజైన్ (Pymetrozine 50% WDG) ఎకరానికి 120 గ్రాములు లేదా ట్రైఫ్లూమెజోపైరిమ్ (Triflumezopyrim 10% SC) ఎకరానికి 94 మి.లీ 200 లీటర్ల నీటిలో కలిపి మొదళ్ళపై పిచికారీ చేయండి.",
        hi: "पाइमेट्रोजिन 50% WDG 120 ग्राम/एकड़ या ट्राइफ्लूमेज़ोपाइरिम 10% SC 94 मिली/एकड़ को 200 लीटर पानी में मिलाकर केवल तने पर छिड़कें।",
        en: "Triflumuron 20% + Ethiprole 40% WG OR Pymetrozine 50% WDG @ 120g/acre OR Triflumezopyrim 10% SC @ 94ml/acre directed strictly to plant base with high volume spray."
      },
      ppeAndSafetyWarnings: {
        te: [
          "రబ్బరు చేతి తొడుగులు, ముఖానికి మాస్క్ మరియు కళ్ళద్దాలు ధరించండి.",
          "గాలి వీచే దిశకు అనుకూలంగా ఉదయం లేదా సాయంత్రం వేళల్లో పిచికారీ చేయండి.",
          "చేపల చెరువులు మరియు తాగునీటి కాలువలకు దూరంగా ఉంచండి."
        ],
        hi: [
          "मास्क, दस्ताने और चश्मा पहनकर ही छिड़काव करें।",
          "हवा की दिशा में सुबह या शाम के समय छिड़काव करें।",
          "तालाब और जल स्रोतों से दूर रखें।"
        ],
        en: [
          "Wear rubber gloves, eye goggles, and protective mask.",
          "Spray early morning or late afternoon with wind on your back.",
          "Keep away from fish ponds and domestic water channels."
        ]
      },
      preHarvestInterval: {
        te: "కోతకు కనీసం 19-21 రోజుల ముందు పిచికారీ ఆపండి (PHI).",
        hi: "कटाई से कम से कम 19-21 दिन पहले छिड़काव बंद करें।",
        en: "Observe 19-21 days Pre-Harvest Interval (PHI) before grain harvest."
      }
    },
    waterAssessment: {
      te: "పొలంలో నిరంతరం 5 సెం.మీ కంటే ఎక్కువ నీరు నిల్వ ఉండటం సుడిదోమలు త్వరగా వృద్ధి చెందడానికి కారణమవుతుంది. వెంటనే నీటిని తీసివేయడం చాలా అవసరం.",
      hi: "खेत में लगातार पानी भरा रहना फुदकों के बढ़ने का मुख्य कारण है। पानी की उचित निकासी तुरंत आवश्यक है।",
      en: "Continuous stagnant water (>5 cm) provides ideal microclimate for BPH multiplication. Immediate field drainage is necessary."
    },
    nutritionAssessment: {
      te: "అధిక యూరియా వాడకం వల్ల మొక్కలు మృదువుగా మారి పురుగుల దాడి పెరుగుతుంది. మొక్కల కణజాలం గట్టిపడటానికి పొటాష్ (MOP) ఎరువును సమతుల్యంగా వేయండి.",
      hi: "अत्यधिक यूरिया के कारण पौधे कोमल हो जाते हैं जिससे कीट जल्दी हमला करते हैं। पोटाश का प्रयोग कर पौधों को मजबूत बनाएं।",
      en: "Excessive Urea produces succulent vegetative tissue favored by sap-sucking hoppers. Increase Potassium (MOP) to harden cell walls."
    },
    prevention: {
      te: [
        "సుడిదోమను తట్టుకునే రకాలను (ఎంటీయూ 1010, ఎంటీయూ 1061, కాటన్‌దొర సన్నాలు వంటివి) సాగు చేయండి.",
        "వరుసల మధ్య సరైన దూరం (20 x 15 సెం.మీ) పాటించండి.",
        "ప్రారంభ దశలో అనవసరంగా రసాయన మందులు చల్లకండి."
      ],
      hi: [
        "सहनशील किस्मों का चयन करें।",
        "उचित दूरी (20 x 15 सेमी) पर रोपाई करें।",
        "शुरुआती अवस्था में अंधाधुंध कीटनाशक न डालें।"
      ],
      en: [
        "Use resistant/tolerant varieties (like MTU 1010, MTU 1061, Cottondora Sannalu).",
        "Adopt wider spacing (20 x 15 cm) and alleyways.",
        "Avoid blanket calendar sprays early in the season."
      ]
    },
    followUpQuestions: {
      te: [
        "నాట్లు వేసి ఎన్ని రోజులు అయ్యింది?",
        "ప్రస్తుతం పొలంలో నిల్వ నీరు ఉందా?",
        "ఇటీవల ఏదైనా సైపర్‌మెథ్రిన్ మందు పిచికారీ చేశారా?"
      ],
      hi: [
        "फसल कितने दिन की है?",
        "क्या खेत में अभी पानी भरा हुआ है?",
        "क्या हाल ही में कोई कीटनाशक डाला था?"
      ],
      en: [
        "How many days ago was the crop transplanted or sown?",
        "Is there currently standing water in the field?",
        "Have you applied any pyrethroid pesticide recently?"
      ]
    },
    expertGuidanceNote: {
      te: "కిసాన్ కాల్ సెంటర్: 1800-180-1551. స్థానిక కృషి విజ్ఞాన కేంద్రం (KVK) వ్యవసాయ శాస్త్రవేత్తల సలహా తీసుకోండి.",
      hi: "किसान कॉल सेंटर: 1800-180-1551। कृषि विज्ञान केंद्र (KVK) के वैज्ञानिकों से सलाह लें।",
      en: "Kisan Call Center: 1800-180-1551. Local Krishi Vigyan Kendra (KVK) rice scientist verification recommended."
    },
    localizedSummary: {
      te: "మీ వరి పంటలో సుడిదోమ (Brown Planthopper) లక్షణాలు కనిపించాయి. వెంటనే పొలంలో నిల్వ ఉన్న నీటిని బయటకు తీసివేయండి (డ్రైన్ చేయండి). పైరు మధ్యలో ప్రతి 2-3 మీటర్లకు బాటలు తీయండి. మందు పిచికారీ చేయాల్సి వస్తే కేవలం దుబ్బుల మొదళ్ళపై మాత్రమే పడేలా చూడండి.",
      hi: "आपकी धान की फसल में भूरा फुदका (BPH) का प्रकोप देखा गया है। कृपया खेत से तुरंत पानी निकालें, हवा के लिए रास्ते बनाएं और आवश्यकता होने पर केवल तने पर ही दवा का छिड़काव करें।",
      en: "Your paddy crop shows clear symptoms of Brown Planthopper (BPH). Drain standing water immediately for 3-4 days, open walking alleys for sunlight, and direct any recommended spray strictly at the tiller base."
    },
    imageUrls: [
      "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80"
    ],
    timelineStage: "Day 1",
    timelineNotes: {
      te: "మొదటి రోజు: సుడిదోమల గుంపులు గమనించబడ్డాయి. నీటి తొలగింపు ప్రారంభించబడింది.",
      hi: "पहला दिन: फुदकों का प्रकोप देखा गया। पानी की निकासी शुरू की गई।",
      en: "Day 1: Hopper clusters noticed. Immediate drainage initiated."
    }
  },

  "demo-chilli-curl": {
    id: "demo-chilli-curl",
    timestamp: "Yesterday at 04:15 PM",
    cropIdentified: {
      te: "మిర్చి (Chilli / Mirchi)",
      hi: "मिर्च (Chilli)",
      ta: "மிளகாய் (Chilli)",
      kn: "ಮೆಣಸಿನಕಾಯಿ (Chilli)",
      ml: "മുളക് (Chilli)",
      mr: "मिरची (Chilli)",
      bn: "লঙ্কা (Chilli)",
      gu: "મરચાં (Chilli)",
      pa: "ਮਿਰਚ (Chilli)",
      en: "Chilli / Hot Pepper"
    },
    cropVariety: "Teja / Guntur Sannam",
    growthStage: "Flowering & Fruit Setting",
    problemDetected: {
      te: "మిర్చి ముడత తెగులు / బొబ్బర తెగులు (Chilli Leaf Curl Virus & Thrips / Mites Complex)",
      hi: "मिर्च का पर्ण कुंचन रोग एवं थ्रिप्स (Leaf Curl & Thrips)",
      ta: "இலை சுருள் நோய் (Leaf Curl Virus)",
      kn: "ಎಲೆ ಮುದುರು ರೋಗ (Leaf Curl)",
      ml: "ഇലച്ചുരുൾ രോഗം (Leaf Curl)",
      mr: "मिरचीवरील चुरडा-मुरडा रोग (Leaf Curl)",
      bn: "লঙ্কার পাতা কোঁকড়ানো রোগ (Leaf Curl)",
      gu: "મરચીમાં કોકડવા / પાન સંકોચન (Leaf Curl)",
      pa: "ਮਿਰਚ ਦਾ ਪੱਤਾ ਮਰੋੜ ਰੋਗ (Leaf Curl)",
      en: "Chilli Leaf Curl & Sucking Pest Complex"
    },
    problemType: "disease_viral",
    confidence: {
      level: "high",
      scorePercent: 91,
      reason: {
        te: "ఆకులు పైకి పడవ ఆకారంలో ముడుచుకుపోవడం (తామర పురుగులు), పూత రాలడం మరియు ఎదుగుదల తగ్గడం వంటి లక్షణాలు స్పష్టంగా ఉన్నాయి.",
        hi: "पत्तियों का ऊपर की ओर मुड़ना, फूल गिरना और पौधों का बौना होना स्पष्ट रूप से दिखाई दे रहा है।",
        en: "Classic upward boat-shaped leaf curling indicating thrips vector pressure combined with Gemini virus symptoms."
      }
    },
    isUrgentAlert: false,
    urgentAlertDetails: null,
    visibleSymptoms: {
      te: "ఆకులు పైకి దోనె (పడవ) ఆకారంలో ముడుచుకుపోవడం; చిగురు ఆకులు చిన్నవిగా మారడం; పూత మరియు పిందె రాలిపోవడం; మొక్క ఎదుగుదల ఆగిపోయి గిడసబారడం.",
      hi: "पत्तियों का ऊपर नाव के आकार में मुड़ना; नई पत्तियों का छोटा होना; फूल व कलियों का गिरना; पौधे की वृद्धि रुकना।",
      en: "Upward curling of leaves in boat shape (thrips injury), puckering, stunted apical growth, flower dropping, and crinkled leaf margins."
    },
    likelyCause: {
      te: "రసం పీల్చే తామర పురుగులు (Thrips), నల్లి (Mites) మరియు తెల్లదోమ (Whiteflies) వైరస్ వ్యాప్తిని కలిగించడం; పొడి వాతావరణం.",
      hi: "रस चूसक कीट जैसे थ्रिप्स, माइट्स और सफेद मक्खी द्वारा वायरस फैलाना; शुष्क मौसम।",
      en: "Feeding damage from sucking pests (Scirtothrips dorsalis, Polyphagotarsonemus latus) acting as vectors transmitting Chilli Leaf Curl Virus."
    },
    immediateActions: {
      te: [
        "ఎకరానికి 20-25 పసుపు మరియు నీలి రంగు జిగురు అట్టలను (Sticky Traps) పైరు ఎత్తులో అమర్చండి.",
        "వేప నూనె 10,000 ppm లీటరు నీటికి 2-3 మి.లీ కలిపి పిచికారీ చేయండి.",
        "తీవ్రంగా రోగగ్రస్తమైన మొక్కలను పీకి నాశనం చేయండి.",
        "నేలలో తగినంత తేమ ఉండేలా క్రమం తప్పకుండా నీరు అందించండి."
      ],
      hi: [
        "खेत में प्रति एकड़ 20-25 पीले और नीले चिपचिपे ट्रैप लगाएं।",
        "नीम तेल (10,000 ppm) 2-3 मिली/लीटर पानी में मिलाकर छिड़कें।",
        "रोगग्रस्त पौधों को उखाड़कर नष्ट करें।",
        "खेत में पर्याप्त नमी बनाए रखें।"
      ],
      en: [
        "Install 20-25 yellow and blue sticky traps per acre at canopy level.",
        "Spray Neem seed kernel extract (NSKE 5%) or Neem oil 10,000 ppm.",
        "Rogue out severely virus-infected stunted plants and burn/bury them.",
        "Ensure uniform soil moisture to reduce thrips multiplier stress."
      ]
    },
    actionPlan: {
      rightNow: {
        immediate: {
          te: [
            "ఎకరానికి 20 పసుపు, 20 నీలిరంగు జిగురు అట్టలు పెట్టండి.",
            "వైరస్ సోకిన మొక్కలను గుర్తించి తీసివేయండి."
          ],
          hi: [
            "20 पीले और 20 नीले चिपचिपे ट्रैप लगाएं।",
            "अधिक ग्रसित पौधों को खेत से बाहर निकालें।"
          ],
          en: [
            "Erect 20 yellow and blue sticky traps across the plot.",
            "Identify and rogue out completely stunted viral plants."
          ]
        },
        avoid: {
          te: [
            "ఒకే రకమైన రసాయనాన్ని పదే పదే పిచికారీ చేయకండి.",
            "తీవ్రమైన ఎండ వేళల్లో పిచికారీ చేయకండి."
          ],
          hi: [
            "एक ही कीटनाशक का बार-बार छिड़काव न करें।",
            "कड़ी धूप में छिड़काव से बचें।"
          ],
          en: [
            "Avoid repeated back-to-back sprays of same chemical family.",
            "Avoid midday spraying during high UV sunlight."
          ]
        },
        checkParts: {
          te: ["లేత చిగుర్లు మరియు పూత", "ఆకుల అడుగు భాగం"],
          hi: ["नई कलियां और फूल", "पत्ती की निचली सतह"],
          en: ["Young apical shoots", "Underside of tender leaves"]
        }
      },
      next24Hours: {
        te: [
          "జిగురు అట్టలపై చిక్కిన పురుగుల సంఖ్యను తనిఖీ చేయండి.",
          "అవసరమైతే ఆకుల అడుగున బాగా తడిచేలా బయో-పెస్టిసైడ్ పిచికారీ చేయండి."
        ],
        hi: [
          "ट्रैप पर चिपके कीटों की संख्या देखें।",
          "पत्तियों के नीचे अच्छी तरह जैविक छिड़काव करें।"
        ],
        en: [
          "Check trapped pest counts on colored sheets.",
          "Prepare underside spray application."
        ]
      },
      next7Days: {
        te: [
          "చిగుర్లలో కొత్త ఆకుల పెరుగుదలను గమనించండి.",
          "సూక్ష్మ పోషకాలైన జింక్ మరియు బోరాన్ పిచికారీ చేయండి."
        ],
        hi: [
          "नई पत्तियों के सुधार का निरीक्षण करें।",
          "जिंक और बोरॉन जैसे सूक्ष्म पोषक तत्वों का छिड़काव करें।"
        ],
        en: [
          "Observe recovery of new flush leaves.",
          "Apply micronutrient spray with Zinc and Boron to boost vitality."
        ]
      },
      whenToSeekExpert: {
        te: "పైరు మొత్తం ముడత పడి పూత రాలిపోతుంటే స్థానిక ఉద్యానవన అధికారిని లేదా కిసాన్ కాల్ సెంటర్‌ను సంప్రదించండి.",
        hi: "यदि समस्या पूरे खेत में फैल जाए तो उद्यान अधिकारी या किसान कॉल सेंटर से संपर्क करें।",
        en: "Contact Horticultural Officer or KVK if entire plot shows viral stunting with complete flower drop."
      }
    },
    treatment: {
      approach: {
        te: "సమగ్ర రసం పీల్చే పురుగుల యాజమాన్యం: జిగురు అట్టలు, వేప మందులు మరియు సరైన విరామంతో పిచికారీ.",
        hi: "एकीकृत कीट प्रबंधन: चिपचिपे ट्रैप, नीम उत्पाद और संतुलित पोषण।",
        en: "Vector management through colored sticky traps, botanical repellents, and safe rotational active ingredients."
      },
      biologicalOrOrganic: {
        te: [
          "వేప నూనె (Neem oil 10,000 ppm) 2-3 మి.లీ లేదా వేప గింజల కషాయం (NSKE 5%).",
          "వెర్టిసిల్లియం లెకానీ (Verticillium lecanii) లీటరుకు 5 గ్రాములు."
        ],
        hi: [
          "नीम तेल (10,000 ppm) 2-3 मिली प्रति लीटर पानी।",
          "वर्टिसिलियम लेकानी 5 ग्राम प्रति लीटर।"
        ],
        en: [
          "Neem oil 10,000 ppm @ 2-3 ml/L or NSKE 5%.",
          "Lecanicillium lecanii entomopathogenic fungal formulation @ 5g/L."
        ]
      },
      culturalOrMechanical: {
        te: [
          "పసుపు మరియు నీలి రంగు జిగురు అట్టలు ఏర్పాటు చేయడం.",
          "పొలం చుట్టూ జొన్న లేదా మొక్కజొన్నను సరిహద్దు పంటగా వేయడం."
        ],
        hi: [
          "पीले व नीले चिपचिपे कार्ड लगाएं।",
          "खेत के चारों ओर मक्का या ज्वार की रक्षक पट्टी लगाएं।"
        ],
        en: [
          "Yellow and blue sticky traps (25-30/acre).",
          "Sow barrier crops (4 rows of maize or sorghum around plot)."
        ]
      },
      chemicalDisclaimer: {
        te: "రసాయన మందులను నిర్దేశిత మోతాదులోనే వాడండి. లేబుల్ సూచనలను గమనించండి.",
        hi: "दवा का उचित मात्रा में ही प्रयोग करें।",
        en: "Always rotate chemical classes to prevent thrips resistance buildup."
      },
      chemicalTreatment: {
        te: "థయామెథోక్సామ్ (Thiamethoxam 25% WG) ఎకరానికి 80 గ్రాములు లేదా ఫిప్రోనిల్ (Fipronil 5% SC) లీటరుకు 2 మి.లీ లేదా స్పైనటోరమ్ (Spinetoram 11.7% SC) లీటరుకు 1 మి.లీ.",
        hi: "थियामेथोक्सम 25% WG 80 ग्राम/एकड़ या फिप्रोनिल 5% SC 2 मिली/लीटर या स्पाइनेटोरम 11.7% SC 1 मिली/लीटर।",
        en: "Diafenthiuron 50% WP @ 240g/acre OR Spinetoram 11.7% SC @ 180ml/acre OR Thiamethoxam 25% WG @ 80g/acre."
      },
      ppeAndSafetyWarnings: {
        te: [
          "మిర్చి తోటలో పిచికారీ సమయంలో కంటి రక్షణ అద్దాలు మరియు మాస్క్ ధరించండి.",
          "చేతులకు గ్లౌజులు వాడండి."
        ],
        hi: [
          "मास्क और दस्ताने पहनें।",
          "आंखों की सुरक्षा रखें।"
        ],
        en: [
          "Wear protective goggles and face mask.",
          "Wash thoroughly after spray."
        ]
      },
      preHarvestInterval: {
        te: "కాయలు కోయడానికి 7-10 రోజుల ముందు పిచికారీ ఆపండి.",
        hi: "तुड़ाई से 7-10 दिन पहले छिड़काव बंद करें।",
        en: "Observe 7 days PHI before green chilli picking."
      }
    },
    waterAssessment: {
      te: "నేలలో తేమ తక్కువగా ఉండటం వల్ల తామర పురుగుల ఉధృతి పెరుగుతుంది. డ్రిప్ ద్వారా సమతుల్యంగా నీరందించండి.",
      hi: "नमी की कमी से थ्रिप्स का प्रकोप बढ़ता है। नियमित हल्की सिंचाई करें।",
      en: "Water stress accelerates thrips and mite multiplication. Maintain consistent soil moisture."
    },
    nutritionAssessment: {
      te: "పైపాటుగా జింక్ (0.2%) మరియు బోరాన్ (0.1%) పిచికారీ చేయడం వల్ల మొక్కలు త్వరగా కోలుకుంటాయి.",
      hi: "जिंक और बोरॉन का छिड़काव फसल को नई शक्ति देता है।",
      en: "Foliar spray of Zinc Sulphate (0.2%) and Boron (0.1%) helps recover apical shoot vigor."
    },
    prevention: {
      te: [
        "నారుమడి దశ నుంచే రసం పీల్చే పురుగులను నివారించండి.",
        "పొలం చుట్టూ జొన్న రక్షక పంటను వేయండి.",
        "నాణ్యమైన వైరస్ తట్టుకునే విత్తనాలను ఎంచుకోండి."
      ],
      hi: [
        "नर्सरी अवस्था से ही कीट नियंत्रण रखें।",
        "खेत के चारों ओर अवरोधक फसलें लगाएं।"
      ],
      en: [
        "Protect nursery beds with 40-mesh insect net.",
        "Plant border rows of tall sorghum or maize."
      ]
    },
    followUpQuestions: {
      te: [
        "ఆకులు పైకి ముడుచుకున్నాయా లేక కిందికా?",
        "పూత రాలుతుందా?",
        "జిగురు అట్టలు అమర్చారా?"
      ],
      hi: [
        "पत्तियां ऊपर मुड़ रही हैं या नीचे?",
        "क्या फूल गिर रहे हैं?"
      ],
      en: [
        "Are leaves curling upward (thrips) or downward (mites)?",
        "Is there severe flower drop?"
      ]
    },
    expertGuidanceNote: {
      te: "కిసాన్ కాల్ సెంటర్: 1800-180-1551. స్థానిక ఉద్యానవన శాఖ అధికారులను సంప్రదించండి.",
      hi: "किसान कॉल सेंटर: 1800-180-1551।",
      en: "Kisan Call Center: 1800-180-1551. Horticultural field officer verification advised."
    },
    localizedSummary: {
      te: "మీ మిర్చి తోటలో తామర పురుగులు మరియు ముడత తెగులు లక్షణాలు ఉన్నాయి. వెంటనే పసుపు, నీలి రంగు జిగురు అట్టలు పెట్టండి. వేప నూనె లేదా సిఫార్సు చేసిన మందును ఆకుల అడుగుభాగం తడిచేలా పిచికారీ చేయండి.",
      hi: "आपकी मिर्च की फसल में थ्रिप्स और पत्ता मरोड़ रोग के लक्षण हैं। पीले व नीले चिपचिपे कार्ड लगाएं और नीम तेल अथवा अनुशंसित कीटनाशक का छिड़काव करें।",
      en: "Your chilli crop shows leaf curl symptoms primarily induced by thrips vector activity. Install yellow and blue sticky traps immediately and apply underside foliar spray."
    },
    imageUrls: [
      "https://images.unsplash.com/photo-1592417817098-8f3d6eb2250d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    timelineStage: "Day 1",
    timelineNotes: {
      te: "ముడత లక్షణాలు గమనించబడ్డాయి. జిగురు అట్టలు ఏర్పాటు చేయబడ్డాయి.",
      hi: "पत्ता मरोड़ के लक्षण दिखे। चिपचिपे कार्ड लगाए गए।",
      en: "Leaf curling noticed. Sticky traps placed."
    }
  }
};

export function getLocalizedDemoCases(lang: LanguageCode): DiagnosisResult[] {
  const targetLang = lang in ["te", "hi", "ta", "kn", "ml", "mr", "bn", "gu", "pa", "en"] ? lang : "en";

  return Object.values(BASE_DEMO_CASES).map((item) => {
    const getText = (field: any): string => {
      if (!field) return "";
      if (typeof field === "string") return field;
      return field[targetLang] || field["te"] || field["en"] || "";
    };

    const getArray = (field: any): string[] => {
      if (!field) return [];
      if (Array.isArray(field)) return field;
      return field[targetLang] || field["te"] || field["en"] || [];
    };

    return {
      id: item.id,
      timestamp: item.timestamp,
      cropIdentified: getText(item.cropIdentified),
      cropVariety: item.cropVariety,
      growthStage: item.growthStage,
      problemDetected: getText(item.problemDetected),
      problemType: item.problemType,
      confidence: {
        level: item.confidence.level,
        scorePercent: item.confidence.scorePercent,
        reason: getText(item.confidence.reason)
      },
      isUrgentAlert: item.isUrgentAlert,
      urgentAlertDetails: item.urgentAlertDetails
        ? {
            title: getText(item.urgentAlertDetails.title),
            dangerReason: getText(item.urgentAlertDetails.dangerReason),
            emergencyActions: getArray(item.urgentAlertDetails.emergencyActions),
            whatNotToDo: getArray(item.urgentAlertDetails.whatNotToDo)
          }
        : null,
      visibleSymptoms: getText(item.visibleSymptoms),
      likelyCause: getText(item.likelyCause),
      immediateActions: getArray(item.immediateActions),
      actionPlan: {
        rightNow: {
          immediate: getArray(item.actionPlan.rightNow.immediate),
          avoid: getArray(item.actionPlan.rightNow.avoid),
          checkParts: getArray(item.actionPlan.rightNow.checkParts)
        },
        next24Hours: getArray(item.actionPlan.next24Hours),
        next7Days: getArray(item.actionPlan.next7Days),
        whenToSeekExpert: getText(item.actionPlan.whenToSeekExpert)
      },
      treatment: {
        approach: getText(item.treatment.approach),
        biologicalOrOrganic: getArray(item.treatment.biologicalOrOrganic),
        culturalOrMechanical: getArray(item.treatment.culturalOrMechanical),
        chemicalDisclaimer: getText(item.treatment.chemicalDisclaimer),
        chemicalTreatment: getText(item.treatment.chemicalTreatment),
        ppeAndSafetyWarnings: getArray(item.treatment.ppeAndSafetyWarnings),
        preHarvestInterval: getText(item.treatment.preHarvestInterval)
      },
      waterAssessment: getText(item.waterAssessment),
      nutritionAssessment: getText(item.nutritionAssessment),
      prevention: getArray(item.prevention),
      followUpQuestions: getArray(item.followUpQuestions),
      expertGuidanceNote: getText(item.expertGuidanceNote),
      localizedSummary: getText(item.localizedSummary),
      imageUrls: item.imageUrls,
      timelineStage: item.timelineStage,
      timelineNotes: getText(item.timelineNotes)
    };
  });
}

export const DEMO_CASES: DiagnosisResult[] = getLocalizedDemoCases("te");
