import { CropCalendarStage, CropCalendarPlan } from "../types";

export interface CropTimelineTemplate {
  cropId: string;
  cropName: string;
  defaultVariety: string;
  totalDays: number;
  stages: Array<{
    stageName: string;
    stageIcon: string;
    dayStartOffset: number;
    dayEndOffset: number;
    irrigationGuidance: string;
    nutritionGuidance: string;
    pestDiseaseMonitoring: string;
    importantActivities: string[];
  }>;
}

export const CROP_CALENDAR_TEMPLATES: Record<string, CropTimelineTemplate> = {
  paddy: {
    cropId: "paddy",
    cropName: "Rice / Paddy (వరి / धान)",
    defaultVariety: "BPT 5204 (Samba Mahsuri)",
    totalDays: 135,
    stages: [
      {
        stageName: "Sowing & Nursery (విత్తనం & నారుమడి)",
        stageIcon: "🌱",
        dayStartOffset: 0,
        dayEndOffset: 25,
        irrigationGuidance: "Keep nursery beds moist with thin water film; avoid submerging emerging sprouts.",
        nutritionGuidance: "Basal: Apply DAP 1 kg / cent of nursery. Zinc sulfate 100g / cent if soil is deficient.",
        pestDiseaseMonitoring: "Monitor for thrips in nursery (curling leaf tips) and early blast spots.",
        importantActivities: [
          "Seed treatment with Carbendazim 2g/kg or Trichoderma viride 10g/kg",
          "Maintain nursery water drainage during heavy rains",
          "Uproot seedlings gently at 21-25 days without damaging root system"
        ]
      },
      {
        stageName: "Germination & Transplanting (నాట్లు / మొలక)",
        stageIcon: "🌿",
        dayStartOffset: 26,
        dayEndOffset: 45,
        irrigationGuidance: "Maintain 2-3 cm shallow standing water for easy seedling establishment.",
        nutritionGuidance: "Basal dose in main field: Full dose P (DAP/SSP) + 50% Potash (MOP) + 25% Nitrogen (Urea).",
        pestDiseaseMonitoring: "Watch for Stem Borer (dead hearts) and root rot in stagnant water.",
        importantActivities: [
          "Transplant 2-3 seedlings per hill at 20x15 cm spacing",
          "Gap filling within 7-10 days of transplanting",
          "Apply recommended pre-emergence herbicide within 3-5 days after transplanting"
        ]
      },
      {
        stageName: "Vegetative & Tillering (పిలకల దశ)",
        stageIcon: "🌾",
        dayStartOffset: 46,
        dayEndOffset: 70,
        irrigationGuidance: "Alternate wetting and drying (AWD) saves water and strengthens root aeration.",
        nutritionGuidance: "Top-dressing 1: 50% Nitrogen (Urea) in 2 splits with neem-coated urea.",
        pestDiseaseMonitoring: "Check leaf sheaths for Leaf Folder (folded leaves with white scratch marks) and Brown Planthopper (BPH) at base.",
        importantActivities: [
          "Field inspection: part rice hills to look for brown planthopper nymphs at water level",
          "Weed removal or mechanical cono-weeder operation",
          "Avoid excessive standing water to promote deep root anchoring"
        ]
      },
      {
        stageName: "Flowering & Panicle Initiation (చిరుపొట్ట & ఈనడం)",
        stageIcon: "🌼",
        dayStartOffset: 71,
        dayEndOffset: 95,
        irrigationGuidance: "CRITICAL STAGE: Maintain 5 cm continuous water. Moisture stress now causes empty grain chaff.",
        nutritionGuidance: "Top-dressing 2: Remaining 25% Nitrogen + remaining 50% Potash (MOP) to boost grain size.",
        pestDiseaseMonitoring: "High risk of Neck Blast, Sheath Blight and False Smut. Check for dark ring lesions on stem neck.",
        importantActivities: [
          "Foliar spray of 13-0-45 (Potassium Nitrate) 10g/L if grain filling looks uneven",
          "Never let soil dry during panicle emergence",
          "Ensure alleyways (30 cm gaps every 2 meters) for aeration against BPH"
        ]
      },
      {
        stageName: "Fruiting & Grain Filling (గింజ పాలు & గట్టిపడే దశ)",
        stageIcon: "🍅",
        dayStartOffset: 96,
        dayEndOffset: 120,
        irrigationGuidance: "Maintain shallow saturation. Gradually withdraw water 10-14 days before expected harvest.",
        nutritionGuidance: "No soil fertilizer. Optional foliar Boron 1g/L if grain filling shows sterility.",
        pestDiseaseMonitoring: "Gundhi bug (stink bug) feeding on milky grains. Check in early morning.",
        importantActivities: [
          "Drain field completely 10-12 days before harvest to hasten uniform grain drying",
          "Prepare threshing floor and harvest machinery",
          "Inspect grains: 80% should turn golden yellow before cutting"
        ]
      },
      {
        stageName: "Harvesting & Threshing (కోత & నూర్పిడి)",
        stageIcon: "🌾",
        dayStartOffset: 121,
        dayEndOffset: 135,
        irrigationGuidance: "Dry field completely for harvester entry and zero grain rotting.",
        nutritionGuidance: "Post-harvest soil incorporation of rice straw with bio-decomposer or Trichoderma.",
        pestDiseaseMonitoring: "Check storage moisture (<14%) to prevent storage weevil and grain discoloration.",
        importantActivities: [
          "Harvest when grain moisture is approximately 20-22%",
          "Dry grains on clean tarpaulin to reach safe storage moisture (12-14%)",
          "Avoid open field stubble burning; incorporate into soil for organic carbon"
        ]
      }
    ]
  },

  chilli: {
    cropId: "chilli",
    cropName: "Chilli / Mirchi (మిరప / मिर्च)",
    defaultVariety: "Teja / Guntur Sannam",
    totalDays: 160,
    stages: [
      {
        stageName: "Nursery & Sowing (నారుమడి దశ)",
        stageIcon: "🌱",
        dayStartOffset: 0,
        dayEndOffset: 35,
        irrigationGuidance: "Light sprinkling every 2 days; avoid water pooling to prevent damping-off disease.",
        nutritionGuidance: "Pro-tray nursery with vermicompost & cocopeat 1:1. Drench with 19-19-19 (2g/L).",
        pestDiseaseMonitoring: "Check leaf undersides for microscopic thrips and whiteflies under 40-mesh net.",
        importantActivities: [
          "Raise nursery under 50% shade net or insect-proof nylon net",
          "Seed treatment with Trichoderma viride 10g/kg",
          "Harden seedlings 3-4 days before field transplanting by reducing watering"
        ]
      },
      {
        stageName: "Transplanting & Establishment (మొక్క నాటడం)",
        stageIcon: "🌿",
        dayStartOffset: 36,
        dayEndOffset: 60,
        irrigationGuidance: "Irrigate immediately after transplanting; switch to drip every 2-3 days based on soil moisture.",
        nutritionGuidance: "Basal: FYM 10 tonnes/acre + SSP 150 kg + MOP 30 kg + Carbofuran 10 kg/acre.",
        pestDiseaseMonitoring: "Cutworms, seedling wilt and damping off. Inspect field early morning.",
        importantActivities: [
          "Transplant on raised beds with silver-black plastic mulch for weed and thrips control",
          "Install blue sticky traps (30-40 per acre) for thrips and yellow for whiteflies",
          "Gap fill dead seedlings within 5-7 days"
        ]
      },
      {
        stageName: "Vegetative Growth (శాకీయ ఎదుగుదల)",
        stageIcon: "🌾",
        dayStartOffset: 61,
        dayEndOffset: 90,
        irrigationGuidance: "Drip irrigation for 1-2 hours daily depending on evapo-transpiration.",
        nutritionGuidance: "Fertigation with 19-19-19 (3 kg/acre/week) + Calcium Nitrate 2 kg/acre.",
        pestDiseaseMonitoring: "HIGH ALERT: Black Thrips and Mites causing leaf upward and downward curling (Murda).",
        importantActivities: [
          "Install pheromone traps for Spodoptera litura (5 traps/acre)",
          "Preventive spray: Neem oil 10,000 ppm (2-3 ml/L) alternately with bio-agents",
          "Nip top terminal shoots at 45 days to induce multi-branching and higher yields"
        ]
      },
      {
        stageName: "Flowering & Fruit Initiation (పూత & కాయ దశ)",
        stageIcon: "🌼",
        dayStartOffset: 91,
        dayEndOffset: 120,
        irrigationGuidance: "Avoid excess moisture fluctuations; moisture shock triggers severe flower drops.",
        nutritionGuidance: "Fertigation with 13-0-45 (Potassium nitrate) + 0-52-34 (MKP) + Micronutrient spray.",
        pestDiseaseMonitoring: "Anthracnose (Dieback/fruit rot) and Blossom end rot (Calcium deficiency).",
        importantActivities: [
          "Foliar spray of Planofix (NAA 4.5 SL) 0.25 ml/L or Boron 1g/L to reduce flower drop",
          "Inspect fruit undersides for fruit borer holes",
          "Maintain proper drainage; avoid standing water around plant stems"
        ]
      },
      {
        stageName: "Fruiting & Green Chilli Pickings (కాయల కోత దశ)",
        stageIcon: "🍅",
        dayStartOffset: 121,
        dayEndOffset: 145,
        irrigationGuidance: "Regular light irrigations through drip; keep root zone evenly moist.",
        nutritionGuidance: "Potassium and Sulfur supplements to enhance pungency, color and skin luster.",
        pestDiseaseMonitoring: "Fruit rot on ripe pods; powdery mildew on mature lower foliage.",
        importantActivities: [
          "Harvest mature green chillies every 7-10 days",
          "Observe strict Pre-Harvest Interval (PHI) after any crop protection spray",
          "Hand-pick and destroy any borer-infested fallen fruits"
        ]
      },
      {
        stageName: "Red Ripening & Final Harvest (ఎరుపు రంగు & కోత)",
        stageIcon: "🌾",
        dayStartOffset: 146,
        dayEndOffset: 160,
        irrigationGuidance: "Reduce irrigation gradually to encourage uniform red pigmentation on the bush.",
        nutritionGuidance: "Post-harvest cleaning and soil preparation for next legume rotation.",
        pestDiseaseMonitoring: "Post-harvest fungal molds on drying yard. Ensure clean cement/tarpaulin drying.",
        importantActivities: [
          "Pick fully ripe deep red pods with stalks intact",
          "Sun dry on clean tarpaulin sheets (never on bare soil to avoid Aflatoxin contamination)",
          "Grade according to color, length, and wrinkle quality before market dispatch"
        ]
      }
    ]
  },

  cotton: {
    cropId: "cotton",
    cropName: "Cotton (పత్తి / कपास)",
    defaultVariety: "Bt Cotton Hybrid",
    totalDays: 165,
    stages: [
      {
        stageName: "Sowing & Seedling (విత్తనం & మొలక దశ)",
        stageIcon: "🌱",
        dayStartOffset: 0,
        dayEndOffset: 25,
        irrigationGuidance: "Sow in ridges and furrows; light irrigation or post-monsoon rain moisture.",
        nutritionGuidance: "Basal: DAP 50 kg + MOP 25 kg + Zinc Sulfate 10 kg/acre.",
        pestDiseaseMonitoring: "Early sucking pests: Jassids, Thrips and Aphids causing leaf yellowing and crinkling.",
        importantActivities: [
          "Use certified refuge seeds around the main Bt cotton plot",
          "Maintain plant spacing of 90x60 cm or 120x45 cm",
          "Intercultural weeding between rows at 20 days"
        ]
      },
      {
        stageName: "Vegetative & Squaring (మొగ్గ తొడుగు దశ)",
        stageIcon: "🌿",
        dayStartOffset: 26,
        dayEndOffset: 60,
        irrigationGuidance: "Irrigate every 10-15 days in black soil; avoid waterlogging in root zone.",
        nutritionGuidance: "Top-dress 1: Urea 35 kg + MOP 15 kg per acre in band placement 10 cm away from plant.",
        pestDiseaseMonitoring: "Inspect tender squares (buds) for Pink Bollworm rosette flowers and Jassids.",
        importantActivities: [
          "Install 8-10 pheromone traps per acre for Pink Bollworm monitoring",
          "Foliar spray of 1% Magnesium sulfate + 1% Urea to prevent leaf reddening",
          "Earthing up soil around base to support vigorous canopy"
        ]
      },
      {
        stageName: "Flowering & Peak Bloom (పూత దశ)",
        stageIcon: "🌼",
        dayStartOffset: 61,
        dayEndOffset: 95,
        irrigationGuidance: "Crucial stage: moisture stress causes square and flower shedding.",
        nutritionGuidance: "Top-dress 2: Urea 35 kg + Boron foliar spray (1g/L) for optimal boll setting.",
        pestDiseaseMonitoring: "Bollworms, Whitefly and Tobacco caterpillar on upper canopy leaves.",
        importantActivities: [
          "Monitor ETL: 1 larva per 10 plants or 10% damaged green bolls",
          "Detopping (clipping apical shoot) at 85-90 days to check vegetative excess",
          "Conserve predatory spiders and chrysoperla in the field"
        ]
      },
      {
        stageName: "Boll Development (కాయల ఎదుగుదల)",
        stageIcon: "🍅",
        dayStartOffset: 96,
        dayEndOffset: 130,
        irrigationGuidance: "Moderate irrigation; do not let cracks open wide in black cotton soil.",
        nutritionGuidance: "Foliar spray of 13-0-45 (Potassium Nitrate 20g/L) to prevent boll drop.",
        pestDiseaseMonitoring: "Internal Pink Bollworm damage inside developing bolls; grey mildew.",
        importantActivities: [
          "Collect and destroy rosette flowers and shed bolls",
          "Ensure spray coverage reaches lower canopy",
          "Avoid excessive nitrogen which promotes lush foliage favored by sucking pests"
        ]
      },
      {
        stageName: "Boll Bursting & First Picking (కాయలు పగలడం & కోత)",
        stageIcon: "🌾",
        dayStartOffset: 131,
        dayEndOffset: 150,
        irrigationGuidance: "Stop irrigations completely once 30-40% bolls begin natural bursting.",
        nutritionGuidance: "No fertilizers needed.",
        pestDiseaseMonitoring: "Staining insects (Dysdercus / Cotton Stainer) and seed moisture.",
        importantActivities: [
          "Pick clean, mature open bolls in dry sunny mornings",
          "Keep harvested cotton free from dry bracts, leaf trash and polythene fibers",
          "Separate clean cotton from stained or pest-damaged cotton"
        ]
      },
      {
        stageName: "Final Picking & Field Termination (ముగింపు కోత)",
        stageIcon: "🌾",
        dayStartOffset: 151,
        dayEndOffset: 165,
        irrigationGuidance: "Dry field completely.",
        nutritionGuidance: "Shred cotton stalks into the soil to break pest life cycle.",
        pestDiseaseMonitoring: "Terminate crop by 160-170 days to prevent Pink Bollworm carry-over to next season.",
        importantActivities: [
          "Never allow ratoon cotton to sprout into the summer season",
          "Graze cattle or run tractor-mounted stalk shredder",
          "Deep summer ploughing to expose pupae to predatory birds"
        ]
      }
    ]
  },

  tomato: {
    cropId: "tomato",
    cropName: "Tomato (టమాటా / टमाटर)",
    defaultVariety: "Arka Rakshak / Abhinav",
    totalDays: 140,
    stages: [
      {
        stageName: "Nursery & Germination (నారుమడి దశ)",
        stageIcon: "🌱",
        dayStartOffset: 0,
        dayEndOffset: 25,
        irrigationGuidance: "Light sprinkling once or twice a day; prevent damping-off with proper drainage.",
        nutritionGuidance: "Cocopeat trays with Trichoderma and micro-nutrients.",
        pestDiseaseMonitoring: "Whiteflies (vector of Leaf Curl Virus) and leaf miners in nursery.",
        importantActivities: [
          "Raise under insect proof net (40-50 mesh) to avoid viral infection",
          "Seed treatment with bio-fungicides",
          "Hardening 3 days before field shift"
        ]
      },
      {
        stageName: "Transplanting & Staking (మొక్కలు నాటడం & కర్రలు కట్టడం)",
        stageIcon: "🌿",
        dayStartOffset: 26,
        dayEndOffset: 50,
        irrigationGuidance: "Irrigate immediately after transplanting; drip system every 2 days.",
        nutritionGuidance: "Basal: DAP + Potash + FYM 10 tonnes. Weekly fertigation with 19-19-19.",
        pestDiseaseMonitoring: "Early blight concentric ring leaf spots and bacterial wilt symptoms.",
        importantActivities: [
          "Stake plants with bamboo sticks or trellising wire before heavy canopy forms",
          "Mulch with silver-black sheet to suppress weeds",
          "Drench base with copper oxychloride if damping off occurs"
        ]
      },
      {
        stageName: "Vegetative & Flowering (శాకీయ & పూత దశ)",
        stageIcon: "🌾",
        dayStartOffset: 51,
        dayEndOffset: 75,
        irrigationGuidance: "Consistent moisture; avoid drought-then-heavy-watering which causes blossom end rot.",
        nutritionGuidance: "Calcium Nitrate 2g/L + Boron 1g/L foliar spray to prevent fruit cracking.",
        pestDiseaseMonitoring: "Tuta absoluta (pinworm) leaf mines and Helicoverpa fruit borer eggs.",
        importantActivities: [
          "Install Tuta pheromone traps (16 traps/acre)",
          "Prune lower yellowed leaves touching the soil",
          "Maintain bee activity for cross pollination"
        ]
      },
      {
        stageName: "Fruiting & Fruit Enlargement (కాయలు కట్టే దశ)",
        stageIcon: "🍅",
        dayStartOffset: 76,
        dayEndOffset: 105,
        irrigationGuidance: "Uniform drip irrigation; maintain moderate soil moisture.",
        nutritionGuidance: "Potassium rich fertigation (13-0-45 or 0-0-50) for uniform fruit size and shine.",
        pestDiseaseMonitoring: "Fruit borer punctures; Late Blight water-soaked lesions during humid spells.",
        importantActivities: [
          "Remove and destroy borer-punctured green fruits",
          "Inspect fruit calyx for tiny caterpillar entry holes",
          "Support loaded branches to avoid fruit soil contact"
        ]
      },
      {
        stageName: "Harvesting & Multiple Pickings (పండ్ల కోత దశ)",
        stageIcon: "🌾",
        dayStartOffset: 106,
        dayEndOffset: 140,
        irrigationGuidance: "Light irrigation after every harvest picking to sustain subsequent flushes.",
        nutritionGuidance: "Light booster spray of micronutrients after major picking.",
        pestDiseaseMonitoring: "Post-harvest fruit rot and fruit fly strikes.",
        importantActivities: [
          "Pick fruits at breaker/turning stage for long-distance transport",
          "Harvest in early morning or late afternoon",
          "Grade by size and ripeness into plastic crates"
        ]
      }
    ]
  }
};

