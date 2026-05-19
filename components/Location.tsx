import React from 'react';
import { Icons } from './Icons';

const Location: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Electrician in Kampala, Uganda</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            DYNAWATT ENGINEERING is a trusted electrician in Kampala, providing professional electrical and solar services for residential and commercial clients.
          </p>
        </div>
      </section>

      {/* Why Choose Us in Kampala */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Why Choose Us in Kampala?</h2>
              <div className="space-y-8">
                {[
                  { title: "Fast Local Response", desc: "Being based in Kampala allows us to respond quickly to your electrical emergencies and project needs.", icon: <Icons.Zap /> },
                  { title: "Experienced Technicians", desc: "Our team has extensive experience working on Kampala's diverse range of properties, from historic buildings to modern high-rises.", icon: <Icons.Award /> },
                  { title: "Reliable and Affordable", desc: "We provide transparent pricing and high-quality workmanship that fits your budget.", icon: <Icons.BadgeCheck /> }
                ].map((item, i) => (
                  <div key={i} className="flex">
                    <div className="flex-shrink-0 w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                      {React.cloneElement(item.icon as React.ReactElement, { className: "h-6 w-6" })}
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-100 rounded-2xl p-4 h-[400px] flex items-center justify-center overflow-hidden shadow-inner">
               {/* Placeholder for Map */}
               <div className="text-center">
                 <Icons.MapPin className="h-16 w-16 text-amber-500 mx-auto mb-4" />
                 <p className="text-slate-500 font-medium">Serving Kampala, Entebbe, Wakiso & Beyond</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Areas We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Kampala Central", "Nakasero", "Kololo", "Bugolobi",
              "Muyenga", "Makindye", "Munyonyo", "Ntinda",
              "Bukoto", "Luzira", "Kira", "Najjera",
              "Namugongo", "Entebbe", "Kajjansi", "Mukono"
            ].map((area, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 flex items-center shadow-sm">
                <Icons.CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-slate-700 font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Location;
