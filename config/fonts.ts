import {
  Playfair_Display,
  Inter,
  Raleway,
  Montserrat,
  Manrope,
  Cormorant_Garamond,
  Corinthia,
  Imperial_Script,
  Poppins,
  Playfair,
  Abril_Fatface,
} from "next/font/google";
import localFont from "next/font/local";

export const fontInter = Inter({
  subsets: ["latin"],
});

export const fontPlayfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const fontPlayFair = Playfair({
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const fontRaleway = Raleway({
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const fontMontserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const fontManrope = Manrope({
  subsets: ["latin"],
  style: ["normal"],
});

export const fontCormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600"],
});

export const fontCorinthia = Corinthia({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400", "700"],
});

export const fontImperialScript = Imperial_Script({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

export const fontPoppins = Poppins({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400", "500", "600"],
});

export const fontHelvetica = localFont({
  src: "../fonts/Helvetica.ttf",
  display: "swap",
});

export const fontAbrilFatface = Abril_Fatface({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});
