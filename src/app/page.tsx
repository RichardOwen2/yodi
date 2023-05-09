import Achievement from "@/components/Achievement";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import About from "@/components/about/About";
import Team from "@/components/team/Team";

export default function Home() {
  return (
    <div className="">
      <Banner/>
      <Achievement/>
      <About/>
      <div className="bg-[#EFEB79] p-10 w-full">
        <Team />
      </div>
        <Footer />
    </div>
  )
}
