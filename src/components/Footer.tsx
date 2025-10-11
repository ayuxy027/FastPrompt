import React from 'react';
import FastPromptLogo from '../assets/logo.png';

interface FooterItem {
    label: string;
    href: string;
    external?: boolean;
}

interface FooterSection {
    title: string;
    items: FooterItem[];
}

const Footer: React.FC = () => {
    const sections: Record<string, FooterSection> = {
        product: {
            title: "Product",
            items: [
                { label: "Prompt Expansion", href: "/prompt-expansion" },
                { label: "JSON Generation", href: "/json-generation" },
                { label: "UI Specifications", href: "/ui-specifications" },
                { label: "API Integration", href: "/api" },
                { label: "Templates", href: "/templates" },
                { label: "Documentation", href: "/docs" },
            ],
        },
        company: {
            title: "Company",
            items: [
                { label: "About FastPrompt", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Careers", href: "/careers" },
                { label: "Success Stories", href: "/success-stories" },
                { label: "Press Kit", href: "/press" },
            ],
        },
        resources: {
            title: "Resources",
            items: [
                { label: "Developer Hub", href: "/developer-hub" },
                {
                    label: "Community",
                    href: "/community",
                    external: true,
                },
                { label: "Contact", href: "/contact" },
                { label: "Support", href: "/support" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Report an Issue", href: "/report" },
            ],
        },
        partners: {
            title: "Partners",
            items: [
                { label: "v0 Integration", href: "/v0-integration" },
                { label: "Bolt Integration", href: "/bolt-integration", external: true },
                { label: "Lovable Integration", href: "/lovable-integration", external: true },
                { label: "API Partners", href: "/api-partners" },
            ],
        },
    };

    return (
        <div className="px-4 xl:px-0 bg-gradient-to-br from-orange-50 to-white">
            <footer className="relative mx-auto flex max-w-6xl flex-wrap pt-16 pb-8 font-['Plus_Jakarta_Sans'] tracking-tight">
                {/* Beautiful Design Elements - Restored */}
                <div className="pointer-events-none absolute inset-0">
                    {/* Left */}
                    <div
                        className="absolute inset-y-0 my-[-5rem] w-px"
                        style={{
                            maskImage: "linear-gradient(transparent, white 5rem)",
                        }}
                    >
                        <svg className="h-full w-full" preserveAspectRatio="none">
                            <line
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="100%"
                                className="stroke-orange-200"
                                strokeWidth="2"
                                strokeDasharray="3 3"
                            />
                        </svg>
                    </div>

                    {/* Right */}
                    <div
                        className="absolute inset-y-0 right-0 my-[-5rem] w-px"
                        style={{
                            maskImage: "linear-gradient(transparent, white 5rem)",
                        }}
                    >
                        <svg className="h-full w-full" preserveAspectRatio="none">
                            <line
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="100%"
                                className="stroke-orange-200"
                                strokeWidth="2"
                                strokeDasharray="3 3"
                            />
                        </svg>
                    </div>
                </div>
                <svg
                    className="mb-10 h-20 w-full border-y border-dashed border-orange-200 stroke-orange-200"
                >
                    <defs>
                        <pattern
                            id="diagonal-footer-pattern"
                            patternUnits="userSpaceOnUse"
                            width="64"
                            height="64"
                        >
                            {Array.from({ length: 17 }, (_, i) => {
                                const offset = i * 8;
                                return (
                                    <path
                                        key={i}
                                        d={`M${-106 + offset} 110L${22 + offset} -18`}
                                        stroke=""
                                        strokeWidth="1"
                                        className="stroke-orange-200"
                                    />
                                );
                            })}
                        </pattern>
                    </defs>
                    <rect
                        stroke="none"
                        width="100%"
                        height="100%"
                        fill="url(#diagonal-footer-pattern)"
                    />
                </svg>

                <div className="mr-auto flex w-full justify-between lg:w-fit lg:flex-col">
                    <a href="/" className="flex items-center font-medium text-gray-700 select-none sm:text-sm">
                        <img
                            src={FastPromptLogo}
                            alt="FastPrompt Logo"
                            className="ml-2 h-32 w-auto"
                        />
                        <span className="sr-only">FastPrompt Logo (go home)</span>
                    </a>

                    <div>
                        <div className="mt-4 flex items-center gap-2">
                            {/* Social Icons */}
                            <a
                                href="/twitter"
                                className="rounded-lg p-2 text-gray-600 transition-colors duration-200 hover:bg-orange-100 hover:text-orange-600"
                            >
                                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="/youtube"
                                className="rounded-lg p-2 text-gray-600 transition-colors duration-200 hover:bg-orange-100 hover:text-orange-600"
                            >
                                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                            <a
                                href="/github"
                                className="rounded-lg p-2 text-gray-600 transition-colors duration-200 hover:bg-orange-100 hover:text-orange-600"
                            >
                                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.725-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href="/discord"
                                className="rounded-lg p-2 text-gray-600 transition-colors duration-200 hover:bg-orange-100 hover:text-orange-600"
                            >
                                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6.194 13.392c0 1.819-.95 2.527-2.168 2.527-1.218 0-2.168-.708-2.168-2.527 0-1.819.95-2.527 2.168-2.527 1.218 0 2.168.708 2.168 2.527zm-2.168 1.636c.659 0 1.168-.509 1.168-1.636 0-1.127-.509-1.636-1.168-1.636-.659 0-1.168.509-1.168 1.636 0 1.127.509 1.636 1.168 1.636zm8.432-1.636c0 1.819-.95 2.527-2.168 2.527-1.218 0-2.168-.708-2.168-2.527 0-1.819.95-2.527 2.168-2.527 1.218 0 2.168.708 2.168 2.527zm-2.168 1.636c.659 0 1.168-.509 1.168-1.636 0-1.127-.509-1.636-1.168-1.636-.659 0-1.168.509-1.168 1.636 0 1.127.509 1.636 1.168 1.636zm8.432-1.636c0 1.819-.95 2.527-2.168 2.527-1.218 0-2.168-.708-2.168-2.527 0-1.819.95-2.527 2.168-2.527 1.218 0 2.168.708 2.168 2.527zm-2.168 1.636c.659 0 1.168-.509 1.168-1.636 0-1.127-.509-1.636-1.168-1.636-.659 0-1.168.509-1.168 1.636 0 1.127.509 1.636 1.168 1.636z" />
                                </svg>
                            </a>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                            Made with ❤️ by <a href="https://x.com/ayuxy027" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-800">Ayush</a>
                        </div>
                    </div>
                </div>

                {/* Footer Sections */}
                {Object.entries(sections).map(([key, section]) => (
                    <div key={key} className="mt-10 min-w-44 pl-2 lg:mt-0 lg:pl-0">
                        <h3 className="mb-4 font-semibold text-gray-900 sm:text-sm">
                            {section.title}
                        </h3>
                        <ul className="space-y-3">
                            {section.items.map((item) => (
                                <li key={item.label} className="text-sm">
                                    <a
                                        href={item.href}
                                        target={item.external ? "_blank" : undefined}
                                        rel={item.external ? "noopener noreferrer" : undefined}
                                        className="text-gray-600 transition-colors duration-200 hover:text-orange-600"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </footer>
        </div>
    );
};

export default Footer;