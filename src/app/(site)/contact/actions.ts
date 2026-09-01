"use server";

import { contactSchema } from "@/lib/validations";
import { siteConfig } from "@/lib/site-config";

export interface ContactResult {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export async function submitContact(
  _prev: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot tripped — pretend success, drop the message.
  if (parsed.data.company) {
    return { ok: true, message: "Thanks — I'll be in touch shortly." };
  }

  const { name, email, studio, projectType, date, message } = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey && to) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || "House of Edits <onboarding@resend.dev>",
        to,
        replyTo: email,
        subject: `New enquiry — ${projectType} — ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          studio && `Studio: ${studio}`,
          `Project type: ${projectType}`,
          date && `Wedding / delivery date: ${date}`,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      });
      return { ok: true, message: "Thanks — I'll reply within one business day." };
    } catch (error) {
      console.error("[contact] send failed:", error);
      return {
        ok: false,
        message:
          "Something went wrong sending your message. Please email me directly instead.",
      };
    }
  }

  // Not wired to email yet — log so nothing is lost during setup.
  console.info("[contact] submission (email not configured):", {
    name,
    email,
    studio,
    projectType,
    date,
    message,
  });
  return {
    ok: true,
    message: "Thanks — your message was received. I'll be in touch shortly.",
  };
}
