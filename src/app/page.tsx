import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Agents from "@/components/Agents";
import TokenControl from "@/components/TokenControl";
import Documentation from "@/components/Documentation";
import Download from "@/components/Download";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Agents />
      <TokenControl />
      <Documentation />
      <Download />
      <Footer />
      <BackToTop />
    </main>
  );
}
