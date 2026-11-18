"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Check, ExternalLink, Mail, MapPin, Pencil, Phone } from "lucide-react";
import { GlowCard, GlowCardHeader } from "@/components/ui/glow-bento-card";
import { IconButton } from "@/components/ui/icon-button";
import { Dialog } from "@/components/ui/dialog";
import { AddressForm, type AddressValue } from "@/components/forms/AddressForm";
import { ContactForm, type ContactValue } from "@/components/forms/ContactForm";
import type { ITranslation } from "@/translations/ITranslation";
import { EN } from "@/translations/en/en";

export interface OrganizationProfile {
  name: string;
  slug: string;
  contactEmail: string;
  phone: string;
  website: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  vatNumber: string;
  description: string;
}

interface OrganizationWidgetProps {
  org: OrganizationProfile;
  onSave: (next: OrganizationProfile) => void;
  copy?: ITranslation["DashboardPage"]["Copy"];
  className?: string;
}

export function OrganizationWidget({
  org,
  onSave,
  copy = EN.DashboardPage.Copy,
  className,
}: OrganizationWidgetProps) {
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(org.name);
  const [draftSlug, setDraftSlug] = useState(org.slug);
  const [draftVat, setDraftVat] = useState(org.vatNumber);
  const [draftDesc, setDraftDesc] = useState(org.description);
  const [draftContact, setDraftContact] = useState<ContactValue>({
    contactEmail: org.contactEmail,
    phone: org.phone,
    website: org.website,
  });
  const [draftAddress, setDraftAddress] = useState<AddressValue>({
    addressLine1: org.addressLine1,
    addressLine2: org.addressLine2,
    city: org.city,
    state: org.state,
    postalCode: org.postalCode,
    country: org.country,
  });

  const startEdit = () => {
    setDraftName(org.name);
    setDraftSlug(org.slug);
    setDraftVat(org.vatNumber);
    setDraftDesc(org.description);
    setDraftContact({
      contactEmail: org.contactEmail,
      phone: org.phone,
      website: org.website,
    });
    setDraftAddress({
      addressLine1: org.addressLine1,
      addressLine2: org.addressLine2,
      city: org.city,
      state: org.state,
      postalCode: org.postalCode,
      country: org.country,
    });
    setEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftName.trim()) return;
    const cleanSlug =
      (draftSlug.trim() || draftName.trim())
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-|-$/g, "") || org.slug;
    onSave({
      name: draftName.trim(),
      slug: cleanSlug,
      vatNumber: draftVat.trim(),
      description: draftDesc.trim(),
      contactEmail: draftContact.contactEmail.trim(),
      phone: draftContact.phone.trim(),
      website: draftContact.website.trim(),
      addressLine1: draftAddress.addressLine1.trim(),
      addressLine2: draftAddress.addressLine2.trim(),
      city: draftAddress.city.trim(),
      state: draftAddress.state.trim(),
      postalCode: draftAddress.postalCode.trim(),
      country: draftAddress.country.trim(),
    });
    setEditing(false);
  };

  const locationSummary = [org.city, org.country].filter(Boolean).join(", ");

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
          <p className="text-xl font-bold tracking-tight text-white">{org.name}</p>
          <Link
            href={`/${org.slug}`}
            className="mt-1 inline-flex items-center gap-1 font-mono text-xs text-zinc-400 transition hover:text-[#3ff2e0]"
          >
            arcbids.com/{org.slug}
            <ExternalLink className="h-3 w-3" />
          </Link>

          {(locationSummary || org.contactEmail || org.phone || org.vatNumber) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {locationSummary && (
                <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-zinc-300">
                  <MapPin className="h-3 w-3 text-[#3ff2e0]" />
                  {locationSummary}
                </span>
              )}
              {org.contactEmail && (
                <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-zinc-300">
                  <Mail className="h-3 w-3 text-[#3ff2e0]" />
                  {org.contactEmail}
                </span>
              )}
              {org.phone && (
                <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">
                  <Phone className="h-3 w-3 text-[#3ff2e0]" />
                  {org.phone}
                </span>
              )}
              {org.vatNumber && (
                <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">
                  VAT {org.vatNumber}
                </span>
              )}
            </div>
          )}
        </div>
      </GlowCard>

      <Dialog
        open={editing}
        onClose={() => setEditing(false)}
        title={copy.EditOrganizationTitle}
        description={copy.EditOrganizationDesc}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
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
                className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 text-xs text-white outline-none focus:border-[#3ff2e0]"
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
                className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 font-mono text-xs text-white outline-none focus:border-[#3ff2e0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <div>
              <label className="text-[11px] font-medium text-zinc-400">
                VAT / Tax ID (optional)
              </label>
              <input
                type="text"
                value={draftVat}
                onChange={(e) => setDraftVat(e.target.value)}
                placeholder="DE123456789"
                className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 font-mono text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-zinc-400">
                Short Bio / Tagline (optional)
              </label>
              <input
                type="text"
                value={draftDesc}
                onChange={(e) => setDraftDesc(e.target.value)}
                placeholder="Wholesale fleet & electronics desk"
                className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
              />
            </div>
          </div>

          <ContactForm value={draftContact} onChange={setDraftContact} />
          <AddressForm value={draftAddress} onChange={setDraftAddress} />

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
