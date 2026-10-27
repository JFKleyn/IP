import { connect } from "cloudflare:sockets";

const TO_EMAIL = "info@instaparty.co.za";
const BCC_EMAIL = "johan@venturetechnologies.co";

const jsonResponse = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });

const clean = (value, max = 500) =>
  String(value ?? "")
    .trim()
    .slice(0, max)
    .replace(/[\r\n]/g, " ");

const escapeHTML = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();

    // Spam honeypot
    if (data.website) {
      return jsonResponse({ success: true });
    }

    const firstName = clean(data.firstName, 100);
    const lastName = clean(data.lastName, 100);
    const email = clean(data.email, 254);
    const telephone = clean(data.telephone, 35);
    const area = clean(data.area, 150);
    const bookingDate = clean(data.bookingDate, 30);
    const time = clean(data.time, 30);
    const message = String(data.message ?? "").trim().slice(0, 5000);

    const interests = Array.isArray(data.interests)
      ? data.interests.map((item) => clean(item, 100)).join(", ")
      : "";

    const packages = Array.isArray(data.packages)
      ? data.packages.map((item) => clean(item, 100)).join(", ")
      : "";

    if (!firstName || !lastName || !email) {
      return jsonResponse(
        { error: "Please complete all required fields." },
        400
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse(
        { error: "Please enter a valid email address." },
        400
      );
    }

    const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
      console.error("Missing SMTP configuration");

      return jsonResponse(
        { error: "Email service is not configured." },
        500
      );
    }

    const subject = `New Insta Party Enquiry - ${firstName} ${lastName}`;

    const html = `
      <h2>New Insta Party Website Enquiry</h2>

      <p><strong>First Name:</strong> ${escapeHTML(firstName)}</p>
      <p><strong>Last Name:</strong> ${escapeHTML(lastName)}</p>
      <p><strong>Email:</strong> ${escapeHTML(email)}</p>
      <p><strong>Telephone:</strong> ${escapeHTML(telephone)}</p>
      <p><strong>Area:</strong> ${escapeHTML(area)}</p>
      <p><strong>Booking Date:</strong> ${escapeHTML(bookingDate)}</p>
      <p><strong>Time:</strong> ${escapeHTML(time)}</p>

      <hr>

      <p><strong>Interested In:</strong> ${escapeHTML(interests || "Not specified")}</p>
      <p><strong>Soft Play Package:</strong> ${escapeHTML(packages || "Not specified")}</p>

      <hr>

      <h3>Message</h3>
      <p style="white-space: pre-wrap;">${escapeHTML(message || "No message provided")}</p>
    `;

    const text = [
      "New Insta Party Website Enquiry",
      "",
      `First Name: ${firstName}`,
      `Last Name: ${lastName}`,
      `Email: ${email}`,
      `Telephone: ${telephone}`,
      `Area: ${area}`,
      `Booking Date: ${bookingDate}`,
      `Time: ${time}`,
      `Interested In: ${interests || "Not specified"}`,
      `Soft Play Package: ${packages || "Not specified"}`,
      "",
      "Message:",
      message || "No message provided",
    ].join("\r\n");

    const socket = connect(
      {
        hostname: SMTP_HOST,
        port: 465,
      },
      {
        secureTransport: "on",
      }
    );

    const writer = socket.writable.getWriter();
    const reader = socket.readable.getReader();

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let buffer = "";

    async function readResponse() {
      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          throw new Error("SMTP connection closed unexpectedly");
        }

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\r\n");

        if (lines.length < 2) continue;

        const complete = lines.slice(0, -1);
        buffer = lines[lines.length - 1];

        for (const line of complete) {
          if (/^\d{3} /.test(line)) {
            return {
              code: Number(line.slice(0, 3)),
              message: line,
            };
          }
        }
      }
    }

    async function send(command, expectedCodes) {
      await writer.write(encoder.encode(command + "\r\n"));

      const response = await readResponse();

      if (!expectedCodes.includes(response.code)) {
        throw new Error(`SMTP error: ${response.message}`);
      }

      return response;
    }

    function encodeBase64(value) {
      return btoa(
        Array.from(new TextEncoder().encode(value))
          .map((byte) => String.fromCharCode(byte))
          .join("")
      );
    }

    try {
      const greeting = await readResponse();

      if (greeting.code !== 220) {
        throw new Error("SMTP server rejected connection");
      }

      await send("EHLO venturetechnologies.co", [250]);

      await send("AUTH LOGIN", [334]);

      await send(encodeBase64(SMTP_USER), [334]);

      await send(encodeBase64(SMTP_PASSWORD), [235]);

      await send(`MAIL FROM:<${SMTP_USER}>`, [250]);

      await send(`RCPT TO:<${TO_EMAIL}>`, [250, 251]);

      await send(`RCPT TO:<${BCC_EMAIL}>`, [250, 251]);

      await send("DATA", [354]);

      const boundary = `venture_${Date.now()}`;

      const emailContent = [
        `From: Insta Party Website <${SMTP_USER}>`,
        `To: ${TO_EMAIL}`,
        `Reply-To: ${email}`,
        `Subject: ${subject}`,
        "MIME-Version: 1.0",
        `Content-Type: multipart/alternative; boundary="${boundary}"`,
        "",
        `--${boundary}`,
        'Content-Type: text/plain; charset="UTF-8"',
        "Content-Transfer-Encoding: 8bit",
        "",
        text,
        "",
        `--${boundary}`,
        'Content-Type: text/html; charset="UTF-8"',
        "Content-Transfer-Encoding: 8bit",
        "",
        html,
        "",
        `--${boundary}--`,
        "",
      ].join("\r\n");

      // SMTP dot-stuffing
      const safeContent = emailContent.replace(
        /(^|\r\n)\./g,
        "$1.."
      );

      await writer.write(
        encoder.encode(safeContent + "\r\n.\r\n")
      );

      const result = await readResponse();

      if (result.code !== 250) {
        throw new Error(`SMTP delivery failed: ${result.message}`);
      }

      await send("QUIT", [221]);

      return jsonResponse({
        success: true,
        message: "Your enquiry has been sent successfully.",
      });
    } finally {
      try {
        writer.releaseLock();
        reader.releaseLock();
        socket.close();
      } catch {
        // Connection already closed
      }
    }
  } catch (error) {
    console.error("Contact form error:", error);

    return jsonResponse(
      {
        success: false,
        error: "Unable to send your enquiry. Please try again.",
      },
      500
    );
  }
}