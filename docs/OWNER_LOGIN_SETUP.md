# Dadur Bari Owner Login Setup

## Prerequisites

- A Neon PostgreSQL database
- DATABASE_URL configured in .env.local
- OWNER_PASSWORD configured in .env.local

## Create the owner account

Run:

```bash
npm run create-owner
```

This will:
- load .env.local
- connect to the database
- find the OWNER role
- create the owner user if it does not already exist
- hash the password before storing it

## Login flow

- Visit /admin-login
- Enter the owner email or phone and password
- The server validates the credentials against the database
- A session cookie is created for the admin session
- The user is redirected to /admin

## Security note

This is a foundational authentication setup for the SRS build. The next implementation stage should harden the session layer with stronger cookie security and a full protected auth middleware.
