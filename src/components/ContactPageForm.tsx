"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Send } from "lucide-react";

interface ContactCopy {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  topicLabel: string;
  topics: readonly string[];
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  successTitle: string;
  successDesc: string;
  sendAnother: string;
}

export function ContactPageForm({ copy }: { copy: ContactCopy }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState(copy.topics[0] ?? "General Inquiry");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          topic,
          message,
          website,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Failed to send message.");
        return;
      }
      setSent(true);
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-3xl border border-[#3ff2e0]/25 bg-[#090d14] p-8 text-center">
        <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#3ff2e0]/30 bg-[#3ff2e0]/10 text-[#3ff2e0]">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-white">{copy.successTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          {copy.successDesc}
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 inline-flex h-10 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-5 text-xs font-semibold text-white transition hover:bg-white/[0.1]"
        >
          {copy.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-white/[0.07] bg-[#090d14] p-6 sm:p-8"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-zinc-300">
            {copy.nameLabel}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={copy.namePlaceholder}
            className="mt-1.5 h-10 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-[#3ff2e0]"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-300">
            {copy.emailLabel}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={copy.emailPlaceholder}
            className="mt-1.5 h-10 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-[#3ff2e0]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-zinc-300">
            {copy.companyLabel}
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={copy.companyPlaceholder}
            className="mt-1.5 h-10 w-full rounded-xl border border-white/10 bg-[#0e1420] px-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-[#3ff2e0]"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-300">
            {copy.topicLabel}
          </label>
          <div className="relative mt-1.5">
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-[#0e1420] pl-3.5 pr-9 text-sm text-white outline-none transition focus:border-[#3ff2e0]"
            >
              {copy.topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-zinc-300">
          {copy.messageLabel}
        </label>
        <textarea
          required
          rows={5}
          minLength={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={copy.messagePlaceholder}
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0e1420] p-3.5 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-[#3ff2e0]"
        />
      </div>

      {error && <p className="text-xs font-medium text-rose-400">{error}</p>}

      <div className="flex justify-end pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e4fffb] px-6 text-sm font-semibold text-[#04070b] ring-1 ring-[#3ff2e0]/40 shadow-[0_0_24px_rgba(63,242,224,0.2)] transition enabled:hover:bg-white enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {submitting ? copy.sendingLabel : copy.submitLabel}
        </button>
      </div>
    </form>
  );
}
