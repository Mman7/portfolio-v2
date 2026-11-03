import { NextResponse } from "next/server";
import {
  contactFields,
  type ContactValues,
  validateContact,
} from "@/features/contact/validate";

const MAX_LENGTH = 5000;

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const input = body as Record<string, unknown>;

  // Bots fill the hidden field; pretend success so they move on.
  if (typeof input.website === "string" && input.website) {
    return NextResponse.json({ ok: true });
  }

  const values = {} as ContactValues;
  for (const field of contactFields) {
    const value = input[field];
    values[field] =
      typeof value === "string" ? value.slice(0, MAX_LENGTH).trim() : "";
  }
  if (Object.keys(validateContact(values)).length) {
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });
  }

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...values,
        ...(process.env.CONTACT_FORM_ACCESS_KEY && {
          access_key: process.env.CONTACT_FORM_ACCESS_KEY,
        }),
      }),
    });
    if (!response.ok) throw new Error(String(response.status));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
  }
}
