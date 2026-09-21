import type { Metadata } from 'next';
import { geist } from '@/lib/fonts';
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
      <body className={`${geist.variable} antialiased`}>
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
