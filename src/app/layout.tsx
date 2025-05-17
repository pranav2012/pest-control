// app/layout.tsx
import { Inter, Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import MainFooter from '@/components/Footer';
import Header from '@/components/Header';
import { QueryProvider } from '@/providers/query';
import { ThemeProvider } from '@/providers/theme';
import '@/styles/globals.css';
import type { ChildrenProps } from '@/types';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: false,
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Alpha Beneficent Care - Best Pest Control Services in Delhi NCR',
  description:
    'Professional pest control services in Delhi NCR. We offer general pest control, termite control, mosquito control, and more with eco-friendly solutions.',
  keywords:
    'pest control, delhi ncr, termite control, mosquito control, bed bugs control, sanitization services',
  metadataBase: new URL('https://alphabenificentcare.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://alphabenificentcare.com',
    title: 'Alpha Beneficent Care - Best Pest Control Services in Delhi NCR',
    description:
      'Professional pest control services in Delhi NCR with eco-friendly solutions',
    siteName: 'Alpha Beneficent Care',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alpha Beneficent Care - Pest Control Services',
    description:
      'Professional pest control services in Delhi NCR with eco-friendly solutions',
  },
};

export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <div className="flex min-h-screen bg-[var(--background)] w-full overflow-x-hidden">
              <div className="flex-1 flex flex-col w-full">
                <Header />
                <main className="flex-1 w-full overflow-x-hidden pt-[160px]">
                  {children}
                </main>
                <MainFooter />
              </div>
            </div>
            <Toaster
              position="bottom-right"
              toastOptions={{
                className:
                  'bg-[var(--card)] text-[var(--foreground)] border-[var(--border)]',
                duration: 3000,
              }}
            />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
