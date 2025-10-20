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

  return (
    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <div id="documentation" className='bg-gradient-to-b from-[#2e2e2e] to-[rgb(123,123,123)] rounded-lg my-10 mx-30 py-5'>
        
        <div className='flex flex-col gap-5 items-center justify-center'>
          <h1 className='text-3xl font-bold text-white'>Documentation</h1>
          <div className='bg-violet-700 rounded-2xl p-2'>
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
          <div className='bg-white rounded-2xl p-8 mx-10 w-full max-w-4xl'>
            <h2 className='text-2xl font-bold mb-4'>{sections[activeSection].title}</h2>
            <p className='text-gray-700 mb-6'>{sections[activeSection].content}</p>
            
            {/* PDF Preview */}
            <div className='border-2 border-gray-300 rounded-lg overflow-hidden mb-4'>
              <iframe
                src={`${sections[activeSection].pdfPath}#view=FitH`}
                className='w-full h-96'
                title={`${sections[activeSection].title} PDF Preview`}
              />
            </div>

            {/* Open PDF Button */}
            <a
              href={sections[activeSection].pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className='inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors'
            >
              Open Full PDF Document
            </a>
          </div>
        </div>

      </div>
    </FadeContent>
  )
}

export default Documentation