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
    <div className="mb-4 overflow-hidden rounded-lg border border-emerald-200 transition-all">
      <button
        className={`flex w-full items-center justify-between p-4 text-left transition-colors duration-200 ${
          isOpen ? "bg-emerald-100" : "bg-emerald-50 hover:bg-emerald-100"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        type="button"
      >
        <div className="flex items-center">
          <span className="mr-3 text-lg text-emerald-600">{icon}</span>
          <span className="font-medium text-emerald-900">{question}</span>
        </div>
        <span className="ml-2 text-lg font-bold text-emerald-600">
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
        <div className="p-4 text-emerald-800">{answer}</div>
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
      question: "Is this suitable for my child's age group?",
      answer:
        "Absolutely! This book is meant for every child to easily pick up and learn from. The information given in this book is easy for kids to understand and colourful visuals to pair with it!",
      icon: BookIcon,
    },
    {
      question: "Where does the money go?",
      answer:
        "All of the money we earn with the sale of these books goes to the ManRay Foundation, an NGO dedicated to providing knowledge and learning to underprivileged children from under-resourced backgrounds.",
      icon: BrickWallIcon,
    },
    {
      question: "When will I get my copy?",
      answer:
        "We will dispatch your copy as soon as the order is placed. We promise a quick delivery service with our magazine so that your kid can get started with reading as soon as possible!",
      icon: TruckIcon,
    },
    {
      question: "Can my child be featured in the next issue?",
      answer:
        "Yes! We love featuring our young readers. Submit your child's artwork or story through our website for consideration in future issues.",
      icon: ChildIcon,
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        {/* Left Column */}
        <div className="mb-8 lg:mb-0 lg:w-1/3 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4">FAQs</h1>
          <p className="text-lg">
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
