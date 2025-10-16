import Script from 'next/script'
import './globals.css'
export const metadata = { title: 'NHS Personal Statement Generator', description: 'One-time payment. Email delivery.' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="bg-gray-50 antialiased">{children}</body>
    </html>
  )
}
