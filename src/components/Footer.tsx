
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xl p-2 rounded">EA</div>
              <span className="ml-2 text-xl font-bold">EliteArena</span>
            </div>
            <p className="text-gray-400 mb-6">
              Connect AI Builders with innovative challenges from top companies.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">For Builders</h3>
            <ul className="space-y-2">
              <li><Link to="/challenges" className="text-gray-400 hover:text-indigo-400">Browse Challenges</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-indigo-400">How It Works</Link></li>
              <li><Link to="/builder-faq" className="text-gray-400 hover:text-indigo-400">Builder FAQ</Link></li>
              <li><Link to="/builder-signup" className="text-gray-400 hover:text-indigo-400">Become a Builder</Link></li>
            </ul>
          </div>
          
          {/* Sponsor Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">For Sponsors</h3>
            <ul className="space-y-2">
              <li><Link to="/sponsor-info" className="text-gray-400 hover:text-indigo-400">Why Sponsor</Link></li>
              <li><Link to="/sponsor-faq" className="text-gray-400 hover:text-indigo-400">Sponsor FAQ</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-indigo-400">Pricing</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-indigo-400">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-indigo-400">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-indigo-400">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-indigo-400">Careers</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-indigo-400">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} EliteArena. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
