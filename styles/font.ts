import { IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";

export const bodyFont = IBM_Plex_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "block",
});

export const displayAltFont = localFont({
  src: [
    {
      weight: "900",
      path: "../public/assets/fonts/Messapia-Bold.woff2",
      style: "normal",
    },
  ],
  variable: "--font-display-alt",
  display: "block",
});

export const displayFont = localFont({
  src: [
    {
      weight: "900",
      path: "../public/assets/fonts/NeueMachina-Ultrabold.woff2",
      style: "normal",
    },
    {
      weight: "400",
      path: "../public/assets/fonts/NeueMachina-Regular.woff2",
      style: "normal",
    },
    {
      weight: "300",
      path: "../public/assets/fonts/NeueMachina-Light.woff2",
      style: "normal",
    },
  ],
  variable: "--font-display",
});
