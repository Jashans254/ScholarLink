// src/pages/Explore.jsx

import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Explore() {
    const { isAuth , user} = useUser();
  return (
    <section className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 min-h-screen text-white">
      {/* Hero Section */}
      <div className="text-center px-4 pt-24 pb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Dreams Deserve the Right Support.
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Find Scholarships & Education Loans personalized just for you.
        </p>
        {
  !isAuth ? (
    <Link to="/login">
      <button  className="inline-block px-8 py-3 bg-white text-blue-700 font-semibold rounded-full hover:bg-gray-100 transition">
     
        Get Started →
      </button> </Link>
  ) : (
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white-100">
      Let's Get Started, <span className="text-5xl">{user.name}</span>!
    </h2>
  )
}

        
      </div>

      {/* Options Section */}
      <div id="options" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl px-6 pb-20">

        {/* Scholarships Card */}
        <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-lg hover:scale-105 transform transition">
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl mb-4">✨🎓</div>
            <h2 className="text-2xl font-bold mb-4">Scholarships - Study Without Worries</h2>
            <ul className="text-left space-y-2 mb-6">
              <li>✔️ Merit-based and Need-based options</li>
              <li>✔️ No repayment stress</li>
              <li>✔️ National and State-level schemes</li>
            </ul>
            <Link to="/scholarships">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                Find Scholarships →
              </button>
            </Link>
            <span className="text-xs mt-4 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Over ₹50 Crore in Scholarships Listed
            </span>
          </div>
        </div>

        {/* Loans Card */}
        <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-lg hover:scale-105 transform transition">
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl mb-4">💰🔧</div>
            <h2 className="text-2xl font-bold mb-4">Education Loans - Invest in Your Future</h2>
            <ul className="text-left space-y-2 mb-6">
              <li>✔️ Flexible repayment options</li>
              <li>✔️ Lower interest for education</li>
              <li>✔️ Loans from trusted banks</li>
            </ul>
            <Link to="/loans">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
                See Loan Options →
              </button>
            </Link>
            <span className="text-xs mt-4 inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              Top 10 Banks' Student Loans Compared
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
