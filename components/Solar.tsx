import React from 'react';
import { Icons } from './Icons';
import { motion } from 'motion/react';

const Solar: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-amber-500 text-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/id/1022/1920/1080')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            Solar Installation Company in Uganda
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-medium max-w-3xl mx-auto"
          >
            Professional solar installation services designed to deliver long-term energy savings and dependable power.
          </motion.p>
        </div>
      </section>

      {/* Why Choose Solar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Solar Energy?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Switching to solar is one of the best investments you can make for your home or business in Uganda.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Lower Bills", desc: "Significantly reduce or eliminate your monthly electricity costs.", icon: <Icons.TrendingDown /> },
              { title: "Backup Power", desc: "Stay powered during load shedding and grid outages.", icon: <Icons.Battery /> },
              { title: "Eco-Friendly", desc: "Reduce your carbon footprint with clean, renewable energy.", icon: <Icons.Leaf /> },
              { title: "Low Maintenance", desc: "Solar systems require minimal upkeep once installed.", icon: <Icons.Hammer /> }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                <div className="text-amber-500 mb-6 flex justify-center">
                  {React.cloneElement(item.icon as React.ReactElement, { className: "h-12 w-12" })}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Our Solar Installation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Site Assessment", desc: "We evaluate your property's solar potential and energy needs." },
              { step: "02", title: "System Design", desc: "We create a custom solar solution tailored to your requirements." },
              { step: "03", title: "Installation", desc: "Our expert team performs a professional and safe installation." },
              { step: "04", title: "Testing & Support", desc: "We test the system and provide ongoing technical support." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-black text-slate-800 absolute -top-10 -left-4 z-0">{item.step}</div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-4 text-amber-500">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Ready to Switch to Solar?</h2>
          <p className="text-xl text-slate-800 mb-10 max-w-2xl mx-auto">Contact DYNAWATT ENGINEERING today for expert solar solutions in Kampala and across Uganda.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+256751473830" className="bg-slate-900 text-white font-bold py-4 px-10 rounded-xl hover:bg-slate-800 transition shadow-xl">
              Call Now: +256 751 473 830
            </a>
            <a href="#quote" className="bg-white text-slate-900 font-bold py-4 px-10 rounded-xl hover:bg-slate-50 transition shadow-xl">
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solar;
