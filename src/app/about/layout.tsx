import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Hayat Life Care',
  description: "Learn about Hayat Life Care's vision, mission, and leadership team building a healthier future for Chattogram.",
  openGraph: {
    title: 'About Us | Hayat Life Care',
    description: "Learn about Hayat Life Care's vision, mission, and leadership team building a healthier future for Chattogram.",
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
