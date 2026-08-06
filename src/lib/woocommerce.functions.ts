import { createServerFn } from "@tanstack/react-start";

export type WooImage = { id: number; src: string; alt?: string; name?: string };
export type WooAttribute = { id: number; name: string; options: string[] };
export type WooMeta = { id: number; key: string; value: string | number | boolean | null };
export type WooDownload = { id: string; name: string; file: string };
export type WooCategory = { id: number; name: string; slug: string };

export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  permalink?: string;
  sku?: string;
  price?: string;
  regular_price?: string;
  short_description?: string;
  description?: string;
  stock_status?: string;
  images: WooImage[];
  attributes: WooAttribute[];
  meta_data: WooMeta[];
  downloads: WooDownload[];
  categories: WooCategory[];
};

export type WooProductSummary = {
  id: number;
  name: string;
  slug: string;
  sku?: string;
  short_description?: string;
  price?: string;
  images: WooImage[];
  categories: WooCategory[];
};

function wooConfig() {
  const storeUrl = process.env.WOO_STORE_URL;
  const key = process.env.WOO_CONSUMER_KEY;
  const secret = process.env.WOO_CONSUMER_SECRET;
  if (!storeUrl || !key || !secret) {
    throw new Error(
      "WooCommerce is not configured. Set WOO_STORE_URL, WOO_CONSUMER_KEY, and WOO_CONSUMER_SECRET.",
    );
  }
  return { storeUrl: storeUrl.replace(/\/$/, ""), key, secret };
}

async function wooFetch(path: string): Promise<Response> {
  const { storeUrl, key, secret } = wooConfig();
  const auth = Buffer.from(`${key}:${secret}`).toString("base64");
  return fetch(`${storeUrl}/wp-json/wc/v3${path}`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    },
  });
}

export const listProducts = createServerFn({ method: "GET" })
  .inputValidator(
    (data: { category?: string; search?: string; per_page?: number; page?: number } = {}) => data,
  )
  .handler(async ({ data }): Promise<WooProductSummary[]> => {
    const params = new URLSearchParams();
    params.set("per_page", String(data.per_page ?? 24));
    params.set("page", String(data.page ?? 1));
    params.set("status", "publish");
    if (data.search) params.set("search", data.search);
    if (data.category) params.set("category", data.category);

    const res = await wooFetch(`/products?${params.toString()}`);
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`WooCommerce products request failed [${res.status}]: ${body}`);
    }
    const items = (await res.json()) as WooProduct[];
    return items.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      short_description: p.short_description,
      price: p.price,
      images: p.images ?? [],
      categories: p.categories ?? [],
    }));
  });

export const getProduct = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }): Promise<WooProduct | null> => {
    const params = new URLSearchParams({ slug: data.slug, status: "publish" });
    const res = await wooFetch(`/products?${params.toString()}`);
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`WooCommerce product request failed [${res.status}]: ${body}`);
    }
    const items = (await res.json()) as WooProduct[];
    return items[0] ?? null;
  });