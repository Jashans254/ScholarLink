import { FaBolt, FaShieldAlt, FaClock, FaAward } from "react-icons/fa";

export default function FeatureSection() {
  return (
    <section className="py-16 bg-white-200">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          Why Choose ScholarPath?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-yellow-400 text-white p-4 rounded-full mb-4">
              <FaBolt size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant Matches</h3>
            <p className="text-gray-600">
              Get scholarship and loan matches within seconds after filling your profile.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-green-500 text-white p-4 rounded-full mb-4">
              <FaShieldAlt size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600">
              Your personal data is securely encrypted and never shared without consent.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-purple-500 text-white p-4 rounded-full mb-4">
              <FaClock size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Time-Saving</h3>
            <p className="text-gray-600">
              No more searching manually — find everything you need in one place.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 text-white p-4 rounded-full mb-4">
              <FaAward size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Trusted by Students</h3>
            <p className="text-gray-600">
              Hundreds of students rely on ScholarPath for their educational journeys.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
