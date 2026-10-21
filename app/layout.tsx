import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Below, inside, or above',
  description: '10 is inside 10 to 20. 9 is below. 21 is above. Not advice to move liquidity.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
