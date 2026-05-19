import React from 'react';
import { Icons } from './Icons';
import { motion } from 'motion/react';

const About: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/id/1018/1920/1080')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            About DYNAWATT ENGINEERING
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto"
          >
            A trusted electrical and solar installation company in Kampala, Uganda, delivering safe, efficient, and affordable solutions.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                DYNAWATT ENGINEERING is a growing electrical and solar installation company based in Kampala, Uganda. We are committed to delivering safe, reliable, and energy-efficient solutions tailored to the needs of modern homes and businesses.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We combine technical expertise, quality materials, and customer-focused service to deliver solutions that last. Our team of licensed professionals is dedicated to powering Uganda's future through sustainable and safe engineering practices.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                    <Icons.Target className="h-5 w-5 text-amber-500 mr-2" />
                    Our Mission
                  </h3>
                  <p className="text-slate-600 text-sm">
                    To provide high-quality electrical and solar services that improve safety, efficiency, and everyday living.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                    <Icons.Eye className="h-5 w-5 text-amber-500 mr-2" />
                    Our Vision
                  </h3>
                  <p className="text-slate-600 text-sm">
                    To become one of the most trusted electrical and solar engineering companies in Uganda.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800&h=1000" 
                alt="Engineering Team" 
                className="rounded-2xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-amber-500 rounded-2xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Technical Expertise",
                desc: "Our team consists of highly trained and licensed electricians and solar specialists.",
                icon: <Icons.Wrench />
              },
              {
                title: "Quality Materials",
                desc: "We only use certified, high-quality materials to ensure the longevity and safety of our installations.",
                icon: <Icons.ShieldCheck />
              },
              {
                title: "Customer Focused",
                desc: "We listen to our clients' needs and provide tailored solutions that fit their budget and requirements.",
                icon: <Icons.Users />
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  {React.cloneElement(item.icon as React.ReactElement, { className: "h-8 w-8" })}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
