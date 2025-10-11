import React from 'react';
import Navbar from './Navbar';

const Hero: React.FC = () => {
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
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
                <svg className="h-20 w-full border-y border-dashed border-orange-200 stroke-orange-200">
                    <defs>
                        <pattern
                            id="diagonal-hero-pattern"
                            patternUnits="userSpaceOnUse"
                            width="64"
                            height="64"
                        >
                            {Array.from({ length: 17 }, (_, i) => {
                                const offset = i * 8;
                                return (
                                    <path
                                        key={i}
                                        d={`M${-106 + offset} 110L${22 + offset} -18`}
                                        stroke=""
                                        strokeWidth="1"
                                        className="stroke-orange-200"
                                    />
                                );
                            })}
                        </pattern>
                    </defs>
                    <rect
                        stroke="none"
                        width="100%"
                        height="100%"
                        fill="url(#diagonal-hero-pattern)"
                    />
                </svg>
            </div>

            <Navbar />

            <div className="flex flex-col items-center justify-center w-full relative z-10">
                <h1 className="text-4xl md:text-[40px] text-slate-800 font-['Plus_Jakarta_Sans'] tracking-tight">
                    Transform Your Ideas Into Perfect UI
                </h1>
                <p className="text-base mt-6 text-slate-600 font-['Plus_Jakarta_Sans'] tracking-tight">The missing link between your ideas and one-shot design tools like v0, Bolt, and Lovable.</p>
                <div className="max-w-xl w-full bg-white/80 backdrop-blur-sm border border-orange-200 rounded-xl overflow-hidden mt-4 shadow-lg">
                    <textarea
                        className="w-full p-3 pb-0 resize-none outline-none bg-transparent placeholder-slate-500 font-['Plus_Jakarta_Sans'] tracking-tight"
                        placeholder="Describe your UI idea... (e.g., 'Create a SaaS dashboard for analytics')"
                        rows={3}
                    />
                    <div className="flex items-center justify-between pb-3 px-3">
                        <button className="flex items-center justify-center bg-orange-100 hover:bg-orange-200 transition p-1 rounded-full size-6"
                            aria-label="Clear"
                            type="button"
                        >
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5.5h9M5.5 1v9" stroke="#EA580C" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="flex items-center justify-center p-1 rounded size-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition" aria-label="Send" type="button">
                            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5.5 5.5 1 10 5.5m-4.5 5.143V1" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8 text-slate-500">
                    <p className="cursor-pointer hover:text-orange-600 transition font-['Plus_Jakarta_Sans'] tracking-tight">Create a modern SaaS dashboard for analytics</p>
                    <p className="cursor-pointer hover:text-orange-600 transition font-['Plus_Jakarta_Sans'] tracking-tight">Design an e-commerce product catalog</p>
                    <div className="w-full h-px bg-orange-200"></div>
                    <div className="w-full h-px bg-orange-200"></div>
                    <p className="cursor-pointer hover:text-orange-600 transition font-['Plus_Jakarta_Sans'] tracking-tight">Build a mobile app onboarding flow</p>
                    <p className="cursor-pointer hover:text-orange-600 transition font-['Plus_Jakarta_Sans'] tracking-tight">Create an admin panel for user management</p>
                </div>
            </div>
            <p className="text-orange-600 pb-3 font-['Plus_Jakarta_Sans'] tracking-tight relative z-10">
                Ready to bridge the gap between your ideas and perfect UI? <a href="/contact" className="underline hover:text-orange-800">Start using FastPrompt today!</a>
            </p>
        </main>
    );
};

export default Hero;