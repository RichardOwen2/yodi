'use client'

import Image from "next/image";
import Grid from '@mui/material/Grid'; // Grid version 1
import { AiOutlineArrowDown } from 'react-icons/ai'

const Banner = () => {
  return (
    <div className="bg-[#EFEB79] pt-36 pb-20 sm:px-20 md:px-36 relative">
      <div className="block md:hidden bg-white mx-10">
      <Image src="/images/design_clothes.png" alt="" width="300" height="40" className="mx-auto" />
      </div>
      <div className="md:bg-white md:flex flex-row py-12 md:px-28 md:rounded-tr-[150px] md:rounded-bl-[150px]">
        <div className="text-black md:w-3/4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel fugiat exercitationem laudantium iste amet maiores numquam ratione placeat alias, quibusdam odio ducimus dolor est? Doloribus eaque laudantium vel quas saepe?
          </p>
          <div className="md:mt-20 flex flex-row">
            <div className="mx-2">
              <Image src="/images/iphone_download.png" alt="" width="160" height="100" />
            </div>
            <div className="mx-2">
              <Image src="/images/google_play_download.png" alt="" width="160" height="100" />
            </div>
          </div>
        </div>
        <div className="hidden md:block px-5 md:w-1/2">
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