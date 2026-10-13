import { CropRecommendationInput, RecommendedCrop } from "../types";

export interface CropProfileRule {
  id: string;
  cropName: string;
  cropIcon: string;
  seasons: Array<"Kharif (Monsoon)" | "Rabi (Winter)" | "Zaid (Summer)">;
  optimalPhMin: number;
  optimalPhMax: number;
  acceptablePhMin: number;
  acceptablePhMax: number;
  waterRequirement: "Low" | "Medium" | "High";
  toleratesRainfed: boolean;
  preferredIrrigation: string[];
  approxGrowingPeriod: string;
  generalMarketPotential: string;
  mainRisks: string[];
  whySuitableTemplate: string;
  managementTips: string[];
}

export const CROP_PROFILE_RULES: CropProfileRule[] = [
  {
    id: "paddy",
    cropName: "Paddy / Rice (వరి / धान)",
    cropIcon: "🌾",
    seasons: ["Kharif (Monsoon)", "Rabi (Winter)"],
    optimalPhMin: 6.0,
    optimalPhMax: 7.5,
    acceptablePhMin: 5.0,
    acceptablePhMax: 8.5,
    waterRequirement: "High",
    toleratesRainfed: false,
    preferredIrrigation: ["Canal", "Borewell / Flood"],
    approxGrowingPeriod: "120 - 145 Days",
    generalMarketPotential: "Guaranteed Government MSP procurement with strong steady demand across consumer markets.",
    mainRisks: ["Blast disease in humid foggy spells", "Brown planthopper infestation", "Water shortage during panicle initiation"],
    whySuitableTemplate: "Matches fertile soils with assured irrigation or high monsoon rainfall; high staple yield potential.",
    managementTips: [
      "Use certified seed varieties suited to regional rainfall",
      "Adopt Alternate Wetting and Drying (AWD) to economize water",
      "Apply split doses of nitrogen to avoid lodging"
    ]
  },
  {
    id: "chilli",
    cropName: "Dry / Green Chilli (మిరప / मिर्च)",
    cropIcon: "🌶️",
    seasons: ["Kharif (Monsoon)", "Rabi (Winter)"],
    optimalPhMin: 6.5,
    optimalPhMax: 7.8,
    acceptablePhMin: 5.8,
    acceptablePhMax: 8.2,
    waterRequirement: "Medium",
    toleratesRainfed: false,
    preferredIrrigation: ["Drip", "Sprinkler", "Borewell / Flood"],
    approxGrowingPeriod: "150 - 170 Days",
    generalMarketPotential: "High commercial value crop with substantial profit margin; export demand for high-pungency Teja varieties.",
    mainRisks: ["Thrips and virus leaf curl (Murda)", "Anthracnose dieback during cloudy damp periods", "Sensitive to waterlogging"],
    whySuitableTemplate: "Well-drained loamy soils and modern drip irrigation create prime conditions for high-yield flowering.",
    managementTips: [
      "Plant on raised beds with drip and plastic mulching",
      "Install blue sticky traps early to intercept thrips",
      "Ensure efficient field drainage to avoid root rot"
    ]
  },
  {
    id: "cotton",
    cropName: "Cotton (పత్తి / कपास)",
    cropIcon: "🌱",
    seasons: ["Kharif (Monsoon)"],
    optimalPhMin: 6.5,
    optimalPhMax: 8.0,
    acceptablePhMin: 5.5,
    acceptablePhMax: 8.5,
    waterRequirement: "Medium",
    toleratesRainfed: true,
    preferredIrrigation: ["Drip", "Borewell / Flood", "Rainfed", "Sprinkler"],
    approxGrowingPeriod: "150 - 170 Days",
    generalMarketPotential: "Substantial cash crop with CCI government MSP safety net and private ginning mill demand.",
    mainRisks: ["Pink bollworm damage inside developing bolls", "Leaf reddening from nutrient imbalance", "Excess water stagnation in black soil"],
    whySuitableTemplate: "Excellent adaptability to medium-to-deep black soils and semi-arid conditions.",
    managementTips: [
      "Sow timely with onset of monsoon",
      "Install pheromone traps to monitor bollworm moth activity",
      "Spray 1% Magnesium Sulfate + 1% Urea to prevent foliage reddening"
    ]
  },
  {
    id: "groundnut",
    cropName: "Groundnut / Peanut (వేరుశనగ / मूंगफली)",
    cropIcon: "🥜",
    seasons: ["Kharif (Monsoon)", "Rabi (Winter)", "Zaid (Summer)"],
    optimalPhMin: 6.0,
    optimalPhMax: 7.2,
    acceptablePhMin: 5.5,
    acceptablePhMax: 8.0,
    waterRequirement: "Low",
    toleratesRainfed: true,
    preferredIrrigation: ["Sprinkler", "Drip", "Rainfed", "Borewell / Flood"],
    approxGrowingPeriod: "105 - 115 Days",
    generalMarketPotential: "High demand from edible oil mills and peanut butter processing; improves soil fertility via nitrogen fixation.",
    mainRisks: ["Tikka leaf spot and collar rot", "Early pegging moisture deficit", "Pod borer damage"],
    whySuitableTemplate: "Thrives in sandy loam and light red soils; highly water-efficient legume.",
    managementTips: [
      "Inoculate seeds with Rhizobium and Trichoderma",
      "Ensure adequate Gypsum application (200 kg/acre at 40-45 days) for calcium peg development",
      "Maintain friable, loose soil around pegs for smooth soil entry"
    ]
  },
  {
    id: "maize",
    cropName: "Maize / Corn (మొక్కజొన్న / मक्का)",
    cropIcon: "🌽",
    seasons: ["Kharif (Monsoon)", "Rabi (Winter)", "Zaid (Summer)"],
    optimalPhMin: 6.0,
    optimalPhMax: 7.5,
    acceptablePhMin: 5.5,
    acceptablePhMax: 8.5,
    waterRequirement: "Medium",
    toleratesRainfed: true,
    preferredIrrigation: ["Drip", "Sprinkler", "Borewell / Flood", "Canal"],
    approxGrowingPeriod: "100 - 120 Days",
    generalMarketPotential: "Year-round demand from poultry feed industries, starch extraction, and export silos.",
    mainRisks: ["Fall Armyworm (FAW) whorl feeding", "Water stagnation in young seedling stage", "Stem borer"],
    whySuitableTemplate: "Robust, heavy-yielding cereal suitable for diverse soil types and automated harvesting.",
    managementTips: [
      "Seed treatment with Cyantraniliprole for early Fall Armyworm defense",
      "Plant in ridge and furrow to drain excess rain",
      "Irrigate critically at silking and grain filling phases"
    ]
  },
  {
    id: "tomato",
    cropName: "Tomato (టమాటా / टमाटर)",
    cropIcon: "🍅",
    seasons: ["Kharif (Monsoon)", "Rabi (Winter)", "Zaid (Summer)"],
    optimalPhMin: 6.2,
    optimalPhMax: 7.2,
    acceptablePhMin: 5.5,
    acceptablePhMax: 8.0,
    waterRequirement: "Medium",
    toleratesRainfed: false,
    preferredIrrigation: ["Drip", "Borewell / Flood"],
    approxGrowingPeriod: "120 - 140 Days",
    generalMarketPotential: "High turnover vegetable crop; quick cash generation with staggered weekly pickings.",
    mainRisks: ["Early and Late Blight during wet spells", "Tomato Leaf Curl Virus (transmitted by whitefly)", "Fruit borer punctures"],
    whySuitableTemplate: "High-return horticulture crop suited to drip fertigation and intensive trellis management.",
    managementTips: [
      "Provide sturdy staking/trellising to avoid fruit rotting on wet soil",
      "Spray Calcium and Boron to prevent blossom end rot",
      "Use insect-proof nursery netting"
    ]
  },
  {
    id: "redgram",
    cropName: "Red Gram / Pigeon Pea (కంది / अरहर)",
    cropIcon: "🌿",
    seasons: ["Kharif (Monsoon)"],
    optimalPhMin: 6.5,
    optimalPhMax: 8.0,
    acceptablePhMin: 5.5,
    acceptablePhMax: 8.5,
    waterRequirement: "Low",
    toleratesRainfed: true,
    preferredIrrigation: ["Rainfed", "Drip", "Sprinkler", "Borewell / Flood"],
    approxGrowingPeriod: "150 - 180 Days",
    generalMarketPotential: "Consistently high dal prices; exceptional drought resilience and enriches soil nitrogen.",
    mainRisks: ["Helicoverpa pod borer", "Sterility mosaic disease", "Fusarium wilt in ill-drained fields"],
    whySuitableTemplate: "Deep taproot system thrives under low-water and rainfed conditions; ideal sole or inter-crop.",
    managementTips: [
      "Nipping of shoot tips at 45-50 days to encourage wide branching",
      "Pheromone traps for pod borer monitoring",
      "Avoid heavy soil water stagnation"
    ]
  }
];

