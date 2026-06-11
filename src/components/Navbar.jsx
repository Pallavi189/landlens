import { NavLink, Link } from "react-router-dom";
import Icon from "./Icon";

const navItems = [
  ["Home", "/"],
  ["SR Value", "/sr-value"],
  ["Stamp Duty Calculator", "/stamp-duty"],
  ["Area Insights", "/area-insights"],
  ["Request Value", "/request-value"],
  ["About Us", "/about"],
];

function Navbar() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="LandLens home">
        <span className="brand-mark">
          <Icon name="building" size={28} />
        </span>
        <span>
          <strong>LandLens</strong>
          <small>Know the real value before you buy</small>
        </span>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map(([label, path]) => (
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            end={path === "/"}
            key={path}
            to={path}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="header-actions">
        <Link className="btn btn-secondary" to="/login">
          <Icon name="user" size={17} />
          Login
        </Link>
        <Link className="btn btn-primary" to="/admin">
          <Icon name="user" size={17} />
          Admin Dashboard
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
