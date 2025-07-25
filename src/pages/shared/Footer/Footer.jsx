import React from "react";

import { Input, Button } from "antd";
import {
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <img
                src="https://i.ibb.co/NDy7Vbd/Brown-and-Beige-Luxury-Hotel-Logo-2-removebg-preview.png"
                className="w-48"
                alt=""
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting hearts, building futures. Your trusted partner in
              finding the perfect life companion through verified profiles and
              genuine connections.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="bg-gray-800 p-3 rounded-full hover:bg-rose-600 transition-colors duration-200"
                  aria-label="social link"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "Home",
                "Browse Profiles",
                "Success Stories",
                "Premium Membership",
                "Safety Guidelines",
                "Mobile App",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-rose-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Contact Support",
                "Privacy Policy",
                "Terms of Service",
                "Community Guidelines",
                "Report Abuse",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-rose-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-rose-600 p-2 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <p className="text-white">suport@nikaahnest.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-rose-600 p-2 rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Phone</p>
                  <p className="text-white">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-rose-600 p-2 rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Address</p>
                  <p className="text-white">Gulshan-1,Dhaka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="text-lg font-semibold text-white mb-2">
                Stay Updated with Success Stories
              </h5>
              <p className="text-gray-300">
                Subscribe to our newsletter for matrimony tips and success
                stories
              </p>
            </div>
            <div className="flex w-full lg:w-auto ">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-l-lg w-80 "
                name=""
                id=""
              />
              <button className="bg-rose-500 text-white rounded-r-lg p-2 font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
              © {currentYear} Harmonious Union Hub. All rights reserved. Made
              with{" "}
              <span role="img" aria-label="heart">
                ❤️
              </span>{" "}
              for finding love.
            </p>
            <div className="flex items-center space-x-6 justify-center md:justify-start">
              {["Privacy", "Terms", "Cookies"].map((text) => (
                <a
                  key={text}
                  href="#"
                  className="text-gray-400 hover:text-rose-400 text-sm transition-colors duration-200"
                >
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
