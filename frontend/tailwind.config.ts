import type { Config } from "tailwindcss";

const tcolors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const nomicColors = {
  navy: {
    "50": "#e9eeff",
    "100": "#d6e0ff",
    "200": "#b5c3ff",
    "300": "#899bff",
    "400": "#5b64ff",
    "500": "#3b35ff",
    "600": "#2f13ff",
    "700": "#2809f9",
    "800": "#210bc8",
    "900": "#20139c",
    "950": "#090527" //consultant dark-navy
  },
  blue: {
    "50": "#eff4fe",
    "100": "#e2eafd",
    "200": "#cbd7fa",
    "300": "#abbcf6",
    "400": "#8a99ef",
    "500": "#6d77e7",
    "600": "#4a4ad8", //consultant blue
    "700": "#4542c0",
    "800": "#38389b",
    "900": "#34357b",
    "950": "#1f1e48"
  },
  lblue: {
    "50": "#f4f3ff",
    "100": "#ebe8ff",
    "200": "#dad6ff", //consultant light blue
    "300": "#bdb3ff",
    "400": "#9d88fd",
    "500": "#7d58fa",
    "600": "#6d36f1",
    "700": "#5e24dd",
    "800": "#4e1dba",
    "900": "#411a98",
    "950": "#260e67"
  },
  sprout: {
    "50": "#f0fdf5",
    "100": "#ddfbe9",
    "200": "#bdf5d5",
    "300": "#8aebb5",
    "400": "#4ad889", //consultant Sprout
    "500": "#27c06b",
    "600": "#1b9e55",
    "700": "#197c46",
    "800": "#19623b",
    "900": "#165132",
    "950": "#062d19"
  },
  cgray: {
    "50": "#f5f5f8",
    "100": "#e4e5ee", //consultant cool gray
    "200": "#dcdde9",
    "300": "#c7c8da",
    "400": "#b0afca",
    "500": "#9d9aba",
    "600": "#8a83a8",
    "700": "#777092",
    "800": "#615c77",
    "900": "#514e61",
    "950": "#2f2e38"
  },
  peach: {
    "50": "#fef2f2",
    "100": "#fee2e2",
    "200": "#fecaca",
    "300": "#fda4a4",
    "400": "#f96b6b", //consultant Peach
    "500": "#f14242",
    "600": "#de2424",
    "700": "#ba1b1b",
    "800": "#9a1a1a",
    "900": "#801c1c",
    "950": "#460909"
  },
  sun: {
    "50": "#fffeea",
    "100": "#fff9c5",
    "200": "#fff485",
    "300": "#ffe846",
    "400": "#ffd71b",
    "500": "#ffb700", // consultant Sun
    "600": "#e28c00",
    "700": "#bb6302",
    "800": "#984c08",
    "900": "#7c3e0b",
    "950": "#481f00"
  }
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
    "node_modules/flowbite-react/lib/esm/**/*.js" // flowbite module
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",

    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        ...nomicColors,
        // light mode
        tremor: {
          brand: {
            faint: nomicColors.blue[50],
            muted: nomicColors.blue[200],
            subtle: nomicColors.blue[400],
            DEFAULT: nomicColors.blue[500],
            emphasis: nomicColors.blue[700],
            inverted: tcolors.white
          },
          background: {
            muted: nomicColors.cgray[50],
            subtle: nomicColors.cgray[100],
            DEFAULT: tcolors.white,
            emphasis: tcolors.gray[200]
          },
          border: {
            DEFAULT: nomicColors.cgray[200]
          },
          ring: {
            DEFAULT: nomicColors.cgray[200]
          },
          content: {
            subtle: nomicColors.cgray[400],
            DEFAULT: nomicColors.cgray[800],
            emphasis: nomicColors.cgray[900],
            strong: nomicColors.cgray[950],
            inverted: tcolors.white
          }
        },
        // dark mode
        "dark-tremor": {
          brand: {
            faint: "#0B1229",
            muted: tcolors.blue[950],
            subtle: tcolors.blue[800],
            DEFAULT: tcolors.blue[500],
            emphasis: tcolors.blue[400],
            inverted: tcolors.blue[950]
          },
          background: {
            muted: "#131A2B",
            subtle: tcolors.gray[800],
            DEFAULT: tcolors.gray[900],
            emphasis: tcolors.gray[300]
          },
          border: {
            DEFAULT: tcolors.gray[700]
          },
          ring: {
            DEFAULT: tcolors.gray[800]
          },
          content: {
            subtle: tcolors.gray[600],
            DEFAULT: tcolors.gray[500],
            emphasis: tcolors.gray[200],
            strong: tcolors.gray[50],
            inverted: tcolors.gray[950]
          }
        }
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px"
      },
      fontSize: {
        "tremor-label": ["0.75rem", { lineHeight: "1.00rem" }],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }]
      }
    }
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"]
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"]
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"]
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
    }
  ],
  corePlugins: {
    aspectRatio: false
  },
  plugins: [
    require("@headlessui/tailwindcss"),
    require("flowbite/plugin"),
    require("@tailwindcss/aspect-ratio")
  ]
};
export default config;
