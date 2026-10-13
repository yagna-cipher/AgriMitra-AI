import { getSavedApiKey } from "./storage";

export interface GeminiVoiceResponse {
  text: string;
  speechText: string;
  detectedCrop?: string;
  detectedIssue?: string;
  suggestedActions?: string[];
  followUpPrompts?: string[];
  isFallback?: boolean;
}

export interface GeminiPestResponse {
  cropIdentified: string;
  problemDetected: string;
  problemType: "pest" | "disease_fungal" | "disease_bacterial" | "disease_viral" | "nutrient" | "water" | "soil" | "healthy" | "uncertain";
  severity: "Low" | "Moderate" | "Severe";
  organicSolution: string;
  chemicalSolution: string;
  dosagePerAcre: string;
  localizedSummary: string;
  immediateActions: string[];
  fullRawText?: string;
}

export type GeminiErrorCategory =
  | "NO_API_KEY"
  | "OFFLINE"
  | "INVALID_KEY"
  | "QUOTA_EXCEEDED"
  | "SERVER_ERROR"
  | "MAX_RETRIES_EXCEEDED";

export interface GeminiServiceError {
  category: GeminiErrorCategory;
  message: string;
  teluguMessage: string;
  canRetry: boolean;
  retryAfterSec?: number;
}

// Telugu error messages as specifically requested
export const TELUGU_ERROR_MESSAGES = {
  NO_API_KEY: "Dayachesi API Key ni settings lo pettandi",
  OFFLINE: "Internet ledu. Dayachesi WiFi on cheyyandi",
  INVALID_KEY: "API Key thappu. Malli check cheyyandi",
  QUOTA_EXCEEDED: "Konchem sepu aagandi, malli prayatninchandi",
  FINAL_FAILURE: "కిసాన్ కాల్ సెంటర్: 1800-180-1551 కి కాల్ చేసి తక్షణ వ్యవసాయ శాస్త్రవేత్త సహాయం పొందండి.",
  THINKING: "Alochistunnanu..."
};

