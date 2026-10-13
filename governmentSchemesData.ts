import { GovernmentScheme } from "../types";

export const VERIFIED_GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: "pm-kisan",
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    shortCode: "PM-KISAN",
    purpose: "Direct income support to all landholding farmer families across India to meet financial needs for farm inputs and household requirements.",
    basicEligibility: [
      "All small, marginal, and landholding farmer families with cultivable landholding in their names.",
      "Aadhaar-linked active bank account and land ownership records (Pahani / RoR / 1-B).",
      "Institutional landholders and high-income tax-paying professionals are excluded."
    ],
    benefits: "Direct cash transfer of ₹6,000 per year paid in three equal 4-monthly installments of ₹2,000 directly into the farmer's Aadhaar-seeded bank account.",
    officialSource: "Ministry of Agriculture & Farmers Welfare, Government of India",
    officialPortalUrl: "https://pmkisan.gov.in",
    howToApply: [
      "Self-registration via the official PM-KISAN portal (pmkisan.gov.in) under 'Farmers Corner' -> 'New Farmer Registration'.",
      "Or visit your nearest Common Service Centre (CSC) or MeeSeva / Gram Panchayat Agriculture Extension Officer.",
      "Keep Aadhaar card, bank passbook, and land ownership passbook (Pattadar passbook) ready for e-KYC."
    ],
    applicableStates: ["All India"],
    applicableCategories: ["Small/Marginal", "Women", "SC/ST", "General"],
    applicableActivities: ["Financial Support", "All Crops"]
  },
  {
    id: "pmfby",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    shortCode: "PMFBY",
    purpose: "Comprehensive crop insurance cover protecting against crop loss or damage arising from unforeseen natural perils (drought, flood, unseasonal rainfall, pests, diseases).",
    basicEligibility: [
      "All farmers growing notified crops in notified areas (both loanee and non-loanee farmers, including tenant farmers with valid lease agreements).",
      "Enrollment must be completed before the state government cut-off date for Kharif or Rabi season."
    ],
    benefits: "Heavily subsidized premium: Farmers pay only 2% of sum insured for Kharif food/oilseed crops, 1.5% for Rabi crops, and 5% for annual commercial/horticultural crops. Balance premium is 100% borne by Central & State governments.",
    officialSource: "Department of Agriculture and Farmers Welfare (DA&FW)",
    officialPortalUrl: "https://pmfby.gov.in",
    howToApply: [
      "Through the National Crop Insurance Portal (pmfby.gov.in) or mobile app 'Crop Insurance App'.",
      "Through your bank branch where your crop loan is held.",
      "At Common Service Centres (CSCs) or through authorized insurance company agents with sowing certificate and land records."
    ],
    applicableStates: ["All India"],
    applicableCategories: ["Small/Marginal", "Women", "SC/ST", "General"],
    applicableActivities: ["Crop Insurance", "All Crops"]
  },
  {
    id: "soil-health-card",
    name: "Soil Health Card Scheme (మట్టి ఆరోగ్య పత్రం)",
    shortCode: "SHC",
    purpose: "Provides farmers with scientifically tested status of 12 soil parameters and customized crop-wise fertilizer dosage to avoid chemical overuse and optimize soil fertility.",
    basicEligibility: [
      "All agricultural landholders in India.",
      "Soil sample is collected by state agricultural department field officials from GPS-tagged farm plots."
    ],
    benefits: "Free or nominal testing covering 12 parameters: Primary nutrients (N, P, K), Secondary nutrients (S), Micronutrients (Zn, Fe, Cu, Mn, Bo), and Physical parameters (pH, EC, Organic Carbon) with specific nutrient recommendations.",
    officialSource: "Ministry of Agriculture & Farmers Welfare, GoI",
    officialPortalUrl: "https://soilhealth.dac.gov.in",
    howToApply: [
      "Contact your Village Agricultural Assistant (VAA), Rythu Bharosa Kendra (RBK), or Block Agriculture Officer.",
      "State departments draw soil samples periodically (cycle of 3 years). You can request testing at the local soil testing laboratory.",
      "View and download your digital Soil Health Card anytime from soilhealth.dac.gov.in using your district, village, and farmer name."
    ],
    applicableStates: ["All India"],
    applicableCategories: ["Small/Marginal", "Women", "SC/ST", "General"],
    applicableActivities: ["Soil Health", "Fertilizers"]
  },
  {
    id: "pmksy-per-drop-more-crop",
    name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY - Per Drop More Crop)",
    shortCode: "PMKSY (PDMC)",
    purpose: "Promotes micro-irrigation technologies (Drip & Sprinkler irrigation) to improve water-use efficiency, increase crop yield, and reduce water pumping electricity costs.",
    basicEligibility: [
      "All categories of farmers possessing cultivable land and an assured water source (borewell, open well, farm pond, or canal).",
      "Higher subsidy rate priority given to Small & Marginal farmers, SC/ST, and Women farmers."
    ],
    benefits: "Financial subsidy up to 55% for Small & Marginal farmers and up to 45% for Other farmers on the standard cost of micro-irrigation systems. Some states (like AP, Telangana, TN, Gujarat) provide additional top-up subsidies up to 70-90%.",
    officialSource: "Ministry of Agriculture & Farmers Welfare",
    officialPortalUrl: "https://pmksy.gov.in",
    howToApply: [
      "Apply through the State Horticulture or Agriculture Department portal (e.g., APMIP in Andhra Pradesh, TSMIP in Telangana, MahaDBT in Maharashtra).",
      "Submit land documents, Aadhaar, water source proof, and soil electricity connection certificate.",
      "Department assigns empanelled micro-irrigation vendors for survey, installation, and field inspection."
    ],
    applicableStates: ["All India"],
    applicableCategories: ["Small/Marginal", "Women", "SC/ST", "General"],
    applicableActivities: ["Irrigation", "Drip & Sprinkler"]
  },
  {
    id: "kisan-credit-card",
    name: "Kisan Credit Card (KCC) Scheme",
    shortCode: "KCC",
    purpose: "Provides timely and adequate credit to farmers from the banking system to meet short-term credit requirements for cultivation, post-harvest expenses, and farm asset maintenance.",
    basicEligibility: [
      "All farmers - individual/joint borrowers who are owner-cultivators.",
      "Tenant farmers, oral lessees, and sharecroppers.",
      "Self Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers, including animal husbandry and fisheries farmers."
    ],
    benefits: "Concessional short-term crop loans up to ₹3 Lakh at an effective interest rate of only 4% per annum (standard 7% interest rate minus 3% prompt repayment incentive). Collateral-free limit up to ₹1.60 Lakh.",
    officialSource: "Reserve Bank of India (RBI) & NABARD",
    officialPortalUrl: "https://www.nabard.org",
    howToApply: [
      "Visit any public/private commercial bank branch, Regional Rural Bank (RRB), or Primary Agricultural Cooperative Society (PACS).",
      "Fill the simple 1-page KCC application form with land records (Pattadar passbook) and Aadhaar/PAN.",
      "Banks issue a RuPay KCC card for easy ATM withdrawal and purchase of seeds/fertilizers at retail POS."
    ],
    applicableStates: ["All India"],
    applicableCategories: ["Small/Marginal", "Women", "SC/ST", "General"],
    applicableActivities: ["Financial Support", "Crop Inputs"]
  },
  {
    id: "smam-mechanization",
    name: "Sub-Mission on Agricultural Mechanization (SMAM)",
    shortCode: "SMAM",
    purpose: "Subsidizes purchase of modern farm machinery (tractors, power tillers, rotavators, sprayers, harvesters, seed drills) to overcome labor shortage and improve timeliness of field operations.",
    basicEligibility: [
      "Individual farmers, Custom Hiring Centres (CHCs), and Farmer Producer Organizations (FPOs).",
      "Preference given to small and marginal farmers, women, and SC/ST farmers."
    ],
    benefits: "Subsidy ranging from 40% to 50% for individual farmers (up to ₹1.25 Lakh to ₹2.5 Lakh depending on implement type). Up to 40-80% subsidy for setting up village-level Custom Hiring Centres.",
    officialSource: "Ministry of Agriculture & Farmers Welfare, GoI",
    officialPortalUrl: "https://agrimachinery.nic.in",
    howToApply: [
      "Register online on agrimachinery.nic.in using Aadhaar and mobile number.",
      "Select desired machinery implement and authorized dealer.",
      "Department verifies documents and releases subsidy directly to bank account via DBT post-purchase verification."
    ],
    applicableStates: ["All India"],
    applicableCategories: ["Small/Marginal", "Women", "SC/ST", "General"],
    applicableActivities: ["Equipment & Mechanization"]
  },
  {
    id: "pm-kusum-solar",
    name: "Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM)",
    shortCode: "PM-KUSUM",
    purpose: "Promotes installation of standalone solar-powered agriculture pumps and solarization of existing grid-connected agriculture pumps to ensure daylight irrigation and zero diesel/electricity cost.",
    basicEligibility: [
      "Individual farmers, groups of farmers, Water User Associations, and Cooperatives.",
      "Component B: Standalone off-grid solar pumps in un-electrified areas. Component C: Solarization of existing grid pumps."
    ],
    benefits: "Substantial subsidy: Central Govt provides 30%, State Govt provides 30%, Bank loan covers up to 30%, farmer pays only 10% of the benchmark pump cost. Generates daytime reliable green energy.",
    officialSource: "Ministry of New and Renewable Energy (MNRE)",
    officialPortalUrl: "https://pmkusum.mnre.gov.in",
    howToApply: [
      "Apply through your State Nodal Renewable Energy Agency (e.g., NREDCAP in AP, REDCO in Telangana, MEDA in Maharashtra).",
      "Beware of fake websites! Always apply strictly through the official state portal linked on pmkusum.mnre.gov.in.",
      "Submit land title, borewell yield test report, and Aadhaar."
    ],
    applicableStates: ["All India"],
    applicableCategories: ["Small/Marginal", "Women", "SC/ST", "General"],
    applicableActivities: ["Solar Pumps & Energy", "Irrigation"]
  },
  {
    id: "pkvy-organic",
    name: "Paramparagat Krishi Vikas Yojana (PKVY)",
    shortCode: "PKVY",
    purpose: "Promotes organic farming through a cluster approach and Participatory Guarantee System (PGS) certification, eliminating toxic chemicals and developing local organic value chains.",
    basicEligibility: [
      "Farmers forming a cluster of 50 or more farmers covering 50 acres of contiguous land.",
      "Individual farmers adopting natural farming or zero budget natural farming."
    ],
    benefits: "Financial assistance of ₹50,000 per hectare over 3 years: ₹31,000/ha provided directly through DBT for organic inputs (bio-fertilizers, vermicompost, botanical extracts) and ₹19,000/ha for training and PGS organic certification.",
    officialSource: "Department of Agriculture and Farmers Welfare (DA&FW)",
    officialPortalUrl: "https://pgsindia-ncof.gov.in",
    howToApply: [
      "Contact your nearest District Agriculture Office or Krishi Vigyan Kendra (KVK).",
      "Form a farmer group / organic cluster with neighboring farmers.",
      "Register the cluster on the PGS-India portal for organic conversion monitoring."
    ],
    applicableStates: ["All India"],
    applicableCategories: ["Small/Marginal", "Women", "SC/ST", "General"],
    applicableActivities: ["Organic Farming", "Bio-inputs"]
  }
];
