import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
    },
    extend: {
      colors: {
        nhs: { blue: "#005EB8", bright: "#0072CE", dark: "#003087", teal: "#00A499", grey: "#425563" }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
