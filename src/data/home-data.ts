import {
  Building2, Car, CreditCard, Pill, Glasses, ShoppingBag, Coffee, CupSoda,
  UtensilsCrossed, Baby, Stethoscope, Microscope, TrendingUp, Heart, HeartPulse,
  UserCheck, Users, Shield, Award, Star, FileCheck, Settings
} from 'lucide-react'

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about', children: [
    { label: 'About Us', href: '/about' },
    { label: 'Vision & Mission', href: '/about#vision' },
    { label: 'Leadership', href: '/about#leadership' },
    // { label: 'Timeline', href: '/about#timeline' }, // Hidden per client request
  ]},
  { label: 'Facilities', href: '/facilities', children: [
    { label: '11 Business Wings', href: '/facilities#services' },
    { label: 'Floor Plan', href: '/facilities#floors' },
    // { label: 'Doctors', href: '/facilities#doctors' }, // Hidden per client request
    { label: 'Gallery', href: '/facilities#gallery' },
    // { label: 'Virtual Tour', href: '/facilities#virtual-tour' }, // Hidden per client request
  ]},
  { label: 'Uniqueness', href: '/uniqueness', children: [
    { label: 'Why Choose Us', href: '/uniqueness' },
    { label: 'Comparison Table', href: '/uniqueness#comparison-table' },
  ]},
  { label: 'Ownership', href: '/investment' },
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
    image: '/images/wings/floor_basement.jpg',
    description: 'Secure and spacious paid parking facility with state-of-the-art surveillance and valet service for your convenience.',
    facilities: ['3 basements with 150+ paid parking spaces'],
  },
  {
    id: 'level1',
    label: 'Level 1',
    image: '/images/wings/floor_level1.jpg',
    description: 'Ground floor retail hub providing essential daily needs — from groceries to pharmaceuticals, all under one roof.',
    facilities: ['Reception', 'Super Shop', 'Pharmacy', 'Optical Shop', 'Coffee Shop', 'ATM Booth'],
  },
  {
    id: 'level2',
    label: 'Level 2',
    image: '/images/wings/floor_level2.jpg',
    description: 'Food, refreshment, and family entertainment zone designed for relaxation and joy.',
    facilities: ['Restaurant', 'Juice Bar', "Kid's Amusement Park"],
  },
  {
    id: 'level3',
    label: 'Level 3',
    image: '/images/wings/floor_level3.jpg',
    description: 'Comprehensive pathology and diagnostic laboratory equipped with advanced testing capabilities.',
    facilities: ['Common Diagnostic Floor', 'Pathology', 'Microbiology', 'Immunology & Serology', 'Biochemistry', 'Hematology', 'MRI', 'ECG', 'USG', 'X-Ray'],
  },
  {
    id: 'level4',
    label: 'Level 4',
    image: '/images/wings/floor_level4.jpg',
    description: 'Dedicated and designated diagnostic floor for female patients.',
    facilities: ["Designated Female Diagnostic Floor"],
  },
  {
    id: 'level5',
    label: 'Level 5',
    image: '/images/wings/floor_level5.jpg',
    description: 'Specialized consultation floor.',
    facilities: ['Specialized Hospital'],
  },
  {
    id: 'level6',
    label: 'Level 6',
    image: '/images/wings/floor_level6.jpg',
    description: 'Cutting-edge oncology diagnostics.',
    facilities: ['Specialized Hospital', 'Cancer Institute - PET CT Scan'],
  },
  {
    id: 'level7',
    label: 'Level 7',
    image: '/images/wings/floor_level7.jpg',
    description: 'Dedicated fertility institute offering world-class reproductive care and counseling.',
    facilities: ['Specialized Hospital', 'Fertility Institute'],
  },
  {
    id: 'level8',
    label: 'Level 8',
    image: '/images/wings/floor_level8.jpg',
    description: 'Top-floor specialist center for ophthalmology, dental surgery.',
    facilities: ['Specialized Hospital', 'Ophthalmology', 'Dental / Oral & Maxillofacial Surgery'],
  },
  {
    id: 'level9',
    label: 'Level 9',
    image: '/images/wings/floor_level9.jpg',
    description: 'Dedicated prayer area and corporate offices.',
    facilities: ["Mosque (Male & Female)", "Office"],
  },
  {
    id: 'above9',
    label: 'Above Level 9',
    image: '/images/wings/floor_above9.jpg',
    description: 'Advanced specialized hospital facilities.',
    facilities: [
      "Specialized Cancer Hospital",
      "Specialized Heart Hospital",
      "Specialized Kidney Hospital",
      "Gynecology & Obstetrics"
    ],
  },
]

