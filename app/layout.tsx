import { Roboto } from "next/font/google";
import { Providers } from "./providers";
import NavBar from "@/components/NavBar";
import "./globals.css";
import AuthButton from "@/components/AuthButton";
import ProfileLink from "@/components/ProfileLink";
import { Analytics } from '@vercel/analytics/next';

const font = Roboto({ subsets: ['latin'], weight: ['400'] })

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
      <body className={`${font.className} bg-background text-foreground`}>
        <Providers>
          <NavBar authButton={<AuthButton/>} profileLink={<ProfileLink />}/>
            <main className="min-h-screen flex flex-col items-center">
              {children}
              <Analytics />
            </main>
        </Providers>
      </body>
    </html>
  );
}
