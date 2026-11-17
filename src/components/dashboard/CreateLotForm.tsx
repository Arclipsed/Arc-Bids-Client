"use client";

import { useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import type { ITranslation } from "@/translations/ITranslation";
import { EN } from "@/translations/en/en";

export interface DraftLot {
  id?: bigint;
  title: string;
  description: string;
  startingPriceCents: bigint;
  quantity: number;
  images: string[];
}

interface CreateLotFormProps {
  currencySymbol: string;
  initialLot?: DraftLot;
  submitLabel?: string;
  copy?: ITranslation["DashboardPage"]["Copy"];
  onSubmit: (lot: DraftLot) => void;
  onCancel: () => void;
}

const MAX_DIMENSION = 1600;
const WEBP_QUALITY = 0.82;

async function compressImageForUpload(file: File): Promise<File> {
  if (file.type === "image/gif" || !file.type.startsWith("image/")) {
    return file;
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Failed to decode image."));
      el.src = objectUrl;
    });

    const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", WEBP_QUALITY)
    );
    if (!blob || blob.size >= file.size) {
      return file;
    }

    const baseName = file.name.replace(/\.[^.]+$/, "") || "lot";
    return new File([blob], `${baseName}.webp`, { type: "image/webp" });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function CreateLotForm({
  currencySymbol,
  initialLot,
  submitLabel,
  copy = EN.DashboardPage.Copy,
  onSubmit,
  onCancel,
}: CreateLotFormProps) {
  const [title, setTitle] = useState(initialLot?.title ?? "");
  const [description, setDescription] = useState(initialLot?.description ?? "");
  const [startingPrice, setStartingPrice] = useState(
    initialLot
      ? String(Number(initialLot.startingPriceCents) / 100)
      : "500"
  );
  const [quantity, setQuantity] = useState(
    initialLot ? String(initialLot.quantity || 1) : "1"
  );
  const [images, setImages] = useState<string[]>(initialLot?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFilesUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploadError(null);
    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of Array.from(fileList)) {
        const prepared = await compressImageForUpload(file);
        const body = new FormData();
        body.append("file", prepared);
        const res = await fetch("/api/upload", {
          method: "POST",
          body,
        });
        const data = (await res.json()) as { url?: string; error?: string };
        if (!res.ok || !data.url) {
          throw new Error(data.error || "Failed to upload image.");
        }
        uploadedUrls.push(data.url);
      }
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Failed to upload image."
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      id: initialLot?.id,
      title: title.trim(),
      description: description.trim(),
      startingPriceCents: BigInt(
        Math.max(100, Math.round((Number(startingPrice) || 500) * 100))
      ),
      quantity: Math.max(1, Math.floor(Number(quantity) || 1)),
      images,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-zinc-300">
            {copy.LotTitleLabel}
          </label>
          <input
            type="text"
            required
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="MacBook Air M2 Refurbished"
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-300">
            {copy.QuantityLabel}
          </label>
          <input
            type="number"
            min={1}
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 font-mono text-xs text-white outline-none focus:border-[#3ff2e0]"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-300">
            {copy.StartPriceLabel} ({currencySymbol})
          </label>
          <input
            type="number"
            min={1}
            required
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 font-mono text-xs text-white outline-none focus:border-[#3ff2e0]"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-zinc-300">
          {copy.DescriptionLabel}
        </label>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={copy.DescriptionPlaceholder}
          className="mt-1 w-full rounded-xl border border-white/10 bg-[#0e1420] p-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-zinc-300">
          {copy.LotImagesLabel}
        </label>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            void handleFilesUpload(e.dataTransfer.files);
          }}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`mt-1.5 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed px-4 py-5 text-center transition ${
            dragActive
              ? "border-[#3ff2e0] bg-[#3ff2e0]/10"
              : "border-white/15 bg-[#0e1420]/60 hover:border-white/25 hover:bg-[#0e1420]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            multiple
            className="hidden"
            onChange={(e) => void handleFilesUpload(e.target.files)}
          />
          {uploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-[#3ff2e0]" />
              <p className="text-xs font-medium text-zinc-300">
                {copy.UploadingPhotos}
              </p>
            </>
          ) : (
            <>
              <Upload className="h-5 w-5 text-[#3ff2e0]" />
              <p className="text-xs font-medium text-zinc-200">
                {copy.DropPhotos}
              </p>
              <p className="text-[11px] text-zinc-500">
                {copy.PhotoHint}
              </p>
            </>
          )}
        </div>

        {uploadError && (
          <p className="mt-1.5 text-xs font-medium text-rose-400">
            {uploadError}
          </p>
        )}

        {images.length > 0 && (
          <div className="mt-2.5 grid grid-cols-4 gap-2">
            {images.map((url, idx) => (
              <div
                key={`${url}-${idx}`}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-[#0e1420]"
              >
                <img
                  src={url}
                  alt={`Lot image ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  aria-label="Remove image"
                  className="absolute right-1.5 top-1.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black/75 text-zinc-200 opacity-0 transition group-hover:opacity-100 hover:bg-rose-500 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2.5 border-t border-white/[0.06] pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="h-9 cursor-pointer rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.08]"
        >
          {copy.Cancel}
        </button>
        <button
          type="submit"
          className="h-9 cursor-pointer rounded-full bg-[#e4fffb] px-5 text-xs font-semibold text-[#04070b] transition hover:bg-white"
        >
          {submitLabel ?? copy.AddLot}
        </button>
      </div>
    </form>
  );
}
