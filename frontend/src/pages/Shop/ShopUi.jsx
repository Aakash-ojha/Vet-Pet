import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
// this one is only UI at the Home page
const Shop = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-4 md:px-10 lg:px-14  overflow-hidden h-[450px]">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 py-6 md:py-[8vw] md:mb-[-15px]">
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Welcome to VET-PET Store
          </h1>
          <p className="text-lg md:text-xl font-normal text-white/75 mb-8 max-w-2xl">
            Explore top products and trusted care for your furry friends.
          </p>
          <NavLink
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-gray-800 rounded-full px-8 py-3 text-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Shop Now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Shop;
