import React from 'react';
import Navbar from './Navbar';
import Block from './Block';

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
            <Block
                position="absolute"
                top="top-1/2"
                left="left-0"
                right="right-0"
                height="h-140"
                width="w-full"
                lineDirection="center"
                lineColor="stroke-orange-200"
                lineCount={17}
                strokeWidth={0.5}
                borderColor="border-orange-200"
                borderWidth="border-y"
                borderStyle="dashed"
                zIndex={1}
            />

            <Navbar />

            <div className="flex flex-col items-center justify-center w-full relative z-10">
                <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-5xl lg:text-6xl text-slate-800 font-['Plus_Jakarta_Sans'] tracking-tight font-semibold leading-tight">
                    Transform Your Ideas Into <span className="text-orange-500">Perfect UI</span>
                </h1>
                <p className="text-sm xs:text-base sm:text-lg md:text-xl mt-6 sm:mt-8 text-slate-600 font-['Plus_Jakarta_Sans'] tracking-tight leading-relaxed">The missing link between your ideas and one-shot design tools like v0, Bolt, and Lovable.</p>
                <div className="max-w-xl w-full bg-white/80 backdrop-blur-sm border border-orange-200 rounded-xl overflow-hidden mt-6 sm:mt-8 shadow-lg">
                    <textarea
                        className="w-full p-3 sm:p-4 pb-0 resize-none outline-none bg-transparent placeholder-slate-500 font-['Plus_Jakarta_Sans'] tracking-tight text-sm sm:text-base"
                        placeholder="Describe your UI idea... (e.g., 'Create a SaaS dashboard for analytics')"
                        rows={3}
                    />
                    <div className="flex items-center justify-between pb-3 sm:pb-4 px-3 sm:px-4">
                        <button className="flex items-center justify-center bg-orange-100 hover:bg-orange-200 transition p-1 rounded-full size-6"
                            aria-label="Attach File"
                            type="button"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.64 16.2a2 2 0 11-2.83-2.83l8.49-8.49" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="flex items-center justify-center p-1 rounded size-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition" aria-label="Send" type="button">
                            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 5.5 5.5 1 10 5.5m-4.5 5.143V1" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-10 text-slate-500">
                    <p className="cursor-pointer hover:text-orange-600 transition font-['Plus_Jakarta_Sans'] tracking-tight text-xs sm:text-sm md:text-base">Create a modern SaaS dashboard for analytics</p>
                    <p className="cursor-pointer hover:text-orange-600 transition font-['Plus_Jakarta_Sans'] tracking-tight text-xs sm:text-sm md:text-base">Design an e-commerce product catalog</p>
                    <div className="w-full h-px bg-orange-200"></div>
                    <div className="w-full h-px bg-orange-200"></div>
                    <p className="cursor-pointer hover:text-orange-600 transition font-['Plus_Jakarta_Sans'] tracking-tight text-xs sm:text-sm md:text-base">Build a mobile app onboarding flow</p>
                    <p className="cursor-pointer hover:text-orange-600 transition font-['Plus_Jakarta_Sans'] tracking-tight text-xs sm:text-sm md:text-base">Create an admin panel for user management</p>
                </div>
            </div>
            <p className="text-orange-600 pb-4 font-['Plus_Jakarta_Sans'] tracking-tight relative z-10 text-sm sm:text-base">
                Ready to bridge the gap between your ideas and perfect UI? <a href="/contact" className="underline hover:text-orange-800 font-medium">Start using FastPrompt today!</a>
            </p>
        </main>
    );
};

export default Hero;