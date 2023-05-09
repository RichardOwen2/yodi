'use client'

import TopSeller from "./TopSeller";



const About = () => {
  return (
    <div className="bg-[#EFEB79] pt-16 md:pt-36 pb-20 sm:px-20 md:px-36">
      <div className="bg-white md:flex flex-row py-12 px-10 md:px-28">
        <div className="text-black md:w-3/4 md:px-10">
          <p className="text-md md:text-xl font-bold text-center">YODI CUSTOM DESIGN</p>
          <p className="text-sm md:text-lg text-justify py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel fugiat exercitationem laudantium iste amet maiores numquam ratione placeat alias, quibusdam odio ducimus dolor est? Doloribus eaque laudantium vel quas saepe?
          </p>
        </div>
        <div className="bg-[#D9D9D9] md:w-1/2 text-black">
          <div className="md:p-5 grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              <TopSeller name={"BPN Sablon"} location={"Balikpapan"} src={undefined} />
              <TopSeller name={"BPN Sablon"} location={"Balikpapan"} src={undefined} />
              <TopSeller name={"BPN Sablon"} location={"Balikpapan"} src={undefined} />
              <TopSeller name={"BPN Sablon"} location={"Balikpapan"} src={undefined} />
          </div>
          <div className="p-10 bg-[#EFEB79] text-center font-bold text-sm md:text-xl">YODI TOP SELLER</div>
          <div className="pr-2 bg-[#EFEB79] text-right text-lg">Learn More</div>
        </div>
      </div>
    </div>
  );
}

export default About;