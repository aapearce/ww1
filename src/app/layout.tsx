import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'The Great War — 1914–1918',
  description: 'An interactive educational platform about World War One for ages 8–18.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProvider>
          <Navbar />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
