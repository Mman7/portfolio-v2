"use client";

import { ArrowUpRight } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";
import { contact } from "@/features/home/data";
import { btn, btnPrimary, lineClass, pad } from "@/lib/styles";
import {
  type ContactErrors,
  type ContactField,
  type ContactValues,
  contactFields,
  validateContact,
} from "./validate";
import { useContactAnimations } from "./useContactAnimations";

type Status = { kind: "idle" | "sending" | "sent" | "error"; message: string };

const copyrightYear = "2026";

const fieldLabels: Record<ContactField, string> = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

const inputClass =
  "block w-full resize-none rounded-none border-0 border-b border-[#333] bg-transparent py-3 text-lg text-foreground outline-none transition-colors placeholder:text-transparent disabled:opacity-60";

const rowClass =
  "group flex items-baseline justify-between gap-6 border-t border-[#2a2a2a] py-7 text-[#c9c6c0] transition-colors hover:text-foreground focus-visible:text-foreground md:py-10";

const methods = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  {
    label: "GitHub",
    value: contact.github.replace("https://", ""),
    href: contact.github,
    external: true,
  },
  {
    label: "LinkedIn",
    value: contact.linkedIn.replace("https://www.", "").replace(/\/$/, ""),
    href: contact.linkedIn,
    external: true,
  },
];

const closing = "Good things start with a conversation.".split(" ");

