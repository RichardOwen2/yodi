import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import LoginModal from '@/components/modal/LoginModal'
import AuthContext from '@/context/AuthContext'

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
        <AuthContext>
          <Navbar />
          <LoginModal />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
