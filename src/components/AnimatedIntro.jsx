import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedIntro = () => {
  const logoRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // Dynamically fetch the EXACT pixel location of the real header logo!
    // Since App.jsx pre-mounts <Header /> behind the scenes, this element already exists.
    const realLogo = document.querySelector('.real-header-logo');
    let targetX = 0;
    let targetY = 0;
    let targetScale = 1;

    if (realLogo) {
      const rect = realLogo.getBoundingClientRect();
      targetX = rect.left + (rect.width / 2);
      targetY = rect.top + (rect.height / 2);
      targetScale = rect.height / 80; // Scale relative to our starting 80px
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // 1. Logo travels globally to the Header position (1.5s duration)
      tl.fromTo(logoRef.current, {
        position: 'fixed',
        top: 'calc(50vh - 49px)',
        left: '50vw',
        xPercent: -50,
        yPercent: -50,
        scale: 1, 
        rotationZ: 0
      }, {
        top: targetY,
        left: targetX,
        scale: targetScale,
        rotationZ: 720,
        duration: 1.5,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.to(logoRef.current, { opacity: 0, duration: 0.1 });
          gsap.to(".real-header-logo", { opacity: 1, duration: 0.1 });
        }
      }, 0);

      // 2. Fade out the completely opaque black barrier HALFWAY through the animation
      // This seamlessly reveals the pre-loaded landing page underneath as the logo arrives.
      tl.to(bgRef.current, {
        opacity: 0,
        duration: 0.75, // Fades over the last 0.75 seconds of the logo's travel
        ease: "power2.inOut"
      }, 0.75); // Start at the 0.75s mark
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div 
        ref={bgRef}
        style={{ position: 'fixed', zIndex: 99998, pointerEvents: 'none', inset: 0, backgroundColor: '#0b0b0b' }} 
      />

      <div style={{ position: 'fixed', zIndex: 99999, pointerEvents: 'none', inset: 0 }}>
        {/* 
          CRITICAL: Hardcode the initial centered styles into the DOM. 
          This prevents the 1-frame disappearance before React/GSAP paints the effect.
        */}
        <img 
          ref={logoRef}
          src="/title.png"
          alt="Intro Logo"
          style={{
            position: 'fixed',
            top: 'calc(50vh - 49px)',
            left: '50vw',
            transform: 'translate(-50%, -50%)',
            height: '80px',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 15px rgba(68, 160, 44, 0.4))'
          }}
        />
      </div>
    </>
  );
};

export default AnimatedIntro;
