import { MarketCropBenchmark } from "../types";

export const OFFICIAL_MSP_BENCHMARKS: Record<string, MarketCropBenchmark> = {
  paddy: {
    cropName: "Paddy / Rice (వరి / धान)",
    cropIcon: "🌾",
    mspGovernment2024_2025: 2300,
    mspUnit: "₹ / Quintal (100 kg)",
    category: "Cereals",
    qualitySpecifications: "Fair Average Quality (FAQ): Moisture content maximum 17%, foreign matter < 1%, damaged/discolored grains < 3%.",
    optimalSellingWindow: "Sell when mandi arrivals stabilize or at government procurement centres (PPC / PACS / RBK) to ensure guaranteed MSP.",
    storageTips: "Dry immediately on clean tarpaulin to bring moisture below 14% before bagging in clean jute sacks. Store on wooden pallets away from damp walls."
  },
  cotton: {
    cropName: "Cotton (Medium Staple) (పత్తి / कपास)",
    cropIcon: "🌱",
    mspGovernment2024_2025: 7121,
    mspUnit: "₹ / Quintal (100 kg)",
    category: "Commercial",
    qualitySpecifications: "Cotton Corporation of India (CCI) FAQ standard: Moisture 8-12%, trash content < 8%, staple length 24.5 - 25.5 mm.",
    optimalSellingWindow: "Register on Cotton Corporation of India (CCI) procurement portal when private ginning prices fall below MSP.",
    storageTips: "Store in well-ventilated dry sheds protected from rodents, rain leaks, and open flames. Never mix moisture-stained cotton."
  },
  maize: {
    cropName: "Maize / Corn (మొక్కజొన్న / मक्का)",
    cropIcon: "🌽",
    mspGovernment2024_2025: 2225,
    mspUnit: "₹ / Quintal (100 kg)",
    category: "Cereals",
    qualitySpecifications: "Moisture content maximum 14%, broken grains < 3%, other food grains < 2%.",
    optimalSellingWindow: "High poultry and starch industry demand. Look for nearby feed mill buyers or direct APMC auction.",
    storageTips: "Dry cobs thoroughly before shelling to prevent Aspergillus flavus fungal mold growth and Aflatoxin buildup."
  },
  groundnut: {
    cropName: "Groundnut in Shell (వేరుశనగ / मूंगफली)",
    cropIcon: "🥜",
    mspGovernment2024_2025: 6783,
    mspUnit: "₹ / Quintal (100 kg)",
    category: "Oilseeds",
    qualitySpecifications: "Pods in shell: Moisture < 8%, shrivelled pods < 2%, sound kernel recovery > 70%.",
    optimalSellingWindow: "Oil mill clusters offer premiums for high oil content varieties. Register for NAFED procurement if open.",
    storageTips: "Ensure pods rattle inside shell indicating safe moisture (<8%). Store in cool, dry gunny bags on raised dunnage."
  },
  soybean: {
    cropName: "Soybean (సోయాబీన్ / सोयाबीन)",
    cropIcon: "🌱",
    mspGovernment2024_2025: 4892,
    mspUnit: "₹ / Quintal (100 kg)",
    category: "Oilseeds",
    qualitySpecifications: "Moisture < 12%, foreign matter < 2%, split seeds < 10%.",
    optimalSellingWindow: "Check regional solvent extraction plants and crush parity prices before dispatch.",
    storageTips: "Do not drop bags from height (soybean seed coat is fragile). Keep moisture strictly under 11%."
  },
  wheat: {
    cropName: "Wheat (గోధుమ / गेहूं)",
    cropIcon: "🌾",
    mspGovernment2024_2025: 2275,
    mspUnit: "₹ / Quintal (100 kg)",
    category: "Cereals",
    qualitySpecifications: "FCI FAQ: Moisture < 12%, foreign matter < 0.75%, shrivelled grains < 6%.",
    optimalSellingWindow: "Food Corporation of India (FCI) procurement centres during Rabi marketing season.",
    storageTips: "Use airtight hermetic bags or fumigate with recommended storage protectants against khapra beetle."
  },
  chilli: {
    cropName: "Dry Red Chilli (ఎండు మిరప / लाल मिर्च)",
    cropIcon: "🌶️",
    mspGovernment2024_2025: undefined, // Non-MSP commercial horticulture crop
    mspUnit: "Market Price Driven (Non-MSP)",
    category: "Spices & Vegetables",
    qualitySpecifications: "Teja / Deluxe grade: Deep uniform red color, stem intact, moisture 10-11%, zero fungal spots.",
    optimalSellingWindow: "Cold storage holding allows selling during off-season peaks (July-October) when spot market supply drops.",
    storageTips: "Store in certified cold storages at 4-6°C and 65% relative humidity to preserve capsaicin and red color."
  },
  tomato: {
    cropName: "Fresh Tomato (టమాటా / टमाटर)",
    cropIcon: "🍅",
    mspGovernment2024_2025: undefined, // Perishable vegetable
    mspUnit: "Market Auction Driven",
    category: "Spices & Vegetables",
    qualitySpecifications: "Grade A: Firm, uniform ripening, free from fruit borer punctures or cracking.",
    optimalSellingWindow: "Harvest at pink/breaker stage for distant metro markets to reduce transit spoilage.",
    storageTips: "Short shelf life; utilize plastic ventilated crates (25 kg) instead of bags to prevent crushing."
  }
};

export const MAJOR_MANDIS = [
  { id: "mandi-guntur", name: "Guntur Agricultural Market Committee (APMC)", district: "Guntur", state: "Andhra Pradesh", famousFor: "Dry Red Chilli, Cotton, Paddy" },
  { id: "mandi-warangal", name: "Warangal Enumamula Agricultural Market", district: "Warangal", state: "Telangana", famousFor: "Cotton, Red Chilli, Paddy, Maize" },
  { id: "mandi-nizamabad", name: "Nizamabad Agricultural Market Yard", district: "Nizamabad", state: "Telangana", famousFor: "Turmeric, Paddy, Maize, Soybean" },
  { id: "mandi-kurnool", name: "Kurnool APMC Market", district: "Kurnool", state: "Andhra Pradesh", famousFor: "Onion, Groundnut, Cotton" },
  { id: "mandi-khammam", name: "Khammam Rythu Market", district: "Khammam", state: "Telangana", famousFor: "Chilli, Cotton, Maize" },
  { id: "mandi-indore", name: "Indore Mandi (Choithram)", district: "Indore", state: "Madhya Pradesh", famousFor: "Soybean, Wheat, Gram" },
  { id: "mandi-azadpur", name: "Azadpur Mandi", district: "Delhi", state: "Delhi NCR", famousFor: "Vegetables, Tomato, Fruits" },
  { id: "mandi-belagavi", name: "Belagavi APMC Market", district: "Belagavi", state: "Karnataka", famousFor: "Vegetables, Maize, Jowar" }
];