// Specialized Andhra Pradesh Agriculture Knowledge Engine for offline or fallback response
const TELUGU_EXPERT_KNOWLEDGE: Array<{
  keywords: string[];
  response: GeminiVoiceResponse;
}> = [
  {
    keywords: ["vari", "pasupu", "yellow", "వరి", "పసుపు", "ఆకులు", "vari akulu", "వరి ఆకులు"],
    response: {
      text: `🌾 **వరి ఆకులు పసుపు రంగులోకి మారడానికి ముఖ్య కారణాలు మరియు పరిష్కారాలు:**

1. **నత్రజని (Nitrogen) లోపం:**
   - **లక్షణాలు:** క్రింది పాత ఆకులు మొదట పసుపు రంగులోకి మారి ఎండిపోతాయి.
   - **నివారణ:** ఎకరాకు 20-25 కిలోల యూరియాను సమతుల్యంగా వేయండి లేదా 2% యూరియా ద్రావణాన్ని (లీటరు నీటికి 20 గ్రాములు) పిచికారీ చేయండి.

2. **జింక్ (Zinc) ధాతు లోపం (ఖైరా తెగులు):**
   - **లక్షణాలు:** మధ్య ఆకులపై తుప్పు వంటి గోధుమ రంగు మచ్చలు, పసుపు చారలు.
   - **నివారణ:** లీటరు నీటికి 2 గ్రాముల జింక్ సల్ఫేట్ (21%) + 10 గ్రాముల యూరియా కలిపి పిచికారీ చేయండి.

3. **కాండం తొలుచు పురుగు (Stem Borer / మొగి పురుగు):**
   - **లక్షణాలు:** పిలక దశలో ఆకులు పసుపు రంగులోకి మారి ఎండిపోవడం (డెడ్ హార్ట్).
   - **నివారణ:** కార్టాప్ హైడ్రోక్లోరైడ్ 50% SP (2 గ్రా/లీటరు) లేదా క్లోరాంట్రానిలిప్రోల్ 18.5% SC (0.4 మి.లీ/లీటరు) పిచికారీ చేయండి.

4. **మురుగు నీటి సమస్య (Waterlogging):**
   - చేనులో మురుగు నీరు నిలవకుండా తీసివేసి 2-3 రోజులు గాలి తగలనివ్వండి.`,
      speechText: "వరి ఆకులు పసుపు రంగులోకి మారడానికి ముఖ్యంగా నత్రజని లేదా జింక్ లోపం కారణం కావచ్చు. ఒకవేళ కాండం తొలుచు పురుగు ఉంటే కార్టాప్ లేదా క్లోరాంట్రానిలిప్రోల్ పిచికారీ చేయండి. సమగ్ర నివారణ వివరాలు చూడండి.",
      detectedCrop: "వరి (Paddy / Rice)",
      detectedIssue: "నత్రజని / జింక్ లోపం లేదా కాండం తొలుచు పురుగు",
      suggestedActions: [
        "2% యూరియా లేదా జింక్ సల్ఫేట్ (2 గ్రా/లీ) పిచికారీ చేయండి",
        "చేనులో మురుగు నీరు నిలవకుండా డ్రైనేజ్ చేయండి",
        "కాండం మొదలు వద్ద మొగి పురుగు ఉందో పరిశీలించండి"
      ],
      followUpPrompts: [
        "వరిలో జింక్ లోపం ఎలా గుర్తించాలి?",
        "మొగి పురుగు నివారణ మందులు ఏమిటి?",
        "ఎరువుల సమతుల్య యాజమాన్యం చెప్పండి"
      ]
    }
  },
  {
    keywords: ["mirchi", "chilli", "mudatha", "మిరప", "ముడత", "తామర పురుగులు", "నల్ల తామర"],
    response: {
      text: `🌶️ **మిరప ఆకు ముడత మరియు తామర పురుగుల నివారణ:**

1. **పై ముడత (తామర పురుగులు - Thrips / Black Thrips):**
   - **సేంద్రీయ నివారణ:** వేప నూనె (10,000 ppm) 2-3 మి.లీ/లీటరు లేదా నీలి జిగురు అట్టలు (ఎకరాకు 30-40) అమర్చండి.
   - **రసాయన నివారణ:** స్పైనటోరం 11.7% SC (0.9 మి.లీ/లీటరు) లేదా ఫైప్రోనిల్ 5% SC (2 మి.లీ/లీటరు) పిచికారీ చేయండి.

2. **క్రింది ముడత (నల్లి - Mites):**
   - డైకోఫాల్ 18.5% EC (2.5 మి.లీ/లీటరు) లేదా స్పైరోమెసిఫెన్ 22.9% SC (1 మి.లీ/లీటరు) పిచికారీ చేయండి.`,
      speechText: "మిరపలో ఆకు ముడత తామర పురుగులు లేదా నల్లి వల్ల వస్తుంది. ఎకరాకు 30 నీలి జిగురు అట్టలు పెట్టండి మరియు స్పైనటోరం లేదా వేప నూనె పిచికారీ చేయండి.",
      detectedCrop: "మిరప (Chilli)",
      detectedIssue: "తామర పురుగులు & ఆకు ముడత (Thrips & Leaf Curl)",
      suggestedActions: [
        "ఎకరాకు 30-40 నీలి మరియు పసుపు జిగురు అట్టలు పెట్టండి",
        "వేపనూనె (10,000 ppm) 2-3 మి.లీ/లీ స్ప్రే చేయండి",
        "నల్ల తామర పురుగు ఉంటే స్పైనటోరం 0.9 మి.లీ/లీ స్ప్రే చేయండి"
      ]
    }
  },
  {
    keywords: ["patti", "cotton", "పత్తి", "గులాబీ", "రంగు పురుగు", "bollworm"],
    response: {
      text: `🌱 **పత్తిలో గులాబీ రంగు కాయ తొలుచు పురుగు (Pink Bollworm) నివారణ:**

1. **లింగాకర్షక బుట్టలు:** ఎకరాకు 8-10 ఫెరమోన్ ట్రాప్స్ అమర్చి పురుగు ఉధృతిని గమనించండి.
2. **సేంద్రీయ చర్యలు:** వేప గింజల కషాయం 5% లేదా వేపనూనె 1500 ppm (5 మి.లీ/లీటరు).
3. **రసాయన చర్యలు:** ప్రొఫెనోఫాస్ 50% EC (2 మి.లీ/లీటరు) లేదా ఎమామెక్టిన్ బెంజోయేట్ 5% SG (0.4 గ్రా/లీటరు) పిచికారీ చేయండి.`,
      speechText: "పత్తిలో గులాబీ రంగు పురుగు నివారణకు ఎకరాకు 8 లింగాకర్షక బుట్టలు పెట్టండి. వేపనూనె లేదా ప్రొఫెనోఫాస్ పిచికారీ చేయండి.",
      detectedCrop: "పత్తి (Cotton)",
      detectedIssue: "గులాబీ రంగు కాయ తొలుచు పురుగు (Pink Bollworm)",
      suggestedActions: [
        "ఎకరాకు 8-10 ఫెరమోన్ బుట్టలు ఏర్పాటు చేయండి",
        "ఎమామెక్టిన్ బెంజోయేట్ 0.4 గ్రా/లీ స్ప్రే చేయండి"
      ]
    }
  }
];

