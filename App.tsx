
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LeadForm from './components/LeadForm';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import FAQ from './components/FAQ';
import ServicesDetail from './components/ServicesDetail';
import SafetyChecklist from './components/SafetyChecklist';
import TrustpilotReviews from './components/TrustpilotReviews';
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
    heroHeadline: 'Dynawatt Engineering: Premier Electrical & Lighting Solutions in Uganda'
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
      title: "Residential Lighting Exterior",
      category: "Lighting",
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
      name: "Ronald Tenywa",
      location: "Nkumba",
      text: "Excellent work installing lightning arrestors at my property. Very professional and safety-conscious team. Highly recommended.",
      initial: "R"
    },
    {
      name: "Centenary Bank Masaka Branch",
      location: "Masaka City",
      text: "Highly reliable electrical maintenance for our banking facility. Their team handled our 3-phase power balancing and backup generator servicing with extreme professionalism.",
      initial: "C"
    },
    {
      name: "Aisha N.",
      location: "Kawuku, Entebbe Road",
      text: "Dynawatt handled the complete wiring for my rentals. They finished on time and the workmanship is very neat.",
      initial: "A"
    },
    {
      name: "Hajji Hassan",
      location: "Kitukutwe, Kira Municipality",
      text: "The profile lighting installed at my home is beautiful. They really know how to bring out the elegance of a house.",
      initial: "H"
    },
    {
      name: "Alex",
      location: "Salaama Road",
      text: "I hired them for house wiring and lighting installation. Very reliable, affordable, and transparent with costs.",
      initial: "A"
    },
    {
      name: "Silverline Ssingo Country Hotel",
      location: "Kiboga",
      text: "Professional light installation for our hotel. The team was efficient and the lighting looks perfect.",
      initial: "S"
    },
    {
      name: "Sarah K.",
      location: "Ntinda, Kampala",
      text: "Dynawatt rewired my entire house after we had issues with constantly tripping power. Professional, clean, and very knowledgeable.",
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

  const serviceAreas = [
    {
      region: "Kampala Central",
      areas: ["Nakasero", "Kololo", "Old Kampala", "Industrial Area"]
    },
    {
      region: "Eastern Kampala & Mukono",
      areas: ["Bugolobi", "Mbuya", "Luzira", "Mutungo", "Seeta", "Mukono Town"]
    },
    {
      region: "Northern Suburbs",
      areas: ["Ntinda", "Bukoto", "Kyanja", "Najjera", "Kira", "Namugongo", "Gayaza"]
    },
    {
      region: "Southern & Entebbe Road",
      areas: ["Muyenga", "Makindye", "Munyonyo", "Kansanga", "Lweza", "Kajjansi", "Entebbe"]
    },
    {
      region: "Western Routes",
      areas: ["Nansana", "Kyengera", "Bulenga", "Buloba"]
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
          <header id="home" className="relative bg-slate-900 text-white pt-24 pb-16 md:pt-20 md:pb-32 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/id/1019/1920/1080')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-amber-500/50 bg-amber-500/10 text-amber-500 text-sm font-medium mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                  DYNAWATT - Licensed & Insured
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                  {config.heroHeadline}
                </h1>
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg">
                  Your premier electrical engineering partner in Uganda. Residential wiring, commercial power systems, and solar energy solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#quote" onClick={scrollToQuote} className="inline-flex justify-center items-center px-6 py-3 md:px-8 md:py-4 border border-transparent text-base md:text-lg font-bold rounded-lg text-slate-900 bg-amber-500 hover:bg-amber-600 transition shadow-lg hover:shadow-xl">
                    Get a Quote
                  </a>
                  <a 
                    href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex justify-center items-center px-6 py-3 md:px-8 md:py-4 border border-green-500 text-base md:text-lg font-bold rounded-lg text-white bg-green-600 hover:bg-green-700 transition"
                  >
                    <Icons.MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp
                  </a>
                </div>
              </div>
              
              <div className="md:w-1/2 md:pl-10 relative z-10 w-full">
                <LeadForm addLead={addLead} />
              </div>
            </div>
          </header>

          {/* New SEO Content Section: Authority & Expertise Boost */}
          <section className="py-12 md:py-24 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 relative overflow-hidden">
            {/* Subtle background decorative elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-slate-200/50 rounded-full blur-2xl pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-4 relative z-10">
              <div className="text-center mb-12 md:mb-16">
                <div className="inline-flex items-center gap-2 p-2 px-4 bg-amber-50 border border-amber-200 rounded-full text-amber-800 font-bold text-sm mb-6 shadow-sm">
                  <Icons.Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>The Standard of Engineering in Uganda</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
                  Reliable Electrical Engineering & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Modern Lighting Solutions</span>
                </h2>
              </div>

              <div className="prose prose-lg max-w-none text-slate-600 space-y-6 md:space-y-8">
                <p className="text-lg md:text-xl leading-relaxed">
                  At <strong>Dynawatt Engineering</strong>, we provide certified electrical solutions for residential and commercial clients across <strong>Kampala</strong> and the greater central region. 
                  From complex industrial 3-phase wiring to high-end architectural lighting, our team ensures every project meets international safety standards while maintaining modern aesthetics.
                </p>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 py-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center">
                      <Icons.LayoutDashboard className="h-5 w-5 mr-2 text-amber-500" />
                      Industrial & Commercial Depth
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed">
                      Our engineering expertise extends to large-scale industrial fit-outs. We specialize in 3-phase power distribution, motor control systems, and factory-grade lighting that reduces energy overheads. Businesses in <strong>Mukono</strong> and <strong>Namanve</strong> trust us for reliable maintenance that eliminates costly downtime.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center">
                      <Icons.Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                      Luxury Architectural Lighting
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed">
                      We are the pioneers of elegant home illumination. Whether you need a <strong>floating chandelier installation in Munyonyo</strong> or sophisticated <strong>aluminum profile lighting</strong> for a penthouse in <strong>Kololo</strong>, our technicians possess the precision and architectural eye required for premium finishes.
                    </p>
                  </div>
                </div>

                <p className="text-lg md:text-xl leading-relaxed">
                  Building a new home in <strong>Kira</strong> or <strong>Najjera</strong>? Our comprehensive house wiring services include a full 3-month repair guarantee. We don't just pull cables; we design systems. This includes conducting energy-saving <strong>Yaka audits</strong> to troubleshoot high consumption and installing high-performance lightning arrestors to protect your valuable electronics.
                </p>

                <p className="text-base md:text-lg leading-relaxed bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm italic">
                  "At Dynawatt, we bridge the gap between technical complexity and customer peace of mind. We power your property with the same care we would our own homes, ensuring every joint, breaker, and fixture is a testament to Ugandan engineering excellence."
                </p>
              </div>

              {/* The Dynawatt Difference - Compacted Grid */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "3-Month Repair Guarantee", desc: "On all full-house wiring projects.", icon: <Icons.Shield /> },
                  { title: "Personalized Site Visits", desc: "Custom consulting before we start.", icon: <Icons.Users /> },
                  { title: "24/7 Rapid Response", desc: "Emergency help when you need it.", icon: <Icons.Clock /> },
                  { title: "Premium Material Supply", desc: "Only certified cables and fixtures.", icon: <Icons.Package /> }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:border-amber-200 transition-all group">
                    <div className="text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                      {React.cloneElement(item.icon as React.ReactElement, { className: "h-8 w-8" })}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16 flex flex-col sm:flex-row justify-center gap-4 md:gap-5">
                <a 
                  href="#quote" 
                  onClick={scrollToQuote}
                  className="group inline-flex justify-center items-center px-6 py-4 md:px-10 text-base md:text-lg font-bold rounded-xl text-slate-900 bg-amber-500 hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ring-4 ring-amber-500/20"
                >
                  Get a Free Quotation
                  <Icons.ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                
                <a 
                  href={`tel:${config.contactPhone.replace(/[^0-9+]/g, '')}`} 
                  className="group inline-flex justify-center items-center px-6 py-4 md:px-10 text-base md:text-lg font-bold rounded-xl text-white bg-slate-900 hover:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  <Icons.Phone className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  {config.contactPhone}
                </a>
              </div>
            </div>
          </section>

          {/* Trustpilot Reviews Section */}
          <TrustpilotReviews />

          {/* Services Section */}
          <section id="services" className="py-12 md:py-20 bg-slate-50 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
                <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">From simple socket repairs to complex industrial solar systems, Dynawatt handles it all with professional precision.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Residential */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group border border-slate-200 flex flex-col">
                  <div className="h-48 md:h-56 overflow-hidden relative">
                    <img 
                      src="/images/service-residential.jpg" 
                      alt="Residential Wiring" 
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                    />
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-amber-600 shadow-sm">
                        <Icons.Home className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-5 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">Residential Wiring</h3>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">Complete house wiring, socket installation, lighting upgrades, and safety inspections for your home.</p>
                    <ul className="text-sm md:text-base text-slate-600 space-y-2 font-medium mt-auto">
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Full House Wiring</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Fuse Box Upgrades</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Yaka (UEDCL) Meter Help</li>
                    </ul>
                  </div>
                </div>

                {/* Solar */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group border border-slate-200 flex flex-col relative">
                  <div className="absolute top-4 left-4 bg-amber-500 text-xs font-bold px-3 py-1 text-white rounded-full z-10">POPULAR</div>
                  <div className="h-48 md:h-56 overflow-hidden relative">
                    <img 
                      src="/images/service-solar.jpg" 
                      alt="Solar Systems" 
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                    />
                     <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-amber-600 shadow-sm">
                        <Icons.Sun className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-5 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">Solar Systems</h3>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">Beat the load shedding. We design and install backup solar and battery inverter systems.</p>
                    <ul className="text-sm md:text-base text-slate-600 space-y-2 font-medium mt-auto">
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Panel Installation</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Battery Backups</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Hybrid Inverters</li>
                    </ul>
                  </div>
                </div>

                {/* 3 Phase Systems */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group border border-slate-200 flex flex-col">
                  <div className="h-48 md:h-56 overflow-hidden relative">
                    <img 
                      src="/images/service-commercial.jpg" 
                      alt="3 Phase Systems" 
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                    />
                     <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-amber-600 shadow-sm">
                        <Icons.LayoutDashboard className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-5 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">3 Phase Systems</h3>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">Specialized setup and troubleshooting for industrial and commercial 3-phase power systems.</p>
                    <ul className="text-sm md:text-base text-slate-600 space-y-2 font-medium mt-auto">
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Motor Installation</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Distribution Boards</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Load Balancing</li>
                    </ul>
                  </div>
                </div>

                {/* Generator Repair */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group border border-slate-200 flex flex-col">
                  <div className="h-48 md:h-56 overflow-hidden relative">
                    <img 
                      src="/images/service-generator.jpg" 
                      alt="Generator Repair" 
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                    />
                     <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-amber-600 shadow-sm">
                        <Icons.Wrench className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-5 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">Generator Repair</h3>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">Expert servicing for diesel and petrol generators to ensure you never go dark.</p>
                    <ul className="text-sm md:text-base text-slate-600 space-y-2 font-medium mt-auto">
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> ATS Installation</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Routine Servicing</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Emergency Repairs</li>
                    </ul>
                  </div>
                </div>

                {/* General Maintenance */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group border border-slate-200 flex flex-col">
                  <div className="h-48 md:h-56 overflow-hidden relative">
                    <img 
                      src="/images/service-maintenance.jpg" 
                      alt="General Maintenance" 
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                    />
                     <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-amber-600 shadow-sm">
                        <Icons.Lightbulb className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-5 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">General Maintenance</h3>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">Quick troubleshooting for power outages, short circuits, and faulty appliances.</p>
                    <ul className="text-sm md:text-base text-slate-600 space-y-2 font-medium mt-auto">
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> 24/7 Emergency</li>
                      <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Fault Finding</li>
                    </ul>
                  </div>
                </div>

                {/* CCTV & Security */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group border border-slate-200 flex flex-col">
                  <div className="h-48 md:h-56 overflow-hidden relative">
                    <img 
                      src="/images/service-security.jpg" 
                      alt="CCTV & Security" 
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                    />
                     <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-amber-600 shadow-sm">
                        <Icons.Video className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-5 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">CCTV & Security</h3>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">Protect your property with expert installation of surveillance cameras and security alarm systems.</p>
                    <ul className="text-sm md:text-base text-slate-600 space-y-2 font-medium mt-auto">
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
                  className="inline-flex items-center px-6 py-3 border-2 border-amber-500 text-amber-600 font-bold rounded-lg hover:bg-amber-500 hover:text-white transition group text-sm md:text-base"
                >
                  View All Services Details
                  <Icons.ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </section>

          {/* Recent Projects Section - Updated to 6 Local Images */}
          <section id="projects" className="py-12 md:py-20 bg-slate-50 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Recent Projects we have worked on</h2>
                <div className="h-1.5 w-24 bg-amber-50 mx-auto rounded-full mb-6 flex items-center justify-center">
                  <div className="h-full w-1/3 bg-amber-500 rounded-full"></div>
                </div>
                <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                  See our workmanship in action. From residential upgrades to industrial installations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group border border-slate-100">
                    <div 
                      className="relative h-56 md:h-64 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(project.image)}
                    >
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <Icons.Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-10 w-10 drop-shadow-lg" />
                      </div>
                      <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {project.category}
                      </div>
                    </div>
                    <div className="p-5 md:p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-slate-500 text-sm mb-2">
                        <Icons.MapPin className="h-4 w-4 mr-1 text-amber-500" />
                        {project.location}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6">{project.title}</h3>
                      
                      <a 
                        href="#quote" 
                        onClick={scrollToQuote} 
                        className="mt-auto w-full block text-center bg-slate-50 hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200 hover:border-slate-900 font-bold py-3 rounded-lg transition-colors duration-300 text-sm md:text-base"
                      >
                        Get a Quote
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Instagram Video Section */}
          <section className="py-12 md:py-20 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10 md:mb-16">
                <div className="inline-flex items-center gap-2 p-2 px-4 bg-gradient-to-tr from-[#f09433] to-[#bc1888] rounded-full text-white font-bold text-xs md:text-sm mb-4 shadow-md">
                  <Icons.Instagram className="h-4 w-4" />
                  <span>Follow Our Work</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Latest from Instagram</h2>
                <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                  Watch our engineering team in action. Real projects, real people, real electrical excellence.
                </p>
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 bg-slate-50 min-h-[400px]">
                <div className="elfsight-app-bb660239-ca4f-476f-8174-6add768448fd" data-elfsight-app-lazy></div>
              </div>
              
              <div className="mt-10 text-center">
                <a 
                  href="https://www.instagram.com/dynawattengineering?igsh=MWp5Y3R1MmkxNW0xZQ==" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center text-amber-600 font-bold hover:text-amber-700 transition"
                >
                  View all reels on Instagram
                  <Icons.ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section id="about" className="py-12 md:py-20 bg-slate-900 text-white relative scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-8 md:gap-12 mb-12 md:mb-20">
                <div className="lg:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800&h=600" 
                    alt="Dynawatt Engineer inspecting equipment" 
                    className="rounded-xl shadow-2xl border-4 border-slate-700 object-cover w-full h-full min-h-[300px] md:min-h-[400px]"
                  />
                </div>

                <div className="lg:w-1/2 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose DYNAWATT?</h2>
                  <p className="text-slate-300 mb-8 text-base md:text-lg leading-relaxed">
                    At Dynawatt Engineering, we believe that good electrical work goes unnoticed, while bad electrical work can be a disaster. We bridge the gap between technical expertise and customer peace of mind.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-6 md:gap-8">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                          <Icons.Award className="h-5 w-5 md:h-6 md:w-6 text-amber-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg md:text-xl font-bold mb-1">Uncompromising Quality</h4>
                        <p className="text-slate-400 text-sm">We strictly adhere to international safety standards (BS 7671). We don't take shortcuts with your safety.</p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                          <Icons.Package className="h-5 w-5 md:h-6 md:w-6 text-amber-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg md:text-xl font-bold mb-1">Material Supply & Sourcing</h4>
                        <p className="text-slate-400 text-sm">We source authentic, high-quality materials directly from trusted suppliers. We handle the logistics so you don't worry about counterfeits.</p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                          <Icons.Clock className="h-5 w-5 md:h-6 md:w-6 text-amber-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg md:text-xl font-bold mb-1">Great Work Ethic</h4>
                        <p className="text-slate-400 text-sm">Our engineers are professional, uniformed, and punctual. We treat your property with respect and clean up after every job.</p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                          <Icons.Wallet className="h-5 w-5 md:h-6 w-6 text-amber-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg md:text-xl font-bold mb-1">Value for Money</h4>
                        <p className="text-slate-400 text-sm">Transparent pricing in UGX with no hidden costs. We design efficient systems that perform better and last longer, saving you money.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <button 
                      onClick={() => window.location.href = `tel:${config.contactPhone.replace(/[^0-9+]/g, '')}`}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-8 rounded-lg transition w-full md:w-auto"
                    >
                      Contact Us Today
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* New Safety Checklist Section */}
          <SafetyChecklist />

          {/* FAQ Section */}
          <FAQ />

          {/* Customer Reviews Section */}
          <section id="reviews" className="py-12 md:py-20 bg-white scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10 md:mb-16">
                <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                  Trusted by homeowners and business operators across Uganda. Your satisfaction is our strongest voltage.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-slate-50 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-lg transition duration-300">
                     <div className="flex text-amber-500 mb-6 space-x-1">
                        {[1,2,3,4,5].map(i => (
                          <Icons.Star key={i} className="h-5 w-5 fill-amber-500" />
                        ))}
                     </div>
                     <p className="text-slate-700 italic mb-8 flex-grow leading-relaxed relative text-sm md:text-base">
                       <span className="text-4xl md:text-6xl text-slate-200 absolute -top-4 -left-2 md:-top-6 font-serif select-none">"</span>
                       {review.text}
                     </p>
                     <div className="flex items-center mt-auto border-t border-slate-200 pt-6">
                       <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl mr-4">
                         {review.initial}
                       </div>
                       <div>
                         <div className="font-bold text-slate-900 text-sm md:text-base">{review.name}</div>
                         <div className="text-xs md:text-sm text-slate-500 flex items-center">
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

          {/* Service Areas - Updated Content */}
          <section id="areas" className="py-12 md:py-20 bg-slate-50 scroll-mt-24 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 flex items-center justify-center gap-3">
                <span className="text-amber-500">📍</span> Proudly Serving the Greater Kampala Region
              </h2>
              <div className="max-w-4xl mx-auto mb-10 md:mb-12 space-y-4">
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                  At <strong>Dynawatt Engineering</strong>, we bring professional electrical solutions directly to your doorstep. We are fully equipped and mobile, providing world-class engineering, architectural lighting, and solar installations across <strong>Kampala, Wakiso, and Mukono.</strong>
                </p>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                  Whether you are renovating a residence in <strong>Kololo</strong>, setting up a new office in <strong>Bugolobi</strong>, or requiring solar backup in <strong>Kira</strong>, our team is just a phone call away.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {serviceAreas.map((zone, idx) => (
                  <div key={idx} className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-slate-100 hover:border-amber-300 transition-colors group">
                    <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center pb-3 border-b border-slate-100 group-hover:text-amber-600 transition-colors">
                      <Icons.MapPin className="h-5 w-5 text-amber-500 mr-2" />
                      {zone.region}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {zone.areas.map((area) => (
                        <span key={area} className="px-3 py-1 bg-slate-50 text-slate-600 text-sm rounded-md border border-slate-100 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200 transition cursor-default">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 bg-slate-900 text-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-xl">
                <div className="text-left mb-6 md:mb-0">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Don't see your specific location?</h3>
                  <p className="text-slate-300 text-sm md:text-base max-w-2xl">
                    Give us a call at <strong>+256 751 473 830</strong>. We frequently take on specialized projects further afield, including <strong>Kiboga</strong> and <strong>Mpigi</strong>, to ensure every Ugandan home and business has access to safe, reliable power.
                  </p>
                </div>
                <a 
                  href={`tel:${config.contactPhone.replace(/[^0-9+]/g, '')}`}
                  className="whitespace-nowrap bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-8 rounded-lg transition shadow-lg w-full md:w-auto text-center"
                >
                  Check Availability
                </a>
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
      <footer className="bg-slate-950 text-slate-400 py-8 md:py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <img src="/logo.png" alt="DYNAWATT ENGINEERING" className="h-16 md:h-20 w-auto mb-6 object-contain" />
              <p className="mb-4 max-w-sm text-sm md:text-base">Providing safe, reliable, and affordable electrical engineering solutions for Ugandan homes and businesses.</p>
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
              <ul className="space-y-2 text-sm md:text-base">
                <li><a href="#home" className="hover:text-amber-500">Home</a></li>
                <li><a href="#services" className="hover:text-amber-500">Services</a></li>
                <li><a href="#about" className="hover:text-amber-500">Why Choose Us</a></li>
                <li><a href="#quote" className="hover:text-amber-500">Get Quote</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="flex items-center"><Icons.Phone className="h-4 w-4 mr-2"/> {config.contactPhone}</li>
                <li className="flex items-center"><Icons.MapPin className="h-4 w-4 mr-2"/> Kampala, Uganda</li>
                <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2"/> Mon - Sat: 8am - 6pm</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 md:mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm">
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
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3 md:p-4 rounded-full shadow-2xl hover:bg-green-600 transition transform hover:scale-110 z-50 flex items-center justify-center group"
      >
        <Icons.MessageCircle className="h-6 w-6 md:h-8 md:w-8" />
        <span className="absolute right-full mr-4 bg-white text-slate-800 px-3 py-1 rounded shadow-lg font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none hidden md:block">
          Chat with us!
        </span>
      </a>
    </div>
  );
}

export default App;
