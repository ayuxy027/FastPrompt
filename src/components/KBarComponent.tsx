import {
    KBarAnimator,
    KBarPortal,
    KBarPositioner,
    KBarSearch,
    KBarResults,
    useKBar,
    useMatches,
  } from "kbar";
  import { forwardRef, useEffect, ReactNode } from "react";
  import { 
    Action, 
    Result, 
    A11yProps 
  } from "../types/kbar.ts"; // Assuming the types are in a separate file
  
  // Component Props Interface
  interface KBarComponentProps extends A11yProps {
    searchPlaceholder?: string;
    className?: string;
  }
  
  // Result Props Interface
  interface KBarResultProps {
    action: Action | string;
    active?: boolean;
  }
  
  /**
   * Check if the action is a string (for section headers)
   */
  function isStringAction(action: Action | string): action is string {
    return typeof action === 'string';
  }
  
  /**
   * Renders the search results with highlighting and enhanced accessibility
   */
  const RenderResults = () => {
    const { results, query } = useMatches();
  
    // Handle loading state
    if (!results) {
      return (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          <div className="animate-spin w-6 h-6 mx-auto mb-2">
            <svg className="w-full h-full" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
              />
            </svg>
          </div>
          Loading...
        </div>
      );
    }
  
    // Handle no results
    if (results.length === 0) {
      return (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          No results found for "{query}"
        </div>
      );
    }
  
    return (
      <KBarResults
        items={results}
        onRender={({ item, active }) => (
          <ResultItem
            action={item}
            active={active}
          />
        )}
        maxHeight={500}
      />
    );
  };
  
  /**
   * Renders an individual result item with proper styling and accessibility
   */
  const ResultItem = forwardRef<HTMLDivElement, KBarResultProps>(({ action, active }, ref) => {
    if (isStringAction(action)) {
      return (
        <div 
          ref={ref}
          className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          role="presentation"
        >
          {action}
        </div>
      );
    }
  
    return (
      <div
        ref={ref}
        className={`
          px-3 py-2 rounded-md cursor-pointer 
          flex items-center justify-between gap-4
          ${active 
            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" 
            : "bg-transparent text-gray-700 dark:text-gray-300"
          }
          transition-all duration-200 ease-in-out
          hover:bg-gray-100 dark:hover:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        `}
      >
        <div className="flex items-center gap-3">
          {action.icon && (
            <span className="text-gray-600 dark:text-gray-400">
              {action.icon}
            </span>
          )}
          <div>
            <div className="font-medium">{action.name}</div>
            {action.subtitle && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {action.subtitle}
              </span>
            )}
          </div>
        </div>
        {action.shortcut?.length ? (
          <div className="flex items-center gap-1">
            {action.shortcut.map((shortcut: string, i: number) => (
              <kbd
                key={i}
                className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded shadow-sm"
              >
                {shortcut}
              </kbd>
            ))}
          </div>
        ) : null}
      </div>
    );
  });
  
  // Error Boundary Component
  const ErrorBoundary = ({ children, fallback }: { children: ReactNode, fallback: ReactNode }) => {
    try {
      return <>{children}</>;
    } catch (error) {
      return <>{fallback}</>;
    }
  };
  
  /**
   * Main KBar component with search functionality and results display
   */
  export default function KBarComponent({
    searchPlaceholder = "Type a command or search...",
    className = "",
    'aria-label': ariaLabel = "Open command palette",
    ...props
  }: KBarComponentProps) {
    const { query } = useKBar();
  
    // Handle keyboard shortcuts
    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          query.toggle();
        }
      };
  
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, [query]);
  
    return (
      <ErrorBoundary fallback={<div>Something went wrong with KBar</div>}>
        <div className="relative">
          {/* Search Trigger Button */}
          <button
            type="button"
            onClick={() => query.toggle()}
            className={`fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 
              bg-black dark:bg-gray-800 text-white rounded-full shadow-lg 
              hover:bg-gray-800 dark:hover:bg-gray-700 
              transition-all duration-200 ease-in-out transform hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              md:bottom-8 md:right-8 ${className}`}
            aria-label={ariaLabel}
            {...props}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex items-center px-2 text-sm bg-black/20 dark:bg-white/20 rounded">
              ⌘K
            </kbd>
          </button>
  
          {/* Results Portal */}
          <KBarPortal>
            <KBarPositioner 
              className="bg-black/50 dark:bg-black/70 backdrop-blur-sm fixed inset-0 z-50
              animate-[fadeIn_200ms_ease-in-out]"
              aria-label="Command palette"
            >
              <KBarAnimator 
                className="w-full max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl
                  overflow-hidden scale-100 animate-[scaleIn_200ms_ease-in-out]
                  transition-all duration-200 ease-in-out
                  mt-[20vh] sm:mt-[30vh]"
              >
                <div className="relative">
                  <KBarSearch 
                    className="w-full bg-transparent px-4 py-3 text-gray-900 dark:text-white
                      outline-none border-b border-gray-200 dark:border-gray-700
                      placeholder-gray-500 dark:placeholder-gray-400
                      focus:border-blue-500 dark:focus:border-blue-400
                      transition-colors duration-200"
                    placeholder={searchPlaceholder}
                  />
                  <kbd className="absolute right-4 top-3.5 px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 
                  bg-gray-100 dark:bg-gray-700 rounded">
                    ESC to close
                  </kbd>
                </div>
                <div 
                  className="px-2 py-2 max-h-[60vh] overflow-auto custom-scrollbar"
                  role="listbox"
                  aria-label="Search results"
                >
                  <RenderResults />
                </div>
              </KBarAnimator>
            </KBarPositioner>
          </KBarPortal>
        </div>
      </ErrorBoundary>
    );
  }