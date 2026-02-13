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
  const [activeFlip, setActiveFlip] = useState(null);
  const project = projects.find(p => p.id === id);
  if (!project) {
    return <div className="container" style={{padding: '4rem'}}>Project not found.</div>;
  }

  const getImageUrl = (img) => `http://localhost:5000/images/${img}`;

  return (
    <div className="project-details-page container page-with-footer-spacing">
      <Link to="/portfolio" className="back-link">
        {lang === 'en' ? <FiArrowLeft /> : <FiArrowRight />} {t('projectDetails.backToPortfolio')}
      </Link>

      <div className="project-header">
        <h1>{project.title[lang]}</h1>
        <div className="project-meta">
          <span className="project-cat">
            {Array.isArray(project.category) 
              ? project.category.map(cat => t(`portfolio.categories.${cat}`)).join(' / ') 
              : t(`portfolio.categories.${project.category}`)}
          </span>
        </div>
      </div>

      <div className="project-content-grid">
        <div className="project-info">
          <h2>{t('projectDetails.aboutProject')}</h2>
          <p className="project-desc">{project.description[lang]}</p>
          
          <div className="tools-used">
             <h3>{t('projectDetails.toolsUsed')}</h3>
             <ul className="tools-list">
               {(Array.isArray(project.category) ? project.category.includes('ui') : project.category === 'ui') ? (
                 <>
                   <li>Adobe Photoshop</li>
                   <li>Figma</li>
                 </>
               ) : (
                 <>
                   <li>Adobe Photoshop</li>
                   <li>Adobe Illustrator</li>
                   {(Array.isArray(project.category) ? project.category.includes('print') : project.category === 'print') && <li>Adobe InDesign</li>}
                 </>
               )}
             </ul>
          </div>
        </div>

        <div className="project-visuals">
          {/* Cover Image - Always First */}
           <div className="visual-section cover-section">
              <img 
                src={getImageUrl(project.images[0])} 
                alt="Project Cover" 
                className={`detail-image cover-image ${project.imageFit === 'contain' ? 'img-contain' : ''}`} 
              />
           </div>

          {/* Stationery (Mixed Interactive) Logic */}
          {project.detailsType === 'stationery' && project.stationeryItems && (
            <div className="visual-section stationery-section">
              <h3>{t('projectDetails.gallery')}</h3>
              <div className="stationery-grid">
                {project.stationeryItems.map((item, index) => {
                  // Skip item if it matches the cover image
                  if (item.src === project.images[0]) return null;

                  return (
                  <div key={index} className={`stationery-item ${item.type === 'scroll' ? 'full-width' : ''}`}>
                    {item.title && <h4>{item.title[lang]}</h4>}
                    
                    {item.type === 'standard' && (
                      <div className="standard-item-wrapper">
                         <img src={getImageUrl(item.src)} alt={item.title?.[lang]} className="detail-image" />
                      </div>
                    )}
                    
                    {item.type === 'scroll' && (
                      <div className="scroll-container">
                        <img src={getImageUrl(item.src)} alt={item.title?.[lang] || 'Print Design'} className="scroll-image" />
                      </div>
                    )}

                    {item.type === 'flip' && (
                       <div className="flip-wrapper">
                          <div className={`detail-flip-card ${item.title.en.toLowerCase().includes('envelope') ? 'wide-flip' : ''} ${activeFlip === index ? 'flipped' : ''}`}>
                             <div className="detail-flip-inner">
                               <div className="detail-flip-front">
                                  <img src={getImageUrl(item.front)} alt={`${item.title[lang]} Front`} />
                               </div>
                               <div className="detail-flip-back">
                                  <img src={getImageUrl(item.back)} alt={`${item.title[lang]} Back`} />
                               </div>
                             </div>
                          </div>
                          <button className="flip-btn" onClick={() => setActiveFlip(activeFlip === index ? null : index)}>
                             {t('projectDetails.rotateCard')} <span className="icon">↻</span>
                          </button>
                       </div>
                    )}
                  </div>
                )})}
              </div>
            </div>
          )}

          {/* Logic based on detailsType (Guideline / Showcase / Standard) */}
          {project.detailsType === 'guideline' && project.images[1] && (
            <div className="visual-section guideline-section">
               <h3>{t('projectDetails.guidelines')}</h3>
               <div className="guideline-container">
                  <img src={getImageUrl(project.images[1])} alt="Brand Guidelines" className="guideline-image" />
               </div>
            </div>
          )}

          {(project.detailsType === 'showcase' || project.detailsType === 'standard' || !project.detailsType) && project.images.length > 1 && (
            <div className="visual-section showcase-section">
               <h3>{t('projectDetails.gallery')}</h3>
               {/* Pass all images except the first one to Carousel */}
               <Carousel images={project.images.slice(1)} height="500px" />
            </div>
          )}

          {/* Fallback: If no specific type matches but images exist, show them */}
          {project.detailsType !== 'guideline' && project.detailsType !== 'showcase' && project.detailsType !== 'standard' && project.images.length > 1 && (
             <div className="visual-section grid-section">
                <h3>{t('projectDetails.gallery')}</h3>
                <div className="project-images-grid">
                  {project.images.filter((img, i) => {
                      if (i === 0) return false; // Skip cover
                      if (project.detailsType === 'stationery' && project.stationeryItems) {
                          return !project.stationeryItems.some(item => 
                              item.src === img || item.front === img || item.back === img
                          );
                      }
                      return true;
                  }).map((img, index) => (
                    <img key={index} src={getImageUrl(img)} alt={`Project detail ${index + 1}`} className="detail-grid-image" />
                  ))}
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
