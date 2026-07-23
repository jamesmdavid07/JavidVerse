import { NextResponse } from "next/server";
import { Resend } from "resend";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_ORGANIZATION_LENGTH = 120;
const MAX_PROJECT_TYPE_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 3000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function jsonResponse(message: string, status: number, success = false) {
  return NextResponse.json({ success, message }, { status });
}

function getString(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value;
}

function cleanInput(value: string, maxLength: number) {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanMessage(value: string, maxLength: number) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return true;
  }

  current.count += 1;
  return false;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= MAX_EMAIL_LENGTH;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return jsonResponse("Too many messages sent. Please wait a few minutes and try again.", 429);
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse("Invalid request. Please refresh the page and try again.", 400);
  }

  if (!payload || typeof payload !== "object") {
    return jsonResponse("Invalid request. Please check the form and try again.", 400);
  }

  const data = payload as Record<string, unknown>;
  const rawName = getString(data.name);
  const rawEmail = getString(data.email);
  const rawOrganization = getString(data.organization);
  const rawProjectType = getString(data.projectType);
  const rawMessage = getString(data.brief);
  const honeypot = cleanInput(getString(data.website), 200);

  if (honeypot) {
    return NextResponse.json({ success: true, message: "Thank you. Your inquiry has been received." });
  }

  if (rawName.length > MAX_NAME_LENGTH) {
    return jsonResponse("Your name is too long. Please keep it under 100 characters.", 400);
  }

  if (rawEmail.length > MAX_EMAIL_LENGTH) {
    return jsonResponse("Your email address is too long. Please enter a valid email address.", 400);
  }

  if (rawOrganization.length > MAX_ORGANIZATION_LENGTH) {
    return jsonResponse("The organization name is too long. Please keep it under 120 characters.", 400);
  }

  if (rawProjectType.length > MAX_PROJECT_TYPE_LENGTH) {
    return jsonResponse("The project type is too long. Please select a valid option.", 400);
  }

  if (rawMessage.length > MAX_MESSAGE_LENGTH) {
    return jsonResponse("Your message is too long. Please keep it under 3,000 characters.", 400);
  }

  const name = cleanInput(rawName, MAX_NAME_LENGTH);
  const email = cleanInput(rawEmail, MAX_EMAIL_LENGTH).toLowerCase();
  const organization = cleanInput(rawOrganization, MAX_ORGANIZATION_LENGTH) || "Not provided";
  const projectType = cleanInput(rawProjectType, MAX_PROJECT_TYPE_LENGTH);
  const message = cleanMessage(rawMessage, MAX_MESSAGE_LENGTH);

  if (!name) {
    return jsonResponse("Please enter your name.", 400);
  }

  if (!isValidEmail(email)) {
    return jsonResponse("Please enter a valid email address.", 400);
  }

  if (!projectType) {
    return jsonResponse("Please select a project type.", 400);
  }

  if (!message) {
    return jsonResponse("Please enter your project brief.", 400);
  }

  const apiKey = process.env.EMAIL_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;
  const emailFromName = process.env.EMAIL_FROM_NAME || "JavidVerse";
  const emailTo = process.env.EMAIL_TO;
  const siteUrl = process.env.SITE_URL || "https://javidverse.com";

  if (!apiKey || !emailFrom || !emailTo) {
    return jsonResponse("Email delivery is not configured yet. Please contact JavidVerse directly by email.", 500);
  }

  const resend = new Resend(apiKey);
  const subject = `${projectType} inquiry from ${name}`;
  const from = `${emailFromName} <${emailFrom}>`;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeOrganization = escapeHtml(organization);
  const safeProjectType = escapeHtml(projectType);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const safeSiteUrl = escapeHtml(siteUrl);

  try {
    const result = await resend.emails.send({
      from,
      to: emailTo,
      replyTo: email,
      subject,
      text: `New JavidVerse inquiry\n\nName: ${name}\nEmail: ${email}\nOrganization: ${organization}\nProject type: ${projectType}\n\nMessage:\n${message}\n\nSent from: ${siteUrl}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #042D6D; line-height: 1.6;">
          <h1 style="font-size: 22px; margin-bottom: 16px;">New JavidVerse Inquiry</h1>
          <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
            <tr><td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Name</td><td style="padding: 8px; border: 1px solid #ddd;">${safeName}</td></tr>
            <tr><td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${safeEmail}</td></tr>
            <tr><td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Organization</td><td style="padding: 8px; border: 1px solid #ddd;">${safeOrganization}</td></tr>
            <tr><td style="font-weight: bold; padding: 8px; border: 1px solid #ddd;">Project Type</td><td style="padding: 8px; border: 1px solid #ddd;">${safeProjectType}</td></tr>
          </table>
          <h2 style="font-size: 18px; margin: 24px 0 8px;">Message</h2>
          <p style="background: #f7f7f7; border-left: 4px solid #FCB005; padding: 16px; white-space: normal;">${safeMessage}</p>
          <p style="font-size: 12px; color: #666; margin-top: 24px;">Sent from ${safeSiteUrl}</p>
        </div>
      `,
    });

    if (result.error) {
      return jsonResponse("The message could not be delivered. Please try again or email JavidVerse directly.", 502);
    }

    return NextResponse.json({ success: true, message: "Thank you. Your inquiry has been sent successfully." });
  } catch {
    return jsonResponse("The message could not be delivered. Please try again or email JavidVerse directly.", 502);
  }
}
