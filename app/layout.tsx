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
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
      </head> 
      <ReduxProvider>
        <body className={inter.className}>{children}</body>
      </ReduxProvider>
    </html>
  )
}
