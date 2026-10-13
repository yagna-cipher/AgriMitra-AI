import React, { useState } from "react";
import { LanguageCode } from "../types";
import { OFFICIAL_MSP_BENCHMARKS, MAJOR_MANDIS } from "../data/marketBenchmarkData";
import { FEATURES_I18N } from "../i18n/featuresI18n";
import {
  TrendingUp,
  Store,
  AlertCircle,
  ShieldCheck,
  Package,
  Calendar,
  Layers,
  Scale,
  ExternalLink,
  Info
} from "lucide-react";

interface MarketPriceViewProps {
  currentLanguage: LanguageCode;
}

export const MarketPriceView: React.FC<MarketPriceViewProps> = ({ currentLanguage }) => {
  const i18n = FEATURES_I18N[currentLanguage]?.market || FEATURES_I18N.en.market;

  const [selectedCropKey, setSelectedCropKey] = useState<string>("paddy");
  const [selectedMandiId, setSelectedMandiId] = useState<string>("mandi-guntur");

  const benchmark = OFFICIAL_MSP_BENCHMARKS[selectedCropKey] || OFFICIAL_MSP_BENCHMARKS.paddy;
  const currentMandi = MAJOR_MANDIS.find((m) => m.id === selectedMandiId) || MAJOR_MANDIS[0];

  return (
    <div id="market-price-view" className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-800 rounded-2xl p-5 sm:p-6 text-white shadow-sm">
        <div className="flex items-center space-x-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-emerald-200">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase tracking-wider text-emerald-200 font-bold">
            MSP Benchmarks & Selling Advisory
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold">{i18n.title}</h1>
        <p className="text-emerald-100/90 text-xs sm:text-sm mt-1 max-w-xl">
          {i18n.subtitle}
        </p>
      </div>

      {/* Selectors */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {i18n.selectCrop}
            </label>
            <select
              value={selectedCropKey}
              onChange={(e) => setSelectedCropKey(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="paddy">🌾 Paddy / Rice (వరి / धान)</option>
              <option value="cotton">🌱 Cotton (పత్తి / कपास)</option>
              <option value="maize">🌽 Maize / Corn (మొక్కజొన్న / मक्का)</option>
              <option value="groundnut">🥜 Groundnut in Shell (వేరుశనగ)</option>
              <option value="soybean">🌱 Soybean (సోయాబీన్)</option>
              <option value="wheat">🌾 Wheat (గోధుమ / गेहूं)</option>
              <option value="chilli">🌶️ Dry Red Chilli (ఎండు మిరప)</option>
              <option value="tomato">🍅 Fresh Tomato (టమాటా)</option>
            </select>
          </div>

          {/* Mandi Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {i18n.selectMarket}
            </label>
            <select
              value={selectedMandiId}
              onChange={(e) => setSelectedMandiId(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {MAJOR_MANDIS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.district}, {m.state})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transparent Fallback Notice for Live Data */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-amber-900">
              {i18n.liveDataUnavailableTitle}
            </h3>
            <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
              {i18n.liveDataUnavailableDesc}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-200/70 text-amber-900 border border-amber-300">
            Market: {currentMandi.district}
          </span>
        </div>
      </div>

      {/* Official MSP Benchmark Card */}
      <div className="bg-white rounded-2xl border border-emerald-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center space-x-3">
            <span className="text-4xl p-2 rounded-2xl bg-emerald-50 border border-emerald-100">
              {benchmark.cropIcon}
            </span>
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                Category: {benchmark.category}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {benchmark.cropName}
              </h2>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
              {i18n.officialMspTitle}
            </span>
            {benchmark.mspGovernment2024_2025 ? (
              <div className="flex items-baseline justify-end space-x-1 mt-0.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-900">
                  ₹ {benchmark.mspGovernment2024_2025.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-emerald-700 font-semibold">/ Quintal</span>
              </div>
            ) : (
              <span className="text-sm font-bold text-slate-700 mt-1 block">
                {benchmark.mspUnit}
              </span>
            )}
          </div>
        </div>

        {/* Advisory Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Quality Standards */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5 mb-2">
              <Scale className="w-4 h-4 text-emerald-600" />
              <span>{i18n.qualityStandards}</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {benchmark.qualitySpecifications}
            </p>
          </div>

          {/* Optimal Selling Window */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5 mb-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{i18n.sellingStrategy}</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {benchmark.optimalSellingWindow}
            </p>
          </div>

          {/* Storage Advice */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5 mb-2">
              <Package className="w-4 h-4 text-amber-600" />
              <span>{i18n.storageAdvice}</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {benchmark.storageTips}
            </p>
          </div>
        </div>
      </div>

      {/* e-NAM National Agriculture Market Linkage */}
      <div className="bg-blue-900 rounded-2xl p-5 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
            National Electronic Agriculture Market
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            Trade Online via e-NAM (National Agriculture Market)
          </h3>
          <p className="text-xs text-blue-200/90 mt-1 max-w-xl leading-relaxed">
            {i18n.enamNotice} Connect with registered buyers across 1,360+ wholesale mandis to avoid local middlemen commissions.
          </p>
        </div>

        <a
          href="https://enam.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white hover:bg-blue-50 text-blue-900 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shrink-0 transition"
        >
          <span>Visit enam.gov.in</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="bg-slate-100 border border-slate-300/80 rounded-xl p-3.5 flex items-start space-x-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Mandatory Notice:</strong> Minimum Support Prices (MSP) are benchmark floors declared by the Government of India for Fair Average Quality (FAQ) produce. Actual spot auction rates vary on a daily basis depending on moisture level, grain quality, daily arrivals, and buyer competition at the mandi yard.
        </p>
      </div>
    </div>
  );
};
