"use client";

import { useState } from "react";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein").optional(),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

/**
 * Newsletter Subscription Form
 * Implements double-opt-in flow for GDPR compliance
 */
export default function NewsletterForm() {
  const [formData, setFormData] = useState<NewsletterFormData>({
    email: "",
    name: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      // Validate form data
      const validated = newsletterSchema.parse(formData);

      // Send to API
      const response = await fetch("/api/newsletter/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validated),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ein Fehler ist aufgetreten");
      }

      setStatus("success");
      setMessage(
        "Bestätigungsmail gesendet! Bitte überprüfe dein Postfach und klicke auf den Bestätigungslink."
      );
      setFormData({ email: "", name: "" });
    } catch (error) {
      setStatus("error");
      if (error instanceof z.ZodError) {
        setMessage(error.issues[0].message);
      } else if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Ein unerwarteter Fehler ist aufgetreten");
      }
    }
  };

  return (
    <div className="bg-background border border-foreground/10 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">📬 Newsletter</h3>
      <p className="text-sm text-foreground/70 mb-4">
        Bleibe auf dem Laufenden über neue Templates und Updates. Jederzeit
        abbestellbar.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="newsletter-name" className="block text-sm mb-1">
            Name (optional)
          </label>
          <input
            id="newsletter-name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Max Mustermann"
            className="w-full px-4 py-2 border border-foreground/20 rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={status === "loading"}
          />
        </div>

        <div>
          <label htmlFor="newsletter-email" className="block text-sm mb-1">
            E-Mail-Adresse *
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="deine@email.de"
            className="w-full px-4 py-2 border border-foreground/20 rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={status === "loading"}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Wird gesendet..." : "Jetzt anmelden"}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 p-3 rounded text-sm ${
            status === "success"
              ? "bg-green-500/10 text-green-500 border border-green-500/20"
              : "bg-red-500/10 text-red-500 border border-red-500/20"
          }`}
        >
          {message}
        </div>
      )}

      <p className="text-xs text-foreground/50 mt-4">
        Mit der Anmeldung akzeptierst du unsere{" "}
        <a href="/recht/datenschutz" className="underline hover:text-primary">
          Datenschutzerklärung
        </a>
        .
      </p>
    </div>
  );
}
