import React, { useState, useEffect } from 'react'

const WeekPlan = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { src: '/weeklyplan-sheet.png', alt: 'Week Plan 1' },
    { src: '/weeklyplan-sheet.png', alt: 'Week Plan 2' }
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div id='weekly-plan' className='bg-gradient-to-b from-[rgb(123,123,123)] to-[#2e2e2e] rounded-lg 
                    my-10 mx-5 sm:max-xl:mx-20 xl:mx-30 2xl:mx-80
                    flex flex-col items-center justify-center py-8 px-4'>
        <h1 className="text-3xl font-bold text-white mb-6">Weekly Plan</h1>
        
        <div className='relative w-full max-w-4xl'>
            {/* Carousel Container */}
            <div className='relative overflow-hidden rounded-lg'>
                <div 
                    className='flex transition-transform duration-500 ease-in-out'
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div key={index} className='min-w-full'>
                            <img 
                                src={image.src} 
                                alt={image.alt}
                                className='w-full h-auto object-cover rounded-lg'
                            />
                        </div>
                    ))}
                </div>

                {/* Previous Button */}
                <button
                    onClick={goToPrevious}
                    className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110'
                    aria-label='Previous slide'
                >
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                    </svg>
                </button>

                {/* Next Button */}
                <button
                    onClick={goToNext}
                    className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110'
                    aria-label='Next slide'
                >
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                </button>
            </div>

            {/* Dots Indicator */}
            <div className='flex justify-center gap-2 mt-4'>
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                                ? 'bg-violet-500 w-8' 
                                : 'bg-gray-400 hover:bg-gray-300'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default WeekPlan