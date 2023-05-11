'use client';

import Image from "next/image";
import { BooleanLiteral } from "typescript";

interface AvatarProps {
  src?: string;
  height?: number;
  width?: number;
  center?: boolean;
  rounded?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ src = '/images/placeholder.jpg', height = 150, width = 150, center, rounded = true }) => {
  return (
    <Image
      className={`
        ${rounded ? 'rounded-full' : ''} 
        ${center ? 'mx-auto' : ''} 
        border-2 border-black`
      }
      height={height}
      width={width}
      alt="Avatar"
      src={src || '/images/placeholder.jpg'}
    />
    // <div
    //   className={`
    //     bg-[url('/images/${src}')]
    //     h-50
    //     ${rounded ? 'rounded-full' : ''} 
    //     ${center ? 'mx-auto' : ''} 
    //     border-2 border-black`
    //   }
    // >

    // </div>
  );
}

export default Avatar;