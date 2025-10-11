import nodemailer from "nodemailer";

export const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "ssl0.ovh.net",
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
  });
};

export interface ContactEmailData {
  name: string;
  email: string;
  message: string;
}

export const sendContactEmail = async (data: ContactEmailData) => {
  const transporter = createTransporter();
  const recipient =
    process.env.SMTP_USER || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@evervibestudios.com";

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Neue Kontaktanfrage von evervibestudios.com</h2>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>E-Mail:</strong> ${data.email}</p>
        <p><strong>Nachricht:</strong></p>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
    </div>
  `;

  const textContent = `
Neue Kontaktanfrage von evervibestudios.com

Name: ${data.name}
E-Mail: ${data.email}

Nachricht:
${data.message}
  `;

  await transporter.sendMail({
    from: `"EverVibe Studios Website" <${process.env.SMTP_USER}>`,
    to: recipient,
    replyTo: data.email,
    subject: `Kontaktanfrage von ${data.name}`,
    text: textContent,
    html: htmlContent,
  });
};
