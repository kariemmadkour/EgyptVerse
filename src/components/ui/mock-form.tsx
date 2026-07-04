"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface MockFormField {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea";
  required?: boolean;
}

interface MockFormProps {
  fields: MockFormField[];
  submitLabel: string;
  successMessage: string;
}

export function MockForm({ fields, submitLabel, successMessage }: MockFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-gold/40 bg-gold-soft/40 px-5 py-4 text-foreground">
        <CheckCircle2 className="size-5 shrink-0 text-terracotta" aria-hidden />
        <p>{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {fields.map((field) => (
        <div
          key={field.name}
          className={field.type === "textarea" ? "sm:col-span-2" : undefined}
        >
          <Label htmlFor={field.name} className="mb-1.5 block">
            {field.label}
          </Label>
          {field.type === "textarea" ? (
            <Textarea id={field.name} name={field.name} required={field.required} rows={5} />
          ) : (
            <Input id={field.name} name={field.name} type={field.type ?? "text"} required={field.required} />
          )}
        </div>
      ))}
      <div className="sm:col-span-2">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
