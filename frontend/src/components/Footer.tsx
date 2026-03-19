import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Sun, MessageCircle, PhoneCall, Briefcase } from "lucide-react";
import api from "@/lib/api";

const Footer = () => {
  const [careers, setCareers] = useState<any[]>([]);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await api.get("/careers");
        setCareers(res.data);
      } catch (error) {
        console.error("Failed to fetch careers");
      }
    };
    fetchCareers();
  }, []);

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.png"
                alt="Skywatt Electric Energy Logo"
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-bold">SKYWATT ELECTRIC ENERGY</h3>
                <p className="text-sm opacity-80">The Solutions Provider</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              India's leading solar energy solutions company since 2011. Empowering homes and
              businesses with clean, efficient energy.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Products & Solutions
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/projects" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Career Opportunities</h4>
            <ul className="space-y-2 text-sm mb-6">
              {careers.length > 0 ? (
                careers.map((career) => (
                  <li key={career._id} className="flex items-start space-x-2">
                    <Briefcase className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>{career.title}: {career.postings} {career.postings === 1 ? 'posting' : 'postings'}</span>
                  </li>
                ))
              ) : (
                <li className="opacity-60 italic">No current openings</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MessageCircle className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <a href="https://wa.me/919843771446" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                    +91 98437 71446
                  </a>
                </div>
                <div className="flex items-start space-x-2">
                  <Mail className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <a href="mailto:vijayakumar@skywatt.com" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                    vijayakumar@skywatt.com
                  </a>
                </div>
                <div className="flex items-start space-x-2">
                  <PhoneCall className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <a href="tel:04222254143" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                    0422-2254143
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                <p className="opacity-80">
                  967A, Semba Goundenpudur,<br />
                  Sarkarsamkulam,<br />
                  Coimbatore – 641107
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary">Follow Us</h4>
            <div className="space-y-3">
              <a
                href="https://instagram.com/SWEE_SOLAR"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all"
              >
                <Instagram className="h-5 w-5" />
                <span>@SWEE_SOLAR</span>
              </a>
              <a
                href="https://www.facebook.com/share/14MHD2pDgig/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                <span>Facebook</span>
              </a>
            </div>
            <div className="mt-6">
              <p className="text-xs opacity-60 mb-2">GSTIN</p>
              <p className="text-sm opacity-80 font-mono">33AYGPV6612F1ZE</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-60">
          <p>&copy; {new Date().getFullYear()} Skywatt Electric Energy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
