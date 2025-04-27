// src/components/Footer.jsx
export default function Footer() {
    return (
      <footer className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          © {new Date().getFullYear()} ScholarPath. All rights reserved.
        </div>
      </footer>
    );
  }
  