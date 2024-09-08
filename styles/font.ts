import { IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";

export const bodyFont = IBM_Plex_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const displayAlt = localFont({
  src: [
    {
      weight: "900",
      path: "../public/assets/fonts/Messapia-Bold.otf",
      style: "normal",
    },
  ],
  variable: "--font-display-alt",
});
