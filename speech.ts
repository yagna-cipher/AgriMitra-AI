import { LanguageCode } from "../types";
import { AVAILABLE_LANGUAGES } from "../i18n/languages";

// Speech Recognition helper
export class SpeechRecognizer {
  private recognition: any = null;
  private isListening = false;

  constructor() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;
    }
  }

  isSupported(): boolean {
    return !!this.recognition;
  }

  start(
    langCode: LanguageCode,
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ) {
    if (!this.recognition) {
      onError("Speech recognition is not supported in this browser. You can type your question directly.");
      return;
    }

    if (this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }

    const langObj = AVAILABLE_LANGUAGES.find((l) => l.code === langCode);
    this.recognition.lang = langObj?.voiceLangCode || "te-IN";

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        onResult(finalTranscript, true);
      } else if (interimTranscript) {
        onResult(interimTranscript, false);
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      onError(event.error || "Speech recognition error");
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd();
    };

    try {
      this.recognition.start();
    } catch (e: any) {
      onError(e.message || "Failed to start microphone");
    }
  }

  stop() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
    this.isListening = false;
  }
}

// Text to Speech (TTS) Speaker Helper
export class TextSpeaker {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPaused = false;
  private isSpeaking = false;
  private onStateChangeCallback?: (state: "idle" | "speaking" | "paused") => void;

  constructor(onStateChange?: (state: "idle" | "speaking" | "paused") => void) {
    this.onStateChangeCallback = onStateChange;
  }

  speak(text: string, langCode: LanguageCode, onFinished?: () => void) {
    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported in this browser.");
      return;
    }

    // Cancel any ongoing speech
    this.stop();

    if (!text || text.trim() === "") return;

    // Clean markdown characters for cleaner audio
    const cleanText = text
      .replace(/[*_#`[\]()]/g, "")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\n+/g, ". ");

    const langObj = AVAILABLE_LANGUAGES.find((l) => l.code === langCode);
    const voiceLangCode = langObj?.voiceLangCode || "te-IN";

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = voiceLangCode;
    utterance.rate = 0.95; // Slightly slower, clear pace for farmers
    utterance.pitch = 1.0;

    // Try finding an appropriate voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(
      (v) => v.lang.toLowerCase() === voiceLangCode.toLowerCase() || v.lang.startsWith(langCode)
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      this.onStateChangeCallback?.("speaking");
    };

    utterance.onpause = () => {
      this.isPaused = true;
      this.onStateChangeCallback?.("paused");
    };

    utterance.onresume = () => {
      this.isPaused = false;
      this.onStateChangeCallback?.("speaking");
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.onStateChangeCallback?.("idle");
      onFinished?.();
    };

    utterance.onerror = (e) => {
      console.error("Speech error", e);
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.onStateChangeCallback?.("idle");
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  pause() {
    if ("speechSynthesis" in window && this.isSpeaking && !this.isPaused) {
      window.speechSynthesis.pause();
      this.isPaused = true;
      this.onStateChangeCallback?.("paused");
    }
  }

  resume() {
    if ("speechSynthesis" in window && this.isSpeaking && this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
      this.onStateChangeCallback?.("speaking");
    }
  }

  stop() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.onStateChangeCallback?.("idle");
    }
  }

  getState(): "idle" | "speaking" | "paused" {
    if (this.isPaused) return "paused";
    if (this.isSpeaking) return "speaking";
    return "idle";
  }
}
