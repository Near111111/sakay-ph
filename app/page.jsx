import FloatingChatBox from "./components/FloatingChatBox";
import Footer from "./components/Footer";
import AnimatedHero from "./components/AnimatedHero";
import OurServices from "./components/OurServices";
import MobileAppShowcase from "./components/MobileAppShowcase";
import FloatingAnnouncement from "./components/FloatingAnnouncement";

export default function Home() {
  return (
    <>
      <MobileAppShowcase />
      <AnimatedHero />
      <OurServices />
      <FloatingAnnouncement />
      <FloatingChatBox />
      <Footer />
    </>
  );
}
