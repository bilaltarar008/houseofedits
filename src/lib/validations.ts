import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Enter a valid email address"),
  studio: z.string().max(120).optional().or(z.literal("")),
  projectType: z.enum([
    "Full Video",
    "Highlight",
    "Couple Teaser",
    "Wedding Film",
    "Social Teaser",
    "Only Grading",
    "Wedding Video Re-edits",
    "Wedding Video Re-edits",
    "Something else",
  ]),
  date: z.string().max(40).optional().or(z.literal("")),
  message: z
    .string()
    .min(20, "Tell me a little more — 20 characters minimum")
    .max(4000),
  // Honeypot — must stay empty.
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const projectTypes = contactSchema.shape.projectType.options;
