"use client";

import { Zap, Shield, Code, Rocket, Users, HeartHandshake } from "lucide-react";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import CTA from "@/components/CTA";

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: "Blitzschnell",
      description:
        "Optimiert für Performance. Unsere Templates laden in Millisekunden.",
    },
    {
      icon: Shield,
      title: "DSGVO-ready",
      description:
        "Vollständig DSGVO-konform mit Impressum, Datenschutz und Cookie-Hinweisen.",
    },
    {
      icon: Code,
      title: "Modern Stack",
      description:
        "Next.js 15, TypeScript, Tailwind CSS – der beste Tech-Stack für moderne Webanwendungen.",
    },
    {
      icon: Rocket,
      title: "Deploy-Ready",
      description:
        "Sofort einsatzbereit auf Vercel, Netlify oder jedem anderen Host.",
    },
    {
      icon: Users,
      title: "Agency-Lizenz",
      description:
        "Nutze unsere Templates für unbegrenzt viele Kundenprojekte.",
    },
    {
      icon: HeartHandshake,
      title: "Support inklusive",
      description:
        "Wir helfen dir bei der Einrichtung und beantworten alle Fragen.",
    },
  ];

  return (
    <>
      <Container>
        <Hero
          title="Premium Next.js Templates für moderne Webprojekte"
          subtitle="DSGVO-ready, schnell und professionell – starte dein Projekt in Minuten statt Wochen."
          primaryCta={{ text: "Angebot anfragen", href: "/kontakt" }}
          secondaryCta={{ text: "Templates ansehen", href: "/templates" }}
        />

        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Warum EverVibe Studios?
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Wir kombinieren modernste Technologie mit durchdachtem Design und
              rechtssicherer Implementierung.
            </p>
          </div>
          <FeatureGrid features={features} />
        </section>

        <CTA
          title="Bereit für dein nächstes Projekt?"
          description="Kontaktiere uns für individuelle Lösungen oder starte direkt mit einem unserer Templates."
          buttonText="Jetzt anfragen"
          buttonHref="/kontakt"
        />
      </Container>
    </>
  );
}
