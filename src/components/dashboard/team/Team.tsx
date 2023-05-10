'use client'

import TeamImage from "./TeamImage";

const Team = () => {
  return (
    <div className="gap-2 md:gap-0 items-center justify-center bg-white text-black border-2 border-black">
      <div className="pt-8 rounded-xl bg-white drop-shadow-lg aos-init aos-animate" data-aos="zoom-in" data-aos-duration="300">
        <div className="w-11/12 sm:w-2/3 mx-auto mb-10">
          <h1 className="focus:outline-none xl:text-4xl text-2xl text-center text-gray-700 font-extrabold pt-4">Our Team</h1>
        </div>
        <div className="sm:py-6 px-8 sm:24 flex flex-wrap items-center justify-center">
          <TeamImage src="/images/hengki.jpg" name="Hengki Agung" jobdesk="Android Developer" linkedin="" twitter="" facebook="" />
          <TeamImage src="/images/owen.jpg" name="Richard Owen" jobdesk="Back End Developer" linkedin="" twitter="" facebook="" />
          <TeamImage src="" name="Archie Dylan" jobdesk="Front End Developer" linkedin="" twitter="" facebook="" />
        </div>

        <div className="sm:py-6 px-8 sm:24 flex flex-wrap items-center justify-center">
          <TeamImage src="/images/luthfy.jpg" name="Luthfy Ahmad" jobdesk="UI/UX Designer" linkedin="" twitter="" facebook="" />
          <TeamImage src="" name="Andi Agung" jobdesk="CMO" linkedin="" twitter="" facebook="" />
        </div>

      </div>
    </div>
  );
}

export default Team;