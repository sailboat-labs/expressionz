import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import TokenMarquee from "@/components/home/Marquee";
import Banner from "@/components/home/Banner";
import UnlockAssets from "@/components/home/UnlockAssets";
import SelfExpression from "@/components/home/SelfExpression";
import SeamlessIntegration from "@/components/home/SeamlessIntegration";
import StartJouney from "@/components/home/StartJouney";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <main className="min-h-screen w-screen bg-darkPurple">
      <Header />
      <TokenMarquee />
      <Banner />
      <UnlockAssets />
      <SelfExpression />
      <SeamlessIntegration />
      <StartJouney />
      <Contact />
      <Footer />
    </main>
  );
}
