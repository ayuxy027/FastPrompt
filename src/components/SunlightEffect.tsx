import React, { useEffect, useCallback, KeyboardEvent, MouseEvent } from 'react';
import '../styles/SunlightEffect.css';

// Type for imported image
import leavesImage from '../assets/leaves.png';

// Define a type for the component's props (currently empty, but good practice)
interface SunlightEffectProps {}

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

  const handleClick = useCallback((event: MouseEvent) => {
    // Prevent toggle if clicking on interactive elements
    const target = event.target as Element;
    const interactiveElements = ['A', 'BUTTON', 'INPUT'];
    
    if (!interactiveElements.includes(target.tagName)) {
      toggle();
    }
  }, [toggle]);

  useEffect(() => {
    // Correct type-safe event listeners
    const keydownListener: EventListener = (event: Event) => {
      handleKeydown(event as unknown as KeyboardEvent);
    };

    const clickListener: EventListener = (event: Event) => {
      handleClick(event as unknown as MouseEvent);
    };

    document.addEventListener('keydown', keydownListener);
    document.addEventListener('click', clickListener);

    return () => {
      document.removeEventListener('keydown', keydownListener);
      document.removeEventListener('click', clickListener);
    };
  }, [handleKeydown, handleClick]);

  // Render method with explicit type annotations
  return (
    <>
      <div id="dappled-light">
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
      </div>

      <article>
        <h1>sunlit</h1>
        <p>
          inspired by <a href="https://daylightcomputer.com/">daylight computer</a> and{' '}
          <a href="https://www.chloeyan.me/">chloe yan's</a>{' '}
          <a href="https://www.sunlit.place/">sunlit place</a>
        </p>
        <pre>[press <code>space</code> to toggle the sun]</pre>
      </article>
    </>
  );
};

export default SunlightEffect;