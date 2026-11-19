export type LotCategory = "General" | "Car" | "Electronics" | "Pallet";

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
  {
    value: "Electronics",
    label: "Electronics / ITAD",
    description: "Device specs (brand, model, storage, grading, packaging, location)",
  },
  {
    value: "Pallet",
    label: "Wholesale Pallet / Liquidation",
    description: "Pallet specs (type, manifest status, pallet count, condition, location)",
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

export interface ElectronicsMetadata {
  brand?: string;
  model?: string;
  storage?: string;
  grade?: string;
  packaging?: string;
  location?: string;
}

export interface PalletMetadata {
  palletType?: string;
  manifested?: string;
  palletCount?: string;
  condition?: string;
  location?: string;
}

export const ELECTRONICS_BRANDS = [
  "Apple",
  "Samsung",
  "Google",
  "Xiaomi",
  "Dell",
  "Lenovo",
  "HP",
  "Microsoft",
  "Sony",
  "Mixed / Other",
] as const;

export const ELECTRONICS_GRADES = [
  "New / Sealed",
  "Grade A · Like New",
  "Grade B · Light Wear",
  "Grade C · Visible Wear",
  "Refurbished",
  "Untested / As-Is",
] as const;

export const ELECTRONICS_PACKAGING = [
  "Original Box",
  "Bulk / Tray",
  "Mixed / Palletized",
] as const;

export const PALLET_TYPES = [
  "Overstock / New",
  "Customer Returns",
  "Shelf Pulls",
  "Mixed Liquidation",
  "Machinery / Industrial",
] as const;

export const PALLET_MANIFEST_OPTIONS = [
  "Manifested",
  "Unmanifested",
] as const;

export const PALLET_CONDITIONS = [
  "New / Sealed",
  "Tested Working",
  "Mixed Returns",
  "Salvage / Untested",
] as const;

export function normalizeCategory(category?: string | null): LotCategory {
  if (category === "Car") return "Car";
  if (category === "Electronics") return "Electronics";
  if (category === "Pallet") return "Pallet";
  return "General";
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

export function parseJsonMetadata<T extends object>(
  metadataJson?: string | null
): T | null {
  if (!metadataJson?.trim()) return null;
  try {
    const parsed = JSON.parse(metadataJson) as T;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function serializeCategoryMetadata(
  category: LotCategory,
  meta: Record<string, string | undefined>
): string {
  if (category === "General") return "";
  const cleaned: Record<string, string> = {};
  for (const [key, val] of Object.entries(meta)) {
    if (typeof val === "string" && val.trim()) {
      cleaned[key] = val.trim();
    }
  }
  return Object.keys(cleaned).length > 0 ? JSON.stringify(cleaned) : "";
}

export function getLotHighlights(
  category?: string | null,
  metadataJson?: string | null
): string[] {
  const cat = normalizeCategory(category);
  if (cat === "Car") {
    const meta = parseLotMetadata(category, metadataJson);
    return meta ? getCarHighlights(meta) : [];
  }
  if (cat === "Electronics") {
    const meta = parseJsonMetadata<ElectronicsMetadata>(metadataJson);
    if (!meta) return [];
    return [meta.brand, meta.storage, meta.grade].filter(
      (v): v is string => Boolean(v?.trim())
    );
  }
  if (cat === "Pallet") {
    const meta = parseJsonMetadata<PalletMetadata>(metadataJson);
    if (!meta) return [];
    const list: string[] = [];
    if (meta.palletType) list.push(meta.palletType);
    if (meta.manifested) list.push(meta.manifested);
    if (meta.palletCount) list.push(`${meta.palletCount} pallets`);
    return list;
  }
  return [];
}

export function getLotSpecRows(
  category?: string | null,
  metadataJson?: string | null
): { label: string; value: string }[] {
  const cat = normalizeCategory(category);
  if (cat === "Car") {
    const meta = parseLotMetadata(category, metadataJson);
    return meta ? getCarSpecRows(meta) : [];
  }
  if (cat === "Electronics") {
    const meta = parseJsonMetadata<ElectronicsMetadata>(metadataJson);
    if (!meta) return [];
    const rows: { label: string; value: string }[] = [];
    if (meta.brand) rows.push({ label: "Brand", value: meta.brand });
    if (meta.model) rows.push({ label: "Model", value: meta.model });
    if (meta.storage) rows.push({ label: "Storage / Spec", value: meta.storage });
    if (meta.grade) rows.push({ label: "Grade", value: meta.grade });
    if (meta.packaging) rows.push({ label: "Packaging", value: meta.packaging });
    if (meta.location) rows.push({ label: "Location", value: meta.location });
    return rows;
  }
  if (cat === "Pallet") {
    const meta = parseJsonMetadata<PalletMetadata>(metadataJson);
    if (!meta) return [];
    const rows: { label: string; value: string }[] = [];
    if (meta.palletType) rows.push({ label: "Pallet Type", value: meta.palletType });
    if (meta.manifested) rows.push({ label: "Manifest", value: meta.manifested });
    if (meta.palletCount) rows.push({ label: "Pallet Count", value: meta.palletCount });
    if (meta.condition) rows.push({ label: "Condition", value: meta.condition });
    if (meta.location) rows.push({ label: "Location", value: meta.location });
    return rows;
  }
  return [];
}
