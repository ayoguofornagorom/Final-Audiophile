import React from "react";

const ManD =
  "https://res.cloudinary.com/dbej9cnnv/image/upload/q_auto/f_auto/v1780918072/Man_D_ld22du.png";
const ManM =
  "https://res.cloudinary.com/dbej9cnnv/image/upload/q_auto/f_auto/v1780918084/Man_M_zxp5vo.png";

const Man: React.FC = () => {
  return (
    <section className="px-6 sm:px-[clamp(1.5rem,11.40vw,200px)] mt-14 md:my-32 lg:my-40">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-31.25">
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-8 max-w-111.25">
          <h2 className="font-bold text-[28px] md:text-[40px] leading-tight tracking-[1.5px] md:tracking-[1.43px] uppercase text-black">
            Bringing you the <span className="text-[#D87D4A]">best</span> audio gear
          </h2>
          <p className="text-[15px] leading-relaxed text-black/50 font-medium">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>

        <div className="order-1 lg:order-2 w-full lg:w-auto lg:shrink-0">

          <img src={ManD} alt="" className="w-full hidden lg:block"/>

          <img src={ManM} alt="" className="lg:hidden"/>
        </div>

      </div>
    </section>
  );
};

export default Man;
