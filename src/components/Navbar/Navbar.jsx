import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { FiShoppingCart, FiCoffee, FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";
import { authMessages, getFirebaseErrorMessage } from "../../utils/firebaseErrors";

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/cart", label: "Cart" },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success(authMessages.success.logout);
      navigate("/");
    } catch (err) {
      toast.error(getFirebaseErrorMessage(err));
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getAvatarContent = () => {
    if (user?.photoURL) {
      return (
        <img
          src={user.photoURL}
          alt="User avatar"
          className="w-full h-full object-cover"
        />
      );
    }
    const initial = user?.email?.charAt(0).toUpperCase() || "U";
    return (
      <span className="text-white font-bold text-sm">{initial}</span>
    );
  };

  const getDisplayName = () => {
    return user?.displayName || user?.email?.split("@")[0] || "User";
  };

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

      {/* Cart Icon & Auth */}
      <div className="navbar-end flex items-center gap-2">
        <NavLink to="/cart" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <FiShoppingCart className="text-xl" />
            <span className="badge badge-sm badge-primary indicator-item">0</span>
          </div>
        </NavLink>

        {loading ? (
          <span className="loading loading-spinner loading-sm text-amber-600"></span>
        ) : user ? (
          <>
            {/* Desktop Avatar Dropdown */}
            <div className="dropdown dropdown-end hidden lg:block">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar online"
              >
                <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center overflow-hidden ring-2 ring-amber-200 ring-offset-2">
                  {getAvatarContent()}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-base-100 rounded-box w-64"
              >
                <li className="menu-title px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center overflow-hidden">
                      {getAvatarContent()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">
                        {getDisplayName()}
                      </span>
                      <span className="text-xs text-gray-500 truncate max-w-[150px]">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    {isLoggingOut ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <FiLogOut className="text-lg" />
                    )}
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* Desktop Auth Buttons */}
            <NavLink
              to="/login"
              className="btn btn-outline btn-sm rounded-full hidden lg:inline-flex items-center gap-2 border-amber-600 text-amber-700 hover:bg-amber-50 hover:border-amber-700 transition"
            >
              <FiLogIn className="text-lg" />
              <span>Login</span>
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn-amber-600 btn-sm rounded-full hidden lg:inline-flex items-center gap-2 bg-amber-600 text-white border-amber-600 hover:bg-amber-700 hover:border-amber-700 transition shadow-md"
            >
              <FiUserPlus className="text-lg" />
              <span>Register</span>
            </NavLink>
          </>
        )}

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
            <div className="divider my-1"></div>
            {user ? (
              <>
                <li className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center overflow-hidden">
                      {getAvatarContent()}
                    </div>
                    <span className="text-sm text-gray-600 truncate">
                      {user.email}
                    </span>
                  </div>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="text-red-600 hover:bg-red-50 flex items-center gap-2 w-full"
                  >
                    {isLoggingOut ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <FiLogOut className="text-lg" />
                    )}
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="btn btn-outline btn-sm w-full mt-2 rounded-full flex items-center gap-2 border-amber-600 text-amber-700 hover:bg-amber-50 hover:border-amber-700 transition"
                  >
                    <FiLogIn className="text-lg" />
                    <span>Login</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="btn btn-amber-600 btn-sm w-full mt-1 rounded-full flex items-center gap-2 bg-amber-600 text-white border-amber-600 hover:bg-amber-700 hover:border-amber-700 transition shadow-md"
                  >
                    <FiUserPlus className="text-lg" />
                    <span>Register</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
