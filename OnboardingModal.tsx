import React from "react";
import { LanguageCode } from "../types";
import { AVAILABLE_LANGUAGES, TRANSLATIONS } from "../i18n/languages";
import { Sprout, Check, Globe, Sparkles } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  selectedLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  selectedLanguage,
  onSelectLanguage,
  onComplete,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[selectedLanguage] || TRANSLATIONS.en;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-lg space-y-6 border border-emerald-100">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Sprout className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {t.appName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.appSubtitle}
          </p>
        </div>

        {/* Language Selection Grid */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider text-center">
            {t.selectLanguage} (మీ భాషను ఎంచుకోండి)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto p-1">
            {AVAILABLE_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => onSelectLanguage(lang.code)}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                  selectedLanguage === lang.code
                    ? "bg-emerald-700 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/50"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{lang.flagEmoji}</span>
                  {selectedLanguage === lang.code && <Check className="w-4 h-4 text-emerald-200" />}
                </div>
                <div className="mt-1">
                  <div className="font-bold text-xs leading-tight">{lang.nativeName}</div>
                  <div className="text-[10px] opacity-75">{lang.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onComplete}
          className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-base rounded-2xl shadow-sm transition flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>{selectedLanguage === "te" ? "ప్రారంభించండి (Get Started)" : "Get Started"}</span>
        </button>
      </div>
    </div>
  );
};
