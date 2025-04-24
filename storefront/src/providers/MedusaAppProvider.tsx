// src/providers/MedusaAppProvider.tsx
"use client"

import React, { useState } from "react"
import { MedusaProvider } from "medusa-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export function MedusaAppProvider({ children }: { children: React.ReactNode }) {
  // Створюємо QueryClient тільки один раз
  const [queryClient] = useState(() => new QueryClient())

  return (
    <MedusaProvider
      baseUrl={process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"}
      queryClientProviderProps={{ client: queryClient }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </MedusaProvider>
  )
}
