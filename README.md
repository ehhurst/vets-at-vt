## DEVELOPMENT

1. Install Volta
   - mac: in terminal `curl https://get.volta.sh | bash`
   - windows powershell `winget install Volta.Volta` ?
2. Resart terminal
3. Verify installation with `volta -v`
4. Install node and npm versions `volta install node@20.19.6 npm@10.2.4`
5. Verfy node versions inside project directory `node -v` `npm -v`

### Option A: local dev (Volta)

```bash
npm install
npm run dev
```

### Option B: Docker development

`docker compose up --build`

app runs at http://localhost:3000

`docker compose down`

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This project is deployed on Vercel. When you push and attempt a PR, Vercel will redeploy with those changes prior to merge.

# Database & Migrations Workflow

This project uses **Supabase Postgres** as the database, but **all schema changes are managed via SQL migrations run with `psql`**.  
No Supabase web UI is used to create or modify tables.

---

## Overview

- Database: Supabase-hosted PostgreSQL
- Migration format: versioned `.sql` files
- Migration runner: `psql`
- Credentials: stored in `.env` (never committed)
- Philosophy: **SQL-first, reproducible, UI-free**

---

## Directory Structure

```
db/
├── migrations/
│ ├── 001_create_healthcheck.sql
│ ├── 002_create_users.sql
│ └── ...
└── README.md
```

Each migration:

- Is applied **once**
- Runs top-to-bottom
- Is wrapped in a transaction

---

## Environment Variables

Database credentials are stored in `.env.local` (not committed).

Example:

```env
SUPABASE_DB_URL=postgresql://postgres:<PASSWORD>@db.<PROJECT_ID>.supabase.co:5432/postgres
```

## Connecting to the Database

To open an interactive Postgres shell:
`psql "$SUPABASE_DB_URL"`

Common verification Commands:

`\dt  ` -- list tables
`\d public.healthcheck ` -- describe table
`select * from public.healthcheck;`

## Writing a Migration

Create a new numbered SQL file in `supabase/migrations/`.
Example: `001_create_healthcheck.sql`

```
begin;

create table if not exists public.healthcheck (
  id bigserial primary key,
  created_at timestamptz not null default now()
);

insert into public.healthcheck default values;

commit;
```

Migration Guidelines

- Files are numbered and ordered (001*, 002*, etc.)
- Always wrap in begin; / commit;
- Prefer if not exists for safety
- Avoid destructive changes unless intentional

## Running a Migration

From the project root:
`psql "$SUPABASE_DB_URL" -f supabase/migrations/001_create_healthcheck.sql`

Expected output:

```
BEGIN
CREATE TABLE
INSERT 0 1
COMMIT
```

If you see errors, the transaction will abort and no partial changes will be applied.

## Running Multiple Migrations

```
psql "$SUPABASE_DB_URL" \
  -f supabase/migrations/001_create_healthcheck.sql \
  -f supabase/migrations/002_create_users.sql
```

Or from inside psql:
`\i supabase/migrations/001_create_healthcheck.sql`

## Tracking Applied Migrations (Optional but Recommended)

A schema migration table can be used to track applied migrations.

```
create table if not exists public.schema_migrations (
  version text primary key,
  applied_at timestamptz not null default now()
);
```

At the bottom of each migration file:

```
insert into public.schema_migrations (version)
values ('001_create_healthcheck');
```

To view applied migrations:
`select * from public.schema_migrations order by applied_at;`
