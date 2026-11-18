"use client";

export interface AddressValue {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export const EMPTY_ADDRESS: AddressValue = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

interface AddressFormProps {
  value: AddressValue;
  onChange: (next: AddressValue) => void;
  title?: string;
}

export function AddressForm({
  value,
  onChange,
  title = "Address",
}: AddressFormProps) {
  const update = (patch: Partial<AddressValue>) => {
    onChange({ ...value, ...patch });
  };

  return (
    <div className="space-y-3 rounded-2xl border border-white/[0.08] bg-[#0e1420]/50 p-3.5">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3ff2e0]">
        {title}
      </p>

      <div>
        <label className="text-[11px] font-medium text-zinc-400">
          Street Address
        </label>
        <input
          type="text"
          value={value.addressLine1}
          onChange={(e) => update({ addressLine1: e.target.value })}
          placeholder="123 Industrial Way"
          className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#090d14] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
        />
      </div>

      <div>
        <label className="text-[11px] font-medium text-zinc-400">
          Suite / Unit / Building (optional)
        </label>
        <input
          type="text"
          value={value.addressLine2}
          onChange={(e) => update({ addressLine2: e.target.value })}
          placeholder="Suite 400"
          className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#090d14] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
        />
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div>
          <label className="text-[11px] font-medium text-zinc-400">City</label>
          <input
            type="text"
            value={value.city}
            onChange={(e) => update({ city: e.target.value })}
            placeholder="Munich"
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#090d14] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
          />
        </div>
        <div>
          <label className="text-[11px] font-medium text-zinc-400">
            State / Region
          </label>
          <input
            type="text"
            value={value.state}
            onChange={(e) => update({ state: e.target.value })}
            placeholder="Bavaria"
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#090d14] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div>
          <label className="text-[11px] font-medium text-zinc-400">
            Postal / ZIP Code
          </label>
          <input
            type="text"
            value={value.postalCode}
            onChange={(e) => update({ postalCode: e.target.value })}
            placeholder="80331"
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#090d14] px-3 font-mono text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
          />
        </div>
        <div>
          <label className="text-[11px] font-medium text-zinc-400">
            Country
          </label>
          <input
            type="text"
            value={value.country}
            onChange={(e) => update({ country: e.target.value })}
            placeholder="Germany"
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#090d14] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
          />
        </div>
      </div>
    </div>
  );
}
