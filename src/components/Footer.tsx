
import React from 'react';
import { MapPin, Mail, Phone, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-real-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-medium mb-4">Anastasia Krasun</h3>
            <p className="mb-6 text-real-300 text-base max-w-md">
              Premier Florida realtor with RelatedISG Realty, bringing international experience and market expertise to South Florida real estate.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4 text-gold-400">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold-400 mr-3 mt-0.5" />
                <span className="text-real-300 text-base">RelatedISG Realty, South Florida</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gold-400 mr-3" />
                <a 
                  href="tel:+16464440474" 
                  className="text-real-300 hover:text-white transition-colors text-base"
                >
                  (646) 444-0474
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gold-400 mr-3" />
                <a 
                  href="mailto:anastasia@relatedisg.com" 
                  className="text-real-300 hover:text-white transition-colors text-base"
                >
                  anastasia@relatedisg.com
                </a>
              </li>
              <li className="flex items-center">
                <Instagram className="h-5 w-5 text-gold-400 mr-3" />
                <a 
                  href="https://www.instagram.com/anastasiakrasun?igsh=anFwOTN1bXhnY3A1" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-real-300 hover:text-white transition-colors text-base"
                >
                  @anastasiakrasun
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-real-800 mb-6"></div>

        {/* Copyright */}
        <div className="text-center text-real-400 text-sm">
          <p>&copy; {currentYear} Anastasia Krasun. All rights reserved.</p>
          <p className="mt-1 text-xs">
            Licensed Real Estate Agent, License #3524077
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
