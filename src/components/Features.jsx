import React, { useEffect } from 'react'
import CardSwap, { Card } from './CardSwap'
import AnimatedContent from './AnimatedContent'

const Features = () => {

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
        <div id="features" className='bg-gradient-to-b from-[#2e2e2eb2] to-[rgb(66,82,113)] rounded-lg my-10 mx-30 pb-5 contain-content'>
            <div className='bg-gradient-to-b from-[#318eff5b] to-[#4c3bff5b] py-4'>
                    <h1 className='text-3xl text-white font-bold text-center'>Features</h1>
            </div>
            <div style={{ height: '500px', position: 'relative' }} >
                <h1 className='text-3xl text-white font-bold pl-10 pt-4'>🧩Maze</h1>
                <p className='text-md text-violet-300 font-medium pl-10 pt-4'>Explore the vast maze based on the University of York's East Campus</p>
                <p className='text-md text-violet-300 font-medium pl-10 pt-2'>Where the seasons change and the paths intertwine</p>
                <p className='text-md text-violet-300 font-medium pl-10 pt-2'>Escape from professors and find your way to freedom</p>
                <p className='text-md text-violet-300 font-medium pl-10 pt-2'>Stumble upon hidden events and surprises</p>

                <h1 className='text-3xl text-white font-bold pl-10 pt-6'>💥Events</h1>
                <p className='text-md text-violet-300 font-medium pl-10 pt-4'>Challenge is what excites!</p>
                <p className='text-md text-violet-300 font-medium pl-10 pt-2'>Earn rewards by successfully completing events</p>
                <p className='text-md text-violet-300 font-medium pl-10 pt-2'>The stakes are high! Don't miss out on the fun</p>

                <h1 className='text-3xl text-white font-bold pl-10 pt-6'>✅Halfway Checkpoint</h1>
                <p className='text-md text-violet-300 font-medium pl-10 pt-4'>Have to leave the game abruptly?</p>
                <p className='text-md text-violet-300 font-medium pl-10 pt-2'>Don't worry! Your progress is saved halfway through.</p>

                <CardSwap
                    cardDistance={60}
                    verticalDistance={70}
                    delay={5000}
                    pauseOnHover={false}
                >
                    <Card>
                        <h3 className='text-white font-bold text-2xl pl-4 py-2'>Maze</h3>
                        <img src='/test-game.jpg' alt='Maze part 1' />
                    </Card>
                    <Card>
                        <h3 className='text-white font-bold text-2xl pl-4 py-2'>Events</h3>
                        <img src='/test-game.jpg' alt='Maze part 2' />
                    </Card>
                    <Card>
                        <h3 className='text-white font-bold text-2xl pl-4 py-2'>Checkpoint</h3>
                        <img src='/test-game.jpg' alt='Maze part 3' />
                    </Card>
                </CardSwap>
                </div>
        </div>
    </AnimatedContent>
  )
}

export default Features