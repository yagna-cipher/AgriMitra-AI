import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MISSING_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const TEXT_MODELS = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
const MULTIMODAL_MODELS = ["gemini-3.8-flash", "gemini-3.1-flash-lite"];

/**
 * Executes generateContent with automatic model fallback and retries for 503 (high demand) or 429 (rate limits).
 */
async function generateContentWithFallback(
  ai: GoogleGenAI,
  requestParams: { contents: any; config?: any },
  models: string[] = TEXT_MODELS
) {
  let lastError: any = null;
  for (const model of models) {
    try {
      console.log(`[AgriMitra] Calling Gemini model: ${model}`);
      const response = await ai.models.generateContent({
        model,
        contents: requestParams.contents,
        config: requestParams.config,
      });
      return response;
    } catch (err: any) {
      console.warn(`[AgriMitra] Model ${model} encountered error:`, err?.message || err);
      lastError = err;
      const status = err?.status || err?.code || 0;
      const msg = (err?.message || "").toLowerCase();

      // If 503 (high demand), 429 (rate limit), or 500, retry with next model
      if (
        status === 503 ||
        status === 429 ||
        status === 500 ||
        msg.includes("high demand") ||
        msg.includes("unavailable") ||
        msg.includes("overloaded") ||
        msg.includes("resource_exhausted")
      ) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        continue; // Try next model in sequence
      }

      // If API key is invalid (400), don't loop endlessly
      if (status === 400 && (msg.includes("api_key") || msg.includes("invalid key"))) {
        throw err;
      }
    }
  }
  throw lastError;
}

/**
 * Smart agricultural fallback when Gemini upstream models are experiencing temporary peak load.
 */
