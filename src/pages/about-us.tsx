import Project from "@/components/about-us/Project";
import Team from "@/components/about-us/Team";
import Contact from "@/components/home/Contact";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Seo from "@/components/shared/Seo";
import React from "react";

function AboutUs() {
  return (
    <main className="font-presstart min-h-screen w-screen overflow-x-hidden bg-darkPurple">
      <Seo title="About Us" />
      <Header />
      <Project />
      <Team />
      <Contact />
      <Footer />
      <div id="modal"></div>
    </main>
  );
}

export default AboutUs;
