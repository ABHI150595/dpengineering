import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CircleDot,
  Cog,
  Cpu,
  Download,
  Factory,
  FileText,
  Gauge,
  HeadphonesIcon,
  Mountain,
  Phone,
  Quote,
  ShieldCheck,
  Ship,
  Sparkles,
  Star,
  Tractor,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";

import heroImg from "@/assets/hero-machinery.jpg";
import pumpImg from "@/assets/product-pump.jpg";
import valveImg from "@/assets/product-valve.jpg";
import motorImg from "@/assets/product-motor.jpg";
import pistonImg from "@/assets/product-piston.jpg";
import { CONTACT, SectionEyebrow } from "./chrome";

/* ------------------------------ Data ------------------------------ */

export const categories = [
  { name: "Hydraulic Pumps", count: "120+ SKUs", img: pumpImg },
  { name: "Piston Pumps", count: "48 SKUs", img: pistonImg },
  { name: "Industrial Valves", count: "90+ SKUs", img: valveImg },
  { name: "Electric Motors", count: "60+ SKUs", img: motorImg },
  { name: "Hydraulic Motors", count: "35 SKUs", img: pumpImg },
  { name: "Spare Parts & Kits", count: "300+ SKUs", img: pistonImg },
];

export const featured = [
  { brand: "Rexroth", name: "A10VSO Axial Piston Pump", part: "A10VSO-71-DR/31R", specs: ["71 cc/rev", "280 bar", "Open circuit"], img: pistonImg },
  { brand: "Yuken", name: "PV2R Vane Pump Series", part: "PV2R2-53-F-RAA-41", specs: ["53 cc/rev", "175 bar", "Single stage"], img: pumpImg },
  { brand: "Parker", name: "D1VW Directional Valve", part: "D1VW020BNJW", specs: ["NG6 / D03", "350 bar", "Solenoid"], img: valveImg },
  { brand: "Danfoss", name: "MMF Series Hydraulic Motor", part: "OMR-100-151-0224", specs: ["100 cc/rev", "200 bar", "SAE-A"], img: motorImg },
];

export const industries = [
  { name: "Construction", Icon: Building2 },
  { name: "Mining", Icon: Mountain },
  { name: "Manufacturing", Icon: Factory },
  { name: "Marine", Icon: Ship },
  { name: "Agriculture", Icon: Tractor },
  { name: "Automation", Icon: Cpu },
  { name: "Steel Plants", Icon: Wrench },
  { name: "Power Plants", Icon: Zap },
];

export const brandList = [
  "Bosch Rexroth", "Parker Hannifin", "Yuken", "Danfoss", "Veljan",
  "Polyhydron", "Eaton", "Vickers", "Kawasaki", "Nachi",
];

export const whyUs = [
  { Icon: ShieldCheck, title: "100% Original Products", body: "Sourced through authorised channels with full traceability and warranty." },
  { Icon: Truck, title: "Pan-India Fast Delivery", body: "Same-day dispatch on stocked SKUs, express freight across every state." },
  { Icon: HeadphonesIcon, title: "Engineering Support", body: "Talk to real hydraulic engineers — not a call centre — for sizing & selection." },
  { Icon: Gauge, title: "Competitive Pricing", body: "Direct import & bulk contracts translate to sharper landed cost for OEMs." },
  { Icon: Sparkles, title: "Experienced Team", body: "15+ years serving India's toughest industrial sites and OEM assembly lines." },
  { Icon: FileText, title: "Quality Assured", body: "ISO-aligned inspection, test certificates and datasheets on every order." },
];

export const testimonials = [
  { quote: "DP Engineering became our default hydraulics partner within a quarter. Response time is measured in hours, not days.", name: "Rajesh K.", role: "Plant Head, Steel OEM" },
  { quote: "The technical team helped us re-spec a legacy Rexroth pump when the OEM discontinued it. Zero downtime on our line.", name: "Anita S.", role: "Maintenance Manager, Mining" },
  { quote: "Pricing is competitive, but honestly the reason we stay is the paperwork discipline — clean invoicing, test certs, on time.", name: "Vikram T.", role: "Procurement, Construction" },
];

/* ------------------------------ Helpers ------------------------------ */

function useCounter(to: number, active: boolean, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration]);
  return n;
}

