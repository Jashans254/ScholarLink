import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { isAuth, user, logoutUser } = useUser();

  return (
    <nav className="bg-white fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="text-3xl font-extrabold flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-transform hover:scale-105"
        >
          <span>ScholarPath</span>
          <svg 
            className="w-8 h-8 text-yellow-400" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path fill="currentColor" d="M12 0L15.5 7H8.5L12 0zM3.5 9H20.5L12 21 3.5 9z" />
          </svg>
        </Link>

        {/* Navbar Links */}
        <div className="flex items-center space-x-6 text-lg font-semibold">
          <Link 
            to="/explore" 
            className="px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-all"
          >
            Explore
          </Link>

          {isAuth ? (
            <>
              <Link 
              to="/user"
              >
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full shadow-sm flex items-center space-x-1">
                <span>Hi,</span>
                <span className="text-xl font-bold">{user.name } 👋🏻</span>

              </span>
              </Link>

              <button
                onClick={logoutUser}
                className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 hover:shadow-lg transition-all transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-lg transition-all transform hover:scale-105"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
