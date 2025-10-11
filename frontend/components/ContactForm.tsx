"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _topic: "", // Honeypot field
    consent: false,
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!formData.consent) {
      setStatus("error");
      setErrorMessage(
        "Bitte akzeptieren Sie die Datenschutzerklärung."
      );
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _topic: formData._topic,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ein Fehler ist aufgetreten");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
        _topic: "",
        consent: false,
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="_topic"
        value={formData._topic}
        onChange={(e) =>
          setFormData({ ...formData, _topic: e.target.value })
        }
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          required
          minLength={2}
          maxLength={80}
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          E-Mail *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Nachricht *
        </label>
        <textarea
          id="message"
          required
          minLength={5}
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
          disabled={status === "loading"}
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          checked={formData.consent}
          onChange={(e) =>
            setFormData({ ...formData, consent: e.target.checked })
          }
          className="mt-1"
          disabled={status === "loading"}
          required
        />
        <label htmlFor="consent" className="text-sm text-foreground/70">
          Ich habe die{" "}
          <a
            href="/recht/datenschutz"
            className="text-primary hover:underline"
            target="_blank"
          >
            Datenschutzerklärung
          </a>{" "}
          zur Kenntnis genommen. Ich stimme zu, dass meine Angaben zur
          Kontaktaufnahme und Zuordnung für eventuelle Rückfragen dauerhaft
          gespeichert werden. *
        </label>
      </div>

      {status === "success" && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <CheckCircle size={20} />
          <span>
            Vielen Dank! Ihre Nachricht wurde erfolgreich versendet.
          </span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <AlertCircle size={20} />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <span className="animate-spin">⏳</span>
            Wird gesendet...
          </>
        ) : (
          <>
            <Send size={20} />
            Nachricht senden
          </>
        )}
      </button>
    </form>
  );
}
