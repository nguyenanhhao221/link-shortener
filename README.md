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

You will need a Postgres SQL database for the app to function. You can run an example one with the `docker-compose.yaml` file

```bash
docker-compose -f docker-compose.yaml up
```

After setting up the local postgres, we will need to run `prisma migrate` to apply the migration and necessary tables

```bash
pnpm install --frozen-lockfile
pnpm exec prisma migrate deploy
```
Provide the credential to connect to the database via the `.env` file. Check out the `.env.example`

## Deploy

This app is deployed on Vercel with the Database using PostgresSQL deployed on Railway.

## Note for myself in the future
Hey future me, this app is a fun side project and I'm too lazy to implement the best way to handle production, preview Postgres, so there only 1 production Postgres on Railway. 
Which also mean that you (me) must replace the database connection to this Railway connection and manually apply prisma migration to it whenever there are changes to the database.
I know, I know this is not the best way. But you know we are too lazy to apply all the necessary CI/CD with these different provider
