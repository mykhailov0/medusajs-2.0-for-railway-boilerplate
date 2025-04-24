// src/app/page.tsx

import React from 'react'
import Hero from '@modules/home/components/hero'

export const metadata = {
  title: 'Головна сторінка',
  description: 'Магазин вінілових платівок - Головна',
}

export default function Page() {
  return (
    <>
      <Hero />
      {/* Тут можна додати інші секції: NewArrivals, FeaturedCollections, Footer тощо */}
    </>
  )
}
