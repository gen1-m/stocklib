import { GeistSans } from "geist/font/sans";
import { Providers } from "./providers";
import NavBar from "@/components/NavBar";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "StockLib v2.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.className} bg-background text-foreground`}>
        <Providers>
          <NavBar/>
            <main className="min-h-screen flex flex-col items-center">
              {children}
            </main>
        </Providers>
      </body>
    </html>
  );
}
