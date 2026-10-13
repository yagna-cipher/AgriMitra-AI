export type LanguageCode =
  | "te" // Telugu
  | "hi" // Hindi
  | "ta" // Tamil
  | "kn" // Kannada
  | "ml" // Malayalam
  | "mr" // Marathi
  | "bn" // Bengali
  | "gu" // Gujarati
  | "pa" // Punjabi
  | "en"; // English

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  voiceLangCode: string; // for Web Speech API e.g. 'te-IN'
  flagEmoji: string;
}

export type ProblemType =
  | "pest"
  | "disease_fungal"
  | "disease_bacterial"
  | "disease_viral"
  | "nutrient"
  | "water"
  | "soil"
  | "weed"
  | "healthy"
  | "uncertain";

export interface ConfidenceInfo {
  level: "high" | "moderate" | "low";
  scorePercent: number;
  reason: string;
}

export interface UrgentAlert {
  title: string;
  dangerReason: string;
  emergencyActions: string[];
  whatNotToDo: string[];
}

export interface ActionPlan {
  rightNow: {
    immediate: string[];
    avoid: string[];
    checkParts: string[];
  };
  next24Hours: string[];
  next7Days: string[];
  whenToSeekExpert: string;
}

export interface TreatmentInfo {
  approach: string;
  biologicalOrOrganic: string[];
  culturalOrMechanical: string[];
  chemicalDisclaimer: string;
  chemicalTreatment: string | null;
  ppeAndSafetyWarnings: string[];
  preHarvestInterval: string | null;
}

export interface DiagnosisResult {
  id: string;
  timestamp: string;
  cropIdentified: string;
  cropVariety?: string;
  growthStage?: string;
  problemDetected: string;
  problemType: ProblemType;
  confidence: ConfidenceInfo;
  isUrgentAlert: boolean;
  urgentAlertDetails: UrgentAlert | null;
  visibleSymptoms: string;
  likelyCause: string;
  immediateActions: string[];
  actionPlan: ActionPlan;
  treatment: TreatmentInfo;
  waterAssessment: string;
  nutritionAssessment: string;
  prevention: string[];
  followUpQuestions: string[];
  expertGuidanceNote: string;
  localizedSummary: string;
  imageUrls: string[];
  farmerNotes?: string;
  timelineStage?: "Day 1" | "Day 7" | "Day 14";
  location?: string;
}

export interface FarmerCrop {
  id: string;
  name: string;
  variety: string;
  icon: string;
  areaAcres: number;
  sowingDate: string;
  growthStage: string;
  irrigationType: string;
  soilType: string;
  activeIssuesCount: number;
}

export interface PestLibraryItem {
  id: string;
  commonName: string;
  scientificName?: string;
  localNames: Record<LanguageCode, string>;
  category: "pest" | "disease";
  affectedCrops: string[];
  identificationMarks: string[];
  typicalSymptoms: string[];
  favorableConditions: string;
  biologicalControl: string[];
  culturalControl: string[];
  mechanicalControl: string[];
  chemicalControlSafety: string[];
  preventionTips: string[];
  imageUrl: string;
}

export interface WeatherInfo {
  location: string;
  temperatureC: number;
  humidityPercent: number;
  condition: string;
  rainfallChancePercent: number;
  windSpeedKmH: number;
  sprayAdvisory: {
    status: "favorable" | "caution" | "unfavorable";
    advisoryText: string;
    idealWindow?: string;
    warnings: string[];
  };
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  speechText?: string;
  timestamp: string;
  suggestedActions?: string[];
  followUpPrompts?: string[];
  detectedCrop?: string | null;
  detectedIssue?: string | null;
}

export interface SoilAnalysisResult {
  phStatus: {
    value: number;
    rating: string;
    interpretation: string;
  };
  ecStatus: {
    value: number;
    rating: string;
    interpretation: string;
  };
  organicCarbonStatus: {
    value: number;
    rating: string;
    interpretation: string;
  };
  primaryNutrients: {
    nitrogen: { value: string; status: string; recommendation: string };
    phosphorus: { value: string; status: string; recommendation: string };
    potassium: { value: string; status: string; recommendation: string };
  };
  micronutrients: Array<{
    name: string;
    status: string;
    recommendation: string;
  }>;
  organicCorrections: string[];
  fertilizerSchedule: Array<{
    timing: string;
    application: string;
  }>;
  summary: string;
}

// 1. AI Farm Health Score
export interface HealthBreakdownItem {
  id: string;
  name: string;
  score: number | null; // null if not enough data
  maxScore: number;
  status: "good" | "moderate" | "risk" | "insufficient_data";
  statusLabel: string;
  dataSummary: string;
  actionRecommendation?: string;
}

