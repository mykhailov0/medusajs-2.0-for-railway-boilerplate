import dynamic from "next/dynamic";

const HeroSliderClient = dynamic(
  () => import("@modules/home/components/hero/HeroSliderClient"),
  { ssr: false }
);

export default async function HomePage() {
  return (
    <>
      {/* інші секції */}
      <HeroSliderClient />
      {/* інші секції */}
    </>
  );
}
