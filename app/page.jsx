import FloatingChatBox from "./components/FloatingChatBox";
import Footer from "./components/Footer";
import AnimatedHero from "./components/AnimatedHero";
import OurServices from "./components/OurServices";
import MobileAppShowcase from "./components/MobileAppShowcase";
import AvailableArea from "./components/AvailableArea";
import FloatingAnnouncement from "./components/FloatingAnnouncement";

export default function Home() {
  return (
    <>
      <AnimatedHero />
      <OurServices />
      <AvailableArea />
      <MobileAppShowcase />
      <FloatingAnnouncement />
      <FloatingChatBox />
      <Footer />
    </>
  );
}
