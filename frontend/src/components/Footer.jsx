import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>&copy; {currentYear}. {t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;
