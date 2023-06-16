import AuthContext from '@/context/AuthContext'
import ToasterProvider from '@/providers/ToasterProvider'
import Navbar from '@/components/navbar/Navbar'
import ClientOnly from '@/components/ClientOnly'
import Sidebar from '@/components/sidebar/Sidebar'


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
            <ToasterProvider />
            <div className="bg-[#F5F5F5] flex">
              <Sidebar />
              {/* content */}
              <div className="w-full text-black shadow-sm px-5 md:px-16 py-7">
                <Navbar authName={'Seller'} />
                {children}
              </div>
            </div>
          </AuthContext>
        </ClientOnly>
      </body>
    </html>
  )
}
