export const brandName = "Dadur Bari";
export const tagline = "Wear Your Identity.";
export const phone = "01746-212501";
export const email = "dadur.bari.cloths@gmail.com";
export const address = "Khetlal, Joypurhat, Rajshahi, Bangladesh";
export const paymentNumber = "01746-212501";

export const colors = {
  primaryBlack: "#111111",
  primaryGold: "#C8A45D",
  heritageGreen: "#2E3A2F",
  warmIvory: "#F3EFE6",
  white: "#FFFFFF",
} as const;

export const deliveryRules = {
  insideJoypurhat: {
    days: "1–2 days",
    charge: 100,
  },
  outsideJoypurhat: {
    days: "2–4 days",
    charge: 150,
  },
  codAdvanceMessage: "COD available only if delivery charge is paid in advance.",
} as const;

export const paymentMethods = [
  "bKash",
  "Nagad",
  "Rocket",
  "Cash On Delivery",
] as const;

export const productQualities = ["Silver", "Gold", "Premium"] as const;
