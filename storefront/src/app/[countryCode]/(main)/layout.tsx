import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
//import Nav from "@modules/layout/templates/nav"
import { getBaseURL } from "@lib/util/env"
// з layout.tsx в src/app/[countryCode]/(main)/layout.tsx
import Header from '../../../components/Header'


export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}
