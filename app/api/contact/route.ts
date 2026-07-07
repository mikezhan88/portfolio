import { Resend } from "resend";
import { profile } from "@/data/site";

export async function POST(req: Request) {
  try {
    const { name, email, message, _gotcha } = await req.json();

    // honeypot: silently accept bot submissions
    if (_gotcha) return Response.json({ ok: true });

    if (!name || !email || !message) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "Email not configured" }, { status: 503 });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [profile.email],
      replyTo: email,
      subject: `New message from ${name}`,
      text: `${message}\n\nFrom: ${name} <${email}>`,
    });

    if (error) {
      return Response.json({ error: "Send failed" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
}
