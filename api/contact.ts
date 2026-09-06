import { Resend } from "resend";

const defaultToEmail = "dareabinde04@gmail.com";
const defaultFromEmail = "Portfolio Contact <onboarding@resend.dev>";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  botField?: unknown;
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

async function readVercelBody(request: any) {
  if (request.body) return typeof request.body === "string" ? JSON.parse(request.body) : request.body;
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

async function sendVercelResponse(response: any, result: Response) {
  result.headers.forEach((value, key) => response.setHeader(key, value));
  response.status(result.status).send(await result.text());
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) return json({ error: "Contact form is temporarily unavailable" }, 503);

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  const name = cleanString(body.name);
  const email = cleanString(body.email);
  const message = cleanString(body.message);
  const botField = cleanString(body.botField);

  if (botField) return json({ ok: true });
  if (name.length < 2 || name.length > 120) return json({ error: "Please enter a valid name" }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 180) return json({ error: "Please enter a valid email address" }, 400);
  if (message.length < 3 || message.length > 3000) return json({ error: "Please enter a text between 3 and 3000 characters" }, 400);

  const to = process.env.CONTACT_TO_EMAIL || defaultToEmail;
  const from = process.env.CONTACT_FROM_EMAIL || defaultFromEmail;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: "Portfolio contact from " + name,
      text: "Name: " + name + "\nEmail: " + email + "\n\n" + message,
    });
    return json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed", error);
    return json({ error: "Contact form is temporarily unavailable" }, 503);
  }
}

export function GET() {
  return json({ error: "Method not allowed" }, 405);
}

export default async function handler(request: any, response: any) {
  try {
    if (request.method !== "POST") return sendVercelResponse(response, GET());
    const body = await readVercelBody(request);
    const result = await POST(new Request("https://dareabinde.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }));
    return sendVercelResponse(response, result);
  } catch (error) {
    console.error("Contact function failed", error);
    return response.status(500).json({ error: "Contact form is temporarily unavailable" });
  }
}
