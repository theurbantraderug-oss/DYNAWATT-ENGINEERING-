import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LeadForm from './components/LeadForm';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import FAQ from './components/FAQ';
import ServicesDetail from './components/ServicesDetail';
import { Icons } from './components/Icons';
import { Lead, Page, SiteConfig } from './types';

function App() {
  const [page, setPage] = useState<Page>(Page.HOME);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Site Configuration State (Simulating DB settings)
  const [config, setConfig] = useState<SiteConfig>({
    emergencyMode: false,
    contactPhone: '+256 751 473 830',
    whatsapp: '+256 751 473 830',
    heroHeadline: 'DYNAWATT ENGINEERING'
  });

  const [leads, setLeads] = useState<Lead[]>([]);

  const addLead = (lead: Lead) => {
    setLeads(prev => [lead, ...prev]);
  };

  const updateConfig = (key: keyof SiteConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    setPage(Page.HOME);
  };

  const whatsappMessage = encodeURIComponent("Hello, Im interested in working with DYNAWATT ENGINEERING. Is anyone available to chat");

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

  const projects = [
    {
      title: "Modern Residential Lighting",
      category: "Residential",
      location: "Salaama, Makindye",
      image: "/images/project-lighting.jpg"
    },
    {
      title: "Hybrid Solar System Setup",
      category: "Solar",
      location: "Kira Municipality",
      image: "/images/project-solar.jpg"
    },
    {
      title: "Commercial Building Wiring",
      category: "Commercial",
      location: "Kitukutwe, Kira",
      image: "/images/project-commercial.jpg"
    },
    {
      title: "Slab Work Piping",
      category: "Construction",
      location: "Mukono",
      image: "/images/project-construction.jpg"
    },
    {
      title: "Profile Lighting",
      category: "Lighting",
      location: "Matuga",
      image: "/images/project-pillar-light.jpg"
    },
    {
      title: "Complete House Wiring",
      category: "Residential",
      location: "Biira",
      image: "/images/project-finished-house.jpg"
    }
  ];

  const reviews = [
    {
      name: "Sarah K.",
      location: "Ntinda, Kampala",
      text: "Dynawatt rewired my entire house after we had issues with constantly tripping power. Professional, clean, and very knowledgeable. Highly recommended!",
      initial: "S"
    },
    {
      name: "James M.",
      location: "Entebbe",
      text: "The solar installation they did for my farm is working perfectly. I no longer worry about power outages affecting my business.",
      initial: "J"
    },
    {
      name: "Prossy N.",
      location: "Kira",
      text: "Quick response when I had an emergency with my water heater. The electrician explained everything clearly and fixed it in no time.",
      initial: "P"
    }
  ];

  if (page === Page.ADMIN) {
    if (!isAuthenticated) {
      return (
        <AdminLogin 
          onLogin={() => setIsAuthenticated(true)} 
          onCancel={() => setPage(Page.HOME)} 
        />
      );
    }

    return (
      <AdminDashboard 
        leads={leads} 
        config={config} 
        updateConfig={updateConfig} 
        goBack={handleAdminLogout} 
      />
    );
  }

  // Public Website View
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Emergency Banner */}
      {config.emergencyMode && (
        <div className="bg-red-600 text-white px-4 py-2 text-center font-bold flex justify-center items-center animate-pulse">
          <Icons.AlertTriangle className="h-5 w-5 mr-2" />
          <span>24/7 Emergency Services Active: Immediate Response Available! Call Now.</span>
        </div>
      )}

      <Navbar setPage={setPage} contactPhone={config.contactPhone} />

      {page === Page.HOME ? (
        <>
          {/* Hero Section */}
          <header id="home" className="relative bg-slate-900 text-white pt-20 pb-32 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/id/1019/1920/1080')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-amber-500/50 bg-amber-500/10 text-amber-500 text-sm font-medium mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                  DYNAWATT - Licensed & Insured
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                  {config.heroHeadline}
                </h1>
                <p className="text-xl text-slate-300 mb-8 max-w-lg">
                  Your premier electrical engineering partner in Uganda. Residential wiring, commercial power systems, and solar energy solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#quote" onClick={scrollToQuote} className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-slate-900 bg-amber-500 hover:bg-amber-600 transition shadow-lg hover:shadow-xl">
                    Get a Quote
                  </a>
                  <a 
                    href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex justify-center items-center px-8 py-4 border border-green-500 text-lg font-bold rounded-lg text-white bg-green-600 hover:bg-green-700 transition"
                  >
                    <Icons.MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp
                  </a>
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-10 relative z-10">
                <LeadForm addLead={addLead} />
              </div>
            </div>
          </header>

          {/* Trust Badges */}
          <div className="bg-slate-100 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <Icons.Shield className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="font-semibold text-slate-700">Certified Engineers</span>
                </div>
                <div className="flex flex-col items-center">
                  <Icons.Zap className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="font-semibold text-slate-700">24/7 Support</span>
                </div>
                <div className="flex flex-col items-center">
                  <Icons.CheckCircle className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="font-semibold text-slate-700">Quality Guaranteed</span>
                </div>
                <div className="flex flex-col items-center">
                  <Icons.MapPin className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="font-semibold text-slate-700">Ugandan Owned</span>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome & Guarantee Section - Enhanced */}
          <section className="py-20 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
            <div className="max-w-5xl mx-auto px-4 text-center">
              
              <div className="inline-flex items-center gap-2 p-2 px-4 bg-amber-50 border border-amber-200 rounded-full text-amber-800 font-bold text-sm mb-8 shadow-sm">
                <Icons.Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>Welcome to Dynawatt Engineering</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                Certified Electrical Excellence in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Kampala & Central Uganda</span>
              </h2>
              
              <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Your Trusted Partner for Reliable House Wiring, Security Systems, and Quality Electrical Supplies.
              </p>
              
              <p className="text-slate-600 mb-12 leading-relaxed text-lg max-w-4xl mx-auto font-medium">
                At <strong className="text-slate-900">Dynawatt Engineering</strong>, we don’t just install wires; we power your peace of mind. Whether you are building a new home in <strong className="text-slate-900">Kira</strong>, securing an industrial site in <strong className="text-slate-900">Mukono</strong>, or upgrading your lighting in <strong className="text-slate-900">Kampala</strong>, our certified team is ready to deliver.
              </p>

              <div className="bg-white border-t-4 border-amber-500 rounded-2xl p-8 md:p-12 mb-12 shadow-2xl shadow-slate-200/50 hover:shadow-amber-500/10 transition-all duration-300">
                <h3 className="text-2xl font-bold text-slate-900 mb-10 flex items-center justify-center">
                  <div className="bg-amber-100 p-2 rounded-full mr-3">
                    <Icons.CheckCircle className="h-6 w-6 text-amber-600" />
                  </div>
                  The Dynawatt Difference
                </h3>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-left">
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 bg-slate-50 p-3 rounded-xl shadow-sm mr-4 border border-slate-100 group-hover:border-amber-200 group-hover:bg-amber-50 transition-colors">
                      <Icons.Shield className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1">3-Month Repair Guarantee</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">We offer 3 months of free repairs on all full house wiring installations because we stand by our craftsmanship.</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 bg-slate-50 p-3 rounded-xl shadow-sm mr-4 border border-slate-100 group-hover:border-amber-200 group-hover:bg-amber-50 transition-colors">
                      <Icons.Users className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1">Personalized Service</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">We provide detailed site visits to understand your custom preferences before we even start.</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 bg-slate-50 p-3 rounded-xl shadow-sm mr-4 border border-slate-100 group-hover:border-amber-200 group-hover:bg-amber-50 transition-colors">
                      <Icons.Clock className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1">Fast & Reliable</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">From free quotations to quick online bookings, we prioritize your schedule and deadlines.</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 bg-slate-50 p-3 rounded-xl shadow-sm mr-4 border border-slate-100 group-hover:border-amber-200 group-hover:bg-amber-50 transition-colors">
                      <Icons.Package className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1">Quality Supplies</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">We supply premium cables, sockets, and luxury chandeliers (spotlights and strip lights) at competitive market prices.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <a 
                  href="#quote" 
                  onClick={scrollToQuote}
                  className="group inline-flex justify-center items-center px-8 py-4 text-lg font-bold rounded-xl text-slate-900 bg-amber-500 hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ring-4 ring-amber-500/20"
                >
                  <span className="flex items-center">
                    Get a Free Quotation
                    <Icons.ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
                
                <a 
                  href={`tel:${config.contactPhone.replace(/[^0-9+]/g, '')}`} 
                  className="group inline-flex justify-center items-center px-8 py-4 text-lg font-bold rounded-xl text-white bg-slate-900 hover:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  <Icons.Phone className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  Call Us: {config.contactPhone}
                </a>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-20 bg-slate-50 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">From simple socket repairs to complex industrial solar systems, Dynawatt handles it all with professional precision.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Residential */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group border border-slate-200 flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src="/images/service-residential.jpg" 
                      alt="Residential Wiring" 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                    />
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-amber-600 shadow-sm">
                        <Icons.Home className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Residential Wiring</h3>
                    <p className="text-slate-700 text-base leading-relaxed mb-4">Complete house wiring, socket installation, lighting upgrades, and safety inspections for your home.</p>
                    <ul className="text-base text-slate-600 space-y-2 font-medium mt-auto">
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Full House Wiring</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Fuse Box Upgrades</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Yaka Meter Help</li>
                    </ul>
                  </div>
                </div>

                {/* Solar */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group border border-slate-200 flex flex-col relative">
                  <div className="absolute top-4 left-4 bg-amber-500 text-xs font-bold px-3 py-1 text-white rounded-full z-10">POPULAR</div>
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src="/images/service-solar.jpg" 
                      alt="Solar Systems" 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                    />
                     <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-amber-600 shadow-sm">
                        <Icons.Sun className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Solar Systems</h3>
                    <p className="text-slate-700 text-base leading-relaxed mb-4">Beat the load shedding. We design and install backup solar and battery inverter systems.</p>
                    <ul className="text-base text-slate-600 space-y-2 font-medium mt-auto">
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Panel Installation</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Battery Backups</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Hybrid Inverters</li>
                    </ul>
                  </div>
                </div>

                {/* 3 Phase Systems */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group border border-slate-200 flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src="/images/service-commercial.jpg" 
                      alt="3 Phase Systems" 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                    />
                     <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-amber-600 shadow-sm">
                        <Icons.LayoutDashboard className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">3 Phase Systems</h3>
                    <p className="text-slate-700 text-base leading-relaxed mb-4">Specialized setup and troubleshooting for industrial and commercial 3-phase power systems.</p>
                    <ul className="text-base text-slate-600 space-y-2 font-medium mt-auto">
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Motor Installation</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Distribution Boards</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Load Balancing</li>
                    </ul>
                  </div>
                </div>

                {/* Generator Repair */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group border border-slate-200 flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src="/images/service-generator.jpg" 
                      alt="Generator Repair" 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                    />
                     <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-amber-600 shadow-sm">
                        <Icons.Wrench className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Generator Repair</h3>
                    <p className="text-slate-700 text-base leading-relaxed mb-4">Expert servicing for diesel and petrol generators to ensure you never go dark.</p>
                    <ul className="text-base text-slate-600 space-y-2 font-medium mt-auto">
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> ATS Installation</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Routine Servicing</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Emergency Repairs</li>
                    </ul>
                  </div>
                </div>

                {/* General Maintenance */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group border border-slate-200 flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src="/images/service-maintenance.jpg" 
                      alt="General Maintenance" 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                    />
                     <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-amber-600 shadow-sm">
                        <Icons.Lightbulb className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">General Maintenance</h3>
                    <p className="text-slate-700 text-base leading-relaxed mb-4">Quick troubleshooting for power outages, short circuits, and faulty appliances.</p>
                    <ul className="text-base text-slate-600 space-y-2 font-medium mt-auto">
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> 24/7 Emergency</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Fault Finding</li>
                    </ul>
                  </div>
                </div>

                {/* CCTV & Security */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group border border-slate-200 flex flex-col">
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src="/images/service-security.jpg" 
                      alt="CCTV & Security" 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                    />
                     <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-amber-600 shadow-sm">
                        <Icons.Video className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">CCTV & Security</h3>
                    <p className="text-slate-700 text-base leading-relaxed mb-4">Protect your property with expert installation of surveillance cameras and security alarm systems.</p>
                    <ul className="text-base text-slate-600 space-y-2 font-medium mt-auto">
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> HD Camera Setup</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Motion Alarms</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Remote Monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* View All Details Button */}
              <div className="mt-12 text-center">
                <button 
                  onClick={() => setPage(Page.SERVICES)}
                  className="inline-flex items-center px-8 py-3 border-2 border-amber-500 text-amber-600 font-bold rounded-lg hover:bg-amber-500 hover:text-white transition group"
                >
                  View All Services Details
                  <Icons.ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </section>

          {/* Recent Projects Section - Updated to 6 Local Images */}
          <section id="projects" className="py-20 bg-slate-50 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Recent Projects we have worked on</h2>
                <div className="h-1.5 w-24 bg-amber-50 mx-auto rounded-full mb-6 flex items-center justify-center">
                  <div className="h-full w-1/3 bg-amber-500 rounded-full"></div>
                </div>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  See our workmanship in action. From residential upgrades to industrial installations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group border border-slate-100">
                    <div 
                      className="relative h-64 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(project.image)}
                    >
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <Icons.Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-10 w-10 drop-shadow-lg" />
                      </div>
                      <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {project.category}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-slate-500 text-sm mb-2">
                        <Icons.MapPin className="h-4 w-4 mr-1 text-amber-500" />
                        {project.location}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-6">{project.title}</h3>
                      
                      <a 
                        href="#quote" 
                        onClick={scrollToQuote} 
                        className="mt-auto w-full block text-center bg-slate-50 hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200 hover:border-slate-900 font-bold py-3 rounded-lg transition-colors duration-300"
                      >
                        Get a Quote
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section id="about" className="py-20 bg-slate-900 text-white relative scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-12 mb-20">
                <div className="lg:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800&h=600" 
                    alt="Dynawatt Engineer inspecting equipment" 
                    className="rounded-xl shadow-2xl border-4 border-slate-700 object-cover w-full h-full min-h-[400px]"
                  />
                </div>

                <div className="lg:w-1/2 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose DYNAWATT?</h2>
                  <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                    At Dynawatt Engineering, we believe that good electrical work goes unnoticed, while bad electrical work can be a disaster. We bridge the gap between technical expertise and customer peace of mind.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-8">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                          <Icons.Award className="h-6 w-6 text-amber-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-xl font-bold mb-1">Uncompromising Quality</h4>
                        <p className="text-slate-400 text-sm">We strictly adhere to international safety standards (BS 7671). We don't take shortcuts with your safety.</p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                          <Icons.Package className="h-6 w-6 text-amber-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-xl font-bold mb-1">Material Supply & Sourcing</h4>
                        <p className="text-slate-400 text-sm">We source authentic, high-quality materials directly from trusted suppliers. We handle the logistics so you don't worry about counterfeits.</p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                          <Icons.Clock className="h-6 w-6 text-amber-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-xl font-bold mb-1">Great Work Ethic</h4>
                        <p className="text-slate-400 text-sm">Our engineers are professional, uniformed, and punctual. We treat your property with respect and clean up after every job.</p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                          <Icons.Wallet className="h-6 w-6 text-amber-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-xl font-bold mb-1">Value for Money</h4>
                        <p className="text-slate-400 text-sm">Transparent pricing in UGX with no hidden costs. We design efficient systems that perform better and last longer, saving you money.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <button 
                      onClick={() => window.location.href = `tel:${config.contactPhone.replace(/[^0-9+]/g, '')}`}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-8 rounded-lg transition"
                    >
                      Contact Us Today
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <FAQ />

          {/* Customer Reviews Section */}
          <section id="reviews" className="py-20 bg-white scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Clients Say</h2>
                <div className="h-1.5 w-24 bg-amber-50 mx-auto rounded-full mb-6 flex items-center justify-center">
                  <div className="h-full w-1/3 bg-amber-500 rounded-full"></div>
                </div>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Trusted by homeowners and business operators across Uganda. Your satisfaction is our strongest voltage.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-lg transition duration-300">
                     <div className="flex text-amber-500 mb-6 space-x-1">
                        {[1,2,3,4,5].map(i => (
                          <Icons.Star key={i} className="h-5 w-5 fill-amber-500" />
                        ))}
                     </div>
                     <p className="text-slate-700 italic mb-8 flex-grow leading-relaxed relative">
                       <span className="text-6xl text-slate-200 absolute -top-6 -left-2 font-serif select-none">"</span>
                       {review.text}
                     </p>
                     <div className="flex items-center mt-auto border-t border-slate-200 pt-6">
                       <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                         {review.initial}
                       </div>
                       <div>
                         <div className="font-bold text-slate-900">{review.name}</div>
                         <div className="text-sm text-slate-500 flex items-center">
                           <Icons.MapPin className="h-3 w-3 mr-1" />
                           {review.location}
                         </div>
                       </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Service Areas */}
          <section id="areas" className="py-16 bg-slate-50 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-8">Serving All Key Areas</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {['Kampala', 'Entebbe', 'Mukono', 'Wakiso', 'Jinja', 'Gayaza', 'Ntinda', 'Kololo'].map((area) => (
                  <span key={area} className="px-6 py-2 bg-white rounded-full text-slate-600 shadow-sm border border-slate-200">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : page === Page.SERVICES ? (
        <ServicesDetail setPage={setPage} />
      ) : null}

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            onClick={() => setSelectedImage(null)}
          >
            <Icons.X className="h-8 w-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Full View" 
            className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <img src="/logo.png" alt="DYNAWATT ENGINEERING" className="h-20 w-auto mb-6 object-contain" />
              <p className="mb-4 max-w-sm">Providing safe, reliable, and affordable electrical engineering solutions for Ugandan homes and businesses.</p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61576719381534" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition shadow-md"
                  title="Follow us on Facebook"
                >
                  <Icons.Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/dynawattengineering?igsh=MWp5Y3R1MmkxNW0xZQ==" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#bc1888] to-[#2cc4fa] text-white flex items-center justify-center hover:scale-110 transition shadow-md"
                  title="Follow us on Instagram"
                >
                  <Icons.Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://share.google/E96jop0cWTPymqOjE" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#4285F4] text-white flex items-center justify-center hover:scale-110 transition shadow-md"
                  title="View on Google Business"
                >
                  <Icons.Map className="h-5 w-5" />
                </a>
                <a 
                  href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition shadow-md"
                  title="Chat on WhatsApp"
                >
                  <Icons.MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-amber-500">Home</a></li>
                <li><a href="#services" className="hover:text-amber-500">Services</a></li>
                <li><a href="#about" className="hover:text-amber-500">Why Choose Us</a></li>
                <li><a href="#quote" className="hover:text-amber-500">Get Quote</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center"><Icons.Phone className="h-4 w-4 mr-2"/> {config.contactPhone}</li>
                <li className="flex items-center"><Icons.MapPin className="h-4 w-4 mr-2"/> Kampala, Uganda</li>
                <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2"/> Mon - Sat: 8am - 6pm</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p 
              onDoubleClick={() => setPage(Page.ADMIN)} 
              className="cursor-default select-none hover:text-slate-300 transition"
              title="Double click for Admin Access"
            >
              &copy; {new Date().getFullYear()} DYNAWATT ENGINEERING. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp Button */}
      <a 
        href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition transform hover:scale-110 z-50 flex items-center justify-center group"
      >
        <Icons.MessageCircle className="h-8 w-8" />
        <span className="absolute right-full mr-4 bg-white text-slate-800 px-3 py-1 rounded shadow-lg font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
          Chat with us!
        </span>
      </a>
    </div>
  );
}

export default App;