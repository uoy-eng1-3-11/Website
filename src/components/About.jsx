import React, { useEffect, useState } from 'react'
import AnimatedContent from './AnimatedContent'

const About = () => {
  const [copiedEmail, setCopiedEmail] = useState(null);

  const teamMembers = [
    { name: 'Harry Turner', email: 'cbk508@york.ac.uk' },
    { name: 'Arnav Jamidar', email: 'bwj516@york.ac.uk' },
    { name: 'Callum Newton', email: 'cnl533@york.ac.uk' },
    { name: 'Joshua Wainwright', email: 'vgt514@york.ac.uk' },
    { name: 'Daniel Thwaites', email: 'zfk509@york.ac.uk' },
    { name: 'Piotr Koziol', email: 'jmb672@york.ac.uk' },
    { name: 'Sarvesh Sridhar', email: 'qgf510@york.ac.uk' },
    { name: 'Harrison Barrans', email: 'phz516@york.ac.uk' }
  ];

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

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
        <div id="about" className='bg-gradient-to-b from-[rgb(66,82,113)] to-[#2e2e2eb2] rounded-lg mt-10 max-lg:mx-5 lg:mx-30 mb-10 contain-content'>
            <div className='bg-gradient-to-b from-[#318eff5b] to-[#4c3bff5b] py-4'>
                    <h1 className='text-3xl text-white font-bold text-center'>About</h1>
            </div>
            <div style={{ height: '500px', position: 'relative' }} >
                <h1 className='max-lg:text-md lg:text-3xl text-white font-bold pl-10 pt-6'>UniMaze: A brief overview</h1>
                <p className='max-lg:text-xs lg:text-md text-violet-300 font-medium pl-10 pt-4'>⚪️ Based on the University of York's East Campus</p>
                <p className='max-lg:text-xs lg:text-md text-violet-300 font-medium pl-10 pt-2'>⚪️ Built on Java 17 using LibGDX</p>
                <p className='max-lg:text-xs lg:text-md text-violet-300 font-medium pl-10 pt-2'>⚪️ 2D Graphics</p>
                <p className='max-lg:text-xs lg:text-md text-violet-300 font-medium pl-10 pt-2'>⚪️ Smooth mechanics</p>

                <div className='flex flex-row gap-1 items-center pt-9'>
                    <h1 className='max-lg:text-md lg:text-3xl text-white font-bold pl-10 '>Github</h1>
                    <img className='max-lg:size-[20px] lg:size-[30px]' src='/github-icon.png' alt='github'></img>
                </div>
                <button 
                  className='bg-violet-600 text-white max-lg:text-xs lg:text-base font-bold py-2 px-2 rounded ml-10 max-lg:mt-1 lg:mt-4 hover:bg-violet-700 hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'
                  onClick={() => window.open('https://github.com/uoy-eng1-3-11', '_blank')}
                >
                  View Project on GitHub
                </button>

                <h1 className='max-lg:text-md lg:text-3xl text-white font-bold pl-10 pt-9'>Team members</h1>
                <div className='pl-10 pt-4 flex flex-wrap max-lg:gap-x-2 lg:gap-x-4 max-lg:gap-y-2 lg:gap-y-2'>
                  {teamMembers.map((member, index) => (
                    <div key={index} className='relative group inline-block'>
                      <span className='max-lg:text-xs lg:text-md text-violet-300 font-medium cursor-pointer hover:text-violet-100 transition-colors'>
                        {member.name}{index < teamMembers.length - 1 ? ',' : ''}
                      </span>
                      <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none group-hover:pointer-events-auto'>
                        <div className='flex items-center gap-0'>
                          <span>{member.email}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyEmail(member.email);
                            }}
                            className='text-violet-400 hover:text-violet-300 transition-colors hover:cursor-pointer'
                            title='Copy email'
                          >
                            {copiedEmail === member.email ? '✓' : '📋'}
                          </button>
                        </div>
                        <div className='absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800'></div>
                      </div>
                    </div>
                  ))}
                </div>
                </div>
        </div>
    </AnimatedContent>
  )
}

export default About;