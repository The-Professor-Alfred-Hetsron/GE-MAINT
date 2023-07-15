import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TYA MAINT',
  description: 'Gestion de Suivi et Maintenance des Groupes électrogenes pour le Service d’Exploitation et Maintenance des Réseaux Utilitaires du PAK',
  icons: {
    icon: '/Logo.svg',
    shortcut: '/Logo.svg'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
