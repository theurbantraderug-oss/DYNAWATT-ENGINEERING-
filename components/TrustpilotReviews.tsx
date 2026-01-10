
import React, { useEffect, useRef } from 'react';
import { Icons } from './Icons';

// Fix: Define the Trustpilot property on the global Window interface to resolve TypeScript errors
declare global {
  interface Window {
    Trustpilot: any;
  }
}

const TrustpilotReviews: React.FC = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Re-initialize Trustpilot widget when component mounts
    // This is important for React apps where content might load after the bootstrap script
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(widgetRef.current);
    }
  }, []);

  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
             <Icons.Star className="h-5 w-5 text-green-500 fill-green-500" />
             <span className="text-slate-500 font-bold uppercase tracking-widest text-xs md:text-sm">Verified Experience</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            Rate Your Experience with Dynawatt
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Your feedback helps us provide the best electrical services in Uganda.
          </p>
        </div>

        {/* Trustpilot Review Collector Widget */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-amber-400 rounded-xl blur opacity-10 transition duration-1000"></div>
          <div className="relative bg-white rounded-xl p-2 md:p-4 border border-slate-100 shadow-lg shadow-slate-200/50">
            {/* User provided widget code */}
            <div 
              ref={widgetRef}
              className="trustpilot-widget" 
              data-locale="en-US" 
              data-template-id="56278e9abfbbba0bdcd568bc" 
              data-businessunit-id="69615f9a63d6da8514f68247" 
              data-style-height="52px" 
              data-style-width="100%" 
              data-token="7434a241-154f-4ec2-a242-f88e660a4c18"
            >
              <a href="https://www.trustpilot.com/review/dynawattengineering.com" target="_blank" rel="noopener noreferrer" className="flex justify-center py-2 text-slate-400 hover:text-green-600 font-medium">
                Review us on Trustpilot
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="https://www.trustpilot.com/review/dynawattengineering.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-amber-600 text-xs flex items-center justify-center transition-colors"
          >
            Visit our official profile
            <Icons.ArrowRight className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustpilotReviews;
