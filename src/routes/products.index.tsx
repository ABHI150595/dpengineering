import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { listProducts, type WooProductSummary } from "@/lib/woocommerce.functions";

const productsQueryOptions = () =>
  queryOptions({
    queryKey: ["woo", "products", "all"],
    queryFn: () => listProducts({ data: { per_page: 48 } }),
  });

export const Route = createFileRoute("/products/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(productsQueryOptions());
  },
  head: () => ({
    meta: [
      { title: "Products — DP Engineering" },
      {
        name: "description",
        content:
          "Browse hydraulic pumps, valves, motors, filters and industrial components stocked by DP Engineering.",
      },
      { property: "og:title", content: "Products — DP Engineering" },
      {
        property: "og:description",
        content: "Hydraulic and pneumatic components, filters, brushes and engine accessories.",
      },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
  errorComponent: ProductsError,
});

function ProductsError({ error }: { error: Error }) {
  return (
    <main className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Catalog is being connected</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Back to home
        </Link>
      </div>
    </main>
  );
}

function ProductsPage() {
  const { data: products } = useSuspenseQuery(productsQueryOptions());

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-gradient-to-br from-[#1E3565] to-black px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F58220]">Catalog</p>
          <h1 className="mt-3 font-heading text-4xl font-bold md:text-5xl">All Products</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Genuine hydraulic & pneumatic parts, sweeping brushes, filters and engine accessories — sourced from trusted global brands.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {products.length === 0 ? (
            <p className="text-center text-muted-foreground">No products published yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function ProductCard({ product }: { product: WooProductSummary }) {
  const img = product.images[0];
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition hover:border-[#F58220] hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        {img ? (
          <img
            src={img.src}
            alt={img.alt || product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.categories[0] && (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#F58220]">
            {product.categories[0].name}
          </span>
        )}
        <h3 className="font-heading text-base font-semibold text-foreground line-clamp-2">
          {product.name}
        </h3>
        {product.sku && (
          <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
        )}
        <span className="mt-auto inline-flex items-center text-sm font-semibold text-[#1E3565] group-hover:text-[#F58220]">
          View details →
        </span>
      </div>
    </Link>
  );
}