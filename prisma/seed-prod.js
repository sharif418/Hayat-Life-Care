// Production seed script - creates default admin user if not exists
// This runs on container startup after db push

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Running production seed...');

  // Create default admin user if not exists
  try {
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email: 'admin@hayatlifecare.com' },
    });

    if (!existingAdmin) {
      await prisma.adminUser.create({
        data: {
          email: 'admin@hayatlifecare.com',
          password: 'admin123',
          name: 'Admin',
          role: 'admin',
        },
      });
      console.log('✓ Created default admin user');
    } else {
      console.log('→ Admin user already exists');
    }
  } catch (e) {
    console.log('⚠ AdminUser table may not exist yet, skipping seed');
  }

  // Create essential site settings if not exists
  try {
    const settingsData = [
      { key: 'site_name', value: 'Hayat Life Care', type: 'text', group: 'general', label: 'Site Name' },
      { key: 'tagline', value: 'One Stop Service for Healthcare & Daily Essentials', type: 'text', group: 'general', label: 'Tagline' },
      { key: 'phone_primary', value: '01332-850348', type: 'text', group: 'contact', label: 'Primary Phone' },
      { key: 'phone_secondary', value: '01335-074949', type: 'text', group: 'contact', label: 'Secondary Phone' },
      { key: 'email', value: 'info@hayatlifecare.com', type: 'text', group: 'contact', label: 'Email' },
      { key: 'address', value: 'O.R. Nizam Road, Chattogram (Near Chittagong Medical College Hospital)', type: 'text', group: 'contact', label: 'Address' },
      { key: 'share_price', value: '1000000', type: 'text', group: 'investment', label: 'Share Price (BDT)' },
      { key: 'share_price_display', value: '10 Lacs', type: 'text', group: 'investment', label: 'Share Price Display' },
    ];

    for (const setting of settingsData) {
      const existing = await prisma.siteSetting.findUnique({
        where: { key: setting.key },
      });
      if (!existing) {
        await prisma.siteSetting.create({ data: setting });
      }
    }
    console.log('✓ Site settings ready');
  } catch (e) {
    console.log('⚠ SiteSetting seed skipped:', e.message);
  }

  // Create default videos if not exists
  try {
    const existingVideos = await prisma.video.count();
    if (existingVideos === 0) {
      const videosData = [
        {
          title: 'Hayat Life Care — Official Overview',
          description: "Discover the vision behind Chattogram's most ambitious healthcare & lifestyle complex on 55 Katha.",
          youtubeId: 'dQw4w9WgXcQ',
          thumbnail: '',
          order: 1,
          active: true,
        },
        {
          title: 'Our World-Class Facilities',
          description: 'Explore 11 business wings, international-standard diagnostics, and premium amenities across 14+ floors.',
          youtubeId: 'dQw4w9WgXcQ',
          thumbnail: '',
          order: 2,
          active: true,
        },
        {
          title: 'Investment Opportunity',
          description: 'Learn about our transparent investment model — 4,950 shares, zero bank loans, buyback guarantee.',
          youtubeId: 'dQw4w9WgXcQ',
          thumbnail: '',
          order: 3,
          active: true,
        },
      ];

      for (const video of videosData) {
        await prisma.video.create({ data: video });
      }
      console.log('✓ Created default videos');
    } else {
      console.log('→ Videos already exist');
    }
  } catch (e) {
    console.log('⚠ Video seed skipped:', e.message);
  }

  console.log('🌱 Production seed complete!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
