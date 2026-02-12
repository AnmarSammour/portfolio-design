import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { FiSearch } from 'react-icons/fi';
import './AllProjects.css';

const AllProjects = () => {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'logos', 'social', 'icons', 'branding', 'print', 'ui'];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      const matchesSearch = project.title[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.description[lang].toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, lang]);

  return (
    <div className="all-projects-page container page-with-footer-spacing">
      <div className="page-header">
        <h1>{t('nav.allProjects')}</h1>
        
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder={t('portfolio.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {t(`portfolio.categories.${cat}`)}
          </button>
        ))}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>{t('portfolio.noResults')}</p>
        </div>
      )}
    </div>
  );
};

export default AllProjects;
