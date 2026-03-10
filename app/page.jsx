import FloatingChatBox from "./components/FloatingChatBox";
import Footer from "./components/Footer";
import AnimatedHero from "./components/AnimatedHero";
import OurServices from "./components/OurServices";
import MobileAppShowcase from "./components/MobileAppShowcase";
import FloatingAnnouncement from "./components/FloatingAnnouncement";
import Product from "./components/Product";

export default function Home() {
  return (
    <>
      <MobileAppShowcase />
      <AnimatedHero />
      <OurServices />
      <Product />
      <FloatingAnnouncement />
      <FloatingChatBox />
      <Footer />
    </>
  );
}
