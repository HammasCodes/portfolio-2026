import { Syne, Syne_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const syneMono = Syne_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-syne-mono',
  display: 'swap',
})

export const metadata = {
  title: 'Hammas — Web & App Developer',
  description: 'Freelance web & app developer. Clean code, fast delivery, real results.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${syneMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}