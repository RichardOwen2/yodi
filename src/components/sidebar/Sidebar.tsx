'use client'

import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import { AiFillHome, AiOutlineInbox, AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import { FaUsersCog } from "react-icons/fa";
import { deleteCookie } from "cookies-next";


const handleLogout = () => {
    deleteCookie("YODI_TOKEN");
}

const Sidebar = () => {
    return (
        <div className="hidden md:block flex flex-col h-screen p-3 bg-[#F5F5F5] text-black shadow w-60">
            <div className="space-y-3">
                <div className="flex items-center">
                    {/* <h2 className="text-xl font-bold text-white">Dashboard</h2> */}
                    <Logo center={true} />
                </div>
                {/* <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center py-4">
                        <button type="submit" className="p-2 focus:outline-none focus:ring">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </span>
                    <input type="search" name="Search" placeholder="Search..." className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"/>
                </div> */}
                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        <li className="rounded-sm">
                            <Link href="/admin" className="flex items-center p-2 space-x-3 rounded-md">
                                <AiFillHome size={26}/>
                                <span className="text-black">Dashboard</span>
                            </Link>
                        </li>
                        <li className="rounded-sm">
                            <Link href="/admin/item" className="flex items-center p-2 space-x-3 rounded-md">
                                <AiOutlineInbox size={26}/>
                                <span className="text-black">Item</span>
                            </Link>
                        </li>
                        <li className="rounded-sm">
                            <Link href="/admin/user" className="flex items-center p-2 space-x-3 rounded-md">
                               <FaUsersCog size={26}/>
                                <span className="text-black">User</span>
                            </Link>
                        </li>
                        <li className="rounded-sm">
                            <Link href="/setting" className="flex items-center p-2 space-x-3 rounded-md">
                                <AiOutlineSetting size={26}/>
                                <span className="text-black">Setting</span>
                            </Link>
                        </li>
                        <li className="rounded-sm">
                            <div 
                                onClick={handleLogout}
                                className="flex items-center p-2 space-x-3 rounded-md hover:cursor-pointer">
                                <AiOutlineLogout size={26}/>
                                <span className="text-black">Logout</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;