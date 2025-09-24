import { IBM_Plex_Sans, Open_Sans, Poppins } from "next/font/google";

export const ibm_plex_sans = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  preload: true,
  display: "swap",
});

export const open_sans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
  preload: true,
  display: "swap",
});

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  preload: true,
  display: "swap",
});
