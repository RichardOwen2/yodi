'use client';

import { useCallback, useState, useContext } from "react";
import { AiFillProfile, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import MenuItem from "./MenuItem";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterMOdal from "@/hooks/useRegisterModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { deleteToken, getToken } from "@/utils/auth";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {AuthenticationContext} from "@/context/AuthContext";
import Avatar from "@/components/Avatar";

const UserMenu = () => {
  const router = useRouter();
  const {data} = useContext(AuthenticationContext); 

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleLogout = () => {
    router.push("/");
    toast((t) => (
      <span>
        Berhasil Logout
      </span>
    ));
    deleteToken();
  }
  


  console.log(data)
  return (
    <>

      <div className="hidden md:block w-full md:w-auto py-2 transition cursor-pointer text-black">
        {data ? (
          <div className="relative text-black">
            <div className="flex felx-row items-center gap-3">
              <div
                onClick={toggleOpen}
                className="p-4 md:py-1 md:pr-3 flex flex-row justify-between items-center gap-6 cursor-pointer border-2 border-white bg-white rounded-full hover:shadow-md transition">
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    <Avatar src={data.image || undefined} width={30} height={30} />
                  </div>
              </div>
            </div>
            {isOpen && (
              <div
                className=" absolute rounded-xl shadow-md md:w-28 bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
                  <MenuItem label="dashboard" onClick={() => router.push("/admin")} />
                  <MenuItem label="logout" onClick={handleLogout} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-row items-center justify-between">
              <div
                onClick={loginModal.onOpen}
                className="text-sm px-2 py-1 mx-1 md:text-md md:px-5 md:mx-2 md:py-2 rounded-full hover:bg-gray-200 border-2 border-black"
              >
                MASUK
              </div><div
                onClick={registerModal.onOpen}
                className="text-sm px-2 py-1 mx-1 md:text-md md:px-5 md:mx-2 md:py-2 rounded-full hover:bg-gray-200 border-2 border-black">
                DAFTAR
              </div>
            </div>
          </>
        )}
      </div >


      <div className="block md:hidden relative text-black">
        <div className="flex felx-row items-center gap-3">
          <div
            onClick={toggleOpen}
            className=" p-4 md:py-1 md:px-2 flex flex-row items-center gap-3 cursor-pointer hoverLshadow-md transition">
            <AiOutlineMenu />
            <div className="hidden md:block">
            </div>
          </div>
        </div>
        {isOpen && (
          <div
            className=" absolute rounded-xl shadow-md w-[40vw] md:w-24 bg-white overflow-hidden right-0 top-12 text-sm">
            {data != null ? (
              <>
                <div className="flex flex-col cursor-pointer">
                  <MenuItem label="logout" onClick={handleLogout} />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col cursor-pointer">
                  <MenuItem label="Login" onClick={loginModal.onOpen} />
                </div>
                <div className="flex flex-col cursor-pointer">
                  <MenuItem label="register" onClick={registerModal.onOpen} />
                </div>
              </>
            )}
          </div>
        )}
      </div>

    </>
  );
}

export default UserMenu;