import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LeadForm from './components/LeadForm';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { Icons } from './components/Icons';
import { Lead, Page, SiteConfig } from './types';

function App() {
  const [page, setPage] = useState<Page>(Page.HOME);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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
              <a href="#quote" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-slate-900 bg-amber-500 hover:bg-amber-600 transition shadow-lg hover:shadow-xl">
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

      {/* Services Section */}
      <section id="services" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">From simple socket repairs to complex industrial solar systems, Dynawatt handles it all with professional precision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-slate-100 rounded-2xl hover:shadow-xl transition duration-300 group">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-all duration-300 transform group-hover:scale-110 group-hover:-rotate-3">
                <Icons.Home className="h-8 w-8 text-amber-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Residential Wiring</h3>
              <p className="text-slate-600 mb-4">Complete house wiring, socket installation, lighting upgrades, and safety inspections for your home.</p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Full House Wiring</li>
                <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Fuse Box Upgrades</li>
                <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Yaka Meter Help</li>
              </ul>
            </div>

            <div className="p-8 border border-slate-100 rounded-2xl hover:shadow-xl transition duration-300 group relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-amber-500 text-xs font-bold px-3 py-1 text-white rounded-bl-lg">POPULAR</div>
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-all duration-300 transform group-hover:scale-110">
                <Icons.Sun className="h-8 w-8 text-amber-600 group-hover:text-white transition-transform duration-700 group-hover:rotate-180" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Solar Systems</h3>
              <p className="text-slate-600 mb-4">Beat the load shedding. We design and install backup solar and battery inverter systems.</p>
               <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Panel Installation</li>
                <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Battery Backups</li>
                <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Hybrid Inverters</li>
              </ul>
            </div>

            <div className="p-8 border border-slate-100 rounded-2xl hover:shadow-xl transition duration-300 group">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-all duration-300 transform group-hover:scale-110">
                <Icons.Wrench className="h-8 w-8 text-amber-600 group-hover:text-white transition-transform duration-300 group-hover:-rotate-45" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Maintenance & Repair</h3>
              <p className="text-slate-600 mb-4">Quick troubleshooting for power outages, short circuits, and faulty appliances.</p>
               <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> 24/7 Emergency</li>
                <li className="flex items-center"><Icons.CheckCircle className="h-4 w-4 mr-2 text-green-500"/> Fault Finding</li>
              </ul>
            </div>
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

          <div className="flex justify-center w-full">
            <div className="w-full max-w-[1200px]">
              <div className="elfsight-app-7e4c85dc-7660-466c-b814-99bc11169cd3" data-elfsight-app-lazy></div>
            </div>
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

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center text-white text-2xl font-bold mb-4">
                 <Icons.Zap className="h-6 w-6 text-amber-500 mr-2" />
                 DYNAWATT ENGINEERING
              </div>
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