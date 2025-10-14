import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Block from './Block';
import { motion } from 'framer-motion';

const SiteBuilder: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const navigate = useNavigate();

  // Mock components for the palette
  const componentPalette = [
    { id: 'header', name: 'Header', icon: 'H' },
    { id: 'hero', name: 'Hero Section', icon: ' hero ' },
    { id: 'card', name: 'Card', icon: ' [] ' },
    { id: 'button', name: 'Button', icon: ' [ ] ' },
    { id: 'form', name: 'Form', icon: ' f ' },
    { id: 'footer', name: 'Footer', icon: ' F ' },
  ];

  const handleComponentClick = (component: { id: string }) => {
    setSelectedComponent(component.id);
    // In a real implementation, this would add the component to the canvas
  };

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
            Coming Soon - This feature will be available in a future release
          </p>

          {/* Coming Soon Content */}
          <div className="bg-white rounded-xl border border-orange-200 p-8 shadow-sm max-w-2xl mx-auto">
            <div className="text-orange-400 text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Under Development</h2>
            <p className="text-gray-600 mb-6">
              We're working hard to bring you an amazing site builder experience.
              Stay tuned for updates!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Home</span>
              </button>
              <button
                onClick={() => navigate('/editor')}
                className="flex-1 bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Try JSON Editor</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SiteBuilder;