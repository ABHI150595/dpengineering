import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().optional(),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  requirement: z.string().min(10, "Please describe your requirement"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: ContactInput) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const nodemailer = await import("nodemailer");

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? 465);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.SMTP_TO ?? user;

    if (!host || !user || !pass) {
      throw new Error("SMTP is not configured.");
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
        <h2 style="color:#1e3a5f;margin-top:0;">New Inquiry — DP Engineering</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#6b7280;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;color:#111827;">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Company</td><td style="padding:8px 0;color:#111827;">${data.company || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#e8612c;">${data.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;color:#111827;">${data.phone || "—"}</td></tr>
        </table>
        <div style="margin-top:16px;">
          <div style="color:#6b7280;font-size:13px;margin-bottom:6px;">Requirement</div>
          <div style="background:#f9fafb;border-radius:8px;padding:14px;color:#111827;font-size:14px;white-space:pre-wrap;">${data.requirement}</div>
        </div>
        <p style="margin-top:24px;font-size:12px;color:#9ca3af;">Sent from dpengineering.in contact form</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"DP Engineering Website" <${user}>`,
      to,
      replyTo: data.email,
      subject: `New Inquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html,
    });

    return { success: true };
  });
