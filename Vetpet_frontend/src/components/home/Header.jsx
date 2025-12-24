import React from "react";
import { NavLink } from "react-router-dom";
import image from "../../assets/Vetpet.jpg";
import bgimage from "../../assets/bgImage.jpg";

const Header = () => {
  return (
    <header
      className="py-5"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "85vh",
      }}
    >
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          <h1 className="display-4 fw-bold">Welcome to VET-PET</h1>
          <p className="lead fw-normal text-white-75 mb-4">
            Explore top products and trusted care for your furry friends.
          </p>
          <NavLink
            to="shop"
            className="btn btn-light btn-lg rounded-pill px-4 py-2"
          >
            Shop Now
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
