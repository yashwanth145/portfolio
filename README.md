# Futuristic Portfolio

A premium one-page portfolio built with Next.js App Router, Tailwind CSS, Framer Motion, GSAP, and React Three Fiber.

## Tech Stack

- Next.js 16 with App Router
- TypeScript (strict mode)
- Tailwind CSS 4
- Framer Motion
- GSAP
- Three.js via React Three Fiber and Drei
- `next-themes` for theme switching
- `cmdk` for the command palette

## Folder Structure

```text
app/
  layout.tsx
  loading.tsx
  page.tsx
  globals.css
components/
  portfolio/
    animated-background.tsx
    command-palette.tsx
    custom-cursor.tsx
    hero-canvas.tsx
    portfolio-page.tsx
    theme-toggle.tsx
  providers/
    theme-provider.tsx
  ui/
    magnetic-button.tsx
    section-heading.tsx
lib/
  data.ts
  utils.ts
```

## Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm run start
```

## Deploy on Vercel

1. Push the project to GitHub.
2. Import the repository into [Vercel](https://vercel.com/).
3. Keep the default Next.js build settings.
4. Deploy.

## Customization Notes

- Update personal information, links, and project data in `lib/data.ts`.
- Replace placeholder project/demo/certificate URLs with real ones.
- If you want a real contact backend, connect the form to an API route, Resend, Formspree, or a server action.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
