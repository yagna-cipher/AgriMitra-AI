import React, { useState, useRef, useEffect } from "react";
import { LanguageCode, FarmerCrop, ChatMessage } from "../types";
import { FEATURES_I18N } from "../i18n/featuresI18n";
import { queryGeminiVoice } from "../utils/geminiService";
import { TextSpeaker } from "../utils/speech";
import {
  MessageSquare,
  Send,
  Sparkles,
  Volume2,
  Pause,
  RotateCcw,
  Camera,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Bot,
  User,
  ArrowRight
} from "lucide-react";

interface AskAgriMitraViewProps {
  currentLanguage: LanguageCode;
  activeCrops: FarmerCrop[];
  onOpenScanCrop: () => void;
}

export const AskAgriMitraView: React.FC<AskAgriMitraViewProps> = ({
  currentLanguage,
  activeCrops,
  onOpenScanCrop
}) => {
  const i18n = FEATURES_I18N[currentLanguage]?.advisor || FEATURES_I18N.en.advisor;

  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(activeCrops[0]?.name || "Rice / Paddy");
  const [speechState, setSpeechState] = useState<"idle" | "speaking" | "paused">("idle");
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "initial-welcome",
      role: "assistant",
      text:
        currentLanguage === "te"
          ? "నమస్కారం! నేను మీ అగ్రి మిత్ర AI వ్యవసాయ సలహాదారుని. మీ పంటల ఆరోగ్యం, నీటిపారుదల, ఎరువుల మోతాదు లేదా చీడపీడల గురించి ఏదైనా అడగండి."
          : currentLanguage === "hi"
          ? "नमस्ते! मैं आपका अग्रि मित्र AI कृषि सलाहकार हूँ। अपनी फसल, रोग, खाद या सिंचाई के बारे में कोई भी प्रश्न पूछें।"
          : "Hello! I am your Agri Mitra AI Farm Advisor. Ask me anything about crop health, irrigation schedules, fertilizer doses, or pest management.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      followUpPrompts: i18n.suggestionPrompts.slice(0, 3)
    }
  ]);

  const speakerRef = useRef<TextSpeaker | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    speakerRef.current = new TextSpeaker((state) => {
      setSpeechState(state);
    });
    return () => {
      speakerRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery("");
    setIsLoading(true);

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
      const response = await queryGeminiVoice(textToSend, langName, {
        selectedCrop,
        activeCrops: activeCrops.map((c) => ({
          name: c.name,
          variety: c.variety,
          stage: c.growthStage
        }))
      });

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        text: response.text,
        speechText: response.speechText || response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedActions: response.suggestedActions || [],
        followUpPrompts: response.followUpPrompts || []
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (assistantMessage.speechText) {
        speakerRef.current?.speak(assistantMessage.speechText, currentLanguage);
      }
    } catch (err: any) {
      console.warn("Advisor query fallback:", err);
      const fallbackMessage: ChatMessage = {
        id: `fallback-${Date.now()}`,
        role: "assistant",
        text:
          currentLanguage === "te"
            ? "మీ ప్రశ్నకు ధన్యవాదాలు. పంట సమస్యను ఖచ్చితంగా తెలుసుకోవడానికి దయచేసి 'స్కాన్ క్రాప్' కెమెరాతో ఆకు ఫోటో తీసి పరిశీలించండి."
            : "Thank you for your question. For accurate crop diagnosis, consider taking a clear leaf photo using the Scan Crop camera.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSpeak = (text: string) => {
    if (speechState === "speaking") {
      speakerRef.current?.pause();
    } else if (speechState === "paused") {
      speakerRef.current?.resume();
    } else {
      speakerRef.current?.speak(text, currentLanguage);
    }
  };

  return (
    <div id="ask-agri-mitra-view" className="space-y-4 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-800 rounded-2xl p-5 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-xs font-semibold text-emerald-100 mb-1.5">
            <Bot className="w-3.5 h-3.5 text-emerald-300" />
            <span>Interactive AI Agricultural Consultation</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">{i18n.title}</h1>
          <p className="text-emerald-100/90 text-xs sm:text-sm mt-0.5">
            {i18n.subtitle}
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="text-xs bg-emerald-900/80 border border-emerald-500/40 text-white rounded-lg p-2 font-medium focus:outline-none"
          >
            {activeCrops.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
            <option value="General Farming">General Crop Inquiry</option>
          </select>
        </div>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick:</span>
        </span>
        {i18n.suggestionPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 shrink-0 transition shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col h-[480px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isAI = msg.role === "assistant";
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${
                  isAI ? "justify-start" : "justify-end"
                }`}
              >
                {isAI && (
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="w-4 h-4 text-amber-300" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 shadow-2xs ${
                    isAI
                      ? "bg-slate-50 border border-slate-200 text-slate-800"
                      : "bg-emerald-700 text-white"
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium">
                    {msg.text}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 text-[10px] text-slate-400">
                    <span>{msg.timestamp}</span>

                    {isAI && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleSpeak(msg.speechText || msg.text)}
                          className="hover:text-emerald-700 text-slate-500 flex items-center space-x-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Listen</span>
                        </button>

                        <button
                          onClick={onOpenScanCrop}
                          className="hover:text-emerald-700 text-emerald-800 font-bold flex items-center space-x-1 ml-2"
                        >
                          <Camera className="w-3.5 h-3.5 text-rose-500" />
                          <span>Scan Leaf</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Follow up suggestions */}
                  {msg.followUpPrompts && msg.followUpPrompts.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/60 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Follow-up suggestions:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.followUpPrompts.map((fu, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(fu)}
                            className="text-[11px] bg-white hover:bg-emerald-50 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 text-left transition"
                          >
                            👉 {fu}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {!isAI && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 w-fit">
              <Sparkles className="w-4 h-4 animate-spin text-amber-500" />
              <span>Agri Mitra AI is preparing agricultural recommendations...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputQuery);
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={i18n.askPlaceholder}
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition shrink-0"
            >
              <span>{i18n.askButton}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-[10px] text-slate-400 mt-2 text-center">
            {i18n.disclaimer} Always consult local agricultural officers (KVK / ADA) for emergency outbreaks.
          </p>
        </div>
      </div>
    </div>
  );
};
