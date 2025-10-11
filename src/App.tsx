import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import { SmoothCursor } from './components/Cursor';

const HomePage = () => (
  <>
    <Hero />
    <Brands />
    <Reviews />
    <FAQ />
    <Footer />
  </>
);

const App = () => {
  return (
    <Router>
      <div className="font-['Plus_Jakarta_Sans'] tracking-tight">
        <SmoothCursor />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/features" element={<Login />} />
          <Route path="/site-builder" element={<Login />} />
          <Route path="/json-editor" element={<Login />} />
          <Route path="/api" element={<Login />} />
          <Route path="/pricing" element={<Login />} />
          <Route path="/docs" element={<Login />} />
          <Route path="/templates" element={<Login />} />
          <Route path="/about" element={<Login />} />
          <Route path="/blog" element={<Login />} />
          <Route path="/careers" element={<Login />} />
          <Route path="/success-stories" element={<Login />} />
          <Route path="/press" element={<Login />} />
          <Route path="/community" element={<Login />} />
          <Route path="/contact" element={<Login />} />
          <Route path="/support" element={<Login />} />
          <Route path="/privacy" element={<Login />} />
          <Route path="/terms" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App