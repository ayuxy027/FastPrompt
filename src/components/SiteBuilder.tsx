import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const SiteBuilder: React.FC = () => {
  // const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const navigate = useNavigate();

  // Mock components for the palette
  // const componentPalette = [
  //   { id: 'header', name: 'Header', icon: 'H' },
  //   { id: 'hero', name: 'Hero Section', icon: ' hero ' },
  //   { id: 'card', name: 'Card', icon: ' [] ' },
  //   { id: 'button', name: 'Button', icon: ' [ ] ' },
  //   { id: 'form', name: 'Form', icon: ' f ' },
  //   { id: 'footer', name: 'Footer', icon: ' F ' },
  // ];

  // const handleComponentClick = (component: { id: string }) => {
  //   setSelectedComponent(component.id);
  //   // In a real implementation, this would add the component to the canvas
  // };

  return (
    <div className="min-h-screen bg-gray-50 font-['Plus_Jakarta_Sans'] tracking-tight">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Site Builder
          </h1>
          <p className="text-gray-600 mb-8">
            Available exclusively for Builder Pack subscribers
          </p>

          {/* Builder Pack Content */}
          <div className="bg-white rounded-xl border border-orange-200 p-8 shadow-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Builder Pack Required</h2>
            <p className="text-gray-600 mb-6">
              Unlock the power of visual site building with drag-and-drop components,
              real-time preview, and instant code generation. Upgrade to Builder Pack to access this feature.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/pricing')}
                className="flex-1 bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>Upgrade to Builder Pack</span>
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SiteBuilder;