"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-gold/30 bg-gold/10 px-6 py-8 text-center"
      >
        <p className="text-white/90">{t("success")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-gold underline-offset-4 hover:underline"
        >
          {t("submit")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm text-white/70">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-gold/50 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm text-white/70">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          spellCheck={false}
          placeholder={t("emailPlaceholder")}
          className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-gold/50 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-white/70">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder={t("messagePlaceholder")}
          className="w-full resize-y rounded-md border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-gold/50 focus:outline-none"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {t("error")}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="min-h-11 w-full rounded-md bg-gold px-6 py-3 text-sm font-medium tracking-wide text-black transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
