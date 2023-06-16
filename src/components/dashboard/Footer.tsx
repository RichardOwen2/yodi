const Footer = () => {
  return (
    <div id="footer" className="gap-2 md:gap-0 items-center justify-center bg-white text-black border-2 border-black">
      <div className="pt-8 rounded-xl bg-white drop-shadow-lg aos-init aos-animate" data-aos="zoom-in" data-aos-duration="300">
        <div className="sm:py-6 px-8 sm:24 flex flex-wrap items-center justify-center">
          <div className="md:w-1/3 lg:w-1/5 flex justify-center mx-20 xl:pb-10 pb-16 items-center">
            <div>YODI@2023</div>
          </div>
          <div className="md:w-1/3 lg:w-2/5 md:flex justify-center mx-20 xl:pb-10 pb-16 items-center">
            <div className="flex-1 mt-5 font-bold">Twitter</div>
            <div className="flex-1 mt-5 font-bold">Instagram</div>
            <div className="flex-1 mt-5 font-bold">Youtube</div>
            <div className="flex-1 mt-5 font-bold">Linkedin</div>
            <div className="flex-1 mt-5 font-bold">Privacy Policy</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;