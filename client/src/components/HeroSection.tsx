import React from "react";
import { Link } from "react-router-dom";

const heroImg =
  "https://res.cloudinary.com/ddgb7e5w1/image/upload/v1780574961/heroImg_xl6fso.svg";

const HeroSection: React.FC = () => {
  return (
    <header className="bg-[#131313] relative overflow-hidden ">
      <div className="px-[clamp(1.5rem,11.40vw,200px)] ">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-132 md:min-h-182.25 lh:min-h-157.75 py-16 md:py-20 lg:py-0 relative ">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 z-10 max-w-95 mt-15 ">
            <div className="flex flex-col lg:gap-6 gap-4 ">
              <p className="text-[14px] tracking-[10px] text-white/50 uppercase ">
                New Product
              </p>

              <h1 className="text-[36px] font-bold md:text-[56px] leading-tight tracking-[2px] uppercase text-white ">
                XX99 Mark II <br className="hidden md:inline " />
                Headphones
              </h1>

              <p className="text-[15px] leading-relaxed text-white/50 max-w-99 ">
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </p>
            </div>

            <div className="md:flex-row items-center md:gap-5 flex-col gap-2 flex  ">
              <Link to="/headphones">
                <button className="bg-[#D87D4A] text-white font-bold text-[13px] tracking-[1px] uppercase px-8 py-4 hover:bg-[#FBAF85] transition-colors duration-200 cursor-pointer ">
                  See Product
                </button>
              </Link>{" "}
              <Link to="/register">
                <button className="text-[16px] font-bold text-white tracking-[1px] hover:text-[#D87D4A] transition-colors uppercase px-11.5 md:py-3.25 py-4 border border-[#FFFFFF]  ">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>

          <div className="lg:flex md:flex w-full lg:w-[55%] right-22 -top-15 lg:-top-23.75 lg:right-17.5 z-0 mt-8 lg:mt-0 md:-top-30 md:right-0.5 absolute ">
            <img
              src={heroImg}
              alt=""
              className="max-w-125 md:max-w-170 lg:max-w-none mx-auto lg:mx-0 z-0 md:w-300 "
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
