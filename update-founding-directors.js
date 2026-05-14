const fs = require('fs');

const filePath = '/Users/sharifmohammadnasrullah/Desktop/SHARIF_PROJECTS_ORGANIZED/01_CLIENT_BUSINESS_PROJECTS/Hayat_Life_Care/new_project_workspace/src/components/home/FoundingDirectors.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update the DIRECTORS array
const chairman = `{
    id: 'chairman',
    name: 'Capt. Md Showkat Hossain Chowdhury',
    designation: 'Chairman',
    shortTitle: 'Visionary Leader & Maritime Expert',
    photo: '/images/directors/chairman.jpg',
    briefBio: 'A distinguished leader with decades of experience in strategic leadership, organizational development, and institutional governance across maritime and corporate sectors.',
    fullBio: [
      'Capt. Md Showkat Hossain Chowdhury is a distinguished leader with decades of experience in strategic leadership, organizational development, and institutional governance. His visionary approach and commitment to excellence have been instrumental in shaping the direction of multiple organizations.',
      'With a strong background in the maritime industry and corporate leadership, he brings a unique blend of discipline, strategic thinking, and operational expertise to every initiative he leads.',
    ],
    hayatRole: 'As the Chairman of Hayat Life Care, Capt. Showkat Hossain Chowdhury provides the overarching vision and strategic direction for the organization, guiding it toward becoming a premier healthcare destination in Chattogram and beyond.',
  }`;

const md = `{
    id: 'md',
    name: 'Dr. Mohammad Azizul Haque',
    designation: 'Managing Director',
    shortTitle: 'Healthcare Visionary & Medical Professional',
    photo: '/images/directors/md-sir.jpg',
    briefBio: 'A renowned medical professional and healthcare entrepreneur with extensive experience in hospital management, clinical excellence, and healthcare innovation.',
    fullBio: [
      'Dr. Mohammad Azizul Haque is a renowned medical professional and healthcare entrepreneur with extensive experience in hospital management, clinical excellence, and healthcare innovation. His deep understanding of the healthcare landscape in Bangladesh has been pivotal in shaping modern healthcare delivery systems.',
      'With a passion for accessible and quality healthcare, Dr. Haque has dedicated his career to building institutions that prioritize patient care, medical excellence, and community well-being.',
    ],
    hayatRole: 'As the Managing Director of Hayat Life Care, Dr. Haque leads the operational and strategic execution of the organization\\'s mission to deliver world-class, patient-centered healthcare services to the people of Chattogram.',
  }`;

const shishir = `{
    id: 'shishir',
    name: 'Md. Helal Uddin Kawsar (Shishir)',
    designation: 'Founding Director & Chief Operating Officer (COO)',
    shortTitle: 'Hospital Management Professional & Consultant',
    photo: '/images/directors/shishir.jpg',
    briefBio: 'Seasoned Hospital Management Professional & Consultant with MBA in Marketing and MPH in Health Policy & Administration, with over 11 years of healthcare experience.',
    fullBio: [
      'Md. Helal Uddin Kawsar (Shishir) is a seasoned Hospital Management Professional & Consultant, holding an MBA in Marketing and an MPH in Health Policy & Administration, with over 11 years of experience in healthcare administration, hospital operations, HR & administration, strategic planning, and business development.',
      'He has held senior leadership roles in reputed healthcare institutions including Bangladesh Eye Hospital, Khidmah Hospital Ltd., Hikmah Eye Hospital Ltd., Al-Manar Hospital Ltd., and Bangladesh Specialized Hospital.',
      'He later transitioned into entrepreneurship and became the Founding Managing Director of EyeReach Eye Hospital Limited. He specializes in strategic planning, operational management, compliance, team leadership, and institutional capacity building.',
    ],
    hayatRole: 'As the Founding Director of Hayat Life Care, Mr. Kawsar is committed to utilizing his vast experience to develop a modern, patient-centered, and sustainable healthcare system in Bangladesh, driven by innovation and excellence.',
  }`;

