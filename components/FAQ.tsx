import React, { useState } from 'react';
import { Icons } from './Icons';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        className="w-full py-5 flex justify-between items-center text-left focus:outline-none group"
        onClick={toggle}
      >
        <span className={`text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-amber-600' : 'text-slate-800 group-hover:text-amber-600'}`}>
          {question}
        </span>
        <div className={`ml-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? (
            <Icons.ChevronUp className="h-5 w-5 text-amber-500" />
          ) : (
            <Icons.ChevronDown className="h-5 w-5 text-slate-400 group-hover:text-amber-500" />
          )}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-slate-600 leading-relaxed pr-12">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first by default

  const faqs = [
    {
      question: "My Yaka meter is rejecting tokens, what should I do?",
      answer: "If your Yaka meter rejects tokens, first check for 'Error' codes on the screen. It could be a network issue, a locked meter (tamper mode), or unpaid debts. Try resetting your CIU (Customer Interface Unit). If the problem persists, you may need a certified electrician to check for wiring faults triggering the tamper mode, or contact Umeme support."
    },
    {
      question: "Do you offer emergency electrical services at night?",
      answer: "Yes, Dynawatt Engineering provides 24/7 emergency support for critical issues in Kampala and surrounding areas. If you experience burning smells, sparking sockets, or sudden power loss while neighbors have power, call our emergency line immediately."
    },
    {
      question: "How much does it cost to wire a house in Uganda?",
      answer: "The cost depends on the size of the house, the quality of materials (cables, sockets, switches), and the complexity of the installation. We offer free site visits to assess your project and provide a detailed, transparent quotation covering both labor and materials."
    },
    {
      question: "Can you install solar systems to handle load shedding?",
      answer: "Absolutely. We design and install custom solar backup systems. Whether you need a simple inverter for lights and phone charging, or a full hybrid system to run fridges and TVs during blackouts, we calculate the right battery and panel size for your needs."
    },
    {
      question: "Why do my light bulbs keep blowing out frequently?",
      answer: "Frequent bulb blowouts are often caused by loose connections in the lamp holder, voltage fluctuations from the main supply, or poor quality wiring. Using cheap, non-standard bulbs can also be a factor. We can inspect your lighting circuit to ensure stable voltage and secure connections."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50 scroll-mt-24 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-amber-100 rounded-full mb-4">
            <Icons.HelpCircle className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Answers to common questions about electrical safety, installation, and maintenance in Uganda.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-slate-600">
            Have a different question? 
            <a href="#quote" className="text-amber-600 font-bold hover:underline ml-2">Ask us directly</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;