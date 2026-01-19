import "./globals.css"

export const metadata = {
  metadataBase: new URL("https://mi-salud-pv.vercel.app"),
  title: "Mi Salud PV - Healthcare Resources",
  description: "Tu salud en Puerto Vallarta, simple y en español",
  openGraph: {
    title: "Mi Salud PV",
    description: "Tu salud en Puerto Vallarta, simple y en español",
    images: ["/og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e3a5f" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
