'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import MenuItem from "./MenuItem";
import useLoginModal from "@/hooks/useLoginModal";

const UserMenu = () => {

  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <>
      <div className="hidden md:block w-full md:w-auto py-2 transition cursor-pointer text-black">
        <div className="flex flex-row items-center justify-between">
          {/* <div className="hidden md:block text-md px-5 mx-2 py-2 border-r-2 border-black">
            <AiOutlineShoppingCart className="text-gray-600 text-xl md:text-2xl" />
          </div> */}
          <div
            onClick={loginModal.onOpen}
            className="text-sm px-2 py-1 mx-1 md:text-md md:px-5 md:mx-2 md:py-2 rounded-full hover:bg-gray-200 border-2 border-black">
            MASUK
          </div>
          {/* <div className="text-sm px-2 py-1 mx-1 md:text-md md:px-5 md:mx-2 md:py-2 rounded-full hover:bg-gray-200 border-2 border-black">
            DAFTAR
          </div> */}
        </div>
      </div>


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
            className=" absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              <MenuItem label="Login" onClick={loginModal.onOpen} />
            </div>
          </div>
        )}
      </div>

    </>
  );
}

export default UserMenu;