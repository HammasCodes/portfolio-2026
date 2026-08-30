import { Orbitron, Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

/* Display. Variable wght 400 to 900, driven live by the cursor in <TechWall />. */
const display = Orbitron({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  title: 'Hammas, Web & App Developer',
  description:
    'Freelance web and app developer. Product engineering, interface design, and sites that ship on time.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
