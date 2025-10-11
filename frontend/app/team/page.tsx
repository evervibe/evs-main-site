import { Metadata } from "next";
import { getTeamMembers, getImageUrl } from "@/lib/cms";
import Container from "@/components/Container";
import { createMetadata } from "@/lib/seo";
import { Github, Linkedin } from "lucide-react";
import { XIcon } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Team",
  description: "Lerne das Team hinter EverVibe Studios kennen.",
});

/**
 * Team Page
 */
export default async function TeamPage() {
  const team = await getTeamMembers();

  return (
    <Container>
      <div className="py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Unser Team</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Die Menschen hinter EverVibe Studios
          </p>
        </div>

        {team.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/60">
              Team-Informationen werden derzeit aktualisiert.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-foreground/5 rounded-xl p-6 hover:bg-foreground/10 transition-colors"
              >
                {member.avatar && (
                  <div className="mb-4">
                    <img
                      src={getImageUrl(member.avatar)}
                      alt={member.avatar.alternativeText || member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                  </div>
                )}
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-1">{member.name}</h2>
                  <p className="text-primary mb-3">{member.role}</p>
                  {member.bio && (
                    <p className="text-foreground/70 text-sm mb-4">
                      {member.bio}
                    </p>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-sm text-foreground/60 hover:text-primary transition-colors"
                    >
                      {member.email}
                    </a>
                  )}
                  {member.social && (
                    <div className="flex items-center justify-center gap-3 mt-4">
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/60 hover:text-foreground transition-colors"
                          aria-label="GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.x && (
                        <a
                          href={member.social.x}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/60 hover:text-foreground transition-colors"
                          aria-label="X (Twitter)"
                        >
                          <XIcon className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/60 hover:text-foreground transition-colors"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

// Enable ISR with revalidation every 300 seconds (5 minutes)
export const revalidate = 300;
