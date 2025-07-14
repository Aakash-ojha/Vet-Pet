// import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <img src={assets.logo} alt="" />
      <ul>
        <NavLink>
          <li>Home</li>
        </NavLink>
        <NavLink>
          <li>All Doctors</li>
        </NavLink>
        <NavLink>
          <li>About</li>
        </NavLink>
        <NavLink>
          <li>Contact</li>
        </NavLink>
      </ul>
      <div>
        <button>Create account</button>
      </div>
    </div>
  );
};

export default NavBar;
