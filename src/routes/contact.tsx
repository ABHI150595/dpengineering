import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Phone, User, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/site/sections";
import { CONTACT, SectionEyebrow } from "@/components/site/chrome";
import { sendContactEmail, type ContactInput } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact DP Engineering — Kolkata Hydraulic Suppliers" },
      { name: "description", content: "Reach DP Engineering in Kolkata. Speak to Biswajit Sharma (Sales & Services) for hydraulic pumps, valves and industrial component quotes." },
      { property: "og:title", content: "Contact — DP Engineering" },
      { property: "og:description", content: "Talk to our engineers about your hydraulic and industrial component requirements." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const EMPTY: ContactInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  requirement: "",
};

function ContactPage() {
  const [form, setForm] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function validate(): boolean {
    const e: Partial<Record<keyof ContactInput, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.requirement.trim() || form.requirement.trim().length < 10)
      e.requirement = "Please describe your requirement (min 10 chars)";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      await sendContactEmail({ data: form });
      setStatus("success");
      setForm(EMPTY);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  function field(key: keyof ContactInput) {
    return {
      value: form[key] ?? "",
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        if (errors[key]) setErrors((ev) => ({ ...ev, [key]: undefined }));
      },
    };
  }

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={<>Let's <span className="text-gradient-brand">talk hydraulics.</span></>}
        subtitle="Share your requirement — pump, motor, valve, filter or a full BOM — and get a real engineering response, not a form-letter reply."
      />

      <section className="bg-white">
        <div className="container-x py-20 md:py-28 grid lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <SectionEyebrow>Contact details</SectionEyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy leading-tight">
              Prefer to reach us directly?
            </h2>

            <div className="rounded-3xl border border-hairline bg-surface-muted p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-white">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display font-semibold text-navy">{CONTACT.contactName}</div>
                  <div className="text-xs text-muted-foreground">{CONTACT.contactRole}</div>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <a href={CONTACT.phonePrimaryHref} className="flex items-center gap-3 text-navy hover:text-brand transition">
                  <Phone className="h-4 w-4 text-brand" /> {CONTACT.phonePrimary}
                </a>
                <a href={CONTACT.phoneSecondaryHref} className="flex items-center gap-3 text-navy hover:text-brand transition">
                  <Phone className="h-4 w-4 text-brand" /> {CONTACT.phoneSecondary}
                </a>
                <a href={`https://wa.me/${CONTACT.waNumber}`} target="_blank" rel="noopener" className="flex items-center gap-3 text-navy hover:text-brand transition">
                  <MessageSquare className="h-4 w-4 text-brand" /> WhatsApp us
                </a>
                <a href={`mailto:${CONTACT.emailSales}`} className="flex items-center gap-3 text-navy hover:text-brand transition">
                  <Mail className="h-4 w-4 text-brand" /> {CONTACT.emailSales}
                </a>
                <a href={`mailto:${CONTACT.emailBiswajit}`} className="flex items-center gap-3 text-navy hover:text-brand transition">
                  <Mail className="h-4 w-4 text-brand" /> {CONTACT.emailBiswajit}
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-hairline bg-white p-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <div className="font-display font-semibold text-navy">{CONTACT.legalName}</div>
                  <div className="text-sm text-muted-foreground mt-1">{CONTACT.address}</div>
                  <div className="mt-3 text-xs text-muted-foreground">GSTN · <span className="font-mono text-navy">{CONTACT.gstn}</span></div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 rounded-3xl border border-hairline bg-surface-muted p-8 md:p-10 space-y-4"
            onSubmit={handleSubmit}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle className="h-14 w-14 text-green-500" />
                <h3 className="font-display text-xl font-semibold text-navy">Inquiry sent!</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  We've received your message and will get back to you within 4 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 rounded-lg border border-hairline px-5 py-2 text-sm font-medium text-navy hover:bg-white transition"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-widest text-navy">Name <span className="text-brand">*</span></span>
                    <input
                      className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand transition ${errors.name ? "border-red-400" : "border-hairline"}`}
                      placeholder="Your name"
                      {...field("name")}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-widest text-navy">Company</span>
                    <input
                      className="mt-1.5 w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-sm outline-none focus:border-brand transition"
                      placeholder="Company name"
                      {...field("company")}
                    />
                  </label>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-widest text-navy">Email <span className="text-brand">*</span></span>
                    <input
                      type="email"
                      className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand transition ${errors.email ? "border-red-400" : "border-hairline"}`}
                      placeholder="work@company.com"
                      {...field("email")}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-widest text-navy">Phone</span>
                    <input
                      className="mt-1.5 w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-sm outline-none focus:border-brand transition"
                      placeholder="+91"
                      {...field("phone")}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-navy">Requirement <span className="text-brand">*</span></span>
                  <textarea
                    rows={5}
                    className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand resize-none transition ${errors.requirement ? "border-red-400" : "border-hairline"}`}
                    placeholder="Part number, model, quantity, application…"
                    {...field("requirement")}
                  />
                  {errors.requirement && <p className="mt-1 text-xs text-red-500">{errors.requirement}</p>}
                </label>

                {status === "error" && (
                  <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                  ) : (
                    "Send inquiry"
                  )}
                </button>
                <p className="text-[11px] text-muted-foreground text-center">Typical response in under 4 business hours.</p>
              </>
            )}
          </motion.form>
        </div>
      </section>
    </>
  );
}
