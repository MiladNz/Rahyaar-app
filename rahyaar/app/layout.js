import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import LoginModal from "@/components/auth/LoginModal";
import { Toaster } from "sonner";
import Header from "@/components/header/Header";
import QueryProvider from "./providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rahyaar app",
  description: "Rahyaar Travel Agency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <Header />
          <LoginModal />
          <main>{children}</main>
          <Footer />
          <Toaster position="top-center" richColors expand />
        </QueryProvider>
      </body>
    </html>
  );
}
