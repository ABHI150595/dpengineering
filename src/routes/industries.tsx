import { createFileRoute } from "@tanstack/react-router";
import { PageHero, IndustriesGrid, CTA } from "@/components/site/sections";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — DP Engineering" },
      { name: "description", content: "Hydraulic and industrial components for construction, mining, manufacturing, marine, agriculture, steel and power sectors." },
      { property: "og:title", content: "Industries — DP Engineering" },
      { property: "og:description", content: "Powering the sectors that keep the country running." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Solutions for every <span className="text-gradient-brand">industrial vertical.</span></>}
        subtitle="From open-cast mines to precision manufacturing lines, DP Engineering supplies the hydraulic power, motion control and spare parts that keep production moving."
      />
      <IndustriesGrid />
      <CTA />
    </>
  );
}