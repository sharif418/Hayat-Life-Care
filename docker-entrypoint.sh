#!/bin/sh
set -e

echo "🚀 Starting Hayat Life Care..."

# If production database does not exist, copy the template created during build
if [ ! -f /app/data/prod.db ]; then
  echo "📦 No database found. Creating from build template..."
  cp /app/prisma/template.db /app/data/prod.db
  echo "✓ Database created at /app/data/prod.db"
else
  echo "→ Database already exists at /app/data/prod.db"
fi

# Run seed script (it safely skips if data already exists)
echo "🌱 Running production seed..."
node prisma/seed-prod.js 2>&1

# Start the Next.js server
echo "🟢 Starting Next.js server..."
exec node server.js
