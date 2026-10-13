import React, { useState, useEffect } from "react";
import { LanguageCode, DiagnosisResult, FarmerCrop, SoilAnalysisResult } from "./types";
import { TRANSLATIONS } from "./i18n/languages";
import { DEMO_CASES } from "./data/demoData";
import {
  getSavedLanguage,
  saveLanguage,
  getSavedHistory,
  addDiagnosisToHistory,
  getSavedCrops,
  saveCrops,
  isOnboardingCompleted,
  setOnboardingCompleted,
  getSavedApiKey,
  getSavedSoilReport
} from "./utils/storage";

// Components
import { Navbar } from "./components/Navbar";
import { HomeDashboard } from "./components/HomeDashboard";
import { ScanCropView } from "./components/ScanCropView";
import { DiagnosisResultView } from "./components/DiagnosisResultView";
import { ActionPlanView } from "./components/ActionPlanView";
import { VoiceAssistantModal } from "./components/VoiceAssistantModal";
import { SoilHealthView } from "./components/SoilHealthView";
import { WaterCheckView } from "./components/WaterCheckView";
import { CropHealthView } from "./components/CropHealthView";
import { PestDiseaseLibraryView } from "./components/PestDiseaseLibraryView";
import { WeatherWidget } from "./components/WeatherWidget";
import { HistoryView } from "./components/HistoryView";
import { MyCropsManager } from "./components/MyCropsManager";
import { OnboardingModal } from "./components/OnboardingModal";
import { ApiKeySettingsModal } from "./components/ApiKeySettingsModal";

// Upgraded Agri Mitra Advanced Features
import { FarmHealthView } from "./components/FarmHealthView";
import { CropCalendarView } from "./components/CropCalendarView";
import { RemindersView } from "./components/RemindersView";
import { EarlyWarningView } from "./components/EarlyWarningView";
import { CropRecommendationView } from "./components/CropRecommendationView";
import { MarketPriceView } from "./components/MarketPriceView";
import { GovernmentSchemesView } from "./components/GovernmentSchemesView";
import { AskAgriMitraView } from "./components/AskAgriMitraView";

// Icons
import {
  Home,
  Camera,
  AlertTriangle,
  Mic,
  Sprout,
  Menu,
  X,
  History as HistoryIcon,
  CloudRain,
  FlaskConical,
  Droplets,
  Leaf,
  Bug,
  Key
} from "lucide-react";

