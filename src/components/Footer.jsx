// src/components/Footer.jsx

import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {currentYear} <strong>MyRecipeBook</strong>. Made with <span className="heart">❤</span> by <a href="https://github.com/JoseMRG19" target="_blank" rel="noopener noreferrer">Jose Manuel R.G.</a>
        </p>

        <div className="social-links">
          <a href="https://www.facebook.com/josemanuel.rodriguezgonzalez.98031" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/josemrg_19/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://wa.me/3245697062" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
