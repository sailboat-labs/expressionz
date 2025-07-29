import Banner from "@/components/home/Banner";
import Contact from "@/components/home/Contact";
import TokenMarquee from "@/components/home/Marquee";
import SeamlessIntegration from "@/components/home/SeamlessIntegration";
import SelfExpression from "@/components/home/SelfExpression";
import StartJourney from "@/components/home/StartJourney";
import UnlockAssets from "@/components/home/UnlockAssets";
import BaseLayout from "@/components/shared/BaseLayout";
import Seo from "@/components/shared/Seo";

export default function Home() {
  return (
    <>
      <Seo title="Home" />
      <BaseLayout>
        <Banner />
        <TokenMarquee className="mt-12" />
        <UnlockAssets />
        <SelfExpression />
        <SeamlessIntegration />
        <StartJourney />
        <Contact />
      </BaseLayout>
    </>
  );
}
