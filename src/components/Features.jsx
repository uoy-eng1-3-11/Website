import React, { useEffect } from 'react'
import CardSwap, { Card } from './CardSwap'

const Features = () => {

  return (
    <div id="features" className='bg-gradient-to-b from-[#5757575b] to-[rgb(123,123,123)] rounded-lg my-10 mx-30 pb-5 contain-content'>
        <div className='bg-gradient-to-b from-[#318eff5b] to-[#4c3bff5b] py-4'>
                <h1 className='text-3xl text-white font-bold pl-10'>Features</h1>
        </div>
        <div style={{ height: '500px', position: 'relative' }} >
            <h1 className='text-3xl text-white font-bold pl-10 pt-3'>Mazes</h1>
            <p className='text-md text-violet-300 font-medium pl-10 pt-2'>Explore the vast maze based on the University of York's East Campus</p>
            <CardSwap
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={false}
            >
                <Card>
                    <h3 className='text-white font-bold text-2xl pl-4 py-2'>Maze part 1</h3>
                    <img src='/test-game.jpg' alt='Maze part 1' />
                </Card>
                <Card>
                    <h3 className='text-white font-bold text-2xl pl-4 py-2'>Maze part 2</h3>
                    <img src='/test-game.jpg' alt='Maze part 2' />
                </Card>
                <Card>
                    <h3 className='text-white font-bold text-2xl pl-4 py-2'>Maze part 3</h3>
                    <img src='/test-game.jpg' alt='Maze part 3' />
                </Card>
            </CardSwap>
            </div>
    </div>
  )
}

export default Features