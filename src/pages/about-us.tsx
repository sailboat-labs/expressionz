import Project from "@/components/about-us/Project";
import Team from "@/components/about-us/Team";
import Contact from "@/components/home/Contact";
import BaseLayout from "@/components/shared/BaseLayout";
import Seo from "@/components/shared/Seo";

function AboutUs() {
  return (
    <>
      <Seo title="About Us" />
      <BaseLayout>
        <Project />
        <Team />
        <Contact />
      </BaseLayout>
    </>
  );
}

export default AboutUs;
