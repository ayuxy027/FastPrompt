import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import FastPromptLogo from '../assets/logo.png';

const Navbar: React.FC = () => {
    const menuRef = useRef<HTMLDivElement>(null);

    const handleOpenMenu = () => {
        if (menuRef.current) {
            menuRef.current.classList.remove('max-md:w-0');
            menuRef.current.classList.add('max-md:w-full');
        }
    };

    const handleCloseMenu = () => {
        if (menuRef.current) {
            menuRef.current.classList.remove('max-md:w-full');
            menuRef.current.classList.add('max-md:w-0');
        }
    };

    return (
        <nav className="flex items-center justify-between w-full md:px-16 lg:px-24 xl:px-32 py-4">
            <Link to="/" className="flex items-center">
                <img
                    src={FastPromptLogo}
                    alt="FastPrompt Logo"
                    className="h-12 w-auto"
                    style={{
                        transform: 'scale(5) translateX(-8px)',
                        transformOrigin: 'left center'
                    }}
                />
            </Link>
            <div
                id="menu"
                className="max-md:absolute max-md:bg-white/50 max-md:h-[785px] max-md:w-0 max-md:overflow-hidden max-md:transition-[width] max-md:duration-300 max-md:top-0 max-md:left-0 max-md:flex-col max-md:justify-center max-md:text-lg max-md:backdrop-blur flex items-center gap-8 font-medium"
                ref={menuRef}
            >
                <Link to="/" className="hover:text-orange-600 transition font-['Plus_Jakarta_Sans'] tracking-tight">
                    Home
                </Link>
                <Link to="/" className="hover:text-orange-600 transition font-['Plus_Jakarta_Sans'] tracking-tight">
                    Site Builder
                </Link>
                <Link to="/" className="hover:text-orange-600 transition font-['Plus_Jakarta_Sans'] tracking-tight">
                    JSON Editor
                </Link>
                <Link to="/" className="hover:text-orange-600 transition font-['Plus_Jakarta_Sans'] tracking-tight">
                    API
                </Link>
                <Link to="/" className="hover:text-orange-600 transition font-['Plus_Jakarta_Sans'] tracking-tight">
                    Pricing
                </Link>
                <button
                    aria-label="close menu"
                    className="size-6 md:hidden"
                    id="close-menu"
                    type="button"
                    onClick={handleCloseMenu}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <Link to="/login" className="max-md:hidden px-6 py-2.5 text-white bg-orange-500 font-medium hover:bg-orange-600 transition active:scale-95 rounded-full">
                Get Started
            </Link>
            <button
                aria-label="menu burger"
                className="size-6 md:hidden"
                id="open-menu"
                type="button"
                onClick={handleOpenMenu}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-align-justify-icon lucide-align-justify">
                    <path d="M3 12h18M3 18h18M3 6h18" />
                </svg>
            </button>
        </nav>
    );
};

export default Navbar;
