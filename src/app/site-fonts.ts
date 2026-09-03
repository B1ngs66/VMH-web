import { Noto_Sans_TC, Outfit } from "next/font/google";

const noto = Noto_Sans_TC({
  variable: "--font-noto",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const siteFontClassName = `${noto.variable} ${outfit.variable}`;
