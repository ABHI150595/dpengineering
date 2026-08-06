import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowUpRight,
  FileText,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import logoAsset from "@/assets/DPE-logo.png.asset.json";

export const CONTACT = {
  phonePrimary: "+91 89810 44341",
  phonePrimaryHref: "tel:+918981044341",
  phoneSecondary: "+91 70449 35963",
  phoneSecondaryHref: "tel:+917044935963",
  waNumber: "918981044341",
  emailSales: "info@dpengineering.in",
  emailBiswajit: "biswajit@dpengineering.in",
  emailSpares: "spares.dpe@gmail.com",
  address: "36 Yeni Sarani, PO – Joka, Near Vidyasagar Park, Kolkata – 700104, WB",
  gstn: "19FHUPS7975A1ZD",
  legalName: "M/s DP Engineering",
  contactName: "Biswajit Sharma",
  contactRole: "Manager – Sales & Services",
};

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-navy">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </div>
  );
}

const NAV_LINKS = [
  { label: "Home", to: "/" as const },
  { label: "Products", to: "/products" as const },
  { label: "Brands", to: "/brands" as const },
  { label: "Industries", to: "/industries" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

function TopBar() {
  return (
    <div className="hidden md:block bg-ink text-white/80 text-xs">
      <div className="container-x flex h-9 items-center justify-between">
        <div className="flex items-center gap-5">
          <a href={CONTACT.phonePrimaryHref} className="inline-flex items-center gap-1.5 hover:text-white">
            <Phone className="h-3.5 w-3.5 text-brand" /> {CONTACT.phonePrimary}
          </a>
          <a href={`mailto:${CONTACT.emailSales}`} className="inline-flex items-center gap-1.5 hover:text-white">
            <Mail className="h-3.5 w-3.5 text-brand" /> {CONTACT.emailSales}
          </a>
        </div>
        <div className="flex items-center gap-5">
          <span>Mon–Sat · 9:30 to 7:00</span>
          <span className="text-white/60">GSTN {CONTACT.gstn} · Pan-India shipping</span>
        </div>
      </div>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-white/85 backdrop-blur-xl">
      <div className="container-x flex h-16 md:h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logoAsset.url}
            alt="DP Engineering logo"
            className="h-10 md:h-12 w-auto transition-transform group-hover:rotate-[8deg]"
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-navy/80">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-navy font-semibold" }}
              className="relative py-1 hover:text-navy transition-colors data-[status=active]:after:scale-x-100 after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_var(--brand)] hover:brightness-110 transition"
          >
            Request Quote <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <button className="lg:hidden text-navy" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-hairline bg-white"
          >
            <div className="container-x py-4 flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-brand" }}
                  className="text-navy py-2"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white text-center"
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  const cols: { title: string; links: { label: string; to: string }[] }[] = [
    {
      title: "Company",
      links: [
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "Catalog",
      links: [
        { label: "All Products", to: "/products" },
        { label: "Brands", to: "/brands" },
        { label: "Industries", to: "/industries" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Request Quote", to: "/contact" },
        { label: "Technical Support", to: "/contact" },
      ],
    },
  ];
  return (
    <footer className="bg-ink text-white/80">
      <div className="container-x py-16 md:py-20 grid lg:grid-cols-6 gap-10">
        <div className="lg:col-span-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="DP Engineering logo" className="h-12 w-auto" />
            <span className="font-display font-bold text-white">DP Engineering</span>
          </Link>
          <p className="mt-4 text-sm text-white/60 max-w-md">
            Hydraulic pumps, industrial components and engineering equipment for
            OEMs, plants and MRO teams — supplied with certainty.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-brand mt-0.5 shrink-0" /> <span>{CONTACT.address}</span></div>
            <div className="flex items-center gap-2 flex-wrap"><Phone className="h-4 w-4 text-brand shrink-0" /> <a href={CONTACT.phonePrimaryHref} className="hover:text-white">{CONTACT.phonePrimary}</a> <span className="text-white/40">/</span> <a href={CONTACT.phoneSecondaryHref} className="hover:text-white">{CONTACT.phoneSecondary}</a></div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand shrink-0" /> <a href={`mailto:${CONTACT.emailSales}`} className="hover:text-white">{CONTACT.emailSales}</a></div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand shrink-0" /> <a href={`mailto:${CONTACT.emailBiswajit}`} className="hover:text-white">{CONTACT.emailBiswajit}</a></div>
          </div>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/70 max-w-md">
            <div className="font-semibold text-white">{CONTACT.contactName}</div>
            <div className="text-white/60">{CONTACT.contactRole}</div>
            <div className="mt-2 text-white/50">GSTN · <span className="font-mono text-white/70">{CONTACT.gstn}</span></div>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="font-display font-semibold text-white">{c.title}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-white/60 hover:text-brand transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} {CONTACT.legalName}. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <motion.div
      style={{ scaleX: x, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-brand z-50"
    />
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <motion.a
        href={`https://wa.me/${CONTACT.waNumber}`}
        target="_blank"
        rel="noopener"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg outline-none focus:outline-none"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.856L.054 23.25a.75.75 0 0 0 .916.916l5.394-1.478A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 0 1-5.193-1.453l-.372-.22-3.853 1.055 1.055-3.853-.22-.372A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </motion.a>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.75, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        className="hidden md:block"
      >
        <Link
          to="/contact"
          className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white shadow-lg"
          aria-label="Quote"
        >
          <FileText className="h-5 w-5" />
        </Link>
      </motion.div>
    </div>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-ink flex flex-col">
      <ScrollProgress />
      <TopBar />
      <Nav />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}