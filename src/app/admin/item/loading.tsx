
'use client'

import ItemTable from "@/components/admin/item/ItemTable";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Skeleton from "@mui/material/Skeleton";


const Loading = () => {
  return (
    <>
      <div className="w-full my-10 bg-white p-10">
        <div className="md:flex flex-row justify-between my-5">
          <h1 className="text-xl font-bold">User List</h1>
          <div className="hidden lg:flex flex-row gap-4 mx-4">
            <Skeleton variant="rectangular" width={30} height={20} />
            <Skeleton variant="rectangular" width={210} height={20} />
            <button className="bg-[#EFEB79] rounded-md px-3 py-1">Search</button>

          </div>
        </div>
        <Skeleton variant="rectangular" className="w-full my-1" height={50} />
        <Skeleton variant="rectangular" className="w-full my-1" height={50} />
        <Skeleton variant="rectangular" className="w-full my-1" height={50} />
        <Skeleton variant="rectangular" className="w-full my-1" height={50} />
        <Skeleton variant="rectangular" className="w-full my-1" height={50} />
      </div>
    </>
  );
}

export default Loading;