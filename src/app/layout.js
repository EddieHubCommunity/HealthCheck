import { getServerSession } from "next-auth/next";
import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import classNames from "@/utils/classNames";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import flagsmith from "@/config/flagsmith";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Open Source GitHub repo HealthCheck",
  description: "Is your Open Source GitHub repo friendly?",
};

export default async function RootLayout({ children }) {
  const flagsmithServerState = await flagsmith();
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <Providers serverState={flagsmithServerState}>
        <body
          className={classNames(
            "bg-slate-900 text-white flex flex-col min-h-screen",
            inter.className,
          )}
        >
          <Banner />
          <Header session={session} />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            {children}
          </main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
