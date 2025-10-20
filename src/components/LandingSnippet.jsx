import React from 'react'
import TiltedCard from './TiltedCard'

const LandingSnippet = () => {
  return (
    <div className='flex items-center justify-center'>

        <TiltedCard
        imageSrc="/test-game.jpg"
        altText="UniMaze - Gameplay Snippet"
        captionText="UniMaze - Gameplay Snippet"
        containerHeight="350px"
        containerWidth="970px"
        imageHeight="350px"
        imageWidth="970px"
        rotateAmplitude={12}
        scaleOnHover={1.05}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
            <p className=" text-white text-3xl font-bold pl-10 pt-4 text-shadow-black">
                UniMaze - Gameplay Snippet
            </p>
        }
        />
  
    </div>
  )
}

export default LandingSnippet