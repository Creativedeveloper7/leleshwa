# Leleshwa booking backend

## Deploy

1. Install the Supabase CLI and authenticate:

   ```sh
   supabase login
   supabase link --project-ref YOUR_PROJECT_REF
   ```

2. Apply the database migration:

   ```sh
   supabase db push
   ```

3. Upload the Resend, reservations mailbox, allowed-origin, and dashboard URL
   values from `.env.example`:

   ```sh
   supabase secrets set --env-file supabase/.env.local
   ```

   Do not include the `SUPABASE_*` values in that upload. Supabase injects those
   automatically in hosted Edge Functions.

4. Deploy the functions:

   ```sh
   supabase functions deploy create-reservation
   supabase functions deploy subscribe-newsletter
   supabase functions deploy send-booking-response
   ```

   Until these are deployed, the website falls back to saving reservations
   and newsletter signups directly through the database. Confirmation emails
   only send after the functions are live.

5. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the website's
   deployment environment.

## Create the first admin

In the Supabase dashboard, open **Authentication > Users > Add user** and create
the reservations team's email/password account. Disable public user signups under
**Authentication > Providers > Email** because every authenticated user is treated
as a staff member by the database policies.

The separate staff dashboard is available at `/admin/`.

## Email setup

Verify the official domain in Resend and add the DNS records Resend supplies.
`RESEND_FROM_EMAIL`, `RESEND_REPLY_TO`, and `RESERVATIONS_EMAIL` should then use
the official reservations mailbox. Incoming replies remain in that mailbox;
outbound messages and reservation status are recorded in the dashboard.
