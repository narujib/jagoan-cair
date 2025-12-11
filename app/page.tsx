import { Suspense } from "react";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import SimulatorSection from "./components/sections/SimulatorSection";
import WhyUs from "./components/sections/WhyUs";
import CollateralTabs from "./components/sections/CollateralTabs";
import FormSection from "./components/sections/FormSection";
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
        <CollateralTabs />
        <Suspense fallback={null}>
          <FormSection />
        </Suspense>
        <ProcessFAQ />
        <Testimonials />
      </div>
      <Footer />
    </main>
  );
}
