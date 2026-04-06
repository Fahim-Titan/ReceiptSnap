/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      "colors": {
        "surface-container-low": "#f2f4f5",
        "tertiary-fixed": "#9ff2e0",
        "on-error-container": "#93000a",
        "on-secondary-container": "#576670",
        "on-primary-fixed": "#001f2a",
        "secondary-container": "#d5e5f1",
        "secondary-fixed-dim": "#b9c9d4",
        "secondary": "#51606a",
        "outline-variant": "#bfc8cd",
        "tertiary-fixed-dim": "#83d6c4",
        "on-secondary-fixed": "#0e1d26",
        "primary-fixed": "#bee9ff",
        "outline": "#70787e",
        "tertiary-container": "#006a5c",
        "tertiary": "#005045",
        "primary-container": "#006684",
        "background": "#f8fafb",
        "on-primary": "#ffffff",
        "on-surface-variant": "#3f484d",
        "inverse-on-surface": "#eff1f2",
        "surface-tint": "#016684",
        "surface-dim": "#d8dadb",
        "surface-container-highest": "#e1e3e4",
        "on-primary-fixed-variant": "#004d64",
        "on-tertiary-fixed-variant": "#005046",
        "surface-bright": "#f8fafb",
        "on-secondary-fixed-variant": "#3a4952",
        "on-secondary": "#ffffff",
        "inverse-surface": "#2e3132",
        "on-error": "#ffffff",
        "surface": "#f8fafb",
        "on-tertiary": "#ffffff",
        "error": "#ba1a1a",
        "secondary-fixed": "#d5e5f1",
        "on-background": "#191c1d",
        "surface-container-lowest": "#ffffff",
        "surface-variant": "#e1e3e4",
        "on-surface": "#191c1d",
        "on-tertiary-container": "#94e7d5",
        "surface-container": "#eceeef",
        "primary": "#004d64",
        "inverse-primary": "#87d0f2",
        "surface-container-high": "#e6e8e9",
        "error-container": "#ffdad6",
        "primary-fixed-dim": "#87d0f2",
        "on-primary-container": "#a2e1ff",
        "on-tertiary-fixed": "#00201b"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      // Keep fonts as system defaults per user request: "use system defaults".
      // But we will still create aliases so standard classes like font-headline map cleanly.
      "fontFamily": {
        "headline": ["System"],
        "body": ["System"],
        "label": ["System"]
      }
    },
  },
  plugins: [],
}
