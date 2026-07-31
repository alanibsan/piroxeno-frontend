const RESEND_API_URL = "https://api.resend.com/emails";

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeLead(body) {
  return {
    firstName: body.first_name || body.firstName || "",
    lastName: body.last_name || body.lastName || "",
    phone: body.phone || "",
    email: body.email || "",
    jobTitle: body.job_title || body.jobTitle || "",
    company: body.company || "",
    source: body.source || "request-demo",
  };
}

function leadHtml(lead) {
  const rows = [
    ["Nombre", `${lead.firstName} ${lead.lastName}`.trim()],
    ["Email", lead.email],
    ["Telefono", lead.phone],
    ["Cargo", lead.jobTitle],
    ["Empresa", lead.company],
    ["Origen", lead.source],
  ].filter(([, value]) => value);

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.5">
      <h1 style="margin:0 0 16px;font-size:22px">Nueva solicitud de demo</h1>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border:1px solid #e5e7eb;padding:10px;font-weight:700;background:#f9fafb">${escapeHtml(label)}</td>
                <td style="border:1px solid #e5e7eb;padding:10px">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
    </div>
  `;
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return json(res, 200, { ok: true });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return json(res, 405, { error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DEMO_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "Piroxeno <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Missing email configuration", {
      hasResendApiKey: Boolean(apiKey),
      hasDemoToEmail: Boolean(to),
    });
    return json(res, 500, { error: "Missing email configuration" });
  }

  const lead = normalizeLead(req.body || {});

  if (!lead.email) {
    return json(res, 400, { error: "Email is required" });
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "Piroxeno Demo Form/1.0",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: lead.email,
        subject: `Nueva solicitud de demo${lead.company ? ` - ${lead.company}` : ""}`,
        html: leadHtml(lead),
        text: [
          "Nueva solicitud de demo",
          "",
          `Nombre: ${`${lead.firstName} ${lead.lastName}`.trim()}`,
          `Email: ${lead.email}`,
          `Telefono: ${lead.phone}`,
          `Cargo: ${lead.jobTitle}`,
          `Empresa: ${lead.company}`,
          `Origen: ${lead.source}`,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend error", {
        status: response.status,
        detail,
      });
      return json(res, 502, { error: "Unable to send email" });
    }

    return json(res, 200, { ok: true });
  } catch (err) {
    console.error("Email request failed", err);
    return json(res, 502, { error: "Unable to send email" });
  }
}
