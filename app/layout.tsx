import type { Metadata } from 'next';
import React from 'react';
import '../src/styles/fonts.css';
import '../src/styles/index.css';
import '../src/styles/theme.css';

export const metadata: Metadata = {
  title: 'MailMaker - Email Client',
  description: 'A beautiful email client with AI assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
