const { join } = require('path');

 module.exports = {
  content: [
    join(__dirname, './packages/**/*.{ts,tsx,js,jsx,html}')
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}