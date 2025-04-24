// app/layout.tsx
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import InternationalDestinations from '@/components/InternationalDestinations';
import FeaturesSection from '@/components/FeaturesSection';
import RecaptchaLoader from '@/components/RecaptchaLoader';

import Script from 'next/script';
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: 'FareFirst',
  description: 'Travel Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">

      <Script 
      strategy='beforeInteractive'
      
      src="https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}" />
        <Header />
        <main className="flex-grow">{children}
         <RecaptchaLoader />
         <Toaster />
        <InternationalDestinations />
        <FeaturesSection />
        </main>
        <Footer />
      </body>
    </html>
  );
}
