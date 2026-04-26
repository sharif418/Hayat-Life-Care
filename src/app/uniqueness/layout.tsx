import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Choose Us | Hayat Life Care',
  description: 'Discover the unique advantages of Hayat Life Care, the first zero-interest, halal healthcare complex in Chattogram.',
  openGraph: {
    title: 'Why Choose Us | Hayat Life Care',
    description: 'Discover the unique advantages of Hayat Life Care, the first zero-interest, halal healthcare complex in Chattogram.',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
