import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Hayat Life Care',
  description: 'Get in touch with Hayat Life Care for appointments, emergency support, and investment inquiries.',
  openGraph: {
    title: 'Contact Us | Hayat Life Care',
    description: 'Get in touch with Hayat Life Care for appointments, emergency support, and investment inquiries.',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
