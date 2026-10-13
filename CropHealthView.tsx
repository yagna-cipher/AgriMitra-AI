import React, { useState } from "react";
import { LanguageCode } from "../types";
import { TRANSLATIONS } from "../i18n/languages";
import { Leaf, Sparkles, CheckCircle2, AlertCircle, Info, ChevronRight } from "lucide-react";

interface CropHealthViewProps {
  currentLanguage: LanguageCode;
}

export const CropHealthView: React.FC<CropHealthViewProps> = ({ currentLanguage }) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [leafPosition, setLeafPosition] = useState<"older" | "younger" | "growing_tips">("older");
  const [selectedNutrient, setSelectedNutrient] = useState<string>("nitrogen");

  const deficiencies: Record<
    string,
    {
      name: string;
      localName: string;
      position: "older" | "younger" | "growing_tips";
      symptoms: string;
      visualSigns: string[];
      confusionWith: string;
      correctiveFoliarSpray: string;
      soilApplication: string;
      colorBadge: string;
    }
  > = {
    nitrogen: {
      name: "Nitrogen (N) Deficiency",
      localName: "నత్రజని లోపం (యూరియా లోపం)",
      position: "older",
      symptoms: "Uniform light yellowing (chlorosis) starting on older lower leaves first; advances upwards. Stunted spindly stems.",
      visualSigns: [
        "V-shaped yellowing starting from leaf tip backwards along the midrib.",
        "Entire lower leaf turns golden yellow then browns and dries.",
        "Early maturity with small grain/boll size."
      ],
      confusionWith: "Waterlogging (differentiated by checking if soil is flooded) and Drought.",
      correctiveFoliarSpray: "Spray 1.5% - 2.0% Urea (15-20g/L water) or 19:19:19 (5-10g/L water) for instant greening within 4-5 days.",
      soilApplication: "Top-dress Neem coated Urea in 2-3 split doses based on crop stage.",
      colorBadge: "bg-amber-100 text-amber-900 border-amber-300"
    },
    phosphorus: {
      name: "Phosphorus (P) Deficiency",
      localName: "భాస్వరం లోపం (Phosphorus)",
      position: "older",
      symptoms: "Older leaves turn dark green with purplish or bronze reddish tint, especially on undersides and leaf veins.",
      visualSigns: [
        "Purplish coloration on stems, petiole, and lower leaves.",
        "Severely stunted root development and delayed flowering.",
        "Thin, erect shoots."
      ],
      confusionWith: "Cold temperature shock or viral anthocyanin accumulation.",
      correctiveFoliarSpray: "Foliar spray of 12:61:0 (Mono Ammonium Phosphate) @ 5g/L water.",
      soilApplication: "Apply Single Super Phosphate (SSP) or DAP as basal dose placed near root zone.",
      colorBadge: "bg-purple-100 text-purple-900 border-purple-300"
    },
    potassium: {
      name: "Potassium (K) Deficiency",
      localName: "పొటాష్ లోపం (Potassium)",
      position: "older",
      symptoms: "Marginal chlorosis turning to dry brown necrotic scorch (firing) along older leaf edges and tips.",
      visualSigns: [
        "Leaf edges look burned or scorched while center remains green.",
        "Weak stalks and lodging (falling over) during wind.",
        "Poor disease resistance and shriveled grains/fruits."
      ],
      confusionWith: "Salinity burn or sucking pest hopper scorch.",
      correctiveFoliarSpray: "Foliar spray of Potassium Nitrate (13:0:45) @ 1% (10g/L) or 0:0:50 (SOP) @ 5g/L.",
      soilApplication: "Apply Muriate of Potash (MOP 60%) @ 25-40 kg/acre.",
      colorBadge: "bg-orange-100 text-orange-900 border-orange-300"
    },
    magnesium: {
      name: "Magnesium (Mg) Deficiency",
      localName: "మెగ్నీషియం లోపం (ఆకులు ఎర్రబారడం)",
      position: "older",
      symptoms: "Interveinal chlorosis on older leaves; main veins stay dark green while area between veins turns yellow or bright purplish-red (common in Cotton).",
      visualSigns: [
        "Bright red or purple interveinal blotches in cotton ('Laalia' reddening).",
        "Brittle leaves that drop prematurely during boll filling.",
        "Inverted V-shaped green wedge at base of leaf blade."
      ],
      confusionWith: "Jassid sucking pest injury (differentiated by looking for green leafhoppers).",
      correctiveFoliarSpray: "Foliar spray of Magnesium Sulfate (MgSO4) @ 1% (10g/L) + Urea 1% during flowering/fruiting.",
      soilApplication: "Soil application of Magnesium Sulfate @ 10-15 kg/acre.",
      colorBadge: "bg-rose-100 text-rose-900 border-rose-300"
    },
    zinc: {
      name: "Zinc (Zn) Deficiency",
      localName: "జింక్ లోపం (ఖైరా తెగులు / White Bud)",
      position: "younger",
      symptoms: "Broad bleached white or pale yellow bands between midrib and margins of young emerging leaves ('White Bud' in maize; 'Khaira' in rice).",
      visualSigns: [
        "Bronze or reddish-brown rusty spots coalescing on lower-middle leaves in rice.",
        "Shortened internodes ('rosetting' or 'little leaf').",
        "Wavy leaf margins and delayed maturity."
      ],
      confusionWith: "Rice blast or bacterial leaf blight lesions.",
      correctiveFoliarSpray: "Foliar spray of Chelated Zinc (Zn-EDTA 12%) @ 1g/L or Zinc Sulfate (ZnSO4 21%) @ 2g/L + Lime 1g/L.",
      soilApplication: "Apply 20-25 kg Zinc Sulfate per acre during basal preparation (do not mix directly with DAP/phosphorus).",
      colorBadge: "bg-yellow-100 text-yellow-900 border-yellow-300"
    },
    iron: {
      name: "Iron (Fe) Deficiency",
      localName: "ఇనుము లోపం (Iron Chlorosis)",
      position: "younger",
      symptoms: "Severe interveinal chlorosis on the youngest new top leaves; veins remain narrow fine green lines while blade turns ivory-white.",
      visualSigns: [
        "Entire newly emerged leaves become paper white in alkaline / calcareous soils.",
        "Lower leaves remain completely green.",
        "Common in groundnut, sugarcane, and nursery seedlings in high pH soils."
      ],
      confusionWith: "Zinc or sulfur deficiency (Iron affects youngest leaves first with distinct fine veins).",
      correctiveFoliarSpray: "Foliar spray of Ferrous Sulfate (FeSO4 19%) @ 5g/L + Citric Acid (lemon juice) 1g/L or Chelated Iron (Fe-EDTA) @ 1g/L.",
      soilApplication: "Incorporate sulfur or organic compost to lower rhizosphere pH.",
      colorBadge: "bg-lime-100 text-lime-900 border-lime-300"
    },
    boron: {
      name: "Boron (B) Deficiency",
      localName: "బోరాన్ లోపం (Boron)",
      position: "growing_tips",
      symptoms: "Death of growing tips (apical meristem); distorted, brittle leaves; hollow heart in stems; poor pollen viability and fruit cracking.",
      visualSigns: [
        "Cracking of tomato and pomegranate fruits.",
        "Poor seed setting and chaffy heads in sunflower.",
        "Internal cork and browning in cauliflower/cabbage."
      ],
      confusionWith: "Calcium deficiency or viral deformation.",
      correctiveFoliarSpray: "Foliar spray of Solubor (Borax 20%) @ 1-1.5g/L during pre-flowering stage.",
      soilApplication: "Soil application of Borax @ 4-5 kg/acre.",
      colorBadge: "bg-cyan-100 text-cyan-900 border-cyan-300"
    },
    calcium: {
      name: "Calcium (Ca) Deficiency",
      localName: "కాల్షియం లోపం (Blossom End Rot)",
      position: "growing_tips",
      symptoms: "Hooked, distorted young leaves; black sunken necrotic patch at the blossom end of fruits ('Blossom End Rot' in tomato & chilli); empty pods (pops) in groundnut.",
      visualSigns: [
        "Dark leathery rot on the bottom of tomato fruits.",
        "Hollow, unfilled pods in groundnut.",
        "Tip burn of inner leaves in cabbage and lettuce."
      ],
      confusionWith: "Fruit rot fungus (Alternaria fruit rot).",
      correctiveFoliarSpray: "Foliar spray of Calcium Nitrate @ 5g/L water during fruit set.",
      soilApplication: "Apply Gypsum (200 kg/acre) in groundnut at pegging stage.",
      colorBadge: "bg-teal-100 text-teal-900 border-teal-300"
    }
  };

  const currentDef = deficiencies[selectedNutrient];

  return (
    <div id="crop-health-section" className="max-w-4xl mx-auto space-y-5 pb-16">
      {/* Header Banner */}
      <div className="bg-emerald-800 rounded-3xl p-5 sm:p-7 text-white shadow-sm space-y-2">
        <div className="inline-flex items-center space-x-2 bg-emerald-700/80 text-emerald-100 text-xs px-3 py-1 rounded-full border border-emerald-500/40">
          <Leaf className="w-3.5 h-3.5 text-amber-300" />
          <span>Plant Nutrition & Leaf Discoloration Doctor</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black">{t.nutrition}</h2>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl">
          {currentLanguage === "te"
            ? "ఆకుల పసుపు రంగు, ఎరుపు రంగు లేదా మచ్చలు ఏ పోషక లోపం వల్ల వచ్చాయో ఖచ్చితంగా గుర్తించి తక్షణ పిచికారీ మందులను తెలుసుకోండి."
            : "Identify whether yellowing or leaf reddening is caused by Nitrogen, Magnesium, Potassium, Zinc, or Iron with instant foliar spray rescue formulas."}
        </p>
      </div>

      {/* Leaf Position Filter Tabs */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/90 space-y-3">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
          Step 1: Where on the plant do you see discoloration?
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => {
              setLeafPosition("older");
              setSelectedNutrient("nitrogen");
            }}
            className={`p-3 rounded-2xl border text-left transition ${
              leafPosition === "older"
                ? "bg-emerald-700 text-white border-emerald-800 shadow-md font-bold"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
            }`}
          >
            <div className="text-sm font-bold">🌿 Older / Lower Leaves</div>
            <div className="text-[11px] opacity-85">Mobile: N, P, K, Mg</div>
          </button>

          <button
            onClick={() => {
              setLeafPosition("younger");
              setSelectedNutrient("zinc");
            }}
            className={`p-3 rounded-2xl border text-left transition ${
              leafPosition === "younger"
                ? "bg-emerald-700 text-white border-emerald-800 shadow-md font-bold"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
            }`}
          >
            <div className="text-sm font-bold">🌱 Upper / Younger Leaves</div>
            <div className="text-[11px] opacity-85">Immobile: Zn, Fe, S, Mn</div>
          </button>

          <button
            onClick={() => {
              setLeafPosition("growing_tips");
              setSelectedNutrient("boron");
            }}
            className={`p-3 rounded-2xl border text-left transition ${
              leafPosition === "growing_tips"
                ? "bg-emerald-700 text-white border-emerald-800 shadow-md font-bold"
                : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200"
            }`}
          >
            <div className="text-sm font-bold">🌸 Growing Tips & Fruits</div>
            <div className="text-[11px] opacity-85">Very Immobile: B, Ca</div>
          </button>
        </div>
      </div>

      {/* Nutrients Chips */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(deficiencies)
          .filter(([_, def]) => def.position === leafPosition)
          .map(([key, def]) => (
            <button
              key={key}
              onClick={() => setSelectedNutrient(key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                selectedNutrient === key
                  ? "bg-emerald-800 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{def.name.split(" ")[0]}</span>
              <span className="opacity-80 text-[10px]">({def.name.split(" ")[1]})</span>
            </button>
          ))}
      </div>

      {/* Active Nutrient Deficiency Detail Card */}
      {currentDef && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/90 space-y-5">
          
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${currentDef.colorBadge}`}>
                {currentDef.name}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                {currentDef.localName}
              </h3>
            </div>
          </div>

          {/* Symptoms */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              🔍 Diagnostic Key Symptoms:
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {currentDef.symptoms}
            </p>
            <ul className="space-y-1 text-xs text-slate-600 pt-1">
              {currentDef.visualSigns.map((sign, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Differential Diagnosis (Confusion note) */}
          <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-950 flex items-start space-x-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Differential Diagnosis:</strong> Often confused with <em>{currentDef.confusionWith}</em>. Always verify soil moisture and insect presence on leaf underside before spraying.
            </div>
          </div>

          {/* Corrective Foliar Action (Quick Rescue) */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
            <div className="text-xs font-bold text-emerald-950 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>⚡ Immediate Foliar Spray Formula (Fast Recovery in 3-5 days):</span>
            </div>
            <div className="font-mono text-xs font-bold text-emerald-900 bg-white p-3 rounded-xl border border-emerald-300">
              {currentDef.correctiveFoliarSpray}
            </div>
          </div>

          {/* Soil Application */}
          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="font-bold text-slate-800 uppercase tracking-wide">🌱 Basal / Soil Corrective Dose:</div>
            <p className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              {currentDef.soilApplication}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
