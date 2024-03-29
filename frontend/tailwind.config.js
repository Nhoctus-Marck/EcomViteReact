/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        '3xl':'-1px 4px 20px -5px rgba(0, 0, 0, 19), 0 6px 6px rgba(0,0,0,0.23)'
      },
      flex:{
        '1xl':'0.65px'
      },
      backgroundImage:{
        'chat-pattern':"url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')"
      },
      height:{
        'div':"100%",
        '30':"62px"
      },
      colors: {
        '50': '#fbf8f1',
        '100': '#f6edde',
        '200': '#edd9bb',
        '300': '#dbb17b',
        '400': '#d49c63',
        '500': '#ca8245',
        '600': '#bc6d3a',
        '700': '#9d5731',
        '800': '#7e462e',
        '900': '#663b28',
        '950': '#371d13',
    }, 
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
