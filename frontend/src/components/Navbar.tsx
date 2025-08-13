import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const user = useSelector((state: any) => state.auth.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen((open) => !open);
  const closeDropdown = () => setDropdownOpen(false);

  // Đóng dropdown nếu click ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutAction());
    closeDropdown();
  };

  // Hàm bảo vệ route
  const handleProtectedClick = (path: string) => {
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 text-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold"
          >
            <div className="text-3xl">📝</div>
            <span>AI Writing Assistant</span>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              About
            </Link>

            {/* Luôn hiển thị nhưng bảo vệ khi click */}
            <Link
              to="/write"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              Write
            </Link>
            <button
              onClick={() => handleProtectedClick("/lessons")}
              className="text-white hover:text-blue-200 transition duration-300"
            >
              Lesson
            </button>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          {accessToken && user ? (
            <>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-9 h-9 cursor-pointer rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg">
                  {user.username[0].toUpperCase()}
                </div>
                <span className="cursor-pointer">{user.username}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg z-10 text-base">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={closeDropdown}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300 mr-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
