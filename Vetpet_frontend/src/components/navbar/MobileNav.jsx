import { NavLink } from "react-router-dom";

const MobileNav = ({ links, menuOpen, closeMenu }) => {
  if (!menuOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 right-40 w-100 h-100 d-flex justify-content-end align-items-start"
      style={{
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 1050,
        paddingTop: "70px",
        left: 0,
        right: 0,
      }}
      onClick={closeMenu}
    >
      <div
        className="bg-white rounded shadow p-4 d-flex flex-column"
        style={{
          width: "260px",
          marginRight: "16px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button aligned right */}
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-sm btn-dark rounded-circle"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Links stacked vertically */}
        <div className="d-flex flex-column gap-4">
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
      </div>
    </div>
  );
};

export default MobileNav;
