import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Block from './Block';
import ProUpgradeModal from './ProUpgradeModal';

const Hero: React.FC = () => {
    const [query, setQuery] = useState('');
    const [showProModal, setShowProModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate('/chat', {
                state: {
                    query: query.trim(),
                    timestamp: new Date().toISOString()
                }
            });
        }
    };

    const handleSampleClick = (sampleQuery: string) => {
        setQuery(sampleQuery);
    };

    const handleAttachFile = () => {
        setShowProModal(true);
    };

    return (
        <main className="relative flex items-center flex-col justify-between bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/dot-pattern-bg.svg')] bg-cover text-sm text-gray-800 max-md:px-4 text-center h-[785px] font-['Plus_Jakarta_Sans'] tracking-tight">
            {/* Beautiful Design Elements - Hero Lines */}
            <div className="pointer-events-none absolute inset-0">
                {/* Left */}
                <div
                    className="absolute inset-y-0 my-[-5rem] w-px"
                    style={{
                        maskImage: "linear-gradient(transparent, white 5rem)",
                    }}
                >
                    <svg className="h-full w-full" preserveAspectRatio="none">
                        <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="100%"
                            className="stroke-orange-200"
                            strokeWidth="2"
                            strokeDasharray="3 3"
                        />
                    </svg>
                </div>

                {/* Right */}
                <div
                    className="absolute inset-y-0 right-0 my-[-5rem] w-px"
                    style={{
                        maskImage: "linear-gradient(transparent, white 5rem)",
                    }}
                >
                    <svg className="h-full w-full" preserveAspectRatio="none">
                        <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="100%"
                            className="stroke-orange-200"
                            strokeWidth="2"
                            strokeDasharray="3 3"
                        />
                    </svg>
                </div>
            </div>

            {/* Legendary Block Line with Slashed Lines */}
            <Block
                position="absolute"
                top="top-35"
                left="left-0"
                right="right-0"
                height="h-150"
                width="w-full"
                lineDirection="center"
                lineColor="stroke-orange-200"
                lineCount={17}
                strokeWidth={1}
                borderColor="border-orange-200"
                borderWidth="border-y"
                borderStyle="dashed"
                zIndex={1}
            />

            <Navbar />

            <div className="flex flex-col items-center justify-center w-full relative z-10">
                <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-5xl lg:text-6xl text-slate-800 font-['Plus_Jakarta_Sans'] tracking-tight font-semibold leading-tight text-center">
                    One Shot Your Wireframes Using<br />
                    <span className="text-orange-400">JSON Prompting</span>
                </h1>
                <p className="text-sm xs:text-base sm:text-lg md:text-xl mt-6 sm:mt-8 text-slate-600 font-['Plus_Jakarta_Sans'] tracking-tight leading-relaxed">Create that one missing prompt between your ideas and one-shot design tools like v0, Bolt, and Lovable.</p>
                <form onSubmit={handleSubmit} className="max-w-xl w-full bg-white/80 backdrop-blur-sm border border-orange-200 rounded-xl overflow-hidden mt-6 sm:mt-8 shadow-lg">
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                if (query.trim()) {
                                    // Trigger the form submit programmatically with a synthetic SubmitEvent
                                    // so we keep types safe and avoid casting to any.
                                    e.currentTarget.form?.requestSubmit();
                                }
                            }
                        }}
                        className="w-full p-3 sm:p-4 pb-0 resize-none outline-none bg-transparent placeholder-slate-500 font-['Plus_Jakarta_Sans'] tracking-tight text-sm sm:text-base"
                        placeholder="Describe your UI idea... (e.g., 'Create a SaaS dashboard for analytics')"
                        rows={3}
                        required
                    />
                    <div className="flex items-center justify-between pb-3 sm:pb-4 px-3 sm:px-4">
                        <button
                            onClick={handleAttachFile}
                            className="flex items-center justify-center bg-orange-100 hover:bg-orange-200 transition p-1 rounded-full size-6"
                            aria-label="Attach File"
                            type="button"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.64 16.2a2 2 0 11-2.83-2.83l8.49-8.49" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            className="flex items-center justify-center p-1 rounded size-6 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Send"
                            type="submit"
                            disabled={!query.trim()}
                        >
                            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5.5 5.5 1 10 5.5m-4.5 5.143V1" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </form>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-10 text-slate-500">
                    <p
                        className="cursor-pointer hover:text-orange-400 transition font-['Plus_Jakarta_Sans'] tracking-tight text-xs sm:text-sm md:text-base"
                        onClick={() => handleSampleClick("Create a modern SaaS dashboard for analytics")}
                    >
                        Create a modern SaaS dashboard for analytics
                    </p>
                    <p
                        className="cursor-pointer hover:text-orange-400 transition font-['Plus_Jakarta_Sans'] tracking-tight text-xs sm:text-sm md:text-base"
                        onClick={() => handleSampleClick("Design an e-commerce product catalog")}
                    >
                        Design an e-commerce product catalog
                    </p>
                    <div className="w-full h-px bg-orange-200"></div>
                    <div className="w-full h-px bg-orange-200"></div>
                    <p
                        className="cursor-pointer hover:text-orange-400 transition font-['Plus_Jakarta_Sans'] tracking-tight text-xs sm:text-sm md:text-base"
                        onClick={() => handleSampleClick("Build a mobile app onboarding flow")}
                    >
                        Build a mobile app onboarding flow
                    </p>
                    <p
                        className="cursor-pointer hover:text-orange-400 transition font-['Plus_Jakarta_Sans'] tracking-tight text-xs sm:text-sm md:text-base"
                        onClick={() => handleSampleClick("Create an admin panel for user management")}
                    >
                        Create an admin panel for user management
                    </p>
                </div>
            </div>
            <div className="pb-4 relative z-10">
                {/* Spacer to maintain hero height */}
            </div>

            {/* Pro Upgrade Modal */}
            <ProUpgradeModal
                isOpen={showProModal}
                onClose={() => setShowProModal(false)}
            />
        </main>
    );
};

export default Hero;