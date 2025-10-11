import { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import { site } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie EverVibe Studios – Wir beantworten gerne Ihre Fragen zu unseren Templates und Dienstleistungen.",
};

export default function ContactPage() {
  return (
    <Container>
      <div className="py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kontakt</h1>
          <p className="text-lg text-foreground/70">
            Haben Sie Fragen zu unseren Templates oder benötigen Sie eine
            individuelle Lösung? Wir freuen uns auf Ihre Nachricht!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Kontaktinformationen
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">E-Mail</h3>
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="text-foreground/70 hover:text-primary"
                  >
                    {site.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Telefon</h3>
                  <p className="text-foreground/70">{site.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Adresse</h3>
                  <p className="text-foreground/70">
                    {site.legal.address}
                    <br />
                    {site.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-foreground/5 rounded-lg">
              <h3 className="font-semibold mb-2">Geschäftszeiten</h3>
              <p className="text-sm text-foreground/70">
                Montag – Freitag: 09:00 – 18:00 Uhr
                <br />
                Samstag – Sonntag: Geschlossen
              </p>
              <p className="text-sm text-foreground/70 mt-3">
                Wir beantworten Anfragen in der Regel innerhalb von 24 Stunden.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Schreiben Sie uns
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
