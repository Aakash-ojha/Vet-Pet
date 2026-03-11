import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const MobileNav = ({ links, menuOpen, closeMenu }) => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, username } =
    useContext(AuthContext);

  if (!menuOpen) return null;

  function logout() {
    if (window.confirm("Do you really want to log out?")) {
      localStorage.removeItem("access");
      setIsAuthenticated(false);
      closeMenu();
      navigate("/");
    }
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-end align-items-start"
      style={{
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 1050,
        paddingTop: "70px",
      }}
      onClick={closeMenu}
    >
      <div
        className="bg-white rounded shadow p-4 d-flex flex-column"
        style={{
          width: "260px",
          marginRight: "16px",
          maxHeight: "calc(100% - 70px)",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Section: User Avatar + Profile Links */}
        <div className="d-flex flex-column mb-5">
          <div className="d-flex align-items-center gap-3 mb-4">
            <FaUserCircle size={36} className="text-secondary" />
            <div className="fw-semibold">
              {isAuthenticated ? username : "Guest"}
            </div>
          </div>

          <div className="d-flex flex-column gap-2">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/profile"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `nav-link fw-semibold ${isActive ? "text-primary" : "text-dark"}`
                  }
                >
                  My Profile
                </NavLink>
                <NavLink
                  to="/my-appointments"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `nav-link fw-semibold ${isActive ? "text-primary" : "text-dark"}`
                  }
                >
                  Appointments
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="btn btn-sm btn-dark rounded-pill text-white fw-semibold"
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>

        {/* Middle Section: Main Nav Links */}
        <div className="d-flex flex-column gap-4 mb-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `nav-link fw-semibold ${isActive ? "text-primary" : "text-dark"}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Bottom Section: Logout */}
        {isAuthenticated && (
          <button className="btn btn-outline-danger mt-2" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
