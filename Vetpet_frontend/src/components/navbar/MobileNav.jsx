import React from "react";
import { NavLink } from "react-router-dom";

function MobileNav({ onLinkClick }) {
  return (
    <div>
      {/* hii */}
      <div className="d-block d-lg-none  navbar-nav  mb-2 mb-lg-0 text-center  bg-light ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            "nav-link px-2 fw-semibold fs-5" +
            (isActive ? " active" : "nav-link px-2 fw-semibold fs-6")
          }
          onClick={onLinkClick}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            "nav-link px-2 fw-semibold fs-5" +
            (isActive ? " active" : "nav-link px-2 fw-semibold fs-6")
          }
          onClick={onLinkClick}
        >
          About
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            "nav-link px-2 fw-semibold fs-5" +
            (isActive ? " active" : "nav-link px-2 fw-semibold fs-6")
          }
          onClick={onLinkClick}
        >
          Shop
        </NavLink>
        <NavLink
          to="/appointment"
          className={({ isActive }) =>
            "nav-link px-2 fw-semibold fs-5" +
            (isActive ? " active" : "nav-link px-2 fw-semibold fs-6")
          }
          onClick={onLinkClick}
        >
          Appointment
        </NavLink>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            "nav-link px-2 fw-semibold fs-4" +
            (isActive ? " active" : "nav-link px-2 fw-semibold fs-6")
          }
          onClick={onLinkClick}
        >
          Contact Us
        </NavLink>
      </div>
    </div>
  );
}

export default MobileNav;
