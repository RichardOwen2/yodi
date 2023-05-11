'use client'

import Link from "next/link";
import Avatar from "../../Avatar";
import { RiFacebookBoxFill, RiLinkedinBoxFill, RiTwitterLine } from "react-icons/ri"

interface TeamImageProps {
  src?: string;
  name: string;
  jobdesk: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  rounded?: boolean;
}

const TeamImage: React.FC<TeamImageProps> = ({
  src,
  name,
  jobdesk,
  linkedin,
  twitter,
  facebook,
  rounded,
}) => {
  return (
    <div className="md:w-1/3 lg:w-1/5 flex justify-center mx-20 xl:pb-10 pb-16 items-center inset-0 transform hover:scale-125 transition duration-300 drop-shadow-xl">
      <div className="bg-[#EFEB79] px-10 py-5 rounded-xl border-2 border-black">
        <Avatar src={src} center={true} rounded={rounded} />

        {/* Body */}
        <div className="text-center pt-3">
          <div className="text-xl font-bold">{name}</div>
          <div className="text-sm">{jobdesk}</div>
        </div>

        {/* Footer */}
        <div className="flex flex-row justify-between mt-10 text-gray-600">
          <Link href={linkedin} className="hover:bg-white hover:rounded-full p-1">
            <RiTwitterLine size="25px" />
          </Link>
          <Link href={twitter} className="hover:bg-white hover:rounded-full p-1">
            <RiLinkedinBoxFill size="25px" />
          </Link>
          <Link href={facebook} className="hover:bg-white hover:rounded-full p-1">
            <RiFacebookBoxFill size="25px" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TeamImage;