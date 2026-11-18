"use client";

export interface ContactValue {
  contactEmail: string;
  phone: string;
  website: string;
}

export const EMPTY_CONTACT: ContactValue = {
  contactEmail: "",
  phone: "",
  website: "",
};

interface ContactFormProps {
  value: ContactValue;
  onChange: (next: ContactValue) => void;
  title?: string;
  showWebsite?: boolean;
}

export function ContactForm({
  value,
  onChange,
  title = "Contact Information",
  showWebsite = true,
}: ContactFormProps) {
  const update = (patch: Partial<ContactValue>) => {
    onChange({ ...value, ...patch });
  };

  return (
    <div className="space-y-3 rounded-2xl border border-white/[0.08] bg-[#0e1420]/50 p-3.5">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3ff2e0]">
        {title}
      </p>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div>
          <label className="text-[11px] font-medium text-zinc-400">
            Contact Email
          </label>
          <input
            type="email"
            value={value.contactEmail}
            onChange={(e) => update({ contactEmail: e.target.value })}
            placeholder="desk@company.com"
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#090d14] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
          />
        </div>
        <div>
          <label className="text-[11px] font-medium text-zinc-400">
            Phone Number
          </label>
          <input
            type="tel"
            value={value.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="+49 89 1234 5678"
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#090d14] px-3 font-mono text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
          />
        </div>
      </div>

      {showWebsite && (
        <div>
          <label className="text-[11px] font-medium text-zinc-400">
            Website (optional)
          </label>
          <input
            type="url"
            value={value.website}
            onChange={(e) => update({ website: e.target.value })}
            placeholder="https://company.com"
            className="mt-1 h-9 w-full rounded-xl border border-white/10 bg-[#090d14] px-3 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-[#3ff2e0]"
          />
        </div>
      )}
    </div>
  );
}
