import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${APP_NAME} | ${APP_TAGLINE}`,
  description:
    'A voice-first AI career coach for Indian students, especially from Tier 2 and Tier 3 cities who struggle with English communication and interview preparation. Powered by Gnani AI Prisma STT and Timbre TTS.',
  keywords: [
    'AwaazPath',
    'Gnani AI',
    'Voice AI',
    'Prisma STT',
    'Timbre TTS',
    'Interview Coach',
    'Tier 2 Students',
    'Hinglish to English',
    'Great Indian AI Internship Challenge',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-gray-100 min-h-screen flex flex-col antialiased selection:bg-brand-500/30 selection:text-white">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
