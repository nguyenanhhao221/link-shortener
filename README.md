This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

You will need a PostgreSQL database for the app to function. Set `DATABASE_URL` in `.env` using `.env.example` as a template. You can run an example database with the `docker-compose.yaml` file.

```bash
docker-compose -f docker-compose.yaml up
```

After setting up the local PostgreSQL database, apply the migration and create the required tables:

```bash
pnpm install --frozen-lockfile
pnpm exec prisma migrate deploy
```

## Deploy

This app is deployed on Vercel with PostgreSQL hosted on Neon. Vercel runs the `vercel-build` script, which applies pending Prisma migrations before building the app. Make sure `DATABASE_URL` is configured for the Vercel environment being deployed.

Changing `DATABASE_URL` only points the app at a different database; it does not copy data from the old database. Run the migration once against the new database, then migrate any required application data separately.
