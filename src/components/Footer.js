import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">&copy; 2025 Quiz Application. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="https://github.com/Venkata-Sanjeeva" className="text-blue-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={24} />
                    </a>    &nbsp;
                    <a href="https://www.linkedin.com/in/venkata-sanjeeva-kuntumalla-ab5894257/" className="text-blue-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={24} />
                    </a>    &nbsp;
                    <a href="mailto:kuntumallavenkatasanjeeva2005@gmail.com" className="text-blue-400 hover:text-white">
                        <FaEnvelope size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