export function ContactPage() {
  const pageRef = useRef<HTMLElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });
  useContactAnimations(pageRef);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {} as ContactValues;
    for (const field of contactFields) values[field] = String(data.get(field));

    const found = validateContact(values);
    setErrors(found);
    const first = contactFields.find((field) => found[field]);
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ kind: "sending", message: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: data.get("website") }),
      });
      if (response.status === 503) {
        setStatus({
          kind: "error",
          message:
            "The form isn’t connected to an email service yet, so nothing was sent.",
        });
        return;
      }
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus({
        kind: "sent",
        message: "Your message was sent. I usually reply within 24 hours.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Your message wasn’t sent. Try again.",
      });
    }
  }

  const sending = status.kind === "sending";

  return (
    <main ref={pageRef}>
      <section
        id="top"
        data-hero
        aria-label="Hero"
        className={`relative flex h-svh min-h-150 flex-col justify-end overflow-hidden pb-18 ${pad}`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[url('/contact_bg.jpg')] bg-cover bg-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(8_8_8_/_50%),rgb(8_8_8_/_10%)_40%,rgb(8_8_8_/_88%))]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_80%_20%,rgb(127_156_245_/_14%),transparent_70%)]"
        />
        <div
          data-spot
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 size-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgb(127_156_245_/_16%),transparent)] max-md:hidden"
        />
        <div data-hero-copy className="relative">
          <h1 className="font-display text-[clamp(56px,17vw,280px)] font-bold uppercase leading-[.86] tracking-[-.06em]">
            <span data-ln className={lineClass}>
              <span className="block">Let’s</span>
            </span>
            <span data-ln className={lineClass}>
              <span className="block text-[#777]">talk.</span>
            </span>
          </h1>
          <p
            data-hero-fade
            className="mt-10 max-w-[30ch] font-display text-[clamp(20px,2.2vw,30px)] leading-[1.3] tracking-[-.02em] text-[#c9c6c0]"
          >
            Have an idea, a project, or an opportunity in mind?
          </p>
        </div>
        <div
          data-hero-scroll
          aria-hidden="true"
          className="absolute bottom-0 right-[clamp(20px,4.5vw,64px)] h-16 w-px bg-[linear-gradient(#888,transparent)]"
        />
      </section>

      <section
        data-band
        aria-label="Transition"
        className="overflow-hidden border-t border-line py-[clamp(48px,10vw,140px)]"
      >
        <p
          data-band-text
          aria-hidden="true"
          className="w-max whitespace-nowrap font-display text-[clamp(56px,13vw,220px)] font-bold uppercase leading-none tracking-[-.05em] text-transparent [-webkit-text-stroke:1.5px_#3a3a3a]"
        >
          Every project starts with a message.
        </p>
      </section>

      <section
        id="message"
        aria-label="Contact form"
        className={`relative grid grid-cols-[1fr_1.1fr] gap-[clamp(32px,6vw,96px)] border-t border-line py-[140px] max-[900px]:grid-cols-1 max-[767px]:py-24 ${pad}`}
      >
        <div className="self-start min-[901px]:sticky min-[901px]:top-27.5">
          <h2 className="font-display text-[clamp(38px,5.6vw,88px)] font-semibold leading-none tracking-[-.045em]">
            <span data-ln className={lineClass}>
              <span className="block">Let’s create</span>
            </span>
            <span data-ln className={lineClass}>
              <span className="block">something</span>
            </span>
            <span data-ln className={lineClass}>
              <span className="block text-accent">meaningful.</span>
            </span>
          </h2>
          <p data-reveal className="mt-10 max-w-[40ch] text-lg text-[#a3a3a3]">
            I usually reply within 24 hours.
          </p>
        </div>

        <form
          data-reveal-once
          noValidate
          onSubmit={handleSubmit}
          className="flex max-w-[640px] flex-col gap-9"
        >
          <fieldset disabled={sending} className="contents">
            {contactFields.map((field) => {
              const error = errors[field];
              const Control = field === "message" ? "textarea" : "input";
              return (
                <div key={field} data-field>
                  <label
                    htmlFor={field}
                    className="mb-1 block text-sm text-muted"
                  >
                    {fieldLabels[field]}
                  </label>
                  <div className="group relative">
                    <Control
                      id={field}
                      name={field}
                      rows={field === "message" ? 5 : undefined}
                      type={field === "email" ? "email" : undefined}
                      autoComplete={
                        field === "name" || field === "email" ? field : "off"
                      }
                      required
                      aria-required="true"
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? `${field}-error` : undefined}
                      className={inputClass}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-focus-within:scale-x-100"
                    />
                  </div>
                  {error && (
                    <p
                      id={`${field}-error`}
                      className="mt-2 text-sm text-[#ffb4b4]"
                    >
                      <span className="sr-only">Error: </span>
                      {error}
                    </p>
                  )}
                </div>
              );
            })}
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] size-px opacity-0"
            />
            <div data-field className="flex flex-col items-start gap-5">
              <button
                type="submit"
                aria-busy={sending}
                className={`${btn} ${btnPrimary} min-w-48 cursor-pointer gap-3 disabled:cursor-progress disabled:opacity-60`}
              >
                {sending ? "Sending…" : "Send Message"}
                {!sending && <ArrowUpRight size={18} aria-hidden="true" />}
              </button>
              <div
                aria-live="polite"
                role={status.kind === "error" ? "alert" : undefined}
                className={`min-h-6 text-[15px] ${status.kind === "error" ? "text-[#ffb4b4]" : "text-[#c9c6c0]"}`}
              >
                {status.message && (
                  <>
                    <span className="sr-only">
                      {status.kind === "error" ? "Error: " : "Success: "}
                    </span>
                    {status.message}
                    {status.kind === "error" && (
                      <>
                        {" "}
                        Email me at{" "}
                        <a
                          className="underline underline-offset-4"
                          href={`mailto:${contact.email}`}
                        >
                          {contact.email}
                        </a>
                        .
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </fieldset>
        </form>
      </section>

      <section
        aria-label="Direct contact"
        className={`border-t border-line pb-[120px] pt-24 max-[767px]:pb-20 ${pad}`}
      >
        <h2 className="mb-10 font-mono text-xs uppercase tracking-[.2em] text-muted">
          Or reach me directly
        </h2>
        <ul>
          {methods.map((method) => (
            <li
              key={method.label}
              data-row
              className="last:border-b last:border-[#2a2a2a]"
            >
              <a
                className={rowClass}
                href={method.href}
                {...(method.external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                <span className="w-24 shrink-0 text-sm text-muted md:w-48">
                  {method.label}
                </span>
                <span className="relative min-w-0 flex-1 wrap-anywhere font-display text-[clamp(18px,4.2vw,52px)] tracking-[-.03em]">
                  {method.value}
                  {method.external && (
                    <span className="sr-only"> (opens in a new tab)</span>
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </span>
                <ArrowUpRight
                  size={24}
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section
        data-end
        aria-label="Closing"
        className={`relative flex min-h-screen flex-col justify-end gap-14 overflow-hidden border-t border-line pb-18 pt-35 ${pad}`}
      >
        <div
          data-clip
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_100%,rgb(70_100_170_/_32%),transparent_70%)]"
        />
        <h2 className="relative font-display text-[clamp(34px,8.6vw,150px)] font-bold uppercase leading-[.92] tracking-[-.055em]">
          <span className="sr-only">
            Good things start with a conversation.
          </span>
          <span aria-hidden="true">
            {closing.map((word, index) => (
              <span key={index} data-word className="inline">
                {word}{" "}
              </span>
            ))}
          </span>
        </h2>
        <div className="relative flex flex-wrap items-center justify-between gap-6 border-t border-[#2a2a2a] pt-9">
          <a
            data-end-cta
            className={`${btn} ${btnPrimary} gap-3`}
            href={`mailto:${contact.email}`}
          >
            Email me <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <p className="font-mono text-[11px] uppercase tracking-widest text-quiet">
            © {copyrightYear} Eric Man
          </p>
        </div>
      </section>
    </main>
  );
}
