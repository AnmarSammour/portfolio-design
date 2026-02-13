import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project, onOpenLightbox }) => {
  const { lang, t } = useLanguage();
  const imageUrl = `http://localhost:5000/images/${project.images[0]}`;
  const secondImageUrl = project.images[1] ? `http://localhost:5000/images/${project.images[1]}` : null;

  const isFlip = project.displayType === 'flip';
  const isScroll = project.displayType === 'scroll';

  return (
    <div className={`project-card ${isFlip ? 'flip-card' : ''} ${isScroll ? 'scroll-card' : ''}`}>
      <div className="card-image-wrapper" onClick={() => onOpenLightbox && onOpenLightbox(project)}>
        
        {isFlip ? (
           <div className="flip-inner">
             <div className="flip-front">
               <img 
                 src={imageUrl} 
                 alt={project.title[lang]} 
                 className={`card-image ${project.imageFit === 'contain' ? 'img-contain' : ''}`} 
                 onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}} 
               />
             </div>
             <div className="flip-back">
               {secondImageUrl && (
                 <img src={secondImageUrl} alt={project.title[lang]} className="card-image" onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}} />
               )}
             </div>
           </div>
        ) : (
          <>
            <img 
              src={imageUrl} 
              alt={project.title[lang]} 
              className={`card-image ${project.imageFit === 'contain' ? 'img-contain' : ''}`} 
              onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}} 
            />
            <div className="card-overlay">
              <Link to={`/portfolio/${project.id}`} className="view-btn" onClick={(e) => e.stopPropagation()}>
                {t('portfolio.viewProject')}
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="card-content">
        <span className="card-category">
          {Array.isArray(project.category)
            ? project.category.map(cat => t(`portfolio.categories.${cat}`)).join(' / ')
            : t(`portfolio.categories.${project.category}`)}
        </span>
        <h3 className="card-title">{project.title[lang]}</h3>
      </div>
    </div>
  );
};

export default ProjectCard;
