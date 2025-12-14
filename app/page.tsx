import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import SimulatorSection from "./components/sections/SimulatorSection";
import WhyUs from "./components/sections/WhyUs";
import FinancingSection from "./components/sections/FinancingSection";
import ProcessFAQ from "./components/sections/ProcessFAQ";
import Testimonials from "./components/sections/Testimonials";
import Footer from "./components/sections/Footer";
import SeoSchema from "./components/SeoSchema";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SeoSchema />
      <Navbar />
      <Hero />
      <div className="section space-y-20 pb-24">
        <SimulatorSection />
        <WhyUs />
        <FinancingSection />
        <ProcessFAQ />
        <Testimonials />
      </div>
      <Footer />
    </main>
  );
}
