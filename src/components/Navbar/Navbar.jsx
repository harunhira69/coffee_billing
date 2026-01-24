import { NavLink } from "react-router";
import { FiShoppingCart, FiCoffee } from "react-icons/fi";

const Navbar = () => {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/cart", label: "Cart" },
  ];

  return (
    <nav className="navbar bg-base-100 shadow-lg px-4 lg:px-8">
      {/* Logo */}
      <div className="navbar-start">
        <NavLink to="/" className="btn btn-ghost text-xl gap-2">
          <FiCoffee className="text-2xl text-amber-600" />
          <span className="font-bold text-amber-800">Coffee Shop</span>
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `font-medium ${
                    isActive
                      ? "text-amber-600 bg-amber-50"
                      : "hover:text-amber-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Cart Icon */}
      <div className="navbar-end">
        <NavLink to="/cart" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <FiShoppingCart className="text-xl" />
            <span className="badge badge-sm badge-primary indicator-item">0</span>
          </div>
        </NavLink>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? "text-amber-600" : ""
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
