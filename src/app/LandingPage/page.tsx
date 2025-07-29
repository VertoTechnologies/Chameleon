import Aboutus from './aboutus'
import Flags from './flags';
import Features from './features';
import Header from '../components/headerComponents/LandingPageHeader';
import Footer from '../components/footerComponents/footer';


export default function LandingPage() {
  return (
    <section className="scroll-smooth overflow-y-auto h-screen scroll-px-14 scrollbar scrollbar-thumb-custom-green scrollbar-track-gray">
      <Header />
      <main>
        <div className="px-2 sm:px-4 lg:px-6">
          <Aboutus />
        </div>
        <div className="px-2 sm:px-4 lg:px-6">
          <Flags />
        </div>
        <div className="px-2 sm:px-4 lg:px-6">
          <Features />
        </div>
      </main>
      <Footer />
    </section>
  )
}
