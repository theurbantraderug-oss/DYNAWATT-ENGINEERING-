import React, { useEffect } from 'react';
import { Icons } from './Icons';
import { Page } from '../types';

interface ServicesDetailProps {
  setPage: (page: Page) => void;
}

const ServicesDetail: React.FC<ServicesDetailProps> = ({ setPage }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const detailedServices = [
    {
      title: "Electrical Installation",
      description: "We offer professional electrical installation services in Kampala and across Uganda, ensuring safe and efficient systems for homes and businesses.",
      icon: <Icons.Zap className="h-10 w-10 md:h-12 md:w-12 text-amber-500" />,
      features: [
        "House wiring and rewiring",
        "Office electrical systems",
        "Industrial installations",
        "Distribution board installation",
        "Chandelier & Mood Lighting Installation",
        "Earthing & Lightning Protection"
      ]
    },
    {
      title: "Solar Installation",
      description: "DYNAWATT ENGINEERING provides reliable solar installation services in Uganda to reduce electricity costs and improve energy reliability.",
      icon: <Icons.Sun className="h-10 w-10 md:h-12 md:w-12 text-amber-500" />,
      features: [
        "Solar panel installation",
        "Battery storage systems",
        "Inverter installation",
        "System design and consultation",
        "Solar water heating",
        "Maintenance & cleaning"
      ]
    },
    {
      title: "Repairs & Maintenance",
      description: "Our team provides quick and effective repair services to resolve electrical faults and maintain system performance.",
      icon: <Icons.Wrench className="h-10 w-10 md:h-12 md:w-12 text-amber-500" />,
      features: [
        "Fast fault detection",
        "Yaka meter troubleshooting",
        "Generator servicing",
        "Routine system maintenance",
        "Emergency electrical repairs",
        "Safety inspections"
      ]
    },
    {
      title: "Smart Home Installation",
      description: "Upgrade your property with smart systems that improve convenience, security, and energy efficiency.",
      icon: <Icons.Home className="h-10 w-10 md:h-12 md:w-12 text-amber-500" />,
      features: [
        "Smart lighting control",
        "Automated security systems",
        "Energy monitoring",
        "Remote access setup",
        "Smart thermostat installation",
        "Home theater & audio"
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-12 md:pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-24 pb-12 md:pt-32 md:pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 tracking-tight">Electrical & Solar Services in Kampala, Uganda</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Professional, Safe, and Reliable Engineering Solutions for Homes and Businesses.
          </p>
        </div>
      </div>

      {/* Breadcrumb / Back */}
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <button 
          onClick={() => setPage(Page.HOME)}
          className="flex items-center text-slate-600 hover:text-amber-600 font-medium transition text-sm md:text-base"
        >
          <Icons.ArrowRight className="h-4 w-4 mr-2 rotate-180" />
          Back to Home
        </button>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 space-y-8 md:space-y-12">
        {detailedServices.map((service, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-slate-50 p-6 md:p-10 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-slate-100 text-center">
              <div className="bg-white p-4 md:p-6 rounded-full shadow-sm mb-4 md:mb-6">
                {service.icon}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">{service.title}</h2>
            </div>
            <div className="md:w-2/3 p-6 md:p-10">
              <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 leading-relaxed">
                {service.description}
              </p>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center text-sm md:text-base">
                <Icons.CheckCircle className="h-5 w-5 mr-2 text-amber-500" />
                What We Offer:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-amber-500 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-slate-600 text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-4 mt-12 md:mt-20">
        <div className="bg-amber-500 rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">Need a Custom Electrical Solution?</h2>
            <p className="text-lg md:text-xl text-slate-900/80 mb-6 md:mb-8 max-w-2xl mx-auto">
              Our engineers are ready to visit your site in Kampala, Wakiso, or Mukono for a free assessment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button 
                onClick={() => {
                  setPage(Page.HOME);
                  setTimeout(() => {
                    const el = document.getElementById('quote');
                    if (el) {
                      const offset = el.getBoundingClientRect().top + window.scrollY - 100;
                      window.scrollTo({ top: offset, behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className="bg-slate-900 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl hover:bg-slate-800 transition shadow-lg w-full md:w-auto"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesDetail;