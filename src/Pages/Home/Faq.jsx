import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is VALRPRO and how does it help veterans? ",
    answer:
      "VALRPRO is a comprehensive platform designed to assist veterans in navigating the VA disability claims process. Our platform helps you start your claim, gather the necessary documents, and track your claim’s progress. We simplify the entire process to ensure you receive the benefits you deserve, quickly and securely. ",
  },
  {
    question:
      "What documents do I need to get started with my VA disability claim?",
    answer:
      "To begin your claim, There is no required document mandatory but we suggest having your DD214 (Certificate of Release or Discharge)",
  },
  {
    question: "How much does it cost to use VALRPRO services? ",
    answer:
      "At VALRPRO, we offer flexible subscription options to best meet your needs. You can choose a month-to-month plan at $50 per month, which allows you to cancel anytime with no long-term commitment. Alternatively, we highly recommend our 6-month prepaid plan at $195, which provides a 35% savings – effectively giving you two months for free. Our goal is to make accessing your benefits as affordable and seamless as possible. ",
  },
  {
    question: "How secure is my personal information with VALRPRO?",
    answer:
      "VALRPRO takes the protection of your personal data seriously. All information is encrypted and safeguarded, We never share your information without your consent. ",
  },
  {
    question: "Can I track the progress of my claim through VALRPRO? ",
    answer:
      "Yes! Every veteran who uses VALRPRO is assigned a dedicated Case Advocate who will provide status updates. Ensuring that you’re always informed about the progress of your claim.",
  },
  {
    question: "How Long Does the VA Disability Claim Process Take? ",
    answer:
      "The duration of the VA disability claim process varies depending on the VA's current workload. On average, it takes about 60 to 120 days after claim submission to receive a decision. We guide you through the entire process and provide regular updates to keep you informed every step of the way. ",
  },
  {
    question:
      "Can I File for VA Benefits if I Was Injured Before I Deployed or Completed Training?",
    answer:
      "Yes. If the injury occurred during your time in the military or during active training, you may still qualify for benefits, even if it happened prior to deployment or training completion. The key factor is that the injury was sustained during active military service or training. ",
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
      className="md:py-16 py-10 bg-no-repeat bg-cover bg-center relative px-5 bg-[#1a2332]"
      // style={{ backgroundImage: "url('https://i.ibb.co/v6qYf4X4/faq-bg.png')" }}
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
              <svg
                width="600"
                height="20"
                viewBox="0 0 600 20"
                className="text-white"
              >
                <path
                  d="M0 10 L580 10 M575 5 L580 10 L575 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
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
                  <h3 className="text-white text-base md:text-xl font-medium">
                    {faq.question}
                  </h3>
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
                  <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
