import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Skills from "@/components/Skills";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <div id="skills">
        <Skills />
      </div>
      <div id="work">
        <Projects />
      </div>
      <div id="gallery">
        <Gallery />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </main>
  );
}
