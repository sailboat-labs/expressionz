import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import TokenMarquee from "@/components/home/Marquee";

export default function Home() {
  return (
    <main className="min-h-screen w-screen">
      <Header />
      <TokenMarquee />

      <Footer />
    </main>
  );
}
