import FloatingChatBox from "./components/FloatingChatBox";
import Footer from "./components/Footer";
import AnimatedHero from "./components/AnimatedHero";
import OurServices from "./components/OurServices";
import MobileAppShowcase from "./components/MobileAppShowcase";

export default function Home() {
  return (
    <>
      <AnimatedHero />
      <OurServices />
      <MobileAppShowcase />
      <FloatingChatBox />
      <Footer />
    </>
  );
}
