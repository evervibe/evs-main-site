"use client";

import { Code, Users, Award, Target } from "lucide-react";
import Container from "@/components/Container";
import FeatureGrid from "@/components/FeatureGrid";

export default function AboutPage() {
  const values = [
    {
      icon: Code,
      title: "Technologie-Fokus",
      description:
        "Wir setzen auf modernste Web-Technologien: Next.js, React, TypeScript und Tailwind CSS.",
    },
    {
      icon: Award,
      title: "Qualität",
      description:
        "Jedes Template wird sorgfältig entwickelt, getestet und optimiert.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Wir unterstützen unsere Kunden mit erstklassigem Support und Updates.",
    },
    {
      icon: Target,
      title: "DSGVO-Konformität",
      description:
        "Rechtssicherheit ist für uns kein Add-on, sondern Standard.",
    },
  ];

  return (
    <Container>
      <div className="py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Über uns</h1>
          <p className="text-lg text-foreground/70 leading-relaxed">
            <strong>EverVibe Studios</strong> entwickelt Premium-Templates und
            Web-Lösungen für Unternehmen, Agenturen und Developer. Mit Sitz in
            Hamburg und Fokus auf moderne Technologien bieten wir
            produktionsreife, DSGVO-konforme Templates für Next.js.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Unsere Mission
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-foreground/70 mb-4">
              Wir glauben, dass moderne Webentwicklung effizient, schnell und
              rechtssicher sein sollte. Deshalb entwickeln wir Templates, die
              nicht nur gut aussehen, sondern auch technisch auf höchstem Niveau
              sind.
            </p>
            <p className="text-lg text-foreground/70">
              Unsere Templates sparen dir Wochen an Entwicklungszeit und bieten
              dabei die Flexibilität, die du für individuelle Anpassungen
              benötigst.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Unsere Werte
          </h2>
          <FeatureGrid features={values} />
        </section>

        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              "Next.js 15",
              "React 19",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
              "Vercel",
              "Node.js",
              "DSGVO",
            ].map((tech) => (
              <div
                key={tech}
                className="p-4 border border-foreground/10 rounded-lg hover:border-primary/50 transition-colors"
              >
                <span className="font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
