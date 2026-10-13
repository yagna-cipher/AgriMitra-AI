import React, { useState } from "react";
import { LanguageCode, PestLibraryItem } from "../types";
import { TRANSLATIONS } from "../i18n/languages";
import { PEST_AND_DISEASE_LIBRARY } from "../data/pestLibrary";
import { Bug, Search, Filter, ShieldCheck, AlertTriangle, CheckCircle2, ChevronRight, Sprout } from "lucide-react";

interface PestDiseaseLibraryViewProps {
  currentLanguage: LanguageCode;
  onSelectForDiagnosis?: (item: PestLibraryItem) => void;
}

export const PestDiseaseLibraryView: React.FC<PestDiseaseLibraryViewProps> = ({
  currentLanguage,
  onSelectForDiagnosis,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCrop, setSelectedCrop] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<PestLibraryItem | null>(null);

  const filteredItems = PEST_AND_DISEASE_LIBRARY.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.commonName.toLowerCase().includes(q) ||
      item.scientificName.toLowerCase().includes(q) ||
      Object.values(item.localNames).some((n) => n.toLowerCase().includes(q)) ||
      item.affectedCrops.some((c) => c.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    const matchesCrop =
      selectedCrop === "all" ||
      item.affectedCrops.some((c) => c.toLowerCase().includes(selectedCrop.toLowerCase()));

    return matchesSearch && matchesCategory && matchesCrop;
  });

  return (
    <div id="pest-library-section" className="max-w-5xl mx-auto space-y-5 pb-16">
      {/* Header Banner */}
      <div className="bg-emerald-900 rounded-3xl p-5 sm:p-7 text-white shadow-sm space-y-2">
        <div className="inline-flex items-center space-x-2 bg-emerald-800/80 text-emerald-100 text-xs px-3 py-1 rounded-full border border-emerald-600/40">
          <Bug className="w-3.5 h-3.5 text-amber-300" />
          <span>Multilingual Pest & Disease Compendium</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black">{t.pestLibrary}</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          {currentLanguage === "te"
            ? "భారతీయ పంటలను ఆశించే ముఖ్యమైన పురుగులు, శిలీంధ్ర, బ్యాక్టీరియల్ మరియు వైరస్ తెగుళ్ల సమగ్ర నివారణ సమాచారం."
            : "Searchable directory of Indian crop pests, fungal diseases, viruses, symptoms, and non-chemical IPM solutions."}
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200/90 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by pest name, Telugu/Hindi name (సుడిదోమ, थ्रिप्स), crop, or symptom..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-800 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                selectedCategory === "all"
                  ? "bg-emerald-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setSelectedCategory("pest")}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                selectedCategory === "pest"
                  ? "bg-emerald-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              🐛 Pests & Insects
            </button>
            <button
              onClick={() => setSelectedCategory("disease")}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                selectedCategory === "disease"
                  ? "bg-emerald-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              🍄 Fungal & Bacterial Diseases
            </button>
          </div>

          {/* Crop Filter */}
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-lg border border-slate-300 font-medium"
          >
            <option value="all">All Crops</option>
            <option value="Rice">🌾 Rice / Paddy</option>
            <option value="Chilli">🌶️ Chilli / Mirchi</option>
            <option value="Cotton">🌱 Cotton</option>
            <option value="Tomato">🍅 Tomato</option>
            <option value="Maize">🌽 Maize</option>
            <option value="Groundnut">🥜 Groundnut</option>
          </select>
        </div>
      </div>

      {/* Grid of Pest Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const localNameInLang =
            item.localNames[currentLanguage] ||
            item.localNames.te ||
            item.localNames.hi ||
            item.commonName;

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 flex flex-col justify-between hover:shadow-md transition"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.category.toUpperCase()} • {item.affectedCrops.join(", ")}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                      {item.commonName}
                    </h3>
                    <div className="text-xs font-semibold text-emerald-700">
                      {localNameInLang}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 italic">
                      {item.scientificName}
                    </div>
                  </div>

                  <img
                    src={item.imageUrl}
                    alt={item.commonName}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-200 shadow-xs"
                  />
                </div>

                {/* Symptoms Preview */}
                <div className="text-xs text-slate-600 space-y-1">
                  <div className="font-bold text-slate-800">Key Symptoms:</div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
                    {item.typicalSymptoms.slice(0, 2).map((sym, i) => (
                      <li key={i}>{sym}</li>
                    ))}
                  </ul>
                </div>

                {/* Biological Control Preview */}
                <div className="p-2.5 bg-emerald-50/70 rounded-xl text-[11px] text-emerald-950">
                  <strong>🌿 Biological:</strong> {item.biologicalControl[0]}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center space-x-1"
                >
                  <span>View Full IPM Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Item Full Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-5">
          <div className="bg-white text-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedItem.category.toUpperCase()} • {selectedItem.affectedCrops.join(", ")}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">{selectedItem.commonName}</h3>
                <div className="text-xs text-emerald-700 font-semibold">
                  {selectedItem.localNames[currentLanguage] || selectedItem.localNames.te}
                </div>
                <div className="text-xs font-mono text-slate-400 italic">{selectedItem.scientificName}</div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {/* Identification & Symptoms */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-800 uppercase tracking-wide">🔍 Identification Marks:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {selectedItem.identificationMarks.map((mark, i) => (
                  <li key={i}>{mark}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-800 uppercase tracking-wide">⚠️ Typical Damage Symptoms:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {selectedItem.typicalSymptoms.map((sym, i) => (
                  <li key={i}>{sym}</li>
                ))}
              </ul>
            </div>

            {/* Biological Control */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 text-xs">
              <div className="font-bold text-emerald-950 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Biological & Natural Predator Controls:</span>
              </div>
              <ul className="space-y-1 text-emerald-900">
                {selectedItem.biologicalControl.map((bio, i) => (
                  <li key={i}>🌿 {bio}</li>
                ))}
              </ul>
            </div>

            {/* Cultural & Mechanical */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">⚙️ Cultural Practices:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {selectedItem.culturalControl.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">🪤 Mechanical / Traps:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {selectedItem.mechanicalControl.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Chemical Control & Safety */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-1.5">
              <div className="font-bold text-amber-900">⚠️ Chemical Spray Protocol & Safety:</div>
              <ul className="space-y-1 text-amber-950">
                {selectedItem.chemicalControlSafety.map((chem, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span>•</span>
                    <span>{chem}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 rounded-xl text-xs transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
