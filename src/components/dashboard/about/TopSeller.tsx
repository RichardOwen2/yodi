import Image from "next/image";

import type { topSellerData } from "@/app/page";

const TopSeller:React.FC<topSellerData> = ({
  id,
  user: { image, username },
  city
}) => {
  return (
    <div className="relative text-center bg-white">
      <Image className="rounded-lg" src={image || '/images/placeholder.jpg'} width="200" height="200" alt={username} />
      <div className="absolute bottom-0 left-1 text-black text-[10px] md:text-sm font-bold">
        <div>{username}</div>
        <div>{city}</div>
      </div>
    </div>
  );
}

export default TopSeller;