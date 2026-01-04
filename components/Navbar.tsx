import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { Page } from '../types';

interface NavbarProps {
  setPage: (page: Page) => void;
  contactPhone: string;
}

const Navbar: React.FC<NavbarProps> = ({ setPage, contactPhone }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [logoError, setLogoError] = useState(false);
  const whatsappMessage = encodeURIComponent("Hello, Im interested in working with DYNAWATT ENGINEERING. Is anyone available to chat");

  const navbarHeight = 80; // Height of the fixed navbar

  // Handle scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'areas'];
      // Offset to trigger active state slightly before the section hits the top
      const scrollPosition = window.scrollY + navbarHeight + 50; // Increased offset for better feel

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navbarHeight]); // Depend on navbarHeight

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Switch to Home page first
    setPage(Page.HOME);

    // Use timeout to allow Home page to render if we were on another page
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } else if (id === 'home') { 
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const NavLink = ({ id, label, isMobile = false }: { id: string, label: string, isMobile?: boolean }) => {
    const isActive = activeSection === id;
    
    if (isMobile) {
      return (
        <a 
          href={`#${id}`}
          onClick={(e) => scrollToSection(e, id)}
          className={`block py-3 px-4 rounded-lg transition-all duration-300 border-l-4 ${
            isActive 
              ? 'bg-amber-100 text-amber-800 border-amber-500 font-semibold' 
              : 'border-transparent text-gray-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          {label}
        </a>
      );
    }

    return (
      <a 
        href={`#${id}`}
        onClick={(e) => scrollToSection(e, id)}
        className={`relative px-3 py-2 transition-colors duration-300 ${
          isActive ? 'text-amber-500 font-medium' : 'text-gray-100 hover:text-amber-500'
        }`}
      >
        {label}
        {isActive && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full transition-all duration-300"></span>
        )}
      </a>
    );
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg border-b border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group"
            onClick={(e) => scrollToSection(e, 'home')}
          >
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="DYNAWATT ENGINEERING" 
                className="h-16 w-auto object-contain group-hover:scale-105 transition-transform" 
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-bold text-white leading-none tracking-tight">DYNAWATT</span>
                <span className="text-[10px] text-amber-500 tracking-[0.2em] font-semibold">ENGINEERING</span>
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2 items-center">
            <NavLink id="home" label="Home" />
            <NavLink id="services" label="Services" />
            <NavLink id="about" label="Why Choose Us" />
            <NavLink id="areas" label="Areas" />
            
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-slate-700">
              <a 
                href={`https://wa.me/${contactPhone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-green-500 transition p-2 hover:scale-110"
                title="Chat on WhatsApp"
              >
                <Icons.MessageCircle className="h-6 w-6" />
              </a>
              <a 
                href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-6 rounded-full transition transform hover:scale-105 flex items-center shadow-lg hover:shadow-amber-500/20"
              >
                <Icons.Phone className="h-4 w-4 mr-2" />
                {contactPhone}
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-300 hover:text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <Icons.X className="h-8 w-8" /> : <Icons.Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-6 space-y-2">
          <NavLink id="home" label="Home" isMobile />
          <NavLink id="services" label="Services" isMobile />
          <NavLink id="about" label="Why Choose Us" isMobile />
          <NavLink id="areas" label="Service Areas" isMobile />
          
          <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-slate-800">
            <a 
              href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 rounded-lg flex justify-center items-center transition shadow-lg active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              <Icons.Phone className="h-5 w-5 mr-2" />
              Call Now
            </a>
            <a 
               href={`https://wa.me/${contactPhone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
               target="_blank"
               rel="noreferrer"
               onClick={() => setIsOpen(false)}
               className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex justify-center items-center transition shadow-lg active:scale-95"
            >
              <Icons.MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;