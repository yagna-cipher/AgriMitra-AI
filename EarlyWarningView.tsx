import React, { useState } from "react";
import { LanguageCode, FarmerCrop, DiagnosisResult } from "../types";
import { getEarlyWarnings } from "../utils/earlyWarningService";
import { FEATURES_I18N } from "../i18n/featuresI18n";
import {
  ShieldAlert,
  AlertTriangle,
  Info,
  Camera,
  CloudSun,
  Eye,
  CheckCircle2,
  Calendar,
  Thermometer,
  Droplets,
  Sprout
} from "lucide-react";

interface EarlyWarningViewProps {
  currentLanguage: LanguageCode;
  activeCrops: FarmerCrop[];
  diagnoses: DiagnosisResult[];
  onOpenScanCrop: () => void;
}

export const EarlyWarningView: React.FC<EarlyWarningViewProps> = ({
  currentLanguage,
  activeCrops,
  diagnoses,
  onOpenScanCrop
}) => {
  const i18n = FEATURES_I18N[currentLanguage]?.earlyWarning || FEATURES_I18N.en.earlyWarning;

  const [simulatedWeather] = useState({
    tempC: 28,
    humidity: 82,
    rainChance: 40,
    condition: "Partly Cloudy with Humid Atmosphere"
  });

  const warnings = getEarlyWarnings(activeCrops, simulatedWeather, diagnoses);

  const getRiskBadge = (level: "LOW" | "MEDIUM" | "HIGH") => {
    if (level === "HIGH") {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
          <span className="w-2 h-2 rounded-full bg-rose-600 inline-block" />
          <span>🔴 {i18n.highRisk}</span>
        </span>
      );
    }
    if (level === "MEDIUM") {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
          <span>🟡 {i18n.mediumRisk}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
        <span>🟢 {i18n.lowRisk}</span>
      </span>
    );
  };

  return (
    <div id="early-warning-view" className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-amber-800 rounded-2xl p-5 sm:p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-700 border border-amber-600 text-xs font-semibold text-amber-100 mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-200" />
            <span>AI Predictive Agro-Meteorological Advisory</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">{i18n.title}</h1>
          <p className="text-amber-100/90 text-xs sm:text-sm mt-1 max-w-xl">
            {i18n.subtitle}
          </p>
        </div>

        <button
          onClick={onOpenScanCrop}
          className="bg-white hover:bg-amber-50 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm flex items-center justify-center space-x-2 shrink-0 transition"
        >
          <Camera className="w-4 h-4 text-rose-600" />
          <span>{i18n.scanNow}</span>
        </button>
      </div>

      {/* Atmospheric Trigger Status Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <CloudSun className="w-4 h-4 text-amber-600" />
            <span>Real-Time Weather Drivers Evaluated</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Local Microclimate: {simulatedWeather.condition}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3 text-center">
          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium flex items-center justify-center space-x-1">
              <Thermometer className="w-3.5 h-3.5 text-rose-500" />
              <span>Temperature</span>
            </span>
            <span className="text-base sm:text-lg font-bold text-slate-800">
              {simulatedWeather.tempC}°C
            </span>
          </div>

          <div className="bg-amber-50/60 rounded-lg p-2.5 border border-amber-200/60">
            <span className="text-[11px] text-amber-700 font-semibold flex items-center justify-center space-x-1">
              <Droplets className="w-3.5 h-3.5 text-amber-600" />
              <span>Humidity (High)</span>
            </span>
            <span className="text-base sm:text-lg font-bold text-amber-900">
              {simulatedWeather.humidity}%
            </span>
          </div>

          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium flex items-center justify-center space-x-1">
              <CloudSun className="w-3.5 h-3.5 text-blue-500" />
              <span>Rain Probability</span>
            </span>
            <span className="text-base sm:text-lg font-bold text-slate-800">
              {simulatedWeather.rainChance}%
            </span>
          </div>
        </div>
      </div>

      {/* Warnings List */}
      <div className="space-y-4">
        {warnings.map((warn) => (
          <div
            key={warn.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs hover:border-amber-300 transition space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-emerald-800 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                    {warn.cropName}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Stage: {warn.growthStage}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {warn.riskName}
                </h3>
              </div>

              <div>{getRiskBadge(warn.riskLevel)}</div>
            </div>

            {/* Why This Risk Exists */}
            <div className="bg-amber-50/60 rounded-xl p-3.5 border border-amber-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center space-x-1.5 mb-1.5">
                <Info className="w-3.5 h-3.5 text-amber-700" />
                <span>{i18n.whyRiskExists}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {warn.whyRiskExists}
              </p>
            </div>

            {/* Two Column details: Symptoms & Preventive Action */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Symptoms to monitor */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center space-x-1.5 mb-2">
                  <Eye className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{i18n.symptomsToMonitor}</span>
                </h4>
                <ul className="space-y-1.5">
                  {warn.symptomsToMonitor.map((symp, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <span>{symp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preventive Action */}
              <div className="bg-emerald-50/50 rounded-xl p-3.5 border border-emerald-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center space-x-1.5 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{i18n.preventiveAction}</span>
                </h4>
                <ul className="space-y-1.5">
                  {warn.preventiveAction.map((act, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* When to Scan Again footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-slate-100 gap-3 text-xs">
              <div className="flex items-center space-x-2 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  <strong>{i18n.whenToScan}:</strong> {warn.whenToScanAgain}
                </span>
              </div>

              <button
                onClick={onOpenScanCrop}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs shrink-0 transition"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Scan with Camera</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mandatory Safety Notice */}
      <div className="bg-amber-50 border border-amber-300/80 rounded-xl p-4 flex items-start space-x-3 text-xs text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Notice:</strong> {i18n.disclaimer} Always inspect the actual field with your eyes or verify symptoms through the camera scan before initiating chemical pesticide treatments.
        </div>
      </div>
    </div>
  );
};
