'use client'

import axios from "axios";
import useSWR from "swr";

import { getToken } from "@/utils/auth";
import Image from "next/image";
import { MdLocationPin } from "react-icons/md";
import { useEffect, useState } from "react";
import { BASEURL } from "@/config";

import type { AccountStatus } from "@prisma/client";

interface IParams {
  params: {
    itemId: string;
  }
}

interface itemDetailData {
  id: string;
  title: string,
  description: string,
  seller: {
    id: string;
    user: {
      username: string;
      email: string;
      status: AccountStatus;
    };
    verifiedAt: Date | null;
  };
  itemVariant: {
    label: string;
    price: number;
    stock: number;
  }[];
  itemImage: {
    image: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  verifiedAt: Date | null;
}

interface fetchData {
  data: itemDetailData | undefined;
  isLoading: boolean;
  error: any;
}

interface ItemVariant {
  label: string;
  price: number;
  stock: number;
}

const itemDetail = ({ params: { itemId } }: IParams) => {

  const fetcher = (url: string) => axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).then(res => res.data.data.item)

  const { data, isLoading, error }: fetchData = useSWR(`${BASEURL}/api/partner/item/${itemId}`, fetcher)
  const [selectedImage, setSelectedImage] = useState<undefined | string>();
  const [selectedVariant, setSelectedVariant] = useState<ItemVariant | undefined>();

  useEffect(() => {
    if (data) {
      setSelectedImage(data.itemImage[0].image);
      setSelectedVariant(data.itemVariant[0]);
    }
  }, [data])

  if (isLoading) return <div>loading...</div>

  if (error) {
    return (
      <div>
        {error.meesage}
      </div>
    )
  };

  if (!data) return;
  console.log(data);
  return (
    <div className="lg:flex flex-row justify-between gap-8 mt-3 bg-white w-full py-8 px-16 rounded-lg">
      <div className="w-7/12">
        <div className="relative pt-[100%]">
          <Image
            className="cursor-pointer"
            src={selectedImage || data.itemImage[0].image}
            objectFit="cover"
            fill
            alt="Logo"
          />
        </div>
        <div className="w-full flex flex-row gap-3 my-2 overflow-x-scroll">
          {data.itemImage.map(({ image }) =>
            <Image
              onClick={() => setSelectedImage(image)}
              className="rounded-xl cursor-pointer hover:border-2 hover:border-gray-500"
              src={image}
              height={80}
              width={80}
              alt="Logo"
            />
          )}
        </div>
      </div>

      <div className="w-full mt-3 py-2 rounded-lg">
        <h2 className="text-2xl font-bold">{data.title.toUpperCase()}</h2>
        <div className="flex flex-row gap-5 text-md">
          <h4>Terjual <span>100</span></h4>
          <div className="flex flex-row \"> <MdLocationPin className="text-red-500" size={20} /></div>
        </div>
        <h1 className="text-3xl font-bold mt-5">Rp{selectedVariant?.price}</h1>
        <div className="text-black text-lg mt-5">
          <div className="flex flex-row gap-10 mb-5">
            <div className="text-gray-700">Pilih Varian: </div>
            <div className="text-gray-700">{selectedVariant?.label}</div>
          </div>
          <div className="mb-5">
            {data.itemVariant.map((variant: ItemVariant) =>
              <button
                onClick={() => setSelectedVariant(variant) }
                className="bg-white border-2 py-1 px-5 mx-1 rounded-xl">
                {variant.label}
              </button>
            )}
          </div>
          <hr />
          <div className="flex flex-row gap-10 mt-2">
            <div className="text-gray-700 text-md px-2 pb-2 hover:border-b-2">Detail</div>
            <div className="text-gray-700 text-md px-2 pb-2 hover:border-b-2">Info penting</div>
          </div>
          <hr />
          <div className="text-md text-gray-500 mt-3">
            <div className="py-0.5">Stok: <span className="text-black">{selectedVariant?.stock}</span></div>
            <div className="py-0.5">Price: <span className="text-black">{selectedVariant?.price}</span></div>
            {/* <div className="py-0.5">Penjual/Toko: <span className="text-black">{data.seller.user.username}</span></div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default itemDetail;
