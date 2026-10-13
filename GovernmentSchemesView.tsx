import React, { useState } from "react";
import { LanguageCode } from "../types";
import { VERIFIED_GOVERNMENT_SCHEMES } from "../data/governmentSchemesData";
import { FEATURES_I18N } from "../i18n/featuresI18n";
import {
  Landmark,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  Filter,
  ShieldCheck,
  Search,
  Sparkles
} from "lucide-react";

interface GovernmentSchemesViewProps {
  currentLanguage: LanguageCode;
}

export const GovernmentSchemesView: React.FC<GovernmentSchemesViewProps> = ({
  currentLanguage
}) => {
  const i18n = FEATURES_I18N[currentLanguage]?.schemes || FEATURES_I18N.en.schemes;

  const [selectedActivity, setSelectedActivity] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSchemes = VERIFIED_GOVERNMENT_SCHEMES.filter((scheme) => {
    // Activity filter
    if (selectedActivity !== "All") {
      const hasAct = scheme.applicableActivities.some((act) =>
        act.toLowerCase().includes(selectedActivity.toLowerCase())
      );
      if (!hasAct) return false;
    }

    // Category filter
    if (selectedCategory !== "All") {
      const hasCat = scheme.applicableCategories.some((cat) =>
        cat.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      if (!hasCat) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = scheme.name.toLowerCase().includes(q) || scheme.shortCode.toLowerCase().includes(q);
      const matchPurpose = scheme.purpose.toLowerCase().includes(q);
      if (!matchName && !matchPurpose) return false;
    }

    return true;
  });

  return (
    <div id="government-schemes-view" className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-800 rounded-2xl p-5 sm:p-6 text-white shadow-sm">
        <div className="flex items-center space-x-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-emerald-200">
            <Landmark className="w-4 h-4" />
          </div>
          <span className="text-xs uppercase tracking-wider text-emerald-200 font-bold">
            Verified Farmer Subsidies & Schemes
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold">{i18n.title}</h1>
        <p className="text-emerald-100/90 text-xs sm:text-sm mt-1 max-w-xl">
          {i18n.subtitle}
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scheme name or keyword (e.g. PM-KISAN, Drip, Solar, Insurance)..."
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Activity filter */}
          <div className="sm:w-48">
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="All">All Activities</option>
              <option value="Financial">Financial Support</option>
              <option value="Insurance">Crop Insurance</option>
              <option value="Irrigation">Drip & Irrigation</option>
              <option value="Mechanization">Farm Machinery</option>
              <option value="Soil">Soil Health</option>
              <option value="Solar">Solar Energy (KUSUM)</option>
              <option value="Organic">Organic Farming</option>
            </select>
          </div>

          {/* Category filter */}
          <div className="sm:w-44">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="All">All Farmer Types</option>
              <option value="Small/Marginal">Small & Marginal</option>
              <option value="Women">Women Farmers</option>
              <option value="SC/ST">SC / ST Farmers</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Showing {filteredSchemes.length} verified government welfare schemes</span>
          {(selectedActivity !== "All" || selectedCategory !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedActivity("All");
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs hover:border-emerald-300 transition space-y-4"
          >
            {/* Top header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {scheme.shortCode}
                  </span>
                  {scheme.applicableActivities.map((act, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                    >
                      {act}
                    </span>
                  ))}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {scheme.name}
                </h3>
              </div>

              <a
                href={scheme.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0 transition"
              >
                <span>{scheme.officialPortalUrl.replace("https://", "")}</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>

            {/* Purpose */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {scheme.purpose}
            </p>

            {/* Benefits Highlight Box */}
            <div className="bg-emerald-50/70 rounded-xl p-3.5 border border-emerald-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center space-x-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{i18n.benefits}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                {scheme.benefits}
              </p>
            </div>

            {/* Eligibility & How To Apply Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Eligibility */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                <h4 className="font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>{i18n.eligibility}</span>
                </h4>
                <ul className="space-y-1.5 text-slate-600">
                  {scheme.basicEligibility.map((el, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span>{el}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to Apply */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                <h4 className="font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{i18n.howToApply}</span>
                </h4>
                <ul className="space-y-1.5 text-slate-600">
                  {scheme.howToApply.map((step, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Official Source footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500 gap-2">
              <span>
                <strong>Official Nodal Authority:</strong> {scheme.officialSource}
              </span>
              <a
                href={scheme.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-semibold underline flex items-center space-x-1"
              >
                <span>Check Official Application Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Mandatory Official Portal Disclaimer */}
      <div className="bg-amber-50 border border-amber-300/80 rounded-xl p-4 flex items-start space-x-3 text-xs text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Mandatory Notice:</strong> {i18n.disclaimer} Subsidy disbursement, application cut-off dates, and district quotas are strictly subject to State Government administrative sanctions and official verification through MeeSeva / CSC / Gram Panchayat.
        </div>
      </div>
    </div>
  );
};
