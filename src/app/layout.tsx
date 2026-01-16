import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { TerminalProvider } from "@/components/providers/TerminalProvider";
import { TabProvider } from '@/components/providers/TabProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Portfolio | VS Code Edition",
  description: "A developer portfolio styled like VS Code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <TerminalProvider>
            <TabProvider>
              <MainLayout>
                {children}
              </MainLayout>
            </TabProvider>
          </TerminalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
