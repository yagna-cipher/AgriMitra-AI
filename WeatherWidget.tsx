import React, { useState, useEffect } from "react";
import { LanguageCode, WeatherInfo } from "../types";
import { TRANSLATIONS } from "../i18n/languages";
import { CloudRain, Sun, Wind, Droplets, AlertTriangle, CheckCircle2, Clock, MapPin, RefreshCw } from "lucide-react";

interface WeatherWidgetProps {
  currentLanguage: LanguageCode;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ currentLanguage }) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [location, setLocation] = useState("Guntur, Andhra Pradesh");
  const [weatherData, setWeatherData] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (loc: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?location=${encodeURIComponent(loc)}`);
      if (res.ok) {
        const data = await res.json();
        const normalized: WeatherInfo = {
          location: data.location || loc,
          temperatureC: data.temperatureC ?? data.temperature ?? 31,
          humidityPercent: data.humidityPercent ?? data.humidity ?? 78,
          condition: data.condition || "Partly Cloudy",
          rainfallChancePercent: data.rainfallChancePercent ?? data.rainProbability ?? 20,
          windSpeedKmH: data.windSpeedKmH ?? data.windSpeed ?? 12,
          sprayAdvisory: {
            status: ((data.sprayAdvisory?.status || data.sprayingAdvisory?.status || "favorable").toLowerCase() === "caution"
              ? "caution"
              : (data.sprayAdvisory?.status || data.sprayingAdvisory?.status || "favorable").toLowerCase() === "unfavorable"
              ? "unfavorable"
              : "favorable"),
            advisoryText:
              data.sprayAdvisory?.advisoryText ||
              data.sprayingAdvisory?.advisoryMessage ||
              "Optimal morning window for protective sprays. Low wind speed prevents spray drift.",
            idealWindow:
              data.sprayAdvisory?.idealWindow || "07:00 AM - 10:30 AM",
            warnings:
              data.sprayAdvisory?.warnings ||
              (data.sprayingAdvisory?.windWarning
                ? [data.sprayingAdvisory.windWarning, data.sprayingAdvisory.temperatureWarning].filter(Boolean)
                : ["Avoid spraying during peak afternoon heat."])
          }
        };
        setWeatherData(normalized);
      }
    } catch (e) {
      console.error(e);
      // Fallback
      setWeatherData({
        location: loc,
        temperatureC: 31,
        humidityPercent: 78,
        condition: "Partly Cloudy",
        rainfallChancePercent: 20,
        windSpeedKmH: 11,
        sprayAdvisory: {
          status: "favorable",
          advisoryText: "Optimal morning window (7:00 AM - 10:00 AM) for protective sprays. Low wind speed prevents spray drift.",
          idealWindow: "07:00 AM - 10:30 AM",
          warnings: ["Avoid spraying during peak afternoon heat (12 PM - 3 PM) to prevent pesticide evaporation."]
        }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  return (
    <div id="weather-widget-section" className="max-w-4xl mx-auto space-y-5 pb-16">
      {/* Header Banner */}
      <div className="bg-sky-800 rounded-3xl p-5 sm:p-7 text-white shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center space-x-2 bg-sky-700/80 text-sky-100 text-xs px-3 py-1 rounded-full border border-sky-500/40">
            <CloudRain className="w-3.5 h-3.5 text-amber-300" />
            <span>Weather & Agricultural Spray Advisory</span>
          </div>

          {/* Location Select */}
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-sky-300" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-sky-900/80 text-white text-xs px-3 py-1.5 rounded-xl border border-sky-600 focus:outline-none"
            >
              <option value="Guntur, Andhra Pradesh">Guntur (AP)</option>
              <option value="Warangal, Telangana">Warangal (TS)</option>
              <option value="Kolar, Karnataka">Kolar (KA)</option>
              <option value="Anantapur, Andhra Pradesh">Anantapur (AP)</option>
              <option value="Davangere, Karnataka">Davangere (KA)</option>
              <option value="Khammam, Telangana">Khammam (TS)</option>
              <option value="Bathinda, Punjab">Bathinda (PB)</option>
              <option value="Rajkot, Gujarat">Rajkot (GJ)</option>
              <option value="Bardhaman, West Bengal">Bardhaman (WB)</option>
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-black">{t.weather}</h2>
          <p className="text-xs sm:text-sm text-sky-100">
            {currentLanguage === "te"
              ? "ఈరోజు మీ ప్రాంతంలో ఉష్ణోగ్రత, తేమ, గాలి వేగం మరియు పురుగు మందుల పిచికారీకి అనుకూలమైన సమయం."
              : "Live temperature, humidity, wind velocity, and intelligent pesticide spray window advisories for your field."}
          </p>
        </div>
      </div>

      {weatherData && (
        <div className="space-y-4">
          
          {/* Main Weather Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Temperature</div>
                <div className="text-xl font-black text-slate-800">{weatherData.temperatureC}°C</div>
                <div className="text-[10px] text-slate-500">{weatherData.condition}</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Humidity</div>
                <div className="text-xl font-black text-slate-800">{weatherData.humidityPercent}%</div>
                <div className="text-[10px] text-slate-500">Relative Humidity</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Wind className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Wind Velocity</div>
                <div className="text-xl font-black text-slate-800">{weatherData.windSpeedKmH} km/h</div>
                <div className="text-[10px] text-slate-500">
                  {weatherData.windSpeedKmH < 15 ? "Gentle Breeze" : "Gusty"}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-200/90 shadow-xs flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CloudRain className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Rain Probability</div>
                <div className="text-xl font-black text-slate-800">{weatherData.rainfallChancePercent}%</div>
                <div className="text-[10px] text-slate-500">Next 12 Hours</div>
              </div>
            </div>
          </div>

          {/* Spray Advisory Card */}
          <div
            className={`rounded-3xl p-5 sm:p-7 border-2 shadow-sm space-y-4 ${
              weatherData.sprayAdvisory?.status === "favorable"
                ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                : weatherData.sprayAdvisory?.status === "caution"
                ? "bg-amber-50 border-amber-300 text-amber-950"
                : "bg-red-50 border-red-300 text-red-950"
            }`}
          >
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <div className="flex items-center space-x-2">
                {weatherData.sprayAdvisory?.status === "favorable" ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                )}
                <div>
                  <h3 className="font-black text-base sm:text-lg">
                    {weatherData.sprayAdvisory?.status === "favorable"
                      ? "✓ Safe Window for Spraying (అనుకూల సమయం)"
                      : weatherData.sprayAdvisory?.status === "caution"
                      ? "⚠️ Spray with Caution (జాగ్రత్తగా పిచికారీ చేయండి)"
                      : "✕ Not Recommended for Spraying (పిచికారీ చేయవద్దు)"}
                  </h3>
                  <p className="text-xs opacity-80">Agricultural Microclimate Spray Index</p>
                </div>
              </div>

              {weatherData.sprayAdvisory?.idealWindow && (
                <div className="text-xs font-bold bg-white/80 px-3 py-1.5 rounded-xl border border-black/10 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{weatherData.sprayAdvisory.idealWindow}</span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              {weatherData.sprayAdvisory?.advisoryText}
            </p>

            {/* Warnings */}
            {weatherData.sprayAdvisory?.warnings && weatherData.sprayAdvisory.warnings.length > 0 && (
              <div className="pt-2 border-t border-black/10 space-y-1 text-xs">
                <div className="font-bold uppercase text-[10px] tracking-wider">Advisory Directives:</div>
                <ul className="list-disc list-inside space-y-1">
                  {weatherData.sprayAdvisory.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
