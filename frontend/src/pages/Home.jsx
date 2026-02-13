import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin } from 'react-icons/fi';
import { FaWhatsapp, FaBehance, FaLaptopCode } from 'react-icons/fa';
import Carousel from '../components/Carousel';
import './Home.css';

const Home = () => {
  const { lang, t } = useLanguage();

  // Featured projects for portfolio preview
  const featuredProjects = projects.filter(p => p.featured).slice(0, 6);

  // Diploma images
  const diplomaImages = Array.from({ length: 10 }, (_, i) => `c2c/post_${String(i + 1).padStart(2, '0')}.png`);

  // Skills for About section
  const skills = [
    'Branding & Identity',
    'Social Media Design',
    'Icon Design',
    'Print Design',
    'UI/UX Design',
    'Photo Editing',
    'Adobe Photoshop',
    'Adobe Illustrator',
    'Adobe InDesign'
  ];

  // Contact links
  const contactLinks = [
    { nameKey: 'contact.email', icon: <FiMail />, url: 'mailto:anmarsammour@gmail.com', detail: 'anmarsammour@gmail.com' },
    { nameKey: 'contact.whatsapp', icon: <FaWhatsapp />, url: 'https://wa.me/%2B970595351929', detail: '+970 59 535 1929' },
    { nameKey: 'contact.linkedin', icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/anmarsammour', detail: 'Anmar Sammour' },
    { nameKey: 'contact.behance', icon: <FaBehance />, url: 'https://www.behance.net/anmarsammour', detail: 'Portfolio' },
  ];

  const freelanceLinks = [
    { nameKey: 'contact.mostaql', url: 'https://mostaql.com/u/Anmar_Sammour' },
    { nameKey: 'contact.khamsat', url: 'https://khamsat.com/user/anmarsammour' },
    { nameKey: 'contact.upwork', url: 'https://www.upwork.com/freelancers/~01b9de6b268a92452c' },
    { nameKey: 'contact.baaeed', url: 'https://baaeed.com/u/Anmar_Sammour' },
    { nameKey: 'contact.freelancer', url: 'https://www.freelancer.com/u/anmarsammour2' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="container hero-content">
          <div className="hero-visual">
            {/* Profile Image */}
            <div className="hero-image-container">
              <img 
                src="http://localhost:5000/images/anmar.png" 
                alt="Anmar Sammour" 
                className="hero-profile-img"
                onError={(e) => {e.target.style.display='none'}}
              />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="hero-name">{t('hero.name')}</h1>
            <p className="hero-tagline">{t('hero.tagline')}</p>
            <div className="hero-buttons">
              <button onClick={() => scrollToSection('portfolio-preview')} className="btn btn-primary">
                {t('hero.myWork')}
              </button>
              <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">
                {t('hero.contactMe')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-header-center"
          >
            <h2>{t('about.title')}</h2>
            <p className="section-desc">{t('about.description')}</p>
          </motion.div>

          <div className="about-content">
            <div className="about-text-column">
              <div className="about-card">
                <p className="about-bio">{t('about.content')}</p>
              </div>
            </div>
            
            <div className="about-skills-column">
              <h3>{t('about.skillsTitle')}</h3>
              <ul className="skills-list">
                {skills.map((skill, index) => (
                  <li key={index} className="skill-item">{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diploma Section */}
      <section id="diploma" className="section diploma-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="section-header-center"
          >
            <h2>{t('diploma.title')}</h2>
            <p className="institution-name">{t('diploma.institution')}</p>
          </motion.div>

          <div className="diploma-grid">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="diploma-card diploma-description"
            >
              <p className="diploma-desc">{t('diploma.description')}</p>
              <p className="diploma-support"><strong>{t('diploma.support')}</strong></p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="diploma-card diploma-learned"
            >
              <h3>{t('diploma.learnedTitle')}</h3>
              <ul className="check-list">
                {t('diploma.learnedItems').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="diploma-card diploma-carousel"
            >
              <Carousel images={diplomaImages} height="350px" />
              <p className="gallery-caption">{t('diploma.carouselCaption')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section id="portfolio-preview" className="section portfolio-preview-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('portfolio.title')}</h2>
            <p className="section-desc">{t('portfolio.description')}</p>
          </div>
          <div className="portfolio-grid">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="view-more-container">
            <Link to="/portfolio" className="btn btn-primary btn-view-more">
              {t('portfolio.viewMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="section-header-center">
            <h2>{t('contact.title')}</h2>
            <p>{t('contact.description')}</p>
          </div>

          <div className="contact-grid">
            {contactLinks.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="icon-wrapper">{link.icon}</div>
                <div className="link-info">
                  <h3>{t(link.nameKey)}</h3>
                  <span>{link.detail}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="freelance-platforms">
            <h3>{t('contact.freelanceProfiles')}</h3>
            <div className="platforms-grid">
               {freelanceLinks.map((link, idx) => (
                 <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="platform-card">
                   <FaLaptopCode size={20} />
                   <span>{t(link.nameKey)}</span>
                 </a>
               ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
