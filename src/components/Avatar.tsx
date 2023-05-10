'use client';

import Image from "next/image";
import { BooleanLiteral } from "typescript";

interface AvatarProps {
  src?: string;
  height?: number;
  width?: number;
  center?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ src = '/images/placeholder.jpg', height = 100, width = 100, center }) => {
  return ( 
    <Image 
      className={`rounded-full ${center ? 'mx-auto' : ''} border-2 border-black`}
      height={height}
      width={width} 
      alt="Avatar"
      src={src || '/images/placeholder.jpg'}
    />
   );
}
 
export default Avatar;