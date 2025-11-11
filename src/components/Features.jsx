import React, { useEffect, useState } from 'react'
import CardSwap, { Card } from './CardSwap'
import AnimatedContent from './AnimatedContent'

const Features = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
        // Method 1: Check screen width
        const screenWidth = window.innerWidth <= 640;
        
        // Method 2: Check user agent (more reliable for actual mobile devices)
        const userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Combine both checks
        setIsMobile(screenWidth || userAgent);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return (
        <AnimatedContent
            distance={10}
            direction="vertical"
            reverse={false}
            duration={1.0}
            ease="power3.out"
            initialOpacity={0.2}
            animateOpacity
            scale={0.9}
            threshold={0.2}
            delay={0.15}
            >
            <div id="features" className='bg-gradient-to-b from-[#2e2e2eb2] to-[rgb(66,82,113)] rounded-lg my-10 mx-5 sm:mx-20 md:mx-30 lg:mx-40 xl:mx-30 2xl:mx-80 sm:max-lg:pb-0 lg:pb-5 contain-content'>
                <div className='bg-gradient-to-b from-[#318eff5b] to-[#4c3bff5b] py-4'>
                        <h1 className='text-3xl text-white font-bold text-center'>Features</h1>
                </div>
                <div className='' style={{ height: '500px', position: 'relative' }} >
                    <h1 className='text-3xl text-white font-bold pl-10 max-sm:pl-5 pt-4 max-sm:text-xl'>Maze</h1>
                    <p className='text-md text-violet-300 font-medium pl-10 max-sm:pl-5 pt-4 max-sm:text-xs'>🔸Tile by tile movement</p>
                    <p className='text-md text-violet-300 font-medium pl-10 max-sm:pl-5 pt-2 max-sm:text-xs'>🔸Collision animation</p>
                    <p className='text-md text-violet-300 font-medium pl-10 max-sm:pl-5 pt-2 max-sm:text-xs'>🔸Scripted tiles for events</p>
                    <p className='text-md text-violet-300 font-medium pl-10 max-sm:pl-5 pt-2 max-sm:text-xs'>🔸Inventory system</p>

                    <h1 className='text-3xl text-white font-bold pl-10  max-sm:pl-5 pt-6 max-sm:text-xl'>Events</h1>
                    <p className='text-md text-violet-300 font-medium pl-10 max-sm:pl-5 pt-4 max-sm:text-xs'>🔸Items that give speed buff/debuff</p>
                    <p className='text-md text-violet-300 font-medium pl-10 max-sm:pl-5 pt-2 max-sm:text-xs'>🔸Talking UI for NPCs</p>
                    <p className='text-md text-violet-300 font-medium pl-10 max-sm:pl-5 pt-2 max-sm:text-xs'>🔸Easy expandability</p>

                    <h1 className='text-3xl text-white font-bold pl-10 max-sm:pl-5 pt-6 max-sm:text-xl'>High Quality Code</h1>
                    <p className='text-md text-violet-300 font-medium pl-10 max-sm:pl-5 pt-4 max-sm:text-xs'>🔸Adopting a new codebase seems daunting? Don't worry! </p>
                    <p className='text-md text-violet-300 font-medium pl-10 max-sm:pl-5 pt-2 max-sm:text-xs'>🔸Our code is well-documented, scalable and easy to understand.</p>

                    {!isMobile && (
                    <div className='absolute top-5/6 left-11/12 transform -translate-x-1/2 -translate-y-1/2'>
                        <CardSwap
                            cardDistance={60}
                            verticalDistance={70}
                            delay={5000}
                            pauseOnHover={false}
                        >
                            <Card>
                                <h3 className='text-white font-bold text-2xl pl-4 py-2'>Maze</h3>
                                <img className='w-[400px] h-[350px] rounded-b-xl' src='/End-Tile.png' alt='Maze part 1' />
                            </Card>
                            <Card>
                                <h3 className='text-white font-bold text-2xl pl-4 py-2'>Events</h3>
                                <img className='w-[400px] h-[350px] rounded-b-xl' src='/Moving-Quicker.png' alt='Maze part 2' />
                            </Card>
                            <Card>
                                <h3 className='text-white font-bold text-2xl pl-4 py-2'>Clean Code</h3>
                                <img className='w-[400px] h-[350px] rounded-b-xl' src='/code.png' alt='Maze part 3' />
                            </Card>
                        </CardSwap>
                    </div>
                    )}
                </div>
            </div>
        </AnimatedContent>
    )
}

export default Features