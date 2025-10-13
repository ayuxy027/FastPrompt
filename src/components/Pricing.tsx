import React from "react";
import Navbar from './Navbar';
import Footer from './Footer';
import Block from './Block';


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
                    <Block
                        position="absolute"
                        top="top-66"
                        left="left-182"
                        right="right-0"
                        height="h-230"
                        width="w-55"
                        lineDirection="center"
                        lineColor="stroke-orange-200"
                        lineCount={17}
                        strokeWidth={1}
                        borderColor="border-orange-200"
                        borderWidth="border-y"
                        borderStyle="dashed"
                        zIndex={1}
                    />
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
                                                <p className={`mt-6 text-5xl font-bold ${plan.priceClass || ""}`}>
                                                    {plan.showPrice ? `₹${plan.price}` : "Free"}
                                                </p>
                                                {plan.showPrice && (
                                                    <p className={`mt-2 text-base font-normal ${plan.perMonthClass || "text-gray-500"}`}>
                                                        Per month
                                                    </p>
                                                )}
                                                <p className="mt-3 text-sm text-gray-500 max-w-[120px] mx-auto">
                                                    {plan.description}
                                                </p>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {features.map((feature) => (
                                        <tr key={feature.label} className="hover:bg-orange-50/30 transition-colors">
                                            <td className="py-4 pr-4 pl-8 font-medium text-gray-700 border-b border-gray-100">
                                                {feature.label}
                                            </td>
                                            {plans.map((plan, cIdx) => (
                                                <td
                                                    key={plan.key}
                                                    className={
                                                        [
                                                            "px-4 py-4 text-center border-b border-gray-100",
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
                                                className={`px-4 py-6 text-center ${plan.highlight
                                                    ? "text-white bg-gradient-to-br from-orange-500 to-orange-600"
                                                    : ""
                                                    }`}
                                            >
                                                <a
                                                    href="#"
                                                    title=""
                                                    className={`inline-flex items-center font-semibold px-6 py-3 rounded-lg transition-all duration-200 ${plan.highlight
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
                                            className={`block w-full text-center font-semibold px-6 py-3 rounded-lg transition-all duration-200 ${plan.highlight
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
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h3 className="text-2xl font-bold text-gray-800 font-['Plus_Jakarta_Sans'] tracking-tight">
                                Frequently Asked Questions
                            </h3>
                        </div>

                        <div className="max-w-4xl mx-auto space-y-4">
                            <div className="bg-white rounded-xl border border-orange-100 p-6">
                                <h4 className="font-semibold text-gray-800 mb-2">Can I change plans anytime?</h4>
                                <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                            </div>

                            <div className="bg-white rounded-xl border border-orange-100 p-6">
                                <h4 className="font-semibold text-gray-800 mb-2">What happens if I exceed my limits?</h4>
                                <p className="text-gray-600 text-sm">We'll notify you when you're approaching your limits. You can upgrade anytime or wait for the next billing cycle.</p>
                            </div>

                            <div className="bg-white rounded-xl border border-orange-100 p-6">
                                <h4 className="font-semibold text-gray-800 mb-2">Do you offer refunds?</h4>
                                <p className="text-gray-600 text-sm">Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Pricing;