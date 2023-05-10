'use client';

'use client'

import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";

const UserMenu = () => {
  return (
    <div className="text-right flex flex-row">
      <AiOutlineSearch className="mx-3 my-1" size="30px" />
      <AiOutlineBell className="mx-3 my-1" size="30px" />
    </div>
  );
}

export default UserMenu;