type ActiveTab =
  | "home"
  | "scan"
  | "diagnosis_result"
  | "action_plan"
  | "crops"
  | "weather"
  | "soil"
  | "water"
  | "nutrition"
  | "pest_library"
  | "history"
  | "farm_health"
  | "crop_calendar"
  | "reminders"
  | "early_warning"
  | "crop_recommendation"
  | "market_prices"
  | "government_schemes"
  | "ask_advisor";

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(getSavedLanguage());
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(!isOnboardingCompleted());
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(!!getSavedApiKey());
  const [savedSoilReport, setSavedSoilReport] = useState<SoilAnalysisResult | null>(getSavedSoilReport());

  useEffect(() => {
    setHasApiKey(!!getSavedApiKey());
  }, [showSettingsModal]);

  // Data states
  const [activeCrops, setActiveCrops] = useState<FarmerCrop[]>(getSavedCrops());
  const [diagnosisHistory, setDiagnosisHistory] = useState<DiagnosisResult[]>(getSavedHistory());
  const [currentDiagnosis, setCurrentDiagnosis] = useState<DiagnosisResult | null>(
    diagnosisHistory[0] || DEMO_CASES[0]
  );

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const handleLanguageChange = (newLang: LanguageCode) => {
    setCurrentLanguage(newLang);
    saveLanguage(newLang);
  };

  const handleOnboardingComplete = () => {
    setOnboardingCompleted(true);
    setShowOnboarding(false);
  };

  const handleDiagnosisComplete = (newDiag: DiagnosisResult) => {
    const updated = addDiagnosisToHistory(newDiag);
    setDiagnosisHistory(updated);
    setCurrentDiagnosis(newDiag);
    setActiveTab("diagnosis_result");
  };

  const handleSelectDemoCase = (demoId: string) => {
    const demo = DEMO_CASES.find((d) => d.id === demoId) || DEMO_CASES[0];
    setCurrentDiagnosis(demo);
    setActiveTab("diagnosis_result");
  };

  const handleUpdateCrops = (crops: FarmerCrop[]) => {
    setActiveCrops(crops);
    saveCrops(crops);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased overflow-x-hidden">
      
      {/* 1. Header Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onOpenVoice={() => setIsVoiceOpen(true)}
        onSelectDemoCase={handleSelectDemoCase}
        onOpenSettings={() => setShowSettingsModal(true)}
      />

      {/* Optional Top API Key Banner if not configured */}
      {!hasApiKey && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-emerald-950 shrink-0" />
            <span>
              {currentLanguage === "te"
                ? "లైవ్ AI వాయిస్ & ఫోటో విశ్లేషణ కోసం మీ Gemini API Key ని సెట్ చేసుకోండి."
                : "Configure your Gemini API Key for direct AI Voice Assistant & Vision Diagnosis."}
            </span>
          </div>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="ml-3 px-2.5 py-1 bg-emerald-900 hover:bg-emerald-950 text-amber-200 text-xs font-bold rounded-lg transition shrink-0"
          >
            {currentLanguage === "te" ? "సెట్టింగ్స్" : "Set API Key"}
          </button>
        </div>
      )}

      {/* 2. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-6 sm:pb-8">
        
        {/* Navigation Breadcrumb / Section Header for sub-tabs */}
        {activeTab !== "home" && (
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
              <button
                onClick={() => setActiveTab("home")}
                className="hover:text-emerald-800 flex items-center space-x-1 font-bold text-slate-700"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <span>/</span>
              <span className="text-emerald-900 font-semibold uppercase tracking-wider text-[11px]">
                {activeTab.replace("_", " ")}
              </span>
            </div>

            <button
              onClick={() => setActiveTab("home")}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
            >
              ✕ Close
            </button>
          </div>
        )}

        {/* Home Screen */}
        {activeTab === "home" && (
          <HomeDashboard
            currentLanguage={currentLanguage}
            activeCrops={activeCrops}
            latestDiagnosis={currentDiagnosis}
            savedSoilReport={savedSoilReport}
            onOpenVoice={() => setIsVoiceOpen(true)}
            onOpenScanCrop={() => setActiveTab("scan")}
            onOpenActionPlan={() => setActiveTab("action_plan")}
            onOpenMyCrops={() => setActiveTab("crops")}
            onOpenWeather={() => setActiveTab("weather")}
            onOpenSoil={() => setActiveTab("soil")}
            onOpenWater={() => setActiveTab("water")}
            onOpenNutrition={() => setActiveTab("nutrition")}
            onOpenPestLibrary={() => setActiveTab("pest_library")}
            onOpenHistory={() => setActiveTab("history")}
            onSelectCropForScan={(cropName) => {
              setActiveTab("scan");
            }}
            onOpenFarmHealth={() => setActiveTab("farm_health")}
            onOpenCropCalendar={() => setActiveTab("crop_calendar")}
            onOpenReminders={() => setActiveTab("reminders")}
            onOpenEarlyWarning={() => setActiveTab("early_warning")}
            onOpenCropRecommendation={() => setActiveTab("crop_recommendation")}
            onOpenMarketPrices={() => setActiveTab("market_prices")}
            onOpenGovernmentSchemes={() => setActiveTab("government_schemes")}
            onOpenAdvisor={() => setActiveTab("ask_advisor")}
          />
        )}

        {/* Scan & Vision Diagnosis Screen */}
        {activeTab === "scan" && (
          <ScanCropView
            currentLanguage={currentLanguage}
            activeCrops={activeCrops}
            onDiagnosisComplete={handleDiagnosisComplete}
            onOpenVoice={() => setIsVoiceOpen(true)}
          />
        )}

        {/* Full Diagnosis Result View */}
        {activeTab === "diagnosis_result" && currentDiagnosis && (
          <DiagnosisResultView
            diagnosis={currentDiagnosis}
            currentLanguage={currentLanguage}
            onBack={() => setActiveTab("home")}
            onOpenActionPlan={() => setActiveTab("action_plan")}
            onOpenScanCrop={() => setActiveTab("scan")}
            onOpenVoice={() => setIsVoiceOpen(true)}
          />
        )}

        {/* 🚨 What Should I Do Now? Action Plan */}
        {activeTab === "action_plan" && (
          <ActionPlanView
            diagnosis={currentDiagnosis}
            allDiagnoses={diagnosisHistory}
            onSelectDiagnosis={(d) => setCurrentDiagnosis(d)}
            currentLanguage={currentLanguage}
            onBack={() => setActiveTab("home")}
          />
        )}

        {/* My Crops */}
        {activeTab === "crops" && (
          <MyCropsManager
            crops={activeCrops}
            onUpdateCrops={handleUpdateCrops}
            currentLanguage={currentLanguage}
            onOpenScanCropForCrop={(cropName) => {
              setActiveTab("scan");
            }}
          />
        )}

        {/* Weather & Spraying Advisory */}
        {activeTab === "weather" && (
          <WeatherWidget currentLanguage={currentLanguage} />
        )}

        {/* Soil Health Assistant */}
        {activeTab === "soil" && (
          <SoilHealthView currentLanguage={currentLanguage} />
        )}

        {/* Water & Irrigation Diagnoser */}
        {activeTab === "water" && (
          <WaterCheckView currentLanguage={currentLanguage} />
        )}

        {/* Nutrient & Leaf Doctor */}
        {activeTab === "nutrition" && (
          <CropHealthView currentLanguage={currentLanguage} />
        )}

        {/* Pest & Disease Library */}
        {activeTab === "pest_library" && (
          <PestDiseaseLibraryView currentLanguage={currentLanguage} />
        )}

        {/* History & Timeline Tracker */}
        {activeTab === "history" && (
          <HistoryView
            history={diagnosisHistory}
            currentLanguage={currentLanguage}
            onSelectDiagnosis={(diag) => {
              setCurrentDiagnosis(diag);
              setActiveTab("diagnosis_result");
            }}
            onOpenScanCrop={() => setActiveTab("scan")}
          />
        )}

        {/* 🌟 UPGRADED NEW MODULES */}
        {/* AI Farm Health Score */}
        {activeTab === "farm_health" && (
          <FarmHealthView
            currentLanguage={currentLanguage}
            crops={activeCrops}
            diagnoses={diagnosisHistory}
            savedSoilReport={savedSoilReport}
            onOpenScanCrop={() => setActiveTab("scan")}
            onOpenSoil={() => setActiveTab("soil")}
            onOpenWater={() => setActiveTab("water")}
            onOpenWeather={() => setActiveTab("weather")}
          />
        )}

        {/* Crop Calendar */}
        {activeTab === "crop_calendar" && (
          <CropCalendarView currentLanguage={currentLanguage} />
        )}

        {/* Smart Farm Reminders */}
        {activeTab === "reminders" && (
          <RemindersView
            currentLanguage={currentLanguage}
            activeCrops={activeCrops}
          />
        )}

        {/* Early Pest & Disease Warning */}
        {activeTab === "early_warning" && (
          <EarlyWarningView
            currentLanguage={currentLanguage}
            activeCrops={activeCrops}
            diagnoses={diagnosisHistory}
            onOpenScanCrop={() => setActiveTab("scan")}
          />
        )}

        {/* What Should I Grow? Crop Recommendation */}
        {activeTab === "crop_recommendation" && (
          <CropRecommendationView currentLanguage={currentLanguage} />
        )}

        {/* Market Prices & Government MSP */}
        {activeTab === "market_prices" && (
          <MarketPriceView currentLanguage={currentLanguage} />
        )}

        {/* Government Scheme Finder */}
        {activeTab === "government_schemes" && (
          <GovernmentSchemesView currentLanguage={currentLanguage} />
        )}

        {/* Ask Agri Mitra AI Farm Advisor */}
        {activeTab === "ask_advisor" && (
          <AskAgriMitraView
            currentLanguage={currentLanguage}
            activeCrops={activeCrops}
            onOpenScanCrop={() => setActiveTab("scan")}
          />
        )}
      </main>

      {/* 3. Floating Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        currentLanguage={currentLanguage}
        activeCrops={activeCrops}
        onOpenScanCrop={() => {
          setIsVoiceOpen(false);
          setActiveTab("scan");
        }}
        onOpenActionPlan={() => {
          setIsVoiceOpen(false);
          setActiveTab("action_plan");
        }}
      />

      {/* 4. Onboarding Language Selection Modal for First-Time Users */}
      <OnboardingModal
        isOpen={showOnboarding}
        selectedLanguage={currentLanguage}
        onSelectLanguage={handleLanguageChange}
        onComplete={handleOnboardingComplete}
      />

      {/* 5. Mobile-First Bottom Navigation Bar in normal document flow */}
      <nav id="mobile-bottom-nav" className="z-30 bg-white border-t border-slate-200/90 shadow-xs px-2 py-2 flex items-center justify-around sm:hidden">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition ${
            activeTab === "home" ? "text-emerald-800 font-bold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t.home}</span>
        </button>

        <button
          onClick={() => setActiveTab("scan")}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition ${
            activeTab === "scan" ? "text-emerald-800 font-bold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Camera className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t.scanCrop}</span>
        </button>

        {/* Central Prominent Voice Assistant Button */}
        <button
          onClick={() => setIsVoiceOpen(true)}
          className="w-10 h-10 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-md border-2 border-white transition"
        >
          <Mic className="w-5 h-5 text-amber-300" />
        </button>

        <button
          onClick={() => setActiveTab("action_plan")}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition ${
            activeTab === "action_plan" ? "text-amber-700 font-bold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <span className="text-[10px] mt-0.5">Action Plan</span>
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition ${
            activeTab === "history" ? "text-emerald-800 font-bold" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <HistoryIcon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{t.history}</span>
        </button>
      </nav>

      {/* API Key Settings Modal */}
      <ApiKeySettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onKeyUpdated={(has) => setHasApiKey(has)}
      />
    </div>
  );
}
