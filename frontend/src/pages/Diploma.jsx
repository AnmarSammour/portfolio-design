import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Carousel from '../components/Carousel';
import './Diploma.css';

const Diploma = () => {
  const { t } = useLanguage();

  // Images 2.png to 11.png
  const diplomaImages = Array.from({ length: 10 }, (_, i) => `${i + 2}.png`);

  const learnedItems = [
    'Designing social media posts',
    'Storefront / facade design',
    'Photo editing',
    'Full visual identity and branding',
    'Icon sets',
    'Magazines and multi-page layouts'
  ];

  return (
    <div className="diploma-page container">
       <div className="diploma-header">
         <h1>{t('diploma.title')}</h1>
         <p className="institution-name">{t('diploma.institution')}</p>
       </div>

       <div className="diploma-body">
         <div className="diploma-info">
           <div className="info-card">
             <p className="diploma-desc">{t('diploma.description')}</p>
             <p className="diploma-support"><strong>{t('diploma.support')}</strong></p>
           </div>
           
           <div className="learned-section">
             <h3>{t('diploma.learnedTitle')}</h3>
             <ul className="check-list">
               {learnedItems.map((item, index) => (
                 <li key={index}>{item}</li>
               ))}
             </ul>
           </div>
         </div>

         <div className="diploma-gallery">
            <Carousel images={diplomaImages} height="400px" />
            <p className="gallery-caption">{t('diploma.carouselCaption')}</p>
         </div>
       </div>
    </div>
  );
};

export default Diploma;
