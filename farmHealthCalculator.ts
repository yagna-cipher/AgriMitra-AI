import { FarmerCrop, DiagnosisResult, SoilAnalysisResult, FarmHealthScore, HealthBreakdownItem } from "../types";

export function calculateFarmHealthScore(
  crops: FarmerCrop[],
  diagnoses: DiagnosisResult[],
  savedSoilReport: SoilAnalysisResult | null,
  weatherInfo?: {
    tempC: number;
    humidity: number;
    sprayCondition: "favorable" | "caution" | "unfavorable";
    rainChance: number;
  }
): FarmHealthScore {
  const recommendations: string[] = [];

  // 1. Crop Health (max 20 points)
  let cropScore: number | null = null;
  let cropStatus: "good" | "moderate" | "risk" | "insufficient_data" = "insufficient_data";
  let cropSummary = "No crops registered";

  if (crops.length > 0) {
    const totalIssues = crops.reduce((sum, c) => sum + (c.activeIssuesCount || 0), 0);
    const recentDiagnoses = diagnoses.slice(0, 5);
    const severeDiagnoses = recentDiagnoses.filter(
      (d) => d.isUrgentAlert || d.confidence?.level === "high"
    ).length;

    if (totalIssues === 0 && severeDiagnoses === 0) {
      cropScore = 19;
      cropStatus = "good";
      cropSummary = `All ${crops.length} crops show healthy vigor with 0 active severe flags.`;
    } else if (totalIssues <= 2 && severeDiagnoses <= 1) {
      cropScore = 14;
      cropStatus = "moderate";
      cropSummary = `${totalIssues} crop issue(s) under observation; mild symptoms noted.`;
      recommendations.push("Inspect flagged crop rows to verify if recent symptoms are stabilizing.");
    } else {
      cropScore = 9;
      cropStatus = "risk";
      cropSummary = `Multiple active crop health warnings detected (${totalIssues} active issues).`;
      recommendations.push("Priority: Review Action Plan for flagged crops and apply recommended bio-treatment.");
    }
  } else {
    recommendations.push("Add your active crops under 'My Crops' to enable detailed crop vigor tracking.");
  }

  // 2. Soil Health (max 20 points)
  let soilScore: number | null = null;
  let soilStatus: "good" | "moderate" | "risk" | "insufficient_data" = "insufficient_data";
  let soilSummary = "Not enough data (Perform soil test)";

  if (savedSoilReport) {
    const ph = savedSoilReport.phStatus.value;
    const oc = savedSoilReport.organicCarbonStatus.value;

    let points = 10;
    if (ph >= 6.2 && ph <= 7.8) points += 5;
    else if (ph >= 5.5 && ph <= 8.5) points += 2;

    if (oc >= 0.75) points += 5;
    else if (oc >= 0.5) points += 3;
    else {
      recommendations.push("Organic carbon is low (<0.5%). Incorporate farmyard manure or vermicompost.");
    }

    soilScore = Math.min(20, points);
    soilStatus = soilScore >= 16 ? "good" : soilScore >= 12 ? "moderate" : "risk";
    soilSummary = `pH ${ph.toFixed(1)} (${savedSoilReport.phStatus.rating}), OC ${oc.toFixed(2)}%`;
  } else {
    recommendations.push("Conduct a laboratory or digital Soil Test to evaluate baseline pH, Organic Carbon and NPK balance.");
  }

  // 3. Water & Irrigation (max 15 points)
  let waterScore: number | null = null;
  let waterStatus: "good" | "moderate" | "risk" | "insufficient_data" = "insufficient_data";
  let waterSummary = "Water management based on crop irrigation types";

  if (crops.length > 0) {
    const hasDripOrSprinkler = crops.some(
      (c) => c.irrigationType?.toLowerCase().includes("drip") || c.irrigationType?.toLowerCase().includes("sprinkler")
    );
    if (hasDripOrSprinkler) {
      waterScore = 14;
      waterStatus = "good";
      waterSummary = "Micro-irrigation (Drip/Sprinkler) deployed; high water efficiency.";
    } else {
      waterScore = 11;
      waterStatus = "moderate";
      waterSummary = "Canal / Flood irrigation recorded. Maintain drainage to prevent waterlogging.";
      recommendations.push("Consider adopting drip irrigation or Alternate Wetting and Drying (AWD) to save water.");
    }
  }

  // 4. Weather Risk (max 15 points)
  let weatherScore: number | null = 13;
  let weatherStatus: "good" | "moderate" | "risk" = "good";
  let weatherSummary = "Weather conditions favorable for farm operations";

  if (weatherInfo) {
    if (weatherInfo.sprayCondition === "unfavorable" || weatherInfo.rainChance > 70) {
      weatherScore = 7;
      weatherStatus = "risk";
      weatherSummary = `High rain likelihood (${weatherInfo.rainChance}%) or unfavorable spray conditions.`;
      recommendations.push("Postpone chemical or foliar nutrient spraying until weather clears to prevent wash-off.");
    } else if (weatherInfo.sprayCondition === "caution" || weatherInfo.humidity > 80) {
      weatherScore = 11;
      weatherStatus = "moderate";
      weatherSummary = `High relative humidity (${weatherInfo.humidity}%). Monitor for fungal spore germination.`;
      recommendations.push("Relative humidity >75% increases fungal blast risk; monitor dense canopy areas.");
    } else {
      weatherScore = 14;
      weatherStatus = "good";
      weatherSummary = `Optimal conditions: ${weatherInfo.tempC}°C, ${weatherInfo.humidity}% humidity.`;
    }
  }

  // 5. Pest & Disease Risk (max 15 points)
  let pestScore: number | null = null;
  let pestStatus: "good" | "moderate" | "risk" | "insufficient_data" = "insufficient_data";
  let pestSummary = "Pest risk assessed from recent scans & humidity";

  const recentPestIssues = diagnoses.filter(
    (d) => d.problemDetected && d.problemType !== "healthy"
  ).length;

  if (recentPestIssues === 0) {
    pestScore = 14;
    pestStatus = "good";
    pestSummary = "No active pest outbreak detected in recent field scans.";
  } else if (recentPestIssues === 1) {
    pestScore = 10;
    pestStatus = "moderate";
    pestSummary = "Isolated pest/disease symptom documented. Preventive action active.";
    recommendations.push("Install yellow and blue sticky traps (10-15 per acre) for early sucking pest monitoring.");
  } else {
    pestScore = 7;
    pestStatus = "risk";
    pestSummary = "Active pest pressure documented across recent diagnoses.";
    recommendations.push("Conduct targeted field inspection: check leaf undersides and crown base for pests.");
  }

  // 6. Nutrition (max 15 points)
  let nutritionScore: number | null = null;
  let nutritionStatus: "good" | "moderate" | "risk" | "insufficient_data" = "insufficient_data";
  let nutritionSummary = "Crop nutrition balance";

  const nutrientDeficiencies = diagnoses.filter(
    (d) =>
      d.problemType === "nutrient" ||
      d.likelyCause?.toLowerCase().includes("deficiency") ||
      d.problemDetected?.toLowerCase().includes("deficiency")
  );

  if (nutrientDeficiencies.length === 0) {
    nutritionScore = 13;
    nutritionStatus = "good";
    nutritionSummary = "No acute leaf discoloration or micronutrient deficiencies flagged.";
  } else {
    nutritionScore = 8;
    nutritionStatus = "moderate";
    nutritionSummary = `${nutrientDeficiencies.length} nutrient deficiency symptom(s) identified.`;
    recommendations.push("Apply targeted foliar micronutrient spray (Zinc / Iron / Boron) based on symptom guide.");
  }

  // Calculate Overall Score
  const components = [cropScore, soilScore, waterScore, weatherScore, pestScore, nutritionScore];
  const validScores = components.filter((s): s is number => s !== null);

  let overallScore: number | null = null;
  let rating: "EXCELLENT" | "GOOD" | "MODERATE" | "ATTENTION_NEEDED" | "NOT_ENOUGH_DATA" = "NOT_ENOUGH_DATA";
  let ratingLabel = "NOT ENOUGH DATA";

  if (validScores.length >= 3) {
    // We normalize to a 0-100 scale based on maximum achievable points for the available categories
    let currentSum = 0;
    let maxAchievable = 0;

    if (cropScore !== null) { currentSum += cropScore; maxAchievable += 20; }
    if (soilScore !== null) { currentSum += soilScore; maxAchievable += 20; }
    if (waterScore !== null) { currentSum += waterScore; maxAchievable += 15; }
    if (weatherScore !== null) { currentSum += weatherScore; maxAchievable += 15; }
    if (pestScore !== null) { currentSum += pestScore; maxAchievable += 15; }
    if (nutritionScore !== null) { currentSum += nutritionScore; maxAchievable += 15; }

    if (maxAchievable > 0) {
      overallScore = Math.round((currentSum / maxAchievable) * 100);
      if (overallScore >= 85) {
        rating = "EXCELLENT";
        ratingLabel = "EXCELLENT";
      } else if (overallScore >= 70) {
        rating = "GOOD";
        ratingLabel = "GOOD";
      } else if (overallScore >= 55) {
        rating = "MODERATE";
        ratingLabel = "MODERATE";
      } else {
        rating = "ATTENTION_NEEDED";
        ratingLabel = "NEEDS ATTENTION";
      }
    }
  }

  // Ensure 3 to 5 recommendations
  if (recommendations.length < 3) {
    recommendations.push("Take a clear leaf photo with Agri Mitra camera to run an AI health scan on new growth.");
    recommendations.push("Verify soil moisture 2 inches below surface before scheduling next irrigation cycle.");
  }
  const finalRecommendations = recommendations.slice(0, 5);

  const breakdown: FarmHealthScore["breakdown"] = {
    cropHealth: {
      id: "crop_health",
      name: "Crop Health",
      score: cropScore,
      maxScore: 20,
      status: cropStatus,
      statusLabel: cropStatus === "good" ? "Good" : cropStatus === "moderate" ? "Moderate" : cropStatus === "risk" ? "Needs Attention" : "Not enough data",
      dataSummary: cropSummary,
      actionRecommendation: cropScore && cropScore < 15 ? "Scan suspect leaves with camera" : undefined
    },
    soilHealth: {
      id: "soil_health",
      name: "Soil Health",
      score: soilScore,
      maxScore: 20,
      status: soilStatus,
      statusLabel: soilStatus === "good" ? "Good" : soilStatus === "moderate" ? "Moderate" : soilStatus === "risk" ? "Imbalance" : "Not enough data",
      dataSummary: soilSummary,
      actionRecommendation: !savedSoilReport ? "Input Soil Test Report to unlock" : undefined
    },
    waterIrrigation: {
      id: "water_irrigation",
      name: "Water / Irrigation",
      score: waterScore,
      maxScore: 15,
      status: waterStatus,
      statusLabel: waterStatus === "good" ? "Efficient" : waterStatus === "moderate" ? "Moderate" : "Review Drainage",
      dataSummary: waterSummary
    },
    weatherRisk: {
      id: "weather_risk",
      name: "Weather Risk",
      score: weatherScore,
      maxScore: 15,
      status: weatherStatus,
      statusLabel: weatherStatus === "good" ? "Low Risk" : weatherStatus === "moderate" ? "Moderate Risk" : "High Risk",
      dataSummary: weatherSummary
    },
    pestDiseaseRisk: {
      id: "pest_risk",
      name: "Pest / Disease Risk",
      score: pestScore,
      maxScore: 15,
      status: pestStatus,
      statusLabel: pestStatus === "good" ? "Low Risk" : pestStatus === "moderate" ? "Moderate Risk" : "Alert",
      dataSummary: pestSummary
    },
    nutrition: {
      id: "nutrition",
      name: "Nutrition",
      score: nutritionScore,
      maxScore: 15,
      status: nutritionStatus,
      statusLabel: nutritionStatus === "good" ? "Balanced" : nutritionStatus === "moderate" ? "Deficiency Seen" : "Needs Attention",
      dataSummary: nutritionSummary
    }
  };

  return {
    overallScore,
    rating,
    ratingLabel,
    breakdown,
    recommendations: finalRecommendations,
    calculatedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  };
}
