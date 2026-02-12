import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const { lang, t } = useLanguage();
  // Image path: assumes backend is running on localhost:5000 or images are in public/backend/images if serving statically
  // For development, we can point to the backend URL.
  const imageUrl = `http://localhost:5000/images/${project.images[0]}`;

  return (
    <div className="project-card">
      <div className="card-image-wrapper">
        <img src={imageUrl} alt={project.title[lang]} className="card-image" onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}} />
        <div className="card-overlay">
          <Link to={`/portfolio/${project.id}`} className="view-btn">
            {t('portfolio.viewProject')}
          </Link>
        </div>
      </div>
      <div className="card-content">
        <span className="card-category">{t(`portfolio.categories.${project.category}`)}</span>
        <h3 className="card-title">{project.title[lang]}</h3>
      </div>
    </div>
  );
};

export default ProjectCard;
