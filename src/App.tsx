import SunlightEffect from './components/SunlightEffect';
import { KBarProvider } from 'kbar';
import KBarComponent from './components/KBarComponent';
import AIChat from './components/AIChat';
import './styles/chat.css';

const actions = [
    {
        id: "navigation",
        name: "Navigation",
        keywords: "navigation menu",
        section: "Navigation",
        priority: 1
    },
    {
        id: "home",
        name: "Home",
        shortcut: ["h"],
        keywords: "home main landing",
        perform: () => window.location.pathname = "/",
        parent: "navigation",
        icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
    },
    {
        id: "about",
        name: "About",
        shortcut: ["a"],
        keywords: "about info",
        perform: () => window.location.pathname = "/about",
        parent: "navigation",
        icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
    },
    {
        id: "social",
        name: "Social",
        keywords: "social links",
        section: "Social",
        priority: 2
    },
    {
        id: "github",
        name: "GitHub",
        keywords: "github code repository",
        perform: () => window.open("https://github.com/yourusername", "_blank"),
        parent: "social",
        icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
    },
    {
        id: "twitter",
        name: "Twitter",
        keywords: "twitter social",
        perform: () => window.open("https://twitter.com/yourusername", "_blank"),
        parent: "social",
        icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" /></svg>
    },
    {
        id: "theme",
        name: "Change Theme",
        keywords: "theme dark light mode",
        section: "Preferences",
        priority: 3,
        badge: { text: "New", color: "green" },
        icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>,
        perform: () => document.documentElement.classList.toggle('dark')
    },
    {
        id: "docs",
        name: "Documentation",
        keywords: "docs documentation help",
        section: "Help",
        priority: 4,
        badge: { text: "Updated", color: "blue" }
    },
    {
        id: "getting-started",
        name: "Getting Started",
        keywords: "start guide tutorial",
        parent: "docs",
        perform: () => window.location.pathname = "/docs/getting-started",
        icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>
    },
    {
        id: "api-reference",
        name: "API Reference",
        keywords: "api documentation reference",
        parent: "docs",
        perform: () => window.location.pathname = "/docs/api",
        icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
    },
    {
        id: "quickActions",
        name: "Quick Actions",
        keywords: "actions quick",
        section: "Actions",
        priority: 0
    },
    {
        id: "newFile",
        name: "New File",
        keywords: "file create new",
        parent: "quickActions",
        perform: () => {/* Custom file creation logic */ },
        icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
        </svg>,
        status: { text: "Beta", color: "purple" }
    },
    {
        id: "search",
        name: "Search Files",
        keywords: "search find files",
        parent: "quickActions",
        perform: () => {/* Custom search logic */ },
        icon: <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
    }
];

function App() {
    return (
        <KBarProvider
            actions={actions}
            options={{
                animations: {
                    enterMs: 150,
                    exitMs: 100
                },
                enableHistory: true,
                disableScrollbarManagement: false,
                callbacks: {
                    onOpen: () => console.log("KBar opened"),
                    onClose: () => console.log("KBar closed"),
                    onSelectAction: (action) => console.log("Selected action:", action)
                }
            }}
        >
            <div className="overflow-hidden relative w-full min-h-screen">
                <SunlightEffect />
                <KBarComponent />

                {/* Main content container */}
                <main className="relative z-10 w-full min-h-screen">
                    <div className="container mx-auto chat-container">
                        <AIChat
                            title="FastPrompt AI Assistant"
                            description="Ask me anything or try using voice input!"
                            placeholder="Type a message or press the microphone icon to speak..."
                            initialSystemPrompt="You are a helpful and friendly AI assistant built into the FastPrompt application. Provide concise and accurate responses while maintaining a warm, conversational tone."
                        />
                    </div>
                </main>
            </div>
        </KBarProvider>
    )
}

export default App