import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageHero, BrandsMarquee, CTA } from "@/components/site/sections";
import { SectionEyebrow } from "@/components/site/chrome";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Brands We Deal In — DP Engineering" },
      { name: "description", content: "Authorised supplier of Bosch Rexroth, Parker Hannifin, Yuken, Danfoss, Eaton, M+S Hydraulics, Dowty, THM Hydraulics, Bucher Hydraulics and more." },
      { property: "og:title", content: "Brands — DP Engineering" },
      { property: "og:description", content: "Genuine parts from the world's most trusted hydraulic and industrial manufacturers." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/brands" }],
  }),
  component: BrandsPage,
});

const BRANDS = [
  { name: "Bosch Rexroth", tag: "Hydraulic pumps, motors, valves" },
  { name: "Parker Hannifin", tag: "Motion & control systems" },
  { name: "Yuken", tag: "Vane pumps & directional valves" },
  { name: "Danfoss", tag: "Mobile hydraulics" },
  { name: "Veljan", tag: "Vane pumps & valves" },
  { name: "Polyhydron", tag: "High-pressure piston pumps" },
  { name: "Eaton", tag: "Industrial hydraulics" },
  { name: "M+S Hydraulics", tag: "Orbital hydraulic motors" },
  { name: "Dowty", tag: "Gear pumps & hydraulic components" },
  { name: "THM Hydraulics", tag: "Hydraulic motors & pumps" },
  { name: "Bucher Hydraulics", tag: "Hydraulic systems & components" },
  { name: "Sun Hydraulics", tag: "Cartridge valves" },
];

function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="Brand partners"
        title={<>Genuine parts from the <span className="text-gradient-brand">world's best.</span></>}
        subtitle="We source through authorised channels — with traceable serials, factory warranty and test certificates on every dispatch."
      />
      <BrandsMarquee />

      <section className="bg-surface-muted">
        <div className="container-x py-20 md:py-28">
          <div className="max-w-2xl">
            <SectionEyebrow>Multi-brand catalog</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold text-navy leading-tight">
              One partner. Every major hydraulic name.
            </h2>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {BRANDS.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  to="/products"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-hairline bg-white p-6 hover:border-brand/50 hover:shadow-[0_20px_40px_-20px_rgba(30,53,101,0.25)] transition"
                >
                  <div>
                    <div className="font-display text-lg font-semibold text-navy">{b.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{b.tag}</div>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-navy group-hover:bg-brand group-hover:border-brand group-hover:text-white transition">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}