import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investment Opportunities | Hayat Life Care',
  description: 'Secure your future by investing in Hayat Life Care. Halal, high-yield shares starting at 10 Lacs BDT.',
  openGraph: {
    title: 'Investment Opportunities | Hayat Life Care',
    description: 'Secure your future by investing in Hayat Life Care. Halal, high-yield shares starting at 10 Lacs BDT.',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
