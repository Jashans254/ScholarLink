import { Link } from "react-router-dom";

import { useUser } from "../../context/UserContext";
export default function CTA() {
  const { isAuth} = useUser();
  return (
    <div className="bg-blue-600 text-white py-16 text-center">
      <h2 className="text-3xl font-semibold mb-4">
        Ready to find the best scholarship and loan options?
      </h2>
      <p className="mb-6">
        Fill out your profile today and get personalized recommendations instantly!
      </p>
      {isAuth?(<Link 
      to="/explore-recommendations"
      className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
      >
        Get Started
      </Link>):(
        <Link 
        to="/register"
        className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </Link>)}
    </div>
  );
}