// Helper sleep
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Call Gemini API with 3 Retries, 2-sec gap, offline detection & specific error translation.
 */
export async function queryGeminiVoice(
  query: string,
  language = "Telugu",
  cropContext?: any,
  onStatusUpdate?: (status: string) => void
): Promise<GeminiVoiceResponse> {
  const cleanQuery = (query || "").trim();

  // 1. Check Offline
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    // Try matching local expert knowledge first for best offline UX
    const matched = findLocalExpertMatch(cleanQuery);
    if (matched) return matched;

    const err: GeminiServiceError = {
      category: "OFFLINE",
      message: "No internet connection detected.",
      teluguMessage: TELUGU_ERROR_MESSAGES.OFFLINE,
      canRetry: true
    };
    throw err;
  }

  const customKey = getSavedApiKey();
  const maxRetries = 3;
  let lastError: any = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (onStatusUpdate) {
        onStatusUpdate(
          attempt === 1
            ? TELUGU_ERROR_MESSAGES.THINKING
            : `Alochistunnanu... (ప్రయత్నం ${attempt}/${maxRetries})`
        );
      }

      // Approach A: If customKey is present, call Google Gemini endpoint directly
      if (customKey) {
        const directResult = await callGeminiDirectText(customKey, cleanQuery, language, cropContext);
        return directResult;
      }

      // Approach B: Call server backend proxy (which has server process.env.GEMINI_API_KEY)
      const serverResult = await callServerVoiceAssistant(cleanQuery, language, cropContext, customKey);
      return serverResult;
    } catch (err: any) {
      console.warn(`Gemini voice query attempt ${attempt} failed:`, err);
      lastError = err;

      // Classify error
      const status = err?.status || err?.statusCode || 0;
      const errMsg = (err?.message || "").toLowerCase();

      // If invalid API key, do not endlessly retry
      if (status === 400 && (errMsg.includes("api_key_invalid") || errMsg.includes("key not valid") || errMsg.includes("api key"))) {
        const keyErr: GeminiServiceError = {
          category: "INVALID_KEY",
          message: "API Key is invalid.",
          teluguMessage: TELUGU_ERROR_MESSAGES.INVALID_KEY,
          canRetry: false
        };
        throw keyErr;
      }

      // If Quota exceeded (429) -> wait 3 seconds and retry
      if (status === 429 || errMsg.includes("quota") || errMsg.includes("resource_exhausted")) {
        if (onStatusUpdate) onStatusUpdate(TELUGU_ERROR_MESSAGES.QUOTA_EXCEEDED);
        if (attempt < maxRetries) {
          await sleep(3000);
          continue;
        }
      }

      // If not last attempt, wait 2 seconds gap before retry
      if (attempt < maxRetries) {
        await sleep(2000);
      }
    }
  }

  // If all attempts failed, check if we have matching local agricultural knowledge
  const fallback = findLocalExpertMatch(cleanQuery);
  if (fallback) {
    return {
      ...fallback,
      isFallback: true
    };
  }

  // Provide guaranteed agrarian voice advisory if model is down / 503 high demand
  return {
    text: `🌱 **అగ్రి మిత్ర AI వ్యవసాయ సలహా:**\n\nసర్వర్లలో తాత్కాలిక డిమాండ్ ఉన్నప్పటికీ, మీ పంట సంరక్షణ కొరకు ముఖ్య సలహాలు:\n1. **క్షేత్ర పరిశీలన:** పంట ఆకుల అడుగు భాగం మరియు కాండం మొదలును పరిశీలించి పురుగుల ఉనికిని గమనించండి.\n2. **సేంద్రీయ రక్షణ:** ప్రారంభ దశలో వేప నూనె (10,000 ppm) 2-3 మి.లీ/లీటరు పిచికారీ చేయండి.\n3. **శాస్త్రవేత్తల సహాయం:** కిసాన్ కాల్ సెంటర్ (టోల్ ఫ్రీ: 1800-180-1551) లో వ్యవసాయ శాస్త్రవేత్తలతో ఉచితంగా మాట్లాడవచ్చు.`,
    speechText: "పంట ఆకుల అడుగు భాగాన్ని పరిశీలించి ప్రారంభ దశలో వేప నూనె పిచికారీ చేయండి. శాస్త్రవేత్తల ఉచిత సలహాకు కిసాన్ కాల్ సెంటర్ 1800-180-1551 కి కాల్ చేయండి.",
    detectedCrop: "వరి / ఇతర పంటలు",
    detectedIssue: "సమగ్ర సస్యరక్షణ సూచనలు",
    suggestedActions: [
      "ఆకుల అడుగు భాగం పరిశీలించండి",
      "వేపనూనె 2-3 మి.లీ/లీ స్ప్రే చేయండి",
      "కిసాన్ కాల్ సెంటర్ 1800-180-1551 ని సంప్రదించండి"
    ],
    followUpPrompts: ["పురుగుల నివారణ సలహా", "ఎరువుల సరైన మోతాదు ఏమిటి?"],
    isFallback: true
  };
}

