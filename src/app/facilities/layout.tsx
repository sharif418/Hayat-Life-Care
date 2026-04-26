import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Facilities | Hayat Life Care',
  description: 'Explore our 11 business wings including diagnostics, specialized doctors, pharmacy, dining, and daily essentials under one roof.',
  openGraph: {
    title: 'Our Facilities | Hayat Life Care',
    description: 'Explore our 11 business wings including diagnostics, specialized doctors, pharmacy, dining, and daily essentials under one roof.',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
