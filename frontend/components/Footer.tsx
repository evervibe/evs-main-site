import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import Container from "./Container";
import { site } from "@/config/site.config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground/5 border-t mt-20">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">{site.name}</h3>
            <p className="text-sm text-foreground/70">{site.location}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Produkte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/templates"
                  className="text-foreground/70 hover:text-foreground"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/ueber-uns"
                  className="text-foreground/70 hover:text-foreground"
                >
                  Über uns
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/recht/impressum"
                  className="text-foreground/70 hover:text-foreground"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/recht/datenschutz"
                  className="text-foreground/70 hover:text-foreground"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/recht/cookies"
                  className="text-foreground/70 hover:text-foreground"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="text-foreground/70 hover:text-foreground"
                >
                  {site.contactEmail}
                </a>
              </li>
              <li className="text-foreground/70">{site.phone}</li>
            </ul>
            <div className="flex space-x-4">
              <a
                href={site.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={site.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground"
                aria-label="X (Twitter)"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6 text-center text-sm text-foreground/70">
          <p>© {currentYear} {site.name}. Alle Rechte vorbehalten.</p>
        </div>
      </Container>
    </footer>
  );
}
