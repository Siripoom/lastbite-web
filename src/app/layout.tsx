import type { Metadata, Viewport } from "next";
import { Noto_Sans, Noto_Sans_Thai } from "next/font/google";
import { Toaster } from "sonner";
import { ServiceWorkerRegister } from "@/components/customer/service-worker-register";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "LastBite",
  description: "ค้นหาอาหารลดราคาจากร้านใกล้คุณ และช่วยลดขยะอาหาร",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LastBite",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFD600",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${notoSans.variable} ${notoSansThai.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        <ServiceWorkerRegister />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
