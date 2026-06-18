import React from "react";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";
import Man from "../components/Man";

const CategoryIMGone =
  "https://res.cloudinary.com/ddgb7e5w1/image/upload/v1780583428/CatHeadphones_ocp5gw.png";
const CategoryIMGtwo =
  "https://res.cloudinary.com/ddgb7e5w1/image/upload/v1780583428/CatSpeakers_gao3yu.png";
const CategoryIMGthree =
  "https://res.cloudinary.com/ddgb7e5w1/image/upload/v1780583428/CatEarphones_nti4o3.png";

const HomeZX9 =
  "https://res.cloudinary.com/ddgb7e5w1/image/upload/v1780585255/homepageZX9_hhifyu.png";

  const Zx7D =
    "https://res.cloudinary.com/dbej9cnnv/image/upload/v1780914718/ZX7_image_desktop_iscagi.png";
  
  const Zx7M =
    "https://res.cloudinary.com/dbej9cnnv/image/upload/q_auto/f_auto/v1780914710/ZX7_Speaker_Mobile_aetnb1.png";

    const YX1 =
      "https://res.cloudinary.com/dbej9cnnv/image/upload/q_auto/f_auto/v1780916014/YX1_Earphone_Home_s1yvhn.png";

const HomePage: React.FC = () => {
  return (
    <div className="bg-[#FAFAFA] relative ">
      {/* ===============HERO SECTION============= */}
      <HeroSection />
      {/* ===================CATEGORY NAVIGATION CARDS===================== */}
      <section className="px-6 sm:px-[clamp(1.5rem,11.46vw,200px)] mt-12 md:mt-20 lg:mt-30  ">
        {" "}
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-4 lg:gap-8 pt-12 md:pt-0 mt-6 md:mt-14 ">
          {" "}
          <CategoryCard
            to="/headphones"
            label="HEADPHONES"
            image={CategoryIMGone}
            className="mt-8 md:mt-12"
          />
          <CategoryCard
            to="/speakers"
            label="SPEAKERS"
            image={CategoryIMGtwo}
            className="mt-8 md:mt-12"
          />
          <CategoryCard
            to="/earphones"
            label="EARPHONES"
            image={CategoryIMGthree}
            className="mt-8 md:mt-12"
          />
        </div>
      </section>{" "}
      {/* ===================ZX9 SPEAKER FEATURE====================== */}
      <section className="px-6 sm:px-[clamp(1.5rem,11.46vw,200px)] mt-24 md:mt-32 lg:mt-40 ">
        <div className="bg-[#D87D4A] flex flex-col lg:flex-row items-end px-6 md:px-12 lg:px-29.25 pt-14 md:pt-16 lg:pt-0 gap-8 lg:justify-between rounded-xl relative overflow-hidden  ">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none ">
            <div className="absolute -bottom-45 -left-15 w-200 h-200 rounded-full border-2 border-white " />
            <div className="absolute top-25 left-10 w-130 h-130 rounded-full border-2 border-white " />
            <div className="absolute top-35 left-20 w-110 h-110 rounded-full border-2 border-white " />
          </div>

          <div className="relative z-10">
            <img src={HomeZX9} alt="" />
          </div>

          <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-87.25 pb-14 md:pb-16 lg:pb-24 ">
            <h2 className="font-bold text-[36px] md:text-[56px] leading-tight tracking-[2px] uppercase text-white ">
              ZX9 SPEAKER
            </h2>
            <p className="text-[15px] leading-relaxed text-white/75 ">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Link to="/speakers">
              <button className="mt-2 bg-black text-white font-bold text-[13px] tracking-[1px] uppercase px-8 py-4 hover:bg-[#4C4C4C] transition-colors duration-200 cursor-pointer ">
                See Product
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* ZX7 SPEAKER FEATURE */}
      <section className="px-6 sm:px-[clamp(1.5rem,11.40vw,200px)] mt-6 md:mt-8 lg:mt-12">
        <div className="relative rounded-xl overflow-hidden min-h-80 md:min-h-80 flex items-center">
          <img
            src={Zx7M}
            alt=""
            className="absolute inset-0 w-full md:hidden"
          />

          <img
            src={Zx7D}
            alt=""
            className="absolute inset-0 w-full hidden md:block"
          />

          <div className="relative z-10 ml-6 md:ml-16 lg:ml-24 flex flex-col gap-8">
            <h2 className="font-bold text-[28px] tracking-[2px] uppercase text-black">
              {" "}
              ZX7 SPEAKER
            </h2>
            <Link to="/product">
              <button className="border border-black text-black font-bold text-[13px] tracking-[1px] uppercase px-8 py-4 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
                See Product
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* ------------------------YX1 EARPHONE FEATURE -------------------- */}
      <section className="px-6 sm:px-[clamp(1.5rem,11.40vw,200px)] mt-6 md:mt-8 lg:mt-12">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-3">
          <div className="rounded-xl overflow-hidden">

            <img src={YX1} alt="" className="h-50 w-full md:h-80"/>
          </div>

          <div className="bg-[#F1F1F1] rounded-xl flex items-center h-50 md:h-auto">
            <div className="ml-6 md:ml-10 lg:ml-24 flex flex-col gap-8 text-start">
              <h2 className="font-bold text-[28px] tracking-[2px] uppercase text-black"> YX1 EARPHONES</h2>
              <Link to="/product">
                {" "}
                <button className="border border-black text-black font-bold text-[13px] tracking-[1px] uppercase px-8 py-4 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">See Product

                </button>
            </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------MAN ------------------------------- */}
      <Man />
    </div>
  );
};

export default HomePage;
