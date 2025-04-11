import React, { useEffect, useCallback, KeyboardEvent } from 'react';
import '../styles/SunlightEffect.css';

// Type for imported image
import leavesImage from '../assets/leaves.png';

// Define a type for the component's props (currently empty, but good practice)
interface SunlightEffectProps { }

const SunlightEffect: React.FC<SunlightEffectProps> = () => {
  // Type-safe toggle function using useCallback for memoization
  const toggle = useCallback(() => {
    const bodyClassList = document.body.classList;
    bodyClassList.add('animation-ready');
    bodyClassList.toggle('dark');
  }, []);

  // Type-safe event handlers with explicit event types
  const handleKeydown = useCallback((event: KeyboardEvent) => {
    // Use key instead of keyCode (deprecated)
    if (event.key === ' ') {
      toggle();
    }
  }, [toggle]);

  useEffect(() => {
    // Correct type-safe event listeners
    const keydownListener: EventListener = (event: Event) => {
      handleKeydown(event as unknown as KeyboardEvent);
    };

    document.addEventListener('keydown', keydownListener);

    return () => {
      document.removeEventListener('keydown', keydownListener);
    };
  }, [handleKeydown]);

  // Render method with explicit type annotations
  return (
    <div id="dappled-light" className="fixed z-0 w-screen h-screen opacity-80">
      <div id="glow"></div>
      <div id="glow-bounce"></div>
      <div className="perspective">
        <div
          id="leaves"
          style={{
            backgroundImage: `url(${leavesImage as string})`
          }}
        >
          <svg style={{ width: 0, height: 0, position: 'absolute' }}>
            <defs>
              <filter id="wind" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" numOctaves="2" seed="1">
                  <animate
                    attributeName="baseFrequency"
                    dur="16s"
                    keyTimes="0;0.33;0.66;1"
                    values="0.005 0.003;0.01 0.009;0.008 0.004;0.005 0.003"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic">
                  <animate
                    attributeName="scale"
                    dur="20s"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="45;55;75;55;45"
                    repeatCount="indefinite"
                  />
                </feDisplacementMap>
              </filter>
            </defs>
          </svg>
        </div>
        <div id="blinds">
          <div className="shutters">
            {Array.from({ length: 23 }, (_, index) => (
              <div key={index} className="shutter"></div>
            ))}
          </div>
          <div className="vertical">
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
      <div id="progressive-blur">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index}></div>
        ))}
      </div>

      {/* Theme toggle floating button */}
      <button
        onClick={toggle}
        className="flex fixed bottom-6 left-6 z-50 justify-center items-center w-10 h-10 text-white rounded-full border shadow-lg backdrop-blur-md transition-transform duration-200 ease-in-out bg-black/80 dark:bg-gray-800/80 hover:scale-105 border-white/10 md:bottom-8 md:left-8"
        aria-label="Toggle dark/light mode"
      >
        <svg className="w-5 h-5 dark:hidden" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
        </svg>
        <svg className="hidden w-5 h-5 dark:block" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </button>
    </div>
  );
};

export default SunlightEffect;