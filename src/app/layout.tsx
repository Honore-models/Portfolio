import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Niyogushimwa Honore | Machine Learning Engineer",
  description:
    "ML Engineer portfolio - building intelligent systems that learn and evolve. Specialized in Machine Learning, Deep Learning, and MLOps.",
  icons: {
    icon: [
      { url: "/honore_logo.svg", type: "image/svg+xml" },
      { url: "/logo.png",        type: "image/png"     },
    ],
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full font-sans text-foreground bg-deep">
        {children}
      </body>
    </html>
  );
}
