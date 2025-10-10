import { Jomolhari, Kantumruy_Pro, Outfit } from "next/font/google";
import "./globals.sass";
import { Toaster } from "sonner";

const jomolHari = Jomolhari({
  variable: "--font-jomol-hari",
  weight: "400",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const kantumruyPro = Kantumruy_Pro({
  variable: "--font-kantumruy-pro",
  subsets: ["latin"],
});

export const metadata = {
  title: "Veb Invoice",
  description:
    "Manage your business invoicing smarter with VebInvoice — a complete web-based invoice management tool by Veb Edge. Create, edit, send, and track invoices online. Choose between free or premium plans, access your invoices anywhere, and simplify your billing workflow with modern efficiency.",
  keywords: [
    "VebInvoice",
    "invoice management system",
    "online invoicing software",
    "Veb Edge invoicing",
    "invoice tracking tool",
    "business billing app",
    "subscription invoice platform",
    "freemium invoicing software",
    "create and send invoices online",
    "manage invoices online"
  ],
  openGraph: {
    title: "VebInvoice – Smart, Simple & Secure Invoice Management",
    description:
      "Experience next-level invoicing with VebInvoice — manage, send, and track invoices in one place. Powered by Veb Edge with both free and premium plans.",
    url: "https://invoice.vebedge.com",
    siteName: "VebInvoice",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "VebInvoice | Online Invoice Management by Veb Edge",
    description:
      "Simplify your invoicing — create, send, and track invoices easily with VebInvoice. Freemium and premium options available.",
    creator: "@vebedge"
  },
  robots: {
    index: true,
    follow: true
  },
  authors: [{ name: "Veb Edge", url: "https://vebedge.com" }]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jomolHari.variable} ${kantumruyPro.variable} ${outfit.variable}`}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
