import React, { useState } from 'react';
import { Lead, SiteConfig } from '../types';
import { Icons } from './Icons';
import { generateMarketingContent } from '../services/geminiService';

interface AdminDashboardProps {
  leads: Lead[];
  config: SiteConfig;
  updateConfig: (key: keyof SiteConfig, value: any) => void;
  goBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ leads, config, updateConfig, goBack }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'content' | 'settings'>('leads');
  
  // Gemini State
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState<'blog' | 'service'>('blog');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    setGeneratedContent('');
    const result = await generateMarketingContent(topic, contentType);
    setGeneratedContent(result);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <Icons.LayoutDashboard className="h-6 w-6 text-amber-500" />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <button 
          onClick={goBack} 
          className="flex items-center text-sm bg-slate-800 hover:bg-red-600 hover:text-white px-3 py-2 rounded-lg transition"
        >
          <Icons.LogOut className="h-4 w-4 mr-2" />
          Logout
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center p-3 rounded-lg transition ${activeTab === 'leads' ? 'bg-amber-100 text-amber-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Icons.Users className="h-5 w-5 mr-3" />
              Leads & Inquiries
            </button>
            <button 
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center p-3 rounded-lg transition ${activeTab === 'content' ? 'bg-amber-100 text-amber-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Icons.PenTool className="h-5 w-5 mr-3" />
              AI Content Assistant
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center p-3 rounded-lg transition ${activeTab === 'settings' ? 'bg-amber-100 text-amber-900 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Icons.Wrench className="h-5 w-5 mr-3" />
              Site Guide & Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Mobile Tab Select */}
          <div className="md:hidden mb-6 flex space-x-2 overflow-x-auto pb-2">
             <button onClick={() => setActiveTab('leads')} className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === 'leads' ? 'bg-amber-500 text-white' : 'bg-white'}`}>Leads</button>
             <button onClick={() => setActiveTab('content')} className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === 'content' ? 'bg-amber-500 text-white' : 'bg-white'}`}>AI Content</button>
             <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === 'settings' ? 'bg-amber-500 text-white' : 'bg-white'}`}>Settings</button>
          </div>

          {activeTab === 'leads' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Recent Leads</h2>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6 flex items-start">
                <Icons.CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-800">Email Integration Active</h4>
                  <p className="text-sm text-blue-700">All new leads are automatically sent to your email via Formspree. This list below is a local backup.</p>
                </div>
              </div>

              {leads.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow-sm text-center text-slate-500">
                  <Icons.Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  No leads submitted in this session yet.
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                          <th className="px-6 py-4 font-semibold text-slate-700">Name</th>
                          <th className="px-6 py-4 font-semibold text-slate-700">Contact</th>
                          <th className="px-6 py-4 font-semibold text-slate-700">Location</th>
                          <th className="px-6 py-4 font-semibold text-slate-700">Service</th>
                          <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {leads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4 text-sm text-slate-600">{lead.date}</td>
                            <td className="px-6 py-4 font-medium text-slate-900">{lead.name}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                              <div className="flex flex-col">
                                <span>{lead.phone}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">{lead.location}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                              <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                                {lead.serviceType}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold uppercase">
                                {lead.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'content' && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">AI Content Assistant (Gemini)</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <p className="text-slate-600 mb-4">Generate professional descriptions for your services or blog posts to improve SEO.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Content Type</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input type="radio" checked={contentType === 'blog'} onChange={() => setContentType('blog')} />
                        <span>Blog Post / Safety Tip</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" checked={contentType === 'service'} onChange={() => setContentType('service')} />
                        <span>Service Description</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Topic / Keyword</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="e.g., Installing Solar Inverters in Kampala"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>

                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !topic}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-lg flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Thinking...
                      </>
                    ) : (
                      <>
                        <Icons.Zap className="h-4 w-4 mr-2" />
                        Generate Content
                      </>
                    )}
                  </button>
                </div>
              </div>

              {generatedContent && (
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg">
                  <h3 className="font-bold text-slate-800 mb-3">Generated Draft:</h3>
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{generatedContent}</p>
                  <div className="mt-4 flex space-x-3">
                    <button className="text-sm text-blue-600 hover:underline" onClick={() => navigator.clipboard.writeText(generatedContent)}>Copy to Clipboard</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Website Configuration</h2>
                
                {/* Temporary Settings */}
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-6 border border-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                    <div>
                      <h3 className="font-bold text-slate-900">Emergency Mode</h3>
                      <p className="text-sm text-slate-500">Shows a red "24/7 Emergency" banner at the top of the site.</p>
                    </div>
                    <button 
                      onClick={() => updateConfig('emergencyMode', !config.emergencyMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.emergencyMode ? 'bg-red-500' : 'bg-slate-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${config.emergencyMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-amber-50 p-4 rounded text-sm text-amber-800">
                      <strong>Note:</strong> Settings changed here are temporary for the current session. To make them permanent, see the guide below.
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                        value={config.contactPhone}
                        onChange={(e) => updateConfig('contactPhone', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Hero Headline</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                        value={config.heroHeadline}
                        onChange={(e) => updateConfig('heroHeadline', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Website Guide */}
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Website Owner's Guide</h2>
                <div className="bg-slate-800 text-slate-300 rounded-lg p-6 shadow-lg space-y-6">
                  
                  {/* Access */}
                  <div className="border-b border-slate-700 pb-6">
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center">
                      <Icons.Lock className="h-5 w-5 mr-2 text-amber-500" />
                      Admin Access
                    </h3>
                    <p className="mb-2">To access this dashboard in the future:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2">
                      <li>Scroll to the <strong>Footer</strong> (bottom of page).</li>
                      <li><strong>Double-click</strong> the copyright text "© 2024 DYNAWATT...".</li>
                      <li>Login with Username: <code className="text-amber-500">admin</code>, Password: <code className="text-amber-500">dynawatt</code></li>
                    </ol>
                  </div>

                  {/* Editing Content */}
                  <div className="border-b border-slate-700 pb-6">
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center">
                      <Icons.PenTool className="h-5 w-5 mr-2 text-amber-500" />
                      How to Edit Content
                    </h3>
                    <p className="mb-2">Since this is a custom-coded website, permanent text changes are made in the code file:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Open the file: <code className="bg-slate-900 px-2 py-1 rounded">App.tsx</code></li>
                      <li>Search for the text you want to change (e.g., "About Us").</li>
                      <li>Replace the text inside the quotes.</li>
                      <li>To change images, find the <code className="text-blue-400">src="..."</code> part and replace the URL.</li>
                    </ul>
                  </div>

                  {/* Emails */}
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center">
                      <Icons.MessageCircle className="h-5 w-5 mr-2 text-amber-500" />
                      Lead Notifications
                    </h3>
                    <p>All "Get Quote" submissions are sent to:</p>
                    <code className="block bg-slate-900 p-3 rounded mt-2 text-green-400">https://formspree.io/f/mkgdnkzb</code>
                    <p className="mt-2 text-sm">Check your email associated with this Formspree link to see customer inquiries.</p>
                  </div>

                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;