import React from "react";

// Utility for check icon
const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-5 h-5 mx-auto ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

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
    key: "free",
    name: "Free",
    price: 0,
    highlight: false,
    highlightHeader: false,
    headerClass: "",
    cellClass: "",
    priceClass: "",
    perMonthClass: "",
    buttonClass: "text-blue-600 hover:text-blue-700",
  },
  {
    key: "team",
    name: "Team",
    price: 99,
    highlight: false,
    highlightHeader: false,
    headerClass: "",
    cellClass: "",
    priceClass: "",
    perMonthClass: "",
    buttonClass: "text-blue-600 hover:text-blue-700",
  },
  {
    key: "popular",
    name: "Popular",
    price: 150,
    highlight: true,
    highlightHeader: true,
    headerClass: "bg-gray-900 rounded-t-xl",
    cellClass: "text-white bg-gray-900 border-b border-white/20",
    priceClass: "text-white",
    perMonthClass: "text-gray-200",
    buttonClass: "text-white",
    badge: "Popular",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: 490,
    highlight: false,
    highlightHeader: false,
    headerClass: "",
    cellClass: "",
    priceClass: "",
    perMonthClass: "",
    buttonClass: "text-blue-600 hover:text-blue-700",
  },
];

const features: Array<{ label: string, keys: string[], header?: boolean, isButton?: boolean, isFooter?: boolean }> = [
  { label: "Website number", keys: ["01", "10", "50", "Unlimited"] },
  { label: "Server storage", keys: ["100 GB", "500 GB", "1 TB", "Unlimited"] },
  { label: "Database", keys: ["-", "15", "Unlimited", "Unlimited"] },
  {
    label: "Unmetered Bandwidth",
    keys: [
      "-",
      <CheckIcon key="team" />,
      <CheckIcon key="popular" />,
      <CheckIcon key="enterprise" />,
    ] as any
  },
  {
    label: "SSD Disk",
    keys: [
      "-",
      "-",
      <CheckIcon key="popular" />,
      <CheckIcon key="enterprise" />,
    ] as any
  },
  {
    label: "VCPUS Fontworld",
    keys: [
      "-",
      "-",
      <CheckIcon key="popular" />,
      <CheckIcon key="enterprise" />,
    ] as any
  },
  {
    label: "WordPress install",
    keys: [
      "-",
      "-",
      <CheckIcon key="popular" />,
      <CheckIcon key="enterprise" />,
    ] as any
  },
  {
    label: "Server speed",
    keys: [
      "-",
      "-",
      <CheckIcon key="popular" />,
      <CheckIcon key="enterprise" />,
    ] as any
  },
];

const mobileFeatures = [
  {
    label: "Website number",
    values: ["01", "10", "100", "Unlimited"],
  },
  {
    label: "Server storage",
    values: ["100 GB", "500 GB", "1 TB", "Unlimited"],
  },
  {
    label: "Database",
    values: ["-", "15", "Unlimited", "Unlimited"],
  },
  {
    label: "Unmetered bandwidth",
    values: [
      "-",
      <CheckIcon key="mobile_team" />,
      <CheckIcon key="mobile_popular" />,
      <CheckIcon key="mobile_enterprise" />,
    ] as any,
  },
  {
    label: "SSD Disk",
    values: [
      "-",
      <CheckIcon key="mobile_team" />,
      <CheckIcon key="mobile_popular" />,
      <CheckIcon key="mobile_enterprise" />,
    ] as any,
  },
  {
    label: "VCPUS Fontworld",
    values: [
      "-",
      <CheckIcon key="mobile_team" />,
      <CheckIcon key="mobile_popular" />,
      <CheckIcon key="mobile_enterprise" />,
    ] as any,
  },
  {
    label: "WordPress install",
    values: [
      "-",
      <CheckIcon key="mobile_team" />,
      <CheckIcon key="mobile_popular" />,
      <CheckIcon key="mobile_enterprise" />,
    ] as any,
  },
];

const Pricing: React.FC = () => {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black lg:text-5xl sm:text-5xl">
            Pricing &amp; Plans
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint.
            Velit officia consequat duis enim velit mollit.
          </p>
        </div>

        {/* lg+ (table) */}
        <div className="hidden mt-16 lg:block">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-8 pr-4"></th>
                {plans.map((plan) => (
                  <th
                    key={plan.key}
                    className={`px-4 py-8 text-center ${plan.headerClass || ""}`}
                  >
                    {plan.highlightHeader ? (
                      <span className="px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-full">
                        {plan.badge}
                      </span>
                    ) : (
                      <span className="text-base font-medium text-blue-600">
                        {plan.name}
                      </span>
                    )}
                    <p
                      className={`mt-6 text-6xl font-bold ${
                        plan.priceClass || ""
                      }`}
                    >
                      ${plan.price}
                    </p>
                    <p
                      className={`mt-2 text-base font-normal ${
                        plan.perMonthClass || "text-gray-500"
                      }`}
                    >
                      Per month
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.label}>
                  <td className="py-4 pr-4 font-medium border-b border-gray-200">
                    {feature.label}
                  </td>
                  {plans.map((plan, cIdx) => (
                    <td
                      key={plan.key}
                      className={
                        [
                          "px-4 py-4 text-center border-b",
                          plan.highlight
                            ? "text-white bg-gray-900 border-white/20"
                            : "border-gray-200",
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
                <td className="py-6 pr-4"></td>
                {plans.map((plan) => (
                  <td
                    key={plan.key}
                    className={`px-4 py-6 text-center ${
                      plan.highlight
                        ? "text-white bg-yellow-500 rounded-b-xl"
                        : ""
                    }`}
                  >
                    <a
                      href="#"
                      title=""
                      className={`inline-flex items-center font-semibold ${
                        plan.buttonClass
                      } ${plan.highlight ? "" : "hover:text-blue-700"}`}
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
      <div className="block mt-12 border-t border-b border-gray-200 divide-y divide-gray-200 lg:hidden">
        {/* mobile header tiles */}
        <div className="grid grid-cols-4 text-center divide-x divide-gray-200">
          {plans.map((plan) => (
            <div className="px-2 py-2" key={plan.key}>
              <span className="text-sm font-medium text-blue-600">
                {plan.badge ?? plan.name}
              </span>
              <p className="mt-2 text-xl font-bold">${plan.price}</p>
              <span className="mt-1 text-sm font-normal text-gray-500">
                Per month
              </span>
            </div>
          ))}
        </div>
        {/* features */}
        {mobileFeatures.map((feature) => (
          <React.Fragment key={feature.label}>
            <div className="px-2 py-4 sm:px-4">
              <p className="font-semibold">{feature.label}</p>
            </div>
            <div className="grid grid-cols-4 text-center divide-x divide-gray-200">
              {feature.values.map((val: any, i: number) => (
                <div className="px-2 py-2" key={i}>
                  {React.isValidElement(val) ? val : val}
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
        {/* CTA Buttons, matches original last row */}
        <div className="grid grid-cols-4 text-center divide-x divide-gray-200">
          {plans.map((plan, idx) => (
            <div
              key={plan.key}
              className={`px-1 ${
                idx === plans.length - 1 ? "pt-2 pb-4" : "py-2"
              } sm:px-4`}
            >
              <span className="text-sm font-medium text-blue-600">
                {plan.badge ?? plan.name}
              </span>
              <p className="mt-2 text-xl font-bold">${plan.price}</p>
              <span className="mt-1 text-sm font-normal text-gray-500">
                Per month
              </span>
              <a
                href="#"
                title=""
                role="button"
                className="flex items-center justify-center w-full px-1 py-2 mt-5 text-sm text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
