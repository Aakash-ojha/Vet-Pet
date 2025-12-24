import { FaShoppingCart } from "react-icons/fa";

import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useState } from "react";
import NavBarLink from "./NavBarLink";
import MobileNav from "./MobileNav";

const NavBar = ({ numCartItems }) => {
  // this is the mobile menu function

  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu open/close
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  // here it ends
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 fixed-top ${styles.stickyNavbar}`}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          VETPET
        </Link>

        <div
          className="d-none d-lg-flex justify-content-center align-items-center gap-3 p-2 "
          style={{ marginLeft: "20rem" }}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              "nav-link px-2 fw-semibold fs-5" +
              (isActive ? " active" : "nav-link px-2 fw-semibold fs-6")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              "nav-link px-2 fw-semibold fs-5" +
              (isActive ? " active" : "nav-link px-2 fw-semibold fs-6")
            }
          >
            Doctors
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              "nav-link px-2 fw-semibold fs-5" +
              (isActive ? " active" : "nav-link px-2 fw-semibold fs-6")
            }
          >
            About
          </NavLink>
          
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              "nav-link px-2 fw-semibold fs-5" +
              (isActive ? " active" : "nav-link px-2 fw-semibold fs-6")
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/my-appointments"
            className={({ isActive }) =>
              "nav-link px-2 fw-semibold fs-5" +
              (isActive ? " active" : "nav-link px-2 fw-semibold fs-6")
            }
          >
            Appointment
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              "nav-link px-2 fw-semibold fs-5" +
              (isActive ? " active" : "nav-link px-2 fw-semibold fs-6")
            }
          >
            Contact Us
          </NavLink>
        </div>

        {/* mobile menu */}

        {/* it maintain hide and show */}
        <div
          id="mobileMenu"
          className={`d-lg-none ${
            menuOpen ? "d-block" : "d-none"
          }  position-absolute w-100`}
          style={{
            top: "100%",
            left: 0,
            zindex: 999,
          }}
        >
          <MobileNav onLinkClick={() => setMenuOpen(false)} />
        </div>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* mobile-menu ends */}

        <div className="collapse navbar-collapse" id="navbarContent">
          <NavBarLink />

          <Link
            to="/cart"
            className={`btn btn-dark ms-3 rounded-pill position-relative ${styles.responsiveCart}`}
          >
            <FaShoppingCart />
            {numCartItems == 0 || (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{
                  fontSize: "0.85rem",
                  padding: "0.5em 0.65em",
                  backgroundColor: "#6050DC",
                }}
              >
                {/* Optional: put cart count here */}
                {numCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
