import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, MapPin, Calendar, Terminal, Code } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Snap-to-Release Horizontal Journey.
 * This version releases the scroll INSTANTLY once the last card is fully in view.
 * No trailing black space. No disappearance required.
 */
const ScrollTimeline = ({
  events,
  title,
  subtitle,
  className = "",
}) => {
  const componentRef = useRef(null);
  const sliderRef = useRef(null);
  const triggerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Get the actual width of all cards combined
      const cards = sliderRef.current.children;
      const lastCard = cards[cards.length - 1];
      
      // Calculate how far we need to scroll so that the last card is fully visible.
      // Distance = Total Width of Slider - Window Width
      const totalWidth = sliderRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollDistance = totalWidth - windowWidth;

      if (scrollDistance <= 0) return;

      gsap.to(sliderRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 0.5, // Faster scrubbing for snappier feel
          start: "top top",
          // The duration of the pin is EXACTLY the distance of the scroll
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
          onLeave: () => {
             // Optional: ensure everything is perfectly aligned on exit
          }
        }
      });
    }, componentRef);

    return () => ctx.revert();
  }, [events]);

  return (
    <div ref={componentRef} className={`w-full overflow-hidden ${className}`}>
      <div 
        ref={triggerRef} 
        className="h-screen bg-[#050505] relative flex flex-col overflow-hidden"
      >
        
        {/* Subtle Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
           <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#44a02c] rounded-full blur-[80px]" />
        </div>

        {/* 1. Header Area */}
        <div className="relative z-30 pt-16 px-8 md:px-24 flex flex-col items-start flex-shrink-0">
             <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-[1px] bg-[#44a02c]" />
                <span className="text-[#44a02c] font-black tracking-[0.4em] text-[9px] uppercase">LOG_0x2AF</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">
                {title}
             </h2>
        </div>

        {/* 2. Main Slider Track */}
        <div className="relative flex-grow flex items-center z-10">
            {/* 
                CRITICAL: We remove any spacer/padding from the END of this track.
                The scrollDistance will stop exactly when the last child hits the edge.
            */}
            <div 
              ref={sliderRef} 
              className="flex flex-nowrap items-center h-full"
              style={{ width: "max-content" }}
            >
              {/* Only Lead-in Padding (to center the first card) */}
              <div className="w-[10vw] flex-shrink-0" />

              {events.map((event, index) => (
                <div 
                    key={index} 
                    className="w-[80vw] md:w-[50vw] lg:w-[550px] h-[50vh] md:h-[420px] flex-shrink-0 px-3 md:px-6"
                >
                  <div className="group relative bg-[#0b0b0b] border border-white/5 p-6 md:p-10 lg:p-10 rounded-[1.5rem] shadow-xl transition-all duration-300 hover:border-[#44a02c33] h-full flex flex-col justify-between">
                        <div>
                          <div className="absolute top-6 right-8 text-3xl font-black text-white/[0.02] italic select-none">
                             {index + 1}
                          </div>

                          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-6">
                             <div className="flex items-center gap-3">
                                <span className="text-2xl md:text-3xl font-black text-[#44a02c] italic">{event.year}</span>
                             </div>
                             <span className="text-[8px] font-bold text-white/10 tracking-[0.2em] uppercase hidden md:block">
                                {event.subtitle}
                             </span>
                          </div>

                          <div className="space-y-3">
                              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight uppercase group-hover:text-[#44a02c] transition-colors duration-500">
                                 {event.title}
                              </h3>
                              <p className="text-gray-400 text-sm md:text-base lg:text-base leading-relaxed font-light italic opacity-70 group-hover:opacity-100 transition-opacity">
                                 "{event.description}"
                              </p>
                          </div>
                        </div>

                        {/* Bottom Tag */}
                        <div className="mt-auto pt-6 flex items-center gap-2">
                             <div className="w-1 h-1 rounded-full bg-[#44a02c33]" />
                             <span className="text-[7px] font-bold text-[#44a02c33] uppercase spacing-widest">{event.subtitle} // VERIFIED</span>
                        </div>
                  </div>
                </div>
              ))}

              {/* 
                 IMPORTANT: NO SPACER HERE. 
                 The moment the last card's right edge touches the screen edge, the scroll ends.
              */}
            </div>
        </div>

        {/* 3. Footer Area */}
        <div className="relative z-30 pb-12 px-8 md:px-24 flex items-center justify-between gap-8 flex-shrink-0">
             <div className="flex items-center gap-4">
                <span className="text-[9px] font-black text-[#44a02c] tracking-[0.5em] uppercase opacity-40">READY_FOR_NEXT_PHASE</span>
                <div className="w-24 h-[1px] bg-[#44a02c] opacity-20" />
             </div>
             <div className="flex items-center gap-4 text-[#44a02c] text-[9px] font-black tracking-widest animate-pulse">
                <span>EXIT_SCROLL</span>
                <div className="text-xs">↓</div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default ScrollTimeline;