import { FarmerCrop, PestDiseaseWarning, DiagnosisResult } from "../types";

export function getEarlyWarnings(
  crops: FarmerCrop[],
  weather = { tempC: 28, humidity: 78, rainChance: 45, condition: "Partly Cloudy with High Humidity" },
  recentDiagnoses: DiagnosisResult[] = []
): PestDiseaseWarning[] {
  const warnings: PestDiseaseWarning[] = [];

  // Evaluate each registered crop against agro-climatic disease models
  crops.forEach((crop) => {
    const cropLower = crop.name.toLowerCase();

    if (cropLower.includes("rice") || cropLower.includes("paddy") || cropLower.includes("వరి")) {
      // Rice model: Blast & Brown Planthopper (BPH)
      if (weather.humidity >= 75) {
        warnings.push({
          id: `warn-rice-blast-${crop.id}`,
          cropName: crop.name,
          growthStage: crop.growthStage || "Vegetative / Tillering",
          riskLevel: weather.humidity > 82 ? "HIGH" : "MEDIUM",
          riskName: "Potential Fungal Blast (కొల్లేరు తెగులు / ब्लास्ट) Risk",
          whyRiskExists: `Relative humidity is elevated at ${weather.humidity}% with cloudy conditions (${weather.condition}). These conditions favor blast fungal spore germination (Pyricularia oryzae) on tender tillers.`,
          symptomsToMonitor: [
            "Spindle-shaped diamond lesions with greyish or whitish centers and brown margins on leaves",
            "Brownish lesions at leaf sheath collars",
            "Tender leaf tips showing water-soaked spots during early mornings"
          ],
          preventiveAction: [
            "Avoid excessive split doses of chemical Nitrogen (Urea) which promotes soft susceptible leaf tissue",
            "Ensure alleyways (30 cm every 2 meters) to improve sunlight penetration and air circulation",
            "Preventive biological spray: Pseudomonas fluorescens (5g/L) or Neem oil 10,000 ppm (2 ml/L) in early morning"
          ],
          whenToScanAgain: "Consider scanning the crop in 2-3 days if high humidity or light drizzles continue.",
          contributingFactors: {
            weatherCondition: weather.condition,
            temperatureC: weather.tempC,
            humidityPercent: weather.humidity,
            rainfallChance: weather.rainChance
          }
        });
      }

      // Check BPH risk if vegetative/tillering
      if (crop.growthStage?.toLowerCase().includes("tiller") || crop.growthStage?.toLowerCase().includes("panicle")) {
        warnings.push({
          id: `warn-rice-bph-${crop.id}`,
          cropName: crop.name,
          growthStage: crop.growthStage,
          riskLevel: "MEDIUM",
          riskName: "Potential Brown Planthopper (తేనె మంచు పురుగు) Risk",
          whyRiskExists: `Dense tillering canopy combined with warm temperature (${weather.tempC}°C) creates a microclimate at the water level favored by planthopper nymphs.`,
          symptomsToMonitor: [
            "Brown or yellowish hopper nymphs clinging to the base of tillers just above standing water",
            "Circular patches of drying yellowed hills in the field interior ('hopper burn')",
            "Honeydew secretion leading to black sooty mold at tiller base"
          ],
          preventiveAction: [
            "Drain standing water from the field for 2-3 days (Alternate Wetting & Drying) to disrupt nymph survival",
            "Avoid broad-spectrum synthetic pyrethroids which wipe out natural predator spiders and cause hopper resurgence",
            "Erect yellow sticky traps along field bunds"
          ],
          whenToScanAgain: "Part rice hills and inspect stems; scan with camera if circular yellow patches appear.",
          contributingFactors: {
            weatherCondition: weather.condition,
            temperatureC: weather.tempC,
            humidityPercent: weather.humidity,
            rainfallChance: weather.rainChance
          }
        });
      }
    }

    if (cropLower.includes("chilli") || cropLower.includes("mirchi") || cropLower.includes("మిరప")) {
      // Chilli model: Thrips & Powdery Mildew
      const isDryWarm = weather.tempC >= 27;
      warnings.push({
        id: `warn-chilli-thrips-${crop.id}`,
        cropName: crop.name,
        growthStage: crop.growthStage || "Vegetative / Flowering",
        riskLevel: isDryWarm ? "HIGH" : "MEDIUM",
        riskName: "Potential Thrips & Mites (తామర పురుగులు / బొబ్బర) Risk",
        whyRiskExists: `Warm daytime temperature (${weather.tempC}°C) accelerates the reproduction cycle of invasive Western/Black Flower Thrips (Thrips parvispinus).`,
        symptomsToMonitor: [
          "Upward boat-shaped leaf curling and crinkling of tender apical leaves",
          "Silvery scratch patches or brownish scars on leaf undersides and young flower buds",
          "Premature flower drop and twisted, deformed developing chillies"
        ],
        preventiveAction: [
          "Install blue sticky traps (30-40 traps/acre) at crop canopy height to catch adult thrips",
          "Foliar spray of Neem oil 10,000 ppm (2-3 ml/L) mixed with mild soap emulsifier as a deterrent",
          "Conserve natural predators: avoid indiscriminate chemical sprays that destroy ladybird beetles and lacewings"
        ],
        whenToScanAgain: "Inspect underside of 10 random terminal shoots every 3 days; take a close-up photo scan if leaf curling increases.",
        contributingFactors: {
          weatherCondition: weather.condition,
          temperatureC: weather.tempC,
          humidityPercent: weather.humidity,
          rainfallChance: weather.rainChance
        }
      });
    }

    if (cropLower.includes("cotton") || cropLower.includes("పత్తి")) {
      // Cotton model: Pink Bollworm & Sucking Pests
      warnings.push({
        id: `warn-cotton-pbw-${crop.id}`,
        cropName: crop.name,
        growthStage: crop.growthStage || "Squaring / Flowering",
        riskLevel: "MEDIUM",
        riskName: "Potential Pink Bollworm (గులాబీ రంగు కాయ తొలుచు పురుగు) Risk",
        whyRiskExists: `Crop has entered the squaring and flowering phase. Male and female moths target emerging squares for egg laying.`,
        symptomsToMonitor: [
          "Rosette flowers (petals tied together with silk web that fail to open naturally)",
          "Tiny entry pinholes on small green bolls (often sealed with plant sap)",
          "Premature shedding of flower buds (squares)"
        ],
        preventiveAction: [
          "Install 8-10 pheromone traps (Pectinophora gossypiella lure) per acre for monitoring",
          "Pluck and destroy rosette flowers daily to terminate trapped larvae",
          "Release egg parasitoid Trichogramma bactrae (60,000/acre) at weekly intervals"
        ],
        whenToScanAgain: "Examine 20 green bolls across the field weekly; take a photo if rosette flowers are observed.",
        contributingFactors: {
          weatherCondition: weather.condition,
          temperatureC: weather.tempC,
          humidityPercent: weather.humidity,
          rainfallChance: weather.rainChance
        }
      });
    }

    if (cropLower.includes("tomato") || cropLower.includes("టమాటా")) {
      // Tomato model: Early/Late Blight & Pinworm
      const isBlightFavorable = weather.humidity > 70;
      warnings.push({
        id: `warn-tomato-blight-${crop.id}`,
        cropName: crop.name,
        growthStage: crop.growthStage || "Vegetative / Fruiting",
        riskLevel: isBlightFavorable ? "HIGH" : "MEDIUM",
        riskName: "Potential Early & Late Blight (ఆకు ఎండు తెగులు) Risk",
        whyRiskExists: `Intermittent cloudiness with relative humidity at ${weather.humidity}% provides surface leaf wetness necessary for Alternaria fungal spores to penetrate stomata.`,
        symptomsToMonitor: [
          "Dark brown target-board circular concentric rings on lower older foliage",
          "Water-soaked oily brown patches on stems and green fruit shoulders",
          "Yellowing halo surrounding brown leaf spots"
        ],
        preventiveAction: [
          "Prune lower bottom leaves within 15 cm of soil to prevent splash inoculation",
          "Ensure sturdy staking to keep leaves elevated away from damp ground",
          "Preventive spray of Copper Oxychloride (COC 50 WP @ 2.5g/L) or Trichoderma harzianum (5g/L)"
        ],
        whenToScanAgain: "Check bottom leaves every 2 days; scan immediately with Agri Mitra camera if target-board rings appear.",
        contributingFactors: {
          weatherCondition: weather.condition,
          temperatureC: weather.tempC,
          humidityPercent: weather.humidity,
          rainfallChance: weather.rainChance
        }
      });
    }
  });

  // If farmer has no registered crops or no warnings generated, provide a general regional advisory
  if (warnings.length === 0) {
    warnings.push({
      id: "warn-general-weather",
      cropName: "General Farm Crops",
      growthStage: "Active Vegetative",
      riskLevel: weather.humidity > 80 ? "MEDIUM" : "LOW",
      riskName: "Sucking Pest & Fungal Humidity Alert",
      whyRiskExists: `Atmospheric humidity is at ${weather.humidity}%. Humid air with moderate temperature creates conditions conducive to fungal spores and soft-bodied sucking insects.`,
      symptomsToMonitor: [
        "Curling or puckering of tender leaf margins",
        "Fine webbing on leaf undersides",
        "Tiny yellowish puncture marks on new leaves"
      ],
      preventiveAction: [
        "Inspect field perimeter and weed hosts",
        "Maintain clean field bunds to destroy alternate pest habitats",
        "Ensure spray equipment is clean and nozzles unclogged"
      ],
      whenToScanAgain: "Conduct a visual scan of new growth every 3-4 days.",
      contributingFactors: {
        weatherCondition: weather.condition,
        temperatureC: weather.tempC,
        humidityPercent: weather.humidity,
        rainfallChance: weather.rainChance
      }
    });
  }

  return warnings;
}
