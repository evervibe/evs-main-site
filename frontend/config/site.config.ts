export const site = {
  name: "EverVibe Studios",
  url: "https://evervibestudios.com",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@evervibestudios.com",
  phone: "+49 (0) 123 456789",
  location: "Hamburg, Deutschland",
  social: {
    x: "https://x.com/evervibestudios",
    github: "https://github.com/evervibe",
  },
  legal: {
    company: "EverVibe Studios",
    address: "Stresemannstraße 131, 22769 Hamburg",
    email: "info@evervibestudios.com",
  },
} as const;
