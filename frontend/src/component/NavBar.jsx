import React from "react";
import { useState } from "react";
import { resources } from "../assets/assets";

import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "Services",
    path: "/services",
    submenu: [
      { name: "Pet Wellness", path: "/services/wellness" },
      { name: "Vaccination", path: "/services/vaccination" },
      { name: "Grooming", path: "/services/grooming" },
      { name: "Dental Care", path: "/services/dental" },
      { name: "Surgery", path: "/services/surgery" },
    ],
  },
  { name: "Shop", path: "/shop" },
  // { name: "Form", path: "/form" },
  { name: "Doctors", path: "/doctors" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer bg-none"
        src={resources.logo}
        alt="Logo"
      />

      <ul className="md:flex items-start gap-10 font-xl">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `relative py-1 text-2xl font-bold block
                 ${isActive ? "text-blue-700" : "text-gray-600"}
                 hover:text-blue-500 transition-colors duration-200 group`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center justify-center">
                    {item.name}
                    {(item.name === "Services" || item.name === "Form") && (
                      <img
                        src={resources.dropdown_icon}
                        className="w-3 h-3 ml-3 relative top-[3px]"
                      />
                    )}
                  </span>

                  <hr
                    className={`
                          absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-blue-700 w-5/5
                        origin-center transform scale-x-0
                             transition-transform duration-300 ease-in-out
                             ${
                               isActive
                                 ? "scale-x-100"
                                 : "group-hover:scale-x-100"
                             }
                    `}
                  />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <div>
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="rounded-full w-10" src={resources.profile_pic} />
            <img className="w-2.5" src={resources.dropdown_icon} alt="" />

            <div className="absolute top-0 right-0 pt-14 text-bold font-me] text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 rounded flex flex-col gap-4 p-4 bg-white shadow-lg">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;

/*

const NavBar = () => {
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img className="w-44 cursor-pointer" src={assets.logo} alt="" />

      <ul className=" md:flex items-start gap-5 font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative py-1 text-lg font-semibold block
               ${isActive ? "text-blue-700" : "text-gray-600"}
               hover:text-blue-500 transition-colors duration-200
               group`
            }
          >
            {({ isActive }) => (
              <>
                HOME
                <hr
                  className={`
                      absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-3/5
                      bg-blue-700 transform transition-transform duration-300
                      ${isActive ? "block" : "hidden"}
                    `}
                />
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              `relative py-1 text-lg font-semibold block
               ${isActive ? "text-blue-700" : "text-gray-600"}
               hover:text-blue-500 transition-colors duration-200
               group`
            }
          >
            {({ isActive }) => (
              <>
                ALL DOCTORS
                <hr
                  className={`
                      absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-3/5
                      bg-blue-700 transform transition-transform duration-300
                      ${isActive ? "block" : "hidden"}
                    `}
                />
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative py-1 text-lg font-semibold block
               ${isActive ? "text-blue-700" : "text-gray-600"}
               hover:text-blue-500 transition-colors duration-200
               group`
            }
          >
            {({ isActive }) => (
              <>
                ABOUT
                <hr
                  className={`
                      absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-3/5
                      bg-blue-700 transform transition-transform duration-300
                      ${isActive ? "block" : "hidden"}
                    `}
                />
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `relative py-1 text-lg font-semibold block
               ${isActive ? "text-blue-700" : "text-gray-600"}
               hover:text-blue-500 transition-colors duration-200
               group`
            }
          >
            {({ isActive }) => (
              <>
                CONTACT
                <hr
                  className={`
                      absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-3/5
                      bg-blue-700 transform transition-transform duration-300
                      ${isActive ? "block" : "hidden"}
                    `}
                />
              </>
            )}
          </NavLink>
        </li>
      </ul>

      <div>
        <button>Create account</button>
      </div>
    </div>
  );
};

export default NavBar;



*/
