import './globals.css'

export const metadata = {
  title: 'Hammas — Web & App Developer',
  description: 'Freelance web & app developer. Clean code, fast delivery, real results.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}