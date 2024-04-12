import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import TokenMarquee from "@/components/home/Marquee";
import Banner from "@/components/home/Banner";
import UnlockAssets from "@/components/home/UnlockAssets";
import SelfExpression from "@/components/home/SelfExpression";
import SeamlessIntegration from "@/components/home/SeamlessIntegration";
import StartJourney from "@/components/home/StartJourney";
import Contact from "@/components/home/Contact";
import Seo from "@/components/shared/Seo";

export default function Home() {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden bg-darkPurple">
      <Seo title="Home" />
      <Header />
      <Banner />
      <TokenMarquee className="mt-12" />
      <UnlockAssets />
      <SelfExpression />
      <SeamlessIntegration />
      <StartJourney />
      <Contact />
      <Footer />
    </main>
  );
}
