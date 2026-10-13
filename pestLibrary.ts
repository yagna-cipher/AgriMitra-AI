import { PestLibraryItem } from "../types";

export const PEST_AND_DISEASE_LIBRARY: PestLibraryItem[] = [
  {
    id: "pest-bph",
    commonName: "Brown Planthopper (BPH)",
    scientificName: "Nilaparvata lugens",
    localNames: {
      te: "సుడిదోమ (Sudi Doma)",
      hi: "भूरा फुदका (Bhura Phudka)",
      ta: "பழுப்பு இலைப்பேன் (Pazhuppu Ilaippen)",
      kn: "ಕಂದು ಜಿಗಿಹುಳು (Kandu Jigi Hulu)",
      ml: "തവിട്ടു ചാഴി (Thavittu Chazhi)",
      mr: "तपकिरी तुडतुडे (Tapkiri Tudtude)",
      bn: "বাদামি ঘাসফড়িং (Badami Ghasphoring)",
      gu: "તપખીરી ચૂસિયા (Tapkhiri Chusiya)",
      pa: "ਭੂਰਾ ਟਿੱਡਾ (Bhura Tidda)",
      en: "Brown Planthopper"
    },
    category: "pest",
    affectedCrops: ["Rice / Paddy"],
    identificationMarks: [
      "Small brownish-ochre insects (2.5 - 4 mm long).",
      "Clustered in colonies strictly at the base of tillers above water level.",
      "Both winged (macropterous) and short-winged (brachypterous) forms."
    ],
    typicalSymptoms: [
      "Circular patches of yellowing drying tillers called 'hopper burn'.",
      "Sooty mold fungus developing on honey-dew excreted at plant base.",
      "Tillers dry rapidly and lodge into the field water."
    ],
    favorableConditions: "High humidity (>85%), stagnant water in field, close planting, excessive urea fertilizer, cloudy humid weather.",
    biologicalControl: [
      "Conserve wolf spiders (Lycosa pseudoannulata) @ 1-2 per hill.",
      "Mirid bugs (Cyrtorhinus lividipennis) eat BPH eggs.",
      "Neem seed kernel extract 5% or Neem oil 10,000 ppm @ 2 ml/L."
    ],
    culturalControl: [
      "Form 30 cm alleyways (pathways) every 2 meters during transplanting.",
      "Practice Alternate Wetting and Drying (AWD) irrigation.",
      "Drain water from field for 3-4 days upon first appearance."
    ],
    mechanicalControl: [
      "Light traps to monitor winged adult emergence.",
      "Passing rope over canopy is ineffective for BPH since they sit at base."
    ],
    chemicalControlSafety: [
      "Avoid synthetic pyrethroids (causes severe resurgence).",
      "Pymetrozine 50% WDG @ 120 g/acre or Triflumezopyrim 10% SC @ 94 ml/acre directed strictly to base of tillers with high spray volume (200 L water/acre).",
      "Wear full protective PPE and maintain 21 days pre-harvest interval."
    ],
    preventionTips: [
      "Grow resistant varieties (MTU 1010, MTU 1061).",
      "Balanced application of potash (MOP) to harden stem cells.",
      "Avoid blanket calendar sprays."
    ],
    imageUrl: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pest-fall-armyworm",
    commonName: "Fall Armyworm (FAW)",
    scientificName: "Spodoptera frugiperda",
    localNames: {
      te: "కత్తెర పురుగు (Kattera Purugu)",
      hi: "सैनिक कीट / फॉल आर्मीवॉर्म (Sainik Keet)",
      ta: "படைப்புழு (Padaippuzhu)",
      kn: "ಲದ್ದಿ ಹುಳು (Laddi Hulu)",
      ml: "പടപ്പുഴു (Padappuzhu)",
      mr: "लष्करी अळी (Lashkari Aali)",
      bn: "আর্মিওয়ার্ম শুঁয়োপোকা (Armyworm Pokha)",
      gu: "લશ્કરી ઈયળ (Lashkari Iyal)",
      pa: "ਲਸ਼ਕਰੀ ਸੁੰਡੀ (Lashkari Sundi)",
      en: "Fall Armyworm"
    },
    category: "pest",
    affectedCrops: ["Maize", "Sorghum", "Sugarcane", "Sweet Corn"],
    identificationMarks: [
      "Larva has an inverted 'Y' shaped suture on the head.",
      "Four dark pinaculum spots arranged in a square on the 8th abdominal segment.",
      "Heavy saw-dust like fecal frass packed inside whorls."
    ],
    typicalSymptoms: [
      "Pin holes and window-pane feeding on whorl leaves.",
      "Ragged large holes and skeletonized leaves as larvae grow.",
      "Boring directly into developing cobs and tassels."
    ],
    favorableConditions: "Warm temperatures (25-32°C), continuous maize planting, drought stress, and delayed monsoon.",
    biologicalControl: [
      "Release egg parasitoid Trichogramma pretiosum @ 50,000/acre.",
      "Metarhizium rileyi or Beauveria bassiana @ 5g/L foliar spray.",
      "Bacillus thuringiensis (Bt) @ 2g/L."
    ],
    culturalControl: [
      "Deep summer ploughing to expose pupae to sun and birds.",
      "Intercropping with Pulses (Cowpea, Desmodium) or Sunflower.",
      "Timely uniform sowing in a village/cluster."
    ],
    mechanicalControl: [
      "Install pheromone traps @ 5 per acre for monitoring.",
      "Hand picking and crushing of egg masses covered in felt-like scales.",
      "Apply dry sand + wood ash mixture (9:1) into whorls to suffocate larvae."
    ],
    chemicalControlSafety: [
      "Apply Emamectin benzoate 5% SG @ 0.4g/L OR Chlorantraniliprole 18.5% SC @ 0.4ml/L directed into plant whorls.",
      "Always spray late afternoon when larvae are active."
    ],
    preventionTips: [
      "Seed treatment with Cyantraniliprole 19.8% + Thiamethoxam 19.8% FS @ 6ml/kg seed.",
      "Erect bird perches (T-shaped poles) @ 10/acre."
    ],
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pest-pink-bollworm",
    commonName: "Pink Bollworm (PBW)",
    scientificName: "Pectinophora gossypiella",
    localNames: {
      te: "గులాబీ రంగు కాయ తొలుచు పురుగు (Gulabi Rang Purugu)",
      hi: "गुलाबी सुंडी (Gulabi Sundi)",
      ta: "இளஞ்சிவப்பு காய்ப்புழு (Ilam Sivappu Puzhu)",
      kn: "ಗುಲಾಬಿ ಕಾಯಿ ಕೊರೆಯುವ ಹುಳು (Gulabi Hulu)",
      ml: "പിങ്ക് കായ്തുരപ്പൻ (Pink Kaythurappan)",
      mr: "बोंडअळी (Bond Aali)",
      bn: "গোলাপি বলওয়ার্ম (Golapi Bollworm)",
      gu: "ગુલાબી ઈયળ (Gulabi Iyal)",
      pa: "ਗੁਲਾਬੀ ਸੁੰਡੀ (Gulabi Sundi)",
      en: "Pink Bollworm"
    },
    category: "pest",
    affectedCrops: ["Cotton", "Okra / Bhindi"],
    identificationMarks: [
      "Full-grown caterpillar is pinkish with dark brown head.",
      "Bores into young squares and bolls, sealing entry hole with silk/frass."
    ],
    typicalSymptoms: [
      "'Rosette flower' symptom (petals twisted together into a closed rosette).",
      "Stained lint and premature dropping or rotting of green bolls.",
      "Double seeds (seeds joined by silk webbing containing pink larvae)."
    ],
    favorableConditions: "Extended crop duration (>180 days), high humidity, warm nights, and non-destruction of cotton stalks.",
    biologicalControl: [
      "Trichogramma bactrae egg parasitoid @ 60,000/acre at weekly intervals.",
      "Neem oil 10,000 ppm @ 2-3 ml/L at rosette flower stage."
    ],
    culturalControl: [
      "Strictly terminate cotton crop by December/January (avoid ratoon crop).",
      "Shred and incorporate cotton stalks into soil; avoid stacking stalks near fields."
    ],
    mechanicalControl: [
      "Install PBW pheromone traps (Gossyplure) @ 8-10 traps per acre at 45 DAS.",
      "Hand collection and destruction of rosette flowers daily."
    ],
    chemicalControlSafety: [
      "Profenofos 50% EC @ 2ml/L or Indoxacarb 14.5% SC @ 1ml/L or Emamectin Benzoate 5% SG @ 0.5g/L if trap catches exceed 8 moths/trap/night for 3 consecutive days."
    ],
    preventionTips: [
      "Plant non-Bt refuge border rows.",
      "Use certified delinted seeds treated with Trichoderma.",
      "Community-wide synchronized sowing."
    ],
    imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pest-thrips-whitefly",
    commonName: "Chilli Thrips & Whitefly",
    scientificName: "Scirtothrips dorsalis & Bemisia tabaci",
    localNames: {
      te: "తామర పురుగులు & తెల్లదోమ (Thamara Purugulu & Tella Doma)",
      hi: "थ्रिप्स और सफेद मक्खी (Thrips & Safed Makkhi)",
      ta: "இலைப்பேன் & வெள்ளை ஈ (Ilaippen & Vellai Ee)",
      kn: "ನುಸಿ & ಬಿಳಿ ನೊಣ (Nusi & Bili Nona)",
      ml: "ഇലപ്പേൻ & വെള്ളീച്ച (Ilappean & Vellicha)",
      mr: "फुलकिडे व पांढरी माशी (Thrips & Pandhri Mashi)",
      bn: "থ্রিপস ও সাদা মাছি (Thrips & Sada Machi)",
      gu: "થ્રિપ્સ અને સફેદ માખી (Thrips & Safed Makhi)",
      pa: "ਥ੍ਰਿਪਸ ਅਤੇ ਚਿੱਟੀ ਮੱਖੀ (Thrips & Chitti Makkhi)",
      en: "Thrips and Whitefly Complex"
    },
    category: "pest",
    affectedCrops: ["Chilli", "Tomato", "Cotton", "Brinjal", "Pulses", "Papaya"],
    identificationMarks: [
      "Thrips: Minute yellow-brown slender insects with fringed wings.",
      "Whitefly: Tiny powdery-white moth-like insects fluttering on leaf undersides."
    ],
    typicalSymptoms: [
      "Upward boat-shaped leaf curl (Thrips) and downward cupping with yellow mosaic (Whitefly/Virus).",
      "Silvery patches turning brownish on leaf underside.",
      "Flower shedding and stunted bushy growth."
    ],
    favorableConditions: "Dry, hot weather with bright sunshine and high temperature.",
    biologicalControl: [
      "Lecanicillium lecanii @ 5g/L or Beauveria bassiana @ 5g/L.",
      "Chrysoperla carnea (Green lacewing) larvae @ 10,000/acre."
    ],
    culturalControl: [
      "Erect 2-3 rows of tall border barrier crops (Maize/Bajra/Sorghum).",
      "Use silver-black reflective plastic mulch to disorient flying insects."
    ],
    mechanicalControl: [
      "Blue sticky traps (thrips) + Yellow sticky traps (whitefly) @ 25-30 traps/acre.",
      "Spraying with fine water jet during morning."
    ],
    chemicalControlSafety: [
      "Diafenthiuron 50% WP @ 1.25g/L or Spinetoram 11.7% SC @ 1ml/L or Pyriproxyfen 10% EC @ 2ml/L.",
      "Rotate chemical modes of action; never repeat same chemistry successively."
    ],
    preventionTips: [
      "Seedling root dip with Imidacloprid 17.8% SL (0.5 ml/L) for 15 mins.",
      "Weed eradication on field borders."
    ],
    imageUrl: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "disease-rice-blast",
    commonName: "Rice Blast Disease",
    scientificName: "Magnaporthe oryzae (Pyricularia oryzae)",
    localNames: {
      te: "వరి అగ్గితెగులు (Aggithegulu)",
      hi: "धान का झुलसा रोग (Dhan ka Jhulsa)",
      ta: "நெல் குலை நோய் (Nel Kulai Noi)",
      kn: "ಭತ್ತದ ಬೆಂಕಿ ರೋಗ (Bhattada Benki Roga)",
      ml: "നെല്ലിന്റെ കുലവാട്ടം (Nelinte Kulavattom)",
      mr: "भातावरील करपा (Bhatawaril Karpa)",
      bn: "ধানের ব্লাস্ট রোগ (Dhaner Blast)",
      gu: "ડાંગરનો ગેરુ / બ્લાસ્ટ (Blast)",
      pa: "ਝੋਨੇ ਦਾ ਬਲਾਸਟ (Jhonne da Blast)",
      en: "Rice Blast (Leaf, Node & Neck Blast)"
    },
    category: "disease",
    affectedCrops: ["Rice / Paddy"],
    identificationMarks: [
      "Spindle-shaped / diamond-shaped spots with greyish-white center and brown/reddish margin.",
      "Spots coalesce causing entire leaf blade to look burnt.",
      "Neck blast turns panicle neck black; panicles break and hang down with empty chaffy grains."
    ],
    typicalSymptoms: [
      "Leaf blast: Eye-shaped or spindle lesions on leaves.",
      "Node blast: Blackened node girdles, breaking easily.",
      "Neck blast: Black necrosis at panicle base; complete grain sterility."
    ],
    favorableConditions: "Night temperatures 20-24°C with relative humidity >90%, dew on leaves for >10 hours, cloudy weather, and high doses of nitrogen fertilizer.",
    biologicalControl: [
      "Pseudomonas fluorescens @ 5g/L or Trichoderma viride @ 5g/L foliar spray.",
      "Fermented cow urine 10% spray."
    ],
    culturalControl: [
      "Split application of nitrogen (Urea) into 3-4 doses; avoid heavy single dose.",
      "Maintain continuous shallow water layer in field (drought accentuates blast).",
      "Burn straw and stubble from infected plots."
    ],
    mechanicalControl: [
      "Clean field bunds of collateral grass hosts (Digitaria, Echinochloa)."
    ],
    chemicalControlSafety: [
      "Tricyclazole 75% WP @ 0.6g/L OR Isoprothiolane 40% EC @ 1.5ml/L OR Kasugamycin 3% SL @ 2ml/L.",
      "Spray at early tillering and panicle emergence stages on clear morning."
    ],
    preventionTips: [
      "Seed treatment with Tricyclazole 75% WP @ 2g/kg seed.",
      "Grow blast-tolerant varieties (e.g. Swarna, MTU 1061, RNR 15048).",
      "Avoid nursery near shade or over-fertilized seedbeds."
    ],
    imageUrl: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "disease-tomato-late-blight",
    commonName: "Tomato Late Blight",
    scientificName: "Phytophthora infestans",
    localNames: {
      te: "టమాటా లేట్ బ్లైట్ / మాడు తెగులు (Late Blight)",
      hi: "टमाटर का पछेती झुलसा (Pacheti Jhulsa)",
      ta: "தக்காளி தாமத கருகல் (Thamatha Karukal)",
      kn: "ತಡವಾದ ಬ್ಲೈಟ್ (Late Blight)",
      ml: "തക്കാളി കരിച്ചിൽ (Late Blight)",
      mr: "उशिरा येणारा करपा (Ushira Yenara Karpa)",
      bn: "টমেটোর নাবী ধ্বসা (Nabi Dhwasha)",
      gu: "ટમેટાનો પાછોતરો સુકારો (Pachhotro Sukaro)",
      pa: "ਟਮਾਟਰ ਦਾ ਪਛੇਤਾ ਝੁਲਸਾ (Pacheta Jhulsa)",
      en: "Late Blight of Tomato and Potato"
    },
    category: "disease",
    affectedCrops: ["Tomato", "Potato"],
    identificationMarks: [
      "Water-soaked irregular pale green to dark brown patches on leaves.",
      "White cottony downy fungal mildew on underside of leaves in morning humidity.",
      "Greasy dark brown firm rot on green and ripe fruits."
    ],
    typicalSymptoms: [
      "Rapid browning and collapse of entire canopy within 3-5 days (looks frosted or fire-scorched).",
      "Stems show dark brown water-soaked lesions that girdle branches.",
      "Unpleasant pungent odor in heavily infected field."
    ],
    favorableConditions: "Cool temperatures (15-22°C), high humidity (>90%), continuous rain/mist/fog, and prolonged leaf wetness.",
    biologicalControl: [
      "Trichoderma harzianum @ 5g/L + Pseudomonas fluorescens @ 5g/L foliar wash.",
      "Liquid Copper soap formulations."
    ],
    culturalControl: [
      "Stake plants to elevate foliage above soil splash.",
      "Use drip irrigation rather than overhead sprinklers.",
      "Remove and bury infected plants immediately in plastic bags."
    ],
    mechanicalControl: [
      "Plastic mulch to create barrier against soil-borne oospores."
    ],
    chemicalControlSafety: [
      "Preventive: Mancozeb 75% WP @ 2.5g/L or Chlorothalonil 75% WP @ 2g/L.",
      "Curative/Systemic: Cymoxanil 8% + Mancozeb 64% WP @ 2g/L OR Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L OR Dimethomorph 50% WP @ 1g/L."
    ],
    preventionTips: [
      "Destroy volunteer potato and tomato plants.",
      "Plant on raised beds with good air circulation.",
      "Monitor weather forecasts for blight warning periods."
    ],
    imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80"
  }
];
