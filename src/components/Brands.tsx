import React from 'react';
import windsurfLogo from '../assets/img/windsurf.svg';
import cursorLogo from '../assets/img/cursor.png';
import replitLogo from '../assets/img/replit.jpg';
import boltLogo from '../assets/img/bolt.png';
import lovableLogo from '../assets/img/lovable.jpg';
import v0Logo from '../assets/img/v0.png';

const Brands: React.FC = () => {
    return (
        <div className="relative flex items-center flex-col justify-center bg-gradient-to-b from-white to-orange-50/30 text-sm text-slate-800 max-md:px-4 text-center min-h-[400px] font-['Plus_Jakarta_Sans'] tracking-tight py-8">
            {/* Beautiful Design Elements - Brands Lines */}
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


            <div className="flex flex-col items-center justify-center w-full relative z-10 mb-8">
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-800 font-['Plus_Jakarta_Sans'] tracking-tight font-semibold leading-tight text-center">
                    Trusted by <span className="text-orange-400">Leading Companies</span>
                </h2>
                <p className="text-sm xs:text-base sm:text-lg md:text-xl mt-6 sm:mt-8 text-slate-600 font-['Plus_Jakarta_Sans'] tracking-tight leading-relaxed max-w-3xl">
                    Join thousands of developers and teams who rely on FastPrompt to power their design workflows with the world's most innovative companies.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto px-4 relative z-10">
                {/* V0 */}
                <div className="flex items-center justify-center h-24 w-full bg-white rounded-xl border border-orange-200 transition-all duration-300">
                    <img
                        src={v0Logo}
                        alt="V0"
                        className="h-8 w-auto filter transition-all duration-300"
                    />
                </div>

                {/* Bolt */}
                <div className="flex items-center justify-center h-24 w-full bg-white rounded-xl border border-orange-200 transition-all duration-300">
                    <img
                        src={boltLogo}
                        alt="Bolt"
                        className="h-10 w-auto filter transition-all duration-300"
                    />
                </div>

                {/* Lovable */}
                <div className="flex items-center justify-center h-24 w-full bg-white rounded-xl border border-orange-200 transition-all duration-300">
                    <img
                        src={lovableLogo}
                        alt="Lovable"
                        className="h-20 w-auto brightness-110 rounded-lg bg-white p-2 object-cover"
                    />
                </div>

                {/* Cursor */}
                <div className="flex items-center justify-center h-24 w-full bg-white rounded-xl border border-orange-200 transition-all duration-300">
                    <img
                        src={cursorLogo}
                        alt="Cursor"
                        className="h-20 w-auto brightness-110"
                    />
                </div>

                {/* Windsurf */}
                <div className="flex items-center justify-center h-24 w-full bg-white rounded-xl border border-orange-200 transition-all duration-300">
                    <img
                        src={windsurfLogo}
                        alt="Windsurf"
                        className="h-20 w-auto brightness-110"
                    />
                </div>

                {/* Replit */}
                <div className="flex items-center justify-center h-24 w-full bg-white rounded-xl border border-orange-200 transition-all duration-300">
                    <img
                        src={replitLogo}
                        alt="Replit"
                        className="h-10 w-auto filter brightness-110 transition-all duration-300 rounded"
                    />
                </div>
            </div>
        </div>
    );
};

export default Brands;