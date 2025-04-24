// src/app/layout.tsx
import { getBaseURL } from "@lib/util/env";
import { Metadata } from "next";
import "styles/globals.css";
import { MedusaProvider } from "medusa-react";
import { QueryClient } from "@tanstack/react-query";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <MedusaProvider
          baseUrl={
            process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
          }
          queryClientProviderProps={{ client: queryClient }}
        >
          <main className="relative">{children}</main>
        </MedusaProvider>
      </body>
    </html>
  );
}