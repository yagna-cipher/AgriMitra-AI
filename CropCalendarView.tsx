import React, { useState } from "react";
import { LanguageCode, CropCalendarPlan } from "../types";
import { generateCropCalendarPlan, CROP_CALENDAR_TEMPLATES } from "../data/cropCalendarData";
import { FEATURES_I18N } from "../i18n/featuresI18n";
import {
  Calendar,
  Clock,
  Droplets,
  Sparkles,
  Bug,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Info,
  CalendarDays,
  Sprout
} from "lucide-react";

interface CropCalendarViewProps {
  currentLanguage: LanguageCode;
}

export const CropCalendarView: React.FC<CropCalendarViewProps> = ({ currentLanguage }) => {
  const i18n = FEATURES_I18N[currentLanguage]?.cropCalendar || FEATURES_I18N.en.cropCalendar;

  const [selectedCropKey, setSelectedCropKey] = useState<string>("paddy");
  const [variety, setVariety] = useState<string>("BPT 5204 (Samba Mahsuri)");
  const [location, setLocation] = useState<string>("Andhra Pradesh / Telangana");
  const [sowingDate, setSowingDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [irrigationMethod, setIrrigationMethod] = useState<string>("Canal / Drip");
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);

  // Generate calendar plan dynamically based on user selections
  const calendarPlan: CropCalendarPlan = generateCropCalendarPlan(
    selectedCropKey,
    variety,
    location,
    sowingDate,
    irrigationMethod
  );

  const activeStage = calendarPlan.stages[selectedStageIndex] || calendarPlan.stages[0];

  const handleCropChange = (cropKey: string) => {
    setSelectedCropKey(cropKey);
    const tmpl = CROP_CALENDAR_TEMPLATES[cropKey];
    if (tmpl) {
      setVariety(tmpl.defaultVariety);
    }
    setSelectedStageIndex(0);
  };

  return (
    <div id="crop-calendar-view" className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-800 rounded-2xl p-5 sm:p-6 text-white shadow-sm">
        <div className="flex items-center space-x-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-emerald-200">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase tracking-wider text-emerald-200 font-bold">
            Agronomic Timeline & Growth Stages
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold">{i18n.title}</h1>
        <p className="text-emerald-100/90 text-xs sm:text-sm mt-1 max-w-xl">
          {i18n.subtitle}
        </p>
      </div>

      {/* Input Selection Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center space-x-1.5">
          <CalendarDays className="w-3.5 h-3.5 text-emerald-600" />
          <span>Crop & Sowing Settings</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {i18n.selectCrop}
            </label>
            <select
              value={selectedCropKey}
              onChange={(e) => handleCropChange(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="paddy">🌾 Rice / Paddy (వరి)</option>
              <option value="chilli">🌶️ Chilli / Mirchi (మిరప)</option>
              <option value="cotton">🌱 Cotton (పత్తి)</option>
              <option value="tomato">🍅 Tomato (టమాటా)</option>
            </select>
          </div>

          {/* Sowing Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {i18n.sowingDate}
            </label>
            <input
              type="date"
              value={sowingDate}
              onChange={(e) => setSowingDate(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Variety */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {i18n.variety} (Optional)
            </label>
            <input
              type="text"
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              placeholder="e.g. BPT 5204 / Teja"
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Irrigation Method */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {i18n.irrigationMethod}
            </label>
            <select
              value={irrigationMethod}
              onChange={(e) => setIrrigationMethod(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="Drip Irrigation">💧 Drip Irrigation</option>
              <option value="Canal / Flood">🌊 Canal / Flood Irrigation</option>
              <option value="Sprinkler">🚿 Sprinkler Irrigation</option>
              <option value="Rainfed / Dryland">🌧️ Rainfed / Monsoon</option>
            </select>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Estimated Crop Cycle: <strong className="text-emerald-800 font-bold">{calendarPlan.totalDurationDays} Days</strong></span>
          <span className="text-[11px] text-slate-400">Dates adjust dynamically based on sowing date</span>
        </div>
      </div>

      {/* Timeline Stages Navigator */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          {i18n.timeline} ({calendarPlan.stages.length} Stages)
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {calendarPlan.stages.map((stage, idx) => {
            const isSelected = selectedStageIndex === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageIndex(idx)}
                className={`p-3 rounded-xl border text-left transition relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                    : "bg-slate-50/70 border-slate-200 hover:bg-slate-100/80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl">{stage.stageIcon}</span>
                    {stage.status === "completed" && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        ✓ Done
                      </span>
                    )}
                    {stage.status === "active" && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                        ● Active
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 line-clamp-1">
                    {stage.stageName.split("(")[0]}
                  </h3>
                </div>

                <div className="mt-2 pt-1 border-t border-slate-200/60 text-[10px] text-slate-500">
                  <span>Days {stage.approxStartDay}-{stage.approxEndDay}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Stage Card */}
      {activeStage && (
        <div className="bg-white rounded-2xl border border-emerald-200 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                {activeStage.stageIcon}
              </span>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  Stage {selectedStageIndex + 1} of {calendarPlan.stages.length}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-800">
                  {activeStage.stageName}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg shrink-0">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>
                {activeStage.startDateFormatted} — {activeStage.endDateFormatted} (Day {activeStage.approxStartDay} to {activeStage.approxEndDay})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {/* Irrigation */}
            <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs uppercase tracking-wider mb-2">
                <Droplets className="w-4 h-4 text-blue-600" />
                <span>{i18n.irrigation}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {activeStage.irrigationGuidance}
              </p>
            </div>

            {/* Nutrition */}
            <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-100">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{i18n.nutrition}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {activeStage.nutritionGuidance}
              </p>
            </div>

            {/* Pest Monitoring */}
            <div className="bg-rose-50/60 rounded-xl p-4 border border-rose-100">
              <div className="flex items-center space-x-2 text-rose-900 font-bold text-xs uppercase tracking-wider mb-2">
                <Bug className="w-4 h-4 text-rose-600" />
                <span>{i18n.pestMonitoring}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {activeStage.pestDiseaseMonitoring}
              </p>
            </div>
          </div>

          {/* Important Stage Activities */}
          <div className="mt-5 bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Field Activities for this Stage</span>
            </h3>
            <ul className="space-y-2">
              {activeStage.importantActivities.map((act, i) => (
                <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Mandatory Disclaimer */}
      <div className="bg-slate-100 border border-slate-300/80 rounded-xl p-3.5 flex items-start space-x-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {calendarPlan.disclaimer}
        </p>
      </div>
    </div>
  );
};
