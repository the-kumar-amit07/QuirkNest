/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.jpg';
import { Instagram ,Twitter,Facebook } from 'lucide-react';

function Footer() {
    return (
        <section className="relative overflow-hidden bg-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="p-4">
                        <Link to="/">
                            <img src={Logo} alt="Logo" className="h-16 w-32 object-fill" />
                        </Link>
                    </div>
                    <div className="p-4">
                        <ul className="flex space-x-4">
                            <li>
                                <Link className="font-medium text-gray-600 hover:text-gray-800" to="/privacy-policy">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link className="font-medium text-gray-600 hover:text-gray-800" to="/terms-of-service">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link className="font-medium text-gray-600 hover:text-gray-800" to="/return-policy">
                                    Return Policy
                                </Link>
                            </li>
                            <li>
                                <Link className="font-medium text-gray-600 hover:text-gray-800" to="/contact-us">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="p-4">
                        <div className="flex space-x-2">
                            <Link to="#">
                                <div className="flex items-center justify-center w-8 h-8  rounded-full hover:border-gray-400">
                                    {/* Social icon SVG */}
                                    <Instagram className='rounded-full object-cover' />
                                </div>
                            </Link>
                            <Link to="#">
                                <div className="flex items-center justify-center w-8 h-8  rounded-full hover:border-gray-400">
                                    {/* Social icon SVG */}
                                    <Twitter className='rounded-full object-cover'/>
                                </div>
                            </Link>
                            <Link to="#">
                                <div className="flex items-center justify-center w-8 h-8  rounded-full hover:border-gray-400">
                                    {/* Social icon SVG */}
                                    <Facebook className='rounded-full object-cover'/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;