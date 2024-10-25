import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'

const helveticaBold = localFont({
  src: './fonts/Helvetica-Bold.ttf',
  variable: '--font-helvetica-bold',
})

const helveticaLight = localFont({
  src: './fonts/Helvetica-Light.ttf',
  variable: '--font-helvetica-light',
})

const helvetica = localFont({
  src: './fonts/Helvetica.ttf',
  variable: '--font-helvetica',
})

const supplyMono = localFont({
  src: './fonts/SupplyMono.otf',
  variable: '--font-supply-mono',
})

export const metadata: Metadata = {
  title: 'MTA Naughty or Nice',
  description: 'An MTA Open Data Project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.ico" sizes="any" />
        <meta property="og:image" content="/img/open-graph.svg" />
      </head>
      <body
        className={`${supplyMono.variable} ${helveticaBold.variable} ${helvetica.variable} ${helveticaLight.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
