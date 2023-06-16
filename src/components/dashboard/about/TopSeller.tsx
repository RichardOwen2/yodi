import Image from "next/image";

import type { topSellerData } from "@/app/page";

const TopSeller:React.FC<topSellerData> = ({
  id,
  user: { image, username },
  city
}) => {
  return (
    <div className="relative bg-white mx-5 px-4 shadow-lg flex flex-row justify-between">
      <Image className="rounded-lg" src={image || '/images/placeholder.jpg'} width="80" height="80" alt={username} />
      <div className="text-black text-[10px] md:text-sm font-bold">
        <div className="text-lg">{username}</div>
        <div>{city}</div>
      </div>
    </div>
  );
}

export default TopSeller;