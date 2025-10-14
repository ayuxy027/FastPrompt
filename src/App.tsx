import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import Chat from './components/Chat';
import Pricing from './components/Pricing';
import JsonEditorPage from './components/JsonEditorPage';
import SiteBuilder from './components/SiteBuilder';
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
          <Route path="/chat" element={<Chat />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/editor" element={<JsonEditorPage />} />
          <Route path="/site-builder" element={<SiteBuilder />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App