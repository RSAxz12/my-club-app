import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "نادي — منصة النوادي والمدربين الرياضيين",
  description:
    "اكتشف النوادي الرياضية والمدربين المتخصصين في خميس مشيط، وابحث حسب الحي والرياضة والسعر.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body>{children}</body>
    </html>
  );
}