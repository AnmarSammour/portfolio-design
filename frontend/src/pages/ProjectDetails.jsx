import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projects';
import Carousel from '../components/Carousel';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const { lang, t } = useLanguage();
  const project = projects.find(p => p.id === id);
  const [viewMode, setViewMode] = useState('mockups'); // 'mockups' or 'artwork'

  if (!project) {
    return <div className="container" style={{padding: '4rem'}}>Project not found.</div>;
  }

  // Assuming project.images contains all images. We'll split them artificially for demo
  // In reality, we'd have project.mockups and project.artwork arrays.
  // For now, we use the same array but pretend.
  const displayImages = project.images; 

  const getImageUrl = (img) => `http://localhost:5000/images/${img}`;

  return (
    <div className="project-details-page container page-with-footer-spacing">
      <Link to="/portfolio" className="back-link">
        {lang === 'en' ? <FiArrowLeft /> : <FiArrowRight />} {t('projectDetails.backToPortfolio')}
      </Link>

      <div className="project-header">
        <h1>{project.title[lang]}</h1>
        <div className="project-meta">
          <span className="project-cat">{t(`portfolio.categories.${project.category}`)}</span>
        </div>
      </div>

      <div className="project-content-grid">
        <div className="project-info">
          <h2>{t('projectDetails.aboutProject')}</h2>
          <p className="project-desc">{project.description[lang]}</p>
          
          <div className="tools-used">
             <h3>{t('projectDetails.toolsUsed')}</h3>
             <ul className="tools-list">
               <li>Adobe Photoshop</li>
               <li>Adobe Illustrator</li>
             </ul>
          </div>
        </div>

        <div className="project-visuals">
          <div className="view-toggles">
            <button 
              className={`toggle-btn ${viewMode === 'mockups' ? 'active' : ''}`} 
              onClick={() => setViewMode('mockups')}
            >
              {t('projectDetails.mockups')}
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'artwork' ? 'active' : ''}`} 
              onClick={() => setViewMode('artwork')}
            >
              {t('projectDetails.artworkOnly')}
            </button>
          </div>

          <div className="visuals-container">
            {viewMode === 'mockups' ? (
              <div className="mockups-view">
                 <Carousel images={displayImages} height="500px" />
                 <p className="caption">{t('projectDetails.projectMockups')}</p>
              </div>
            ) : (
              <div className="artwork-view">
                 <div className="artwork-grid">
                    {displayImages.map((img, idx) => (
                      <img key={idx} src={getImageUrl(img)} alt={t('projectDetails.artwork')} className="artwork-img" />
                    ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
