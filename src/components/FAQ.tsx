import React, { useState, useRef, useEffect, ReactNode } from "react";

// ---------------- Types ----------------
type FAQItemProps = {
    question: string;
    answer: string;
    icon: ReactNode;
};

type FAQ = {
    question: string;
    answer: string;
    icon: ReactNode;
};

// ---------------- FAQ Item ----------------
const FAQItem: React.FC<FAQItemProps> = ({ question, answer, icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState("0px");

    useEffect(() => {
        if (isOpen && contentRef.current) {
            setHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setHeight("0px");
        }
    }, [isOpen]);

    return (
        <div className="mb-4 overflow-hidden rounded-lg border border-orange-200 transition-all">
            <button
                className={`flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${isOpen ? "bg-orange-100" : "bg-orange-50 hover:bg-orange-100"
                    }`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                type="button"
            >
                <div className="flex items-center">
                    <span className="mr-3 text-lg text-orange-400">{icon}</span>
                    <span className="font-medium text-slate-800">{question}</span>
                </div>
                <span className="ml-2 text-lg font-bold text-orange-400">
                    {isOpen ? "−" : "+"}
                </span>
            </button>

            <div
                ref={contentRef}
                style={{
                    height: height,
                    transition: "height 300ms ease",
                }}
                className="overflow-hidden bg-white"
            >
                <div className="p-4 text-slate-700">{answer}</div>
            </div>
        </div>
    );
};

// ---------------- Icons (inline SVGs) ----------------
const BookIcon: ReactNode = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M4 4.5A2.5 2.5 0 016.5 7H20v13H6.5A2.5 2.5 0 014 17.5v-13z" />
    </svg>
);

const BrickWallIcon: ReactNode = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <rect x="3" y="3" width="18" height="6" rx="1" />
        <rect x="3" y="9" width="9" height="6" rx="1" />
        <rect x="12" y="9" width="9" height="6" rx="1" />
        <rect x="3" y="15" width="18" height="6" rx="1" />
    </svg>
);

const TruckIcon: ReactNode = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path d="M3 7h13v10H3z" />
        <path d="M16 7h5l1 5v5h-6z" />
        <circle cx="7.5" cy="17.5" r="1.5" />
        <circle cx="17.5" cy="17.5" r="1.5" />
    </svg>
);

const ChildIcon: ReactNode = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <circle cx="12" cy="7" r="4" />
        <path d="M5 21v-2a7 7 0 0114 0v2" />
    </svg>
);

// ---------------- FAQ Section ----------------
const FAQSection: React.FC = () => {
    const faqs: FAQ[] = [
        {
            question: "What is FastPrompt and how does it work?",
            answer:
                "FastPrompt is a JSON-first, UI/UX Prompt Expansion Engine that transforms vague or minimal UI/UX prompts into fully structured, implementation-ready JSON payloads. Simply input your basic idea like 'Create a dashboard for a SaaS app' and get comprehensive JSON specifications with typography, colors, components, and responsive layouts.",
            icon: BookIcon,
        },
        {
            question: "Which design tools does FastPrompt integrate with?",
            answer:
                "FastPrompt works perfectly with v0.dev (Vercel's AI-powered UI generator), Bolt.new (lightning-fast app creation), and Lovable (AI-powered web app builder). The structured JSON output can be pasted directly into these tools for superior results.",
            icon: BrickWallIcon,
        },
        {
            question: "What makes FastPrompt different from using design tools directly?",
            answer:
                "While one-shot design tools often produce generic, incomplete designs, FastPrompt acts as an intelligent middleman that expands your prompts, enriches your ideas with detailed UI/UX considerations, ensures consistency, and provides implementation-ready specifications that tools can execute perfectly.",
            icon: TruckIcon,
        },
        {
            question: "What kind of detailed specifications does FastPrompt generate?",
            answer:
                "FastPrompt generates comprehensive JSON including typography systems (Jakarta Sans, Geist), color palettes with semantic moods, component variants and states, responsive breakpoints, micro-interactions, spacing systems, API endpoints, data flow logic, and authentication patterns - everything needed for professional UI development.",
            icon: ChildIcon,
        },
    ];

    return (
        <section className="mx-auto max-w-6xl px-4 pt-16 pb-[150px] sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50/30">
            <div className="flex flex-col lg:flex-row lg:space-x-12">
                {/* Left Column */}
                <div className="mb-8 lg:mb-0 lg:w-1/3 flex flex-col justify-center">
                    <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">FAQs</h2>
                    <p className="text-lg text-slate-600">
                        Get to know all the questions that users have for us. If you can't
                        find your question here, feel free to contact us directly!
                    </p>
                </div>

                {/* Right Column */}
                <div className="lg:w-2/3 space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            icon={faq.icon}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
