import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: {
  extend: {
    colors: {
      nhs: { blue: "#005EB8", bright: "#0072CE", dark: "#003087", teal: "#00A499", grey: "#425563" }
    }
  }} },
  plugins: [require('@tailwindcss/forms')],
}
export default config
