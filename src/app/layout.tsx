import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sklep internetowy',
  description: 'Prosty sklep internetowy w Next.js',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className="bg-gray-100">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <CartProvider>
          <ServiceWorkerRegistration />
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  )
}
