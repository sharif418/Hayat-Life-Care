import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create default admin user
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
    console.log('→ Admin user already exists, skipping');
  }

  // 2. Site Settings
  const settingsData = [
    { key: 'site_name', value: 'Hayat Life Care', type: 'text', group: 'general', label: 'Site Name' },
    { key: 'tagline', value: 'One Stop Service for Healthcare & Daily Essentials', type: 'text', group: 'general', label: 'Tagline' },
    { key: 'phone_primary', value: '01332-850348', type: 'text', group: 'contact', label: 'Primary Phone' },
    { key: 'phone_secondary', value: '01335-074949', type: 'text', group: 'contact', label: 'Secondary Phone' },
    { key: 'email', value: 'info@hayatlifecare.com', type: 'text', group: 'contact', label: 'Email' },
    { key: 'address', value: 'O.R. Nizam Road, Chattogram (Near Chittagong Medical College Hospital)', type: 'text', group: 'contact', label: 'Address' },
    { key: 'office_address', value: 'Mishmak Manjuri, Badshah Miah Road, Ameerbag, Chattogram', type: 'text', group: 'contact', label: 'Office Address' },
    { key: 'facebook', value: 'https://facebook.com/hayatlifecare', type: 'text', group: 'social', label: 'Facebook' },
    { key: 'youtube', value: '', type: 'text', group: 'social', label: 'YouTube' },
    { key: 'instagram', value: '', type: 'text', group: 'social', label: 'Instagram' },
    { key: 'linkedin', value: '', type: 'text', group: 'social', label: 'LinkedIn' },
    { key: 'share_price', value: '1000000', type: 'text', group: 'investment', label: 'Share Price (BDT)' },
    { key: 'share_price_display', value: '10 Lacs', type: 'text', group: 'investment', label: 'Share Price Display' },
    { key: 'company_parent', value: 'Hayat Holdings', type: 'text', group: 'general', label: 'Parent Company' },
  ];

  for (const setting of settingsData) {
    const existing = await prisma.siteSetting.findUnique({
      where: { key: setting.key },
    });
    if (!existing) {
      await prisma.siteSetting.create({ data: setting });
    }
  }
  console.log('✓ Created site settings');

  // 3. Services - All 11 business wings from brochure
  const servicesData = [
    {
      title: 'Parking Zone',
      slug: 'parking-zone',
      description: 'Spacious and secure parking facility spread across 3 basement levels with 150+ parking spaces, providing convenient access for all visitors and tenants. The parking area is designed with modern safety systems, CCTV surveillance, and automated entry/exit for a hassle-free experience.',
      icon: 'Car',
      image: '/images/wings/floor_level2.jpg',
      floor: 'Basement 1-3',
      category: 'infrastructure',
      order: 1,
      active: true,
    },
    {
      title: 'ATM Booth',
      slug: 'atm-booth',
      description: 'Multiple ATM booths from leading banks conveniently located on the ground floor, providing 24/7 banking access. Ensures visitors and patients can handle financial transactions without leaving the complex.',
      icon: 'Landmark',
      image: '/images/wings/floor_level2.jpg',
      floor: 'Ground Floor',
      category: 'convenience',
      order: 2,
      active: true,
    },
    {
      title: 'Pharmacy',
      slug: 'pharmacy',
      description: 'A fully stocked pharmacy offering a wide range of medicines, healthcare products, and medical supplies. Open extended hours to serve patients and visitors with genuine medicines at competitive prices.',
      icon: 'Pill',
      image: '/images/medical-lab.png',
      floor: 'Ground Floor',
      category: 'healthcare',
      order: 3,
      active: true,
    },
    {
      title: 'Optical Shop',
      slug: 'optical-shop',
      description: 'A modern optical shop offering comprehensive eye care solutions including prescription glasses, sunglasses, contact lenses, and eye examinations by qualified optometrists.',
      icon: 'Glasses',
      image: '/images/medical-lab.png',
      floor: 'Ground Floor',
      category: 'healthcare',
      order: 4,
      active: true,
    },
    {
      title: 'Super Shop',
      slug: 'super-shop',
      description: 'A well-organized super shop providing daily essentials, groceries, and lifestyle products. Stocked with quality items at reasonable prices for the convenience of visitors, patients, and nearby residents.',
      icon: 'ShoppingCart',
      image: '/images/super-shop.png',
      floor: '1st Floor',
      category: 'shopping',
      order: 5,
      active: true,
    },
    {
      title: 'Coffee Shop',
      slug: 'coffee-shop',
      description: 'A cozy coffee shop serving premium coffee, tea, and light snacks. The perfect spot for visitors to relax while waiting or for professionals to hold informal meetings in a comfortable setting.',
      icon: 'Coffee',
      image: '/images/restaurant.png',
      floor: '1st Floor',
      category: 'dining',
      order: 6,
      active: true,
    },
    {
      title: 'Juice Bar',
      slug: 'juice-bar',
      description: 'A health-focused juice bar offering fresh fruit juices, smoothies, and healthy beverages. Perfect for health-conscious visitors and patients looking for nutritious refreshments.',
      icon: 'GlassWater',
      image: '/images/restaurant.png',
      floor: '1st Floor',
      category: 'dining',
      order: 7,
      active: true,
    },
    {
      title: 'Restaurant',
      slug: 'restaurant',
      description: 'A multi-cuisine restaurant serving delicious and hygienic food in a comfortable ambiance. Offers both dine-in and take-away options with a menu designed to cater to diverse tastes and dietary needs.',
      icon: 'UtensilsCrossed',
      image: '/images/restaurant.png',
      floor: '2nd Floor',
      category: 'dining',
      order: 8,
      active: true,
    },
    {
      title: "Kid's Amusement Park",
      slug: 'kids-amusement-park',
      description: 'A vibrant and safe indoor amusement park designed for children of all ages. Features exciting rides, games, and play zones that keep kids entertained while parents attend to healthcare or shopping needs.',
      icon: 'Baby',
      image: '/images/children-park.png',
      floor: '3rd Floor',
      category: 'entertainment',
      order: 9,
      active: true,
    },
    {
      title: "Doctor's Chamber",
      slug: 'doctors-chamber',
      description: "Modern and well-equipped doctor's chambers across multiple floors, housing specialist consultants in various medical fields. Comfortable waiting areas and organized appointment systems ensure a smooth experience for patients.",
      icon: 'Stethoscope',
      image: '/images/doctor-chamber.png',
      floor: '4th-6th Floor',
      category: 'healthcare',
      order: 10,
      active: true,
    },
    {
      title: 'Diagnostic Center',
      slug: 'diagnostic-center',
      description: 'A state-of-the-art diagnostic center equipped with the latest medical technology for accurate test results. Offers comprehensive pathology, radiology, imaging, and specialized diagnostic services under one roof.',
      icon: 'Microscope',
      image: '/images/medical-lab.png',
      floor: '7th-8th Floor',
      category: 'healthcare',
      order: 11,
      active: true,
    },
  ];

  for (const service of servicesData) {
    const existing = await prisma.service.findUnique({
      where: { slug: service.slug },
    });
    if (!existing) {
      await prisma.service.create({ data: service });
    }
  }
  console.log('✓ Created services');

  // 4. FAQ entries
  const faqsData = [
    {
      question: 'What is Hayat Life Care?',
      answer: 'Hayat Life Care is a one-stop healthcare and lifestyle complex located on O.R. Nizam Road, Chattogram. It is a sister concern of Hayat Holdings and offers 11 business wings including parking, ATM, pharmacy, optical shop, super shop, coffee shop, juice bar, restaurant, children amusement park, doctor\'s chambers, and a diagnostic center.',
      category: 'general',
      order: 1,
      active: true,
    },
    {
      question: 'Where is Hayat Life Care located?',
      answer: 'Hayat Life Care is located at O.R. Nizam Road, Chattogram, near Chittagong Medical College Hospital. The corporate office is at Mishmak Manjuri, Badshah Miah Road, Ameerbag, Chattogram.',
      category: 'general',
      order: 2,
      active: true,
    },
    {
      question: 'How much land does the project cover?',
      answer: 'The Hayat Life Care complex is built on 55 Katha of land with 9+ levels featuring 3 basement levels.',
      category: 'general',
      order: 3,
      active: true,
    },
    {
      question: 'What are the 11 business wings?',
      answer: 'The 11 business wings are: 1) Parking Zone, 2) ATM Booth, 3) Pharmacy, 4) Optical Shop, 5) Super Shop, 6) Coffee Shop, 7) Juice Bar, 8) Restaurant, 9) Kid\'s Amusement Park, 10) Doctor\'s Chambers, 11) Diagnostic Center.',
      category: 'general',
      order: 4,
      active: true,
    },
    {
      question: 'How can I invest in Hayat Life Care?',
      answer: 'You can invest by purchasing shares at 10 Lacs (10,00,000 BDT) per share. There are various benefit codes (B-1 to B-8) offering different benefits and returns. Contact our office at 01332-850348 or 01335-074949 for investment details.',
      category: 'investment',
      order: 5,
      active: true,
    },
    {
      question: 'What is the price of one share?',
      answer: 'Each share is priced at 10 Lacs BDT (10,00,000 Taka). This investment comes with various benefit codes that offer different returns and advantages.',
      category: 'investment',
      order: 6,
      active: true,
    },
    {
      question: 'What are the benefit codes (B-1 to B-8)?',
      answer: 'The benefit codes B-1 through B-8 represent different investment tiers with varying benefits. These include priority booking, rental income, discount on services, and more. Each code offers a unique combination of benefits. Please contact our office for detailed information about each benefit code.',
      category: 'investment',
      order: 7,
      active: true,
    },
    {
      question: 'Is there a future expansion plan?',
      answer: 'Yes, Hayat Life Care plans to establish a Specialized Hospital focusing on Cancer, Heart, Kidney, and Gynecology & Obstetrics departments. This will further enhance the healthcare offerings of the complex.',
      category: 'general',
      order: 8,
      active: true,
    },
    {
      question: 'Who are the leaders of Hayat Life Care?',
      answer: 'The Chairman of Hayat Life Care is Capt. Md Showkat Hossain Chowdhury, and the Managing Director is Dr. Mohammad Azizul Haque. The company operates under the umbrella of Hayat Holdings.',
      category: 'general',
      order: 9,
      active: true,
    },
    {
      question: 'What are the operating hours?',
      answer: 'Operating hours vary by business wing. The parking and ATM facilities are available 24/7. For specific hours of the pharmacy, super shop, restaurant, doctor\'s chambers, and diagnostic center, please contact us directly at 01332-850348 or 01335-074949.',
      category: 'general',
      order: 10,
      active: true,
    },
    {
      question: 'What healthcare services are available?',
      answer: 'Hayat Life Care offers comprehensive healthcare services including doctor\'s chambers with specialist consultants, a fully equipped diagnostic center with pathology and radiology services, a pharmacy with genuine medicines, and an optical shop for eye care. Future plans include a specialized hospital for Cancer, Heart, Kidney, and Gyne & Obs.',
      category: 'healthcare',
      order: 11,
      active: true,
    },
    {
      question: 'Is parking available?',
      answer: 'Yes, Hayat Life Care has spacious and secure parking facilities spread across 3 basement levels with 150+ parking spaces, CCTV surveillance, and automated entry/exit systems.',
      category: 'general',
      order: 12,
      active: true,
    },
    {
      question: 'How do I book a doctor\'s appointment?',
      answer: 'You can book a doctor\'s appointment by visiting Hayat Life Care in person or calling our reception at 01332-850348 or 01335-074949. Online appointment booking will be available soon.',
      category: 'healthcare',
      order: 13,
      active: true,
    },
    {
      question: 'Is the project approved by relevant authorities?',
      answer: 'Yes, Hayat Life Care is a project by Hayat Holdings and complies with all relevant local authority regulations and building codes in Chattogram.',
      category: 'investment',
      order: 14,
      active: true,
    },
    {
      question: 'How do I contact Hayat Life Care?',
      answer: 'You can reach us at: Phone: 01332-850348, 01335-074949 | Office: Mishmak Manjuri, Badshah Miah Road, Ameerbag, Chattogram | Project Site: Manashi, O.R. Nizam Road, Chattogram. You can also fill out the contact form on our website.',
      category: 'general',
      order: 15,
      active: true,
    },
  ];

  for (const faq of faqsData) {
    const existing = await prisma.fAQ.findFirst({
      where: { question: faq.question },
    });
    if (!existing) {
      await prisma.fAQ.create({ data: faq });
    }
  }
  console.log('✓ Created FAQs');

  // 5. Leaders
  const leadersData = [
    {
      name: 'Capt. Md Showkat Hossain Chowdhury',
      designation: 'Chairman',
      bio: 'Capt. Md Showkat Hossain Chowdhury is the visionary Chairman of Hayat Life Care and Hayat Holdings. With decades of experience in business leadership and a deep commitment to community welfare, he has spearheaded the development of this landmark healthcare and lifestyle complex in Chattogram. His strategic vision combines healthcare excellence with lifestyle convenience, creating a unique one-stop destination that serves the people of Chattogram and beyond.',
      image: null,
      order: 1,
      active: true,
    },
    {
      name: 'Dr. Mohammad Azizul Haque',
      designation: 'Managing Director',
      bio: 'Dr. Mohammad Azizul Haque serves as the Managing Director of Hayat Life Care, bringing extensive medical and administrative expertise to the project. As a medical professional turned healthcare entrepreneur, Dr. Haque ensures that every aspect of Hayat Life Care meets the highest standards of medical care and patient experience. His leadership drives the organization\'s mission to make quality healthcare accessible to all.',
      image: null,
      order: 2,
      active: true,
    },
  ];

  for (const leader of leadersData) {
    const existing = await prisma.leader.findFirst({
      where: { name: leader.name },
    });
    if (!existing) {
      await prisma.leader.create({ data: leader });
    }
  }
  console.log('✓ Created leaders');

  // 7. Doctors
  const doctorsData = [
    { name: 'Dr. Mohammad Azizul Haque', specialty: 'General', designation: 'Associate Professor, CMCH', floor: 'Level 5', schedule: 'Sat-Thu, 5PM-9PM', bio: 'Managing Director of Hayat Life Care and Associate Professor at Chattogram Medical College.', order: 1, active: true },
    { name: 'Dr. Fatima Begum', specialty: 'Gynecology', designation: 'Senior Consultant', floor: 'Level 7', schedule: 'Sat-Wed, 10AM-2PM', bio: 'Experienced gynecologist specializing in women\'s health and fertility treatments.', order: 2, active: true },
    { name: 'Dr. Rashid Ahmed', specialty: 'Cardiology', designation: 'Professor & Head', floor: 'Level 4', schedule: 'Sun-Thu, 4PM-8PM', bio: 'Leading cardiologist with over 20 years of experience in interventional cardiology.', order: 3, active: true },
    { name: 'Dr. Nasreen Akter', specialty: 'Oncology', designation: 'Consultant Oncologist', floor: 'Level 6', schedule: 'Sat-Tue, 9AM-1PM', bio: 'Specialist in cancer diagnosis and treatment with expertise in chemotherapy protocols.', order: 4, active: true },
    { name: 'Dr. Kamal Hossain', specialty: 'Dental', designation: 'Dental Surgeon', floor: 'Level 8', schedule: 'Sat-Thu, 10AM-6PM', bio: 'Experienced dental surgeon providing comprehensive oral healthcare services.', order: 5, active: true },
    { name: 'Dr. Sharmin Sultana', specialty: 'Gynecology', designation: 'Fertility Specialist', floor: 'Level 7', schedule: 'Sun-Thu, 3PM-7PM', bio: 'Fertility specialist with advanced training in reproductive medicine and IVF.', order: 6, active: true },
    { name: 'Dr. Imran Khan', specialty: 'Cardiology', designation: 'Interventional Cardiologist', floor: 'Level 4', schedule: 'Sat-Wed, 5PM-9PM', bio: 'Board-certified interventional cardiologist specializing in cardiac catheterization.', order: 7, active: true },
    { name: 'Dr. Tahmina Chowdhury', specialty: 'Oncology', designation: 'Radiation Oncologist', floor: 'Level 6', schedule: 'Mon-Fri, 9AM-3PM', bio: 'Radiation oncology expert with focus on precision radiation therapy.', order: 8, active: true },
    { name: 'Dr. Rezaul Karim', specialty: 'General', designation: 'General Physician', floor: 'Level 5', schedule: 'Sat-Thu, 10AM-5PM', bio: 'General physician providing primary care and preventive health services.', order: 9, active: true },
  ];

  for (const doctor of doctorsData) {
    const existing = await prisma.doctor.findFirst({
      where: { name: doctor.name },
    });
    if (!existing) {
      await prisma.doctor.create({ data: doctor });
    }
  }
  console.log('✓ Created doctors');

  // 8. Videos — Default 3 videos for homepage
  const videosData = [
    {
      title: 'Hayat Life Care — Official Overview',
      description: 'Discover the vision behind Chattogram\'s most ambitious healthcare & lifestyle complex on 55 Katha.',
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

  const existingVideos = await prisma.video.count();
  if (existingVideos === 0) {
    for (const video of videosData) {
      await prisma.video.create({ data: video });
    }
    console.log('✓ Created default videos');
  } else {
    console.log('→ Videos already exist, skipping');
  }

  console.log('\n🌱 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
