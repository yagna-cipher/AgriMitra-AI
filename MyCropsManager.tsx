import React, { useState } from "react";
import { LanguageCode, FarmerCrop } from "../types";
import { TRANSLATIONS } from "../i18n/languages";
import { CROPS_LIST } from "../data/cropsList";
import { Sprout, Plus, Trash2, Edit2, CheckCircle2, AlertTriangle, X } from "lucide-react";

interface MyCropsManagerProps {
  crops: FarmerCrop[];
  onUpdateCrops: (crops: FarmerCrop[]) => void;
  currentLanguage: LanguageCode;
  onOpenScanCropForCrop?: (cropName: string) => void;
}

export const MyCropsManager: React.FC<MyCropsManagerProps> = ({
  crops,
  onUpdateCrops,
  currentLanguage,
  onOpenScanCropForCrop,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCropName, setNewCropName] = useState("Rice / Paddy");
  const [newVariety, setNewVariety] = useState("BPT 5204");
  const [newArea, setNewArea] = useState("3.0");
  const [newStage, setNewStage] = useState("Tillering");
  const [newIrrigation, setNewIrrigation] = useState("Canal");
  const [newSoil, setNewSoil] = useState("Clay Loam");

  const handleAddCrop = () => {
    const cropObj = CROPS_LIST.find((c) => c.name.toLowerCase().includes(newCropName.toLowerCase())) || CROPS_LIST[0];
    const newCrop: FarmerCrop = {
      id: `crop-${Date.now()}`,
      name: `${cropObj.name} (${cropObj.teluguName})`,
      variety: newVariety,
      icon: cropObj.icon,
      areaAcres: parseFloat(newArea) || 1,
      sowingDate: new Date().toISOString().split("T")[0],
      growthStage: newStage,
      irrigationType: newIrrigation,
      soilType: newSoil,
      activeIssuesCount: 0
    };

    onUpdateCrops([newCrop, ...crops]);
    setShowAddModal(false);
  };

  const handleDeleteCrop = (id: string) => {
    onUpdateCrops(crops.filter((c) => c.id !== id));
  };

  return (
    <div id="my-crops-section" className="max-w-4xl mx-auto space-y-5 pb-16">
      {/* Banner */}
      <div className="bg-emerald-800 rounded-3xl p-5 sm:p-7 text-white shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center space-x-2 bg-emerald-700/80 text-emerald-100 text-xs px-3 py-1 rounded-full border border-emerald-500/40">
            <Sprout className="w-3.5 h-3.5 text-amber-300" />
            <span>Farm Field Manager</span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addCrop}</span>
          </button>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black">{t.myCrops}</h2>
          <p className="text-xs sm:text-sm text-emerald-100">
            {currentLanguage === "te"
              ? "మీ పొలంలో సాగు చేస్తున్న పంటలు, విస్తీర్ణం, రకాలు మరియు వృద్ధి దశలను నమోదు చేయండి."
              : "Manage your active cultivated crops, acreage, varieties, growth stages, and health statuses."}
          </p>
        </div>
      </div>

      {/* Crop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {crops.map((crop) => (
          <div
            key={crop.id}
            className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/90 space-y-4 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl p-2.5 bg-emerald-50 rounded-2xl border border-emerald-200">
                  {crop.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 leading-tight">
                    {crop.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Variety: <strong>{crop.variety}</strong> • {crop.areaAcres} Acres
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDeleteCrop(crop.id)}
                className="text-slate-300 hover:text-red-600 p-1.5 rounded-lg transition"
                title="Remove crop"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Stage</span>
                <span className="font-semibold text-slate-800">{crop.growthStage}</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Water & Soil</span>
                <span className="font-semibold text-slate-800">{crop.irrigationType}</span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between border-t border-slate-100 text-xs">
              <span className="text-slate-500 text-[11px]">
                Sown on: {crop.sowingDate}
              </span>

              {onOpenScanCropForCrop && (
                <button
                  onClick={() => onOpenScanCropForCrop(crop.name)}
                  className="font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
                >
                  <span>Scan Health</span>
                  <span>→</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Crop Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Add Crop to My Farm</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Crop</label>
                <select
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-300 font-medium"
                >
                  {CROPS_LIST.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.icon} {c.name} ({c.teluguName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Variety / Seed Name</label>
                <input
                  type="text"
                  value={newVariety}
                  onChange={(e) => setNewVariety(e.target.value)}
                  placeholder="e.g. BPT 5204, Teja, Arka Rakshak..."
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Area (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Current Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="Seedling / Nursery">Seedling / Nursery</option>
                    <option value="Tillering / Vegetative">Tillering / Vegetative</option>
                    <option value="Flowering">Flowering</option>
                    <option value="Grain / Fruit Filling">Grain / Fruit Filling</option>
                    <option value="Maturity / Harvest">Maturity / Harvest</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Irrigation Source</label>
                  <select
                    value={newIrrigation}
                    onChange={(e) => setNewIrrigation(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="Canal">Canal</option>
                    <option value="Borewell">Borewell</option>
                    <option value="Drip">Drip Irrigation</option>
                    <option value="Rainfed">Rainfed</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Soil Type</label>
                  <select
                    value={newSoil}
                    onChange={(e) => setNewSoil(e.target.value)}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="Clay Loam">Clay Loam (నల్లరేగడి)</option>
                    <option value="Red Sandy Loam">Red Sandy (ఎర్రనేల)</option>
                    <option value="Alluvial">Alluvial (ఒండ్రు)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2 flex space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCrop}
                className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Save Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
