import { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Cookie-Richtlinie",
  description: "Cookie-Richtlinie von EverVibe Studios",
};

export default function CookiesPage() {
  return (
    <Container>
      <div className="py-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Cookie-Richtlinie</h1>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Was sind Cookies?
          </h2>
          <p>
            Cookies sind kleine Textdateien, die auf Ihrem Computer oder
            Mobilgerät gespeichert werden, wenn Sie eine Website besuchen. Sie
            werden häufig verwendet, um Websites funktionsfähig zu machen oder
            effizienter zu gestalten, sowie um Informationen an die Betreiber
            der Website zu übermitteln.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Welche Cookies verwenden wir?
          </h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Notwendige Cookies
          </h3>
          <p>
            Diese Website verwendet derzeit keine notwendigen Cookies. Die
            Funktionalität der Website wird ohne Cookies gewährleistet.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Analyse-Cookies</h3>
          <p>
            Wir verwenden Vercel Analytics zur Analyse der Website-Nutzung.
            Vercel Analytics erfasst anonymisierte Nutzungsdaten ohne die
            Verwendung von Cookies. Es werden keine personenbezogenen Daten
            erhoben.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Marketing-Cookies
          </h2>
          <p>
            Wir setzen derzeit keine Marketing-Cookies oder Tracking-Tools von
            Drittanbietern wie Google Analytics, Facebook Pixel oder ähnliche
            Dienste ein.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Ihre Cookie-Einstellungen
          </h2>
          <p>
            Da wir keine Cookies verwenden, die eine Einwilligung erfordern, ist
            kein Cookie-Banner erforderlich. Sie können unsere Website ohne
            Einschränkungen nutzen, ohne Cookies akzeptieren zu müssen.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Cookies in Ihrem Browser verwalten
          </h2>
          <p>
            Die meisten Webbrowser erlauben es Ihnen, über die
            Browsereinstellungen Cookies zu verwalten. Sie können Ihren Browser
            so einstellen, dass er:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Alle Cookies blockiert</li>
            <li>Nur Cookies von Erstanbietern zulässt</li>
            <li>Sie benachrichtigt, wenn eine Website ein Cookie setzen möchte</li>
            <li>Cookies beim Schließen des Browsers automatisch löscht</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Weitere Informationen
          </h2>
          <p>
            Wenn Sie Fragen zu unserer Cookie-Richtlinie haben, kontaktieren Sie
            uns bitte über unser{" "}
            <a href="/kontakt" className="text-primary hover:underline">
              Kontaktformular
            </a>
            .
          </p>

          <p className="mt-8 text-sm text-foreground/70">
            Stand: {new Date().toLocaleDateString("de-DE")}
          </p>
        </div>
      </div>
    </Container>
  );
}
