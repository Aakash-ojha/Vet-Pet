import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import NavBarLink from "./NavBarLink";

const NavBar = ({ numCartItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 992px)");

    const handleScreenChange = (e) => {
      if (e.matches) {
        setMenuOpen(false); // close mobile menu when entering desktop
      }
    };

    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "/doctors" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "Appointment", path: "/my-appointments" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 mb-0 fixed-top ${styles.stickyNavbar}`}
      >
        <div className="container-fluid px-3 d-flex align-items-center justify-content-between">
          {/* LEFT SIDE */}
          <Link className="navbar-brand fw-bold text-uppercase m-0" to="/">
            VETPET
          </Link>

          {/* DESKTOP MENU */}
          <div className="d-none d-lg-flex align-items-center gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link fw-semibold ${isActive ? "fs-5 active" : "fs-6"}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* RIGHT SIDE (Cart + Desktop SignIn/Profile + Mobile Toggle) */}
          <div className="d-flex align-items-center gap-3">
            {/* Desktop SignIn/Profile (hidden on small screens) */}
            <div className="d-none d-lg-block">
              <NavBarLink />
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className={`btn btn-dark rounded-pill position-relative ${styles.responsiveCart}`}
            >
              <FaShoppingCart />

              {numCartItems > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.4em 0.6em",
                    backgroundColor: "#6050DC",
                  }}
                >
                  {numCartItems}
                </span>
              )}
            </Link>

            {/* Mobile Toggle */}
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              onClick={() => setMenuOpen(true)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MODAL MENU */}
      <MobileNav
        links={navLinks}
        menuOpen={menuOpen}
        closeMenu={() => setMenuOpen(false)}
      />
    </>
  );
};

export default NavBar;
