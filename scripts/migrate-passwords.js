const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting password migration...');
  
  const admins = await prisma.adminUser.findMany();
  
  for (const admin of admins) {
    if (!admin.password.startsWith('$2')) {
      console.log(`Migrating password for admin: ${admin.email}`);
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      await prisma.adminUser.update({
        where: { id: admin.id },
        data: { password: hashedPassword },
      });
      console.log(`Successfully migrated password for: ${admin.email}`);
    } else {
      console.log(`Admin ${admin.email} already has a hashed password.`);
    }
  }
  
  console.log('Password migration completed.');
}

main()
  .catch((e) => {
    console.error('Migration error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
