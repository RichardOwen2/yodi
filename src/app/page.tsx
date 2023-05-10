import Achievement from "@/components/dashboard/Achievement";
import Banner from "@/components/dashboard/Banner";
import Footer from "@/components/dashboard/Footer";
import About from "@/components/dashboard/about/About";
import Team from "@/components/dashboard/team/Team";
import Navbar from '@/components/dashboard/navbar/Navbar'

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Banner />
      <Achievement />
      <About />
      <div className="bg-[#EFEB79] p-10 w-full">
        <Team />
      </div>
      <Footer />
    </div>
  )
}
