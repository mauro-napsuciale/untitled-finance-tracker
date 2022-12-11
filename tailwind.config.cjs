/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'base-color': "#E1E1E1",
        primary: "#7c7287",
        accent: "#119DA4",
        success: '#94B49F',
        warning: '#ECB390',
        info: '#B7CADB',
        error: '#DF7861',
      }
    },
    boxShadow: {
      'neu-in': 'inset -6px 6px 12px rgba(175, 175, 175, 1), inset 6px -6px 24px rgba(255, 255, 255, 0.75)',
      'neu-out': '-4px 4px 8px rgba(175, 175, 175, 1), 4px -4px 16px rgba(255, 255, 255, 0.75)',
    },
    fontFamily: {
      quicksand: "Quicksand, Arial, sans-seriff",
    },
    borderWidth: {
      1: '1px'
    }
  },
  plugins: [],
}
