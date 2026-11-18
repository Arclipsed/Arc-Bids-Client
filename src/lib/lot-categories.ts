export type LotCategory = "General" | "Car";

export const LOT_CATEGORIES: { value: LotCategory; label: string; description: string }[] = [
  {
    value: "General",
    label: "General",
    description: "Standard lot with title, description, quantity, and photos",
  },
  {
    value: "Car",
    label: "Car / Vehicle",
    description: "Expanded vehicle specs (make, model, year, mileage, VIN, condition)",
  },
];

export const CAR_MAKES_AND_MODELS: Record<string, string[]> = {
  Audi: ["A3", "A4", "A5", "A6", "A8", "Q3", "Q5", "Q7", "Q8", "e-tron", "RS6", "TT", "Other"],
  BMW: ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "i4", "iX", "M3", "M4", "Other"],
  Ford: ["Fiesta", "Focus", "Mustang", "Kuga", "Puma", "Explorer", "Ranger", "Transit", "F-150", "Mustang Mach-E", "Other"],
  Honda: ["Civic", "Accord", "CR-V", "HR-V", "Jazz", "Pilot", "e:Ny1", "Other"],
  Hyundai: ["i10", "i20", "i30", "Elantra", "Tucson", "Santa Fe", "Kona", "Ioniq 5", "Ioniq 6", "Other"],
  Kia: ["Picanto", "Rio", "Ceed", "Sportage", "Sorento", "Niro", "EV6", "EV9", "Other"],
  "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Sport", "Range Rover Evoque", "Velar", "Other"],
  Lexus: ["CT", "IS", "ES", "NX", "RX", "UX", "RZ", "Other"],
  Mazda: ["Mazda2", "Mazda3", "Mazda6", "CX-3", "CX-30", "CX-5", "CX-60", "MX-5", "Other"],
  "Mercedes-Benz": ["A-Class", "B-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLB", "GLC", "GLE", "GLS", "EQA", "EQC", "EQE", "Sprinter", "Vito", "Other"],
  Nissan: ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf", "Ariya", "Navara", "GT-R", "Other"],
  Opel: ["Corsa", "Astra", "Insignia", "Mokka", "Crossland", "Grandland", "Vivaro", "Other"],
  Peugeot: ["208", "308", "408", "508", "2008", "3008", "5008", "Partner", "Other"],
  Porsche: ["911", "718 Cayman", "718 Boxster", "Panamera", "Macan", "Cayenne", "Taycan", "Other"],
  Renault: ["Clio", "Megane", "Captur", "Austral", "Arkana", "Kangoo", "Trafic", "Other"],
  Skoda: ["Fabia", "Scala", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Enyaq", "Other"],
  Tesla: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck", "Other"],
  Toyota: ["Yaris", "Corolla", "Camry", "C-HR", "RAV4", "Highlander", "Land Cruiser", "Hilux", "bZ4X", "Proace", "Other"],
  Volkswagen: ["Polo", "Golf", "Passat", "Arteon", "T-Cross", "T-Roc", "Tiguan", "Touareg", "ID.3", "ID.4", "ID.7", "Transporter", "Caddy", "Other"],
  Volvo: ["XC40", "XC60", "XC90", "S60", "S90", "V60", "V90", "EX30", "EX90", "Other"],
  Other: ["Other"],
};

export const CAR_FUEL_TYPES = [
  "Petrol",
  "Diesel",
  "Hybrid",
  "Plug-in Hybrid",
  "Electric",
  "LPG / CNG",
  "Other",
] as const;

export const CAR_TRANSMISSIONS = [
  "Automatic",
  "Manual",
  "Semi-Automatic",
  "Single-Speed (EV)",
] as const;

export const CAR_BODY_TYPES = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Wagon",
  "Coupe",
  "Convertible",
  "Van / Commercial",
  "Pickup",
  "Other",
] as const;

export const CAR_CONDITIONS = [
  "Grade A · Excellent / Clean",
  "Grade B · Good / Minor Wear",
  "Grade C · Fair / Visible Wear",
  "Grade D · Needs Repair",
  "Salvage / Non-Runner",
] as const;

export const CAR_SERVICE_HISTORIES = [
  "Full Service History",
  "Partial Service History",
  "No Service History",
] as const;

export interface CarMetadata {
  make?: string;
  model?: string;
  customModel?: string;
  year?: string;
  mileage?: string;
  mileageUnit?: "km" | "mi";
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  color?: string;
  vin?: string;
  condition?: string;
  location?: string;
  serviceHistory?: string;
}

export function normalizeCategory(category?: string | null): LotCategory {
  return category === "Car" ? "Car" : "General";
}

export function parseLotMetadata(
  category?: string | null,
  metadataJson?: string | null
): CarMetadata | null {
  if (normalizeCategory(category) !== "Car" || !metadataJson?.trim()) {
    return null;
  }
  try {
    const parsed = JSON.parse(metadataJson) as CarMetadata;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function serializeLotMetadata(
  category: LotCategory,
  carMeta: CarMetadata
): string {
  if (category !== "Car") return "";
  const cleaned: CarMetadata = {};
  for (const [key, val] of Object.entries(carMeta)) {
    if (typeof val === "string" && val.trim()) {
      (cleaned as Record<string, string>)[key] = val.trim();
    }
  }
  return Object.keys(cleaned).length > 0 ? JSON.stringify(cleaned) : "";
}

export function getResolvedCarModel(meta: CarMetadata): string {
  if (meta.model === "Other" && meta.customModel?.trim()) {
    return meta.customModel.trim();
  }
  return meta.model?.trim() || "";
}

export function getCarHighlights(meta: CarMetadata): string[] {
  const highlights: string[] = [];
  if (meta.year) highlights.push(meta.year);
  if (meta.mileage) {
    const num = Number(meta.mileage.replace(/[^0-9]/g, ""));
    const formatted = Number.isFinite(num) && num > 0
      ? num.toLocaleString("en-US")
      : meta.mileage;
    highlights.push(`${formatted} ${meta.mileageUnit || "km"}`);
  }
  if (meta.transmission) highlights.push(meta.transmission);
  if (meta.fuelType) highlights.push(meta.fuelType);
  return highlights;
}

export function getCarSpecRows(meta: CarMetadata): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  const model = getResolvedCarModel(meta);

  if (meta.make) rows.push({ label: "Make", value: meta.make });
  if (model) rows.push({ label: "Model", value: model });
  if (meta.year) rows.push({ label: "Year", value: meta.year });
  if (meta.mileage) {
    const num = Number(meta.mileage.replace(/[^0-9]/g, ""));
    const formatted = Number.isFinite(num) && num > 0
      ? num.toLocaleString("en-US")
      : meta.mileage;
    rows.push({ label: "Mileage", value: `${formatted} ${meta.mileageUnit || "km"}` });
  }
  if (meta.fuelType) rows.push({ label: "Fuel Type", value: meta.fuelType });
  if (meta.transmission) rows.push({ label: "Transmission", value: meta.transmission });
  if (meta.bodyType) rows.push({ label: "Body Type", value: meta.bodyType });
  if (meta.color) rows.push({ label: "Color", value: meta.color });
  if (meta.condition) rows.push({ label: "Condition", value: meta.condition });
  if (meta.serviceHistory) rows.push({ label: "Service History", value: meta.serviceHistory });
  if (meta.location) rows.push({ label: "Location", value: meta.location });
  if (meta.vin) rows.push({ label: "VIN / Chassis", value: meta.vin });

  return rows;
}
