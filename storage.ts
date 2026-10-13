import { DiagnosisResult, FarmerCrop, LanguageCode, FarmReminder, CropCalendarPlan, SoilAnalysisResult } from "../types";
import { DEMO_CASES } from "../data/demoData";

const STORAGE_KEYS = {
  LANGUAGE: "agrimitra_language",
  DIAGNOSIS_HISTORY: "agrimitra_history_v2",
  MY_CROPS: "agrimitra_my_crops_v2",
  FARMER_NAME: "agrimitra_farmer_name",
  LOCATION: "agrimitra_location",
  ONBOARDING_COMPLETED: "agrimitra_onboarding_done",
  API_KEY: "agrimitra_gemini_api_key",
  REMINDERS: "agrimitra_reminders_v1",
  CROP_CALENDAR: "agrimitra_crop_calendar_v1",
  SAVED_SOIL_REPORT: "agrimitra_saved_soil_v1",
};

const DEFAULT_CROPS: FarmerCrop[] = [
  {
    id: "crop-1",
    name: "Rice / Paddy (వరి)",
    variety: "BPT 5204 (Samba Mahsuri)",
    icon: "🌾",
    areaAcres: 3.5,
    sowingDate: "2026-07-10",
    growthStage: "Tillering",
    irrigationType: "Canal",
    soilType: "Clay Loam",
    activeIssuesCount: 1
  },
  {
    id: "crop-2",
    name: "Chilli / Mirchi (మిరప)",
    variety: "Teja",
    icon: "🌶️",
    areaAcres: 2.0,
    sowingDate: "2026-08-01",
    growthStage: "Vegetative",
    irrigationType: "Drip",
    soilType: "Red Sandy Loam",
    activeIssuesCount: 1
  },
  {
    id: "crop-3",
    name: "Cotton (పత్తి)",
    variety: "Bt Cotton Hybrid",
    icon: "🌱",
    areaAcres: 4.0,
    sowingDate: "2026-06-25",
    growthStage: "Squaring (Buds)",
    irrigationType: "Borewell / Sprinkler",
    soilType: "Black Cotton Soil",
    activeIssuesCount: 0
  }
];

export const getSavedLanguage = (): LanguageCode => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as LanguageCode;
    if (saved) return saved;
  } catch (e) {
    // ignore
  }
  return "te"; // Default to Telugu as requested in examples
};

export const saveLanguage = (lang: LanguageCode) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  } catch (e) {
    // ignore
  }
};

export const getSavedHistory = (): DiagnosisResult[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DIAGNOSIS_HISTORY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    // ignore
  }
  // Initialize with demo cases
  saveHistory(DEMO_CASES);
  return DEMO_CASES;
};

export const saveHistory = (history: DiagnosisResult[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.DIAGNOSIS_HISTORY, JSON.stringify(history));
  } catch (e) {
    // ignore
  }
};

export const addDiagnosisToHistory = (diagnosis: DiagnosisResult) => {
  const current = getSavedHistory();
  const updated = [diagnosis, ...current.filter((d) => d.id !== diagnosis.id)];
  saveHistory(updated);
  return updated;
};

export const getSavedCrops = (): FarmerCrop[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MY_CROPS);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    // ignore
  }
  saveCrops(DEFAULT_CROPS);
  return DEFAULT_CROPS;
};

export const saveCrops = (crops: FarmerCrop[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.MY_CROPS, JSON.stringify(crops));
  } catch (e) {
    // ignore
  }
};

export const getFarmerLocation = (): string => {
  try {
    return localStorage.getItem(STORAGE_KEYS.LOCATION) || "Guntur, Andhra Pradesh";
  } catch (e) {
    return "Guntur, Andhra Pradesh";
  }
};

export const saveFarmerLocation = (loc: string) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LOCATION, loc);
  } catch (e) {
    // ignore
  }
};

export const isOnboardingCompleted = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED) === "true";
  } catch (e) {
    return false;
  }
};

export const setOnboardingCompleted = (done: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, done ? "true" : "false");
  } catch (e) {
    // ignore
  }
};

export const getSavedApiKey = (): string => {
  try {
    return localStorage.getItem(STORAGE_KEYS.API_KEY) || "";
  } catch (e) {
    return "";
  }
};

export const saveApiKey = (key: string) => {
  try {
    if (key) {
      localStorage.setItem(STORAGE_KEYS.API_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEYS.API_KEY);
    }
  } catch (e) {
    // ignore
  }
};

// Reminders default and storage
const getTomorrowDateStr = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

const getInDaysDateStr = (days: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

const getTodayDateStr = (): string => {
  return new Date().toISOString().split("T")[0];
};

const DEFAULT_REMINDERS: FarmReminder[] = [
  {
    id: "rem-1",
    taskName: "Irrigation check",
    category: "irrigation",
    date: getTomorrowDateStr(),
    time: "07:00",
    cropOrField: "Rice Field A",
    notes: "Check water depth (maintain 2-3 cm for tillering stage). Ensure drainage canal is clear.",
    isCompleted: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "rem-2",
    taskName: "Foliar spray timing inspection",
    category: "spraying",
    date: getTodayDateStr(),
    time: "16:30",
    cropOrField: "Chilli (Mirchi) Plot",
    notes: "Review weather spray advisory before spraying Neem oil 10,000 ppm. Wear protective mask and gloves.",
    isCompleted: false,
    createdAt: new Date().toISOString()
  },
  {
    id: "rem-3",
    taskName: "Pest monitoring & sticky traps",
    category: "pest_monitoring",
    date: getInDaysDateStr(2),
    time: "08:30",
    cropOrField: "Chilli / Cotton",
    notes: "Inspect blue & yellow sticky traps for thrips, whiteflies and jassid counts.",
    isCompleted: false,
    createdAt: new Date().toISOString()
  }
];

export const getSavedReminders = (): FarmReminder[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    // ignore
  }
  saveReminders(DEFAULT_REMINDERS);
  return DEFAULT_REMINDERS;
};

export const saveReminders = (reminders: FarmReminder[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
  } catch (e) {
    // ignore
  }
};

export const addReminder = (newReminder: Omit<FarmReminder, "id" | "createdAt">): FarmReminder[] => {
  const current = getSavedReminders();
  const reminder: FarmReminder = {
    ...newReminder,
    id: `rem-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  const updated = [reminder, ...current];
  saveReminders(updated);
  return updated;
};

export const toggleReminderCompleted = (id: string): FarmReminder[] => {
  const current = getSavedReminders();
  const updated = current.map((r) => (r.id === id ? { ...r, isCompleted: !r.isCompleted } : r));
  saveReminders(updated);
  return updated;
};

export const deleteReminder = (id: string): FarmReminder[] => {
  const current = getSavedReminders();
  const updated = current.filter((r) => r.id !== id);
  saveReminders(updated);
  return updated;
};

export const getSavedSoilReport = (): SoilAnalysisResult | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED_SOIL_REPORT);
    if (data) return JSON.parse(data);
  } catch (e) {
    // ignore
  }
  return null;
};

export const saveSoilReport = (report: SoilAnalysisResult) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_SOIL_REPORT, JSON.stringify(report));
  } catch (e) {
    // ignore
  }
};

