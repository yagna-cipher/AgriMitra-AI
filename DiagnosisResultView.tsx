import React, { useState, useEffect, useRef } from "react";
import { LanguageCode, DiagnosisResult } from "../types";
import { TRANSLATIONS } from "../i18n/languages";
import { TextSpeaker } from "../utils/speech";
import {
  Volume2,
  Pause,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Droplets,
  FlaskConical,
  ShieldCheck,
  ArrowLeft,
  ChevronRight,
  MessageSquare,
  Send,
  Camera
} from "lucide-react";

interface DiagnosisResultViewProps {
  diagnosis: DiagnosisResult;
  currentLanguage: LanguageCode;
  onBack: () => void;
  onOpenActionPlan: () => void;
  onOpenScanCrop: () => void;
  onOpenVoice: () => void;
}

export const DiagnosisResultView: React.FC<DiagnosisResultViewProps> = ({
  diagnosis,
  currentLanguage,
  onBack,
  onOpenActionPlan,
  onOpenScanCrop,
  onOpenVoice,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [speechState, setSpeechState] = useState<"idle" | "speaking" | "paused">("idle");
  const [followUpQuery, setFollowUpQuery] = useState("");
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [followUpAnswers, setFollowUpAnswers] = useState<Array<{ q: string; a: string }>>([]);

  const speakerRef = useRef<TextSpeaker | null>(null);

  useEffect(() => {
    speakerRef.current = new TextSpeaker((state) => {
      setSpeechState(state);
    });

    return () => {
      speakerRef.current?.stop();
    };
  }, []);

  const handleReadAloud = () => {
    if (speechState === "speaking") {
      speakerRef.current?.pause();
    } else if (speechState === "paused") {
      speakerRef.current?.resume();
    } else {
      const fullSpeech = `${diagnosis.localizedSummary}. ${t.doThisNow}: ${diagnosis.immediateActions.join(". ")}`;
      speakerRef.current?.speak(fullSpeech, currentLanguage);
    }
  };

  const handleReplay = () => {
    speakerRef.current?.stop();
    const fullSpeech = `${diagnosis.localizedSummary}. ${t.doThisNow}: ${diagnosis.immediateActions.join(". ")}`;
    speakerRef.current?.speak(fullSpeech, currentLanguage);
  };

  const handleAskFollowUp = async (questionText: string) => {
    if (!questionText.trim()) return;

    setFollowUpLoading(true);
    try {
      const res = await fetch("/api/voice-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Regarding diagnosis of ${diagnosis.cropIdentified} having ${diagnosis.problemDetected}: ${questionText}`,
          language: currentLanguage === "te" ? "Telugu" : currentLanguage === "hi" ? "Hindi" : currentLanguage === "ta" ? "Tamil" : "English"
        })
      });

      if (res.ok) {
        const data = await res.json();
        setFollowUpAnswers((prev) => [...prev, { q: questionText, a: data.text }]);
        setFollowUpQuery("");
        if (data.speechText) {
          speakerRef.current?.speak(data.speechText, currentLanguage);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFollowUpLoading(false);
    }
  };

  // Confidence styling
  const confLevel = diagnosis.confidence.level;
  const confBadgeColor =
    confLevel === "high"
      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
      : confLevel === "moderate"
      ? "bg-amber-100 text-amber-900 border-amber-300"
      : "bg-red-100 text-red-800 border-red-300";

  const confLabel =
    confLevel === "high"
      ? t.highConfidence
      : confLevel === "moderate"
      ? t.moderateConfidence
      : t.lowConfidence;

  const confIcon =
    confLevel === "high" ? "🟢" : confLevel === "moderate" ? "🟡" : "🔴";

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 pb-16 px-3 sm:px-4">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-white hover:bg-emerald-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToDashboard}</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenActionPlan}
            className="flex items-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-sm transition"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{t.whatToDoNow}</span>
          </button>
        </div>
      </div>

      {/* 🚨 Urgent Alert Banner if present */}
      {diagnosis.isUrgentAlert && diagnosis.urgentAlertDetails && (
        <div className="bg-red-600 text-white rounded-3xl p-4 sm:p-6 shadow-xl border-2 border-red-400">
          <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="p-2 bg-white/20 rounded-xl shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-300" />
            </div>
            <div className="flex-1 space-y-2 w-full">
              <span className="text-[11px] font-black tracking-widest uppercase bg-black/30 px-2 py-0.5 rounded inline-block">
                🚨 {t.emergencyAlert}
              </span>
              <h3 className="text-lg sm:text-xl font-black break-words">{diagnosis.urgentAlertDetails.title}</h3>
              <p className="text-xs sm:text-sm text-red-100 leading-relaxed break-words">
                {diagnosis.urgentAlertDetails.dangerReason}
              </p>

              <div className="pt-2 border-t border-red-500/60 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-red-700/60 p-3 rounded-xl">
                  <div className="font-bold text-amber-200 mb-1">{t.doThisNow}:</div>
                  <ul className="list-disc list-inside space-y-1 text-red-100">
                    {diagnosis.urgentAlertDetails.emergencyActions.map((act, i) => (
                      <li key={i} className="break-words">{act}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-700/60 p-3 rounded-xl">
                  <div className="font-bold text-amber-200 mb-1">{t.whatToAvoid}:</div>
                  <ul className="list-disc list-inside space-y-1 text-red-100">
                    {diagnosis.urgentAlertDetails.whatNotToDo.map((act, i) => (
                      <li key={i} className="break-words">{act}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Header Card with Photo and Main Diagnosis */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/90">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Image */}
          <div className="md:col-span-1 bg-slate-900 relative min-h-[220px] max-h-[320px] overflow-hidden">
            <img
              src={diagnosis.imageUrls[0] || "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80"}
              alt={diagnosis.cropIdentified}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-black/75 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
              {diagnosis.cropIdentified}
            </div>
            {diagnosis.timelineStage && (
              <div className="absolute bottom-3 left-3 bg-emerald-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow">
                {t.timelineStage}: {diagnosis.timelineStage}
              </div>
            )}
          </div>

          {/* Diagnosis Headline & Summary */}
          <div className="md:col-span-2 p-5 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${confBadgeColor} flex items-center space-x-1`}>
                  <span>{confIcon}</span>
                  <span>{t.confidence}: {diagnosis.confidence.scorePercent}% ({confLabel})</span>
                </span>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {diagnosis.timestamp}
                </span>
              </div>

              {/* 1. What I Found */}
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  🌱 {t.whatIFound}
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-tight break-words">
                  {diagnosis.problemDetected}
                </h2>
                <div className="text-xs text-slate-600 mt-1">
                  <strong>{t.cropType}:</strong> {diagnosis.cropIdentified} {diagnosis.cropVariety ? `(${diagnosis.cropVariety})` : ""} • <strong>{t.growthStage}:</strong> {diagnosis.growthStage || "Vegetative"}
                </div>
              </div>

              {/* Localized Spoken Explanation Card */}
              <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200/80 text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium break-words">
                {diagnosis.localizedSummary}
              </div>
            </div>

            {/* Read Aloud Audio Controls */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <button
                  id="read-aloud-main-btn"
                  onClick={handleReadAloud}
                  className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
                >
                  {speechState === "speaking" ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>{t.pause}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-amber-300" />
                      <span>{t.readAloud}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReplay}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                  title={t.replay}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={onOpenVoice}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center space-x-1"
              >
                <span>🎙️ {t.voiceAssistant}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Uncertainty Notice if Low Confidence */}
      {diagnosis.confidence.level === "low" && (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 flex items-start space-x-3 text-xs text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-sm">{t.lowConfidence}</div>
            <p>{t.lowConfidenceTip}</p>
            <div className="pt-1 flex space-x-2">
              <button
                onClick={onOpenScanCrop}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{t.takeAnotherPhoto}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚨 Do This Now: Immediate Practical Steps */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/90 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-emerald-950 flex items-center justify-center font-black">
              🚨
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-slate-900">{t.doThisNow}</h3>
              <p className="text-xs text-slate-500">{t.rightNow}</p>
            </div>
          </div>

          <button
            onClick={onOpenActionPlan}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1 bg-emerald-50 px-3 py-1.5 rounded-lg"
          >
            <span>{t.whatToDoNow}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {diagnosis.immediateActions.map((action, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 p-3 bg-slate-50 hover:bg-emerald-50/50 rounded-2xl border border-slate-200/70 transition"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium break-words">
                {action}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Observed Symptoms & Likely Cause */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/90 space-y-2">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
            🔍 {t.observedSymptoms}
          </span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed break-words">
            {diagnosis.visibleSymptoms}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/90 space-y-2">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
            🧬 {t.likelyCause}
          </span>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed break-words">
            {diagnosis.likelyCause}
          </p>
        </div>
      </div>

      {/* 💊 Treatment & Management */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/90 space-y-5">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            💊
          </div>
          <div>
            <h3 className="font-black text-base sm:text-lg text-slate-900">{t.treatment}</h3>
            <p className="text-xs text-slate-500">{diagnosis.treatment.approach || t.treatment}</p>
          </div>
        </div>

        {/* Biological / Organic Options */}
        {diagnosis.treatment.biologicalOrOrganic && diagnosis.treatment.biologicalOrOrganic.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold text-emerald-900 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.biologicalOrganic}</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {diagnosis.treatment.biologicalOrOrganic.map((bio, idx) => (
                <li key={idx} className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-200/60 text-emerald-950 font-medium break-words">
                  🌿 {bio}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cultural & Mechanical Practices */}
        {diagnosis.treatment.culturalOrMechanical && diagnosis.treatment.culturalOrMechanical.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0" />
              <span>{t.culturalMechanical}</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {diagnosis.treatment.culturalOrMechanical.map((cult, idx) => (
                <li key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 break-words">
                  ⚙️ {cult}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Chemical Treatment & Safety Rules */}
        {diagnosis.treatment.chemicalTreatment && (
          <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-amber-900 flex items-center space-x-1">
                <span>⚠️ {t.chemicalTreatmentHeader}</span>
              </span>
              {diagnosis.treatment.preHarvestInterval && (
                <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                  {diagnosis.treatment.preHarvestInterval}
                </span>
              )}
            </div>

            <div className="text-xs font-bold text-slate-900 bg-white p-3 rounded-xl border border-amber-300 shadow-xs break-words">
              {diagnosis.treatment.chemicalTreatment}
            </div>

            <div className="text-[11px] text-amber-800 italic break-words">
              * {diagnosis.treatment.chemicalDisclaimer || t.pesticideCaution}
            </div>

            {/* PPE Warnings */}
            {diagnosis.treatment.ppeAndSafetyWarnings && diagnosis.treatment.ppeAndSafetyWarnings.length > 0 && (
              <div className="pt-2 border-t border-amber-200/60 space-y-1 text-xs text-amber-900">
                <div className="font-bold text-[11px] uppercase tracking-wide">{t.ppeSafetyHeading}</div>
                <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                  {diagnosis.treatment.ppeAndSafetyWarnings.map((warn, idx) => (
                    <li key={idx} className="break-words">{warn}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Water & Nutrition Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/90 space-y-2">
          <div className="flex items-center space-x-2 text-sky-800">
            <Droplets className="w-5 h-5 text-sky-600 shrink-0" />
            <h4 className="font-bold text-sm sm:text-base">{t.water}</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-words">
            {diagnosis.waterAssessment}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/90 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-800">
            <FlaskConical className="w-5 h-5 text-emerald-600 shrink-0" />
            <h4 className="font-bold text-sm sm:text-base">{t.nutrition}</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-words">
            {diagnosis.nutritionAssessment}
          </p>
        </div>
      </div>

      {/* 🛡️ Long-Term Prevention */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/90 space-y-3">
        <div className="flex items-center space-x-2 text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <h4 className="font-bold text-sm sm:text-base">{t.prevention}</h4>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {diagnosis.prevention.map((prev, idx) => (
            <li key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 flex items-start space-x-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span className="break-words">{prev}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 👨‍🌾 When to Contact an Expert */}
      <div className="bg-emerald-900 text-white rounded-3xl p-5 sm:p-7 shadow-sm space-y-3">
        <div className="flex items-center space-x-2">
          <PhoneCall className="w-5 h-5 text-amber-400 shrink-0" />
          <h4 className="font-bold text-base">{t.whenToContactExpert}</h4>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
          {diagnosis.actionPlan.whenToSeekExpert || diagnosis.expertGuidanceNote}
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href="tel:18001801551"
            className="inline-flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-sm transition"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t.kisanCallCenter}</span>
          </a>
        </div>
      </div>

      {/* Follow-Up Intelligence & Questions */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/90 space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2.5">
          <MessageSquare className="w-5 h-5 text-emerald-700 shrink-0" />
          <div>
            <h4 className="font-bold text-sm sm:text-base text-slate-800">{t.askFollowUp}</h4>
            <p className="text-xs text-slate-400">{t.voiceAssistant}</p>
          </div>
        </div>

        {/* Quick follow up prompts */}
        {diagnosis.followUpQuestions && diagnosis.followUpQuestions.length > 0 && (
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-slate-500 uppercase">{t.suggestedFollowUps}</div>
            <div className="flex flex-wrap gap-2">
              {diagnosis.followUpQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleAskFollowUp(q)}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs px-3 py-1.5 rounded-xl border border-emerald-200 transition text-left break-words"
                >
                  💬 {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Answered Follow-Ups Stream */}
        {followUpAnswers.length > 0 && (
          <div className="space-y-3 pt-2">
            {followUpAnswers.map((item, idx) => (
              <div key={idx} className="space-y-1.5 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="font-bold text-emerald-900">Q: {item.q}</div>
                <div className="text-slate-700 whitespace-pre-line leading-relaxed break-words">{item.a}</div>
              </div>
            ))}
          </div>
        )}

        {/* Query Input */}
        <div className="flex items-center space-x-2 pt-2">
          <input
            type="text"
            value={followUpQuery}
            onChange={(e) => setFollowUpQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAskFollowUp(followUpQuery);
            }}
            placeholder={t.askAiPlaceholder}
            className="flex-1 bg-slate-50 text-slate-800 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-w-0"
          />
          <button
            onClick={() => handleAskFollowUp(followUpQuery)}
            disabled={followUpLoading || !followUpQuery.trim()}
            className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl shadow-xs transition shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