/**
 * Direct Gemini API call from browser when user configures custom API key.
 */
async function callGeminiDirectText(
  apiKey: string,
  userQuery: string,
  language: string,
  cropContext?: any
): Promise<GeminiVoiceResponse> {
  const models = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
  let lastErr = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const prompt = `You are AgriMitra AI (ఏగ్రిమిత్ర), an expert agricultural scientist from Andhra Pradesh.
The farmer is asking this question: "${userQuery}".
Language: ${language}.
${cropContext ? `Crop Context: ${JSON.stringify(cropContext)}` : ""}

Respond strictly in valid JSON with this format:
{
  "text": "Detailed, polite response in ${language} with bullet points, exact dosage per acre, organic and chemical options.",
  "speechText": "Short, clear 2-sentence conversational summary in ${language} for audio read-aloud.",
  "detectedCrop": "Identified crop in Telugu & English",
  "detectedIssue": "Identified pest/disease/nutrient issue in Telugu",
  "suggestedActions": ["step 1 in ${language}", "step 2 in ${language}"],
  "followUpPrompts": ["question 1", "question 2"]
}`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2
          }
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errObj: any = new Error(errorData?.error?.message || `HTTP ${res.status}`);
        errObj.status = res.status;
        throw errObj;
      }

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error("Empty response from Gemini");

      try {
        const parsed = JSON.parse(rawText);
        return {
          text: parsed.text || rawText,
          speechText: parsed.speechText || parsed.text || rawText,
          detectedCrop: parsed.detectedCrop,
          detectedIssue: parsed.detectedIssue,
          suggestedActions: parsed.suggestedActions || [],
          followUpPrompts: parsed.followUpPrompts || []
        };
      } catch {
        return {
          text: rawText,
          speechText: rawText.slice(0, 180),
          suggestedActions: ["చేనును పరిశీలించండి", "సమగ్ర నివారణ చర్యలు పాటించండి"]
        };
      }
    } catch (e: any) {
      lastErr = e;
      if (e?.status === 400 || e?.status === 403) break; // Don't try other models if key is invalid
    }
  }

  throw lastErr || new Error("Direct Gemini call failed");
}

/**
 * Server voice assistant proxy call.
 */
