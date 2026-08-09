import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProduct, type WooProduct } from "@/lib/woocommerce.functions";

const productQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["woo", "product", slug],
    queryFn: () => getProduct({ data: { slug } }),
  });

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ context, params }) => {
    const product = await context.queryClient.ensureQueryData(productQueryOptions(params.slug));
    if (!product) throw notFound();
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product unavailable — DP Engineering" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${params.slug} — DP Engineering`;
    return {
      meta: [
        { title },
        { name: "description", content: "Industrial component specifications and downloads." },
        { property: "og:title", content: title },
        { property: "og:type", content: "product" },
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
    };
  },
  component: ProductDetail,
  errorComponent: ProductError,
  notFoundComponent: () => (
    <FallbackMessage title="Product not found" message="This item is no longer available." />
  ),
});

function ProductError({ error }: { error: Error }) {
  return <FallbackMessage title="Unable to load product" message={error.message} />;
}

function FallbackMessage({ title, message }: { title: string; message: string }) {
  return (
    <main className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{message}</p>
        <Link
          to="/products"
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Back to catalog
        </Link>
      </div>
    </main>
  );
}

function ProductDetail() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(productQueryOptions(slug));
  const product = data as WooProduct;
  const [activeImage, setActiveImage] = useState(0);

  const specs = extractSpecs(product);

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-[#F58220]">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#F58220]">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="aspect-square overflow-hidden rounded-xl border border-border bg-muted">
              {product.images[activeImage] ? (
                <img
                  src={product.images[activeImage].src}
                  alt={product.images[activeImage].alt || product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square overflow-hidden rounded-md border-2 transition ${
                      i === activeImage ? "border-[#F58220]" : "border-transparent hover:border-border"
                    }`}
                  >
                    <img src={img.src} alt={img.alt || ""} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.categories[0] && (
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F58220]">
                {product.categories[0].name}
              </span>
            )}
            <h1 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
              {product.name}
            </h1>
            {product.sku && (
              <p className="mt-2 text-sm text-muted-foreground">SKU: {product.sku}</p>
            )}

            {product.short_description && (
              <div
                className="prose prose-sm mt-6 max-w-none text-foreground/80"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="tel:+917044935963"
                className="inline-flex items-center rounded-md bg-[#F58220] px-5 py-3 text-sm font-semibold text-white shadow hover:bg-[#e0741a]"
              >
                Request Quote
              </a>
              <a
                href={`https://wa.me/917044935963?text=${encodeURIComponent(
                  `Hi, I'd like a quote for ${product.name}${product.sku ? ` (SKU: ${product.sku})` : ""}.`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-md border border-[#1E3565] px-5 py-3 text-sm font-semibold text-[#1E3565] hover:bg-[#1E3565] hover:text-white"
              >
                WhatsApp Enquiry
              </a>
            </div>

            {/* Specifications */}
            {specs.length > 0 && (
              <div className="mt-10">
                <h2 className="font-heading text-lg font-semibold text-foreground">Specifications</h2>
                <div className="mt-4 overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      {specs.map((s, idx) => (
                        <tr key={`${s.label}-${idx}`} className="odd:bg-muted/40">
                          <th className="w-1/3 border-b border-border px-4 py-2 text-left font-medium text-foreground">
                            {s.label}
                          </th>
                          <td className="border-b border-border px-4 py-2 text-muted-foreground">
                            {s.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Downloads */}
            {product.downloads && product.downloads.length > 0 && (
              <div className="mt-10">
                <h2 className="font-heading text-lg font-semibold text-foreground">Downloads</h2>
                <ul className="mt-4 space-y-2">
                  {product.downloads.map((d) => (
                    <li key={d.id}>
                      <a
                        href={d.file}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-[#F58220] hover:text-[#F58220]"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        {d.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Full description */}
        {product.description && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-semibold text-foreground">Description</h2>
            <div
              className="prose prose-sm mt-4 max-w-none text-foreground/80"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}
      </section>
    </main>
  );
}

function extractSpecs(product: WooProduct): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  for (const attr of product.attributes ?? []) {
    if (!attr.options?.length) continue;
    rows.push({ label: attr.name, value: attr.options.join(", ") });
  }
  for (const m of product.meta_data ?? []) {
    if (!m.key || m.key.startsWith("_")) continue;
    const v = m.value;
    if (v == null || v === "") continue;
    rows.push({ label: m.key.replace(/_/g, " "), value: String(v) });
  }
  return rows;
}