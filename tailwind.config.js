const ionic = require('@aparajita/tailwind-ionic')

module.exports = {
  content: ['./src/**/*.{html,vue,ts}'],
  darkMode: 'class',
  theme: {
    extend: {},
    variants: {
      extend: {}
    }
  },
  plugins: [
    ionic({ theme: 'src/theme/variables.css', abbreviateVariants: true })
  ],
  corePlugins: {
    preflight: false
  }
}
