import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FiMail, FiLinkedin, FiLayout, FiGlobe } from 'react-icons/fi';
import { FaWhatsapp, FaBehance, FaLaptopCode } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const { t } = useLanguage();

  const links = [
    { name: 'Email', icon: <FiMail />, url: 'mailto:anmarsammour@gmail.com', detail: 'anmarsammour@gmail.com' },
    { name: 'WhatsApp', icon: <FaWhatsapp />, url: 'https://wa.me/%2B970595351929', detail: '+970 59 535 1929' },
    { name: 'LinkedIn', icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/anmarsammour', detail: 'Anmar Sammour' },
    { name: 'Behance', icon: <FaBehance />, url: 'https://www.behance.net/anmarsammour', detail: 'Portfolio' },
  ];

  const freelanceLinks = [
    { name: 'Mostaql', url: 'https://mostaql.com/u/Anmar_Sammour' },
    { name: 'Khamsat', url: 'https://khamsat.com/user/anmarsammour' },
    { name: 'Upwork', url: 'https://www.upwork.com/freelancers/~01b9de6b268a92452c' },
    { name: 'Baaeed', url: 'https://baaeed.com/u/Anmar_Sammour' },
    { name: 'Freelancer', url: 'https://www.freelancer.com/u/anmarsammour2' },
  ];

  return (
    <div className="contact-page container">
      <div className="contact-header">
        <h1>{t('contact.title')}</h1>
        <p>{t('contact.description')}</p>
      </div>

      <div className="contact-grid">
        {links.map((link, idx) => (
          <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="contact-card">
            <div className="icon-wrapper">{link.icon}</div>
            <div className="link-info">
              <h3>{link.name}</h3>
              <span>{link.detail}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="freelance-platforms">
        <h2>{t('contact.freelanceProfiles')}</h2>
        <div className="platforms-grid">
           {freelanceLinks.map((link, idx) => (
             <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="platform-card">
               <FaLaptopCode size={20} />
               <span>{link.name}</span>
             </a>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
