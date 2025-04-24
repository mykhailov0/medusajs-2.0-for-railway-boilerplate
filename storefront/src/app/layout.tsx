// src/app/layout.tsx
import { getBaseURL } from "@lib/util/env";
import { Metadata } from "next";
import "styles/globals.css";

// Використовуємо клієнтський провайдер з хуками
import { MedusaAppProvider } from "../providers/MedusaAppProvider";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <MedusaAppProvider>
          <main className="relative">{children}</main>
        </MedusaAppProvider>
      </body>
    </html>
  );
}
