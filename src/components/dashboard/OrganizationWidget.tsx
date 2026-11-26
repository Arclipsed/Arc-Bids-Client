"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Check,
  ExternalLink,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Star,
  Trash2,
} from "lucide-react";
import { GlowCard, GlowCardHeader } from "@/components/ui/glow-bento-card";
import { IconButton } from "@/components/ui/icon-button";
import { Dialog } from "@/components/ui/dialog";
import {
  AddressForm,
  EMPTY_ADDRESS,
  type AddressValue,
} from "@/components/forms/AddressForm";
import { ContactForm, type ContactValue } from "@/components/forms/ContactForm";
import type { ITranslation } from "@/translations/ITranslation";
import { EN } from "@/translations/en/en";

export interface OrganizationProfile {
  name: string;
  slug: string;
  contactEmail: string;
  phone: string;
  website: string;
  vatNumber: string;
  description: string;
}

export interface OrganizationAddressRow {
  id: bigint;
  orgId: bigint;
  label: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
}

export interface OrganizationAddressInput {
  label: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
}

interface OrganizationWidgetProps {
  org: OrganizationProfile;
  addresses: OrganizationAddressRow[];
  onSave: (next: OrganizationProfile) => void;
  onAddAddress: (addr: OrganizationAddressInput) => void;
  onUpdateAddress: (addressId: bigint, addr: OrganizationAddressInput) => void;
  onDeleteAddress: (addressId: bigint) => void;
  copy?: ITranslation["DashboardPage"]["Copy"];
  className?: string;
}

export function OrganizationWidget({
  org,
  addresses,
  onSave,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
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

  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<bigint | null>(null);
  const [draftLabel, setDraftLabel] = useState("");
  const [draftAddress, setDraftAddress] = useState<AddressValue>(EMPTY_ADDRESS);
  const [draftIsPrimary, setDraftIsPrimary] = useState(false);

  const sortedAddresses = [...addresses].sort((a, b) => {
    if (a.isPrimary !== b.isPrimary) return a.isPrimary ? -1 : 1;
    return a.id < b.id ? -1 : 1;
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
    });
    setEditing(false);
  };

  const openAddAddress = () => {
    setEditingAddressId(null);
    setDraftLabel("");
    setDraftAddress(EMPTY_ADDRESS);
    setDraftIsPrimary(addresses.length === 0);
    setAddressDialogOpen(true);
  };

  const openEditAddress = (addr: OrganizationAddressRow) => {
    setEditingAddressId(addr.id);
    setDraftLabel(addr.label);
    setDraftAddress({
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2,
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      country: addr.country,
    });
    setDraftIsPrimary(addr.isPrimary);
    setAddressDialogOpen(true);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: OrganizationAddressInput = {
      label: draftLabel.trim() || "Location",
      addressLine1: draftAddress.addressLine1.trim(),
      addressLine2: draftAddress.addressLine2.trim(),
      city: draftAddress.city.trim(),
      state: draftAddress.state.trim(),
      postalCode: draftAddress.postalCode.trim(),
      country: draftAddress.country.trim(),
      isPrimary: draftIsPrimary,
    };
    if (!payload.addressLine1 && !payload.city && !payload.country) return;

    if (editingAddressId !== null) {
      onUpdateAddress(editingAddressId, payload);
    } else {
      onAddAddress(payload);
    }
    setAddressDialogOpen(false);
  };

  return (
    <>
      <GlowCard accent="teal" className={className}>
        <GlowCardHeader
          title={copy.OrganizationTitle}
          icon={<Building2 className="h-4 w-4" />}
          right={
            <div className="flex items-center gap-1.5">
              <IconButton
                variant="subtle"
                size="sm"
                onClick={openAddAddress}
                aria-label="Add address"
                title="Add address"
                className="h-8 w-8"
              >
                <Plus className="h-3.5 w-3.5" />
              </IconButton>
              <IconButton
                variant="subtle"
                size="sm"
                onClick={startEdit}
                aria-label={copy.EditOrganizationTitle}
                title={copy.EditOrganizationTitle}
                className="h-8 w-8"
              >
                <Pencil className="h-3.5 w-3.5" />
              </IconButton>
            </div>
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

          {(org.contactEmail || org.phone || org.vatNumber) && (
            <div className="mt-3 flex flex-wrap gap-2">
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

          {sortedAddresses.length > 0 && (
            <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-3">
              {sortedAddresses.map((addr) => {
                const line = [
                  addr.addressLine1,
                  addr.addressLine2,
                  [addr.postalCode, addr.city].filter(Boolean).join(" "),
                  addr.state,
                  addr.country,
                ]
                  .filter(Boolean)
                  .join(", ");

                return (
                  <div
                    key={addr.id.toString()}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#0e1420]/70 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[#3ff2e0]" />
                        <span className="text-xs font-semibold text-white">
                          {addr.label}
                        </span>
                        {addr.isPrimary && (
                          <span className="inline-flex items-center gap-0.5 rounded-full border border-[#3ff2e0]/25 bg-[#3ff2e0]/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-[#3ff2e0]">
                            <Star className="h-2.5 w-2.5" />
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-zinc-400">
                        {line}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <IconButton
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditAddress(addr)}
                        aria-label={`Edit ${addr.label}`}
                        className="h-7 w-7"
                      >
                        <Pencil className="h-3 w-3" />
                      </IconButton>
                      <IconButton
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteAddress(addr.id)}
                        aria-label={`Delete ${addr.label}`}
                        className="h-7 w-7 enabled:hover:text-rose-400"
                      >
                        <Trash2 className="h-3 w-3" />
                      </IconButton>
                    </div>
                  </div>
                );
              })}
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

      <Dialog
        open={addressDialogOpen}
        onClose={() => setAddressDialogOpen(false)}
        title={editingAddressId !== null ? "Edit Address" : "Add Address"}
        description="Add warehouse, headquarters, or pickup locations for your organization."
      >
        <form onSubmit={handleAddressSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-medium text-zinc-400">
              Label
            </label>
            <input
              type="text"
              autoFocus
              value={draftLabel}
              onChange={(e) => setDraftLabel(e.target.value)}
              placeholder="Headquarters, Warehouse, Pickup…"
              className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
            />
          </div>

          <AddressForm value={draftAddress} onChange={setDraftAddress} />

          <label className="flex cursor-pointer items-center gap-2 text-xs text-zinc-300">
            <input
              type="checkbox"
              checked={draftIsPrimary}
              onChange={(e) => setDraftIsPrimary(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-white/20 bg-[#0e1420] accent-[#3ff2e0]"
            />
            Set as primary address
          </label>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setAddressDialogOpen(false)}
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
