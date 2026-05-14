/**
 * migrate-prod.js
 * Applies missing tables to an existing SQLite production database.
 * Uses Prisma's $executeRawUnsafe for raw SQL - no extra dependency needed.
 * Safe to run repeatedly (uses CREATE TABLE IF NOT EXISTS).
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('[migrate-prod] Applying schema migrations...');

  // ── ShareholderImage table (added May 2025) ──
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "ShareholderImage" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "photo" TEXT NOT NULL,
      "order" INTEGER NOT NULL DEFAULT 0,
      "active" BOOLEAN NOT NULL DEFAULT 1,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('[migrate-prod] ✓ ShareholderImage table ensured');

  // ── Event table ──
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Event" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "description" TEXT NOT NULL DEFAULT '',
      "coverPhoto" TEXT,
      "active" BOOLEAN NOT NULL DEFAULT 1,
      "order" INTEGER NOT NULL DEFAULT 0,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('[migrate-prod] ✓ Event table ensured');

  // ── EventPhoto table ──
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "EventPhoto" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "eventId" TEXT NOT NULL,
      "photo" TEXT NOT NULL,
      "caption" TEXT,
      "order" INTEGER NOT NULL DEFAULT 0,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "EventPhoto_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);
  console.log('[migrate-prod] ✓ EventPhoto table ensured');

  // ── Testimonial table ──
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Testimonial" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "designation" TEXT NOT NULL,
      "text" TEXT NOT NULL,
      "photo" TEXT,
      "rating" INTEGER NOT NULL DEFAULT 5,
      "order" INTEGER NOT NULL DEFAULT 0,
      "active" BOOLEAN NOT NULL DEFAULT 1,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('[migrate-prod] ✓ Testimonial table ensured');

  console.log('[migrate-prod] ✅ All migrations applied successfully');
}

main()
  .catch((err) => {
    console.error('[migrate-prod] Migration error:', err.message);
    // Don't crash - let the app start
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