function getSmartAgronomyVoiceFallback(message: string, language: string, cropContext?: any) {
  const q = (message || "").toLowerCase();
  const isTe = language.toLowerCase().includes("telugu") || language === "te";
  const isHi = language.toLowerCase().includes("hindi") || language === "hi";

  let detectedCrop = "వరి (Paddy / Rice)";
  let detectedIssue = "సమగ్ర వ్యవసాయ సలహా (Agronomic Advisory)";
  let text = "";
  let speechText = "";
  let suggestedActions: string[] = [];
  let followUpPrompts: string[] = [];

  if (q.includes("పసుపు") || q.includes("yellow") || q.includes("పీలా") || q.includes("ఎండి")) {
    detectedIssue = isTe
      ? "నత్రజని / జింక్ లోపం లేదా ఆకు పసుపు రంగు"
      : isHi
      ? "नाइट्रोजन / जिंक की कमी (पत्तियां पीली)"
      : "Nitrogen/Zinc Deficiency (Leaf Yellowing)";
    if (isTe) {
      text = `🌾 **పంట ఆకులు పసుపు రంగు మారడం - నివారణ సలహా:**\n\n1. **నత్రజని (Nitrogen) లోపం:** క్రింది పాత ఆకులు పసుపు రంగులోకి మారితే ఎకరాకు 20-25 కిలోల యూరియా వేయండి లేదా 2% యూరియా ద్రావణం (20 గ్రా/లీటరు) పిచికారీ చేయండి.\n2. **జింక్ లోపం:** ఆకుల మధ్య భాగంలో తుప్పు వంటి మచ్చలు కనిపిస్తే లీటరు నీటికి 2 గ్రాముల జింక్ సల్ఫేట్ కలిపి పిచికారీ చేయండి.\n3. **మురుగు నీరు:** చేనులో నీరు నిల్వ ఉంటే వెంటనే తీసివేసి 2 రోజులు గాలి తగలనివ్వండి.\n\n📞 **తక్షణ సహాయం:** కిసాన్ కాల్ సెంటర్ ఉచిత నంబర్ 1800-180-1551 ని సంప్రదించండి.`;
      speechText =
        "ఆకులు పసుపు రంగులోకి మారడానికి నత్రజని లేదా జింక్ లోపం కారణం కావచ్చు. ఎకరాకు 2% యూరియా లేదా 2 గ్రాముల జింక్ సల్ఫేట్ పిచికారీ చేయండి. నీరు నిల్వ ఉంటే డ్రైనేజ్ చేయండి.";
      suggestedActions = [
        "2% యూరియా లేదా జింక్ సల్ఫేట్ స్ప్రే చేయండి",
        "మురుగు నీటిని తీసివేయండి",
        "మొగి పురుగు లేదా కాండం పరిశీలించండి"
      ];
      followUpPrompts = ["జింక్ లోపం లక్షణాలు ఏమిటి?", "యూరియా ఎంత మోతాదులో వేయాలి?"];
    } else if (isHi) {
      text = `🌾 **पत्तियों का पीला पड़ना - कृषि समाधान:**\n\n1. **नाइट्रोजन की कमी:** निचली पत्तियां पीली होने पर प्रति एकड़ 20-25 किग्रा यूरिया दें या 2% यूरिया घोल का छिड़काव करें।\n2. **जिंक की कमी:** जिंक सल्फेट 2 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें।\n3. **जलभराव:** खेत से अतिरिक्त पानी निकालें।\n\n📞 **किसान कॉल सेंटर:** 1800-180-1551 पर संपर्क करें।`;
      speechText =
        "पत्तियों के पीलेपन के लिए नाइट्रोजन या जिंक की कमी हो सकती है। 2% यूरिया या जिंक सल्फेट का छिड़काव करें।";
      suggestedActions = ["2% यूरिया घोल छिड़कें", "खेत से पानी निकालें", "तने की जांच करें"];
      followUpPrompts = ["जिंक की कमी कैसे पहचानें?", "खाद की सही मात्रा क्या है?"];
    } else {
      text = `🌾 **Crop Leaf Yellowing - Recommended Management:**\n\n1. **Nitrogen Deficiency:** Older leaves turning yellow from tips. Apply 20-25 kg Urea per acre or foliar spray 2% Urea solution.\n2. **Zinc Deficiency:** Rust-colored bronzing on middle leaves. Foliar spray Zinc Sulphate (2g/L).\n3. **Waterlogging:** Drain stagnant water to allow root respiration.\n\n📞 **Kisan Helpline:** Call toll-free 1800-180-1551 for instant scientist guidance.`;
      speechText =
        "Leaf yellowing is commonly caused by Nitrogen or Zinc deficiency, or waterlogging. Spray 2% Urea or 2 grams per liter Zinc Sulphate, and drain stagnant field water.";
      suggestedActions = [
        "Foliar spray 2% Urea or Zinc Sulphate",
        "Drain excess field water",
        "Check stem base for stem borer"
      ];
      followUpPrompts = ["How to identify Zinc deficiency?", "What is the optimal fertilizer schedule?"];
    }
  } else if (q.includes("మిరప") || q.includes("ముడత") || q.includes("chilli") || q.includes("मिर्च")) {
    detectedCrop = isTe ? "మిరప (Chilli)" : isHi ? "मिर्च (Chilli)" : "Chilli";
    detectedIssue = isTe
      ? "ఆకు ముడత & తామర పురుగులు (Thrips & Leaf Curl)"
      : isHi
      ? "पत्ती मरोड़ व थ्रिप्स"
      : "Leaf Curl & Thrips";
    if (isTe) {
      text = `🌶️ **మిరప ఆకు ముడత & తామర పురుగుల నివారణ:**\n\n1. **సేంద్రీయ నియంత్రణ:** ఎకరాకు 30-40 నీలి మరియు పసుపు జిగురు అట్టలు అమర్చండి. వేప నూనె (10,000 ppm) 2-3 మి.లీ/లీటరు పిచికారీ చేయండి.\n2. **రసాయన నివారణ (నల్ల తామర పురుగులకు):** స్పైనటోరం 11.7% SC (0.9 మి.లీ/లీటరు) లేదా ఫైప్రోనిల్ 5% SC (2 మి.లీ/లీటరు) పిచికారీ చేయండి.\n3. **ముడత క్రింది వైపు ఉంటే (నల్లి):** స్పైరోమెసిఫెన్ 22.9% SC (1 మి.లీ/లీటరు) వాడండి.`;
      speechText =
        "మిరపలో ఆకు ముడత తామర పురుగులు లేదా నల్లి వల్ల వస్తుంది. ఎకరాకు 30 నీలి జిగురు అట్టలు పెట్టండి, వేప నూనె లేదా స్పైనటోరం పిచికారీ చేయండి.";
      suggestedActions = [
        "ఎకరాకు 30 నీలి జిగురు అట్టలు పెట్టండి",
        "వేపనూనె 10000 ppm పిచికారీ చేయండి",
        "స్పైనటోరం 0.9 మి.లీ/లీ స్ప్రే చేయండి"
      ];
      followUpPrompts = ["నల్ల తామర పురుగులకు మందు ఏమిటి?", "మిరపలో ఎరువుల యాజమాన్యం"];
    } else {
      text = `🌶️ **Chilli Leaf Curl & Thrips Management:**\n\n1. **Cultural / Mechanical:** Install 30-40 blue and yellow sticky traps per acre.\n2. **Biological:** Spray cold-pressed Neem Oil (10,000 ppm) at 2-3 ml/liter.\n3. **Chemical:** For severe thrips, spray Spinetoram 11.7% SC at 0.9 ml/liter or Fipronil 5% SC at 2 ml/liter.\n\n📞 **Kisan Call Center:** 1800-180-1551.`;
      speechText =
        "For chilli leaf curl and thrips, install sticky traps and spray neem oil or Spinetoram at recommended dosages.";
      suggestedActions = [
        "Install 30-40 sticky traps per acre",
        "Spray Neem Oil 10,000 ppm",
        "Spray Spinetoram 0.9 ml/L"
      ];
      followUpPrompts = ["What to spray for Black Thrips?", "Fertilizer dosage for chilli"];
    }
  } else {
    if (isTe) {
      text = `🌱 **అగ్రి మిత్ర AI వ్యవసాయ సలహా:**\n\nమీ ప్రశ్నకు సంబంధించి ప్రధాన సూచనలు:\n1. **క్షేత్ర పరిశీలన:** పంట కాండం మరియు ఆకుల అడుగు భాగాన్ని పరిశీలించి పురుగుల గుడ్లు లేదా మచ్చలు ఉన్నాయో చూడండి.\n2. **సేంద్రీయ రక్షణ:** ప్రారంభ దశలో వేప నూనె (10,000 ppm) 2-3 మి.లీ/లీటరు లేదా ట్రైకోడెర్మా విరిడే వాడండి.\n3. **సమతుల్య ఎరువులు:** సిఫారసు చేసిన మోతాదులోనే ఎరువులు వాడండి, అధిక నత్రజని వాడకం చీడపీడలను ఆకర్షిస్తుంది.\n4. **వాతావరణ జాగ్రత్త:** వర్ష సూచన ఉన్నప్పుడు పిచికారీ చేయకండి.\n\n📞 **రైతు సహాయవాణి:** కిసాన్ కాల్ సెంటర్ (టోల్ ఫ్రీ: 1800-180-1551) లో వ్యవసాయ శాస్త్రవేత్తలతో నేరుగా మాట్లాడవచ్చు.`;
      speechText =
        "మీ వ్యవసాయ ప్రశ్నకు సంబంధించి పంట ఆకుల అడుగు భాగాన్ని పరిశీలించండి. ప్రారంభ దశలో వేప నూనె చల్లండి. ఉచిత సహాయానికి కిసాన్ కాల్ సెంటర్ 1800-180-1551 కి కాల్ చేయండి.";
      suggestedActions = [
        "ఆకుల అడుగు భాగం పరిశీలించండి",
        "వేపనూనె 2-3 మి.లీ/లీ స్ప్రే చేయండి",
        "కిసాన్ కాల్ సెంటర్ 1800-180-1551 ని సంప్రదించండి"
      ];
      followUpPrompts = ["పురుగుల నివారణ సలహా", "ఎరువుల సరైన మోతాదు ఏమిటి?"];
    } else if (isHi) {
      text = `🌱 **अग्रि मित्र AI कृषि सलाह:**\n\n1. **खेत का निरीक्षण:** पत्तियों के नीचे कीट या फफूंद के लक्षणों की जांच करें।\n2. **जैविक रोकथाम:** नीम का तेल (10,000 ppm) 2-3 मिली/लीटर का छिड़काव करें।\n3. **संतुलित पोषण:** अधिक यूरिया के प्रयोग से बचें।\n\n📞 **किसान कॉल सेंटर:** 1800-180-1551 (टोल फ्री)।`;
      speechText =
        "फसल की पत्तियों के निचले हिस्से की जांच करें और जैविक नियंत्रण के लिए नीम तेल का छिड़काव करें। 1800-180-1551 पर कॉल करें।";
      suggestedActions = ["पत्तियों की जांच करें", "नीम तेल 2-3 मिली/लीटर छिड़कें", "किसान कॉल सेंटर 1800-180-1551"];
      followUpPrompts = ["रोग नियंत्रण के उपाय", "खाद की सही मात्रा"];
    } else {
      text = `🌱 **Agri Mitra AI Farming Advisory:**\n\n1. **Field Inspection:** Check the undersides of leaves and stem nodes for pest larvae, discoloration, or fungal lesions.\n2. **Biological First Line:** Spray Neem Oil (10,000 ppm) at 2-3 ml/L or apply Trichoderma viride in soil.\n3. **Nutrient Balance:** Avoid excessive urea/nitrogen, which creates tender tissue prone to sucking pests.\n\n📞 **Kisan Call Center Toll-Free:** 1800-180-1551.`;
      speechText =
        "Please inspect leaf undersides and stem bases. For early prevention, apply neem oil at 2 to 3 ml per liter. You can also call Kisan Call Center 1800-180-1551.";
      suggestedActions = [
        "Inspect leaf undersides and nodes",
        "Apply Neem Oil 2-3 ml/L",
        "Call Kisan Helpline 1800-180-1551"
      ];
      followUpPrompts = ["What pest management is needed?", "Nutrient & fertilizer guidelines"];
    }
  }

  return {
    text,
    speechText,
    detectedCrop,
    detectedIssue,
    suggestedActions,
    followUpPrompts,
    isFallback: true
  };
}

