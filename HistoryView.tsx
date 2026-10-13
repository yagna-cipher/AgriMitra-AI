import React, { useState } from "react";
import { LanguageCode, DiagnosisResult } from "../types";
import { TRANSLATIONS } from "../i18n/languages";
import { History, Calendar, CheckCircle2, ChevronRight, Sparkles, Image as ImageIcon, AlertTriangle } from "lucide-react";

interface HistoryViewProps {
  history: DiagnosisResult[];
  currentLanguage: LanguageCode;
  onSelectDiagnosis: (diag: DiagnosisResult) => void;
  onOpenScanCrop: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  currentLanguage,
  onSelectDiagnosis,
  onOpenScanCrop,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [selectedTimelineStage, setSelectedTimelineStage] = useState<"day1" | "day7" | "day14">("day1");

  // Sample timeline progression mock for Rice BPH
  const timelineData = {
    crop: "Rice / Paddy (వరి)",
    issue: "Brown Planthopper (BPH / సుడిదోమ)",
    day1: {
      title: "Day 1: Initial Outbreak & Hopper Burn",
      date: "Aug 14, 2026",
      symptoms: "Circular drying patches, high nymph clusters at tiller base, stagnant water in field.",
      actionsTaken: "Drained standing water, opened 30 cm alleys, applied base directed spray.",
      imageUrl: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80",
      status: "Severe Outbreak",
      statusColor: "bg-red-100 text-red-800"
    },
    day7: {
      title: "Day 7: Population Suppression & Predator Recovery",
      date: "Aug 21, 2026",
      symptoms: "Hopper count dropped to <2 per hill. Spiders actively foraging in alleyways. No new yellowing circles.",
      actionsTaken: "Maintained alternate wetting and drying (AWD), top-dressed Potash.",
      imageUrl: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
      status: "Under Control",
      statusColor: "bg-amber-100 text-amber-900"
    },
    day14: {
      title: "Day 14: Canopy Regrowth & Grain Filling",
      date: "Aug 28, 2026",
      symptoms: "Fresh green tillers emerging, panicles developing normally without sucking damage.",
      actionsTaken: "Final pre-harvest monitoring.",
      imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
      status: "Full Recovery",
      statusColor: "bg-emerald-100 text-emerald-800"
    }
  };

  const activeStageData = timelineData[selectedTimelineStage] || timelineData.day1;

  return (
    <div id="history-section" className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Banner */}
      <div className="bg-emerald-800 rounded-3xl p-5 sm:p-7 text-white shadow-sm space-y-2">
        <div className="inline-flex items-center space-x-2 bg-emerald-700/80 text-emerald-100 text-xs px-3 py-1 rounded-full border border-emerald-500/40">
          <History className="w-3.5 h-3.5 text-amber-300" />
          <span>Timeline Tracking & Past Records</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black">{t.history}</h2>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl">
          {currentLanguage === "te"
            ? "మీ పంట గత రోగ నిర్ధారణలు మరియు 1వ రోజు నుండి 14వ రోజు వరకు రికవరీ పురోగతి పోలిక."
            : "Review previous diagnosis history and track visual Day 1 to Day 14 field recovery comparisons."}
        </p>
      </div>

      {/* 🌟 Day 1 vs Day 7 vs Day 14 Interactive Recovery Comparison */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/90 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Crop Recovery Timeline
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              {timelineData.crop}: {timelineData.issue}
            </h3>
          </div>

          {/* Timeline Selector Buttons */}
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setSelectedTimelineStage("day1")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedTimelineStage === "day1"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Day 1 (Initial)
            </button>
            <button
              onClick={() => setSelectedTimelineStage("day7")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedTimelineStage === "day7"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Day 7 (Rescue)
            </button>
            <button
              onClick={() => setSelectedTimelineStage("day14")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedTimelineStage === "day14"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Day 14 (Recovery)
            </button>
          </div>
        </div>

        {/* Selected Stage Detail Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="rounded-2xl overflow-hidden aspect-4/3 border border-slate-200 shadow-inner relative">
            <img
              src={activeStageData.imageUrl}
              alt={activeStageData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2.5 py-1 rounded-lg font-semibold">
              {activeStageData.date}
            </div>
            <div className={`absolute bottom-2 left-2 text-xs font-bold px-2.5 py-1 rounded-lg ${activeStageData.statusColor}`}>
              {activeStageData.status}
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <h4 className="text-base font-black text-slate-900">{activeStageData.title}</h4>
            
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-700">Observed Condition:</div>
              <p className="text-slate-600 leading-relaxed">{activeStageData.symptoms}</p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1 text-xs text-emerald-950">
              <div className="font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Interventions Implemented:</span>
              </div>
              <p>{activeStageData.actionsTaken}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Records List */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
          All Saved Diagnoses ({history.length}):
        </div>

        <div className="grid grid-cols-1 gap-3">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectDiagnosis(item)}
              className="bg-white hover:bg-emerald-50/40 p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start space-x-3">
                <img
                  src={item.imageUrls[0]}
                  alt={item.cropIdentified}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.cropIdentified}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                    {item.problemDetected}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {item.localizedSummary || item.visibleSymptoms}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                <span className="text-xs font-bold text-emerald-800 flex items-center space-x-1 bg-emerald-100/70 px-3 py-1.5 rounded-xl">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
