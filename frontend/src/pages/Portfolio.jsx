import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import './Portfolio.css';

const Portfolio = () => {
  const { t } = useLanguage();
  const [lightboxProject, setLightboxProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'logos', 'branding', 'print', 'social', 'icons', 'ui'];

  const filteredProjects = activeCategory === 'all' 
    ? projects // Show ALL projects when "All" is selected
    : projects.filter(p => Array.isArray(p.category) ? p.category.includes(activeCategory) : p.category === activeCategory);

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
              <ProjectCard project={project} onOpenLightbox={setLightboxProject} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      {lightboxProject && (
        <div className="lightbox-overlay" onClick={() => setLightboxProject(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
             <button className="close-lightbox" onClick={() => setLightboxProject(null)}>&times;</button>
             <img 
               src={`http://localhost:5000/images/${lightboxProject.images[0]}`} 
               alt={lightboxProject.title[lang]} 
               className="lightbox-image" 
             />
             {lightboxProject.displayType === 'flip' && lightboxProject.images[1] && (
                <img 
                  src={`http://localhost:5000/images/${lightboxProject.images[1]}`} 
                  alt={`${lightboxProject.title[lang]} back`} 
                  className="lightbox-image" 
                />
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
