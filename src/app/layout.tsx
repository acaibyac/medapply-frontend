import Script from 'next/script'
import Navbar from '@/components/Navbar'
import './globals.css'
export const metadata = { title: 'NHS Personal Statement Generator', description: 'One-time payment. Email delivery.' }
export const viewport = { width: 'device-width', initialScale: 1 }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="bg-gray-50 antialiased">
        <Navbar />
        <div className="mx-auto max-w-[1280px] w-full px-4 sm:px-6 lg:px-8 pt-20">{children}</div>
      </body>
    </html>
  )
}