export interface FarmHealthScore {
  overallScore: number | null; // 0-100 or null if not enough data
  rating: "EXCELLENT" | "GOOD" | "MODERATE" | "ATTENTION_NEEDED" | "NOT_ENOUGH_DATA";
  ratingLabel: string;
  breakdown: {
    cropHealth: HealthBreakdownItem;
    soilHealth: HealthBreakdownItem;
    waterIrrigation: HealthBreakdownItem;
    weatherRisk: HealthBreakdownItem;
    pestDiseaseRisk: HealthBreakdownItem;
    nutrition: HealthBreakdownItem;
  };
  recommendations: string[];
  calculatedAt: string;
}

// 2. Crop Calendar
export interface CropCalendarStage {
  id: string;
  stageName: string; // Sowing, Germination, Vegetative growth, Flowering, Fruiting/Grain filling, Harvest
  stageIcon: string;
  approxStartDay: number;
  approxEndDay: number;
  startDateFormatted: string;
  endDateFormatted: string;
  irrigationGuidance: string;
  nutritionGuidance: string;
  pestDiseaseMonitoring: string;
  importantActivities: string[];
  status: "completed" | "active" | "upcoming";
}

export interface CropCalendarPlan {
  id: string;
  cropName: string;
  variety?: string;
  location: string;
  sowingDate: string;
  irrigationMethod?: string;
  totalDurationDays: number;
  stages: CropCalendarStage[];
  disclaimer: string;
}

// 3. Smart Farm Reminders
export type ReminderCategory =
  | "irrigation"
  | "fertilizer"
  | "spraying"
  | "pest_monitoring"
  | "soil_testing"
  | "harvest"
  | "custom";

export interface FarmReminder {
  id: string;
  taskName: string;
  category: ReminderCategory;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  cropOrField: string;
  notes?: string;
  isCompleted: boolean;
  createdAt: string;
}

// 4. Early Pest & Disease Warning
export interface PestDiseaseWarning {
  id: string;
  cropName: string;
  growthStage: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  riskName: string;
  whyRiskExists: string;
  symptomsToMonitor: string[];
  preventiveAction: string[];
  whenToScanAgain: string;
  contributingFactors: {
    weatherCondition: string;
    temperatureC: number;
    humidityPercent: number;
    rainfallChance: number;
  };
}

// 5. Crop Recommendation
export interface CropRecommendationInput {
  location: string;
  soilPh: number;
  soilEc?: number;
  soilNpk?: "Low" | "Medium" | "High";
  waterAvailability: "Abundant" | "Moderate" | "Scarce / Rainfed";
  season: "Kharif (Monsoon)" | "Rabi (Winter)" | "Zaid (Summer)";
  landSizeAcres: number;
  irrigationType: "Canal" | "Drip" | "Sprinkler" | "Borewell / Flood" | "Rainfed";
}

export interface RecommendedCrop {
  id: string;
  cropName: string;
  cropIcon: string;
  suitabilityScorePercent: number;
  suitabilityRating: "Highly Suitable" | "Suitable" | "Moderate";
  waterRequirement: "Low" | "Medium" | "High";
  approxGrowingPeriod: string;
  generalMarketPotential: string;
  mainRisks: string[];
  whySuitable: string;
  keyManagementTips: string[];
}

// 6. Market Price Assistant
export interface MarketCropBenchmark {
  cropName: string;
  cropIcon: string;
  mspGovernment2024_2025?: number; // Real GOI MSP in Rs/quintal
  mspUnit?: string;
  category: "Cereals" | "Pulses" | "Commercial" | "Spices & Vegetables" | "Oilseeds";
  qualitySpecifications: string;
  optimalSellingWindow: string;
  storageTips: string;
}

export interface MarketPriceRecord {
  marketName: string;
  district: string;
  state: string;
  crop: string;
  price: number | null; // null when live data is unavailable
  unit: string;
  dataTimestamp: string;
  isLiveFeedAvailable: boolean;
  statusMessage: string;
}

// 7. Government Schemes
export interface GovernmentScheme {
  id: string;
  name: string;
  shortCode: string;
  purpose: string;
  basicEligibility: string[];
  benefits: string;
  officialSource: string;
  officialPortalUrl: string;
  howToApply: string[];
  applicableStates: string[]; // "All India" or specific states
  applicableCategories: string[]; // "Small/Marginal", "Women", "All Farmers", etc.
  applicableActivities: string[]; // "Financial", "Irrigation", "Insurance", "Mechanization", "Organic", "Solar"
}