const liton = `{
    id: 'liton',
    name: 'Ashekunnabi Mahmudur Rahman Mazumder (Liton)',
    designation: 'Founding Director & Director of International Affairs',
    shortTitle: 'Healthcare Entrepreneur & CEO, Orbit Eye Hospital',
    photo: '/images/directors/liton.jpg',
    briefBio: 'Distinguished healthcare entrepreneur, corporate leader, and business strategist. MD & CEO of Orbit Eye Hospital Ltd. and Founder & CEO of World Class Air Ambulance.',
    fullBio: [
      'Ashekunnabi Mahmudur Rahman Mazumder (Liton) is a distinguished healthcare entrepreneur, corporate leader, and business strategist with diversified experience across healthcare, banking, retail, media, and medical services. He currently serves as the Managing Director & CEO of Orbit Eye Hospital Ltd. and the Founder & CEO of World Class Air Ambulance.',
      'He is also the Owner & CEO of EXPERIAN, a trading and supply company specializing in medical and general goods for both government and private sectors. In addition, he is serving as the Vice President of Bangladesh Medical Tourism Association.',
      'Earlier in his career, he held managerial positions at a multinational bank and served as the Founding General Manager of a national daily newspaper. He also manages franchise operations of renowned retail chains including Shwapno and Lazz Pharma.',
      'With nearly a decade of successful business leadership experience, Mr. Liton has established a strong reputation for operational excellence, strategic growth, and service-oriented management.',
    ],
    hayatRole: 'As the Founding Director of Hayat Life Care, Mr. Liton is committed to contributing his diversified business experience and strategic leadership toward developing a modern, sustainable, and patient-centered healthcare platform in Bangladesh.',
  }`;

const atiq = `{
    id: 'capt-atique',
    name: 'Capt. Atique UA Khan',
    designation: 'Founding Director & Marketing Advisor',
    shortTitle: 'Master Mariner, Writer & Social Activist',
    photo: '/images/directors/capt-atique.jpg',
    briefBio: 'Highly experienced Master Mariner, writer, columnist, and social activist with strong expertise in leadership, strategic planning, and risk management.',
    fullBio: [
      'Capt. Atique UA Khan is a highly experienced Master Mariner, writer, columnist, and social activist with strong expertise in leadership, strategic planning, and risk management gained through his distinguished maritime career. He also contributes to organizational development and strategic direction across various institutions.',
      'He serves as an Adviser to several organizations, including the Bangladesh Kindergarten Association, Durbar Bangladesh Foundation, and Shikkha Foundation. He is also the Founding Chairman of Angeekar Bangladesh Charity Foundation, reflecting his strong commitment to social development and humanitarian initiatives.',
    ],
    hayatRole: 'With his extensive leadership experience and dedication to community service, Capt. Khan is expected to play a valuable role in guiding the strategic growth and vision of Hayat Life Care, supporting its mission to enhance quality healthcare services for the people of Chattogram.',
  }`;

const bakkar = `{
    id: 'bakkar',
    name: 'Md Abu Bakkar Siddique, DMD',
    designation: 'Founding Director & DMD',
    shortTitle: 'Entrepreneur & Business Strategist',
    photo: '/images/directors/bakkar.jpg',
    briefBio: 'Dedicated professional and dynamic entrepreneur with extensive business experience, particularly in the automobile industry. Strong analytical thinking from Mathematics background.',
    fullBio: [
      'Md. Abu Bakkar Siddique, DMD is a dedicated professional and dynamic entrepreneur with extensive business experience, particularly in the automobile industry. With a strong entrepreneurial mindset and practical expertise in both local and international markets, he has successfully developed and managed diversified business ventures.',
      'Academically, he studied Mathematics and completed his Master\\'s degree, which has strengthened his analytical thinking and problem-solving abilities in business and organizational management.',
    ],
    hayatRole: 'As a key member of Hayat Life Care, he brings business insight, operational experience, and a progressive vision toward building a modern, efficient, and service-oriented healthcare platform in Bangladesh.',
  }`;

const noor = `{
    id: 'sayed-noor',
    name: 'Mir Mohammad Sayed Noor',
    designation: 'Founding Director & Finance Director',
    shortTitle: 'Banker, Entrepreneur & Chief Editor, NCC Bangla',
    photo: '/images/directors/sayed-noor.jpg',
    briefBio: 'Experienced banker and entrepreneur, retired as Senior AVP and Branch Head. Chief Editor of NCC Bangla with strong connections in salt and shrimp industries.',
    fullBio: [
      'Mir Mohammad Sayed Noor is an experienced banker and entrepreneur, who retired as Senior Assistant Vice President and Branch Head after a successful career in the banking sector. He is actively involved in various organizations and maintains strong connections within the salt and shrimp industries.',
      'He also serves as the Chief Editor of NCC Bangla.',
    ],
    hayatRole: 'With his extensive experience in banking, business, and organizational leadership, he brings valuable insight into financial management and institutional development. As a member of Hayat Life Care, he is expected to contribute to the organization\\'s strategic growth and vision.',
  }`;

