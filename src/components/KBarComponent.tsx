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
  A11yProps
} from "../types/index"; // Assuming the types are in a separate file

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
        <div className="mx-auto mb-2 w-6 h-6 animate-spin">
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
        className="px-3 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400"
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
          px-3 py-3 rounded-md cursor-pointer 
          flex items-center justify-between gap-4
          ${active
          ? "text-gray-900 bg-gray-100/80 dark:bg-gray-700/80 dark:text-white"
          : "text-gray-700 bg-transparent dark:text-gray-300"
        }
          transition-all duration-200 ease-in-out
          hover:bg-gray-100/80 dark:hover:bg-gray-700/80
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        `}
    >
      <div className="flex gap-3 items-center">
        {action.icon && (
          <span className={`text-gray-600 dark:text-gray-400 ${active ? 'text-blue-500 dark:text-blue-400' : ''}`}>
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
      <div className="flex gap-2 items-center">
        {action.badge && (
          <span className={`px-2 py-1 text-xs rounded-full ${action.badge.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400' :
            action.badge.color === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400' :
              action.badge.color === 'purple' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-400' :
                'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400'
            }`}>
            {action.badge.text}
          </span>
        )}
        {action.shortcut?.length ? (
          <div className="flex gap-1 items-center">
            {action.shortcut.map((shortcut: string, i: number) => (
              <kbd
                key={i}
                className="px-2 py-1 text-xs font-semibold text-gray-800 rounded border border-gray-200 shadow-sm dark:text-gray-200 bg-gray-100/80 dark:bg-gray-700/80 dark:border-gray-600"
              >
                {shortcut}
              </kbd>
            ))}
          </div>
        ) : null}
      </div>
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
          className={`flex fixed right-6 bottom-6 z-50 gap-2 items-center px-4 py-3 text-white rounded-full border shadow-lg backdrop-blur-md transition-all duration-200 ease-in-out transform bg-black/80 dark:bg-gray-800/80 hover:bg-black dark:hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 border-white/10 md:bottom-8 md:right-8 ${className}`}
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
          <kbd className="hidden items-center px-2 text-sm rounded sm:inline-flex bg-white/10">
            ⌘K
          </kbd>
        </button>

        {/* Results Portal */}
        <KBarPortal>
          <KBarPositioner
            className="bg-black/40 dark:bg-black/60 backdrop-blur-md fixed inset-0 z-50
              animate-[fadeIn_150ms_ease-in-out]"
            aria-label="Command palette"
          >
            <KBarAnimator
              className="w-full max-w-xl mx-auto bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-2xl backdrop-blur-md
                  overflow-hidden scale-100 animate-[scaleIn_150ms_ease-in-out]
                  transition-all duration-200 ease-in-out
                  border border-white/20 dark:border-gray-700/40
                  mt-[20vh] sm:mt-[30vh]"
            >
              <div className="relative">
                <KBarSearch
                  className="px-4 py-4 w-full placeholder-gray-500 text-gray-900 bg-transparent border-b transition-colors duration-200 outline-none dark:text-white border-gray-200/80 dark:border-gray-700/80 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400"
                  placeholder={searchPlaceholder}
                />
                <kbd className="absolute top-4 right-4 px-2 py-1 text-xs font-semibold text-gray-500 rounded border dark:text-gray-400 bg-gray-100/80 dark:bg-gray-700/80 border-gray-200/80 dark:border-gray-600/80">
                  ESC
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