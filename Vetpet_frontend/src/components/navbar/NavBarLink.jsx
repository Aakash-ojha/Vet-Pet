import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const NavBarLink = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, username } =
    useContext(AuthContext);

  function logout() {
    alert("Do you really wants to Log Out");
    localStorage.removeItem("access");
    setIsAuthenticated(false);
    navigate("/");
  }

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
      {isAuthenticated ? (
        <>
          <li className="nav-item">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold"
                  : "nav-link fw-semibold"
              }
            >
              {`Hi ${username}`}
            </NavLink>
          </li>

          <li className="nav-item" onClick={logout}>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active fw-semibold"
                  : "nav-link fw-semibold"
              }
            >
              Logout
            </NavLink>
          </li>
        </>
      ) : (
        <>
          {/* Show only Login button */}
          <li className="nav-item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-info btn-sm rounded-pill text-white fw-semibold px-3 py-2"
                  : "btn bg-black text-white btn-sm rounded-pill text-white fw-semibold px-3 py-2"
              }
              style={{
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.className =
                  "btn btn-info btn-sm rounded-pill text-white fw-semibold px-3 py-2")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.className =
                  "btn btn-sm rounded-pill text-white fw-semibold px-3 py-2 bg-black")
              }
            >
              Sign in ➜
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavBarLink;