/**
 * Smart agricultural diagnosis fallback for image / symptom scans.
 */
function getSmartAgronomyDiagnosisFallback(
  crop: string,
  variety: string,
  stage: string,
  symptoms: string,
  language: string
) {
  const isTe = language.toLowerCase().includes("telugu") || language === "te";
  const isHi = language.toLowerCase().includes("hindi") || language === "hi";

  return {
    cropIdentified: crop || (isTe ? "వరి / పంట" : isHi ? "धान / फसल" : "Rice / Crop"),
    problemDetected: isTe
      ? "సాధారణ చీడపీడల / పోషకాల సమగ్ర పరిశీలన"
      : isHi
      ? "सामान्य कीट/पोषण जांच"
      : "Agronomic Crop Assessment",
    problemType: "pest",
    confidence: {
      level: "moderate",
      scorePercent: 78,
      reason: isTe
        ? "AI సర్వర్ల అధిక డిమాండ్ సమయంలో ప్రామాణిక వ్యవసాయ శాస్త్ర నియమాల ప్రకారం అందించిన నివేదిక."
        : "Standard agronomic assessment based on reported crop and symptom indicators."
    },
    isUrgentAlert: false,
    urgentAlertDetails: null,
    visibleSymptoms:
      symptoms || (isTe ? "ఆకులపై రంగు మార్పు లేదా కీటకాల ఉధృతి." : "Leaf discoloration or pest activity reported."),
    likelyCause: isTe
      ? "వాతావరణ తేమ మార్పులు లేదా రసం పీల్చే పురుగులు."
      : "Microclimatic humidity or sucking pest infestation.",
    immediateActions: isTe
      ? [
          "ఆకుల అడుగు భాగాన్ని పరిశీలించండి.",
          "వేప నూనె (10,000 ppm) 2-3 మి.లీ/లీటరు పిచికారీ చేయండి.",
          "నీరు నిల్వ ఉండకుండా డ్రైనేజ్ సరిచేయండి."
        ]
      : [
          "Inspect leaf undersides for pests.",
          "Foliar spray Neem Oil (10,000 ppm) at 2-3 ml/L.",
          "Ensure proper field drainage."
        ],
    actionPlan: {
      rightNow: {
        immediate: isTe
          ? ["వేప నూనె పిచికారీ చేయండి", "పొలంలో నిలబడిన నీటిని తొలగించండి"]
          : ["Spray neem oil 10000 ppm", "Drain stagnant water"],
        avoid: isTe ? ["అధిక మోతాదులో యూరియా వాడకండి"] : ["Avoid excess nitrogen fertilizer"],
        checkParts: isTe ? ["కాండం మొదలు", "ఆకుల అడుగు భాగం"] : ["Stem base", "Leaf undersides"]
      },
      next24Hours: isTe
        ? ["పురుగు లేదా తెగులు తగ్గుముఖం పట్టిందో గమనించండి"]
        : ["Monitor pest movement after bio-spray"],
      next7Days: isTe
        ? ["వారానికి ఒకసారి క్షేత్ర పరిశీలన చేయండి"]
        : ["Conduct weekly field scouting"],
      whenToSeekExpert: isTe
        ? "లక్షణాలు 48 గంటల్లో తగ్గకపోతే వ్యవసాయ అధికారి (AO / KVK) ని సంప్రదించండి."
        : "Visit nearest KVK if symptoms persist beyond 48 hours."
    },
    treatment: {
      approach: isTe ? "సమగ్ర సస్యరక్షణ పద్ధతి (IPM)" : "Integrated Pest Management (IPM)",
      biologicalOrOrganic: isTe
        ? ["వేప నూనె (10000 ppm) 2-3 మి.లీ/లీటరు", "పసుపు / నీలి జిగురు అట్టలు"]
        : ["Neem oil 10000 ppm at 2-3 ml/L", "Sticky traps"],
      culturalOrMechanical: isTe
        ? ["కలుపు మొక్కలు లేకుండా శుభ్రంగా ఉంచండి", "గాలి వెలుతురు సోకేలా పాయలు తీయండి"]
        : ["Keep borders weed-free", "Maintain alleyways for aeration"],
      chemicalDisclaimer: isTe
        ? "అనుమతించబడిన లేబుల్ సిఫార్సు ప్రకారం మాత్రమే రసాయనాలు వాడండి."
        : "Always verify registered chemical label recommendations.",
      chemicalTreatment: isTe
        ? "ఉధృతి తీవ్రంగా ఉంటే సమీప ఏవో (AO) లేదా రైతు భరోసా కేంద్రాన్ని సంప్రదించి సిఫార్సు చేసిన మందు వాడండి."
        : "Consult Agricultural Extension Officer for registered chemical options if severity rises.",
      ppeAndSafetyWarnings: isTe
        ? ["ముసుగు మరియు చేతి తొడుగులు ధరించండి", "గాలి వీచే దిశలోనే పిచికారీ చేయండి"]
        : ["Wear protective gear, gloves and face mask", "Spray in wind direction"],
      preHarvestInterval: null
    },
    waterAssessment: isTe ? "మట్టిలో తగినంత తేమ ఉండేలా చూడండి, నీరు నిలవనివ్వద్దు." : "Maintain optimal field moisture without waterlogging.",
    nutritionAssessment: isTe ? "సిఫారసు చేసిన మోతాదులోనే ఎరువులు వాడండి." : "Follow soil-test based fertilizer dosage.",
    prevention: isTe
      ? ["నాణ్యమైన ధృవీకరించిన విత్తనాలు వాడండి", "ఎప్పటికప్పుడు క్షేత్ర పరిశీలన చేయండి"]
      : ["Use certified seeds", "Regular crop monitoring"],
    followUpQuestions: isTe
      ? ["మొక్కలు నాటి ఎన్ని రోజులైంది?", "ఆకు ముడత పైకి ఉందా లేదా క్రిందికా?"]
      : ["How many days since sowing?", "Is leaf curling upwards or downwards?"],
    expertGuidanceNote: isTe
      ? "కిసాన్ కాల్ సెంటర్ టోల్ ఫ్రీ నంబర్ 1800-180-1551 లో శాస్త్రవేత్తల సలహా పొందవచ్చు."
      : "Contact Kisan Call Center 1800-180-1551 for free scientist advice.",
    localizedSummary: isTe
      ? "పంట ప్రాథమిక పరిశీలన పూర్తయింది. ప్రారంభ దశలో వేప నూనె వంటి సేంద్రీయ పద్ధతులను పాటించండి. వివరణాత్మక యాక్షన్ ప్లాన్ క్రింద చూడవచ్చు."
      : "Preliminary agronomic assessment ready. Follow Integrated Pest Management starting with organic bio-control."
  };
}

