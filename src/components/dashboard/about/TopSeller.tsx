import Image from "next/image";

interface TopSellerProps {
  name: string;
  src: string | null | undefined;
  city: string;

}

const TopSeller:React.FC<TopSellerProps> = ({
  name,
  src,
  city
}) => {
  return (
    <div className="relative text-center bg-white">
      <Image className="rounded-lg" src={src || '/images/placeholder.jpg'} width="200" height="200" alt={name} />
      <div className="absolute bottom-0 left-1 text-black text-[10px] md:text-sm font-bold">
        <div>{name}</div>
        <div>{city}</div>
      </div>
    </div>
  );
}

export default TopSeller;