export function recommendCrops(input: CropRecommendationInput): RecommendedCrop[] {
  const scoredCrops = CROP_PROFILE_RULES.map((rule) => {
    let score = 50;

    // 1. Season match (heavy weight: +25 or -35)
    if (rule.seasons.includes(input.season)) {
      score += 25;
    } else {
      score -= 35;
    }

    // 2. Soil pH match (+15 or -20)
    if (input.soilPh >= rule.optimalPhMin && input.soilPh <= rule.optimalPhMax) {
      score += 15;
    } else if (input.soilPh >= rule.acceptablePhMin && input.soilPh <= rule.acceptablePhMax) {
      score += 8;
    } else {
      score -= 15;
    }

    // 3. Water availability match (+15 or -25)
    if (input.waterAvailability === "Abundant") {
      score += 12;
    } else if (input.waterAvailability === "Moderate") {
      if (rule.waterRequirement === "High") {
        score -= 5;
      } else {
        score += 12;
      }
    } else {
      // Scarce / Rainfed
      if (rule.toleratesRainfed || rule.waterRequirement === "Low") {
        score += 18;
      } else if (rule.waterRequirement === "High") {
        score -= 30; // Strongly penalize high water crops in scarce conditions
      }
    }

    // 4. Irrigation type match (+10)
    if (rule.preferredIrrigation.includes(input.irrigationType)) {
      score += 8;
    }

    // Clamp score between 20 and 98
    const finalScore = Math.max(25, Math.min(98, score));

    let suitabilityRating: "Highly Suitable" | "Suitable" | "Moderate" = "Moderate";
    if (finalScore >= 80) suitabilityRating = "Highly Suitable";
    else if (finalScore >= 65) suitabilityRating = "Suitable";

    return {
      id: rule.id,
      cropName: rule.cropName,
      cropIcon: rule.cropIcon,
      suitabilityScorePercent: finalScore,
      suitabilityRating,
      waterRequirement: rule.waterRequirement,
      approxGrowingPeriod: rule.approxGrowingPeriod,
      generalMarketPotential: rule.generalMarketPotential,
      mainRisks: rule.mainRisks,
      whySuitable: `${rule.whySuitableTemplate} (Calculated for ${input.season} season with Soil pH ${input.soilPh} and ${input.waterAvailability.toLowerCase()} water availability).`,
      keyManagementTips: rule.managementTips
    };
  });

  // Sort descending by suitability score
  return scoredCrops.sort((a, b) => b.suitabilityScorePercent - a.suitabilityScorePercent);
}
