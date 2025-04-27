// src/pages/Home.jsx
import Hero from "../components/Home/Hero";
import HowItWorks from "../components/Home/HowItWorks";
import FeatureSection from "../components/Home/FeatureSection";
import Testimonials from "../components/Home/Testimonials";
import CallToAction from "../components/Home/CallToAction";

export default function Home() {
  return (
    <div className="flex flex-col ">
      <Hero />
      <HowItWorks />
      <FeatureSection />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
