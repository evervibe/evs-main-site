import { Metadata } from "next";
import Container from "@/components/Container";
import { site } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von EverVibe Studios",
};

export default function DatenschutzPage() {
  return (
    <Container>
      <div className="py-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            1. Datenschutz auf einen Blick
          </h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was
            mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
            besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Datenerfassung auf dieser Website
          </h3>
          <p>
            <strong>
              Wer ist verantwortlich für die Datenerfassung auf dieser Website?
            </strong>
          </p>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den
            Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt
            &quot;Hinweis zur Verantwortlichen Stelle&quot; in dieser Datenschutzerklärung
            entnehmen.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. Hosting und Content Delivery Networks (CDN)
          </h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">Vercel</h3>
          <p>
            Diese Website wird gehostet bei Vercel Inc., 340 S Lemon Ave #4133,
            Walnut, CA 91789, USA. Details zur Datenverarbeitung durch Vercel
            finden Sie in der Datenschutzerklärung von Vercel:{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://vercel.com/legal/privacy-policy
            </a>
            .
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. Allgemeine Hinweise und Pflichtinformationen
          </h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
            Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
            vertraulich und entsprechend den gesetzlichen
            Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Hinweis zur verantwortlichen Stelle
          </h3>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser
            Website ist:
          </p>
          <p>
            {site.legal.company}
            <br />
            {site.legal.address}
            <br />
            E-Mail: {site.legal.email}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            4. Datenerfassung auf dieser Website
          </h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">Kontaktformular</h3>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
            Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
            angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den
            Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir
            nicht ohne Ihre Einwilligung weiter.
          </p>
          <p>
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs.
            1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags
            zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
            erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung
            auf unserem berechtigten Interesse an der effektiven Bearbeitung der
            an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf
            Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese
            abgefragt wurde.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Anfrage per E-Mail
          </h3>
          <p>
            Wenn Sie uns per E-Mail kontaktieren, wird Ihre Anfrage inklusive
            aller daraus hervorgehenden personenbezogenen Daten (Name,
            E-Mail-Adresse) zum Zwecke der Bearbeitung Ihres Anliegens bei uns
            gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre
            Einwilligung weiter.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Analyse-Tools</h2>
          <h3 className="text-xl font-semibold mt-6 mb-3">Vercel Analytics</h3>
          <p>
            Diese Website nutzt Vercel Analytics. Anbieter ist Vercel Inc., 340
            S Lemon Ave #4133, Walnut, CA 91789, USA. Vercel Analytics erfasst
            anonymisierte Nutzungsdaten, um die Performance und Nutzererfahrung
            zu verbessern. Es werden keine personenbezogenen Daten oder Cookies
            verwendet.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Ihre Rechte
          </h2>
          <p>
            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre
            gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger
            und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung
            oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum
            Thema Datenschutz können Sie sich jederzeit an uns wenden.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            7. Änderungen dieser Datenschutzerklärung
          </h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit
            sie stets den aktuellen rechtlichen Anforderungen entspricht oder um
            Änderungen unserer Leistungen in der Datenschutzerklärung
            umzusetzen. Für Ihren erneuten Besuch gilt dann die neue
            Datenschutzerklärung.
          </p>

          <p className="mt-8 text-sm text-foreground/70">
            Stand: {new Date().toLocaleDateString("de-DE")}
          </p>
        </div>
      </div>
    </Container>
  );
}
