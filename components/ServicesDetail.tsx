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
      title: "Residential Electrical Services",
      description: "We provide comprehensive electrical solutions for homes in Uganda, ensuring safety, functionality, and aesthetics. Whether you are building a new home or upgrading an old one, our certified team handles everything.",
      icon: <Icons.Home className="h-10 w-10 md:h-12 md:w-12 text-amber-500" />,
      features: [
        "Full House Wiring (First & Second Fix)",
        "Consumer Unit (Fuse Box) Upgrades",
        "Chandelier & Mood Lighting Installation",
        "Socket & Switch Additions",
        "Earthing & Lightning Protection Systems",
        "Yaka (UEDCL) Meter Troubleshooting"
      ]
    },
    {
      title: "Solar & Power Backup",
      description: "Say goodbye to load shedding. We design and install robust power backup systems tailored to your energy needs. From simple inverter setups to full off-grid solar plants.",
      icon: <Icons.Sun className="h-10 w-10 md:h-12 md:w-12 text-amber-500" />,
      features: [
        "Solar Panel Installation (Roof/Ground)",
        "Hybrid & Off-Grid Inverter Systems",
        "Battery Bank Setup (Lithium/Gel/Tubular)",
        "Automatic Transfer Switches (ATS)",
        "Solar Water Heating Integration",
        "System Sizing & Consultation"
      ]
    },
    {
      title: "Commercial & Industrial",
      description: "Heavy-duty electrical engineering for factories, offices, and commercial buildings requiring 3-phase power. We ensure your business runs efficiently with minimal downtime.",
      icon: <Icons.LayoutDashboard className="h-10 w-10 md:h-12 md:w-12 text-amber-500" />,
      features: [
        "3-Phase Power Distribution",
        "Industrial Motor Installation & Control",
        "Office Data & Power Trunking",
        "High-Bay Factory Lighting",
        "Power Factor Correction",
        "Emergency Lighting Systems"
      ]
    },
    {
      title: "Security & Surveillance",
      description: "Protect your assets with modern security technology installed by certified professionals. Monitor your property from anywhere in the world right from your phone.",
      icon: <Icons.Video className="h-10 w-10 md:h-12 md:w-12 text-amber-500" />,
      features: [
        "CCTV Camera Systems (IP & Analog)",
        "Remote Mobile Monitoring Setup",
        "Electric Fencing Installation",
        "Video Door Phones & Intercoms",
        "Motion Sensor Security Lights",
        "Access Control Systems"
      ]
    },
    {
      title: "Generator Services",
      description: "Maintenance and repair services for all generator sizes to keep your backup power reliable. We service Perkins, Cummins, and smaller petrol generators.",
      icon: <Icons.Wrench className="h-10 w-10 md:h-12 md:w-12 text-amber-500" />,
      features: [
        "Routine Servicing (Oil/Filter Changes)",
        "AVR Replacement & Troubleshooting",
        "Generator Installation & Commissioning",
        "Control Panel Repairs",
        "Fuel System Cleaning"
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-12 md:pb-20">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-24 pb-12 md:pt-32 md:pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 tracking-tight">Our Services</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Professional, Safe, and Reliable Electrical Engineering Solutions for Uganda.
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