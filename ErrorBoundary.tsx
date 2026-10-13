import React, { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, PhoneCall } from "lucide-react";
import { LanguageCode } from "../types";
import { TRANSLATIONS } from "../i18n/languages";

interface Props {
  children: ReactNode;
  currentLanguage?: LanguageCode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  declare props: Props;
  declare state: State;
  declare setState: (state: Partial<State> | ((prevState: State) => Partial<State>)) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      const lang = this.props.currentLanguage || "te";
      const t = TRANSLATIONS[lang] || TRANSLATIONS.te || TRANSLATIONS.en;

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-red-100 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-slate-900">
                {lang === "te"
                  ? "చిన్న సాంకేతిక సమస్య ఏర్పడింది"
                  : "Something went wrong"}
              </h2>
              <p className="text-xs text-slate-600">
                {lang === "te"
                  ? "యాప్ సురక్షితంగా రికవర్ చేయబడింది. దయచేసి పునఃప్రారంభించండి."
                  : "The application encountered an unexpected issue. Please try refreshing."}
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={this.handleReset}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow transition flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>
                  {lang === "te" ? "మళ్లీ ప్రయత్నించండి (Reload)" : "Try Again / Reload"}
                </span>
              </button>

              <a
                href="tel:18001801551"
                className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-700" />
                <span>
                  {t.kisanCallCenter || "1800-180-1551"}
                </span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
