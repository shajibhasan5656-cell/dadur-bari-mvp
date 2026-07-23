export function makeCartUrl(input: {
  slug: string;
  name: string;
  price: number;
  category?: string | null;
  size?: string;
}) {
  const params = new URLSearchParams({
    product: input.slug,
    name: input.name,
    price: String(input.price),
    category: input.category || "Dadur Bari",
    size: input.size || "L",
  });

  return `/cart?${params.toString()}`;
}
