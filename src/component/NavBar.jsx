import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "ALL DOCTORS", path: "/doctors" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACT", path: "/contact" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />

      <ul className="md:flex items-start gap-5 font-medium">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `relative py-1 text-lg font-semibold block
                 ${isActive ? "text-blue-700" : "text-gray-600"}
                 hover:text-blue-500 transition-colors duration-200 group`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
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
            <img className="rounded-full w-10" src={assets.profile_pic} />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />

            <div className="absolute top-0 right-0 pt-14 text-bold font-me] text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 rounded flex flex-col gap-4 p-4 bg-white shadow-lg">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My profile
                </p>
                <p
                  onClick={() => navigate("my-appointment")}
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
