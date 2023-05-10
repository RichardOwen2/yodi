'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  center?: boolean;
}

const Logo: React.FC<LogoProps> = ({ center }) => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push('/')}
      className={`
        md:block cursor-pointer py-5
        ${center ? 'mx-auto' :''}
        `}
      src="/images/Yodi_LOGO.png"
      height="100"
      width="100"
      alt="Logo"
    />
  );
}

export default Logo;
