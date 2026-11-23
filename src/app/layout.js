import { Inter, Noto_Sans_Bengali, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-bengali-serif",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  weight: ["400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-bengali-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://manhajarchive.xyz"),
  title: {
    default: "Manhaj Archive | বিশুদ্ধ ইসলামি জ্ঞান, কিতাব গাইড ও মানহাজ পোর্টাল",
    template: "%s | Manhaj Archive",
  },
  description:
    "কুরআন, সহীহ সুন্নাহ ও সালাফে সালেহীনদের মূলনীতির আলোকে আকিদা, উসূল, নির্ভরযোগ্য কিতাব পরিচিতি, প্রশ্নোত্তর এবং চলমান ফিতনা ওভারভিউ।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className="dark">
      <body
        className={`${inter.variable} ${notoSerifBengali.variable} ${notoSansBengali.variable} font-bengali flex min-h-screen flex-col bg-(--bg-main) text-(--text-main) antialiased selection:bg-[#2E8B57] selection:text-white`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}