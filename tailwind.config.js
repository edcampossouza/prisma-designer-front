/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "model-color": "var(--model-color)",
        "field-color": "var(--field-color)",
        "type-color": "var(--type-color)",
        "attribute-color": "var(--attribute-color)",
        "code-bd": "var(--code-bd)",
        "text-main": "var(--text-main)",
        "btn-bg": "var(--btn-bg)",
        "btn-bg-hov": "var(--btn-bg-hov)",
        "confirm": "var(--confirm)",
        "confirm-hov": "var(--confirm-hov)",
      },
    },
  },
  plugins: [],
};
