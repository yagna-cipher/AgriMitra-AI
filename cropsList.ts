export interface CropOption {
  id: string;
  name: string;
  teluguName: string;
  hindiName: string;
  tamilName: string;
  icon: string;
  category: "Cereal" | "Vegetable" | "Cash Crop" | "Pulse" | "Fruit" | "Oilseed";
  stages: string[];
  commonVarieties: string[];
  commonIssues: string[];
}

export const CROPS_LIST: CropOption[] = [
  {
    id: "paddy",
    name: "Rice / Paddy",
    teluguName: "వరి",
    hindiName: "धान / चावल",
    tamilName: "நெல்",
    icon: "🌾",
    category: "Cereal",
    stages: ["Nursery", "Tillering", "Panicle Initiation", "Flowering / Milk Stage", "Maturity / Harvest"],
    commonVarieties: ["BPT 5204 (Samba Mahsuri)", "MTU 1010", "Swarna (MTU 7029)", "RNR 15048 (Telangana Sona)", "IR 64", "Pusa Basmati 1121"],
    commonIssues: ["Brown Planthopper (BPH)", "Rice Blast", "Stem Borer", "Bacterial Leaf Blight", "Zinc Deficiency"]
  },
  {
    id: "chilli",
    name: "Chilli / Mirchi",
    teluguName: "మిరప",
    hindiName: "मिर्च",
    tamilName: "மிளகாய்",
    icon: "🌶️",
    category: "Vegetable",
    stages: ["Transplanting", "Vegetative", "Flowering", "Fruit Set / Green Chilli", "Harvest / Red Ripening"],
    commonVarieties: ["Teja", "Guntur Sannam (S4)", "Byadgi", "Armoor", "Pusa Jwala", "US 341"],
    commonIssues: ["Thrips & Mites (Leaf Curl)", "Dieback & Anthracnose", "Gemini Virus", "Bacterial Wilt", "Powdery Mildew"]
  },
  {
    id: "cotton",
    name: "Cotton",
    teluguName: "పత్తి",
    hindiName: "कपास",
    tamilName: "பருத்தி",
    icon: "🌱",
    category: "Cash Crop",
    stages: ["Germination / Seedling", "Squaring (Buds)", "Flowering", "Boll Development", "Boll Bursting / Picking"],
    commonVarieties: ["RCH 659 BG II", "Bollgard II", "Mallika", "Kaveri Jadoo", "Suraj", "DCH 32"],
    commonIssues: ["Pink Bollworm", "Leaf Reddening (Mg/N deficiency)", "Jassids / Leafhopper", "Root Rot", "Tobacco Caterpillar"]
  },
  {
    id: "tomato",
    name: "Tomato",
    teluguName: "టమాటా",
    hindiName: "टमाटर",
    tamilName: "தக்காளி",
    icon: "🍅",
    category: "Vegetable",
    stages: ["Nursery / Seedling", "Vegetative / Staking", "Flowering", "Fruit Development", "Harvest"],
    commonVarieties: ["Arka Rakshak", "Arka Samrat", "Abhinav", "Saaho (Syngenta)", "Pusa Ruby", "Laxmi"],
    commonIssues: ["Early Blight", "Late Blight", "Leaf Curl Virus (Whitefly)", "Tomato Pinworm (Tuta absoluta)", "Calcium Deficiency (Blossom End Rot)"]
  },
  {
    id: "maize",
    name: "Maize / Corn",
    teluguName: "మొక్కజొన్న",
    hindiName: "मक्का",
    tamilName: "மக்காச்சோளம்",
    icon: "🌽",
    category: "Cereal",
    stages: ["Seedling (V2-V4)", "Knee-high (V6-V8)", "Tasseling / Silking", "Grain Filling", "Maturity"],
    commonVarieties: ["Pioneer 3396", "Kaveri 50", "DHM 117", "NK 6240", "DKC 9108", "African Tall"],
    commonIssues: ["Fall Armyworm (FAW)", "Waterlogging Stress", "Stem Borer", "Turcicum Leaf Blight", "Zinc Deficiency (White Bud)"]
  },
  {
    id: "groundnut",
    name: "Groundnut / Peanut",
    teluguName: "వేరుశనగ",
    hindiName: "मूंगफली",
    tamilName: "நிலக்கடலை",
    icon: "🥜",
    category: "Oilseed",
    stages: ["Emergence", "Vegetative", "Flowering", "Pegging (Pod Initiation)", "Pod Filling / Harvest"],
    commonVarieties: ["Kadiri 6", "Kadiri 9", "TMV 2", "TAG 24", "ICGV 91114 (Abhaya)", "Dharani"],
    commonIssues: ["Tikka Leaf Spot", "Collar Rot (Aspergillus)", "Spodoptera / Leaf Miner", "Calcium Deficiency (Pops / Hollow Pods)", "Rust"]
  },
  {
    id: "mango",
    name: "Mango",
    teluguName: "మామిడి",
    hindiName: "आम",
    tamilName: "மாம்பழம்",
    icon: "🥭",
    category: "Fruit",
    stages: ["Vegetative Flush", "Panicle Emergence / Flowering", "Fruit Set (Pea Size)", "Fruit Development", "Harvest"],
    commonVarieties: ["Banganapalli", "Totapuri", "Alphonso", "Kesar", "Dasheri", "Neelum"],
    commonIssues: ["Mango Hopper", "Powdery Mildew", "Anthracnose / Blossom Blight", "Fruit Fly", "Spongy Tissue"]
  },
  {
    id: "banana",
    name: "Banana",
    teluguName: "అరటి",
    hindiName: "केला",
    tamilName: "வாழை",
    icon: "🍌",
    category: "Fruit",
    stages: ["Sucker / Planting", "Vegetative / Leaf Formation", "Bunch Shooting / Inflorescence", "Bunch Filling", "Harvest"],
    commonVarieties: ["Grand Naine (G9)", "Robusta", "Yelakki / Ney Poovan", "Rasthali", "Red Banana", "Nendran"],
    commonIssues: ["Sigatoka Leaf Spot", "Panama Wilt (Fusarium)", "Banana Pseudostem Weevil", "Bunchy Top Virus (Aphid vector)", "Potassium Deficiency"]
  },
  {
    id: "potato",
    name: "Potato",
    teluguName: "బంగాళాదుంప",
    hindiName: "आलू",
    tamilName: "உருளைக்கிழங்கு",
    icon: "🥔",
    category: "Vegetable",
    stages: ["Sprouting / Emergence", "Vegetative Growth", "Tuber Initiation", "Tuber Bulking", "Maturity / Haulm Cutting"],
    commonVarieties: ["Kufri Jyoti", "Kufri Pukhraj", "Kufri Bahar", "Kufri Chipsona 1", "Lady Rosetta"],
    commonIssues: ["Late Blight", "Early Blight", "Potato Tuber Moth", "Black Scurf (Rhizoctonia)", "Bacterial Soft Rot"]
  },
  {
    id: "onion",
    name: "Onion",
    teluguName: "ఉల్లిపాయ",
    hindiName: "प्याज",
    tamilName: "வெங்காயம்",
    icon: "🧅",
    category: "Vegetable",
    stages: ["Nursery", "Transplanting / Vegetative", "Bulb Initiation", "Bulb Bulking", "Neck Fall / Harvest"],
    commonVarieties: ["Bhima Super", "Bhima Shakti", "Agrifound Dark Red", "Pusa Red", "Nasik Red"],
    commonIssues: ["Purple Blotch (Alternaria)", "Onion Thrips", "Basal Rot (Fusarium)", "Stemphylium Blight", "Storage Rot"]
  },
  {
    id: "pulses",
    name: "Pulses (Redgram / Bengalgram / Blackgram)",
    teluguName: "పప్పుధాన్యాలు (కందులు, మినుములు, పెసలు)",
    hindiName: "दालें (अरहर, चना, उड़द)",
    tamilName: "பருப்பு வகைகள்",
    icon: "🫘",
    category: "Pulse",
    stages: ["Seedling", "Branching / Vegetative", "Flowering", "Pod Development", "Maturity"],
    commonVarieties: ["LBG 752", "ICPL 87119 (Asha)", "JG 11", "PU 31", "WGG 42"],
    commonIssues: ["Pod Borer (Helicoverpa)", "Sterility Mosaic Disease", "Fusarium Wilt", "Yellow Mosaic Virus", "Root Rot"]
  }
];
