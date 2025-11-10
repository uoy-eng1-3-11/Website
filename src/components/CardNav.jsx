import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import ElectricBorder from './ElectricBorder';

/**
 * CardNav
 * - Animated navigation panel with a logo, CTA button, and up to 3 "cards" of links.
 * - Uses GSAP to animate expand/collapse and card entrance.
 * - CTA button triggers a programmatic file download.
 */
const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',          // GSAP easing for animations
  baseColor = '#fff',           // Background color for the nav container
  menuColor,                    // Color for the hamburger icon
  buttonBgColor,                // CTA button background color (inline style overrides class)
  buttonTextColor,              // CTA button text color (inline style)
  // Place the file in /public (e.g., /public/Req1.pdf) so it’s served statically
  downloadUrl = '/Maze-Game-1.0.0.jar',
  // Optional: specify a filename; if empty, browser derives from URL
  downloadFilename = ''
}) => {
  // UI state for hamburger icon and expanded panel
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Tracks if device is small to thin the ElectricBorder
  const [isSmallDevice, setIsSmallDevice] = useState(false);

  // Refs used for GSAP animations
  const navRef = useRef(null);          // The root <nav> element
  const cardsRef = useRef([]);          // Array of card elements to animate
  const tlRef = useRef(null);           // GSAP timeline instance

  /**
   * Detect small devices (<= 768px) and update border thickness responsively.
   */
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const handler = e => setIsSmallDevice(e.matches);
    // Initialize immediately
    handler(mql);
    // Subscribe to changes
    if (mql.addEventListener) mql.addEventListener('change', handler);
    else mql.addListener(handler);
    // Cleanup
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', handler);
      else mql.removeListener(handler);
    };
  }, []);

  /**
   * Programmatic file download for the CTA button.
   * Creates a temporary <a> element with download attribute and clicks it.
   */
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = downloadUrl;
    // If provided, force a filename; otherwise hint download by providing empty attribute
    if (downloadFilename) a.download = downloadFilename;
    else a.setAttribute('download', '');
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  /**
   * Calculates expanded nav height.
   * - On mobile we measure the content to avoid clipping due to overflow hidden during animation.
   * - On desktop we return a fixed height (matches original design).
   */
  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        // Temporarily reveal content to measure height accurately
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';
        // Force reflow then read size
        contentEl.offsetHeight;

        const topBar = 60;     // Height of the top bar (logo/hamburger/CTA)
        const padding = 16;    // Extra spacing
        const contentHeight = contentEl.scrollHeight;

        // Restore original inline styles
        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    // Desktop default height
    return 260;
  };

  /**
   * Builds a paused GSAP timeline that:
   * 1) Expands the nav container height.
   * 2) Staggers in the cards (y/opacity).
   */
  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    // Initial states
    gsap.set(navEl, { height: 60, overflow: 'hidden' }); // collapsed height
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      '-=0.1' // overlap slightly with the height animation
    );
    return tl;
  };

  /**
   * Initialize timeline on mount and when dependencies change.
   */
  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  /**
   * Keep animation responsive to viewport changes.
   * - When expanded: re-measure target height and rebuild timeline at completed state.
   * - When collapsed: just rebuild timeline.
   */
  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1); // jump to end state
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  /**
   * Toggles the menu open/close using the timeline.
   */
  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      // After reverse completes, mark as collapsed for accessibility/layout
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  /**
   * Collects card refs for GSAP stagger animations.
   */
  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container ${className}`}>
      {/* Root nav with animated height */}
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''}`}
        style={{ backgroundColor: baseColor }}
      >
        {/* Top bar: hamburger, logo, CTA */}
        <div className="card-nav-top">
          {/* Hamburger toggle */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor || '#000' }}
          >
            <div className="hamburger-line bg-violet-700!" />
            <div className="hamburger-line bg-violet-700!" />
          </div>

          {/* Logo area */}
          <div className="logo-container flex flex-col items-center">
            <p className='pb-1 text-violet-800 text-4xl font-bold'>🔹UniMaze🔹</p>
            <p className='-mt-3 text-blue-700 font-normal'>by Group 3:11</p>
          </div>

          {/* CTA with electric border; thickness thins on small devices */}
          <ElectricBorder
            color="#7A1EB8"
            speed={2}
            chaos={0.3}
            thickness={isSmallDevice ? 1 : 4}
            style={{ borderRadius: 10 }}
          >
            {/* Programmatic download button */}
            <button
              type="button"
              onClick={handleDownload}
              className="card-nav-cta-button bg-violet-700! hover:bg-violet-900! sm:max-lg:text-sm lg:text-base"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            >
              Download Game
            </button>
            {/*
              Alternative static <a> version (simpler, but less control):
              <a href={downloadUrl} download={downloadFilename || true} className="card-nav-cta-button ...">
                Download Game
              </a>
            */}
          </ElectricBorder>
        </div>

        {/* Expandable card content (first 3 items) */}
        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links overflow-y-auto">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                  >
                    <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
