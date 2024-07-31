import Aboutus from './aboutus'
import Flags from './flags';
import Features from './features';
import Header from '../components/headerComponents/LandingPageHeader';
import Footer from '../components/footerComponents/footer';


export default function LandingPage() {
  return (
    <section className="scroll-smooth overflow-y-auto h-screen scroll-px-14 scrollbar scrollbar-thumb-custom-green scrollbar-track-gray">
      <Header />
      <div className="p-4">
        <Aboutus />
      </div>
      <div className="p-4">
        <Flags />
      </div>
      <div className="p-4">
        <Features />
      </div>
      <Footer />
    </section>
  )
}
