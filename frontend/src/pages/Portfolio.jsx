import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import './Portfolio.css';

const Portfolio = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'logos', 'social', 'icons', 'branding', 'print', 'ui'];

  const filteredProjects = activeCategory === 'all' 
    ? projects // Show ALL projects when "All" is selected
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="portfolio-page container page-with-footer-spacing">
      <div className="portfolio-header">
        <h1>{t('portfolio.title')}</h1>
        <p>{t('portfolio.description')}</p>
      </div>

      {/* Categories */}
      <div className="categories-nav">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {t(`portfolio.categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="projects-grid">
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Portfolio;
