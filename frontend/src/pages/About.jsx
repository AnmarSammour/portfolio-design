import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const { t } = useLanguage();

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

  return (
    <div className="about-page container">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="about-header"
      >
        <h1>{t('about.title')}</h1>
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
  );
};

export default About;
