# Waitlist setup (Google Sheets + Resend)

When someone submits the waitlist form and accepts the Terms, the browser POSTs to
`/api/waitlist`. The route handler (`src/app/api/waitlist/route.ts`):

1. Validates the email and that Terms were accepted.
2. Saves `timestamp, email, terms, marketing` to a Google Sheet (via an Apps Script Web App).
3. Sends a confirmation email to the subscriber via Resend (best-effort).

## 1. Google Sheet

1. Create a new Google Sheet. In row 1, add headers: `Timestamp | Email | Terms | Marketing`.
2. `Extensions > Apps Script`, delete the boilerplate, and paste in
   [`waitlist-google-apps-script.gs`](./waitlist-google-apps-script.gs).
3. (Optional) Set `SHARED_SECRET` in the script to a random string.
4. `Deploy > New deployment > Web app`:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Authorize when prompted, then copy the **Web app URL** (ends in `/exec`).

> Re-deploy a **new version** every time you edit the script, or changes won't take effect.

## 2. Resend

1. Create an API key at <https://resend.com/api-keys>.
2. While on the test domain, `onboarding@resend.dev` can only deliver to **your own**
   verified Resend email. To email any subscriber, verify a domain in Resend and set
   `RESEND_FROM` to an address on it (e.g. `Vital AI <hello@yourdomain.com>`).

## 3. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=re_xxx
RESEND_FROM="Vital AI <onboarding@resend.dev>"
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
GOOGLE_SHEETS_WEBHOOK_SECRET=        # must match SHARED_SECRET in the script (or leave both blank)
```

Restart `npm run dev` after editing `.env.local`. In production set the same variables
in your host (e.g. Vercel project settings).

## 4. Test

Submit the form with a valid email and accept the Terms. A row should appear in the
sheet, and (if Resend is configured and the address is allowed) a confirmation email
arrives. Server-side errors are logged to the dev console / host logs.
