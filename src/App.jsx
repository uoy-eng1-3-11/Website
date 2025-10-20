import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import LandingSnippet from './components/LandingSnippet'
import Documentation from './components/Documentation'
import Features from './components/Features';
import About from './components/About';
import Footer from './components/Footer';


function App() {

  useEffect(() => {
    // Clear hash and scroll to top on page load/refresh
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className='main-bg'>

        <Navbar />
          <div className="pt-35">
            <LandingSnippet  />
            <Features />
            <Documentation />
            <About  />
            <Footer />
          </div>

      </div>
        
  
    </>
  )
}

export default App
