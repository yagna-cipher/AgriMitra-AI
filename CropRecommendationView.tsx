import React, { useState } from "react";
import { LanguageCode, CropRecommendationInput, RecommendedCrop } from "../types";
import { recommendCrops } from "../data/cropRecommendationData";
import { FEATURES_I18N } from "../i18n/featuresI18n";
import {
  Compass,
  Sprout,
  Droplets,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Info,
  Sparkles
} from "lucide-react";

interface CropRecommendationViewProps {
  currentLanguage: LanguageCode;
}

export const CropRecommendationView: React.FC<CropRecommendationViewProps> = ({
  currentLanguage
}) => {
  const i18n = FEATURES_I18N[currentLanguage]?.cropRecommendation || FEATURES_I18N.en.cropRecommendation;

  const [location, setLocation] = useState("Andhra Pradesh / Telangana");
  const [soilPh, setSoilPh] = useState<number>(6.8);
  const [waterAvailability, setWaterAvailability] = useState<"Abundant" | "Moderate" | "Scarce / Rainfed">("Moderate");
  const [season, setSeason] = useState<"Kharif (Monsoon)" | "Rabi (Winter)" | "Zaid (Summer)">("Kharif (Monsoon)");
  const [landSizeAcres, setLandSizeAcres] = useState<number>(3.0);
  const [irrigationType, setIrrigationType] = useState<"Canal" | "Drip" | "Sprinkler" | "Borewell / Flood" | "Rainfed">("Drip");

  const [hasSearched, setHasSearched] = useState(true);
  const [results, setResults] = useState<RecommendedCrop[]>(() =>
    recommendCrops({
      location: "Andhra Pradesh / Telangana",
      soilPh: 6.8,
      waterAvailability: "Moderate",
      season: "Kharif (Monsoon)",
      landSizeAcres: 3.0,
      irrigationType: "Drip"
    })
  );

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    const evaluated = recommendCrops({
      location,
      soilPh,
      waterAvailability,
      season,
      landSizeAcres,
      irrigationType
    });
    setResults(evaluated);
    setHasSearched(true);
  };

  return (
    <div id="crop-recommendation-view" className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-800 rounded-2xl p-5 sm:p-6 text-white shadow-sm">
        <div className="flex items-center space-x-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-emerald-200">
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase tracking-wider text-emerald-200 font-bold">
            Agronomic Decision Support
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold">{i18n.title}</h1>
        <p className="text-emerald-100/90 text-xs sm:text-sm mt-1 max-w-xl">
          {i18n.subtitle}
        </p>
      </div>

      {/* Input Parameters Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center space-x-1.5">
          <Filter className="w-3.5 h-3.5 text-emerald-600" />
          <span>Farm & Environmental Parameters</span>
        </h2>

        <form onSubmit={handleEvaluate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {/* Season */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {i18n.season} *
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value as any)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Kharif (Monsoon)">Kharif (Monsoon / జూన్-నవంబర్)</option>
                <option value="Rabi (Winter)">Rabi (Winter / అక్టోబర్-మార్చి)</option>
                <option value="Zaid (Summer)">Zaid (Summer / ఫిబ్రవరి-మే)</option>
              </select>
            </div>

            {/* Soil pH */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  {i18n.soilPh}: <span className="text-emerald-800 font-bold">{soilPh}</span>
                </label>
                <span className="text-[10px] text-slate-400">
                  {soilPh < 6.5 ? "Acidic" : soilPh > 7.8 ? "Alkaline" : "Neutral / Ideal"}
                </span>
              </div>
              <input
                type="range"
                min="4.5"
                max="9.0"
                step="0.1"
                value={soilPh}
                onChange={(e) => setSoilPh(parseFloat(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Water Availability */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {i18n.waterAvailability} *
              </label>
              <select
                value={waterAvailability}
                onChange={(e) => setWaterAvailability(e.target.value as any)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Abundant">🌊 Abundant (Canal / Continuous)</option>
                <option value="Moderate">💧 Moderate (Assured Borewell / Drip)</option>
                <option value="Scarce / Rainfed">🌧️ Scarce / Rainfed (Monsoon dependent)</option>
              </select>
            </div>

            {/* Irrigation Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {i18n.irrigationType}
              </label>
              <select
                value={irrigationType}
                onChange={(e) => setIrrigationType(e.target.value as any)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Drip">💧 Drip Irrigation</option>
                <option value="Sprinkler">🚿 Sprinkler</option>
                <option value="Canal">🌊 Canal Irrigation</option>
                <option value="Borewell / Flood">🚰 Borewell / Flood</option>
                <option value="Rainfed">🌧️ Rainfed Only</option>
              </select>
            </div>

            {/* Land Size */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {i18n.landSize}
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="100"
                value={landSizeAcres}
                onChange={(e) => setLandSizeAcres(parseFloat(e.target.value) || 1)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Location / District */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {i18n.location}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Guntur / Warangal / Indore"
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm flex items-center space-x-2 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{i18n.findCrops}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
              <Sprout className="w-4 h-4 text-emerald-600" />
              <span>{i18n.recommendedCrops} ({results.length})</span>
            </h2>
            <span className="text-xs text-slate-500">Sorted by agronomic suitability match</span>
          </div>

          <div className="space-y-4">
            {results.map((crop, idx) => (
              <div
                key={crop.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-emerald-300 transition space-y-3.5"
              >
                {/* Top header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                      {crop.cropIcon}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {crop.cropName}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {crop.whySuitable}
                      </p>
                    </div>
                  </div>

                  {/* Suitability badge */}
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold ${
                        crop.suitabilityScorePercent >= 80
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : crop.suitabilityScorePercent >= 65
                          ? "bg-teal-100 text-teal-800 border border-teal-200"
                          : "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}
                    >
                      <span>⭐ {crop.suitabilityScorePercent}% Match</span>
                    </span>
                  </div>
                </div>

                {/* Key Metric Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-medium block text-[10px] uppercase">
                      {i18n.growingPeriod}
                    </span>
                    <span className="font-bold text-slate-700 flex items-center space-x-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{crop.approxGrowingPeriod}</span>
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-medium block text-[10px] uppercase">
                      {i18n.waterRequirement}
                    </span>
                    <span className="font-bold text-slate-700 flex items-center space-x-1 mt-0.5">
                      <Droplets className="w-3.5 h-3.5 text-blue-500" />
                      <span>{crop.waterRequirement} Demand</span>
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                    <span className="text-slate-400 font-medium block text-[10px] uppercase">
                      {i18n.marketPotential}
                    </span>
                    <span className="font-semibold text-slate-700 flex items-center space-x-1 mt-0.5 line-clamp-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{crop.generalMarketPotential}</span>
                    </span>
                  </div>
                </div>

                {/* Risks & Key Management Tips */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {/* Risks */}
                  <div className="bg-rose-50/50 rounded-xl p-3 border border-rose-100">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-rose-800 flex items-center space-x-1 mb-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>{i18n.mainRisks}</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {crop.mainRisks.map((r, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tips */}
                  <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center space-x-1 mb-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{i18n.keyTips}</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {crop.keyManagementTips.map((tip, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mandatory Disclaimer */}
      <div className="bg-slate-100 border border-slate-300/80 rounded-xl p-3.5 flex items-start space-x-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {i18n.approxNotice}
        </p>
      </div>
    </div>
  );
};
