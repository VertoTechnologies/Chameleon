import Aboutus from './landingpage/aboutus';
import Flags from './landingpage/flags';
import Features from './landingpage/features';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
export default function Home() {
  return (
    <>
    <Header/>
   <Aboutus />
   <Flags />
   <Features />
   <Footer/>
   </>
  )
}
