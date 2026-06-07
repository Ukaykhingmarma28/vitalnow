/**
 * Vital AI - Waitlist sink for Google Sheets.
 *
 * Setup:
 * 1. Create a Google Sheet. In row 1 add headers: Timestamp | Email | Terms | Marketing
 * 2. Extensions > Apps Script. Paste this file in.
 * 3. (Optional) Set SHARED_SECRET below to the same value as
 *    GOOGLE_SHEETS_WEBHOOK_SECRET in your .env.local.
 * 4. Deploy > New deployment > type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Copy the "/exec" Web app URL into GOOGLE_SHEETS_WEBHOOK_URL in .env.local.
 * 5. Re-deploy (new version) whenever you change this script.
 */

// Must match GOOGLE_SHEETS_WEBHOOK_SECRET in .env.local. Leave "" to disable the check.
const SHARED_SECRET = "";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (SHARED_SECRET && data.secret !== SHARED_SECRET) {
      return json({ error: "Unauthorized" }, 401);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.email || "",
      data.terms ? "Yes" : "No",
      data.marketing ? "Yes" : "No",
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ error: String(err) }, 500);
  }
}

function json(obj, status) {
  // Apps Script web apps cannot set arbitrary status codes, but returning JSON
  // with a 200 is fine; the Next.js route treats any non-2xx fetch as failure.
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
