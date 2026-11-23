import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-sans-serif', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        'signal-blue': {
          DEFAULT: 'rgb(var(--signal-blue) / <alpha-value>)',
          hover: 'rgb(var(--signal-blue-hover) / <alpha-value>)',
        },
        'status-teal': {
          DEFAULT: 'rgb(var(--status-teal) / <alpha-value>)',
          icon: 'rgb(var(--status-teal-icon) / <alpha-value>)',
          hover: 'rgb(var(--status-teal-hover) / <alpha-value>)',
        },
        'alert-amber': {
          DEFAULT: 'rgb(var(--alert-amber) / <alpha-value>)',
          icon: 'rgb(var(--alert-amber-icon) / <alpha-value>)',
          hover: 'rgb(var(--alert-amber-hover) / <alpha-value>)',
        },
        // Evidence world tokens (DESIGN.md). Values flip under .dark in globals.css.
        ev: {
          paper: 'rgb(var(--ev-paper) / <alpha-value>)',
          figure: 'rgb(var(--ev-figure) / <alpha-value>)',
          ink: 'rgb(var(--ev-ink) / <alpha-value>)',
          ink2: 'rgb(var(--ev-ink2) / <alpha-value>)',
          muted: 'rgb(var(--ev-muted) / <alpha-value>)',
          rule: 'rgb(var(--ev-rule) / <alpha-value>)',
          band: 'rgb(var(--ev-band) / <alpha-value>)',
          'band-ink': 'rgb(var(--ev-band-ink) / <alpha-value>)',
          'band-muted': 'rgb(var(--ev-band-muted) / <alpha-value>)',
          accent: 'rgb(var(--ev-accent) / <alpha-value>)',
          'accent-band': 'rgb(var(--ev-accent-band) / <alpha-value>)',
          accent2: 'rgb(var(--ev-accent2) / <alpha-value>)',
        },
        page: 'rgb(var(--bg-page) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--bg-surface) / <alpha-value>)',
          hover: 'rgb(var(--bg-surface-hover) / <alpha-value>)',
        },
        ink: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--text-muted) / <alpha-value>)',
        },
        edge: {
          DEFAULT: 'rgb(var(--border-default) / <alpha-value>)',
          strong: 'rgb(var(--border-strong) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
};

export default config;
