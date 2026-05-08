import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingChat from "@/components/ui/FloatingChat";
import { SITE_CONFIG } from "@/data/products";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — Wrap-Dip-Enjoy`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    "GoNuts Bites — Inovasi camilan sehat bergaya Vietnamese spring roll dengan cita rasa gado-gado khas Indonesia. Segar, praktis, dan Instagramable untuk Gen Z Pekanbaru.",
  keywords: [
    "gado-gado roll",
    "camilan sehat",
    "healthy snack",
    "Pekanbaru",
    "Gen Z",
    "spring roll",
    "GoNuts Bites",
  ],
  openGraph: {
    title: `${SITE_CONFIG.name} — Wrap-Dip-Enjoy`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/logo-clean.svg",
    shortcut: "/logo-clean.svg",
    apple: "/logo-clean.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body className={`font-[var(--font-plus-jakarta)] antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingChat />
      </body>
    </html>
  );
}
