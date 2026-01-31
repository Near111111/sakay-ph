import FloatingChatBox from "./components/FloatingChatBox";
import Footer from "./components/Footer";
import AnimatedHero from "./components/AnimatedHero";
import OurServices from "./components/OurServices";

export default function Home() {
  return (
    <>
      <AnimatedHero />
      <OurServices />
      <FloatingChatBox />
      <Footer />
    </>
  );
}
