import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import { ReduxProvider } from '../components'

export const metadata: Metadata = {
  title: 'TYA MAINT',
  description: 'Gestion de Suivi et Maintenance des Groupes électrogenes pour le Service d’Exploitation et Maintenance des Réseaux Utilitaires du PAK',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={inter.className}>{children}</body>
      </ReduxProvider>
    </html>
  )
}
