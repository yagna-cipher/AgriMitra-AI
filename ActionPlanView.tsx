import React, { useState } from "react";
import { LanguageCode, DiagnosisResult } from "../types";
import { TRANSLATIONS } from "../i18n/languages";
import { TextSpeaker } from "../utils/speech";
import {
  AlertTriangle,
  Clock,
  Calendar,
  ShieldAlert,
  Volume2,
  ArrowLeft,
  CheckSquare,
  Square,
  Sparkles,
  PhoneCall
} from "lucide-react";

interface ActionPlanViewProps {
  diagnosis: DiagnosisResult | null;
  allDiagnoses: DiagnosisResult[];
  onSelectDiagnosis: (diag: DiagnosisResult) => void;
  currentLanguage: LanguageCode;
  onBack: () => void;
}

export const ActionPlanView: React.FC<ActionPlanViewProps> = ({
  diagnosis,
  allDiagnoses,
  onSelectDiagnosis,
  currentLanguage,
  onBack,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const currentDiag = diagnosis || allDiagnoses[0];

  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [, setSpeechState] = useState<"idle" | "speaking" | "paused">("idle");

  if (!currentDiag) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-16 px-4 space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800">{t.noHistoryYet}</h3>
        <p className="text-xs text-slate-500">
          {t.startFirstScan}
        </p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
        >
          {t.backToDashboard}
        </button>
      </div>
    );
  }

  const toggleTask = (key: string) => {
    setCompletedTasks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReadPlan = () => {
    const speaker = new TextSpeaker((state) => setSpeechState(state));
    const textToSpeak = `${t.rightNow}: ${currentDiag.actionPlan.rightNow.immediate.join(". ")}. ${t.whatToAvoid}: ${currentDiag.actionPlan.rightNow.avoid.join(". ")}. ${t.next24Hours}: ${currentDiag.actionPlan.next24Hours.join(". ")}. ${t.next7Days}: ${currentDiag.actionPlan.next7Days.join(". ")}`;
    speaker.speak(textToSpeak, currentLanguage);
  };

  const plan = currentDiag.actionPlan;

  return (
    <div id="action-plan-section" className="w-full max-w-4xl mx-auto space-y-5 pb-16 px-3 sm:px-4">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-white hover:bg-emerald-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToDashboard}</span>
        </button>

        {/* Diagnosis Switcher */}
        {allDiagnoses.length > 1 && (
          <select
            value={currentDiag.id}
            onChange={(e) => {
              const found = allDiagnoses.find((d) => d.id === e.target.value);
              if (found) onSelectDiagnosis(found);
            }}
            className="bg-white text-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-300 font-semibold shadow-xs max-w-[200px] sm:max-w-xs truncate"
          >
            {allDiagnoses.map((d) => (
              <option key={d.id} value={d.id}>
                {d.cropIdentified}: {d.problemDetected}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Header Banner */}
      <div className="bg-amber-600 rounded-3xl p-5 sm:p-7 text-white shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center space-x-2 bg-amber-800/80 text-amber-100 text-xs px-3 py-1 rounded-full border border-amber-400/40">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{t.emergencyAlert}</span>
          </div>

          <button
            onClick={handleReadPlan}
            className="flex items-center space-x-1.5 bg-white text-amber-950 font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs hover:bg-amber-50 transition"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.readAloud}</span>
          </button>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black">{t.whatToDoNow}</h2>
          <p className="text-xs sm:text-sm text-amber-100 mt-1 break-words">
            <strong>{currentDiag.cropIdentified}</strong> — <strong>{currentDiag.problemDetected}</strong>
          </p>
        </div>
      </div>

      {/* Phase 1: RIGHT NOW */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border-2 border-red-200 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center font-black">
              ⚡
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-slate-900">{t.rightNow}</h3>
              <p className="text-xs text-red-600 font-medium">{t.doThisNow}</p>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider bg-red-50 text-red-700 px-2.5 py-1 rounded-lg border border-red-200">
            {t.urgentPriority}
          </span>
        </div>

        {/* Immediate Checklist */}
        <div className="space-y-2.5">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            {t.immediateChecklistHeader}
          </div>
          {plan.rightNow.immediate.map((item, idx) => {
            const taskId = `rightNow-${idx}`;
            const isDone = !!completedTasks[taskId];
            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleTask(taskId)}
                className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start space-x-3 ${
                  isDone
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900 line-through opacity-80"
                    : "bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800"
                }`}
              >
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                )}
                <span className="text-xs sm:text-sm font-medium leading-relaxed break-words">{item}</span>
              </button>
            );
          })}
        </div>

        {/* What to Avoid */}
        {plan.rightNow.avoid && plan.rightNow.avoid.length > 0 && (
          <div className="p-4 bg-red-50/70 rounded-2xl border border-red-200 space-y-2">
            <div className="text-xs font-bold text-red-900 flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>{t.whatToAvoid}:</span>
            </div>
            <ul className="space-y-1 text-xs text-red-800">
              {plan.rightNow.avoid.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-red-600 font-bold">✕</span>
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* What Plant Parts to Check */}
        {plan.rightNow.checkParts && plan.rightNow.checkParts.length > 0 && (
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2">
            <div className="text-xs font-bold text-amber-900 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t.partsToCheck}:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {plan.rightNow.checkParts.map((part, idx) => (
                <span
                  key={idx}
                  className="bg-white text-amber-950 text-xs px-3 py-1.5 rounded-xl border border-amber-300 font-semibold shadow-xs break-words"
                >
                  🔍 {part}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Phase 2: NEXT 24 HOURS */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/90 space-y-4">
        <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
          <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base sm:text-lg text-slate-900">{t.next24Hours}</h3>
          </div>
        </div>

        <div className="space-y-2">
          {plan.next24Hours.map((item, idx) => {
            const taskId = `24h-${idx}`;
            const isDone = !!completedTasks[taskId];
            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleTask(taskId)}
                className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start space-x-3 ${
                  isDone
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900 line-through opacity-80"
                    : "bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800"
                }`}
              >
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                )}
                <span className="text-xs sm:text-sm font-medium leading-relaxed break-words">{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phase 3: NEXT 7 DAYS */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/90 space-y-4">
        <div className="flex items-center space-x-2.5 border-b border-slate-100 pb-3">
          <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base sm:text-lg text-slate-900">{t.next7Days}</h3>
          </div>
        </div>

        <div className="space-y-2">
          {plan.next7Days.map((item, idx) => {
            const taskId = `7d-${idx}`;
            const isDone = !!completedTasks[taskId];
            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleTask(taskId)}
                className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start space-x-3 ${
                  isDone
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900 line-through opacity-80"
                    : "bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800"
                }`}
              >
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                )}
                <span className="text-xs sm:text-sm font-medium leading-relaxed break-words">{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phase 4: WHEN TO SEEK EXPERT HELP */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-lg space-y-4">
        <div className="flex items-center space-x-2.5">
          <PhoneCall className="w-5 h-5 text-amber-400 shrink-0" />
          <h3 className="font-bold text-base sm:text-lg">{t.whenToContactExpert}</h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
          {plan.whenToSeekExpert}
        </p>

        <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs">
            <span className="font-bold text-amber-400">{t.kisanCallCenter}</span>
          </div>
          <a
            href="tel:18001801551"
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs"
          >
            {t.callKisanHelpline}
          </a>
        </div>
      </div>
    </div>
  );
};
