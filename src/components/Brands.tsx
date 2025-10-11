import React from 'react';

const Brands: React.FC = () => {
    return (
        <div>
            <h3 className="text-lg font-medium text-slate-600 text-center">Trusted by world's leading companies</h3> 
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-16 gap-6 max-w-6xl mx-auto px-4">
                {/* Windsurf */}
                <div className="flex items-center justify-center h-16 w-full bg-white rounded-lg border border-orange-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 group">
                    <img 
                        src="/src/assets/img/windsurf.svg" 
                        alt="Windsurf" 
                        className="h-8 w-auto filter group-hover:brightness-110 transition-all duration-200"
                    />
                </div>

                {/* Cursor */}
                <div className="flex items-center justify-center h-16 w-full bg-white rounded-lg border border-orange-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 group">
                    <img 
                        src="/src/assets/img/cursor.svg" 
                        alt="Cursor" 
                        className="h-8 w-auto filter group-hover:brightness-110 transition-all duration-200"
                    />
            </div>

                {/* Replit */}
                <div className="flex items-center justify-center h-16 w-full bg-white rounded-lg border border-orange-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 group">
                    <img 
                        src="/src/assets/img/replit.jpg" 
                        alt="Replit" 
                        className="h-8 w-auto filter group-hover:brightness-110 transition-all duration-200 rounded"
                    />
            </div>

                {/* Bolt */}
                <div className="flex items-center justify-center h-16 w-full bg-white rounded-lg border border-orange-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 group">
                    <img 
                        src="/src/assets/img/bolt.png" 
                        alt="Bolt" 
                        className="h-8 w-auto filter group-hover:brightness-110 transition-all duration-200"
                    />
            </div>

                {/* Lovable */}
                <div className="flex items-center justify-center h-16 w-full bg-white rounded-lg border border-orange-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 group">
                    <img 
                        src="/src/assets/img/lovable.jpg" 
                        alt="Lovable" 
                        className="h-8 w-auto filter group-hover:brightness-110 transition-all duration-200 rounded"
                    />
            </div>

                {/* V0 */}
                <div className="flex items-center justify-center h-16 w-full bg-white rounded-lg border border-orange-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 group">
                    <img 
                        src="/src/assets/img/v0.png" 
                        alt="V0" 
                        className="h-8 w-auto filter group-hover:brightness-110 transition-all duration-200"
                    />
            </div>
            </div>
        </div>
    );
};

export default Brands;