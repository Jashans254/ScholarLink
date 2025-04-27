import { FaUserEdit, FaSearch, FaCheckCircle } from "react-icons/fa";

export default function HowItWorks() {
  return (
    <section className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white p-4 rounded-full mb-4">
              <FaUserEdit size={30} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fill Your Profile</h3>
            <p className="text-gray-600">
              Complete a simple form with your academic and personal details.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-indigo-600 text-white p-4 rounded-full mb-4">
              <FaSearch size={30} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
            <p className="text-gray-600">
              Our intelligent engine matches you with best-fit scholarships and loans.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-green-600 text-white p-4 rounded-full mb-4">
              <FaCheckCircle size={30} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Apply Easily</h3>
            <p className="text-gray-600">
              Access application details and start applying in a few clicks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