/**
 * Generate a customized, date-calculated CropCalendarPlan
 */
export function generateCropCalendarPlan(
  cropId: string,
  variety: string,
  location: string,
  sowingDateStr: string,
  irrigationMethod = "Drip / Canal"
): CropCalendarPlan {
  const template = CROP_CALENDAR_TEMPLATES[cropId] || CROP_CALENDAR_TEMPLATES.paddy;
  const baseDate = new Date(sowingDateStr || new Date().toISOString().split("T")[0]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stages: CropCalendarStage[] = template.stages.map((st, idx) => {
    const startDate = new Date(baseDate);
    startDate.setDate(baseDate.getDate() + st.dayStartOffset);

    const endDate = new Date(baseDate);
    endDate.setDate(baseDate.getDate() + st.dayEndOffset);

    let status: "completed" | "active" | "upcoming" = "upcoming";
    if (today > endDate) {
      status = "completed";
    } else if (today >= startDate && today <= endDate) {
      status = "active";
    }

    const formatDate = (d: Date) =>
      d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

    return {
      id: `stage-${idx + 1}`,
      stageName: st.stageName,
      stageIcon: st.stageIcon,
      approxStartDay: st.dayStartOffset,
      approxEndDay: st.dayEndOffset,
      startDateFormatted: formatDate(startDate),
      endDateFormatted: formatDate(endDate),
      irrigationGuidance: st.irrigationGuidance,
      nutritionGuidance: st.nutritionGuidance,
      pestDiseaseMonitoring: st.pestDiseaseMonitoring,
      importantActivities: st.importantActivities,
      status
    };
  });

  return {
    id: `calendar-${cropId}-${Date.now()}`,
    cropName: template.cropName,
    variety: variety || template.defaultVariety,
    location: location || "Andhra Pradesh / India",
    sowingDate: sowingDateStr,
    irrigationMethod,
    totalDurationDays: template.totalDays,
    stages,
    disclaimer:
      "DISCLAIMER: All stage dates and durations are approximate estimations based on standard agronomic growth models. Actual dates naturally vary with seed variety, local weather, soil fertility, and temperature. Never treat approximate dates as guaranteed harvest commitments."
  };
}
