import React, { useState } from "react";
import Navbar from './Navbar';
import Footer from './Footer';
import Block from './Block';
import { motion, AnimatePresence } from 'framer-motion';


// Arrow right icon
const ArrowRightIcon = ({ className = "" }: { className?: string }) => (
    <svg
        className={`w-4 h-4 ml-1 ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
        />
    </svg>
);

// Table/plans data
const plans = [
    {
        key: "developers",
        name: "Developers",
        price: 0,
        showPrice: false,
        highlight: false,
        highlightHeader: false,
        headerClass: "",
        cellClass: "",
        priceClass: "text-gray-800",
        perMonthClass: "text-gray-500",
        buttonClass: "text-orange-400 hover:text-orange-500",
        description: "Perfect for getting started with FastPrompt",
        badge: undefined,
    },
    {
        key: "pro",
        name: "Pro",
        price: 99,
        showPrice: true,
        highlight: false,
        highlightHeader: false,
        headerClass: "",
        cellClass: "",
        priceClass: "text-gray-800",
        perMonthClass: "text-gray-500",
        buttonClass: "text-orange-400 hover:text-orange-500",
        description: "For professionals who need more power",
        badge: undefined,
    },
    {
        key: "builder",
        name: "Builder",
        price: 1399,
        showPrice: true,
        highlight: false,
        highlightHeader: false,
        headerClass: "",
        cellClass: "",
        priceClass: "text-gray-800",
        perMonthClass: "text-gray-500",
        buttonClass: "text-orange-400 hover:text-orange-500",
        description: "For advanced builders with premium features",
        badge: undefined,
    },
];

const features: Array<{ label: string, keys: string[], header?: boolean, isButton?: boolean, isFooter?: boolean }> = [
    { label: "Queries per Month", keys: ["10", "100", "200"] },
    { label: "AI Edits per Month", keys: ["3", "10", "15"] },
    { label: "Available Models", keys: ["Llama 3.1 Distilled", "5 Models + Thinking", "10 Models + Thinking + Grok 4 Fast"] },
    { label: "Site Builder (Claude 4.5 + GPT 5)", keys: ["Not Available", "Not Available", "Yes"] },
    { label: "Prompt Character Limit", keys: ["100 chars", "300 chars", "Unlimited"] },
    { label: "Support", keys: ["Email Support", "WhatsApp Group", "Priority DM 24/7"] },
    { label: "File Attachments", keys: ["No", "Yes", "Yes"] },
    { label: "Advanced Analytics", keys: ["No", "Yes", "Yes"] },
    { label: "Export Options", keys: ["Basic", "PDF + JSON", "All Formats + API"] },
    { label: "Priority Processing", keys: ["No", "Yes", "Yes"] },
];


const Pricing: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const faqItems = [
        {
            question: "What are AI Edits?",
            answer: "AI Edits are follow-up queries that allow you to refine and improve your initial prompts. Each plan includes a specific number of AI Edits per month to help you iterate on your designs."
        },
        {
            question: "Can I upgrade my plan anytime?",
            answer: "Yes, you can upgrade your plan at any time. Upgrades take effect immediately and give you access to higher limits and additional features like more models and file attachments."
        },
        {
            question: "What is the Site Builder feature?",
            answer: "The Site Builder is a premium feature available only to Builder plan users. It generates complete websites using Claude 4.5 Sonnet and GPT 5 models running in parallel for faster, higher-quality results."
        },
        {
            question: "What file types can I attach?",
            answer: "Pro and Builder users can attach images, PDFs, and even link Figma designs. Free users cannot attach files. File attachments help provide better context for your prompt generation."
        },
        {
            question: "What happens if I exceed my query limits?",
            answer: "We'll notify you when you're approaching your monthly limits. You can upgrade your plan anytime to get more queries and features, or wait for the next billing cycle to reset your usage."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-['Plus_Jakarta_Sans'] tracking-tight relative">
            <Navbar />
            <section className="py-10 bg-white/80 backdrop-blur-sm sm:py-16 lg:py-24 relative z-10">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center relative z-20">
                        <h2 className="text-4xl font-bold text-gray-800 lg:text-5xl sm:text-5xl font-['Plus_Jakarta_Sans'] tracking-tight">
                            Simple, Transparent <span className="text-orange-400">Pricing</span>
                        </h2>
                        <p className="mt-6 text-lg leading-relaxed text-gray-600 font-['Plus_Jakarta_Sans'] tracking-tight">
                            Choose the perfect plan for your AI prompt generation needs. Start free and scale as you grow.
                        </p>
                    </div>
                    {/* Header decoration block - responsive */}
                    {/* Block Component Props Documentation:
                        position: "absolute" | "relative" | "fixed" | "static" | "sticky"
                        top: Tailwind spacing class (e.g., "top-21", "top-0", "top-1/2")
                        left: Tailwind spacing class (e.g., "left-0", "left-1/3", "left-auto")
                        right: Tailwind spacing class (e.g., "right-0", "right-1/3", "right-auto")
                        height: Tailwind height class (e.g., "h-43.5", "h-full", "h-screen")
                        width: Tailwind width class (e.g., "w-full", "w-1/3", "w-auto")
                        lineDirection: "center" | "left" | "right" | "top" | "bottom"
                        lineColor: Tailwind color class (e.g., "stroke-orange-200", "stroke-gray-300")
                        lineCount: Number of decorative lines (1-50)
                        strokeWidth: Line thickness (1-10)
                        borderColor: Tailwind border color (e.g., "border-orange-200", "border-gray-300")
                        borderWidth: Tailwind border width (e.g., "border-y", "border-x", "border")
                        borderStyle: "solid" | "dashed" | "dotted" | "double" | "none"
                        zIndex: CSS z-index value (1-9999)
                    */}
                    <div className="hidden sm:block">
                        <Block
                            position="absolute"
                            top="top-21"
                            left="left-0"
                            right="right-0"
                            height="h-43.5"
                            width="w-full"
                            lineDirection="center"
                            lineColor="stroke-orange-200"
                            lineCount={17}
                            strokeWidth={1}
                            borderColor="border-orange-200"
                            borderWidth="border-y"
                            borderStyle="dashed"
                            zIndex={1}
                        />
                    </div>
                    {/* Pro column highlight block - responsive and properly anchored */}
                    {/* Positioned to highlight the Pro column (middle of 3 columns) */}
                    {/* left: 1/3 = 33.33% (start of middle column), right: 1/3 = 33.33% (end of middle column) */}
                    <div className="hidden lg:block">
                        <Block
                            position="absolute"
                            top="top-66"
                            left="left-1/2"
                            right="right-1/6"
                            height="h-230"
                            width="w-66"
                            lineDirection="center"
                            lineColor="stroke-orange-200"
                            lineCount={17}
                            strokeWidth={1}
                            borderColor="border-orange-200"
                            borderWidth="border-y"
                            borderStyle="dashed"
                            zIndex={1}
                        />
                    </div>
                    {/* Footer decoration block - responsive */}
                    {/* Block Component Usage Example:
                        - position="absolute": Positions block relative to nearest positioned ancestor
                        - top="top-297": 297 units from top (Tailwind spacing scale)
                        - left/right="left-0/right-0": Full width positioning
                        - height="h-40": 40 units height (10rem)
                        - width="w-full": Full width (100%)
                        - lineDirection="center": Lines centered within block
                        - lineColor="stroke-orange-200": Orange stroke color for SVG lines
                        - lineCount={17}: Number of decorative lines to render
                        - strokeWidth={1}: 1px line thickness
                        - borderColor="border-orange-200": Orange border color
                        - borderWidth="border-y": Top and bottom borders only
                        - borderStyle="dashed": Dashed border style
                        - zIndex={1}: Layer stacking order
                    */}
                    <div className="hidden sm:block">
                        <Block
                            position="absolute"
                            top="top-297"
                            left="left-0"
                            right="right-0"
                            height="h-40"
                            width="w-full"
                            lineDirection="center"
                            lineColor="stroke-orange-200"
                            lineCount={17}
                            strokeWidth={1}
                            borderColor="border-orange-200"
                            borderWidth="border-y"
                            borderStyle="dashed"
                            zIndex={1}
                        />
                    </div>
                    {/* lg+ (table) */}
                    <div className="hidden mt-16 lg:block">
                        <div className="overflow-hidden rounded-2xl shadow-xl border border-orange-100">
                            <table className="w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-8 pr-4 pl-8"></th>
                                        {plans.map((plan) => (
                                            <th
                                                key={plan.key}
                                                className={`px-4 py-8 text-center ${plan.headerClass || ""}`}
                                            >
                                                {plan.highlightHeader ? (
                                                    <span className="px-4 py-2 text-sm font-medium text-white bg-orange-400 rounded-full">
                                                        {plan.badge}
                                                    </span>
                                                ) : (
                                                    <span className="text-base font-medium text-orange-400">
                                                        {plan.name}
                                                    </span>
                                                )}
                                                <p className={`mt-6 text-5xl font-bold ${plan.priceClass || ""} relative z-20`}>
                                                    {plan.showPrice ? `₹${plan.price}` : "Free"}
                                                </p>
                                                {plan.showPrice && (
                                                    <p className={`mt-2 text-base font-normal ${plan.perMonthClass || "text-gray-500"} relative z-20`}>
                                                        Per month
                                                    </p>
                                                )}
                                                <p className="mt-3 text-sm text-gray-500 max-w-[120px] mx-auto relative z-20">
                                                    {plan.description}
                                                </p>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {features.map((feature) => (
                                        <tr key={feature.label} className="hover:bg-orange-50/30 transition-colors">
                                            <td className="py-4 pr-4 pl-8 font-medium text-gray-700 border-b border-gray-100 relative z-20">
                                                {feature.label}
                                            </td>
                                            {plans.map((plan, cIdx) => (
                                                <td
                                                    key={plan.key}
                                                    className={
                                                        [
                                                            "px-4 py-4 text-center border-b border-gray-100 relative z-20",
                                                            plan.highlight
                                                                ? "text-white bg-gradient-to-br from-orange-400 to-orange-500 border-orange-400/30"
                                                                : "border-gray-100",
                                                            plan.cellClass || "",
                                                        ].join(" ")
                                                    }
                                                >
                                                    {
                                                        // If JSX, render as is; else as text
                                                        React.isValidElement(feature.keys[cIdx])
                                                            ? feature.keys[cIdx]
                                                            : feature.keys[cIdx]
                                                    }
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="py-6 pr-4 pl-8"></td>
                                        {plans.map((plan) => (
                                            <td
                                                key={plan.key}
                                                className={`px-4 py-6 text-center relative z-20 ${plan.highlight
                                                    ? "text-white bg-gradient-to-br from-orange-500 to-orange-600"
                                                    : ""
                                                    }`}
                                            >
                                                <a
                                                    href="#"
                                                    title=""
                                                    className={`inline-flex items-center font-semibold px-6 py-3 rounded-lg transition-all duration-200 relative z-20 ${plan.highlight
                                                        ? "bg-white text-orange-400 hover:bg-orange-50"
                                                        : "bg-orange-400 text-white hover:bg-orange-500"
                                                        }`}
                                                >
                                                    Get Started
                                                    <ArrowRightIcon />
                                                </a>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* xs to lg */}
                    <div className="block mt-12 lg:hidden">
                        <div className="space-y-6">
                            {plans.map((plan) => (
                                <div
                                    key={plan.key}
                                    className={`rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-200 ${plan.highlight
                                        ? "border-orange-400 bg-gradient-to-br from-orange-400 to-orange-500 text-white"
                                        : "border-orange-100 bg-white"
                                        }`}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className={`text-xl font-bold ${plan.highlight ? "text-white" : "text-gray-800"}`}>
                                                    {plan.name}
                                                </h3>
                                                {plan.badge && (
                                                    <span className="inline-block px-3 py-1 mt-1 text-xs font-medium bg-orange-400 text-white rounded-full">
                                                        {plan.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-3xl font-bold ${plan.priceClass || ""}`}>
                                                    {plan.showPrice ? `₹${plan.price}` : "Free"}
                                                </p>
                                                {plan.showPrice && (
                                                    <p className={`text-sm ${plan.perMonthClass || "text-gray-500"}`}>
                                                        Per month
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <p className={`text-sm mb-6 ${plan.highlight ? "text-orange-100" : "text-gray-600"}`}>
                                            {plan.description}
                                        </p>

                                        <div className="space-y-3 mb-6">
                                            {features.map((feature) => (
                                                <div key={feature.label} className="flex items-center justify-between">
                                                    <span className={`text-sm font-medium ${plan.highlight ? "text-orange-100" : "text-gray-600"}`}>
                                                        {feature.label}
                                                    </span>
                                                    <span className={`text-sm ${plan.highlight ? "text-white" : "text-gray-800"}`}>
                                                        {React.isValidElement(feature.keys[plans.indexOf(plan)])
                                                            ? feature.keys[plans.indexOf(plan)]
                                                            : feature.keys[plans.indexOf(plan)]}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <a
                                            href="#"
                                            title=""
                                            className={`block w-full text-center font-semibold px-6 py-3 rounded-lg transition-all duration-200 relative z-20 ${plan.highlight
                                                ? "bg-white text-orange-400 hover:bg-orange-50"
                                                : "bg-orange-400 text-white hover:bg-orange-500"
                                                }`}
                                        >
                                            Get Started
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-20">
                        <div className="max-w-3xl mx-auto text-center mb-12 relative z-20">
                            <h3 className="text-4xl font-bold text-gray-800 lg:text-5xl sm:text-5xl font-['Plus_Jakarta_Sans'] tracking-tight">
                                Frequently Asked <span className="text-orange-400">Questions</span>
                            </h3>
                            <p className="mt-6 text-lg leading-relaxed text-gray-600 font-['Plus_Jakarta_Sans'] tracking-tight">
                                Everything you need to know about our AI prompt generation plans and features.
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto space-y-3">
                            {faqItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white rounded-lg border border-orange-100 relative z-20 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full p-5 text-left flex items-center justify-between hover:bg-orange-50 transition-all duration-300 ease-out focus:outline-none"
                                    >
                                        <h4 className="font-medium text-gray-800 pr-3 text-base">{item.question}</h4>
                                        <motion.div
                                            animate={{ rotate: openAccordion === index ? 180 : 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="flex-shrink-0"
                                        >
                                            <svg
                                                className="w-4 h-4 text-orange-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {openAccordion === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-5 pb-5 pt-0">
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -5 }}
                                                        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                                                        className="text-gray-600 text-sm leading-relaxed"
                                                    >
                                                        {item.answer}
                                                    </motion.p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Pricing;