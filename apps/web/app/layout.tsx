import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { CartProvider } from "@/lib/cart-context";
import { brandName, siteDescription, siteTitle } from "@/lib/data";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"], 
  variable: "--font-poppins",
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${brandName} | ${siteTitle}`,
  description: siteDescription
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-inter antialiased text-[15px] leading-relaxed">
        <CartProvider>
          <SiteShell>{children}</SiteShell>
        </CartProvider>
      </body>
    </html>
  );
}
