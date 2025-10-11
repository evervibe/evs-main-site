import { Metadata } from "next";
import Container from "@/components/Container";
import { site } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von EverVibe Studios",
};

export default function ImpressumPage() {
  return (
    <Container>
      <div className="py-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Impressum</h1>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Angaben gemäß § 5 TMG
          </h2>
          <p>
            {site.legal.company}
            <br />
            {site.legal.address}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Kontakt</h2>
          <p>
            E-Mail:{" "}
            <a
              href={`mailto:${site.legal.email}`}
              className="text-primary hover:underline"
            >
              {site.legal.email}
            </a>
            <br />
            Telefon: {site.phone}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <p>
            {site.legal.company}
            <br />
            {site.legal.address}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            EU-Streitschlichtung
          </h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            .
          </p>
          <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Verbraucherstreitbeilegung/Universalschlichtungsstelle
          </h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Haftung für Inhalte
          </h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
            §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Haftung für Links
          </h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </div>
    </Container>
  );
}
