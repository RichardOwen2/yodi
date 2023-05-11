'use client'

import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import { AiFillHome, AiOutlineInbox, AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import { FaUsersCog } from "react-icons/fa";
import { deleteToken } from "@/utils/auth"

const handleLogout = () => {
    deleteToken()
}

const Sidebar = () => {
    return (
        <div className="hidden md:block flex flex-col h-screen p-3 bg-[#F5F5F5] text-black shadow w-60">
            <div className="space-y-3">
                <div className="flex items-center">
                    <Logo center={true} />
                </div>
                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        <li className="rounded-sm">
                            <Link href="/admin" className="flex items-center p-2 space-x-3 rounded-md hover:bg-white">
                                <AiFillHome size={26}/>
                                <span className="text-black">Dashboard</span>
                            </Link>
                        </li>
                        <li className="rounded-sm">
                            <Link href="/admin/item" className="flex items-center p-2 space-x-3 rounded-md hover:bg-white">
                                <AiOutlineInbox size={26}/>
                                <span className="text-black">Item</span>
                            </Link>
                        </li>
                        <li className="rounded-sm">
                            <Link href="/admin/user" className="flex items-center p-2 space-x-3 rounded-md hover:bg-white">
                               <FaUsersCog size={26}/>
                                <span className="text-black">User</span>
                            </Link>
                        </li>
                        <li className="rounded-sm">
                            <Link href="/setting" className="flex items-center p-2 space-x-3 rounded-md hover:bg-white">
                                <AiOutlineSetting size={26}/>
                                <span className="text-black">Setting</span>
                            </Link>
                        </li>
                        <li className="rounded-sm">
                            <div 
                                onClick={handleLogout}
                                className="flex items-center p-2 space-x-3 rounded-md hover:bg-white hover:cursor-pointer">
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