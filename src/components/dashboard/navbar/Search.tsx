'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
const Search = () => {
  return (
    <div
      className="w-full md:w-auto py-2 transition cursor-pointer text-black">
      <div className="flex flex-row items-center justify-between">
        <a href="#features" className="hidden sm:block text-sm font-semibold md:text-lg px-5 py-2 hover:border-b-2 border-black">
          Features
        </a>
        <a href="#partnership" className="hidden sm:block text-sm font-semibold md:text-lg px-5 py-2 hover:border-b-2 border-black">
          Partnership
        </a>
        <a href="#footer" className="hidden sm:block text-sm font-semibold md:text-lg px-5 py-2 hover:border-b-2 border-black">
          Contact us
        </a>
      </div>
    </div>
  );
}

export default Search;