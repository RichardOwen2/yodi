'use client'

import { MdLocationPin } from 'react-icons/md';
import type { ItemData } from './Item'
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from "next/navigation";

const ItemCard = ({
  id,
  title,
  description,
  sold,
  seller,
  itemVariant,
  itemImage,
  _count
}: ItemData) => {
  const [isShown, setIsShown] = useState(false);
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-lg shadow-lg h-full cursor-pointer"
      onClick={() => router.push(`item/${id}`)}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <div className="w-full relative pt-[100%]">
        <Image
          className="w-full h-full top-0 left-0 object-cover rounded-t-lg"
          src={itemImage[0].image}
          alt={''}
          objectFit="cover"
          fill
        />
      </div>
      <div className="px-3 py-3">
        <h3 className="text-md">{title}</h3>
        <p className="text-lg font-bold">Rp{itemVariant[0].price}</p>
        {isShown ? (
          <div className="text-sm">{seller.user.username}</div>
        ) : (
          <div className="flex flex-row text-sm">
            <MdLocationPin className="text-red-500" size={20} />
            {seller.city}
          </div>
        )}
        <div className="flex flex-row text-sm">
          Terjual {sold}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;