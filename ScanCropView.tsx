import React, { useState, useRef } from "react";
import { LanguageCode, DiagnosisResult, FarmerCrop } from "../types";
import { TRANSLATIONS } from "../i18n/languages";
import { CROPS_LIST } from "../data/cropsList";
import { Camera, Image as ImageIcon, Sparkles, Upload, X, AlertCircle, CheckCircle2, ChevronDown, Info, PhoneCall, Key } from "lucide-react";
import { compressImageFile } from "../utils/imageCompressor";
import { diagnoseCropImageGemini, TELUGU_ERROR_MESSAGES } from "../utils/geminiService";
import { ApiKeySettingsModal } from "./ApiKeySettingsModal";

interface ScanCropViewProps {
  currentLanguage: LanguageCode;
  activeCrops: FarmerCrop[];
  onDiagnosisComplete: (diagnosis: DiagnosisResult) => void;
  onOpenVoice: () => void;
}

export const ScanCropView: React.FC<ScanCropViewProps> = ({
  currentLanguage,
  activeCrops,
  onDiagnosisComplete,
  onOpenVoice,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>("Rice / Paddy");
  const [variety, setVariety] = useState<string>("");
  const [growthStage, setGrowthStage] = useState<string>("Tillering");
  const [symptoms, setSymptoms] = useState<string>("");
  const [recentRain, setRecentRain] = useState<boolean>(false);
  const [irrigationType, setIrrigationType] = useState<string>("Canal / Drip");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analyzingStatus, setAnalyzingStatus] = useState<string>("Alochistunnanu...");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const matchedCropObj = CROPS_LIST.find((c) => c.name.toLowerCase().includes(selectedCrop.toLowerCase()) || selectedCrop.toLowerCase().includes(c.id));

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErrorMsg(null);
    const fileList = Array.from(files) as File[];

    for (const file of fileList) {
      try {
        // Compress image file to < 1MB
        const compressedBase64 = await compressImageFile(file, 0.85, 1200);
        setSelectedImages((prev) => [...prev, compressedBase64].slice(0, 3));
      } catch (err) {
        console.warn("Image compression fallback to direct FileReader:", err);
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setSelectedImages((prev) => [...prev, event.target!.result as string].slice(0, 3));
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const loadSampleImage = (url: string, cropName: string, defaultStage: string) => {
    setSelectedImages([url]);
    setSelectedCrop(cropName);
    setGrowthStage(defaultStage);
    setErrorMsg(null);
  };

  const handleStartDiagnosis = async () => {
    if (selectedImages.length === 0 && symptoms.trim() === "") {
      setErrorMsg(
        currentLanguage === "te"
          ? "దయచేసి కనీసం 1 ఫోటో తీయండి లేదా లక్షణాలను వివరించండి."
          : "Please take/upload at least 1 photo of the affected leaf/plant, or describe the symptoms."
      );
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);
    setAnalyzingStatus(TELUGU_ERROR_MESSAGES.THINKING);

    const langName =
      currentLanguage === "te"
        ? "Telugu"
        : currentLanguage === "hi"
        ? "Hindi"
        : currentLanguage === "ta"
        ? "Tamil"
        : currentLanguage === "kn"
        ? "Kannada"
        : currentLanguage === "ml"
        ? "Malayalam"
        : currentLanguage === "mr"
        ? "Marathi"
        : currentLanguage === "bn"
        ? "Bengali"
        : currentLanguage === "gu"
        ? "Gujarati"
        : currentLanguage === "pa"
        ? "Punjabi"
        : "English";

    try {
      if (selectedImages.length > 0) {
        // Run multimodal vision diagnosis with retry and error categorization
        const visionResult = await diagnoseCropImageGemini(
          selectedImages[0],
          selectedCrop,
          langName,
          (status) => setAnalyzingStatus(status)
        );

        const fullDiagnosis: DiagnosisResult = {
          id: `diag-${Date.now()}`,
          timestamp: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }),
          cropIdentified: visionResult.cropIdentified || selectedCrop,
          cropVariety: variety || undefined,
          growthStage,
          problemDetected: visionResult.problemDetected,
          problemType: visionResult.problemType || "pest",
          confidence: {
            level: visionResult.severity === "Severe" ? "high" : "moderate",
            scorePercent: 88,
            reason: "AI Vision analysis from compressed leaf image."
          },
          isUrgentAlert: visionResult.severity === "Severe",
          urgentAlertDetails: visionResult.severity === "Severe" ? {
            title: "తీవ్రమైన పురుగు/తెగులు హెచ్చరిక (Severe Pest Alert)",
            dangerReason: "పురుగు లేదా తెగులు ఉధృతి ఎక్కువగా ఉంది. సకాలంలో నివారించకపోతే పంట దిగుబడి దెబ్బతినే అవకాశం ఉంది.",
            emergencyActions: [visionResult.organicSolution, visionResult.chemicalSolution],
            whatNotToDo: ["అధిక నత్రజని వాడకం నివారించండి", "రక్షణ పరికరాలు లేకుండా రసాయనాలు చల్లవద్దు"]
          } : null,
          visibleSymptoms: `ఆకు మరియు కాండంపై గుర్తించిన లక్షణాలు: ${visionResult.problemDetected}`,
          likelyCause: `${visionResult.problemDetected} ఉధృతి మరియు వాతావరణ పరిస్థితులు.`,
          immediateActions: visionResult.immediateActions || [
            "చేనులో వెంటనే పరిశీలించండి.",
            "సేంద్రీయ లేదా రసాయన నివారణ చర్యలు చేపట్టండి."
          ],
          actionPlan: {
            rightNow: {
              immediate: [
                visionResult.organicSolution,
                visionResult.chemicalSolution
              ],
              avoid: ["అధిక నత్రజని వాడకం నివారించండి."],
              checkParts: ["ఆకుల క్రింది భాగం", "కాండం మొదలు"]
            },
            next24Hours: [
              `మోతాదు: ${visionResult.dosagePerAcre}`,
              "మందు పిచికారీ సమయంలో మాస్క్ మరియు గ్లౌజులు ధరించండి."
            ],
            next7Days: ["7 రోజుల తర్వాత చేను పరిశీలించి మళ్ళీ అవసరమైతే స్ప్రే చేయండి."],
            whenToSeekExpert: "లక్షణాలు తగ్గకపోతే కిసాన్ కాల్ సెంటర్ 1800-180-1551 కి కాల్ చేయండి."
          },
          treatment: {
            approach: "సమగ్ర సస్యరక్షణ (Integrated Pest Management - IPM)",
            biologicalOrOrganic: [visionResult.organicSolution],
            culturalOrMechanical: ["బాధిత ఆకులను తీసివేయండి.", "లింగాకర్షక బుట్టలు లేదా జిగురు అట్టలు అమర్చండి."],
            chemicalDisclaimer: "పురుగుమందులను లేబుల్ సూచనల ప్రకారం మాత్రమే వాడండి.",
            chemicalTreatment: `${visionResult.chemicalSolution} (${visionResult.dosagePerAcre})`,
            ppeAndSafetyWarnings: ["పిచికారీ సమయంలో ముఖానికి మాస్క్, చేతులకు తొడుగులు ధరించండి."],
            preHarvestInterval: "కోతకు 10-15 రోజుల ముందు రసాయన పిచికారీ నిలిపివేయండి."
          },
          waterAssessment: "మురుగు నీరు నిలవకుండా డ్రైనేజీ సదుపాయం చేయండి.",
          nutritionAssessment: "సమతుల్య ఎరువుల యాజమాన్యం పాటించండి.",
          prevention: ["సర్టిఫైడ్ విత్తనాలు వాడండి.", "పంట మార్పిడి చేయండి."],
          followUpQuestions: ["పొలంలో ఎన్ని ఎకరాలలో ఈ లక్షణాలు కనిపిస్తున్నాయి?"],
          expertGuidanceNote: "కిసాన్ కాల్ సెంటర్: 1800-180-1551.",
          localizedSummary: visionResult.localizedSummary || "రోగ నిర్ధారణ పూర్తయింది. దయచేసి వివరాలను పరిశీలించండి.",
          imageUrls: selectedImages,
          timelineStage: "Day 1"
        };

        onDiagnosisComplete(fullDiagnosis);
        return;
      }

      // If text symptoms only, invoke API route
      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          images: selectedImages,
          crop: selectedCrop,
          variety,
          stage: growthStage,
          symptoms,
          location: "Andhra Pradesh / Telangana / India",
          recentRain,
          irrigationType,
          language: langName
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Failed to diagnose crop");
      }

      const result = await response.json();
      const fullDiagnosis: DiagnosisResult = {
        id: `diag-${Date.now()}`,
        timestamp: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        cropIdentified: result.cropIdentified || selectedCrop,
        cropVariety: variety || undefined,
        growthStage,
        problemDetected: result.problemDetected || "Unknown condition",
        problemType: result.problemType || "uncertain",
        confidence: result.confidence || {
          level: "moderate",
          scorePercent: 75,
          reason: "Diagnosed from visual leaf and symptom submission."
        },
        isUrgentAlert: !!result.isUrgentAlert,
        urgentAlertDetails: result.urgentAlertDetails || null,
        visibleSymptoms: result.visibleSymptoms || "Visual symptoms analyzed.",
        likelyCause: result.likelyCause || "Biological or environmental factor.",
        immediateActions: result.immediateActions || ["Inspect field perimeter.", "Adjust watering."],
        actionPlan: result.actionPlan || {
          rightNow: {
            immediate: ["Isolate affected plants.", "Avoid overhead irrigation."],
            avoid: ["Do not apply excess fertilizer."],
            checkParts: ["Underside of leaves", "Base of stem"]
          },
          next24Hours: ["Monitor for spread."],
          next7Days: ["Re-evaluate leaf health."],
          whenToSeekExpert: "If symptoms spread over >20% field area."
        },
        treatment: result.treatment || {
          approach: "Integrated Pest Management (IPM) guidelines.",
          biologicalOrOrganic: ["Neem oil spray (10000 ppm) @ 2-3 ml/L."],
          culturalOrMechanical: ["Prune diseased leaves."],
          chemicalDisclaimer: "Verify registration and follow label.",
          chemicalTreatment: null,
          ppeAndSafetyWarnings: ["Wear gloves and mask."],
          preHarvestInterval: null
        },
        waterAssessment: result.waterAssessment || "Ensure proper drainage.",
        nutritionAssessment: result.nutritionAssessment || "Maintain balanced fertilization.",
        prevention: result.prevention || ["Use certified seeds.", "Rotate crops."],
        followUpQuestions: result.followUpQuestions || ["Are symptoms spread across the plot?"],
        expertGuidanceNote: result.expertGuidanceNote || "Kisan Call Center: 1800-180-1551.",
        localizedSummary: result.localizedSummary || "రోగ నిర్ధారణ పూర్తయింది.",
        imageUrls: selectedImages.length > 0 ? selectedImages : ["https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80"],
        timelineStage: "Day 1"
      };

      onDiagnosisComplete(fullDiagnosis);
    } catch (err: any) {
      console.error(err);
      let msg = err?.teluguMessage || err.message || "సమస్య ఏర్పడింది. దయచేసి మళ్ళీ ప్రయత్నించండి.";
      if (err?.category === "NO_API_KEY") {
        msg = TELUGU_ERROR_MESSAGES.NO_API_KEY;
      } else if (err?.category === "OFFLINE") {
        msg = TELUGU_ERROR_MESSAGES.OFFLINE;
      } else if (err?.category === "INVALID_KEY") {
        msg = TELUGU_ERROR_MESSAGES.INVALID_KEY;
      } else if (err?.category === "QUOTA_EXCEEDED") {
        msg = TELUGU_ERROR_MESSAGES.QUOTA_EXCEEDED;
      }
      setErrorMsg(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div id="scan-crop-section" className="max-w-4xl mx-auto space-y-5 pb-10">
      {/* Title Banner */}
      <div className="bg-emerald-800 rounded-3xl p-5 sm:p-7 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-emerald-700/80 text-emerald-100 text-xs px-3 py-1 rounded-full mb-3 border border-emerald-500/40">
            <Camera className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Multimodal Vision Diagnosis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">{t.scanCrop}</h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
            {currentLanguage === "te"
              ? "మీ పంట ఆకు, పురుగు, కాండం లేదా వేరు ఫోటో తీయండి. AI వెంటనే రోగాన్ని గుర్తించి ఖచ్చితమైన నివారణ చర్యలను అందిస్తుంది."
              : currentLanguage === "hi"
              ? "अपनी फसल की पत्ती, कीट या तने की फोटो खींचें। AI तुरंत रोग पहचान कर सही समाधान बताएगा।"
              : "Take a photo of affected leaves, insects, stem, or roots. AI analyzes symptoms and delivers safe, actionable steps."}
          </p>
        </div>
      </div>

      {/* Main Upload Box */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80 space-y-6">
        
        {/* Photo Upload Actions */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            1. {t.uploadImage} / {t.takePhoto}
          </label>

          {/* Hidden File Inputs */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
          <input
            type="file"
            ref={cameraInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            capture="environment"
            className="hidden"
          />

          {/* Image Previews */}
          {selectedImages.length > 0 ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {selectedImages.map((img, idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden aspect-4/3 border-2 border-emerald-600 shadow-xs group">
                    <img src={img} alt={`Crop upload ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white p-1 rounded-full transition"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      Photo {idx + 1}
                    </span>
                  </div>
                ))}

                {selectedImages.length < 3 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-slate-500 hover:text-emerald-700 bg-slate-50 transition aspect-4/3"
                  >
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium">+ Add photo</span>
                    <span className="text-[10px] text-slate-400">Up to 3 images</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/40 rounded-3xl p-6 text-center space-y-4">
              <div className="flex justify-center space-x-3">
                <button
                  type="button"
                  id="camera-take-photo-btn"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-sm transition"
                >
                  <Camera className="w-5 h-5" />
                  <span>{t.takePhoto}</span>
                </button>

                <button
                  type="button"
                  id="gallery-upload-photo-btn"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 bg-white hover:bg-slate-100 text-emerald-800 font-bold text-sm px-5 py-3 rounded-2xl border border-emerald-300 shadow-xs transition"
                >
                  <ImageIcon className="w-5 h-5 text-emerald-600" />
                  <span>{t.uploadImage}</span>
                </button>
              </div>

              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Tip: Take clear, well-lit photos of leaf underside, insect, or stem base for accurate AI diagnosis.
              </p>
            </div>
          )}
        </div>

        {/* Quick Sample Photos Picker */}
        <div className="pt-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{t.chooseSample}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            <button
              type="button"
              onClick={() =>
                loadSampleImage(
                  "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80",
                  "Rice / Paddy",
                  "Tillering"
                )
              }
              className="p-2 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-left transition flex flex-col items-start"
            >
              <span className="text-base mb-1">🌾</span>
              <span className="text-xs font-semibold text-slate-800 leading-tight">Rice (BPH)</span>
              <span className="text-[10px] text-slate-400">Pest sample</span>
            </button>

            <button
              type="button"
              onClick={() =>
                loadSampleImage(
                  "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80",
                  "Tomato",
                  "Flowering"
                )
              }
              className="p-2 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-left transition flex flex-col items-start"
            >
              <span className="text-base mb-1">🍅</span>
              <span className="text-xs font-semibold text-slate-800 leading-tight">Tomato Blight</span>
              <span className="text-[10px] text-slate-400">Fungal leaf spot</span>
            </button>

            <button
              type="button"
              onClick={() =>
                loadSampleImage(
                  "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80",
                  "Chilli / Mirchi",
                  "Vegetative"
                )
              }
              className="p-2 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-left transition flex flex-col items-start"
            >
              <span className="text-base mb-1">🌶️</span>
              <span className="text-xs font-semibold text-slate-800 leading-tight">Chilli Thrips</span>
              <span className="text-[10px] text-slate-400">Leaf curl</span>
            </button>

            <button
              type="button"
              onClick={() =>
                loadSampleImage(
                  "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80",
                  "Cotton",
                  "Squaring (Buds)"
                )
              }
              className="p-2 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-left transition flex flex-col items-start"
            >
              <span className="text-base mb-1">🌱</span>
              <span className="text-xs font-semibold text-slate-800 leading-tight">Cotton Mg-Def</span>
              <span className="text-[10px] text-slate-400">Leaf reddening</span>
            </button>

            <button
              type="button"
              onClick={() =>
                loadSampleImage(
                  "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80",
                  "Maize / Corn",
                  "Knee-high (V6-V8)"
                )
              }
              className="p-2 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-left transition flex flex-col items-start"
            >
              <span className="text-base mb-1">🌽</span>
              <span className="text-xs font-semibold text-slate-800 leading-tight">Maize Waterlog</span>
              <span className="text-[10px] text-slate-400">Drainage stress</span>
            </button>

            <button
              type="button"
              onClick={() =>
                loadSampleImage(
                  "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80",
                  "Groundnut / Peanut",
                  "Pegging (Pod Initiation)"
                )
              }
              className="p-2 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-left transition flex flex-col items-start"
            >
              <span className="text-base mb-1">🥜</span>
              <span className="text-xs font-semibold text-slate-800 leading-tight">Groundnut Tikka</span>
              <span className="text-[10px] text-slate-400">Cercospora spot</span>
            </button>
          </div>
        </div>

        {/* Crop Details Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.cropType}</label>
            <select
              value={selectedCrop}
              onChange={(e) => {
                setSelectedCrop(e.target.value);
                const crop = CROPS_LIST.find((c) => c.name === e.target.value);
                if (crop && crop.stages.length > 0) setGrowthStage(crop.stages[0]);
              }}
              className="w-full bg-slate-50 text-slate-800 text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
            >
              {CROPS_LIST.map((crop) => (
                <option key={crop.id} value={crop.name}>
                  {crop.icon} {crop.name} ({crop.teluguName})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.growthStage}</label>
            <select
              value={growthStage}
              onChange={(e) => setGrowthStage(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {matchedCropObj?.stages.map((stage, idx) => (
                <option key={idx} value={stage}>
                  {stage}
                </option>
              )) || (
                <>
                  <option value="Seedling">Seedling</option>
                  <option value="Vegetative">Vegetative</option>
                  <option value="Flowering">Flowering</option>
                  <option value="Fruiting / Grain Fill">Fruiting / Grain Fill</option>
                  <option value="Harvest">Maturity / Harvest</option>
                </>
              )}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t.symptomsOptional}
            </label>
            <textarea
              rows={2}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., Lower leaves turning yellow with brown spots, tiny insects visible on leaf underside..."
              className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Environmental Checks */}
          <div className="flex items-center space-x-4 sm:col-span-2 pt-1 text-xs text-slate-600">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={recentRain}
                onChange={(e) => setRecentRain(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span>Rained heavily in last 48 hours</span>
            </label>
          </div>
        </div>

        {/* Safety Disclaimer Info */}
        <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900 flex items-start space-x-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Agricultural Safety Protocol:</strong> AgriMitra AI prioritizes non-chemical biological and cultural IPM solutions first. Chemical active ingredients are provided with strict PPE guidelines and verification warnings.
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3.5 bg-red-50 rounded-2xl border border-red-200 text-xs text-red-800 flex flex-col space-y-2">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span className="font-semibold">{errorMsg}</span>
            </div>
            {errorMsg.includes("API Key") && (
              <button
                type="button"
                onClick={() => setShowSettingsModal(true)}
                className="w-fit px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow-xs self-start"
              >
                <Key className="w-3.5 h-3.5 text-amber-300" />
                <span>API Key Settings ని తెరవండి</span>
              </button>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          id="start-diagnosis-submit-btn"
          type="button"
          onClick={handleStartDiagnosis}
          disabled={isAnalyzing}
          className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-extrabold text-base rounded-2xl shadow-sm transition flex items-center justify-center space-x-2"
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
              <span>{analyzingStatus || t.diagnosing}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>{t.startDiagnosis}</span>
            </>
          )}
        </button>
      </div>

      <ApiKeySettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </div>
  );
};
