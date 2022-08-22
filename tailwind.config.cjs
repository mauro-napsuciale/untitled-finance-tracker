/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'base-color': "#E1E1E1",
        primary: "#7c7287",
        accent: "#119DA4",
        warning: "#F1BF98",
        error: "#C73E1D",
        success: "#B9FFB7",
      }
    },
    boxShadow: {
      'neu-in': 'inset -6px 6px 12px rgba(175, 175, 175, 1), inset 6px -6px 24px rgba(255, 255, 255, 0.75)',
      'neu-out': '-6px 6px 12px rgba(175, 175, 175, 1), 6px -6px 24px rgba(255, 255, 255, 0.75);',
    }
  },
  plugins: [],
}
