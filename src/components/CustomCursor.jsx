// src/components/CustomCursor.jsx
import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const isPointerRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId;

    const updateCursorPosition = (x, y) => {
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    };

    const handleMouseMove = (e) => {
      // Cancel previous animation frame
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      // Use requestAnimationFrame for smooth updates
      rafId = requestAnimationFrame(() => {
        updateCursorPosition(e.clientX, e.clientY);
      });
    };

    const handleMouseOver = (e) => {
      const isClickable = e.target.tagName === 'A' || 
                         e.target.tagName === 'BUTTON' || 
                         e.target.classList.contains('clickable');
      
      if (isClickable !== isPointerRef.current) {
        isPointerRef.current = isClickable;
        if (isClickable) {
          cursor.classList.add('cursor-pointer');
        } else {
          cursor.classList.remove('cursor-pointer');
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return <div ref={cursorRef} className="cursor" />;
};

export default CustomCursor;