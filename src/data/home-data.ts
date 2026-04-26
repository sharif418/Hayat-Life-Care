import {
  Building2, Car, CreditCard, Pill, Glasses, ShoppingBag, Coffee, CupSoda,
  UtensilsCrossed, Baby, Stethoscope, Microscope, TrendingUp, Heart,
  UserCheck, Users, Shield, Award, Star, FileCheck, Settings
} from 'lucide-react'

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Facilities', href: '/facilities', children: [
    { label: '11 Business Wings', href: '/facilities#services' },
    { label: 'Floor Plan', href: '/facilities#floors' },
    { label: 'Doctors', href: '/facilities#doctors' },
    { label: 'Gallery', href: '/facilities#gallery' },
    { label: 'Virtual Tour', href: '/facilities#virtual-tour' },
  ]},
  { label: 'Uniqueness', href: '/uniqueness' },
  { label: 'Investment', href: '/investment', children: [
    { label: 'Why Invest', href: '/investment#investment' },
    { label: 'Compare', href: '/investment#comparison-table' },
    { label: 'Timeline', href: '/investment#timeline' },
  ]},
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export interface NavLink {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const floors = [
  {
    id: 'basement',
    label: 'Basement',
    image: '/images/wings/floor_basement_parking_1777180869390.png',
    description: 'Secure and spacious parking facility with state-of-the-art surveillance and valet service for your convenience.',
    facilities: ['3 basements with 150+ parking spaces'],
  },
  {
    id: 'level1',
    label: 'Level 1',
    image: '/images/wings/floor_level1_retail_1777180885279.png',
    description: 'Ground floor retail hub providing essential daily needs — from groceries to pharmaceuticals, all under one roof.',
    facilities: ['Reception', 'Super Shop', 'Pharmacy', 'Optical Shop', 'Coffee Shop', 'ATM Booth'],
  },
  {
    id: 'level2',
    label: 'Level 2',
    image: '/images/wings/floor_level2_restaurant_1777180900345.png',
    description: 'Food, refreshment, and family entertainment zone designed for relaxation and joy.',
    facilities: ['Restaurant', 'Juice Bar', "Kid's Amusement Park"],
  },
  {
    id: 'level3',
    label: 'Level 3',
    image: '/images/wings/floor_level3_diagnostic_1777180930090.png',
    description: 'Comprehensive pathology and diagnostic laboratory equipped with advanced testing capabilities.',
    facilities: ['Common Diagnostic Floor', 'Pathology', 'Microbiology', 'Immunology & Serology', 'Biochemistry', 'Hematology', 'MRI', 'ECG', 'USG', 'X-Ray'],
  },
  {
    id: 'level4',
    label: 'Level 4',
    image: '/images/wings/floor_level4_female_1777180946011.png',
    description: 'Dedicated and designated diagnostic floor for female patients.',
    facilities: ["Designated Female Diagnostic Floor"],
  },
  {
    id: 'level5',
    label: 'Level 5',
    image: '/images/wings/floor_level5_doctors_1777180964055.png',
    description: 'Specialized consultation floor.',
    facilities: ["Doctor's Chambers"],
  },
  {
    id: 'level6',
    label: 'Level 6',
    image: '/images/wings/floor_level6_cancer_1777180998779.png',
    description: 'Cutting-edge oncology diagnostics.',
    facilities: ["Doctor's Chambers", 'Cancer Institute - PET CT Scan'],
  },
  {
    id: 'level7',
    label: 'Level 7',
    image: '/images/wings/floor_level7_fertility_1777181013924.png',
    description: 'Dedicated fertility institute offering world-class reproductive care and counseling.',
    facilities: ["Doctor's Chambers", 'Fertility Institute'],
  },
  {
    id: 'level8',
    label: 'Level 8',
    image: '/images/wings/floor_level8_dental_1777181030015.png',
    description: 'Top-floor specialist center for ophthalmology, dental surgery.',
    facilities: ["Doctor's Chambers", 'Ophthalmology', 'Dental / Oral & Maxillofacial Surgery'],
  },
  {
    id: 'level9',
    label: 'Level 9',
    image: '/images/wings/floor_level9_mosque_1777181065205.png',
    description: 'Dedicated prayer area and corporate offices.',
    facilities: ["Mosque (Male & Female)", "Office"],
  },
  {
    id: 'above9',
    label: 'Above Level 9',
    image: '/images/wings/floor_above9_hospital_1777181082667.png',
    description: 'Advanced specialized hospital facilities.',
    facilities: ["Specialized Hospital (Cancer, Heart, Kidney, Gynecology & Obstetrics)"],
  },
]

export const services = [
  { icon: Car, title: 'Car Parking', desc: '150+ parking spaces across 3 basements with CCTV surveillance' },
  { icon: CreditCard, title: 'ATM Booth', desc: 'On-site ATM for secure cash access & payments' },
  { icon: Pill, title: 'Pharmacy', desc: 'Authentic medicines from authorized manufacturers' },
  { icon: Glasses, title: 'Optical Shop', desc: 'Prescription glasses, frames & contact lenses' },
  { icon: ShoppingBag, title: 'Super Shop', desc: 'Largest supershop in the complex' },
  { icon: Coffee, title: 'Coffee Shop', desc: 'Fresh brews & light snacks' },
  { icon: CupSoda, title: 'Juice Bar', desc: 'Fresh, nutrient-rich juices & smoothies' },
  { icon: UtensilsCrossed, title: 'Restaurant', desc: 'Nutritious meals with special diet options' },
  { icon: Baby, title: "Kid's Amusement Park", desc: 'Indoor play zone for kids' },
  { icon: Stethoscope, title: "Doctor's Chamber", desc: 'Private chambers across specialities' },
  { icon: Microscope, title: 'Diagnostic Center', desc: 'AI-powered advanced diagnostics' },
]

export const benefitCodes = [
  { code: 'B-1', title: 'Lifetime Financial Benefit', icon: TrendingUp },
  { code: 'B-2', title: 'Caring for Him/Herself', icon: Heart },
  { code: 'B-3', title: 'Partner Health Access', icon: UserCheck },
  { code: 'B-4', title: 'Family Health Access', icon: Users },
  { code: 'B-5', title: 'Family Health Access Including Parents', icon: Shield },
  { code: 'B-6', title: 'Family Health Access Including Parents-in-law', icon: Award },
  { code: 'B-7', title: 'VIP Access to All Facilities', icon: Star },
  { code: 'B-8', title: 'Social Recognition & Share Certification', icon: FileCheck },
]

export const faqCategoryConfig: Record<string, { color: string; icon: any }> = {
  general: { color: '#0D9488', icon: Building2 },
  investment: { color: '#D97706', icon: TrendingUp },
  shares: { color: '#7C3AED', icon: FileCheck },
  operations: { color: '#2563EB', icon: Settings },
  legal: { color: '#DC2626', icon: Shield },
}

export const faqs = [
  { q: 'What is Hayat Life Care?', a: 'Hayat Life Care is a premium healthcare and lifestyle complex in Chattogram, Bangladesh — a one-stop destination for healthcare services, daily essentials, dining, and entertainment under one roof. It is a sister concern of Hayat Holdings.', category: 'general' },
  { q: 'Where is it located?', a: 'Hayat Life Care is located at Manashi, O.R. Nizam Road, Chattogram — one of the most trusted healthcare zones in the city, near Chittagong Medical College Hospital.', category: 'general' },
  { q: 'What is the land area and structure?', a: 'The complex spans 55 Katha of land with 9 levels plus 3 basements. Future plans include expansion to 14-18 floors.', category: 'general' },
  { q: 'Why invest in Hayat Life Care?', a: 'Hayat Life Care offers a unique investment opportunity in Chattogram\'s healthcare sector. With 11 business wings, a prime location, and no bank loans, your investment is secure with transparent profit distribution and a buyback guarantee after 3 years at 5% higher price.', category: 'investment' },
  { q: 'Will there be a hospital?', a: 'Yes, future expansion plans include a specialized hospital focusing on Cancer, Heart, Kidney, and Gyne & Obs departments — making it a comprehensive healthcare destination.', category: 'operations' },
  { q: 'Who will operate the company?', a: 'The company is operated under the leadership of Chairman Capt. Md Showkat Hossain Chowdhury and Managing Director Dr. Mohammad Azizul Haque, both highly experienced professionals in their respective fields.', category: 'operations' },
  { q: 'How will profit be distributed?', a: 'Profit will be distributed transparently among shareholders based on the benefit codes (B-1 to B-8). Financial statements will be audited and shared regularly with all investors.', category: 'investment' },
  { q: 'What are the profit expectations?', a: 'Profit expectations are based on the revenue generated from all 11 business wings. As the complex becomes fully operational, returns are expected to grow significantly. Detailed projections are available upon request.', category: 'investment' },
  { q: 'How is transparency ensured?', a: 'Transparency is maintained through regular audits, open financial reporting, shareholder meetings, and an administrative office on Level 9 for direct investor engagement.', category: 'operations' },
  { q: 'Is there a buyback policy?', a: 'Yes! After 3 years, shares can be bought back at 5% higher than the purchase price, providing a guaranteed exit option for investors.', category: 'shares' },
  { q: 'How to book a space?', a: 'You can book a space by contacting our office at 01335-074940 or 01335-074941, or by visiting our office at Probortok Circle, Badshah Miah Road, Ameerbag, Chattogram.', category: 'general' },
  { q: 'What documents are required from the shareholder?', a: 'Required documents: (1) National ID card (photocopy), (2) Nominee national ID card (photocopy), (3) 2 passport-size photographs, (4) Completed application form with TK 10,000 application fee. Our team will guide you through the entire process.', category: 'legal' },
  { q: 'What documents are provided by Hayat Life Care?', a: 'You will receive: (1) Share certificate, (2) Share transfer form, (3) Receipt of payment, (4) Memorandum of Understanding, (5) Company registration documents. All documents are legally binding and government-recognized.', category: 'legal' },
  { q: 'What is the expected handover date?', a: 'The commercial operations are targeted to begin by December 2028. Construction is progressing on schedule. Shareholders will be notified with regular updates.', category: 'operations' },
  { q: 'Will any bank loan be taken?', a: 'No. Hayat Life Care will not take any bank loan. The project is entirely funded by shareholder investments, ensuring no debt burden on the company.', category: 'investment' },
  { q: 'What is the maximum number of shares?', a: 'A total of 4,950 shares are available, each priced at 10 Lacs BDT. This limited number ensures exclusivity and higher per-share value.', category: 'shares' },
  { q: 'Can I sell my shares/directorship?', a: 'Yes, shareholders can sell their shares with prior written approval from Hayat Life Care management. A royalty fee of 10% of profit is payable to Hayat Life Care before transaction completion. Original investment amount plus 90% of profit goes to the seller.', category: 'shares' },
  { q: 'What is the share structure?', a: '1st Phase: 2,500 shares at 10 Lacs each = 250 Crores. 2nd Phase: 500 shares at 15 Lacs each = 75 Crores. 3rd Phase: 1,000 shares at 20 Lacs each = 200 Crores. Total shares will not exceed 4,950.', category: 'shares' },
]

export const doctorsData = [
  { name: 'Dr. Fatima Begum', specialty: 'Gynecology', designation: 'Senior Consultant', floor: 'Level 7', schedule: 'Sat-Wed, 10AM-2PM' },
  { name: 'Dr. Rashid Ahmed', specialty: 'Cardiology', designation: 'Professor & Head', floor: 'Level 4', schedule: 'Sun-Thu, 4PM-8PM' },
  { name: 'Dr. Nasreen Akter', specialty: 'Oncology', designation: 'Consultant Oncologist', floor: 'Level 6', schedule: 'Sat-Tue, 9AM-1PM' },
  { name: 'Dr. Kamal Hossain', specialty: 'Dental', designation: 'Dental Surgeon', floor: 'Level 8', schedule: 'Sat-Thu, 10AM-6PM' },
  { name: 'Dr. Sharmin Sultana', specialty: 'Gynecology', designation: 'Fertility Specialist', floor: 'Level 7', schedule: 'Sun-Thu, 3PM-7PM' },
  { name: 'Dr. Imran Khan', specialty: 'Cardiology', designation: 'Interventional Cardiologist', floor: 'Level 4', schedule: 'Sat-Wed, 5PM-9PM' },
  { name: 'Dr. Tahmina Chowdhury', specialty: 'Oncology', designation: 'Radiation Oncologist', floor: 'Level 6', schedule: 'Mon-Fri, 9AM-3PM' },
  { name: 'Dr. Rezaul Karim', specialty: 'General', designation: 'General Physician', floor: 'Level 5', schedule: 'Sat-Thu, 10AM-5PM' },
]

export const lightboxImages = [
  { src: '/images/wings/floor_above9_hospital_1777181082667.png', alt: 'Hayat Life Care Complex', category: 'Exterior' },
  { src: '/images/wings/gallery_lobby.png', alt: 'Premium Reception & Waiting Area', category: 'Interior' },
  { src: '/images/wings/floor_level5_doctors_1777180964055.png', alt: 'Modern Doctor Consultation Room', category: 'Facilities' },
  { src: '/images/wings/floor_level3_diagnostic_1777180930090.png', alt: 'Advanced Pathology Laboratory', category: 'Facilities' },
  { src: '/images/wings/gallery_pharmacy.png', alt: '24/7 Pharmacy', category: 'Services' },
  { src: '/images/wings/floor_level2_restaurant_1777180900345.png', alt: 'Hygienic Restaurant & Cafe', category: 'Services' },
  { src: '/images/wings/gallery_supershop.png', alt: 'Super Shop & Daily Needs', category: 'Services' },
  { src: '/images/wings/floor_basement_parking_1777180869390.png', alt: 'Spacious Basement Parking', category: 'Exterior' },
]
