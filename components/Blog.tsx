import React from 'react';
import { Icons } from './Icons';

const Blog: React.FC = () => {
  const posts = [
    {
      title: "Cost of Solar Installation in Uganda (2026 Guide)",
      excerpt: "The cost of solar installation in Uganda depends on system size, battery capacity, and energy usage. A professionally installed system ensures efficiency and long-term reliability.",
      date: "April 10, 2026",
      category: "Solar",
      image: "https://picsum.photos/id/1022/800/600"
    },
    {
      title: "How to Choose the Best Electrical Company in Kampala",
      excerpt: "Choosing the right electrical company in Kampala requires considering experience, customer reviews, and service quality. DYNAWATT ENGINEERING offers reliable solutions.",
      date: "March 25, 2026",
      category: "Tips",
      image: "https://picsum.photos/id/1018/800/600"
    },
    {
      title: "Top 5 Benefits of Smart Home Automation",
      excerpt: "Discover how smart home technology can improve your convenience, security, and energy efficiency in your Kampala home.",
      date: "March 12, 2026",
      category: "Smart Home",
      image: "https://picsum.photos/id/1019/800/600"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Blog & News</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stay updated with the latest trends in electrical engineering, solar power, and home automation in Uganda.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, i) => (
              <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-lg transition-shadow">
                <div className="h-56 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-slate-400 text-sm mb-3 flex items-center">
                    <Icons.Calendar className="h-4 w-4 mr-2" />
                    {post.date}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 hover:text-amber-600 transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
                  <button className="text-amber-600 font-bold text-sm flex items-center hover:text-amber-700 transition-colors">
                    Read More
                    <Icons.ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
