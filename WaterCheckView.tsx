import React, { useState } from "react";
import { LanguageCode } from "../types";
import { TRANSLATIONS } from "../i18n/languages";
import { Droplets, AlertTriangle, CheckCircle2, Waves, ShieldAlert, ArrowRight, Sun, CloudRain } from "lucide-react";

interface WaterCheckViewProps {
  currentLanguage: LanguageCode;
}

export const WaterCheckView: React.FC<WaterCheckViewProps> = ({ currentLanguage }) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [selectedIssue, setSelectedIssue] = useState<string>("waterlogging");

  const waterCases: Record<
    string,
    {
      title: string;
      titleLocal: string;
      badge: string;
      symptoms: string[];
      rootCause: string;
      immediateAction: string[];
      longTermSolution: string[];
      dangerLevel: "High" | "Medium" | "Low";
    }
  > = {
    waterlogging: {
      title: "Waterlogging & Root Suffocation (Hypoxia)",
      titleLocal: "పొలంలో నీరు నిల్వ ఉండటం & వేర్లకు గాలి అందకపోవడం",
      badge: "🚨 High Risk for Maize, Chilli, Cotton, Pulses",
      dangerLevel: "High",
      symptoms: [
        "Water standing for >24-48 hours with no drainage.",
        "Yellowing starting from lower leaves upwards in a V-shape along midrib.",
        "Stunted growth; purplish coloration at stem base.",
        "Feeder roots turning brown/black with soft rot and foul odor."
      ],
      rootCause:
        "Lack of oxygen in root zone blocks nutrient uptake (especially nitrogen & zinc) and causes anaerobic root death.",
      immediateAction: [
        "Cut surface drainage channels immediately at field corners to evacuate excess standing water within 6 hours.",
        "Do NOT apply solid granular Urea into stagnant water (wastes fertilizer and burns suffocated roots).",
        "Perform light inter-cultivation (hoeing) as soon as soil surface dries to break crust and restore root aeration.",
        "Apply corrective foliar spray of 19:19:19 (5g/L) or 2% Urea to bypass damaged roots."
      ],
      longTermSolution: [
        "Adopt Broad Bed and Furrow (BBF) or Ridge-and-Furrow planting system in black clay soils.",
        "Incorporate green manures and FYM to improve internal soil infiltration structure.",
        "Maintain 0.2% slope towards field drainage outlets."
      ]
    },
    drought: {
      title: "Drought & Moisture Stress",
      titleLocal: "తేమ కొరత & కరువు ఒత్తిడి",
      badge: "⚠️ Critical at Flowering & Grain Filling",
      dangerLevel: "High",
      symptoms: [
        "Leaves curling, rolling inward, and drooping during morning as well as midday.",
        "Drying and browning of leaf tips and margins ('scorch').",
        "Flower bud shedding and premature boll/fruit drop.",
        "Deep cracks on clay soil surface."
      ],
      rootCause:
        "Evapotranspiration demand exceeds soil moisture absorption capacity, leading to loss of cell turgor and stomatal closure.",
      immediateAction: [
        "Provide life-saving light irrigation immediately during cool morning or evening hours.",
        "Spray Potassium Nitrate (13:0:45) @ 1% (10g/L) to maintain stomatal regulation and plant osmotic balance.",
        "Apply 3 inches of straw mulch or farm residue on soil surface to retard moisture evaporation."
      ],
      longTermSolution: [
        "Install Drip or Micro-sprinkler irrigation systems to save 40-50% water.",
        "Construct farm ponds (Krishi Honda) for supplemental emergency irrigation.",
        "Adopt drought-tolerant varieties suited for dryland agriculture."
      ]
    },
    overwatering: {
      title: "Over-Irrigation & High Water Table",
      titleLocal: "అధిక నీటిపారుదల సమస్య",
      badge: "🟡 Yellowing without Standing Water",
      dangerLevel: "Medium",
      symptoms: [
        "Pale light-green foliage across the entire canopy.",
        "Excessive vegetative vine growth with poor flowering and flower drop.",
        "Algae or green moss growing on wet soil surface.",
        "Damping off and collar rot fungus attacking seedling bases."
      ],
      rootCause:
        "Frequent flood irrigation keeping root zone permanently saturated without allowing drying cycles.",
      immediateAction: [
        "Increase intervals between irrigations based on soil moisture feel test (ball test).",
        "Practice Alternate Wetting and Drying (AWD) in rice, or alternate furrow irrigation in row crops.",
        "Ensure field is not watered within 48 hours before predicted rain."
      ],
      longTermSolution: [
        "Use tensiometers or soil moisture probes to schedule irrigation scientifically.",
        "Switch to drip fertigation."
      ]
    },
    salinity: {
      title: "Salinity & Poor Quality Borewell Water",
      titleLocal: "చౌడు నేలలు & ఉప్పు నీటి సమస్య",
      badge: "🧂 EC > 1.5 dS/m Hazard",
      dangerLevel: "Medium",
      symptoms: [
        "White crusty salt deposits on dry soil surface and irrigation ridges.",
        "Marginal leaf tip burning ('tip burn') on older leaves.",
        "Poor seed germination and uneven patchy crop stand.",
        "Leaves feel thick, leathery, and dark blue-green."
      ],
      rootCause:
        "High electrical conductivity (EC) and total dissolved salts in borewell water causing osmotic dehydration of roots.",
      immediateAction: [
        "Leach salts downwards with heavy flushing of good quality canal/rain water where drainage exists.",
        "Apply Agricultural Gypsum based on soil sodium exchange capacity.",
        "Apply Organic manure (FYM @ 5 tonnes/acre) to buffer salt toxicity."
      ],
      longTermSolution: [
        "Grow salt-tolerant varieties (e.g. CSR 30, CSR 36, KRL 210).",
        "Blend borewell water with rainwater harvested in farm ponds."
      ]
    }
  };

  const currentCase = waterCases[selectedIssue];

  return (
    <div id="water-check-section" className="max-w-4xl mx-auto space-y-5 pb-16">
      {/* Banner */}
      <div className="bg-sky-800 rounded-3xl p-5 sm:p-7 text-white shadow-sm space-y-2">
        <div className="inline-flex items-center space-x-2 bg-sky-700/80 text-sky-100 text-xs px-3 py-1 rounded-full border border-sky-500/40">
          <Droplets className="w-3.5 h-3.5 text-amber-300" />
          <span>Irrigation & Drainage Doctor</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black">{t.water}</h2>
        <p className="text-xs sm:text-sm text-sky-100 max-w-2xl">
          {currentLanguage === "te"
            ? "నీటి నిల్వ (Waterlogging), కరువు ఒత్తిడి, అధిక నీటిపారుదల మరియు ఉప్పు నీటి సమస్యలను ఖచ్చితంగా గుర్తించండి."
            : "Diagnose waterlogging hypoxia, drought stress, overwatering, and salinity issues with practical rescue protocols."}
        </p>
      </div>

      {/* Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setSelectedIssue("waterlogging")}
          className={`p-3 rounded-2xl border text-left transition ${
            selectedIssue === "waterlogging"
              ? "bg-sky-700 text-white border-sky-800 shadow-md font-bold"
              : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
          }`}
        >
          <div className="text-base mb-1">🌊</div>
          <div className="text-xs font-bold leading-tight">Waterlogging</div>
          <div className="text-[10px] opacity-80">Root suffocation</div>
        </button>

        <button
          onClick={() => setSelectedIssue("drought")}
          className={`p-3 rounded-2xl border text-left transition ${
            selectedIssue === "drought"
              ? "bg-sky-700 text-white border-sky-800 shadow-md font-bold"
              : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
          }`}
        >
          <div className="text-base mb-1">☀️</div>
          <div className="text-xs font-bold leading-tight">Drought Stress</div>
          <div className="text-[10px] opacity-80">Moisture deficit</div>
        </button>

        <button
          onClick={() => setSelectedIssue("overwatering")}
          className={`p-3 rounded-2xl border text-left transition ${
            selectedIssue === "overwatering"
              ? "bg-sky-700 text-white border-sky-800 shadow-md font-bold"
              : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
          }`}
        >
          <div className="text-base mb-1">🌧️</div>
          <div className="text-xs font-bold leading-tight">Over-Irrigation</div>
          <div className="text-[10px] opacity-80">Yellowing & Rot</div>
        </button>

        <button
          onClick={() => setSelectedIssue("salinity")}
          className={`p-3 rounded-2xl border text-left transition ${
            selectedIssue === "salinity"
              ? "bg-sky-700 text-white border-sky-800 shadow-md font-bold"
              : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
          }`}
        >
          <div className="text-base mb-1">🧂</div>
          <div className="text-xs font-bold leading-tight">Saline Water</div>
          <div className="text-[10px] opacity-80">Salt tip burn</div>
        </button>
      </div>

      {/* Active Case Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/90 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
              {currentCase.badge}
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              {currentCase.title}
            </h3>
            <p className="text-xs text-slate-500">{currentCase.titleLocal}</p>
          </div>
        </div>

        {/* Symptoms Grid */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            🔍 Visible Symptoms on Plant & Soil:
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {currentCase.symptoms.map((sym, i) => (
              <li key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 flex items-start space-x-2">
                <span className="text-sky-600 font-bold">•</span>
                <span>{sym}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Root Cause */}
        <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-200 text-xs text-sky-950 leading-relaxed">
          <strong>🧬 Underlying Mechanism:</strong> {currentCase.rootCause}
        </div>

        {/* Immediate Rescue Action */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-emerald-900 uppercase tracking-wide flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>🚨 Immediate Rescue Steps (Do This Now):</span>
          </div>
          <div className="space-y-2">
            {currentCase.immediateAction.map((act, i) => (
              <div key={i} className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60 text-xs text-emerald-950 font-medium flex items-start space-x-2">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <span>{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Long-Term Solutions */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            🛡️ Long-Term Prevention & Farm Engineering:
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {currentCase.longTermSolution.map((sol, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-slate-400">✓</span>
                <span>{sol}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