export const services = [
  { icon: Microscope, title: 'Diagnostic Center', desc: 'AI-powered advanced diagnostics with full pathology lab' },
  { icon: Car, title: 'Paid Parking', desc: '150+ paid parking spaces across 3 basements with CCTV surveillance' },
  { icon: ShoppingBag, title: 'Super Shop', desc: 'Largest supershop in the complex' },
  { icon: CreditCard, title: 'ATM Booth', desc: 'On-site ATM for secure cash access & payments' },
  { icon: Pill, title: 'Pharmacy', desc: 'Authentic medicines from authorized manufacturers' },
  { icon: Glasses, title: 'Optical Shop', desc: 'Prescription glasses, frames & contact lenses' },
  { icon: Coffee, title: 'Coffee Shop', desc: 'Fresh brews & light snacks' },
  { icon: CupSoda, title: 'Juice Bar', desc: 'Fresh, nutrient-rich juices & smoothies' },
  { icon: UtensilsCrossed, title: 'Restaurant', desc: 'Nutritious meals with special diet options' },
  { icon: Baby, title: "Kid's Amusement Park", desc: 'Indoor play zone for kids' },
  { icon: HeartPulse, title: 'Specialized Hospital', desc: 'Cancer, Heart, Kidney, Gyne & Obs — planned above Level 9' },
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
  leadership: { color: '#059669', icon: Building2 },
  medical: { color: '#EC4899', icon: Shield },
}

