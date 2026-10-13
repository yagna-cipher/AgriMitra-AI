import React from "react";
import { LanguageCode, FarmerCrop, DiagnosisResult, SoilAnalysisResult } from "../types";
import { calculateFarmHealthScore } from "../utils/farmHealthCalculator";
import { FEATURES_I18N } from "../i18n/featuresI18n";
import {
  Activity,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Sprout,
  Droplet,
  CloudSun,
  Bug,
  Sparkles,
  Camera,
  TestTube,
  ArrowRight,
  TrendingUp,
  RefreshCw
} from "lucide-react";

interface FarmHealthViewProps {
  currentLanguage: LanguageCode;
  crops: FarmerCrop[];
  diagnoses: DiagnosisResult[];
  savedSoilReport: SoilAnalysisResult | null;
  onOpenScanCrop: () => void;
  onOpenSoil: () => void;
  onOpenWater: () => void;
  onOpenWeather: () => void;
}

export const FarmHealthView: React.FC<FarmHealthViewProps> = ({
  currentLanguage,
  crops,
  diagnoses,
  savedSoilReport,
  onOpenScanCrop,
  onOpenSoil,
  onOpenWater,
  onOpenWeather
}) => {
  const i18n = FEATURES_I18N[currentLanguage]?.farmHealth || FEATURES_I18N.en.farmHealth;

  const healthData = calculateFarmHealthScore(crops, diagnoses, savedSoilReport, {
    tempC: 28,
    humidity: 78,
    sprayCondition: "caution",
    rainChance: 35
  });

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-slate-400 bg-slate-100 border-slate-200";
    if (score >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-300";
    if (score >= 65) return "text-teal-700 bg-teal-50 border-teal-300";
    if (score >= 50) return "text-amber-700 bg-amber-50 border-amber-300";
    return "text-rose-700 bg-rose-50 border-rose-300";
  };

  const getStatusBadge = (status: string) => {
    if (status === "good") {
      return (
        <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
          <ShieldCheck className="w-3 h-3" />
          <span>{i18n.good}</span>
        </span>
      );
    }
    if (status === "moderate") {
      return (
        <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
          <AlertTriangle className="w-3 h-3" />
          <span>{i18n.moderate}</span>
        </span>
      );
    }
    if (status === "risk") {
      return (
        <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
          <AlertTriangle className="w-3 h-3" />
          <span>{i18n.needsAttention}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
        <HelpCircle className="w-3 h-3" />
        <span>{i18n.notEnoughData}</span>
      </span>
    );
  };

  const breakdownList = [
    {
      item: healthData.breakdown.cropHealth,
      icon: Sprout,
      actionText: "Scan Suspect Leaves",
      onAction: onOpenScanCrop
    },
    {
      item: healthData.breakdown.soilHealth,
      icon: TestTube,
      actionText: savedSoilReport ? "View Soil Health" : "Test Soil Now",
      onAction: onOpenSoil
    },
    {
      item: healthData.breakdown.waterIrrigation,
      icon: Droplet,
      actionText: "Check Moisture Stress",
      onAction: onOpenWater
    },
    {
      item: healthData.breakdown.weatherRisk,
      icon: CloudSun,
      actionText: "Weather Advisory",
      onAction: onOpenWeather
    },
    {
      item: healthData.breakdown.pestDiseaseRisk,
      icon: Bug,
      actionText: "Inspect Field Pests",
      onAction: onOpenScanCrop
    },
    {
      item: healthData.breakdown.nutrition,
      icon: Sparkles,
      actionText: "Leaf Nutrient Doctor",
      onAction: onOpenScanCrop
    }
  ];

  return (
    <div id="farm-health-view" className="space-y-5 max-w-4xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-emerald-800 rounded-2xl p-5 sm:p-6 text-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-xs font-semibold text-emerald-100 mb-2">
              <Activity className="w-3.5 h-3.5 text-emerald-300" />
              <span>AI Farm Health Monitor</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">{i18n.title}</h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm mt-1 max-w-xl">
              {i18n.subtitle}
            </p>
          </div>

          {/* Master Score Display */}
          <div className="bg-white/15 rounded-xl p-4 border border-white/20 text-center flex flex-col items-center justify-center min-w-[140px]">
            <span className="text-[11px] uppercase tracking-wider text-emerald-200 font-bold">
              {i18n.overallScore}
            </span>
            <div className="flex items-baseline space-x-1 my-1">
              <span className="text-4xl sm:text-5xl font-extrabold text-white">
                {healthData.overallScore !== null ? healthData.overallScore : "--"}
              </span>
              <span className="text-emerald-200 text-sm font-semibold">/ 100</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-400/20 text-emerald-100 border border-emerald-400/30 uppercase tracking-wide">
              {healthData.ratingLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Farm Components Breakdown</span>
          </h2>
          <span className="text-xs text-slate-500">Updated: {healthData.calculatedAt}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {breakdownList.map(({ item, icon: Icon, actionText, onAction }) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-emerald-300 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
                      <div className="mt-0.5">{getStatusBadge(item.status)}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    {item.score !== null ? (
                      <span className="text-sm font-bold text-slate-800">
                        {item.score}{" "}
                        <span className="text-[10px] text-slate-400 font-normal">
                          / {item.maxScore}
                        </span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">N/A</span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {item.dataSummary}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={onAction}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
                >
                  <span>{actionText}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Improve My Score Section */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center space-x-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
            💡
          </div>
          <div>
            <h2 className="text-base font-bold text-amber-900">{i18n.howToImprove}</h2>
            <p className="text-xs text-amber-700">
              Practical agronomic recommendations based on your current inputs and weather risks
            </p>
          </div>
        </div>

        <div className="space-y-2.5 mt-3">
          {healthData.recommendations.map((rec, index) => (
            <div
              key={`rec-${index}`}
              className="bg-white rounded-xl p-3 border border-amber-200/80 flex items-start space-x-3 shadow-2xs"
            >
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
