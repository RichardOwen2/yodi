import axios from "axios";

import Achievement from "@/components/dashboard/Achievement";
import Banner from "@/components/dashboard/Banner";
import Footer from "@/components/dashboard/Footer";
import About from "@/components/dashboard/about/About";
import Team from "@/components/dashboard/team/Team";
import Navbar from '@/components/dashboard/navbar/Navbar'

import { BASEAPIURL } from "@/config";
import ClientOnly from "@/components/ClientOnly";

const topSeller = async () => {
  try {
    const response = await axios.get(`${BASEAPIURL}/seller/top`);
    return response.data.data.sellers;
  } catch (error: any) {
    console.log(error.message);
    return []; // return an empty array in case of error
  }
}


topSeller();

export default async function Home() {
  const sellers = await topSeller();

  return (
    <div className="">
      <ClientOnly>
        <Navbar />
        <Banner />
        <Achievement />
        <About data={sellers} />
        <div className="bg-[#EFEB79] p-10 w-full">
          <Team />
        </div>
        <Footer />
      </ClientOnly>
    </div>
  )
}
