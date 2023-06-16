import './globals.css'
import AuthContext from '@/context/AuthContext'
import ClientOnly from '@/components/ClientOnly'


export const metadata = {
  title: 'YODI',
  description: 'Your Design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <AuthContext>
            {children}
          </AuthContext>
        </ClientOnly>
      </body>
    </html>
  )
}
