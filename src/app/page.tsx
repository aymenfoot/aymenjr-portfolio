import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HowIEngineer from "@/components/HowIEngineer";
import Journey from "@/components/Journey";
import TechnicalExpertise from "@/components/TechnicalExpertise";
import Projects from "@/components/Projects";
import Focus from "@/components/Focus";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <HowIEngineer />
      <Journey />
      <TechnicalExpertise />
      <Projects />
      <Focus />
      <Contact />
      <Footer />
    </main>
  );
}
