import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What benefits can I qualify for?",
    answer:
      "Veterans can qualify for healthcare, disability compensation, education assistance, housing loans, pension benefits, vocational training, and survivor support programs.",
  },
  {
    question: "What happens if I've been denied before?",
    answer:
      "If you have been denied before, we can guide you through the appeal process to ensure you get the benefits you deserve.",
  },
  {
    question: "How long does the process take?",
    answer: "The process varies depending on the case, but generally it takes a few weeks to a few months.",
  },
  {
    question: "What is your guest screening process?",
    answer:
      "Our guest screening process includes background checks and verification to ensure a safe and secure environment.",
  },
  {
    question: "How much are your Co-Hosting fees?",
    answer:
      "Our Co-Hosting fees vary depending on the services you require. Contact us for more detailed pricing information.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
	id="faqs"
      className="md:py-16 py-10 bg-no-repeat bg-cover bg-center relative px-5"
      style={{ backgroundImage: "url('https://i.ibb.co/v6qYf4X4/faq-bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-3 md:px-20 relative z-10">
        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center md:text-start">
              Frequently Asked Questions
              {/* <br /> */}
              
            </h2>
            <div className="hidden md:block ps-32">
              <svg width="600" height="20" viewBox="0 0 600 20" className="text-white">
                <path d="M0 10 L580 10 M575 5 L580 10 L575 15" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-1">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/20">
              <div
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center py-6 cursor-pointer group hover:bg-white/5 transition-all duration-200 px-4 -mx-4"
              >
                <div className="flex md:items-center">
                  <span className="text-white/60 text-lg font-medium min-w-[3rem]">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <h3 className="text-white text-base md:text-xl font-medium">{faq.question}</h3>
                </div>
                <div
                  className={`
                    p-[1px] md:p-2 rounded-full border border-white/30 flex items-center justify-center
                    transition-all duration-300 ease-in-out
                    ${openIndex === index ? "bg-white rotate-180" : "bg-transparent group-hover:bg-white/10"}
                  `}
                >
                  <ChevronDown
                    className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${
                      openIndex === index ? "text-[#0A3161]" : "text-white"
                    }`}
                  />
                </div>
              </div>

              {/* Animated Answer */}
              <div
                className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <div className="pb-6 pt-2 pl-12 pr-4">
                  <p className="text-gray-400 text-sm md:text-lg leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}