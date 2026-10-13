import React, { useState, useEffect } from "react";
import { LanguageCode, FarmerCrop, DiagnosisResult, SoilAnalysisResult, FarmReminder } from "../types";
import { TRANSLATIONS } from "../i18n/languages";
import { FEATURES_I18N } from "../i18n/featuresI18n";
import { calculateFarmHealthScore } from "../utils/farmHealthCalculator";
import { getEarlyWarnings } from "../utils/earlyWarningService";
import { getSavedReminders, toggleReminderCompleted } from "../utils/storage";
import {
  Mic,
  Camera,
  AlertTriangle,
  Sprout,
  CloudRain,
  FlaskConical,
  Droplets,
  Leaf,
  Bug,
  History,
  ChevronRight,
  ShieldAlert,
  Calendar,
  Bell,
  Compass,
  TrendingUp,
  Landmark,
  MessageSquare,
  Activity,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck
} from "lucide-react";

interface HomeDashboardProps {
  currentLanguage: LanguageCode;
  activeCrops: FarmerCrop[];
  latestDiagnosis: DiagnosisResult | null;
  savedSoilReport?: SoilAnalysisResult | null;
  onOpenVoice: () => void;
  onOpenScanCrop: () => void;
  onOpenActionPlan: () => void;
  onOpenMyCrops: () => void;
  onOpenWeather: () => void;
  onOpenSoil: () => void;
  onOpenWater: () => void;
  onOpenNutrition: () => void;
  onOpenPestLibrary: () => void;
  onOpenHistory: () => void;
  onSelectCropForScan: (cropName: string) => void;
  // Upgraded Feature Callbacks
  onOpenFarmHealth: () => void;
  onOpenCropCalendar: () => void;
  onOpenReminders: () => void;
  onOpenEarlyWarning: () => void;
  onOpenCropRecommendation: () => void;
  onOpenMarketPrices: () => void;
  onOpenGovernmentSchemes: () => void;
  onOpenAdvisor: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  currentLanguage,
  activeCrops,
  latestDiagnosis,
  savedSoilReport = null,
  onOpenVoice,
  onOpenScanCrop,
  onOpenActionPlan,
  onOpenMyCrops,
  onOpenWeather,
  onOpenSoil,
  onOpenWater,
  onOpenNutrition,
  onOpenPestLibrary,
  onOpenHistory,
  onSelectCropForScan,
  onOpenFarmHealth,
  onOpenCropCalendar,
  onOpenReminders,
  onOpenEarlyWarning,
  onOpenCropRecommendation,
  onOpenMarketPrices,
  onOpenGovernmentSchemes,
  onOpenAdvisor
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const fI18n = FEATURES_I18N[currentLanguage] || FEATURES_I18N.en;

  // Farm Health composite
  const farmHealth = calculateFarmHealthScore(
    activeCrops,
    latestDiagnosis ? [latestDiagnosis] : [],
    savedSoilReport,
    { tempC: 28, humidity: 78, sprayCondition: "caution", rainChance: 35 }
  );

  // Early Warnings
  const earlyWarnings = getEarlyWarnings(
    activeCrops,
    { tempC: 28, humidity: 82, rainChance: 40, condition: "Humid" },
    latestDiagnosis ? [latestDiagnosis] : []
  );
  const topWarning = earlyWarnings.find((w) => w.riskLevel === "HIGH") || earlyWarnings[0];

  // Today's Reminders
  const [reminders, setReminders] = useState<FarmReminder[]>([]);
  useEffect(() => {
    setReminders(getSavedReminders());
  }, []);

  const todayStr = new Date().toISOString().split("T")[0];
  const todayTasks = reminders.filter((r) => r.date === todayStr);

