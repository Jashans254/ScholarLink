import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Hero() {
     const { isAuth ,user} = useUser();
  return (
    <section className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      <div className="max-w-3xl px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Discover the Perfect Scholarship & Loan for You
        </h1>
        <p className="text-lg md:text-xl mb-8">
          ScholarPath matches you with scholarships and education loans based on your profile — making your dreams accessible.
        </p>
        {!isAuth ? (
  <Link to="/register">
    <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-full hover:bg-gray-100 transition">
      Get Started
    </button>
  </Link>
) : (
  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white-100">
    Let's Get Started, <span className="text-5xl">{user.name}</span> !
  </h2>
)}

      </div>
    </section>
  );
}
