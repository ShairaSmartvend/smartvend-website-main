import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero } from "./Hero";
import { About } from "./About";
// import { History } from "./History";
// import { VisionMission } from "./VisionMission";
import { Services } from "./Services";
// import { Trust } from "./Trust";
import { Portfolio } from "./Portfolio";
import { BuildWithUs } from "./BuildWithUs";
import { Contact } from "./Contact";

export function HomePage() {
  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
        <About />
        {/*<History />
        <VisionMission />*/}
        <Services />
        {/* <Trust /> */}
        <Portfolio />
        <BuildWithUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
