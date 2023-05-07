import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import LoginModal from '@/components/modal/LoginModal'

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
        <Navbar />
        <LoginModal />
        {children}
      </body>
    </html>
  )
}
