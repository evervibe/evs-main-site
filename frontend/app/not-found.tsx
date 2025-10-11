import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Seite nicht gefunden</h2>
      <p className="mt-2 text-foreground/70 mb-6">
        Die gesuchte Seite existiert leider nicht.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        Zurück zur Startseite
      </Link>
    </main>
  );
}
