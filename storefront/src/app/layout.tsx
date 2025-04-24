// src/app/layout.tsx
import { Metadata } from "next"
import "styles/globals.css"
import { MedusaAppProvider } from "../providers/MedusaAppProvider"

export const metadata: Metadata = {
  title: "...",
  description: "...",
  // Якщо вам потрібен BASE_URL для якихось лінків:
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <MedusaAppProvider>
          <main>{children}</main>
        </MedusaAppProvider>
      </body>
    </html>
  )
}