export const faqs = [
  // General (1-8)
  { q: 'What is Hayat Life Care?', a: 'Hayat Life Care is a one-stop lifestyle destination set to become the largest diagnostic and specialized hospital center in Chattogram. It is going to be the first cancer diagnostic center and the first specialized hospital in the city. It offers a combination of healthcare, daily essentials, wellness, and leisure facilities — all under one roof.', category: 'general' },
  { q: 'Is it a registered company?', a: 'Yes, Hayat Life Care is a registered company with RJSC (Registrar of Joint Stock Companies and Firms).', category: 'legal' },
  { q: 'Where is it located?', a: 'Corner plot of O.R. Nizam Road & Badsha Mia Road (War Cemetery Road), Chattogram. West of Chattogram Medical College and Hospital (CMCH).', category: 'general' },
  { q: 'What is the land area and structure?', a: 'Land Area: 55 Katha with 150+ paid parking spaces across 3 basements. Approximately 19,000 sft per floor, totaling around 266,000 sft up to the 14th level.', category: 'general' },
  { q: 'Are you the owner of the full building?', a: 'Yes, Hayat Life Care will be the sole owner of the land, building, and all business wings. The entire structure and all businesses will be managed under a single management.', category: 'general' },
  { q: 'What is the floor-wise plan?', a: 'Basement: 3 basements with 150+ parking spaces | Level 1: Reception, Super Shop, Pharmacy, Optical Shop, Coffee Shop & ATM Booth | Level 2: Restaurant, Juice Bar & Amusement Park | Level 3: Common Diagnostic Floor (Pathology, MRI, ECG, USG, X-Ray) | Level 4: Designated Female Diagnostic Floor | Level 5-8: Doctor\'s Chambers, Cancer Institute, Fertility Institute, Ophthalmology, Dental | Level 9: Mosque (Male & Female) & Office | Above Level 9: Specialized Hospital (Cancer, Heart, Kidney, Gynecology & Obstetrics)', category: 'operations' },
  { q: 'What is the complete plan?', a: 'Development of super shop, ATM booth, children\'s indoor amusement park, coffee shop, juice bar, restaurant, doctor consultation, and diagnostic center up to Level 8. Level 9 includes offices and a mosque. A specialized hospital is planned above Level 9 (subject to approval). Construction will be completed in a single phase.', category: 'operations' },
  { q: 'What is the expected handover/operation date?', a: 'Revenue generation: December 2028 (+9 months) | Diagnostic operations start: June 2029 (+9 months) | Full diagnostic operations: December 2029 (+9 months) | Hospital operations: March 2030 (+9 months)', category: 'operations' },
  // Investment (9-16)
  { q: 'Why invest in Hayat Life Care?', a: 'Largest diagnostic and consultation center in Chattogram. First Cancer diagnostic center and first Specialized Hospital in the city. Unique concept combining healthcare and lifestyle. Includes restaurants, supermarkets, amusement parks, cafés, ATM booths. 150+ car parking spaces. Prime location with high visibility. 11 business wings under one roof with single management.', category: 'investment' },
  { q: 'Will there be a hospital?', a: 'Yes, a specialized hospital is planned above Level 9, subject to approval from relevant authorities. Construction will be completed in a single phase.', category: 'operations' },
  { q: 'Who will operate the company?', a: 'The company will be run by highly skilled professionals (operational team), similar to organizations like Unilever, GSK, and Standard Chartered. A Management Committee from the Board of Directors will supervise operations closely.', category: 'operations' },
  { q: 'Who is leading Hayat Life Care?', a: 'The project is led by Chairman Capt. Md Showkat Hossain Chowdhury and Managing Director Dr. Mohammad Azizul Haque, along with founding directors.', category: 'leadership' },
  { q: 'Who is the Chairman?', a: 'Capt. Md Showkat Hossain Chowdhury — a seasoned Master Mariner who currently serves as the Chairman of Marinus Pvt. Ltd., Hayat Holdings and Hayat Life Care. He brings a distinguished track record of leadership spanning the marine and construction industries at both national and international levels.', category: 'leadership' },
  { q: 'Who is the Managing Director?', a: 'Dr. Mohammad Azizul Haque — the Founder Director of Park View Hospital, Ekhusey Hospital, Delta Hospital and Treatment Hospital in Chattogram. He also serves as an Associate Professor at Chattogram Medical College & Hospital, demonstrating a strong commitment to both medical education and patient care.', category: 'leadership' },
  { q: 'How will profit be distributed?', a: 'Profit will be distributed monthly to shareholders based on their share proportion after full operation begins and annually in the AGM.', category: 'investment' },
  { q: 'What are the profit expectations?', a: 'Based on feasibility studies and market surveys, the project is expected to be financially strong, as healthcare is a leading source of sustainable income in Bangladesh. The expected distributable profit is around 10% from the 3rd year, with potential for steady growth.', category: 'investment' },
  // Transparency & Legal (17-22)
  { q: 'How will transparency and accountability be ensured?', a: 'The company will be audited by government-approved third-party audit firms.', category: 'legal' },
  { q: 'Do I get registration of land/building?', a: 'For a company, all assets are always registered under the company name. All shareholders, including founder directors, are the combined owners of the spaces including land proportionately. So, you will not get separate registration but you are an owner.', category: 'legal' },
  { q: 'Is there a buyback policy?', a: 'Yes, after 3 years of operation at 5% higher than the share value.', category: 'shares' },
  { q: 'If my spouse/relative is a doctor, will they get benefits?', a: 'Yes. During allocation of chambers or job opportunities, if qualifications are equal or slightly lower, management may prioritize candidates recommended by shareholders. However, quality standards must be maintained and opportunities are subject to availability.', category: 'general' },
  { q: 'Do I need to pay extra for the hospital?', a: 'No. You do not need to make any additional payments for hospital establishment or any other purpose. Your payment is fixed as per the agreement.', category: 'investment' },
  { q: 'When will hospital work start?', a: 'Construction will be completed in a single phase; hospital operation depends on approvals from relevant authorities.', category: 'operations' },
  // Shares & Booking (23-28)
  { q: 'How to book a share?', a: 'Interested individuals must visit the office and proceed after satisfaction. Contact: 01335-074940 / 01335-074941.', category: 'shares' },
  { q: 'What is the share price and benefit structure?', a: 'Bronze Shareholder (1 share, 10 Lacs): Benefits B1, B2, B8 | Silver Shareholder (2+ shares, 20-40 Lacs): Benefits B1, B2, B3, B8 | Gold Shareholder (5+ shares, 50-90 Lacs): Benefits B1, B2, B3, B4, B8 | Platinum Director (10+ shares, 1-1.4 Crore): Benefits B1-B5, B8 | Diamond Director (15+ shares, 1.5-1.9 Crore): Benefits B1-B6, B8 | VIP Director (20+ shares, 2+ Crore): All Benefits B1-B8', category: 'shares' },
  { q: 'From where will hospital funding come?', a: '1st Phase: 2,500 shares × 10 Lacs = 250 Crore | 2nd Phase: 500 shares × 15 Lacs = 75 Crore | 3rd Phase: 1,000 shares × 20 Lacs = 200 Crore. No bank loans will be taken.', category: 'investment' },
  { q: 'What is the maximum number of shares?', a: 'Maximum planned: 4,950 shares.', category: 'shares' },
  { q: 'Can I sell my shares/directorship?', a: 'Yes, with prior approval and applicable royalty.', category: 'shares' },
  { q: 'How many shares have been sold?', a: 'Currently, a significant number of shares have already been allocated. The first phase of share allocation is expected to be completed soon. Available shares are very limited and continue to change as sales are ongoing.', category: 'shares' },
  // Documentation (29-32)
  { q: 'What documents are required from the shareholder?', a: 'Shareholder\'s National ID card (photocopy) | Nominee\'s National ID card (photocopy) | 2 copies of passport-size photographs | Completed application form with BDT 60,000 application fee | Our team will guide you through the entire process.', category: 'legal' },
  { q: 'What is the mode of payment?', a: '50% on deed date, 25% within 30 days, 25% within 60–90 days.', category: 'investment' },
  { q: 'What documents will Hayat provide?', a: 'Agreement, Deposit slip, Receipt, Share certificate, and RJSC allotment letter.', category: 'legal' },
  { q: 'When will construction start?', a: 'After LUC approval from CDA.', category: 'operations' },
  // Advanced Questions (33-50)
  { q: 'Is it bigger than Evercare and Imperial Hospital?', a: 'No, but it will be the largest within the main medical hub area in Chattogram.', category: 'general' },
  { q: 'What is the minimum investment?', a: '1 share = BDT 10 Lacs.', category: 'investment' },
  { q: 'What is the maximum investment?', a: 'Up to BDT 10 Crore per individual.', category: 'investment' },
  { q: 'What is unique about this project?', a: 'Separate diagnostic floor for female patients, First PET scan in Chattogram, AI-based paperless healthcare, Largest parking facility, International collaborations, and 12 business wings under one roof.', category: 'general' },
  { q: 'What regulatory approvals are required?', a: 'CDA approval is required for construction. Application has been submitted.', category: 'legal' },
  { q: 'Has the project received approval from DGHS?', a: 'Hospital permission will be applied for after construction completion.', category: 'legal' },
  { q: 'What is the projected return on investment (ROI)?', a: 'Estimated ROI payback period is 5.3 years.', category: 'investment' },
  { q: 'What is the expected payback period?', a: 'Healthcare is a highly sustainable income sector in Bangladesh. Feasibility studies indicate profitability from the inception of operations. However, profit distribution is expected from the 3rd year onward.', category: 'investment' },
  { q: 'What are the main revenue streams?', a: 'The project has 11 business wings. The main revenue stream will be the cancer diagnostic center, as it is the first of its kind in the second-largest city, supported by the other business wings.', category: 'investment' },
  { q: 'Who are the key competitors?', a: 'There are no direct competitors with the same model. Most existing hospitals in Chattogram are traditional with limited recent modernization. Hayat Life Care is based on a new healthcare concept, giving it a unique position in the market.', category: 'general' },
  { q: 'What competitive advantages does Hayat Life Care have?', a: 'Modern healthcare model compared to traditional hospitals, better infrastructure and ample parking, unique model combining healthcare with lifestyle, and first-mover advantage as the first specialized cancer diagnostic and advanced hospital in the second largest city.', category: 'general' },
  { q: 'Is there a feasibility study available?', a: 'Yes, available at the office.', category: 'investment' },
  { q: 'What international standards are targeted?', a: 'ISO standards and WHO guidelines, along with the standards of our collaborative international healthcare partners.', category: 'operations' },
  { q: 'Will there be foreign partnerships?', a: 'Yes, we plan to collaborate with reputed hospitals and healthcare partners in countries where Bangladeshi patients frequently seek treatment, especially India, Thailand, and Singapore.', category: 'operations' },
  { q: 'Will there be a dividend policy?', a: 'Yes, details are available at the office. Dividends will be distributed monthly and a portion will be during the AGM.', category: 'investment' },
  { q: 'How frequently will financial reports be shared?', a: 'Annually through AGM.', category: 'legal' },
  { q: 'What governance structure ensures investor protection?', a: 'Investors are considered partners in the company. All partners/shareholders will be duly registered with RJSC in accordance with the Companies Act, ensuring legal transparency and protection.', category: 'legal' },
  { q: 'Are there exit options besides buyback?', a: 'Yes, a shareholder or director is completely free to sell or transfer their shares to anyone at any time. However, this is not applicable for the founding directors.', category: 'shares' },
  { q: 'What is the legal structure of the company?', a: 'The company will be converted to a PLC (Public Limited Company) after final confirmation of the number of shares.', category: 'legal' },
  { q: 'What is the plan for staff training?', a: 'Training is one of the most important key elements for success. Staff training and development will be carefully designed to ensure patients receive the highest level of care and professional service.', category: 'operations' },
  { q: 'Are there lock-in periods for shareholders?', a: 'Yes, there is a lock-in period of up to 3 years from the start of operation. However, shareholders are free to sell or transfer their shares to others in accordance with the company policy.', category: 'shares' },
  // Medical & Services
  { q: 'Is pediatric and family care available?', a: 'Yes, family-focused healthcare is a key priority at Hayat Life Care.', category: 'medical' },
  { q: 'What services are available?', a: 'Hayat Life Care has 11 Business Wings: Paid Parking, ATM Booth, Pharmacy, Optical Shop, Super Shop, Coffee Shop, Juice Bar, Restaurant, Kid\'s Amusement Park, Doctor\'s Chambers, and Diagnostic Center. Future expansion includes a specialized hospital.', category: 'general' },
  { q: 'Within 2 years, is it not very optimistic?', a: 'We have 11 business wings; among them, 10 can be started within 8 months of construction beginning. Example: Well Food, GEC operates business under a construction building by Equity.', category: 'operations' },
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
  { src: '/images/wings/floor_above9.jpg', alt: 'Hayat Life Care Complex', category: 'Healthcare' },
  { src: '/images/wings/floor_level1.jpg', alt: 'Premium Reception & Waiting Area', category: 'Facilities' },
  { src: '/images/wings/floor_level5.jpg', alt: 'Modern Doctor Consultation Room', category: 'Healthcare' },
  { src: '/images/wings/floor_level3.jpg', alt: 'Advanced Pathology Laboratory', category: 'Healthcare' },
  { src: '/images/wings/gallery_pharmacy.jpg', alt: '24/7 Pharmacy', category: 'Retail' },
  { src: '/images/wings/floor_level2.jpg', alt: 'Hygienic Restaurant & Cafe', category: 'Dining' },
  { src: '/images/wings/gallery_supershop.jpg', alt: 'Super Shop & Daily Needs', category: 'Retail' },
  { src: '/images/wings/floor_basement.jpg', alt: 'Spacious Basement Paid Parking', category: 'Facilities' },
]
