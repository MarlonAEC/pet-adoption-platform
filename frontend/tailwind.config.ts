import type { Config } from "tailwindcss";
import tinycolor from "tinycolor2";

interface ColorVariants {
  [key: string]: string;
}

// Function to generate color variants
export const generateColorScale = (baseColor: string): ColorVariants => {
  const colors: ColorVariants = {};
  const base = tinycolor(baseColor);

  // Generate lighter shades (50 to 400)
  for (let i = 0; i <= 4; i++) {
    const variantKey = i === 4 ? 50 : (4 - i) * 100; // Generates keys: 50, 100, 200, 300, 400
    const shade = base
      .clone()
      .lighten((i + 1) * 10)
      .toHexString(); // Incremental lightening
    colors[variantKey.toString()] = shade;
  }

  // Set base color for 500
  colors["500"] = baseColor;

  // Generate darker shades (600 to 950)
  for (let i = 0; i <= 4; i++) {
    const variantKey = i === 4 ? 950 : (6 + i) * 100; // Generates keys: 600, 700, 800, 900, 950
    const shade = base
      .clone()
      .darken((i + 1) * 10)
      .toHexString(); // Incremental darkening
    colors[variantKey.toString()] = shade;
  }

  return colors;
};

const primary1Variants = generateColorScale("#4E2D69");
const primary2Variants = generateColorScale("#0C1B39");
const secondary1Variants = generateColorScale("#36DBFF");
const secondary2Variants = generateColorScale("#19BC90");
const neutral1Variants = generateColorScale("#0C0C20");
const neutral2Variants = generateColorScale("#F6FAF9");

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary1: { ...primary1Variants },
        primary2: { ...primary2Variants },
        secondary1: { ...secondary1Variants },
        secondary2: { ...secondary2Variants },
        neutral1: { ...neutral1Variants },
        neutral2: { ...neutral2Variants },
        gradient1From: '#FD48D1',
        gradient1To: '#FC6D71',
        gradient2From: '#3699FF',
        gradient2To: '#36CFFF',
        gradient3From: '#FFA800',
        gradient3To: '#FFD600',
      },
      screens: {
        md: "748px",
        xmd: "800px",
        lg: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        sans: ["Nunito"],
      },
      fontSize: {
        "2xs": ".625rem",
        "3xs": ".5rem",
      },
      borderRadius: {
        button: "36px",
        checkBox: "48px",
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-in-up": {
          "0%": {
            visibility: "visible",
            transform: "translate3d(0, 100%, 0)",
          },
          "100%": {
            transform: "translate3d(0, 0, 0)",
          },
        },
        popup: {
          "0%": {
            transform: "scale(1,1)",
          },
          "10%": {
            transform: "scale(1.1,1.1)",
          },
          "30%": {
            transform: "scale(.9,.9)",
          },
          "50%": {
            transform: "scale(1,1)",
          },
          "57%": {
            transform: "scale(1,1)",
          },
          "64%": {
            transform: "scale(1,1)",
          },
          "100%": {
            transform: "scale(1,1)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "slide-in-up": "slide-in-up 0.5s ease-out",
        popup: "popup 800ms ease-out",
      },
      letterSpacing: {
        "extra-tighter": "0.01rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}

export default config;
