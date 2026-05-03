# Hayat Life Care - Production Migration Guide

This guide explains how to prepare the Hayat Life Care platform for production deployment, including migrating from SQLite to PostgreSQL.

## 1. Environment Variables

Create a `.env.production` or set these in your production hosting environment (e.g., Coolify):

```env
# Change this to your production PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/hayat_db?schema=public"

# Generate a strong, secure secret for JWT signing in production
# Run `openssl rand -base64 32` in terminal to generate one
JWT_SECRET="your-very-strong-production-jwt-secret-key"

# Node environment
NODE_ENV="production"
```

## 2. PostgreSQL Migration Steps

Before deploying to production, follow these steps to switch Prisma from SQLite to PostgreSQL:

1. **Update `prisma/schema.prisma`:**
   Change the datasource block:
   ```prisma
   datasource db {
     provider = "postgresql" // Changed from "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. **Remove SQLite Migrations:**
   Because SQLite migrations are not compatible with PostgreSQL, you need to clear the existing migrations folder and recreate it.
   ```bash
   rm -rf prisma/migrations
   ```

3. **Generate PostgreSQL Migrations:**
   Run the following command to create your initial PostgreSQL migration:
   ```bash
   npx prisma migrate dev --name init_postgres
   ```

4. **Seed the Database:**
   Once the tables are created in PostgreSQL, run the production seed script to set up default settings and the admin user:
   ```bash
   npx prisma db seed
   ```

## 3. Rate Limiting and Security

We have implemented an in-memory Rate Limiter to protect your public endpoints against brute force attacks.
- **Admin Login (`/api/admin/login`):** Limited to 5 requests per 15 minutes per IP.
- **Inquiries (`/api/inquiries`):** Limited to 10 requests per 15 minutes per IP.
- **Appointments (`/api/appointments`):** Limited to 10 requests per 15 minutes per IP.

We have also migrated the Admin user passwords to use `bcrypt`.
If you ever create a new admin via database or script, remember to hash the password with `bcrypt`. We have a script available at `scripts/migrate-passwords.js` to automatically hash any plain-text passwords in the database.

## 4. UI Polish & ESLint

- `dangerouslySetInnerHTML` in the `ChatWidget.tsx` has been replaced with a secure React renderer function to prevent any potential XSS attacks and make the code ready for third-party security audits.
- All ESLint warnings and errors, including `react-hooks/refs` and `react-hooks/set-state-in-effect`, have been resolved. The codebase is now clean and production-ready.
