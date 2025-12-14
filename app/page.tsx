import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import SimulatorSection from "./components/sections/SimulatorSection";
import WhyUs from "./components/sections/WhyUs";
import FinancingSection from "./components/sections/FinancingSection";
import ProcessFAQ from "./components/sections/ProcessFAQ";
import Testimonials from "./components/sections/Testimonials";
import Footer from "./components/sections/Footer";
import SeoSchema from "./components/SeoSchema";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 top-[-220px] h-[520px] bg-gradient-to-b from-primary/20 via-primary/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-28 top-52 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[240px] w-[720px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      <SeoSchema />
      <Navbar />
      <Hero />
      <div className="section relative space-y-20">
        <SimulatorSection />
        <WhyUs />
        <FinancingSection />
        <ProcessFAQ />
        <Testimonials />
      </div>
      <FloatingWhatsAppButton />
      <Footer />
    </main>
  );
}
