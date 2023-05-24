'use client'

import Image from "next/image";
import Grid from '@mui/material/Grid'; // Grid version 1
import { AiOutlineArrowDown } from 'react-icons/ai'
import Link from "next/link";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="bg-[#EFEB79] pt-36 pb-20 sm:px-20 lg:px-36 relative">
      <div className="block lg:hidden bg-white mx-10">
        <Image src="/images/design_clothes.png" alt="" width="300" height="40" className="mx-auto" />
      </div>
      <div className="lg:bg-white lg:flex flex-row py-12 lg:px-28 lg:rounded-tr-[150px] lg:rounded-bl-[150px]">
        <div className="text-black lg:w-3/4">
          <div className="text-justify px-10">
            <h1 className="text-lg font-bold pb-3">YODI YOUR DESIGN</h1>
            <p className="">
              YoDi adalah sebuah Startup yang bergerak dibidang fashion & craft , YoDI bekerja sebagai penengah dari pencari dan penyedia jasa sablon
            </p>
          </div>
          <div className="lg:mt-20 flex flex-row justify-center md:justify-normal my-4">
            <div className="mx-2 flex flex-row hover:cursor-pointer">
              <Link href={""}>
                <FaAppStoreIos className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px]" />
              </Link>
              <p className="font-bold text-sm md:text-xl px-3 m-auto">App Store</p>
              {/* <Image src="/images/iphone_download.png" alt="" width="160" height="100" /> */}
            </div>
            <div className="mx-2 flex flex-row hover:cursor-pointer">
              <Link href={""}>
                <FaGooglePlay className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px]" />
              </Link>
              <p className="font-bold text-sm md:text-xl px-3 m-auto">Google Play</p>
              {/* <Image src="/images/google_play_download.png" alt="" width="160" height="100" /> */}
            </div>
          </div>
        </div>
        <div className="hidden lg:block px-5 lg:w-1/2">
          <Image src="/images/design_clothes.png" alt="" width="300" height="40" className="mx-auto" />
        </div>
      </div>
      <div className="absolute flex flex-row bottom-0 right-1 bg-white text-black px-5 py-2 text-sm font-bold transform skew-x-12">
        <div className="mt-1"><AiOutlineArrowDown /></div>
        <div>Scroll For More</div>
      </div>
    </div>

  );
}

export default Banner;