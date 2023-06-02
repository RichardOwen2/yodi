import axios from "axios";

import Achievement from "@/components/dashboard/Achievement";
import Banner from "@/components/dashboard/Banner";
import Footer from "@/components/dashboard/Footer";
import About from "@/components/dashboard/about/About";
import Team from "@/components/dashboard/team/Team";
import Navbar from '@/components/dashboard/navbar/Navbar'
import Item from "@/components/dashboard/item/Item";

import { BASEURL } from "@/config";

export interface topSellerData {
  id: string;
  user: {
    image: string | null;
    username: string;
  };
  city: string;
}

const topSeller = async (): Promise<topSellerData[]> => {
  try {
    const response = await axios.get(`${BASEURL}/api/seller/top`);
    return response.data.data.sellers;
  } catch (error: any) {
    console.log(error);
    return []; // return an empty array in case of error
  }
}

export default async function Home() {
  const sellers = await topSeller();
  
  return (
    <div className="">
        <Banner />
        <Achievement />
        <div className="bg-[#EFEB79] py-10 sm:px-20 lg:px-36 w-full">
          <Item />
        </div>
        <About data={sellers} />
        <div className="bg-[#EFEB79] p-10 w-full">
          <Team />
        </div>
        <Footer />
    </div>
  )
}
