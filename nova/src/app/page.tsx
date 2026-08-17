import About from "@/components/About";
import Hero from "@/components/Hero";
import Studio from "@/components/Studio";
import Contact from "@/components/Contact";

const Page = () => {
  return (
    <main>
      <section id="home">
        <Hero />
      </section>

      <section id="studio">
        <Studio />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </main>
  );
};

export default Page;