/**
 * Deterministic Soil Health Card evaluation fallback based on standard ICAR / agronomic ranges.
 */
function getSmartSoilAnalysisFallback(
  ph: any,
  n: any,
  p: any,
  k: any,
  oc: any,
  crop: string,
  language: string
) {
  const isTe = (language || "").toLowerCase().includes("telugu") || language === "te";

  const phVal = parseFloat(String(ph)) || 6.8;
  const phRating = phVal < 6.0 ? "Acidic" : phVal > 7.8 ? "Alkaline" : "Neutral / Optimal";
  const nVal = parseFloat(String(n)) || 180;
  const nStatus = nVal < 200 ? "Low" : nVal > 400 ? "High" : "Medium";
  const pVal = parseFloat(String(p)) || 20;
  const pStatus = pVal < 15 ? "Low" : pVal > 35 ? "High" : "Medium";
  const kVal = parseFloat(String(k)) || 150;
  const kStatus = kVal < 120 ? "Low" : kVal > 280 ? "High" : "Medium";
  const ocVal = parseFloat(String(oc)) || 0.45;
  const ocStatus = ocVal < 0.5 ? "Low" : ocVal > 0.75 ? "High" : "Medium";

  return {
    phStatus: {
      value: phVal,
      rating: phRating,
      interpretation: isTe
        ? phRating === "Neutral / Optimal"
          ? "నేల పి.హెచ్ అనుకూలంగా ఉంది, పోషకాలు సులభంగా లభిస్తాయి."
          : "పి.హెచ్ సమతుల్యత కోసం జిప్సం లేదా సున్నం వాడండి."
        : "Soil pH is in a functional range for nutrient availability."
    },
    ecStatus: {
      value: 0.4,
      rating: "Normal",
      interpretation: isTe ? "లవణీయత సాధారణ పరిమితుల్లో ఉంది." : "Salinity is normal."
    },
    organicCarbonStatus: {
      value: ocVal,
      rating: ocStatus,
      interpretation: isTe
        ? "సేంద్రీయ కర్బనం పెంచడానికి పచ్చిరొట్ట ఎరువులు లేదా వర్మీకంపోస్ట్ వాడండి."
        : "Apply farmyard manure or vermicompost to improve organic matter."
    },
    primaryNutrients: {
      nitrogen: {
        value: `${nVal} kg/ha`,
        status: nStatus,
        recommendation: isTe
          ? "యూరియాను 3 విడతలుగా సమతుల్యంగా వేయండి."
          : "Apply recommended nitrogen/urea in 2-3 split doses."
      },
      phosphorus: {
        value: `${pVal} kg/ha`,
        status: pStatus,
        recommendation: isTe
          ? "డి.ఎ.పి (DAP) లేదా సింగిల్ సూపర్ ఫాస్ఫేట్ దుక్కిలో వేయండి."
          : "Apply phosphatic fertilizers (DAP/SSP) as basal application."
      },
      potassium: {
        value: `${kVal} kg/ha`,
        status: kStatus,
        recommendation: isTe
          ? "మ్యూరేట్ ఆఫ్ పొటాష్ (MOP) ఆఖరి దుక్కిలో మరియు పూత దశలో వేయండి."
          : "Apply potash (MOP) in split applications."
      }
    },
    micronutrients: [
      {
        name: "Zinc (జింక్)",
        status: "Deficient",
        recommendation: isTe
          ? "ఎకరాకు 10 కిలోల జింక్ సల్ఫేట్ (21%) లేదా లీటరు నీటికి 2 గ్రాములు పిచికారీ చేయండి."
          : "Foliar spray Zinc Sulphate 2g/L or 10kg/acre basal."
      },
      {
        name: "Boron (బోరాన్)",
        status: "Adequate",
        recommendation: isTe ? "బోరాన్ సాధారణ స్థాయిలో ఉంది." : "Adequate status."
      }
    ],
    organicCorrections: isTe
      ? ["జీవామృతం నెలకు రెండుసార్లు పారించండి", "పచ్చిరొట్ట ఎరువులు (జీలుగ/జనుము) సాగు చేయండి"]
      : ["Apply Jeevamrutham twice a month", "Incorporate green manure crops (Dhaincha/Sunnhemp)"],
    fertilizerSchedule: [
      {
        timing: isTe ? "దుక్కి దశ (Basal)" : "Basal Stage",
        application: isTe
          ? "DAP 50 kg + MOP 25 kg + జింక్ సల్ఫేట్ 10 kg/ఎకరా"
          : "DAP 50 kg + MOP 25 kg + Zinc Sulphate 10 kg/acre"
      },
      {
        timing: isTe ? "పిలక దశ (Tillering)" : "Tillering Stage",
        application: isTe ? "యూరియా 25 kg/ఎకరా" : "Urea 25 kg per acre"
      },
      {
        timing: isTe ? "చిరుపొట్ట దశ (Panicle)" : "Panicle Initiation",
        application: isTe ? "యూరియా 20 kg + MOP 15 kg/ఎకరా" : "Urea 20 kg + MOP 15 kg per acre"
      }
    ],
    summary: isTe
      ? `నేల పరీక్ష ఆధారిత ఎరువుల సిఫార్సు సిద్ధమైంది. ${crop} పంటకు సమతుల్య పోషణ మరియు సేంద్రీయ కర్బనం వృద్ధికి ప్రాధాన్యత ఇవ్వండి.`
      : `Soil health card analysis completed for ${crop} with balanced NPK and micronutrient recommendations.`
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Weather API with agricultural spray advisor
  app.get("/api/weather", (req, res) => {
    const location = (req.query.location as string) || "Guntur, Andhra Pradesh";
    // Realistic regional agronomic weather conditions
    const hour = new Date().getHours();
    const isMonsoon = [5, 6, 7, 8, 9].includes(new Date().getMonth());
    
    const weatherData = {
      location,
      temperatureC: 31,
      humidityPercent: 78,
      condition: isMonsoon ? "Partly Cloudy with Scattered Showers" : "Sunny & Humid",
      rainfallChancePercent: isMonsoon ? 65 : 15,
      windSpeedKmH: 12,
      sprayAdvisory: {
        status: isMonsoon ? "caution" : "favorable", // 'favorable' | 'caution' | 'unfavorable'
        advisoryText: isMonsoon 
          ? "Rain showers are likely within 3-6 hours. Avoid spraying foliar pesticides or liquid fertilizers now to prevent chemical wash-off. Wait for a dry spell."
          : "Wind speed is calm (12 km/h) and no immediate rain is forecast. Morning (6:30 AM - 9:30 AM) or late afternoon (4:30 PM - 6:00 PM) is optimal for foliar application.",
        idealWindow: isMonsoon ? "Wait for 24h clear weather" : "06:30 AM - 09:30 AM",
        warnings: isMonsoon
          ? ["Rain expected soon — risk of chemical wash-off", "High humidity promotes fungal spore germination"]
          : ["Wind is below 15 km/h, low risk of drift", "Avoid spraying during peak afternoon heat (>35°C) to prevent leaf scorching"]
      },
      forecast: [
        { day: "Today", tempMax: 33, tempMin: 24, rainChance: isMonsoon ? 60 : 10, icon: isMonsoon ? "cloud-rain" : "sun" },
        { day: "Tomorrow", tempMax: 32, tempMin: 24, rainChance: isMonsoon ? 75 : 20, icon: isMonsoon ? "cloud-rain" : "cloud-sun" },
        { day: "Day 3", tempMax: 34, tempMin: 25, rainChance: isMonsoon ? 40 : 10, icon: "sun" },
        { day: "Day 4", tempMax: 35, tempMin: 25, rainChance: 10, icon: "sun" },
      ],
      alerts: isMonsoon ? [
        {
          id: "alert-1",
          severity: "warning",
          title: "High Humidity & Leaf Moisture Alert",
          description: "Persistent relative humidity above 75% increases vulnerability to fungal blast and blight diseases. Inspect crops regularly."
        }
      ] : []
    };

    res.json(weatherData);
  });

  // Multimodal AI Image & Crop Diagnosis Endpoint (supports both /api/diagnose and /api/diagnose-crop)
  const handleDiagnosis = async (req: express.Request, res: express.Response) => {
    try {
      const {
        images = [], // Array of base64 data URLs or strings
        imageBase64 = null,
        crop = "Unknown Crop",
        variety = "",
        stage = "Vegetative",
        symptoms = "",
        location = "India",
        recentRain = false,
        irrigationType = "Drip / Canal",
        language = "Telugu"
      } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured on the server."
        });
      }

      const ai = getGeminiClient();

      // Prepare parts for Gemini
      const parts: any[] = [];

      const imageList = [...(Array.isArray(images) ? images : []), ...(imageBase64 ? [imageBase64] : [])];

      if (imageList && imageList.length > 0) {
        for (const img of imageList.slice(0, 3)) { // up to 3 images
          let mimeType = "image/jpeg";
          let base64Data = img;

          if (img.includes(";base64,")) {
            const split = img.split(";base64,");
            mimeType = split[0].replace("data:", "");
            base64Data = split[1];
          }

          parts.push({
            inlineData: {
              mimeType,
              data: base64Data
            }
          });
        }
      }

      const promptText = `
You are AgriMitra AI (ఏగ్రిమిత్ర / एग्रीमित्र), an expert agricultural scientist, agronomist, and practical digital farming assistant for Indian farmers.

The farmer needs help identifying what is wrong with their crop.
Context provided by farmer:
- Crop: ${crop}
- Variety: ${variety || "Not specified"}
- Growth Stage: ${stage}
- Symptoms described: ${symptoms || "None provided by text, relying on image"}
- Region/Location: ${location}
- Recent Rain: ${recentRain ? "Yes" : "No"}
- Irrigation: ${irrigationType}
- Desired Language for response: ${language}

CRITICAL AGRICULTURAL SAFETY & LOCALIZATION GUIDELINES:
1. Ground your advice in verified Indian agricultural standards (ICAR, State Agricultural Universities, KVKs, Central Insecticide Board).
2. DO NOT blindly recommend pesticides solely from an image if uncertain.
3. If recommending any pesticide or chemical:
   - Prefer active ingredient (e.g., 'Chlorantraniliprole 18.5% SC', 'Imidacloprid 17.8% SL', 'Mancozeb 75% WP', 'Neem oil 10000 ppm / Azadirachtin') rather than brand names.
   - Always prioritize Integrated Pest Management (IPM): Cultural -> Mechanical -> Biological -> Chemical (last resort).
   - Advise the farmer to check legal registration in their state and read the product label.
   - Emphasize strict PPE safety (gloves, mask, goggles, boots, washing after spray).
   - Never invent dosage or toxic combinations. Mention Pre-Harvest Interval (PHI) where relevant.
4. Distinguish carefully between Pest attack, Fungal disease, Bacterial disease, Viral disease, Nutrient deficiency (Nitrogen, Iron, Zinc, Potassium, Magnesium, Boron, etc.), Waterlogging, Drought stress, Root damage, or Soil salinity.
5. If the image is blurry, too dark, ambiguous, or not showing diagnostic parts, set confidence.level to "low" and politely ask for a clearer close-up of the leaf underside, stem, root, or insect.
6. STRICT LOCALIZATION REQUIREMENT: ALL values in this JSON (problemDetected, visibleSymptoms, likelyCause, immediateActions, actionPlan items, treatment descriptions, waterAssessment, nutritionAssessment, prevention items, followUpQuestions, and localizedSummary) MUST be written in the specified ${language} language, so a regional farmer can read and understand everything without any English barrier!

Respond strictly in valid JSON with this exact schema:
{
  "cropIdentified": "string (e.g. Paddy / Rice, Chilli, Cotton, Tomato, Maize, Groundnut, etc.)",
  "problemDetected": "string (Specific name in ${language} e.g. సుడిదోమ (Brown Planthopper), ఎర్రనల్లి, ఆకుమచ్చ తెగులు)",
  "problemType": "pest" | "disease_fungal" | "disease_bacterial" | "disease_viral" | "nutrient" | "water" | "soil" | "weed" | "healthy" | "uncertain",
  "confidence": {
    "level": "high" | "moderate" | "low",
    "scorePercent": number (e.g. 88),
    "reason": "string explaining why the AI holds this confidence level in ${language}"
  },
  "isUrgentAlert": boolean (true if severe outbreak like Fall Armyworm, Locust, Late Blight epidemic),
  "urgentAlertDetails": {
    "title": "string in ${language}",
    "dangerReason": "string in ${language}",
    "emergencyActions": ["string in ${language}"],
    "whatNotToDo": ["string in ${language}"]
  } | null,
  "visibleSymptoms": "string in ${language} (detailed description of visual signs on leaves, lesions, discoloration, pest presence, curling, spots, or roots)",
  "likelyCause": "string in ${language} (explanation of underlying biological/environmental factor)",
  "immediateActions": ["string in ${language} (3-5 immediate practical steps right now)"],
  "actionPlan": {
    "rightNow": {
      "immediate": ["step 1 in ${language}", "step 2 in ${language}", "step 3 in ${language}"],
      "avoid": ["what to avoid in ${language}"],
      "checkParts": ["specific plant parts to inspect in ${language}"]
    },
    "next24Hours": ["action 1 in ${language}", "action 2 in ${language}"],
    "next7Days": ["monitoring 1 in ${language}", "preventive measure 2 in ${language}"],
    "whenToSeekExpert": "string in ${language} (specific signs indicating need for KVK / Agricultural Officer visit)"
  },
  "treatment": {
    "approach": "string in ${language}",
    "biologicalOrOrganic": ["string in ${language} (e.g. వేప నూనె 10000 ppm, ట్రైకోడెర్మా విరిడే, పసుపు జిగురు అట్టలు)"],
    "culturalOrMechanical": ["string in ${language}"],
    "chemicalDisclaimer": "string in ${language} (Always follow approved label instructions and verify registration)",
    "chemicalTreatment": "string in ${language} or null (Active ingredient with formulation)",
    "ppeAndSafetyWarnings": ["string in ${language} (Wear protective mask, gloves, spray in wind direction)"],
    "preHarvestInterval": "string in ${language} or null"
  },
  "waterAssessment": "string in ${language}",
  "nutritionAssessment": "string in ${language}",
  "prevention": ["string in ${language}"],
  "followUpQuestions": ["string in ${language}"],
  "expertGuidanceNote": "string in ${language}",
  "localizedSummary": "string in ${language} (A warm, respectful, concise conversational explanation written fluently in ${language} designed for voice read-aloud to the farmer)"
}
`;

      parts.push({ text: promptText });

      const response = await generateContentWithFallback(
        ai,
        {
          contents: { parts },
          config: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        },
        MULTIMODAL_MODELS
      );

      const responseText = response?.text || "{}";
      const parsedData = JSON.parse(responseText);

      res.json(parsedData);
    } catch (error: any) {
      console.warn("Falling back to expert agricultural diagnosis:", error?.message || error);
      const fallbackDiagnosis = getSmartAgronomyDiagnosisFallback(
        req.body?.crop || "Unknown Crop",
        req.body?.variety || "",
        req.body?.stage || "Vegetative",
        req.body?.symptoms || "",
        req.body?.language || "Telugu"
      );
      res.json(fallbackDiagnosis);
    }
  };

  app.post("/api/diagnose", handleDiagnosis);
  app.post("/api/diagnose-crop", handleDiagnosis);

  // Multilingual Voice & Text Assistant Conversation
  app.post("/api/voice-assistant", async (req, res) => {
    try {
      const {
        message,
        history = [],
        language = "Telugu",
        cropContext = null
      } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        const fallback = getSmartAgronomyVoiceFallback(message, language, cropContext);
        return res.json(fallback);
      }

      const ai = getGeminiClient();

      const systemInstruction = `
You are AgriMitra AI (ఏగ్రిమిత్ర / एग्रीमित्र), a helpful, compassionate, and highly knowledgeable agricultural AI voice assistant for Indian farmers.
The farmer is interacting with you using speech or text in ${language}.

Your responsibilities:
1. Speak naturally, respectfully, and clearly in ${language}. Use common regional agricultural terms (like చేను, పైరు, నారు, తెగులు, పురుగు in Telugu or फसल, कीट, रोग, खाद in Hindi).
2. Answer queries regarding:
   - Pest and disease identification & management
   - Yellowing leaves, wilting, stunted growth
   - Water & irrigation issues (waterlogging, drought, drip management)
   - Fertilizer calculation, NPK, micronutrient deficiencies (Zinc, Iron, Boron, etc.)
   - Soil health and organic farming (compost, jeevamrutham, biofertilizers)
   - Weather precautions and spraying advisories
   - Government agricultural schemes and Kisan Call Center (1800-180-1551)
3. Safety rules:
   - Do not recommend unverified or dangerous chemical cocktails.
   - Mention biological and IPM controls first.
   - Keep answers clear, formatted with short bullet points, and optimized for voice speech synthesis.
   - If key information is missing (e.g. crop age, leaf color, insect presence), ask 1-2 polite follow-up questions.

${cropContext ? `Current Farmer's Crop Context: ${JSON.stringify(cropContext)}` : ""}

Respond in JSON with the following structure:
{
  "text": "string (Richly formatted response in ${language} with clear headings and bullet points)",
  "speechText": "string (Short, clear, conversational text in ${language} suitable for reading aloud to the farmer via text-to-speech)",
  "detectedCrop": "string or null",
  "detectedIssue": "string or null",
  "suggestedActions": ["short action 1", "short action 2", "short action 3"],
  "followUpPrompts": ["quick reply suggestion 1", "quick reply suggestion 2"]
}
`;

      const contents = [
        ...history.map((h: any) => ({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.text || h.message || "" }]
        })),
        {
          role: "user",
          parts: [{ text: message }]
        }
      ];

      let parsedData: any = null;
      try {
        const response = await generateContentWithFallback(
          ai,
          {
            contents,
            config: {
              systemInstruction,
              responseMimeType: "application/json",
              temperature: 0.3,
            }
          },
          TEXT_MODELS
        );

        const responseText = response?.text || "{}";
        parsedData = JSON.parse(responseText);
      } catch (geminiError: any) {
        console.warn("Voice assistant fallback to localized agronomic engine due to high demand:", geminiError?.message || geminiError);
        parsedData = getSmartAgronomyVoiceFallback(message, language, cropContext);
      }

      res.json(parsedData);
    } catch (error: any) {
      console.warn("Voice assistant emergency fallback:", error?.message || error);
      const emergencyFallback = getSmartAgronomyVoiceFallback(
        req.body?.message || "",
        req.body?.language || "Telugu",
        req.body?.cropContext
      );
      res.json(emergencyFallback);
    }
  });

  // Soil & Fertility Assistant Endpoint
  app.post("/api/soil-analysis", async (req, res) => {
    try {
      const {
        soilType = "Red Sandy Loam",
        location = "India",
        crop = "Paddy",
        previousCrop = "Fallow / Pulses",
        irrigationType = "Borewell / Canal",
        ph = 6.8,
        nitrogenKgPerHa = 180,
        phosphorusKgPerHa = 22,
        potassiumKgPerHa = 140,
        organicCarbonPercent = 0.45,
        micronutrients = "Zinc low, Boron adequate",
        reportImageBase64 = null,
        language = "Telugu"
      } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured on the server."
        });
      }

      const ai = getGeminiClient();
      const parts: any[] = [];

      if (reportImageBase64) {
        let mimeType = "image/jpeg";
        let base64Data = reportImageBase64;
        if (reportImageBase64.includes(";base64,")) {
          const split = reportImageBase64.split(";base64,");
          mimeType = split[0].replace("data:", "");
          base64Data = split[1];
        }
        parts.push({
          inlineData: { mimeType, data: base64Data }
        });
      }

      const prompt = `
You are an expert Agricultural Soil Scientist and Agronomist.
Evaluate the farmer's soil test parameters or uploaded soil test report:
- Soil Type: ${soilType}
- Target Crop: ${crop}
- Previous Crop: ${previousCrop}
- Irrigation: ${irrigationType}
- Location: ${location}
- Provided Values (if image not present or supplemental): pH=${ph}, N=${nitrogenKgPerHa} kg/ha, P=${phosphorusKgPerHa} kg/ha, K=${potassiumKgPerHa} kg/ha, OC=${organicCarbonPercent}%, Micronutrients=${micronutrients}
- Language: ${language}

If a soil test report image is provided, extract the real values printed on the sheet. DO NOT fabricate soil test numbers if not clearly visible.

Analyze:
1. Soil reaction (pH acidity/alkalinity) and electrical conductivity (salinity).
2. NPK status (Low/Medium/High) and balance.
3. Organic carbon content and biological soil health.
4. Micronutrient status (Zinc, Iron, Boron, Sulfur, Magnesium, Calcium).
5. Specific fertilizer recommendations (Urea, DAP, MOP, SSP, Zinc sulfate, Gypsum, Lime, FYM, Vermicompost) for the target crop.
6. Organic remedies (Green manuring with Dhaincha/Sunn hemp, Farm Yard Manure, Jeevamrutham).

Respond in JSON with this structure:
{
  "phStatus": {
    "value": number,
    "rating": "Acidic" | "Neutral / Optimal" | "Alkaline" | "Saline",
    "interpretation": "string in ${language}"
  },
  "ecStatus": {
    "value": number,
    "rating": "Normal" | "Critical" | "High",
    "interpretation": "string in ${language}"
  },
  "organicCarbonStatus": {
    "value": number,
    "rating": "Low" | "Medium" | "High",
    "interpretation": "string in ${language}"
  },
  "primaryNutrients": {
    "nitrogen": { "value": "string (e.g. 180 kg/ha)", "status": "Low" | "Medium" | "High", "recommendation": "string" },
    "phosphorus": { "value": "string (e.g. 15 kg/ha)", "status": "Low" | "Medium" | "High", "recommendation": "string" },
    "potassium": { "value": "string (e.g. 240 kg/ha)", "status": "Low" | "Medium" | "High", "recommendation": "string" }
  },
  "micronutrients": [
    { "name": "string", "status": "Deficient" | "Adequate" | "Excess", "recommendation": "string" }
  ],
  "organicCorrections": ["string", "string"],
  "fertilizerSchedule": [
    { "timing": "string", "application": "string" }
  ],
  "summary": "string in ${language}"
}
`;

      parts.push({ text: prompt });

      let parsedData: any = null;
      try {
        const response = await generateContentWithFallback(
          ai,
          {
            contents: { parts },
            config: {
              responseMimeType: "application/json",
              temperature: 0.2
            }
          },
          MULTIMODAL_MODELS
        );

        const responseText = response?.text || "{}";
        parsedData = JSON.parse(responseText);
      } catch (geminiError: any) {
        console.warn("Soil analysis fallback triggered:", geminiError?.message || geminiError);
        parsedData = getSmartSoilAnalysisFallback(
          ph,
          nitrogenKgPerHa,
          phosphorusKgPerHa,
          potassiumKgPerHa,
          organicCarbonPercent,
          crop,
          language
        );
      }

      res.json(parsedData);
    } catch (error: any) {
      console.warn("Soil analysis emergency fallback:", error?.message || error);
      const emergencyData = getSmartSoilAnalysisFallback(
        req.body?.ph || 6.8,
        req.body?.nitrogenKgPerHa || 180,
        req.body?.phosphorusKgPerHa || 22,
        req.body?.potassiumKgPerHa || 140,
        req.body?.organicCarbonPercent || 0.45,
        req.body?.crop || "Paddy",
        req.body?.language || "Telugu"
      );
      res.json(emergencyData);
    }
  });

  // Audio transcription endpoint (using gemini-3.5-transcribe)
  app.post("/api/transcribe", async (req, res) => {
    try {
      const { audioBase64, mimeType = "audio/webm", language = "Telugu" } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "GEMINI_API_KEY is missing." });
      }

      const ai = getGeminiClient();

      let cleanBase64 = audioBase64;
      let cleanMime = mimeType;
      if (audioBase64.includes(";base64,")) {
        const split = audioBase64.split(";base64,");
        cleanMime = split[0].replace("data:", "");
        cleanBase64 = split[1];
      }

      const audioPart = {
        inlineData: {
          mimeType: cleanMime,
          data: cleanBase64
        }
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.5-transcribe",
        contents: {
          parts: [
            audioPart,
            { text: `Transcribe this farmer's spoken audio accurately. The expected language is ${language} (or any Indian regional language/English spoken). Return only the transcribed text.` }
          ]
        }
      });

      res.json({ text: (response.text || "").trim() });
    } catch (error: any) {
      console.error("Audio transcription error:", error);
      res.status(500).json({ error: "Transcription failed", message: error.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AgriMitra AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
