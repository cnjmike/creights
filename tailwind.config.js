/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        'sans': [ 'mendl-sans-dusk', 'ui-sans-serif' ]
      },
      colors: {
        'deco-black': '#190006',
        'deco-green': '#36594a',
        'deco-red': '#800020',
        'deco-gold': '#d4af37',
        'deco-grey': '#aaa9ad'
      },
      aspectRatio: {
        '7/5': [7,5]
      },
      height: {
        '1/4': '25%',
        '1/3': '33.3%',
        '1/2': '50%',
        '3/4': '75%'
      },
      width: {
        '1/3': '33.3%',
        '2/3': '66.6%'
      },
      boxShadow: {
        'dark-offset': '-4px -4px 10px 0 rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}

