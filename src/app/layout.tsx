import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import QueryProvider from '@/providers/QueryProvider';
import { ToastProvider } from '@/components/feedback/Toast';
import { TargetCursor } from '@/components/ui/TargetCursor';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Smart Logistics Tracking Dashboard',
    template: '%s | Smart Logistics',
  },
  description: 'Monitor and manage shipments across the logistics network with real-time tracking, status updates, and route visualization.',
  keywords: ['logistics', 'shipment tracking', 'dashboard', 'supply chain', 'transportation'],
  authors: [{ name: 'Smart Logistics Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://smart-logistics.example.com',
    siteName: 'Smart Logistics Tracking Dashboard',
    title: 'Smart Logistics Tracking Dashboard',
    description: 'Monitor and manage shipments across the logistics network',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Logistics Tracking Dashboard',
    description: 'Monitor and manage shipments across the logistics network',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex min-h-full flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <TargetCursor
          targetSelector=".cursor-target, .stat-card, .shipment-row, .filter-dropdown button, button, a, input, select"
          spinDuration={3}
          hideDefaultCursor={true}
          hoverDuration={0.15}
          parallaxOn={true}
          cursorColor="#2563eb"
          cursorColorOnTarget="#ffffff"
        />
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}