import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Block from './Block';

interface ProUpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProUpgradeModal: React.FC<ProUpgradeModalProps> = ({ isOpen, onClose }) => {
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleUpgradeClick = () => {
        // Navigate to pricing page
        window.location.href = '/pricing';
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-orange-100 overflow-hidden relative"
                    >
                        {/* Block Background */}
                        <div className="absolute top-0 left-0 right-0 h-32 z-0 opacity-20">
                            <Block
                                position="absolute"
                                top="top-0"
                                left="left-0"
                                right="right-0"
                                height="h-32"
                                width="w-full"
                                lineDirection="center"
                                lineColor="stroke-orange-300"
                                lineCount={12}
                                strokeWidth={1}
                                zIndex={1}
                            />
                        </div>

                        {/* Header */}
                        <div className="relative z-10 bg-gradient-to-br text-black">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] tracking-tight">
                                        Upgrade to PRO
                                    </h3>
                                    <p className="text-grey-800 text-sm">
                                        Unlock Attach Images and Files
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-orange-400 rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-6">
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-2 font-['Plus_Jakarta_Sans'] tracking-tight">
                                    Attach Images and Files
                                </h4>
                                <p className="text-gray-600 text-sm">
                                    This feature is available with our PRO plan. Upload images and files to enhance your JSON specifications.
                                </p>
                            </div>

                            {/* Pricing */}
                            <div className="rounded-xl p-4 mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600 mb-1">$29</div>
                                    <div className="text-sm text-orange-700">per month</div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleUpgradeClick}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                                >
                                    Upgrade to PRO
                                </button>
                                <button
                                    onClick={onClose}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProUpgradeModal;
