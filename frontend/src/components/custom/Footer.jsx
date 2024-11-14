import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-950 via-gray-700 to-gray-950 text-gray-200 py-8 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Information */}
                <div className="flex flex-col space-y-4">
                    <Link to={'/'}>
                        <h2 className="text-3xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-white to-slate-900 cursor-pointer">TrekOn</h2>
                    </Link>
                    <p className="text-sm text-gray-400">
                        Your ultimate travel companion. Discover new destinations, explore exciting adventures, and create unforgettable memories.
                    </p>
                    <div className="flex space-x-4 mt-2">
                        <a href="https://www.facebook.com/rounak.kishan.3" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://x.com/rounak_kishan28" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
                            <FaXTwitter size={20} />
                        </a>
                        <a href="https://www.instagram.com/_rounak_kishan/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
                            <FaInstagram size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/rounak-kishan-931394257/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
                            <FaLinkedin size={20} />
                        </a>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-lg font-semibold text-slate-300">Explore</h3>
                    <Link to="/" className="text-sm hover:text-gray-400 transition">Home</Link>
                    <Link to="/deals" className="text-sm hover:text-gray-400 transition">Deals</Link>
                    <Link to="/contact" className="text-sm hover:text-gray-400 transition">Contact</Link>
                    <Link to="#" className="text-sm hover:text-gray-400 transition">About Us</Link>
                </div>

                {/* Additional Links */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-lg font-semibold text-slate-300">Quick Links</h3>
                    <Link to="#" className="text-sm hover:text-gray-400 transition">Privacy Policy</Link>
                    <Link to="#" className="text-sm hover:text-gray-400 transition">Terms of Service</Link>
                    <Link to="#" className="text-sm hover:text-gray-400 transition">FAQ</Link>
                    <Link to="#" className="text-sm hover:text-gray-400 transition">Support</Link>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} TrekOn. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
