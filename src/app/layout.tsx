import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WrapperLayout from "./WrapperLayout";
import ThemeRegistry from "./ThemeRegistry";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Avalia+",
  description: "Sistema de Controle de Notas de Alunos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <ThemeRegistry>
            <WrapperLayout>{children}</WrapperLayout>
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
