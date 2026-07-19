import { deliveryRules } from "./brand";

export type Product = {
  slug: string;
  name: string;
  price: number;
  oldPrice: number;
  category: "Silver" | "Gold" | "Premium";
  badge: string;
  fabric: string;
  gsm: string;
  description: string;
  printType: string;
  sizes: string[];
  deliveryInfo: string;
};

export const products: Product[] = [
  {
    slug: "premium-oversized-tshirt",
    name: "Premium Oversized T-Shirt",
    price: 799,
    oldPrice: 999,
    category: "Premium",
    badge: "Pre Order",
    fabric: "Premium Cotton",
    gsm: "220 GSM",
    description:
      "Luxury oversized T-shirt with premium fabric, comfortable fit and durable DTF printing.",
    printType: "DTF Direct To Film",
    sizes: ["M", "L", "XL", "XXL"],
    deliveryInfo: `Inside Joypurhat: ${deliveryRules.insideJoypurhat.days} · Outside Joypurhat: ${deliveryRules.outsideJoypurhat.days}`,
  },
  {
    slug: "gold-custom-dtf-tshirt",
    name: "Gold Custom DTF T-Shirt",
    price: 599,
    oldPrice: 749,
    category: "Gold",
    badge: "Best Seller",
    fabric: "Soft Cotton",
    gsm: "190 GSM",
    description:
      "Most popular Dadur Bari T-shirt with a balanced premium feel and durable DTF printing.",
    printType: "DTF Direct To Film",
    sizes: ["M", "L", "XL", "XXL"],
    deliveryInfo: `Inside Joypurhat: ${deliveryRules.insideJoypurhat.days} · Outside Joypurhat: ${deliveryRules.outsideJoypurhat.days}`,
  },
  {
    slug: "silver-everyday-tshirt",
    name: "Silver Everyday T-Shirt",
    price: 449,
    oldPrice: 549,
    category: "Silver",
    badge: "New",
    fabric: "Comfort Cotton",
    gsm: "170 GSM",
    description:
      "Entry level premium T-shirt for everyday comfort with clean design and durable print quality.",
    printType: "DTF Direct To Film",
    sizes: ["M", "L", "XL", "XXL"],
    deliveryInfo: `Inside Joypurhat: ${deliveryRules.insideJoypurhat.days} · Outside Joypurhat: ${deliveryRules.outsideJoypurhat.days}`,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
