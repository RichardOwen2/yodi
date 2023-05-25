'use client'

import axios from "axios";
import useSWR from "swr";
import ItemCard from "./ItemCard";


export interface ItemData {
  seller: {
    user: {
      username: string;
      image: string | null;
    };
    city: string;
  };
  itemImage: {
    image: string;
  }[];
  itemVariant: {
    price: number;
  }[];
  _count: {
    itemVariant: number;
  };
  id: string;
  title: string;
  description: string;
  sold: number;
}

interface FetchProps {
  data: ItemData[] | undefined;
  isLoading: boolean;
  error: any;
}

const Item = () => {
  const fetcher = (url: string) => axios.get(url).then(res => res.data.data.items)

  const { data, isLoading, error }: FetchProps = useSWR(`api/item?page=1&itemCount=30`, fetcher)


  if (isLoading) return <div>loading...</div>
  if (!data) return <div>loading...</div>

  console.log(data)

  return (
    <div className="items-center justify-center bg-white text-black border-2 border-black grid grid-cols-6 gap-4 md:gap-2">
      {data.map((data) =>
        <ItemCard {...data} key={data.id} />
      )}
    </div>
  );
}

export default Item;