'use client'

import { BiArchiveIn } from "react-icons/bi";

const ItemReport = () => {
  return (
    <div className="h-52 md:w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 my-5 relative p-5 rounded-xl text-center">
      <div className="font-bold">Item Report</div>
      <div className="text-sm flex flex-row justify-center my-3 gap-2"><BiArchiveIn size={20} /> <div>10 Item Add</div> </div>
    </div>
  );
}

export default ItemReport;