export function Stat({ to, label, suffix = "" }: { to: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const n = useCounter(to, inView);
  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="font-display text-4xl md:text-5xl font-semibold text-navy tabular-nums">
        {n}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

/* ------------------------------ Reusable page hero ------------------------------ */

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="absolute inset-0 grid-lines opacity-[0.06]" />
      <div aria-hidden className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-navy/60 blur-3xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 hidden lg:block opacity-[0.04]"
        style={{ animation: "spin-slow 60s linear infinite" }}
      >
        <Cog className="h-[420px] w-[420px]" strokeWidth={0.5} />
      </div>
      <div className="relative container-x py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {eyebrow}
          </div>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------ Sections ------------------------------ */

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Hydraulic machinery detail" className="h-full w-full object-cover opacity-55" width={1600} height={1200} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
      </div>
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <Cog className="h-[520px] w-[520px] text-white/[0.05]" strokeWidth={0.5} />
      </motion.div>
      <div aria-hidden className="absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-brand/30 blur-3xl animate-pulse" />

      <div className="relative container-x pt-20 md:pt-28 lg:pt-32 pb-24 md:pb-32 lg:pb-40">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            Est. 2020 · Authorised industrial partner
          </div>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02]">
            Engineering Precision.
            <br />
            <span className="text-gradient-brand">Delivering Performance.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-white/70 leading-relaxed">
            Trusted supplier of premium hydraulic pumps, industrial components and engineering
            solutions to OEMs, plants and MRO teams across India.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/products" className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-16px_var(--brand)] hover:brightness-110 transition">
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
              Request a Quote
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="relative mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl">
          {[
            { k: "10+", v: "Years serving industry" },
            { k: "10k+", v: "Product SKUs" },
            { k: "100+", v: "OEM & plant clients" },
            { k: "28", v: "States delivered to" },
          ].map((s, i) => (
            <motion.div
              key={s.v}
              whileHover={{ y: -4, borderColor: "var(--brand)" }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-4 md:px-5 md:py-5 hover:bg-white/[0.08]"
            >
              <div className="font-display text-2xl md:text-3xl font-semibold text-white">{s.k}</div>
              <div className="mt-1 text-[11px] md:text-xs uppercase tracking-widest text-white/60">{s.v}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}

export function BrandsMarquee() {
  const doubled = [...brandList, ...brandList];
  return (
    <section className="border-b border-hairline bg-white py-8">
      <div className="container-x flex flex-col md:flex-row items-center gap-6">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground shrink-0">
          Trusted brands we deal in
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex gap-12 whitespace-nowrap" style={{ animation: "marquee 32s linear infinite", width: "max-content" }}>
            {doubled.map((b, i) => (
              <span key={i} className="font-display text-xl md:text-2xl font-semibold text-navy/70 tracking-tight">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Intro() {
  return (
    <section className="bg-white">
      <div className="container-x py-20 md:py-28 grid lg:grid-cols-12 gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-5">
          <SectionEyebrow>Who we are</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-navy leading-tight">
            A serious hydraulics partner for India's industrial floor.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            DP Engineering supplies genuine hydraulic pumps, motors, valves and precision
            components from the world's top manufacturers. From a single spare kit to full
            plant retrofits, we ship it with the documentation, warranty and engineering
            support that OEMs expect.
          </p>
          <div className="mt-8 flex gap-3 flex-wrap">
            <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-navy/90 transition">
              Browse the catalog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm font-semibold text-navy hover:bg-surface-muted transition">
              About us <Download className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
          <div className="rounded-3xl bg-surface-muted p-8"><Stat to={10} suffix="+" label="Years in industry" /></div>
          <div className="rounded-3xl bg-navy p-8 text-white"><div className="font-display text-4xl md:text-5xl font-semibold">100+</div><div className="mt-2 text-sm text-white/70">OEM & plant clients</div></div>
          <div className="rounded-3xl bg-brand p-8 text-white"><div className="font-display text-4xl md:text-5xl font-semibold">10k+</div><div className="mt-2 text-sm text-white/85">Catalog SKUs</div></div>
          <div className="rounded-3xl bg-surface-muted p-8"><Stat to={28} label="States delivered to" /></div>
        </motion.div>
      </div>
    </section>
  );
}

export function Categories() {
  return (
    <section className="bg-surface-muted">
      <div className="container-x py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <SectionEyebrow>Product categories</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold text-navy leading-tight">
              Everything a hydraulic system needs, in one catalog.
            </h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-brand transition">
            View full catalog <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -6 }}
            >
              <Link to="/products" className="group block relative overflow-hidden rounded-3xl border border-hairline bg-white p-6 hover:border-brand/50 hover:shadow-[0_30px_60px_-30px_rgba(30,53,101,0.35)] transition-all">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-muted">
                  <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg font-semibold text-navy">{c.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{c.count}</div>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-navy group-hover:bg-brand group-hover:border-brand group-hover:text-white transition">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Featured() {
  return (
    <section className="bg-white">
      <div className="container-x py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <SectionEyebrow>Featured products</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold text-navy leading-tight">
              High-demand SKUs, ready to quote.
            </h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-brand transition">
            All products <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p, i) => (
            <motion.div
              key={p.part}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col rounded-3xl border border-hairline bg-white overflow-hidden hover:border-brand/50 hover:shadow-[0_30px_60px_-30px_rgba(11,15,22,0.25)] transition"
            >
              <div className="relative aspect-square bg-surface-muted overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-navy bg-white/90 backdrop-blur px-2 py-1 rounded-full border border-hairline">
                  {p.brand}
                </div>
              </div>
              <div className="flex flex-col flex-1 p-5">
                <div className="font-display font-semibold text-navy leading-snug">{p.name}</div>
                <div className="mt-1 font-mono text-[11px] text-muted-foreground">{p.part}</div>
                <ul className="mt-3 space-y-1 text-xs text-navy/70">
                  {p.specs.map((s) => (
                    <li key={s} className="flex items-center gap-2"><CircleDot className="h-3 w-3 text-brand" /> {s}</li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-hairline flex items-center justify-between gap-2">
                  <Link to="/products" className="text-xs font-semibold text-navy hover:text-brand inline-flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5" /> Details
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:brightness-110">
                    Quote <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustriesGrid() {
  return (
    <section className="bg-ink text-white relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-lines opacity-[0.05]" />
      <div aria-hidden className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
      <div className="container-x py-20 md:py-28 relative">
        <div className="max-w-2xl">
          <SectionEyebrow>Industries we serve</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold leading-tight">
            Powering the sectors that keep the country running.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {industries.map(({ name, Icon }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-5 md:p-6 hover:bg-white/[0.08] hover:border-brand/40 transition"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/15 text-brand group-hover:bg-brand group-hover:text-white transition">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-5 font-display font-semibold">{name}</div>
              <div className="mt-1 text-xs text-white/50">Pumps · Valves · Spares</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="bg-surface-muted">
      <div className="container-x py-20 md:py-28">
        <div className="max-w-2xl">
          <SectionEyebrow>Why choose DP</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold text-navy leading-tight">
            The difference is in the details.
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyUs.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group rounded-3xl bg-white border border-hairline p-7 hover:border-brand/40 hover:shadow-[0_30px_60px_-30px_rgba(30,53,101,0.25)] transition"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white group-hover:bg-brand transition">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white">
      <div className="container-x py-20 md:py-28">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div className="max-w-2xl">
            <SectionEyebrow>What clients say</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold text-navy leading-tight">
              Trusted by procurement & maintenance teams across India.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-3xl border border-hairline bg-surface-muted/50 p-7"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-brand/25" />
              <div className="flex gap-0.5 text-brand">
                {Array.from({ length: 5 }).map((_, i2) => <Star key={i2} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-navy leading-relaxed">"{t.quote}"</p>
              <div className="mt-6 pt-4 border-t border-hairline">
                <div className="font-semibold text-navy">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="bg-surface-muted">
      <div className="container-x py-16 md:py-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy text-white p-8 md:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />
          <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-accent-glow/20 blur-3xl" />
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-10"
          >
            <Cog className="h-[360px] w-[360px]" strokeWidth={0.5} />
          </motion.div>

          <div className="relative grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <SectionEyebrow>Talk to our engineers</SectionEyebrow>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-semibold leading-tight">
                Need a hydraulic solution?
                <br />
                <span className="text-gradient-brand">We'll spec it, source it, ship it.</span>
              </h2>
              <p className="mt-4 max-w-xl text-white/70">
                Share your requirement — pump, motor, valve or a full BOM. You'll get a real
                engineering response, not a form-letter reply.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white hover:brightness-110">
                  Request a quote <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={CONTACT.phonePrimaryHref} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                  <Phone className="h-4 w-4" /> {CONTACT.phonePrimary}
                </a>
              </div>
            </div>

            <form className="lg:col-span-2 relative rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur p-6 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Name" className="rounded-lg bg-white/10 border border-white/10 px-3 py-2.5 text-sm placeholder:text-white/50 outline-none focus:border-brand" />
                <input placeholder="Company" className="rounded-lg bg-white/10 border border-white/10 px-3 py-2.5 text-sm placeholder:text-white/50 outline-none focus:border-brand" />
              </div>
              <input placeholder="Work email" className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2.5 text-sm placeholder:text-white/50 outline-none focus:border-brand" />
              <textarea rows={3} placeholder="Product / part number / requirement" className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2.5 text-sm placeholder:text-white/50 outline-none focus:border-brand resize-none" />
              <button type="button" className="w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white hover:brightness-110">
                Send inquiry
              </button>
              <p className="text-[11px] text-white/50 text-center">Typical response in under 4 business hours.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <BrandsMarquee />
      <Intro />
      <Categories />
      <Featured />
      <IndustriesGrid />
      <WhyUs />
      <Testimonials />
      <CTA />
    </>
  );
}