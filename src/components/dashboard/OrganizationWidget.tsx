"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Check, ExternalLink, Pencil } from "lucide-react";
import { GlowCard, GlowCardHeader } from "@/components/ui/glow-bento-card";
import { IconButton } from "@/components/ui/icon-button";
import { Dialog } from "@/components/ui/dialog";
import type { ITranslation } from "@/translations/ITranslation";
import { EN } from "@/translations/en/en";

interface OrganizationWidgetProps {
  name: string;
  slug: string;
  onSave: (name: string, slug: string) => void;
  copy?: ITranslation["DashboardPage"]["Copy"];
  className?: string;
}

export function OrganizationWidget({
  name,
  slug,
  onSave,
  copy = EN.DashboardPage.Copy,
  className,
}: OrganizationWidgetProps) {
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const [draftSlug, setDraftSlug] = useState(slug);

  const startEdit = () => {
    setDraftName(name);
    setDraftSlug(slug);
    setEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftName.trim()) return;
    const cleanSlug =
      (draftSlug.trim() || draftName.trim())
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-|-$/g, "") || slug;
    onSave(draftName.trim(), cleanSlug);
    setEditing(false);
  };

  return (
    <>
      <GlowCard accent="teal" className={className}>
        <GlowCardHeader
          title={copy.OrganizationTitle}
          icon={<Building2 className="h-4 w-4" />}
          right={
            <IconButton
              variant="subtle"
              size="sm"
              onClick={startEdit}
              aria-label={copy.EditOrganizationTitle}
              className="h-8 w-8"
            >
              <Pencil className="h-3.5 w-3.5" />
            </IconButton>
          }
        />

        <div>
          <p className="text-xl font-bold tracking-tight text-white">{name}</p>
          <Link
            href={`/${slug}`}
            className="mt-1 inline-flex items-center gap-1 font-mono text-xs text-zinc-400 transition hover:text-[#3ff2e0]"
          >
            arcbids.com/{slug}
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </GlowCard>

      <Dialog
        open={editing}
        onClose={() => setEditing(false)}
        title={copy.EditOrganizationTitle}
        description={copy.EditOrganizationDesc}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-medium text-zinc-400">
                {copy.OrganizationNameLabel}
              </label>
              <input
                type="text"
                required
                autoFocus
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 text-sm text-white outline-none focus:border-[#3ff2e0]"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-400">
                {copy.SlugLabel}
              </label>
              <input
                type="text"
                required
                value={draftSlug}
                onChange={(e) => setDraftSlug(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 font-mono text-xs text-white outline-none focus:border-[#3ff2e0]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.08]"
            >
              {copy.Cancel}
            </button>
            <button
              type="submit"
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#e4fffb] px-5 text-xs font-semibold text-[#04070b] transition hover:bg-white"
            >
              <Check className="h-3.5 w-3.5" />
              {copy.SaveChanges}
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
