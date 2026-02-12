import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import translations from '../data/translations';
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    if (!isHome) {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Handle scroll on mount if directed from another page
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      // Clear state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const navLinks = [
    { name: t('nav.home'), id: 'hero' },
    { name: t('nav.about'), id: 'about' },
    { name: t('nav.diploma'), id: 'diploma' },
    { name: t('nav.portfolio'), id: 'portfolio-preview' },
    { name: t('nav.contact'), id: 'contact' },
  ];

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo" onClick={() => scrollToSection('hero')}>
          AS
        </div>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.id} className="nav-item">
                <button 
                  className="nav-link"
                  onClick={() => scrollToSection(link.id)}
                >
                  {link.name}
                </button>
              </li>
            ))}
             <li className="nav-item">
                <NavLink 
                  to="/all-projects" 
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.allProjects')}
                </NavLink>
              </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="lang-toggle" onClick={toggleLanguage}>
            <FiGlobe size={20} />
            <span>{lang === 'en' ? 'AR' : 'EN'}</span>
          </button>
          
          <button className="menu-toggle" onClick={handleMenuToggle}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
