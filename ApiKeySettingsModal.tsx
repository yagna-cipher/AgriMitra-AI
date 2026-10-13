import React, { useState, useEffect } from "react";
import { Key, Check, AlertCircle, X, ShieldCheck, RefreshCw, Eye, EyeOff } from "lucide-react";
import { getSavedApiKey, saveApiKey } from "../utils/storage";
import { TELUGU_ERROR_MESSAGES } from "../utils/geminiService";

interface ApiKeySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated?: (hasKey: boolean) => void;
}

export const ApiKeySettingsModal: React.FC<ApiKeySettingsModalProps> = ({
  isOpen,
  onClose,
  onKeyUpdated
}) => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const saved = getSavedApiKey();
      setApiKey(saved);
      setStatusMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = apiKey.trim();
    if (!trimmed) {
      saveApiKey("");
      setStatusMessage({
        type: "info",
        text: "API Key తొలగించబడింది. (Default server / fallback modes will be used)"
      });
      if (onKeyUpdated) onKeyUpdated(false);
      return;
    }

    if (trimmed.length < 15) {
      setStatusMessage({
        type: "error",
        text: TELUGU_ERROR_MESSAGES.INVALID_KEY
      });
      return;
    }

    saveApiKey(trimmed);
    setStatusMessage({
      type: "success",
      text: "✓ API Key విజయవంతంగా సేవ్ చేయబడింది! (Saved to localStorage)"
    });
    if (onKeyUpdated) onKeyUpdated(true);

    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setApiKey("");
    saveApiKey("");
    setStatusMessage({
      type: "info",
      text: "API Key cleared from this browser."
    });
    if (onKeyUpdated) onKeyUpdated(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-lg overflow-hidden border border-emerald-700/20 text-slate-800">
        
        {/* Header */}
        <div className="bg-emerald-800 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center border border-emerald-500/40">
              <Key className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg leading-tight">
                Gemini API Key Settings (సెట్టింగ్స్)
              </h2>
              <p className="text-emerald-200 text-xs">
                వ్యక్తిగత Google Gemini API కీని నమోదు చేయండి
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-emerald-700 text-emerald-200 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start space-x-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950">
                {TELUGU_ERROR_MESSAGES.NO_API_KEY}
              </p>
              <p className="text-[11px] mt-0.5 text-amber-800">
                Paste your Google AI Studio Gemini API key below to unlock unlimited voice queries, real-time disease diagnosis, and offline-resilient agricultural advice.
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Gemini API Key (AI Studio Key)
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-mono pr-20 focus:outline-none transition shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 text-xs flex items-center space-x-1"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved safely in your browser localStorage only.</span>
            </p>
          </div>

          {statusMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
                statusMessage.type === "success"
                  ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                  : statusMessage.type === "error"
                  ? "bg-red-100 text-red-900 border border-red-300"
                  : "bg-slate-100 text-slate-800 border border-slate-300"
              }`}
            >
              {statusMessage.type === "success" && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
              {statusMessage.type === "error" && <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Quick Helper Links */}
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-xs space-y-1.5">
            <div className="font-bold text-slate-700">కీ ఎలా పొందాలి (How to get Gemini Key):</div>
            <ol className="list-decimal list-inside text-slate-600 space-y-1 text-[11px]">
              <li>Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline">Google AI Studio (aistudio.google.com)</a></li>
              <li>Click <strong>"Get API key"</strong> & create a free key</li>
              <li>Paste it in the box above and click Save.</li>
            </ol>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleClear}
              type="button"
              className="text-xs text-slate-500 hover:text-red-600 font-semibold px-3 py-2"
            >
              Clear Key
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
              >
                రద్దు (Cancel)
              </button>
              <button
                onClick={handleSave}
                type="button"
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md transition flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4 text-emerald-200" />
                <span>సేవ్ చేయండి (Save Key)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
