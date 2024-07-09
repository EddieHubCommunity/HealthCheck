import { Inter } from "next/font/google";
import { createFlagsmithInstance } from "flagsmith/isomorphic";

import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import classNames from "@/utils/classNames";
import Banner from "@/components/Banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Open Source GitHub repo HealthCheck",
  description: "Is your Open Source GitHub repo friendly?",
};

export default async function RootLayout({ children }) {
  const flagsmith = createFlagsmithInstance();
  await flagsmith.init({
    environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_ENVIRONMENT_ID,
  });
  const serverState = flagsmith.getState();
  console.log(serverState);

  return (
    <html lang="en">
      <Providers serverState={serverState}>
        <body
          className={classNames("bg-slate-900 text-white", inter.className)}
        >
          <Banner />
          <Header />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </body>
      </Providers>
    </html>
  );
}
