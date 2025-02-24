import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ 
  children, 
  content,
  position = 'top',
  delay = 0.3,
  offset = 8,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  let timeoutId = null;

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case 'bottom':
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.bottom + offset;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - offset;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        break;
      case 'right':
        x = triggerRect.right + offset;
        y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        break;
      default:
        x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.top - tooltipRect.height - offset;
    }

    // Adjust for scroll
    x += window.scrollX;
    y += window.scrollY;

    // Keep tooltip within viewport
    x = Math.max(offset, Math.min(x, window.innerWidth - tooltipRect.width - offset));
    y = Math.max(offset, Math.min(y, window.innerHeight - tooltipRect.height - offset));

    setCoords({ x, y });
  };

  const handleMouseEnter = () => {
    timeoutId = setTimeout(() => {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updatePosition();
        });
      });
    }, delay * 1000);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible, content]);

  useEffect(() => {
    if (!isVisible) return;

    const handleUpdate = () => {
      if (isVisible) {
        updatePosition();
      }
    };

    window.addEventListener('scroll', handleUpdate);
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [isVisible]);

  const getArrowClass = () => {
    switch (position) {
      case 'top': return 'bottom-0 translate-y-full';
      case 'bottom': return 'top-0 -translate-y-full rotate-180';
      case 'left': return 'right-0 translate-x-full rotate-90';
      case 'right': return 'left-0 -translate-x-full -rotate-90';
      default: return 'bottom-0 translate-y-full';
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              left: coords.x,
              top: coords.y,
              zIndex: 50,
            }}
            className={`pointer-events-none ${className}`}
          >
            <div className="relative bg-gray-900 text-white text-sm py-1.5 px-3 rounded-lg shadow-lg">
              {content}
              <div
                className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${getArrowClass()}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tooltip;