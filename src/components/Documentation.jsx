import React, { useState, useEffect } from 'react'
import GooeyNav from './GooeyNav';
import FadeContent from './FadeContent';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState(0);

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
      pdfPath: "/Req1.pdf"
    },
    {
      id: "method",
      title: "Method Selection and Planning",
      content: "Here is the method selection documentation...",
      pdfPath: "/Req1.pdf"
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
      pdfPath: "/Req1.pdf"
    }
  ];

  // Listen for hash changes and update active section
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const index = sections.findIndex(section => section.id === hash);
      if (index !== -1) {
        setActiveSection(index);
        // Scroll to documentation section
        document.getElementById('documentation')?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    handleHashChange(); // Check on mount
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSectionClick = (index) => {
    setActiveSection(index);
    window.history.pushState(null, '', `#${sections[index].id}`);
  };

  const handleOpenPDF = (e) => {
    e.preventDefault();
    const pdfUrl = sections[activeSection].pdfPath;
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

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
            <h2 className='max-lg:text-md lg:text-2xl font-bold mb-4'>{sections[activeSection].title}</h2>
            <p className='max-lg:text-sm lg:text-base text-gray-700 mb-6'>{sections[activeSection].content}</p>
            
            {/* PDF Preview */}
            <div className='border-2 border-gray-300 rounded-lg overflow-hidden mb-4'>
              <iframe
                src={`${sections[activeSection].pdfPath}#view=FitH`}
                className='w-full h-120'
                title={`${sections[activeSection].title} PDF Preview`}
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
          </div>
        </div>

      </div>
    </FadeContent>
  )
}

export default Documentation