async function callServerVoiceAssistant(
  message: string,
  language: string,
  cropContext?: any,
  apiKey?: string
): Promise<GeminiVoiceResponse> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (apiKey) headers["x-gemini-api-key"] = apiKey;

  const res = await fetch("/api/voice-assistant", {
    method: "POST",
    headers,
    body: JSON.stringify({
      message,
      language,
      cropContext,
      apiKey: apiKey || undefined
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const err: any = new Error(errorData.message || errorData.error || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }

  const data = await res.json();
  return {
    text: data.text || "వ్యవసాయ సలహా సిద్ధమైంది.",
    speechText: data.speechText || data.text,
    detectedCrop: data.detectedCrop,
    detectedIssue: data.detectedIssue,
    suggestedActions: data.suggestedActions || [],
    followUpPrompts: data.followUpPrompts || []
  };
}

/**
 * Multimodal Pest and Disease Image Detection with Andhra Pradesh Agronomy prompt.
 */
export async function diagnoseCropImageGemini(
  base64Image: string,
  selectedCrop = "Rice / Paddy",
  language = "Telugu",
  onStatusUpdate?: (status: string) => void
): Promise<GeminiPestResponse> {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    const err: GeminiServiceError = {
      category: "OFFLINE",
      message: "No internet connection.",
      teluguMessage: TELUGU_ERROR_MESSAGES.OFFLINE,
      canRetry: true
    };
    throw err;
  }

  const customKey = getSavedApiKey();
  const maxRetries = 3;
  let lastError: any = null;

  // Clean base64 header
  const cleanBase64 = base64Image.replace(/^data:image\/[a-zA-Z]+;base64,/, "");

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (onStatusUpdate) {
        onStatusUpdate(
          attempt === 1
            ? "చిత్రాన్ని పరిశీలిస్తున్నాను (Alochistunnanu...)"
            : `చిత్రాన్ని పరిశీలిస్తున్నాను... (ప్రయత్నం ${attempt}/${maxRetries})`
        );
      }

      // If custom key present, call direct
      if (customKey) {
        return await callGeminiDirectImage(customKey, cleanBase64, selectedCrop, language);
      }

      // Otherwise call server proxy
      return await callServerCropDiagnosis(base64Image, selectedCrop, language, customKey);
    } catch (err: any) {
      console.warn(`Pest detection attempt ${attempt} failed:`, err);
      lastError = err;

      const status = err?.status || err?.statusCode || 0;
      const errMsg = (err?.message || "").toLowerCase();

      if (status === 400 && (errMsg.includes("api_key_invalid") || errMsg.includes("key not valid"))) {
        const keyErr: GeminiServiceError = {
          category: "INVALID_KEY",
          message: "API Key is invalid.",
          teluguMessage: TELUGU_ERROR_MESSAGES.INVALID_KEY,
          canRetry: false
        };
        throw keyErr;
      }

      if (status === 429 || errMsg.includes("quota")) {
        if (onStatusUpdate) onStatusUpdate(TELUGU_ERROR_MESSAGES.QUOTA_EXCEEDED);
        if (attempt < maxRetries) {
          await sleep(3000);
          continue;
        }
      }

      if (attempt < maxRetries) {
        await sleep(2000);
      }
    }
  }

  if (!customKey && lastError?.message?.includes("GEMINI_API_KEY is not configured")) {
    const noKeyErr: GeminiServiceError = {
      category: "NO_API_KEY",
      message: "API Key is missing in settings.",
      teluguMessage: TELUGU_ERROR_MESSAGES.NO_API_KEY,
      canRetry: false
    };
    throw noKeyErr;
  }

  const finalErr: GeminiServiceError = {
    category: "MAX_RETRIES_EXCEEDED",
    message: "Image analysis failed after 3 retries.",
    teluguMessage: `${TELUGU_ERROR_MESSAGES.FINAL_FAILURE}`,
    canRetry: true
  };
  throw finalErr;
}

