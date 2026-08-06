import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/site/sections";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "DP Engineering — Hydraulic Pumps, Valves & Industrial Components" },
      {
        name: "description",
        content:
          "Trusted B2B supplier of premium hydraulic pumps, motors, valves and engineering components. Rexroth, Parker, Yuken, Danfoss and more — with pan-India delivery.",
      },
      { property: "og:title", content: "DP Engineering — Engineering Precision. Delivering Performance." },
      {
        property: "og:description",
        content:
          "Premium hydraulic pumps, industrial components and engineering solutions for the industries that keep the country running.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});