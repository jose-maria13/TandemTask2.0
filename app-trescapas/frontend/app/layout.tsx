import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tandem Tasks',
  description: 'Gestor de tareas colaborativo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <main className="container mx-auto max-w-4xl">
          {children}
        </main>
      </body>
    </html>
  )
} 