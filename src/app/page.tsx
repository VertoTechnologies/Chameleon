import Aboutus from '../app/components/aboutus';
import Flags from '../app/components/flags';
import Features from '../app/components/features';
import Header from '../app/components/header';
import Footer from '../app/components/footer';


export default function Home() {
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
