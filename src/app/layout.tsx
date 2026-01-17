import type { Metadata } from "next";
import { Geist, Geist_Mono, Fira_Code, JetBrains_Mono, Roboto_Mono, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { TerminalProvider } from "@/components/providers/TerminalProvider";
import { TabProvider } from '@/components/providers/TabProvider';
import { SettingsProvider } from "@/components/providers/SettingsProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
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
        className={`${geistSans.variable} ${geistMono.variable} ${firaCode.variable} ${jetBrainsMono.variable} ${robotoMono.variable} ${sourceCodePro.variable} antialiased`}
      >
        <ThemeProvider>
          <SettingsProvider>
            <TerminalProvider>
              <TabProvider>
                <MainLayout>
                  {children}
                </MainLayout>
              </TabProvider>
            </TerminalProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
