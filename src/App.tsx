import Hero from './components/Hero';
import Brands from './components/Brands';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { SmoothCursor } from './components/Cursor';

const App = () => {
  return (
    <div className="font-['Plus_Jakarta_Sans'] tracking-tight">
      <SmoothCursor />
      <Hero />
      <Brands />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default App