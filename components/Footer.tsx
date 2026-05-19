import React from 'react';
import { Icons } from './Icons';
import { Page } from '../types';

interface FooterProps {
  setPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white leading-none tracking-tight">DYNAWATT</span>
              <span className="text-[10px] text-amber-500 tracking-[0.2em] font-semibold">ENGINEERING</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Electrical & Solar Installation Company in Kampala, Uganda. Serving Kampala, Entebbe, Wakiso, and surrounding areas.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61576719381534" target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <Icons.Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/dynawattengineering" target="_blank" rel="noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <Icons.Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-amber-500/30 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><button onClick={() => setPage(Page.HOME)} className="hover:text-amber-500 transition-colors">Home</button></li>
              <li><button onClick={() => setPage(Page.ABOUT)} className="hover:text-amber-500 transition-colors">About Us</button></li>
              <li><button onClick={() => setPage(Page.SERVICES)} className="hover:text-amber-500 transition-colors">Our Services</button></li>
              <li><button onClick={() => setPage(Page.SOLAR)} className="hover:text-amber-500 transition-colors">Solar Solutions</button></li>
              <li><button onClick={() => setPage(Page.BLOG)} className="hover:text-amber-500 transition-colors">Blog & News</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-amber-500/30 pb-2 inline-block">Our Services</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>Electrical Installation</li>
              <li>Solar Power Systems</li>
              <li>Maintenance & Repairs</li>
              <li>Smart Home Solutions</li>
              <li>CCTV & Security</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-amber-500/30 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start">
                <Icons.MapPin className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                <span>Kampala, Uganda<br />Serving Central Region</span>
              </li>
              <li className="flex items-center">
                <Icons.Phone className="h-5 w-5 text-amber-500 mr-3" />
                <span>+256 751 473 830</span>
              </li>
              <li className="flex items-center">
                <Icons.Mail className="h-5 w-5 text-amber-500 mr-3" />
                <span>info@dynawattengineering.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} DYNAWATT ENGINEERING. All Rights Reserved.</p>
          <p className="mt-2">Electrical & Solar Installation Company in Kampala, Uganda</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
