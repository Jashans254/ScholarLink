import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FaQuestionCircle, FaCalculator, FaSearch, FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import React from "react";
export default function Navbar() {
  const { isAuth, user, logoutUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false); // State for dropdown menu

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-500 fixed w-full top-0 left-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 sm:px-6">

        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl sm:text-3xl font-extrabold flex items-center space-x-2 text-white hover:text-yellow-200 transition-transform hover:scale-105"
        >
          <span>ScholarLink</span>
          <svg 
            className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path fill="currentColor" d="M12 0L15.5 7H8.5L12 0zM3.5 9H20.5L12 21 3.5 9z" />
          </svg>
        </Link>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            <FaBars className="text-xl" />
          </button>
        </div>

        {/* Navbar Links (hidden on mobile, shown in dropdown) */}
        <div className="hidden sm:flex items-center space-x-6 text-sm sm:text-lg text-white">
          <Link 
            to="/questions" 
            className="px-3 py-2 rounded-md hover:bg-blue-300 hover:text-white transition-all transform hover:scale-105"
          >
            <FaQuestionCircle className="inline-block mr-2 text-lg" /> QnA Forum
          </Link>
          <Link 
            to="/emi" 
            className="px-3 py-2 rounded-md hover:bg-green-300 hover:text-white transition-all transform hover:scale-105"
          >
            <FaCalculator className="inline-block mr-2 text-lg" /> EMI Calculator
          </Link>
          <Link 
            to="/explore" 
            className="px-3 py-2 rounded-md hover:bg-pink-300 hover:text-white transition-all transform hover:scale-105"
          >
            <FaSearch className="inline-block mr-2 text-lg" /> Explore
          </Link>

          {isAuth ? (
            <>
              <Link 
                to="/user"
                className="px-3 py-2 bg-blue-50 text-blue-700 rounded-full shadow-lg flex items-center space-x-2 text-sm sm:text-lg hover:bg-blue-100 hover:text-blue-800 transition-all transform hover:scale-105"
              >
                <FaUserCircle className="text-lg sm:text-xl" />
                <span>Hi,</span>
                <span className="text-sm sm:text-lg font-bold">{user.name} 👋🏻</span>
              </Link>

              <button
                onClick={logoutUser}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 hover:shadow-lg transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                <FaSignOutAlt className="inline-block mr-2 text-lg" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 sm:px-5 sm:py-2 border-2 border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-white transition-all transform hover:scale-105 text-sm sm:text-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 sm:px-5 sm:py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-lg transition-all transform hover:scale-105 text-sm sm:text-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-16 right-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-500 w-48 shadow-lg rounded-md">
            <Link
              to="/questions"
              className="block px-4 py-2 text-white hover:bg-blue-300 transition-all transform hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaQuestionCircle className="inline-block mr-2 text-lg" /> QnA Forum
            </Link>
            <Link
              to="/emi"
              className="block px-4 py-2 text-white hover:bg-green-300 transition-all transform hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaCalculator className="inline-block mr-2 text-lg" /> EMI Calculator
            </Link>
            <Link
              to="/explore"
              className="block px-4 py-2 text-white hover:bg-pink-300 transition-all transform hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaSearch className="inline-block mr-2 text-lg" /> Explore
            </Link>
            
            {isAuth ? (
              <>
                <Link
                  to="/user"
                  className="block px-4 py-2 text-white bg-blue-50 text-blue-700 rounded-full shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUserCircle className="inline-block mr-2 text-lg" />
                  Hi, {user.name} 👋🏻
                </Link>
                <button
                  onClick={logoutUser}
                  className="block w-full px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaSignOutAlt className="inline-block mr-2 text-lg" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-yellow-400 border-b-2 border-yellow-400 hover:bg-yellow-400 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
