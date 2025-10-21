import React, { useState, useEffect } from 'react'
import TiltedCard from './TiltedCard'

const LandingSnippet = () => {
  const [containerDimensions, setContainerDimensions] = useState({
    height: '350px',
    width: '970px'
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      
      if (width <= 640) {
        // Mobile
        setContainerDimensions({
          height: '200px',
          width: '100%'
        });
      } else if (width <= 1024) {
        // Tablet
        setContainerDimensions({
          height: '250px',
          width: '100%'
        });
      } else {
        // Desktop
        setContainerDimensions({
          height: '350px',
          width: '970px'
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className='flex items-center justify-center px-4 md:px-6 lg:px-0'>
        <TiltedCard
        imageSrc="/test-game.jpg"
        altText="UniMaze - Gameplay Snippet"
        captionText="UniMaze - Gameplay Snippet"
        containerHeight={containerDimensions.height}
        containerWidth={containerDimensions.width}
        imageHeight="350px"
        imageWidth="970px"
        rotateAmplitude={12}
        scaleOnHover={1.05}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
            <p className="text-white text-3xl md:text-2xl sm:text-xl font-bold pl-10 md:pl-6 sm:pl-4 pt-4 md:pt-3 sm:pt-2 text-shadow-black">
                UniMaze - Gameplay Snippet
            </p>
        }
        />
    </div>
  )
}

export default LandingSnippet