'use client'

import axios from "axios";
import useSWR from "swr";

import { getToken } from "@/utils/auth";
import Image from "next/image";
import { BASEURL } from "@/config";

interface IParams {
  params: {
    userId: string;
  }
}


const userDetail = ({ params: { userId } }: IParams) => {
  const fetcher = (url: string) => axios.get(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }).then(res => res.data.data.account)

  const { data, isLoading, error } = useSWR(`${BASEURL}/api/admin/account/${userId}`, fetcher)

  if (isLoading) return <div>loading...</div>

  return (
    <div className="lg:flex flex-row justify-between gap-8 mt-3">
      <div className="bg-white w-full py-2 rounded-lg">
        <div className="flex flex-row justify-between mx-2 my-2">
          <h2 className="text-lg font-bold">Profile</h2>
          <h3 className={`
          px-3 py-1 text-md text-white font-bold rounded-2xl
          ${data.status == "ACTIVE" ? "bg-green-500" : "bg-red-500"}
          `}>{data.status}</h3>
        </div>
        <Image
          className="md:block cursor-pointer mx-auto py-5"
          src={data.image}
          height="200"
          width="200"
          alt="Logo"
        />
      </div>
      <div className="w-full mt-3 py-2 rounded-lg">
        <h2 className="text-lg font-bold">Biodata Diri</h2>
        <div className="text-black text-lg mt-5">
          <div className="flex flex-row gap-10">
            <div className="text-gray-700 w-1/3">Nama</div>
            <div className="text-gray-500">{data.username}</div>
          </div>
          <div className="flex flex-row gap-10">
            <div className="text-gray-700 w-1/3">Email</div>
            <div className="text-gray-500">{data.email}</div>
          </div>
          <div className="flex flex-row gap-10">
            <div className="text-gray-700 w-1/3">Telepon</div>
            <div className="text-gray-500">{data.phoneNumber}</div>
          </div>
          <div className="flex flex-row gap-10">
            <div className="text-gray-700 w-1/3">Mendaftar pada</div>
            <div className="text-gray-500">{data.createdAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default userDetail;
