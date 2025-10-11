import React from 'react';

const Brands: React.FC = () => {
    return (
        <div>
            <h3 className="text-lg font-medium text-slate-600 text-center">Trusted by world's leading companies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-16 gap-8 max-w-7xl mx-auto px-4">
                {/* Windsurf */}
                <div className="flex items-center justify-center h-24 w-full bg-white rounded-xl border border-orange-200 transition-all duration-300">
                    <img
                        src="/src/assets/img/windsurf.svg"
                        alt="Windsurf"
                        className="h-20 w-auto brightness-110"
                    />
                </div>

                {/* Cursor */}
                <div className="flex items-center justify-center h-24 w-full bg-white rounded-xl border border-orange-200 transition-all duration-300">
                    <img
                        src="/src/assets/img/cursor.png"
                        alt="Cursor"
                        className="h-22 w-auto brightness-110"
                    />
                </div>

                {/* Replit */}
                <div className="flex items-center justify-center h-24 w-full bg-white rounded-xl border border-orange-200 transition-all duration-300">
                    <img
                        src="/src/assets/img/replit.jpg"
                        alt="Replit"
                        className="h-10 w-auto filter brightness-110 transition-all duration-300 rounded"
                    />
                </div>

                {/* Bolt */}
                <div className="flex items-center justify-center h-24 w-full bg-white rounded-xl border border-orange-200 transition-all duration-300">
                    <img
                        src="/src/assets/img/bolt.png"
                        alt="Bolt"
                        className="h-10 w-auto filter transition-all duration-300"
                    />
                </div>

                {/* Lovable */}
                <div className="flex items-center justify-center h-24 w-full bg-white rounded-xl border border-orange-200 transition-all duration-300">
                    <img
                        src="/src/assets/img/lovable.jpg"
                        alt="Lovable"
                        className="h-14 w-auto filter brightness-110 transition-all duration-300 rounded-lg bg-white p-2"
                    />
                </div>

                {/* V0 */}
                <div className="flex items-center justify-center h-24 w-full bg-white rounded-xl border border-orange-200 transition-all duration-300">
                    <img
                        src="/src/assets/img/v0.png"
                        alt="V0"
                        className="h-10 w-auto filter transition-all duration-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default Brands;