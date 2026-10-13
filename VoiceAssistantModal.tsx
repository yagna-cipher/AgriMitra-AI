import React, { useState, useEffect, useRef } from "react";
import { LanguageCode, ChatMessage, FarmerCrop } from "../types";
import { TRANSLATIONS } from "../i18n/languages";
import { SpeechRecognizer, TextSpeaker } from "../utils/speech";
import { Mic, MicOff, Volume2, Pause, RotateCcw, X, Send, Sparkles, Sprout, Key, PhoneCall, AlertTriangle, WifiOff } from "lucide-react";
import { queryGeminiVoice, TELUGU_ERROR_MESSAGES } from "../utils/geminiService";
import { ApiKeySettingsModal } from "./ApiKeySettingsModal";

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  activeCrops: FarmerCrop[];
  onOpenScanCrop?: () => void;
  onOpenActionPlan?: () => void;
  onOpenSettings?: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  activeCrops,
  onOpenScanCrop,
  onOpenActionPlan,
  onOpenSettings
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Alochistunnanu...");
  const [speechState, setSpeechState] = useState<"idle" | "speaking" | "paused">("idle");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>(activeCrops[0]?.name || "Rice / Paddy");
  const [showKeyModal, setShowKeyModal] = useState(false);

  const recognizerRef = useRef<SpeechRecognizer | null>(null);
  const speakerRef = useRef<TextSpeaker | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize Speech and Speaker
  useEffect(() => {
    recognizerRef.current = new SpeechRecognizer();
    speakerRef.current = new TextSpeaker((state) => {
      setSpeechState(state);
    });

    // Initial greeting in the farmer's language
    const greetingText = t.welcomeGreeting;
    setMessages([
      {
        id: "msg-welcome",
        role: "assistant",
        text: greetingText,
        speechText: greetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        followUpPrompts: [
          currentLanguage === "te"
            ? "Na vari akulu pasupu ranguloki marutunnayi"
            : currentLanguage === "hi"
            ? "धान की पत्तियां पीली पड़ रही हैं"
            : "My paddy leaves are turning yellow and there are insects",
          currentLanguage === "te"
            ? "మిరప తోటలో తామర పురుగుల నివారణ ఎలా?"
            : currentLanguage === "hi"
            ? "मिर्च में थ्रिप्स और मरोड़िया रोग का इलाज کیا ہے?"
            : "How to manage thrips and leaf curl in chilli?",
          currentLanguage === "te"
            ? "ఈరోజు మందు పిచికారీ చేయవచ్చా?"
            : "Is today suitable for pesticide spraying?"
        ]
      }
    ]);

    return () => {
      recognizerRef.current?.stop();
      speakerRef.current?.stop();
    };
  }, [currentLanguage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const toggleListening = () => {
    if (isListening) {
      recognizerRef.current?.stop();
      setIsListening(false);
    } else {
      speakerRef.current?.stop();
      setTranscript("");
      setIsListening(true);

      recognizerRef.current?.start(
        currentLanguage,
        (text, isFinal) => {
          setTranscript(text);
          if (isFinal) {
            setIsListening(false);
            sendMessage(text);
          }
        },
        (error) => {
          console.warn("Speech recognition notice:", error);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  const sendMessage = async (textToSend: string) => {
    if (!textToSend || textToSend.trim() === "") return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setTranscript("");
    setIsLoading(true);
    setLoadingStatus(TELUGU_ERROR_MESSAGES.THINKING);

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
      const data = await queryGeminiVoice(
        textToSend,
        langName,
        {
          selectedCrop,
          activeCrops: activeCrops.map((c) => ({ name: c.name, variety: c.variety, stage: c.growthStage }))
        },
        (status) => setLoadingStatus(status)
      );

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: data.text || "వ్యవసాయ సలహా సిద్ధమైంది.",
        speechText: data.speechText || data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedActions: data.suggestedActions || [],
        followUpPrompts: data.followUpPrompts || [],
        detectedCrop: data.detectedCrop,
        detectedIssue: data.detectedIssue
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Automatically read aloud the short conversational summary in Telugu/target language
      if (assistantMsg.speechText) {
        speakerRef.current?.speak(assistantMsg.speechText, currentLanguage);
      }
    } catch (err: any) {
      console.error("Assistant error:", err);

      let displayText = err?.teluguMessage || "సమస్య ఏర్పడింది. దయచేసి మళ్ళీ ప్రయత్నించండి.";
      let speechAudio = displayText;

      if (err?.category === "NO_API_KEY") {
        displayText = `⚠️ **${TELUGU_ERROR_MESSAGES.NO_API_KEY}**\n\nGoogle Gemini API Key నమోదు చేయలేదు. దయచేసి పైన ఉన్న 'API Key Settings' బటన్ నొక్కి మీ ఉచిత Google AI Studio Keyని పేస్ట్ చేయండి.`;
        speechAudio = "దయచేసి API Key ని సెట్టింగ్స్‌లో పెట్టండి.";
      } else if (err?.category === "OFFLINE") {
        displayText = `📶 **${TELUGU_ERROR_MESSAGES.OFFLINE}**\n\nదయచేసి మీ ఇంటర్నెట్ కనెక్షన్, వైఫై లేదా మొబైల్ డేటా ఆన్ లో ఉందో లేదో తనిఖీ చేయండి.`;
        speechAudio = "ఇంటర్నెట్ లేదు. దయచేసి వైఫై ఆన్ చేయండి.";
      } else if (err?.category === "INVALID_KEY") {
        displayText = `🔑 **${TELUGU_ERROR_MESSAGES.INVALID_KEY}**\n\nమీరు నమోదు చేసిన Gemini API కీ సరిగ్గా లేదు. దయచేసి Google AI Studio నుండి సరైన కీని కాపీ చేసి సెట్టింగ్స్‌లో సేవ్ చేయండి.`;
        speechAudio = "API Key తప్పు. మళ్ళీ చెక్ చేయండి.";
      } else if (err?.category === "QUOTA_EXCEEDED") {
        displayText = `⏳ **${TELUGU_ERROR_MESSAGES.QUOTA_EXCEEDED}**\n\nసర్వర్ లేదా API పరిమితి పూర్తయింది. కాసేపు ఆగి మళ్ళీ ప్రయత్నించండి.`;
        speechAudio = "కొంచెం సేపు ఆగండి, మళ్ళీ ప్రయత్నించండి.";
      } else if (err?.category === "MAX_RETRIES_EXCEEDED") {
        displayText = `📞 **కిసాన్ కాల్ సెంటర్ సహాయం:**\n\n3 సార్లు ప్రయత్నించినప్పటికీ సమాచారం అందలేదు. తక్షణ సహాయం కోసం టోల్-ఫ్రీ కిసాన్ కాల్ సెంటర్ నంబర్ కు కాల్ చేయండి:\n\n👉 **1800-180-1551** (ఉచిత కాల్)`;
        speechAudio = "కిసాన్ కాల్ సెంటర్ నంబర్ 1800-180-1551 కి కాల్ చేయండి.";
      }

      const fallbackMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        text: displayText,
        speechText: speechAudio,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      speakerRef.current?.speak(speechAudio, currentLanguage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReadAloud = (text: string) => {
    if (speechState === "speaking") {
      speakerRef.current?.pause();
    } else if (speechState === "paused") {
      speakerRef.current?.resume();
    } else {
      speakerRef.current?.speak(text, currentLanguage);
    }
  };

  const handleReplay = (text: string) => {
    speakerRef.current?.stop();
    speakerRef.current?.speak(text, currentLanguage);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-slate-50 w-full max-w-2xl h-[92vh] max-h-[780px] rounded-3xl shadow-lg flex flex-col overflow-hidden border border-emerald-700/20">
          
          {/* Header */}
          <div className="bg-emerald-800 text-white px-4 py-3 flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center border border-emerald-500/50">
                <Mic className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h2 className="font-bold text-base sm:text-lg leading-tight flex items-center space-x-1.5">
                  <span>{t.voiceAssistant}</span>
                  <span className="text-[10px] bg-emerald-600 px-1.5 py-0.5 rounded font-mono uppercase">Live</span>
                </h2>
                <p className="text-emerald-200 text-[11px]">
                  {currentLanguage === "te"
                    ? "మీ భాషలో మాట్లాడండి, తక్షణ వ్యవసాయ సలహా పొందండి"
                    : currentLanguage === "hi"
                    ? "अपनी भाषा में बोलें और तुरंत कृषि सलाह पाएं"
                    : "Speak naturally in your language for farming advice"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Settings / API Key Button */}
              <button
                onClick={() => setShowKeyModal(true)}
                className="p-1.5 bg-emerald-700/80 hover:bg-emerald-700 rounded-lg text-amber-300 border border-emerald-600 transition flex items-center space-x-1 text-xs"
                title="API Key Settings"
              >
                <Key className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Settings</span>
              </button>

              {/* Active Crop Filter Pill */}
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="bg-emerald-900/80 text-emerald-100 text-xs px-2.5 py-1 rounded-lg border border-emerald-700 focus:outline-none"
              >
                {activeCrops.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.icon} {c.name}
                  </option>
                ))}
                <option value="General Farming">🌾 General / Other</option>
              </select>

              <button
                onClick={() => {
                  speakerRef.current?.stop();
                  recognizerRef.current?.stop();
                  onClose();
                }}
                className="p-1.5 rounded-full hover:bg-emerald-700 text-emerald-200 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat / Transcript Stream */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-3.5 sm:p-4 shadow-sm text-xs sm:text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-emerald-700 text-white rounded-br-none"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-none"
                  }`}
                >
                  {/* Crop or Issue Detected Tag */}
                  {msg.role === "assistant" && (msg.detectedCrop || msg.detectedIssue) && (
                    <div className="mb-2 flex flex-wrap gap-1.5 text-[10px]">
                      {msg.detectedCrop && (
                        <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-md flex items-center">
                          <Sprout className="w-3 h-3 mr-1" /> {msg.detectedCrop}
                        </span>
                      )}
                      {msg.detectedIssue && (
                        <span className="bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-md">
                          ⚠️ {msg.detectedIssue}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Immediate Suggested Actions */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
                      <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                        {t.doThisNow}:
                      </div>
                      {msg.suggestedActions.map((action, idx) => (
                        <div key={idx} className="flex items-start space-x-1.5 text-xs text-slate-700">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Direct Action Shortcuts: Scan Crop from Voice & View Action Plan */}
                  {msg.role === "assistant" && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-2">
                      {onOpenScanCrop && (
                        <button
                          onClick={() => {
                            speakerRef.current?.stop();
                            recognizerRef.current?.stop();
                            onClose();
                            onOpenScanCrop();
                          }}
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center space-x-1 transition"
                        >
                          <span>📷</span>
                          <span>{t.scanCrop}</span>
                        </button>
                      )}
                      {onOpenActionPlan && (
                        <button
                          onClick={() => {
                            speakerRef.current?.stop();
                            recognizerRef.current?.stop();
                            onClose();
                            onOpenActionPlan();
                          }}
                          className="bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-amber-200 flex items-center space-x-1 transition"
                        >
                          <span>🚨</span>
                          <span>{t.whatToDoNow}</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* If error with API Key, show quick action button */}
                  {msg.role === "assistant" && msg.text.includes("API Key") && (
                    <div className="mt-3 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setShowKeyModal(true)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-xs"
                      >
                        <Key className="w-3.5 h-3.5 text-amber-300" />
                        <span>API Key నమోదు చేయండి (Open Settings)</span>
                      </button>
                    </div>
                  )}

                  {/* Speech Controls Bar */}
                  {msg.role === "assistant" && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => handleReadAloud(msg.speechText || msg.text)}
                          className="flex items-center space-x-1 px-2 py-1 rounded bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition"
                        >
                          {speechState === "speaking" ? (
                            <>
                              <Pause className="w-3 h-3 text-emerald-600" />
                              <span>{t.pause}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-emerald-600" />
                              <span>{t.readAloud}</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleReplay(msg.speechText || msg.text)}
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
                          title={t.replay}
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                    </div>
                  )}
                </div>

                {/* Quick Prompt Suggestion Chips */}
                {msg.role === "assistant" && msg.followUpPrompts && msg.followUpPrompts.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[85%]">
                    {msg.followUpPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(prompt)}
                        className="bg-white hover:bg-emerald-50 text-emerald-900 text-xs px-2.5 py-1 rounded-full border border-emerald-200 shadow-xs transition flex items-center space-x-1"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>{prompt}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Live Transcript / Loading Waveform */}
            {isLoading && (
              <div className="flex items-center space-x-2 text-emerald-800 bg-emerald-50 p-3 rounded-2xl w-fit border border-emerald-200 text-xs shadow-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                </div>
                <span className="font-bold">{loadingStatus}</span>
              </div>
            )}

            {isListening && (
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3.5 text-xs text-amber-900 flex items-center space-x-3 shadow-inner">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div>
                  <div className="font-bold">{t.listening}</div>
                  <div className="text-slate-700 italic">
                    {transcript || t.speakNow}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Big Central Microphone Button & Voice Control Dock */}
          <div className="bg-white border-t border-slate-200 p-3 sm:p-4 flex flex-col space-y-2.5">
            {/* Main Action Touch Button */}
            <div className="flex items-center justify-center relative">
              <button
                id="voice-mic-main-btn"
                onClick={toggleListening}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-md transition ${
                  isListening
                    ? "bg-red-600 text-white ring-8 ring-red-200"
                    : "bg-emerald-700 hover:bg-emerald-800 text-white ring-4 ring-emerald-100"
                }`}
              >
                {isListening ? (
                  <MicOff className="w-7 h-7 sm:w-8 sm:h-8" />
                ) : (
                  <Mic className="w-7 h-7 sm:w-8 sm:h-8" />
                )}
              </button>
            </div>

            <div className="text-center text-[11px] font-medium text-slate-500">
              {isListening ? (
                <span className="text-red-600 font-bold">● {t.listening} (Tap to send)</span>
              ) : (
                <span>🎙️ {t.tapToSpeak} (మాట్లాడటానికి నొక్కండి)</span>
              )}
            </div>

            {/* Quick Manual Text Input fallback */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage(inputText);
                }}
                placeholder="ఉదా: నా వరి ఆకులు పసుపు రంగులోకి మారుతున్నాయి..."
                className="flex-1 bg-slate-100 text-slate-800 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button
                onClick={() => sendMessage(inputText)}
                disabled={!inputText.trim()}
                className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl shadow-xs transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ApiKeySettingsModal
        isOpen={showKeyModal}
        onClose={() => setShowKeyModal(false)}
      />
    </>
  );
};

