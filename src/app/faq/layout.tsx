import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Common Questions | Hayat Life Care',
  description: 'Find answers to frequently asked questions about our hospital, services, and investment opportunities.',
  openGraph: {
    title: 'Common Questions | Hayat Life Care',
    description: 'Find answers to frequently asked questions about our hospital, services, and investment opportunities.',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
