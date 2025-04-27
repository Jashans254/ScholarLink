export default function Testimonials() {
  return (
    <div className="bg-gray-100 py-16 text-center">
      <h2 className="text-3xl font-semibold mb-8">What Our Users Say</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Testimonial 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-xl mb-4">
            "ScholarPath helped me discover scholarships I didn’t know about. It made my application process so easy!"
          </p>
          <p className="font-semibold">Aditi Sharma</p>
          <p className="text-gray-500">Engineering Student</p>
        </div>
        {/* Testimonial 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-xl mb-4">
            "The loan recommendations were spot on. I got the exact loan I needed for my studies. Highly recommend!"
          </p>
          <p className="font-semibold">Ravi Kumar</p>
          <p className="text-gray-500">Medical Student</p>
        </div>
        {/* Testimonial 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-xl mb-4">
            "Easy to use and saved me hours of research! I found the best scholarships for my specific needs."
          </p>
          <p className="font-semibold">Priya Joshi</p>
          <p className="text-gray-500">MBA Student</p>
        </div>
      </div>
    </div>
  );
}
