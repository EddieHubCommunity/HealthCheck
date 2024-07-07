import { Inter } from "next/font/google";
import { createFlagsmithInstance } from "flagsmith/isomorphic";

import "./globals.css";
import Providers from "./providers";

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
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