  const handleToggleTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleReminderCompleted(id);
    setReminders(updated);
  };

  return (
    <div id="home-dashboard" className="space-y-6 pb-20">
      {/* 🚨 Emergency / Urgent Crop Alert Bar if active */}
      {latestDiagnosis?.isUrgentAlert && (
        <div
          onClick={onOpenActionPlan}
          className="bg-red-600 hover:bg-red-700 text-white rounded-3xl p-4 sm:p-5 shadow-sm border border-red-400 cursor-pointer transition flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-2xl shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded">
                  🚨 {t.emergencyAlert}
                </span>
                <span className="text-xs font-semibold text-red-100">
                  {latestDiagnosis.cropIdentified}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black leading-tight mt-0.5">
                {latestDiagnosis.urgentAlertDetails?.title || latestDiagnosis.problemDetected}
              </h3>
            </div>
          </div>

          <span className="text-xs font-bold bg-white text-red-700 px-3 py-1.5 rounded-xl shadow-xs shrink-0 flex items-center space-x-1">
            <span>{t.whatToDoNow}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      )}

      {/* 1. 🌱 AI FARM HEALTH SCORE WIDGET */}
      <div
        id="farm-health-summary-card"
        onClick={onOpenFarmHealth}
        className="bg-emerald-800 rounded-3xl p-5 sm:p-6 text-white shadow-sm border border-emerald-700 cursor-pointer hover:bg-emerald-700 transition"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded-lg bg-emerald-700/80 text-emerald-200">
                <Activity className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                AI Farm Health Monitor
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {fI18n.farmHealth.title}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-lg">
              {fI18n.farmHealth.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0 bg-white/15 px-4 py-3 rounded-2xl border border-white/20">
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider">
                Overall Score
              </span>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {farmHealth.overallScore !== null ? farmHealth.overallScore : "--"}
                </span>
                <span className="text-xs font-semibold text-emerald-200">/ 100</span>
              </div>
              <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-100 border border-emerald-400/30">
                {farmHealth.ratingLabel}
              </span>
            </div>

            <ChevronRight className="w-5 h-5 text-emerald-200" />
          </div>
        </div>

        {/* Breakdown Mini Progress Bar */}
        <div className="mt-4 pt-3 border-t border-emerald-700/50 grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
          <div className="bg-emerald-950/40 rounded-xl p-2">
            <span className="text-[10px] text-emerald-300 block">Crop</span>
            <span className="font-bold text-emerald-100">{farmHealth.breakdown.cropHealth.score ?? "N/A"}</span>
          </div>
          <div className="bg-emerald-950/40 rounded-xl p-2">
            <span className="text-[10px] text-emerald-300 block">Soil</span>
            <span className="font-bold text-emerald-100">{farmHealth.breakdown.soilHealth.score ?? "N/A"}</span>
          </div>
          <div className="bg-emerald-950/40 rounded-xl p-2">
            <span className="text-[10px] text-emerald-300 block">Water</span>
            <span className="font-bold text-emerald-100">{farmHealth.breakdown.waterIrrigation.score ?? "N/A"}</span>
          </div>
          <div className="bg-emerald-950/40 rounded-xl p-2">
            <span className="text-[10px] text-emerald-300 block">Weather</span>
            <span className="font-bold text-emerald-100">{farmHealth.breakdown.weatherRisk.score ?? "N/A"}</span>
          </div>
          <div className="bg-emerald-950/40 rounded-xl p-2">
            <span className="text-[10px] text-emerald-300 block">Pest Risk</span>
            <span className="font-bold text-emerald-100">{farmHealth.breakdown.pestDiseaseRisk.score ?? "N/A"}</span>
          </div>
          <div className="bg-emerald-950/40 rounded-xl p-2">
            <span className="text-[10px] text-emerald-300 block">Nutrition</span>
            <span className="font-bold text-emerald-100">{farmHealth.breakdown.nutrition.score ?? "N/A"}</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Quick Voice & Scan Launcher */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 🎙️ Ask AI by Voice (Big Primary Button) */}
        <button
          id="hero-voice-assistant-btn"
          onClick={onOpenVoice}
          className="bg-emerald-800 hover:bg-emerald-700 text-white rounded-3xl p-6 sm:p-7 shadow-sm border border-emerald-700 text-left transition relative overflow-hidden flex flex-col justify-between min-h-[170px]"
        >
          <div className="flex items-start justify-between">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center shadow-md">
              <Mic className="w-8 h-8 transition" />
            </div>
            <span className="bg-emerald-700/80 text-emerald-100 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/40">
              🎙️ 10 Languages
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">{t.voiceAssistant}</h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
              {currentLanguage === "te"
                ? "మీ భాషలో మాట్లాడండి — తక్షణ వ్యవసాయ సలహా పొందండి"
                : currentLanguage === "hi"
                ? "अपनी भाषा में बोलें — तुरंत कृषि सलाह पाएं"
                : "Speak in your local language — get instant voice farming advice"}
            </p>
          </div>
        </button>

        {/* 📷 Scan My Crop (Camera / Vision Diagnosis) */}
        <button
          id="hero-scan-crop-btn"
          onClick={onOpenScanCrop}
          className="bg-teal-800 hover:bg-teal-700 text-white rounded-3xl p-6 sm:p-7 shadow-sm border border-teal-700 text-left transition relative overflow-hidden flex flex-col justify-between min-h-[170px]"
        >
          <div className="flex items-start justify-between">
            <div className="w-14 h-14 rounded-2xl bg-emerald-400 text-teal-950 flex items-center justify-center shadow-md">
              <Camera className="w-8 h-8 transition" />
            </div>
            <span className="bg-teal-700/80 text-teal-100 text-[11px] font-bold px-2.5 py-1 rounded-full border border-teal-500/40">
              ⚡ Vision AI
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">{t.scanCrop}</h3>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1">
              {currentLanguage === "te"
                ? "ఆకు లేదా పురుగు ఫోటో తీయండి — రోగం & నివారణ పొందండి"
                : currentLanguage === "hi"
                ? "पत्ती या कीट की फोटो खींचें — तुरंत समाधान पाएं"
                : "Snap photo of leaf or pest — get immediate diagnosis and IPM plan"}
            </p>
          </div>
        </button>
      </div>

      {/* 3. 🛡️ EARLY PEST & DISEASE WARNING BANNER */}
      {topWarning && (
        <div
          onClick={onOpenEarlyWarning}
          className="bg-amber-50 border border-amber-300 rounded-3xl p-4 sm:p-5 shadow-xs cursor-pointer hover:border-amber-400 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 bg-amber-500 text-white rounded-2xl shrink-0 mt-0.5 shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 uppercase tracking-wider">
                  ⚠️ {topWarning.riskLevel} Pest Risk
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  {topWarning.cropName} ({topWarning.growthStage})
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {topWarning.riskName}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                {topWarning.whyRiskExists}
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-3 py-1.5 rounded-xl shrink-0 flex items-center space-x-1 w-fit">
            <span>View Advisory</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      )}

      {/* 4. 🔔 TODAY'S SMART FARM REMINDERS (If any) */}
      {todayTasks.length > 0 && (
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-emerald-700" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Today's Farm Schedule ({todayTasks.length})
              </h3>
            </div>
            <button
              onClick={onOpenReminders}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
            >
              <span>Manage Reminders</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              >
                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={(e) => handleToggleTask(task.id, e)}
                    className="text-slate-400 hover:text-emerald-600"
                  >
                    {task.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                  <span
                    className={`font-semibold ${
                      task.isCompleted ? "line-through text-slate-400" : "text-slate-800"
                    }`}
                  >
                    {task.taskName}
                  </span>
                  <span className="text-[10px] text-slate-400">({task.cropOrField})</span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{task.time}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. 🚨 What Should I Do Now? Action Banner */}
      <div
        id="home-action-plan-banner"
        onClick={onOpenActionPlan}
        className="bg-amber-500 hover:bg-amber-400 text-emerald-950 rounded-3xl p-5 sm:p-6 shadow-md border border-amber-400/80 cursor-pointer transition flex items-center justify-between"
      >
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-amber-400 flex items-center justify-center font-black text-xl shrink-0">
            🚨
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-950/20 px-2 py-0.5 rounded">
              Farmer Action Protocol
            </span>
            <h3 className="text-base sm:text-lg font-black leading-tight mt-0.5">
              {t.whatToDoNow}
            </h3>
            <p className="text-xs text-emerald-950/80 mt-0.5">
              Right Now • Next 24 Hours • Next 7 Days • Expert Help
            </p>
          </div>
        </div>

        <span className="p-2.5 bg-emerald-950 text-white rounded-2xl shrink-0 shadow-xs">
          <ChevronRight className="w-5 h-5" />
        </span>
      </div>

      {/* 6. 🌟 ADVANCED AGRI-MITRA UPGRADE TOOLS (New Feature Suite) */}
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1 flex items-center justify-between">
          <span>AI Farm Management & Planning</span>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            ✨ Upgraded
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* A. Crop Calendar */}
          <button
            onClick={onOpenCropCalendar}
            className="bg-white hover:bg-emerald-50/50 p-4 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between min-h-[125px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                {fI18n.cropCalendar.title}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                Sowing to Harvest
              </p>
            </div>
          </button>

          {/* B. Smart Reminders */}
          <button
            onClick={onOpenReminders}
            className="bg-white hover:bg-amber-50/50 p-4 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between min-h-[125px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                {fI18n.reminders.title}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                Irrigate, Spray, Doses
              </p>
            </div>
          </button>

          {/* C. Crop Recommendation */}
          <button
            onClick={onOpenCropRecommendation}
            className="bg-white hover:bg-teal-50/50 p-4 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between min-h-[125px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                {fI18n.cropRecommendation.title}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                Soil & Season Match
              </p>
            </div>
          </button>

          {/* D. Early Warnings */}
          <button
            onClick={onOpenEarlyWarning}
            className="bg-white hover:bg-orange-50/50 p-4 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between min-h-[125px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                {fI18n.earlyWarning.title}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                Predictive Pest Risk
              </p>
            </div>
          </button>

          {/* E. Market Price Assistant & MSP */}
          <button
            onClick={onOpenMarketPrices}
            className="bg-white hover:bg-indigo-50/50 p-4 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between min-h-[125px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                {fI18n.market.title}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                Govt MSP Benchmarks
              </p>
            </div>
          </button>

          {/* F. Government Schemes */}
          <button
            onClick={onOpenGovernmentSchemes}
            className="bg-white hover:bg-purple-50/50 p-4 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between min-h-[125px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                {fI18n.schemes.title}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                Subsidies & Portals
              </p>
            </div>
          </button>

          {/* G. AI Farm Advisor */}
          <button
            onClick={onOpenAdvisor}
            className="bg-white hover:bg-emerald-50/50 p-4 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between min-h-[125px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                {fI18n.advisor.title}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                Ask Questions & Audio
              </p>
            </div>
          </button>

          {/* H. Farm Health Detail */}
          <button
            onClick={onOpenFarmHealth}
            className="bg-white hover:bg-emerald-50/50 p-4 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between min-h-[125px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                {fI18n.farmHealth.overallScore}
              </h4>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                6-Vector Diagnostics
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 7. Primary Core Agricultural Field Tools (Original 6 Cards Preserved Intact) */}
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">
          Field & Agronomy Tools
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* 1. My Crops */}
          <button
            onClick={onOpenMyCrops}
            className="bg-white hover:bg-emerald-50/50 p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between min-h-[125px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                {t.myCrops}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {activeCrops.length} Active Fields
              </p>
            </div>
          </button>

          {/* 2. Weather & Spray Advisory */}
          <button
            onClick={onOpenWeather}
            className="bg-white hover:bg-sky-50/50 p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between min-h-[125px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center">
              <CloudRain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                {t.weather}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Spray Advisory Index
              </p>
            </div>
          </button>

          {/* 3. Soil & Fertility */}
          <button
            onClick={onOpenSoil}
            className="bg-white hover:bg-teal-50/50 p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between min-h-[125px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                {t.soil}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Soil Card & NPK Doctor
              </p>
            </div>
          </button>

          {/* 4. Water & Irrigation */}
          <button
            onClick={onOpenWater}
            className="bg-white hover:bg-blue-50/50 p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between min-h-[125px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                {t.water}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Waterlogging & Drainage
              </p>
            </div>
          </button>

          {/* 5. Nutrient & Leaf Doctor */}
          <button
            onClick={onOpenNutrition}
            className="bg-white hover:bg-amber-50/50 p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between min-h-[125px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                {t.nutrition}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Yellowing & Foliar Spray
              </p>
            </div>
          </button>

          {/* 6. Pest & Disease Library */}
          <button
            onClick={onOpenPestLibrary}
            className="bg-white hover:bg-rose-50/50 p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between min-h-[125px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center">
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                {t.pestLibrary}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Directory & IPM Guides
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 8. Active Farm Fields List */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xs border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center space-x-2">
            <Sprout className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-sm sm:text-base text-slate-800">My Cultivated Crops</h3>
          </div>
          <button
            onClick={onOpenMyCrops}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
          >
            <span>Manage All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {activeCrops.map((crop) => (
            <div
              key={crop.id}
              onClick={() => onSelectCropForScan(crop.name)}
              className="p-3.5 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-200/80 transition cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">{crop.icon}</span>
                <div>
                  <div className="font-bold text-xs text-slate-800">{crop.name}</div>
                  <div className="text-[10px] text-slate-400">{crop.growthStage} • {crop.areaAcres} Ac</div>
                </div>
              </div>
              <Camera className="w-4 h-4 text-emerald-700" />
            </div>
          ))}
        </div>
      </div>

      {/* 9. Past Diagnoses Quick Strip */}
      <div className="flex items-center justify-between p-4 bg-slate-100 rounded-2xl text-xs text-slate-700">
        <div className="flex items-center space-x-2">
          <History className="w-4 h-4 text-emerald-700" />
          <span className="font-semibold">Track Day 1 to Day 14 Recovery Timeline</span>
        </div>
        <button
          onClick={onOpenHistory}
          className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center space-x-1"
        >
          <span>View History</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
