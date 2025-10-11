import { z } from "zod";

const minMessageLength = parseInt(
  process.env.CONTACT_MIN_MESSAGE_LENGTH || "5",
  10
);

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name muss mindestens 2 Zeichen lang sein")
    .max(80, "Name darf maximal 80 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  message: z
    .string()
    .min(
      minMessageLength,
      `Nachricht muss mindestens ${minMessageLength} Zeichen lang sein`
    ),
  _topic: z.string().optional(), // Honeypot field
});

export type ContactFormData = z.infer<typeof contactSchema>;
