import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ideal Healthcare Staffing | Exceptional People. Exceptional Care.",
    template: "%s | Ideal Healthcare Staffing",
  },
  description:
    "Ideal Healthcare Staffing connects healthcare professionals with rewarding travel nursing, allied health, and direct-hire clinical opportunities across premier US health systems. The Right Professionals. The Right Place. The Right Time.™",
  keywords: [
    "healthcare staffing",
    "travel nursing jobs",
    "allied health staffing",
    "hospital staffing agency",
    "Los Angeles healthcare staffing",
    "ICU nurse jobs",
    "per diem nursing",
    "clinical recruitment US",
  ],
  authors: [{ name: "Ideal Healthcare Staffing" }],
  icons: {
    icon: "/images/logo.webp",
  },
  openGraph: {
    title: "Ideal Healthcare Staffing | Exceptional People. Exceptional Care.",
    description: "The Right Professionals. The Right Place. The Right Time.™ Verified travel nursing and healthcare facility staffing solutions.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#061530",
  width: "device-width",
  initialScale: 1,
};

// Anti-flash inline script to prevent theme flickering on page load
const themeInitScript = `
  (function() {
    try {
      var stored = localStorage.getItem('ihs-theme-preference');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (stored === 'dark' || (!stored && prefersDark) || (stored === 'system' && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#FBFBFA] dark:bg-[#070E1A] text-[#0B1B3D] dark:text-[#E2E8F0] antialiased transition-colors duration-200">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
