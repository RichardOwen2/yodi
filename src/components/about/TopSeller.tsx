import Image from "next/image";

interface TopSellerProps {
  name: string;
  src: string | null | undefined;
  location: string;

}

const TopSeller:React.FC<TopSellerProps> = ({
  name,
  src,
  location
}) => {
  return (
    <div className="relative text-center">
      <Image className="rounded-lg" src={src || '/images/placeholder.jpg'} width="200" height="200" alt={"asd"} />
      <div className="absolute bottom-0 left-1 text-black text-[10px] md:text-sm font-bold">
        <div>{name}</div>
        <div>{location}</div>
      </div>
    </div>
  );
}

export default TopSeller;