"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type ContactInput, contactSchema, projectTypes } from "@/lib/validations";

import { submitContact, type ContactResult } from "./actions";

const fieldBase =
  "w-full rounded-sm border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

export function ContactForm() {
  const [result, setResult] = React.useState<ContactResult | null>(null);
  const [pending, startTransition] = React.useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { projectType: "Full Video" },
  });

  const onSubmit = (data: ContactInput) => {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, String(v ?? "")));
    startTransition(async () => {
      const res = await submitContact(null, fd);
      setResult(res);
      if (res.ok) reset();
    });
  };

  if (result?.ok) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-sm border border-border bg-surface p-8">
        <span className="flex size-11 items-center justify-center rounded-full border border-accent text-accent">
          <Check className="size-5" />
        </span>
        <h2 className="font-display text-2xl">Message sent</h2>
        <p className="text-sm text-muted">{result.message}</p>
        <Button variant="outline" size="sm" onClick={() => setResult(null)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        {...register("company")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input className={fieldBase} placeholder="Your name" {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            className={fieldBase}
            placeholder="you@studio.com"
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Studio / brand" error={errors.studio?.message} optional>
          <input
            className={fieldBase}
            placeholder="Optional"
            {...register("studio")}
          />
        </Field>
        <Field label="Wedding / delivery date" error={errors.date?.message} optional>
          <input
            className={fieldBase}
            placeholder="e.g. October 2026"
            {...register("date")}
          />
        </Field>
      </div>

      <Field label="Project type" error={errors.projectType?.message}>
        <select className={cn(fieldBase, "appearance-none")} {...register("projectType")}>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field label="About the project" error={errors.message?.message}>
        <textarea
          rows={6}
          className={cn(fieldBase, "resize-y")}
          placeholder="Footage volume, style references, deadline, anything else we should know."
          {...register("message")}
        />
      </Field>

      {result && !result.ok && (
        <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {result.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={pending} className="mt-2 self-start">
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          "Send enquiry"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center gap-2 text-sm text-foreground">
        {label}
        {optional && (
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-foreground">
            Optional
          </span>
        )}
      </span>
      {children}
      {error && <span className="text-xs text-red-300">{error}</span>}
    </label>
  );
}
