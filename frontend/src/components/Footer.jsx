import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#0B0C10] text-gray-400 p-4 border-t border-[#1F2833] mt-auto">
      <div className="flex flex-wrap justify-center gap-6 mb-2">
        <a 
          href="https://github.com/maneesxh" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center hover:text-white transition-colors"
        >
          <FaGithub className="mr-2" /> Github
        </a>
        <a 
          href="https://linkedin.com/in/maneeshthota" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center hover:text-white transition-colors"
        >
          <FaLinkedin className="mr-2" /> LinkedIn
        </a>
        <a 
          href="mailto:your.thotamaneesh@gmail.com" 
          className="flex items-center hover:text-white transition-colors"
        >
          <FaEnvelope className="mr-2" /> Email
        </a>
        <a 
          href="tel:+917013938953" 
          className="flex items-center hover:text-white transition-colors"
        >
          <FaPhone className="mr-2" /> Phone
        </a>
      </div>
      <p className="text-center text-sm">© 2025 | Coded by Maneesh Thota</p>
    </footer>
  );
}
