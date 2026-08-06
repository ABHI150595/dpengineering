import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Target, Users, Award } from "lucide-react";
import { PageHero, Intro, WhyUs, CTA, Stat } from "@/components/site/sections";
import { SectionEyebrow } from "@/components/site/chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About DP Engineering — Hydraulic & Industrial Solutions" },
      { name: "description", content: "DP Engineering supplies genuine hydraulic pumps, motors and valves to OEMs and plants across India with 15+ years of engineering expertise." },
      { property: "og:title", content: "About DP Engineering" },
      { property: "og:description", content: "A serious hydraulics partner for India's industrial floor." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { Icon: Target, title: "Precision First", body: "Every spec matches drawing. Every dispatch matches PO. Every time." },
  { Icon: Users, title: "Engineer-Led", body: "You're talking to hydraulic engineers, not a scripted call desk." },
  { Icon: Award, title: "Quality Assured", body: "ISO-aligned inspection with test certificates on every shipment." },
  { Icon: CheckCircle2, title: "Traceable Sourcing", body: "Authorised channels, warranty-backed, verifiable serials." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>Built for the <span className="text-gradient-brand">industrial floor.</span></>}
        subtitle="DP Engineering has served India's OEMs, plants and MRO teams since 2009 with premium hydraulic and industrial components — sourced right, shipped fast, backed by real engineering support."
      />

      <section className="bg-white">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionEyebrow>Our story</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold text-navy leading-tight">
              Fifteen years of keeping Indian industry moving.
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in Kolkata, DP Engineering grew from a specialist hydraulic parts trader into a
                trusted multi-brand supplier serving construction, mining, marine, steel and manufacturing
                sectors across every Indian state.
              </p>
              <p>
                Today we work directly with Bosch Rexroth, Parker, Yuken, Danfoss, Eaton and other
                globally-recognised names — giving OEMs a single accountable partner for pumps, motors,
                valves, filters, sealkits, sweeping brushes and industrial rubber products.
              </p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="rounded-3xl bg-surface-muted p-8"><Stat to={15} suffix="+" label="Years in industry" /></div>
            <div className="rounded-3xl bg-navy p-8 text-white"><div className="font-display text-4xl md:text-5xl font-semibold">800+</div><div className="mt-2 text-sm text-white/70">OEM & plant clients</div></div>
            <div className="rounded-3xl bg-brand p-8 text-white"><div className="font-display text-4xl md:text-5xl font-semibold">10k+</div><div className="mt-2 text-sm text-white/85">Catalog SKUs</div></div>
            <div className="rounded-3xl bg-surface-muted p-8"><Stat to={28} label="States delivered to" /></div>
          </motion.div>
        </div>
      </section>

      <section className="bg-surface-muted">
        <div className="container-x py-20 md:py-28">
          <div className="max-w-2xl">
            <SectionEyebrow>Our values</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold text-navy leading-tight">
              What we're stubborn about.
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-white border border-hairline p-7 hover:border-brand/40 hover:shadow-[0_30px_60px_-30px_rgba(30,53,101,0.25)] transition"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />
      <CTA />
    </>
  );
}