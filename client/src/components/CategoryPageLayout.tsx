import React from "react";
import type { Product } from "../types";
import "../App.css";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";
import Man from "./Man";

const CategoryIMGone =
  "https://res.cloudinary.com/ddgb7e5w1/image/upload/v1780583428/CatHeadphones_ocp5gw.png";
const CategoryIMGtwo =
  "https://res.cloudinary.com/ddgb7e5w1/image/upload/v1780583428/CatSpeakers_gao3yu.png";
const CategoryIMGthree =
  "https://res.cloudinary.com/ddgb7e5w1/image/upload/v1780583428/CatEarphones_nti4o3.png";

interface CategoryPageLayoutProps {
  // Page title shown qin the balack banner (e.g "HEADPHONES")
  title: string;
  //Array of products to display
  products: Product[];
}

const CategoryPageLayout: React.FC<CategoryPageLayoutProps> = ({
  title,
  products,
}) => {
  return (
    <div className="bg-[#FAFAFA] animate-[fadeIn_0.4s_ease-in]">
      {/* ---- Black title banner -------- */}
      <div className="bg-black py-8 md:py-12 lg:py-24.5 ">
        <h1 className="text-center font-bold text-[28px] md:text-[40px] tracking-[2px] md:tracking-[3px] uppercase text-white">
          {title}
        </h1>
      </div>

      {/* -------- Product List -------- */}
      <section className="px-6 sm:px-[clamp(1rem,11.40vw,200px)] mt-16 md:mt-20 lg:mt-40  ">
        <div className="flex flex-col gap-20 md:gap-28 lg:gap-40  ">
          {products.length > 0 ? (
            products.map((product, index) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  //Alternate image  left/right on eevry other product
                  reversed={index % 2 !== 0}
                />
              );
            })
          ) : (
            // Grateful empty state
            <div className="text-center py-20 ">
              <p className="text-black/50 text-lg ">
                No Products found in this category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* -------Category Navigation Card ----------- */}
      <section className="px-6 sm:px-[clamp(1rem,11.40vw,200px)] mt-24 md:mt-32 lg:mt-40">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-4 lg:gap-8 pt-12 md:pt-0 mt-6 md:mt-14">
          <CategoryCard
            to="/heaphones"
            label="HEADPHONE"
            image={CategoryIMGone}
            className="mt-8 md:mt-12"
          />
          <CategoryCard
            to="/heaphones"
            label="SPEAKERS"
            image={CategoryIMGtwo}
            className="mt-8 md:mt-12"
          />
          <CategoryCard
            to="/heaphones"
            label="EARPHONES"
            image={CategoryIMGthree}
            className="mt-8 md:mt-12"
          />
        </div>
      </section>

      {/* -----------MAN SECTION */}

      <Man />
    </div>
  );
};

export default CategoryPageLayout;
