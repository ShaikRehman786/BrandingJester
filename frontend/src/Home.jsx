import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Team from "./components/Team";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Clients from "./components/Clients";

function Home() {
  return (
    <>
      <div className="grid-background"></div>
      <div className="light-effect"></div>

      <Header />
      <Hero />
      <Clients />
      <Portfolio />
      <Services />
      <Pricing />
      <Team />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
