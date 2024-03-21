import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import TokenMarquee from "@/components/home/Marquee";
import Banner from "@/components/home/Banner";

export default function Home() {
  return (
    <main className="min-h-screen w-screen">
      <Header />
      <TokenMarquee />
      <Banner />

      <Footer />
    </main>
  );
}
