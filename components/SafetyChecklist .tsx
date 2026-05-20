import React from 'react';
import { Icons } from './Icons';

const SafetyChecklist: React.FC = () => {
  const safetyPoints = [
    {
      title: "The Heat Test",
      description: "Place your hand carefully over wall switches and sockets. If they feel warm to the touch, you likely have a loose connection or overloaded circuit. This is a major fire hazard.",
      icon: <Icons.Thermometer className="h-6 w-6 md:h-8 md:w-8 text-red-500" />
    },
    {
      title: "Yaka & Breakers",
      description: "Does your main breaker trip frequently? Or does your Yaka meter display 'Tamper' or reject tokens? These are signs of electrical faults or dangerous bypasses.",
      icon: <Icons.Zap className="h-6 w-6 md:h-8 md:w-8 text-amber-500" />
    },
    {
      title: "Cord Inspection",
      description: "Check all appliance cords and extension cables. Look for cuts, exposed copper, or fraying. Never run cords under carpets where heat can build up.",
      icon: <Icons.Plug className="h-6 w-6 md:h-8 md:w-8 text-slate-700" />
    },
    {
      title: "Water Safety",
      description: "Ensure no outlets or electronics are within reach of water sources in kitchens and bathrooms. If an outlet gets wet, do not touch it; turn off the main switch immediately.",
      icon: <Icons.Droplets className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
    },
    {
      title: "Backup Health",
      description: "For solar/inverter users: Check your battery terminals for corrosion (white powder). If using wet cells, ensure acid levels are topped up to prevent battery failure.",
      icon: <Icons.BatteryCharging className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
    }
  ];

  const scrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('quote');
    if (element) {
      const offset = 120; // Offset for fixed navbar + spacing
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="safety-checklist" className="py-12 md:py-20 bg-yellow-50 scroll-mt-24 border-y border-yellow-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-4 border border-yellow-200">
            <Icons.AlertTriangle className="h-6 w-6 md:h-8 md:w-8 text-amber-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Dynawatt Safety Checklist</h2>
          <p className="text-base md:text-lg text-slate-700 max-w-2xl mx-auto">
            Electrical safety is your responsibility. Use this 5-point checklist to perform a quick audit of your home. If you spot any issues, call us immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {safetyPoints.map((point, index) => (
            <div 
              key={index} 
              className="bg-white p-5 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-t-4 border-amber-400 flex flex-col"
            >
              <div className="flex items-center mb-3 md:mb-4">
                <div className="p-2 bg-slate-50 rounded-lg mr-4">
                  {point.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800">{point.title}</h3>
              </div>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}

          {/* Call to Action Card */}
          <div className="bg-slate-900 p-5 md:p-6 rounded-xl shadow-lg flex flex-col justify-center items-center text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3">Found an Issue?</h3>
            <p className="text-slate-300 text-sm md:text-base mb-6">Don't risk a fire or shock. Get a professional inspection today.</p>
            <a 
              href="#quote" 
              onClick={scrollToQuote}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-6 rounded-lg w-full flex items-center justify-center cursor-pointer text-sm md:text-base"
            >
              <Icons.Phone className="h-5 w-5 mr-2" />
              Book Inspection
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyChecklist;