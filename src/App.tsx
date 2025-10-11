import Hero from './components/Hero';
import Brands from './components/Brands';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="font-['Plus_Jakarta_Sans'] tracking-tight">
      <Hero />
      <Brands />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default App