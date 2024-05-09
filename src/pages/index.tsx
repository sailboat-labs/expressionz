import TokenMarquee from "@/components/home/Marquee";
import Banner from "@/components/home/Banner";
import UnlockAssets from "@/components/home/UnlockAssets";
import SelfExpression from "@/components/home/SelfExpression";
import SeamlessIntegration from "@/components/home/SeamlessIntegration";
import StartJourney from "@/components/home/StartJourney";
import Contact from "@/components/home/Contact";
import Seo from "@/components/shared/Seo";
import BaseLayout from "@/components/shared/BaseLayout";

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