async function callGeminiDirectImage(
  apiKey: string,
  cleanBase64: string,
  cropName: string,
  language: string
): Promise<GeminiPestResponse> {
  const prompt = `You are an agriculture expert from Andhra Pradesh. Identify pest or disease in this image for ${cropName}. Answer in Telugu. Give pest name, severity, organic and chemical solution with dosage per acre.

Respond strictly in valid JSON with this structure:
{
  "cropIdentified": "Crop name in Telugu & English",
  "problemDetected": "Pest or disease name in Telugu",
  "problemType": "pest",
  "severity": "Moderate",
  "organicSolution": "Detailed organic/biological control in Telugu",
  "chemicalSolution": "Chemical pesticide active ingredient in Telugu",
  "dosagePerAcre": "Exact dosage per acre and per litre of water in Telugu",
  "localizedSummary": "Clear concise summary in Telugu for farmer",
  "immediateActions": ["action 1 in Telugu", "action 2 in Telugu", "action 3 in Telugu"]
}`;

  const models = ["gemini-3.8-flash", "gemini-3.1-flash-lite"];
  let lastErr = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { inlineData: { mimeType: "image/jpeg", data: cleanBase64 } },
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2
          }
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const err: any = new Error(errorData?.error?.message || `HTTP ${res.status}`);
        err.status = res.status;
        throw err;
      }

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error("Empty image response from Gemini");

      const parsed = JSON.parse(rawText);
      return {
        cropIdentified: parsed.cropIdentified || cropName,
        problemDetected: parsed.problemDetected || "కీటకం లేదా తెగులు గుర్తించబడింది",
        problemType: parsed.problemType || "pest",
        severity: parsed.severity || "Moderate",
        organicSolution: parsed.organicSolution || "వేపనూనె (10,000 ppm) 2-3 మి.లీ/లీటరు పిచికారీ చేయండి.",
        chemicalSolution: parsed.chemicalSolution || "అనుమతించబడిన సిఫార్సు రసాయనాన్ని లేబుల్ ప్రకారం పిచికారీ చేయండి.",
        dosagePerAcre: parsed.dosagePerAcre || "ఎకరాకు 200 లీటర్ల నీటితో తగిన మోతాదులో కలపండి.",
        localizedSummary: parsed.localizedSummary || "ఆకుపై పురుగు లేదా తెగులు లక్షణాలు గుర్తించబడ్డాయి.",
        immediateActions: parsed.immediateActions || ["ఆకుల క్రింది భాగాన్ని తనిఖీ చేయండి.", "వేప నూనె స్ప్రే చేయండి."]
      };
    } catch (e: any) {
      lastErr = e;
      if (e?.status === 400 || e?.status === 403) break;
    }
  }

  throw lastErr || new Error("Failed to detect pest with Gemini vision");
}

async function callServerCropDiagnosis(
  base64Image: string,
  selectedCrop: string,
  language: string,
  apiKey?: string
): Promise<GeminiPestResponse> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (apiKey) headers["x-gemini-api-key"] = apiKey;

  const res = await fetch("/api/diagnose-crop", {
    method: "POST",
    headers,
    body: JSON.stringify({
      imageBase64: base64Image,
      selectedCrop,
      language,
      apiKey: apiKey || undefined
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const err: any = new Error(errorData.message || errorData.error || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }

  const result = await res.json();
  return {
    cropIdentified: result.cropIdentified || selectedCrop,
    problemDetected: result.problemDetected || "గుర్తించిన సమస్య",
    problemType: result.problemType || "pest",
    severity: result.confidence?.level === "high" ? "Severe" : "Moderate",
    organicSolution: Array.isArray(result.treatment?.biologicalOrOrganic)
      ? result.treatment.biologicalOrOrganic.join(". ")
      : "వేప నూనె పిచికారీ చేయండి.",
    chemicalSolution: result.treatment?.chemicalTreatment || "సిఫారసు చేయబడిన పురుగుమందు వాడండి.",
    dosagePerAcre: "ఎకరాకు 200 లీటర్ల నీటిలో సిఫార్సు మోతాదు ప్రకారం కలపండి.",
    localizedSummary: result.localizedSummary || "రోగ నిర్ధారణ పూర్తయింది.",
    immediateActions: result.immediateActions || ["చేనును నిశితంగా పరిశీలించండి."]
  };
}

function findLocalExpertMatch(query: string): GeminiVoiceResponse | null {
  const q = query.toLowerCase();
  for (const item of TELUGU_EXPERT_KNOWLEDGE) {
    const matched = item.keywords.some((k) => q.includes(k.toLowerCase()));
    if (matched) return item.response;
  }
  return null;
}
