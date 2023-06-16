'use client'

import { AiOutlineArrowRight } from "react-icons/ai";
import TopSeller from "./TopSeller";

import type { topSellerData } from "@/app/page";

interface Props {
  data: topSellerData[]
}

const About: React.FC<Props> = ({ data }) => {

  return (
    <div id="partnership" className="bg-[#EFEB79] pt-10 md:pt-28 sm:px-20 lg:px-36">
      <div className="w-full bg-white py-1 px-1">
        <div className="lg:flex flex-row overflow-x-scroll py-3">
            {data.map((seller: topSellerData) =>
              <TopSeller key={seller.id} {...seller} />
            )}
        </div>
      </div>
    </div>
  );
}

export default About;