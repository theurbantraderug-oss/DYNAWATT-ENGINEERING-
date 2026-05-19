import React from 'react';
import { Icons } from './Icons';
import LeadForm from './LeadForm';

interface ContactProps {
  addLead: (lead: any) => void;
}

const Contact: React.FC<ContactProps> = ({ addLead }) => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact DYNAWATT ENGINEERING</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Need expert electrical or solar services in Kampala or anywhere in Uganda? Get in touch with us today.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Get in Touch</h2>
              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icons.Phone className="h-6 w-6" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-slate-900">Phone</h3>
                    <p className="text-slate-600">+256 751 473 830</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icons.Mail className="h-6 w-6" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-slate-900">Email</h3>
                    <p className="text-slate-600">info@dynawattengineering.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icons.MapPin className="h-6 w-6" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-slate-900">Location</h3>
                    <p className="text-slate-600">Kampala, Uganda</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Business Hours</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex justify-between"><span>Monday - Friday</span> <span>8:00 AM - 6:00 PM</span></li>
                  <li className="flex justify-between"><span>Saturday</span> <span>9:00 AM - 4:00 PM</span></li>
                  <li className="flex justify-between"><span>Sunday</span> <span className="text-amber-600 font-bold">Emergency Only</span></li>
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Request a Free Quote</h2>
                <LeadForm addLead={addLead} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
