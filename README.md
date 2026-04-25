# ByteBite Frontend

ByteBite is a campus food delivery frontend built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui. It is designed to deploy on Vercel and connect to a separate Render-hosted backend.

## Features

- Modern responsive UI with light, dark, and system theme support
- Email/password sign-in and registration
- Google sign-in via OAuth client ID
- JWT-backed session handling
- Role-based dashboards for:
  - User
  - Vendor
  - Admin
- Menu browsing, food details, cart, checkout, and order history
- Ghana-focused demo content with cedi pricing

## Tech Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- lucide-react
- next-themes

## Environment Variables

Set these in Vercel and in your local `.env.local` file:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-render-backend-url
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

Do not hardcode localhost in production settings.

## Local Development

```bash
npm install
npm run dev
```

The app runs on the Next.js default port, usually `http://localhost:3000`.

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Push changes to `main`.
2. Import the GitHub repo into Vercel.
3. Add `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in the Vercel project settings.
4. Deploy.

## App Routes

- `/` - landing page
- `/auth/sign-in` - sign in
- `/auth/sign-up` - sign up
- `/menu` - food browsing
- `/foods/[id]` - food details
- `/cart` - cart
- `/checkout` - checkout
- `/orders` - order history
- `/dashboard/user` - user dashboard
- `/dashboard/vendor` - vendor dashboard
- `/dashboard/admin` - admin dashboard

## Notes

- This frontend is intentionally separated from the backend.
- The repo includes fallback demo data so the UI stays usable even before backend data is available.
- Google sign-in requires the OAuth client ID configured in both Google Cloud and Vercel.
