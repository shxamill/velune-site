import type { Metadata } from 'next';
import { geist, newsreader, anton, spaceMono } from '@/lib/fonts';
import '@/styles/globals.css';
import { SmoothScrolling } from '@/components/common/SmoothScrolling';

export const metadata: Metadata = {
  title: 'Velune | Create. Capture. Elevate.',
  description: 'Velune is a creative studio built around stories, visuals, and ideas that move people.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${newsreader.variable} ${anton.variable} ${spaceMono.variable} antialiased`}>
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
