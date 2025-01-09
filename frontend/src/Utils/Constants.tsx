//export const URL = "portal.techfood.se/";
export const URL = "localhost/";
export const PROTOCOL = "http://";
//export const PROTOCOL = "https://";
//export const STORAGE = "backend/storage/app/public/";
export const STORAGE = "storage/";

export const API_VERSION = "v1/";
export const API = "api/";
export const BASE_URL = PROTOCOL + URL;
export const FRONT_END_BASE_URL = "localhost/";
export const PAGINATE_ITEM_COUNT = 50;
export const productIDs = {
  protein_lactose_water: {
    title_key: "protein_lactose_water",
    id: 1895,
    link: "https://techfood.se/produkt-kategori/affarssystem/",
  },
  deviation_complaints: {
    title_key: "heading_deviation_complaints",
    id: 1883,
    link: "https://techfood.se/produkt/digitalisering-och-uppfoljning-av-avvikelser-reklamation/",
  },
  fruit_production: {
    title_key: "fruit_production",
    id: 1835,
    link: "https://techfood.se/produkt-kategori/affarssystem/",
  },
  drill_samples: {
    title_key: "drill_samples_in_slaughter",
    id: 1899,
    link: "https://techfood.se/produkt/digitalisering-och-uppfoljning-av-borrprover-i-slakt/",
  },
  head_midriff: {
    title_key: "slaughtered_head_meat_midriff",
    id: 1771,
    link: "https://techfood.se/produkt-kategori/affarssystem/",
  },
  staffing_production: {
    title_key: "staffing_of_production",
    id: 1889,
    link: "https://techfood.se/produkt/digitalisering-och-uppfoljning-av-bemanning-av-produktion/",
  },
  ccp_followup: {
    title_key: "ccp_follow_up_title",
    id: 1881,
    link: "https://techfood.se/produkt/digitalisering-och-uppfoljning-av-ccp-uppfoljning/",
  },
  oee_and_efficiency: {
    title_key: "oee_and_efficiency_title",
    id: 1887,
    link: "https://techfood.se/produkt/digitalisering-och-uppfoljning-av-oee-och-verkningsgrad/",
  },
  daily_hygiene_rounds: {
    title_key: "daily_hygiene_rounds_title",
    id: 1885,
    link: "https://techfood.se/produkt/digitalisering-och-uppfoljning-av-dagliga-hygienronder/",
  },
  map_detected_bacteria: {
    title_key: "map_detected_bacteria_title",
    id: 1785,
    link: "https://techfood.se/produkt-kategori/affarssystem/",
  },
  followup_of_productivity: {
    title_key: "followup_of_productivity",
    id: 1891,
    link: "https://techfood.se/produkt/digitalisering-och-uppfoljning-av-produktivitet-inkl-underhallstimmar/",
  },
};
export const constant = {
  approvedText: "satisfactory",
  unApprovedText: "actions_required",
  proteinConstantLimit: 72.5,
  lactoseConstantLimit: 13.0,
  waterConstantLimit: 5.5,
  ecoliConstantLimit: 2,
  aerobicConstantLimit: 7,
  enterobactaConstantLimit: 2,
  staphylococcusConstantLimit: 2,
  staffProductionEfficiencyLimit: 4,
  staffProductionProductivityLimit: 25,
  staffProductionOutputLimit: 7000,
  OEEAvailabilityLimit: 70,
  OEEPerformanceLimit: 70,
  OEEQualityLimit: 80,
  OEEOverAllLimit: 50,
  productivityAverageRate: 104.8,
  productivityWeeklyRate: 0,
};

export const colors = [
  "#808000", // Olive
  "#008080", // Teal
  "#800080", // Purple
  "#FFA500", // Orange
  "#008000", // Green
  "#000080", // Navy
  "#FFC0CB", // Pink
  "#FFD700", // Gold
  "#A52A2A", // Brown
  "#5F9EA0", // Cadet Blue
  "#D2691E", // Chocolate
  "#9ACD32", // Yellow Green
  "#4682B4", // Steel Blue
  "#FF0000", // Red
  "#00FF00", // Lime
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#800000", // Maroon
];
