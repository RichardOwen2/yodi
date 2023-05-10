'use client'

import Container from "../Container";

const Achievement = () => {
  return (
    <div className="bg-white text-black text-center md:px-10 py-10">
      <div className="inline-block md:hidden bg-white font-bold text-xl md:text-2xl mb-5">Create Your Design</div>
      <div className="flex flex-row items-center justify-between">
        <div className="hidden md:inline-block mx-1 font-bold text-lg md:text-2xl">Create Your Design</div>
        <div>
          <label className="block mx-1 font-bold text-md md:text-2xl">50+</label>
          <label className="text-sm sm:text-md md:text-lg">Partnership</label>
        </div>
        <div>
          <label className="block mx-1 font-bold text-md md:text-2xl">100+</label>
          <label className="text-sm sm:text-md md:text-lg">Penjual Terdaftar</label>
        </div>
        <div>
          <label className="block mx-1 font-bold text-md md:text-2xl">1K+</label>
          <label className="text-sm sm:text-md md:text-lg">Design Template</label>
        </div>
      </div>
    </div>
  );
}

export default Achievement;