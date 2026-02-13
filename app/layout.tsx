
import type { Metadata } from "next";
import { Geist, Geist_Mono, } from "next/font/google";
import "./globals.css";
import { flama } from "./fonts";
import { IdentityColors } from "@/constants/identityColors";
import { ReduxProvider } from "@/components/ReduxProviderWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Capitec Project",
  description: "Spending insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <ReduxProvider>
      <body
      
      
        className={`${geistSans.variable} ${geistMono.variable} ${flama.variable} antialiased`}
      >
        {children}
      </body>
      </ReduxProvider>
    </html>
  );
}
