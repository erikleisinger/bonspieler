import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
export default {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /grid-rows-+/,
    },
    {
      pattern: /row-span-+/,
    },
    {
      pattern: /bg-+/,
    },
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        glass: {
          DEFAULT: "hsl(var(--glass))",
          foreground: "hsl(var(--glass-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          muted: "hsl(var(--primary-muted) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          foreground: "hsl(var(--success-foreground) / <alpha-value>)",
        },

        bracket: {
          primary: "hsl(var(--bracket-primary) / <alpha-value>)",
          "primary-foreground":
            "hsl(var(--bracket-primary-foreground) / <alpha-value>)",
          muted: "hsl(var(--bracket-muted) / <alpha-value>)",
        },

        pool: {
          primary: "hsl(var(--pool-primary) / <alpha-value>)",
          "primary-foreground":
            "hsl(var(--pool-primary-foreground) / <alpha-value>)",
          muted: "hsl(var(--pool-muted) / <alpha-value>)",
        },

        points: {
          primary: "hsl(var(--points-primary) / <alpha-value>)",
          "primary-foreground":
            "hsl(var(--points-primary-foreground) / <alpha-value>)",
          muted: "hsl(var(--points-muted) / <alpha-value>)",
        },

        connection: "hsl(var(--connection))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        gradient: {
          "purple-from": "#4f46e5",
          "purple-to": "#6366f1",
          "emerald-from": "#00e0b0",
          "emerald-to": "#00f5c0",
          "pink-from": "#ee4266",
          "pink-to": "#ef5778",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        progress: {
          "0%": {
            transform: "translateX(0) scaleX(0)",
          },
          "40%": {
            transform: "translateX(0) scaleX(0.4)",
          },
          "100%": {
            transform: "translateX(100%) scaleX(0.5)",
          },
        },
      },
      animation: {
        progress: "progress 1s infinite linear",
      },
      fontFamily: {
        koulen: ["var(--font-koulen)"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities, theme, e }) {
      // Add custom utilities for CSS variables
      const cssVarUtilities = {};
      // Add specific utilities if needed
      cssVarUtilities[".hover\\:selected-index"] = {
        "&:hover": {
          "--selected-index": "var(--hover-index)",
        },
      };
      addUtilities(cssVarUtilities);
    }),
  ],
} satisfies Config;
