import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className=" py-12 px-6 md:px-20 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* About Section */}
        <div className="md:w-1/3">
          <h3 className="text-2xl font-bold mb-4 ">VET-PET</h3>
          <p className="text">
            Providing 24/7 urgent veterinary services with compassion and
            expertise. We care for your pets like our own.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/3">
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/booking" className="hover:underline">
                Book Appointment
              </a>
            </li>
            <li>
              <a href="/services" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/3 ">
          <h4 className="text-sm font-semibold mb-4">Contact Us</h4>
          <p>📞 Phone: +977 98XXXXXXXX</p>
          <p>📧 Email: support@vetpet.com</p>
          <p>🏢 Address: Chitwan, Nepal</p>
          <div className="flex space-x-4 mt-4">
            {/* Social icons (can replace with SVGs or icon components) */}
            <a href="#" aria-label="Facebook" className="text-blue-600">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="text-blue-600">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="text-blue-600">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-black pt-6 text-center text-sm select-none">
        &copy; {new Date().getFullYear()} VET-PET. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
