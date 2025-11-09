import React, { useState, useEffect } from 'react'
import GooeyNav from './GooeyNav';
import FadeContent from './FadeContent';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState(0);
  // Carousel state for Architecture section
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Zoom state
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  const items = [
    { label: "Requirements", href: "#requirements" },
    { label: "Architecture", href: "#architecture" },
    { label: "Method selection and planning", href: "#method" },
    { label: "Risk assessment and mitigation", href: "#risk" },
    { label: "Implementation", href: "#implementation" }
  ];

  const sections = [
    {
      id: "requirements",
      title: "Requirements",
      content: "Here is the requirements documentation...",
      pdfPath: "/Req1.pdf"
    },
    {
      id: "architecture",
      title: "Architecture",
      content: "Here is the architecture documentation...",
      pdfPath: "/Arch1.pdf",
      // Add carousel images for Architecture section only
      carouselImages: [
        { src: '/basicArchitecture.png', alt: 'Architecture Diagram 1' },
        { src: '/implementedArchitecture.png', alt: 'Architecture Diagram 2' }
      ]
    },
    {
      id: "method",
      title: "Method Selection and Planning",
      content: "Here is the method selection documentation...",
      pdfPath: "/Plan1.pdf"
    },
    {
      id: "risk",
      title: "Risk Assessment and Mitigation",
      content: "Here is the risk assessment documentation...",
      pdfPath: "/Risk1.pdf"
    },
    {
      id: "implementation",
      title: "Implementation",
      content: "Here is the implementation documentation...",
      pdfPath: "/Impl1.pdf"
    }
  ];

  // Listen for hash changes and update active section
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const index = sections.findIndex(section => section.id === hash);
      if (index !== -1) {
        setActiveSection(index);
        // Reset carousel when switching sections
        setCurrentImageIndex(0);
        // Scroll to documentation section
        document.getElementById('documentation')?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    handleHashChange(); // Check on mount
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Auto-advance carousel for Architecture section every 5 seconds
  useEffect(() => {
    const currentSection = sections[activeSection];
    if (currentSection.carouselImages && !isZoomed) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % currentSection.carouselImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [activeSection, sections, isZoomed]);

  // Close zoom on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isZoomed) {
        handleCloseZoom();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isZoomed]);

  const handleSectionClick = (index) => {
    setActiveSection(index);
    setCurrentImageIndex(0); // Reset carousel
    window.history.pushState(null, '', `#${sections[index].id}`);
  };

  const handleOpenPDF = (e) => {
    e.preventDefault();
    const pdfUrl = sections[activeSection].pdfPath;
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  // Carousel navigation functions
  const goToPreviousImage = () => {
    const images = sections[activeSection].carouselImages;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNextImage = () => {
    const images = sections[activeSection].carouselImages;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Zoom functions
  const handleImageClick = (image) => {
    setZoomedImage(image);
    setIsZoomed(true);
    // Prevent body scroll when zoomed
    document.body.style.overflow = 'hidden';
  };

  const handleCloseZoom = () => {
    setIsZoomed(false);
    setZoomedImage(null);
    // Restore body scroll
    document.body.style.overflow = 'auto';
  };

  const currentSection = sections[activeSection];

  return (
    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <div id="documentation" className='bg-gradient-to-b from-[#2e2e2e] to-[rgb(123,123,123)] rounded-lg my-10 mx-5 sm:max-xl:mx-20 xl:mx-30 2xl:mx-80  py-5'>
        
        <div className='flex flex-col gap-5 items-center justify-center'>
          <h1 className='text-3xl font-bold text-white'>Documentation</h1>
          <div className='max-xl:bg-black xl:bg-violet-700 rounded-2xl max-lg:py-0 lg:py-2 px-2
          w-3/4 sm:max-xl:w-3/4 xl:w-auto max-lg:mx-0 lg:mx-15
          max-lg:contain-content 
          overflow-x-scroll lg:overflow-hidden overflow-y-hidden
          max-lg:text-xs '>
            <GooeyNav
              items={items}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={activeSection}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
              onItemClick={handleSectionClick}
            />
          </div>

          {/* Content Section */}
          <div className='bg-white rounded-2xl p-8 w-full sm:max-lg:w-5/6 lg:w-3/4 xl:w-5/6 2xl:w-5/6'>
            <h2 className='max-lg:text-md lg:text-2xl font-bold mb-4'>{currentSection.title}</h2>
            <p className='max-lg:text-sm lg:text-base text-gray-700 mb-6'>{currentSection.content}</p>
            
            {/* PDF Preview */}
            <div className='border-2 border-gray-300 rounded-lg overflow-hidden mb-4'>
              <iframe
                src={`${currentSection.pdfPath}#view=FitH`}
                className='w-full sm:h-50 md:h-94 lg:h-96 xl:h-120 2xl:h-160 '
                title={`${currentSection.title} PDF Preview`}
              />
            </div>

            {/* Open PDF Button */}
            <div className='justify-center flex items-center'>
              <button
                onClick={handleOpenPDF}
                className='max-lg:text-xs lg:text-base inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer'
              >
                Open Full PDF Document
              </button>
            </div>

            {/* Carousel - Only show for Architecture section */}
            {currentSection.carouselImages && (
              <div className='relative w-full mb-6 mt-6'>
                <h3 className='text-xl font-extrabold mb-4 text-gray-800'>Architecture Diagrams</h3>
                <p className='text-sm font-bold text-violet-500 mb-4'>Click on any diagram to zoom in</p>
                
                {/* Carousel Container */}
                <div className='relative overflow-hidden rounded-lg bg-gray-100' style={{ height: '600px' }}>
                  <div 
                    className='flex transition-transform duration-500 ease-in-out h-full'
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {currentSection.carouselImages.map((image, index) => (
                      <div key={index} className='min-w-full h-full flex items-center justify-center'>
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          className='max-w-[100%] max-h-[100%] object-contain rounded-lg cursor-zoom-in hover:opacity-90 transition-opacity'
                          onClick={() => handleImageClick(image)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Previous Button */}
                  <button
                    onClick={goToPreviousImage}
                    className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10'
                    aria-label='Previous image'
                  >
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                    </svg>
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={goToNextImage}
                    className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10'
                    aria-label='Next image'
                  >
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  </button>
                </div>

                {/* Dots Indicator */}
                <div className='flex justify-center gap-2 mt-4'>
                  {currentSection.carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-violet-600 w-8' 
                          : 'bg-gray-400 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Zoom Modal */}
        {isZoomed && zoomedImage && (
          <div 
            className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4'
            onClick={handleCloseZoom}
          >
            <div className='relative max-w-full max-h-full'>
              {/* Close button */}
              <button
                onClick={handleCloseZoom}
                className='absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 z-10'
                aria-label='Close zoom'
              >
                <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
              
              {/* Zoomed image */}
              <img 
                src={zoomedImage.src} 
                alt={zoomedImage.alt}
                className='max-w-full max-h-screen object-contain rounded-lg cursor-zoom-out'
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseZoom();
                }}
              />
              
              {/* Image caption */}
              <p className='text-white text-center mt-4 text-lg'>{zoomedImage.alt}</p>
            </div>
          </div>
        )}
      </div>
    </FadeContent>
  )
}

export default Documentation