const drnaser = `{
    id: 'dr-naser',
    name: 'Dr. Md Abu Naser',
    designation: 'Founding Director & Vice Chairman',
    shortTitle: 'Surgeon & Founding MD, National Hospital Chattogram',
    photo: '/images/directors/dr-naser.jpg',
    briefBio: 'Renowned surgeon, healthcare entrepreneur, and medical leader. Founding Managing Director of National Hospital Chattogram and Sigma Lab Ltd., established in 1998.',
    fullBio: [
      'Dr. Abu Naser is a renowned surgeon, healthcare entrepreneur, and medical leader, and the Founding Managing Director of National Hospital Chattogram and Sigma Lab Ltd., established in 1998. He is currently serving as Executive Director and has played a pioneering role in the development of super-specialized healthcare services in Chattogram.',
      'He has also contributed to the Bangladesh Medical Association at various leadership levels.',
    ],
    hayatRole: 'As the Vice Chairman of Hayat Life Care, Dr. Abu Naser brings decades of clinical and administrative experience, guiding the organization toward excellence in healthcare delivery. His leadership is instrumental in shaping a new horizon of advanced and super-specialized healthcare services for the people of Chattogram.',
  }`;

const iqbal = `{
    id: 'iqbal',
    name: 'Md. Iqbal Hosain',
    designation: 'Founding Director',
    shortTitle: 'Entrepreneur & Business Leader',
    photo: '/images/directors/iqbal.jpg',
    briefBio: 'A dedicated entrepreneur and business leader with significant experience in strategic planning, business development, and organizational management across diverse industries.',
    fullBio: [
      'Md. Iqbal Hosain is a dedicated entrepreneur and business leader with significant experience in strategic planning, business development, and organizational management. His practical expertise across diverse business sectors has earned him a strong reputation for operational efficiency and sustainable growth.',
      'With a forward-thinking approach and commitment to community development, he has consistently contributed to building successful business enterprises that create lasting value.',
    ],
    hayatRole: 'As a Founding Director of Hayat Life Care, Md. Iqbal Hosain brings valuable business acumen and entrepreneurial insight, contributing to the organization\\'s mission of creating a world-class healthcare and lifestyle destination in Chattogram.',
  }`;

const newDirectorsArray = \`const DIRECTORS: Director[] = [
  // ── Top Leadership (Chairman + MD) ──
  \${chairman},
  \${md},
  // ── Founding Directors (First 4 visible) ──
  \${shishir},
  \${liton},
  \${atiq},
  \${bakkar},
  // ── Hidden behind "More Directors" ──
  \${noor},
  \${drnaser},
  \${iqbal},
]\`;

// Replace the existing DIRECTORS array
content = content.replace(/const DIRECTORS: Director\[\] = \[[\s\S]*?\](\s*\n\s*\/\/ ── Profile Modal)/, newDirectorsArray + '$1');

// Update rendering of designation in ProfileModal (lines ~186-191)
content = content.replace(
  /\{director\.designation\}/g,
  \`{director.designation.includes(' & ') ? (
                    <>
                      {director.designation.split(' & ')[0]} &<br/>
                      {director.designation.split(' & ')[1]}
                    </>
                  ) : director.designation}\`
);

// Update color and text formatting in the DirectorCard (front)
// Old: style={{ background: 'rgba(255,255,255,0.15)', color: '#A7F3D0', border: '1px solid rgba(255,255,255,0.2)' }}
content = content.replace(
  /style=\{\{\s*background:\s*'rgba\(255,255,255,0\.15\)',\s*color:\s*'#A7F3D0',\s*border:\s*'1px solid rgba\(255,255,255,0\.2\)'\s*\}\}/g,
  \`style={{ background: 'rgba(255,255,255,0.2)', color: '#FDE047', border: '1px solid rgba(255,255,255,0.3)', textAlign: 'center' }}\`
);

fs.writeFileSync(filePath, content);
console.log('Updated FoundingDirectors.tsx');
