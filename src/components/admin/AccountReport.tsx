'use client'

import { BiUserCircle } from "react-icons/bi";


const AccountReport = () => {
  return (
    <div className="h-52 md:w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 my-5 relative p-5 rounded-xl text-center">
      <div className="font-bold">Account Report</div>
      <div className="text-sm flex flex-row mx-auto"> <BiUserCircle size={20} /> 15 New Account</div>
    </div>
  );
}

export default AccountReport;