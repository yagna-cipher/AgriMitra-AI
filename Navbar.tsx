import React, { useState, useEffect } from "react";
import { LanguageCode } from "../types";
import { AVAILABLE_LANGUAGES, TRANSLATIONS } from "../i18n/languages";
import { Globe, PhoneCall, Sparkles, Sprout, AlertTriangle, X, Check, Key } from "lucide-react";
import { ApiKeySettingsModal } from "./ApiKeySettingsModal";
import { getSavedApiKey } from "../utils/storage";

interface NavbarProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onOpenVoice: () => void;
  onSelectDemoCase: (demoId: string) => void;
  onOpenSettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenVoice,
  onSelectDemoCase,
  onOpenSettings,
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showHelplineModal, setShowHelplineModal] = useState(false);
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    setHasApiKey(!!getSavedApiKey());
  }, [showSettingsModal]);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const currentLangObj = AVAILABLE_LANGUAGES.find((l) => l.code === currentLanguage);

  return (
    <>
      <header id="main-header" className="bg-emerald-800 text-white border-b border-emerald-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-inner border border-emerald-400/40">
              <Sprout className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h1 className="font-bold text-lg sm:text-xl tracking-tight text-white leading-tight">
                  {t.appName}
                </h1>
                <span className="bg-amber-400/90 text-emerald-950 font-extrabold text-[10px] uppercase px-1.5 py-0.5 rounded tracking-wide">
                  AI
                </span>
              </div>
              <p className="text-emerald-200 text-xs hidden sm:block leading-none">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            {/* Quick Demo Cases Button */}
            <div className="relative">
              <button
                id="demo-selector-btn"
                onClick={() => setShowDemoMenu(!showDemoMenu)}
                className="flex items-center space-x-1 bg-emerald-700/80 hover:bg-emerald-700 text-emerald-100 text-xs px-2.5 py-1.5 rounded-lg border border-emerald-600 transition"
                title="Explore Demo Cases"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden md:inline font-medium">Demo Cases</span>
              </button>

              {showDemoMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-md border border-slate-200 py-2 z-50">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Select a Demo Case
                  </div>
                  <button
                    onClick={() => {
                      onSelectDemoCase("demo-rice-bph");
                      setShowDemoMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 flex items-center space-x-2"
                  >
                    <span>🌾</span>
                    <div>
                      <div className="font-semibold">Rice: Brown Planthopper (BPH)</div>
                      <div className="text-[10px] text-slate-500">Pest & Hopper Burn Alert</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      onSelectDemoCase("demo-tomato-early-blight");
                      setShowDemoMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 flex items-center space-x-2"
                  >
                    <span>🍅</span>
                    <div>
                      <div className="font-semibold">Tomato: Early Blight</div>
                      <div className="text-[10px] text-slate-500">Fungal Leaf Spot & Halos</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      onSelectDemoCase("demo-chilli-thrips");
                      setShowDemoMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 flex items-center space-x-2"
                  >
                    <span>🌶️</span>
                    <div>
                      <div className="font-semibold">Chilli: Thrips & Leaf Curl</div>
                      <div className="text-[10px] text-slate-500">Upward Cupping & IPM</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      onSelectDemoCase("demo-cotton-nutrient-deficiency");
                      setShowDemoMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 flex items-center space-x-2"
                  >
                    <span>🌱</span>
                    <div>
                      <div className="font-semibold">Cotton: Magnesium Deficiency</div>
                      <div className="text-[10px] text-slate-500">Leaf Reddening vs Jassids</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      onSelectDemoCase("demo-maize-water-stress");
                      setShowDemoMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 flex items-center space-x-2"
                  >
                    <span>🌽</span>
                    <div>
                      <div className="font-semibold">Maize: Waterlogging & Hypoxia</div>
                      <div className="text-[10px] text-slate-500">Root Drainage Urgent Plan</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      onSelectDemoCase("demo-groundnut-tikka");
                      setShowDemoMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 flex items-center space-x-2"
                  >
                    <span>🥜</span>
                    <div>
                      <div className="font-semibold">Groundnut: Tikka Leaf Spot</div>
                      <div className="text-[10px] text-slate-500">Cercospora & Gypsum</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* API Key Settings Button */}
            <button
              id="api-key-settings-btn"
              onClick={() => {
                if (onOpenSettings) onOpenSettings();
                else setShowSettingsModal(true);
              }}
              className={`flex items-center space-x-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition ${
                hasApiKey
                  ? "bg-emerald-700/80 hover:bg-emerald-700 text-amber-300 border-emerald-500"
                  : "bg-amber-500/90 hover:bg-amber-400 text-emerald-950 font-bold border-amber-300"
              }`}
              title="Gemini API Key Settings"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{hasApiKey ? "API Key" : "Set API Key"}</span>
            </button>

            {/* Emergency Helpline Button */}
            <button
              id="emergency-helpline-btn"
              onClick={() => setShowHelplineModal(true)}
              className="flex items-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-semibold text-xs px-2.5 py-1.5 rounded-lg shadow-sm transition"
              title="Kisan Call Center & Support"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">1800-180-1551</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center space-x-1.5 bg-emerald-900/60 hover:bg-emerald-900 text-white text-xs px-2.5 py-1.5 rounded-lg border border-emerald-600 transition"
              aria-label="Language selection"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-300" />
              <span className="font-bold">{currentLangObj?.nativeName || "తెలుగు"}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 max-h-80 overflow-y-auto">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                  <span>{t.selectLanguage}</span>
                  <Globe className="w-3 h-3 text-slate-400" />
                </div>
                {AVAILABLE_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition ${
                      currentLanguage === lang.code ? "bg-emerald-50/80 font-bold text-emerald-800" : "text-slate-700"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-base">{lang.flagEmoji}</span>
                      <div>
                        <div className="text-sm font-semibold">{lang.nativeName}</div>
                        <div className="text-[10px] text-slate-400">{lang.name}</div>
                      </div>
                    </div>
                    {currentLanguage === lang.code && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Kisan Call Center Helpline Modal */}
      {showHelplineModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-100">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-emerald-800">
                <PhoneCall className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base">Agricultural Expert Helplines</h3>
              </div>
              <button
                onClick={() => setShowHelplineModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-slate-600">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <div className="font-bold text-amber-900 text-sm flex items-center space-x-1.5 mb-1">
                  <span>🌾 Kisan Call Center (KCC)</span>
                </div>
                <p className="text-amber-800 text-xs mb-2">
                  Toll-Free Government Helpline available 6:00 AM to 10:00 PM in all Indian regional languages.
                </p>
                <a
                  href="tel:18001801551"
                  className="inline-flex items-center justify-center w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-sm shadow-sm transition"
                >
                  <PhoneCall className="w-4 h-4 mr-2" /> Call 1800-180-1551 (Toll-Free)
                </a>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="font-semibold text-slate-800">District Agricultural Centers</div>
                <p className="text-[11px] text-slate-500">
                  You can also visit your nearest **Krishi Vigyan Kendra (KVK)** or Mandal Agricultural Office for free soil testing, on-field diagnostic verification, and subsidized certified seeds.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowHelplineModal(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700 rounded-lg text-xs transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>

    <ApiKeySettingsModal
      isOpen={showSettingsModal}
      onClose={() => setShowSettingsModal(false)}
      onKeyUpdated={(has) => setHasApiKey(has)}
    />
  </>
  );
};
