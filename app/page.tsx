import Header from "./components/Header"
import Hero from "./components/Hero"
import FeatureCards from "./components/FeatureCards"
import TopBottomList from "./components/TopBottomList"
import MapSection from "./components/MapSection"
import FloatingActions from "./components/FloatingActions"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeatureCards />
      <TopBottomList />
      <MapSection />
      <FloatingActions />
      <Footer />
    </main>
  )
}
