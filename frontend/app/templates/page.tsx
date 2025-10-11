import { Metadata } from "next";
import Container from "@/components/Container";
import TemplatesGrid from "@/components/TemplatesGrid";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Premium Next.js Templates – DSGVO-ready, modern und sofort einsatzbereit.",
};

export default function TemplatesPage() {
  return (
    <Container>
      <div className="py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unsere Templates
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Premium Next.js Templates für Landing Pages, SaaS-Produkte und
            Marketing-Websites – professionell, modern und DSGVO-konform.
          </p>
        </div>

        <TemplatesGrid />

        <div className="mt-16 p-8 bg-foreground/5 rounded-xl text-center">
          <h2 className="text-2xl font-semibold mb-3">
            Individuelles Template benötigt?
          </h2>
          <p className="text-foreground/70 mb-6">
            Wir entwickeln auch maßgeschneiderte Lösungen für dein Projekt.
          </p>
          <a
            href="/kontakt"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Jetzt Anfrage senden
          </a>
        </div>
      </div>
    </Container>
  );
}
