import './globals.css'
import AuthContext from '@/context/AuthContext'
import ToasterProvider from '@/providers/ToasterProvider'
import Navbar from '@/components/dashboard/navbar/Navbar'
import LoginModal from '@/components/modal/LoginModal'
import RegisterModal from '@/components/modal/RegisterModal'
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
            <LoginModal />
            <RegisterModal />
            <ToasterProvider />
            {children}
          </AuthContext>
        </ClientOnly>
      </body>
    </html>
  )
}
