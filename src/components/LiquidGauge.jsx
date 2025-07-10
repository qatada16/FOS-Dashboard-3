// import { useEffect, useRef, useState } from 'react';
// import './LiquidGauge.css';

// const LiquidGauge = ({ value, max, label }) => {
//   const [displayValue, setDisplayValue] = useState(0);
//   const waveRef = useRef(null);
//   const percentage = Math.min((value / max) * 100, 100);

//   // Light green color scheme
//   const getColor = (percent) => {
//     // Different shades of light green based on percentage
//     if (percent < 30) return '#a3e635'; // Bright lime green
//     if (percent < 70) return '#84cc16'; // Medium lime green
//     return '#65a30d';  // Darker lime green
//   };

//   // Animate value change
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setDisplayValue(prev => {
//         const diff = value - prev;
//         return diff > 0 ? Math.min(prev + Math.ceil(diff/10), value) : 
//                diff < 0 ? Math.max(prev + Math.floor(diff/10), value) : 
//                value;
//       });
//     }, 30);
//     return () => clearInterval(timer);
//   }, [value]);

//   // Wave animation
//   useEffect(() => {
//     if (!waveRef.current) return;
    
//     let frame;
//     let offset = 0;
    
//     const animateWave = () => {
//       offset += 0.5;
//       waveRef.current.style.transform = `translateX(${offset}px)`;
//       frame = requestAnimationFrame(animateWave);
//     };
    
//     animateWave();
//     return () => cancelAnimationFrame(frame);
//   }, []);

//   return (
//     <div className="liquid-gauge-container">
//       <div className="gauge-label">{label}</div>
      
//       <div className="liquid-gauge">
//         {/* Liquid fill with wave effect */}
//         <div 
//           className="liquid-fill"
//           style={{ 
//             height: `${(displayValue / max) * 100}%`,
//             background: `linear-gradient(to top, 
//               ${getColor(percentage)}, 
//               ${lightenColor(getColor(percentage), 30)})` // 30% lighter
//           }}
//         >
//           <div ref={waveRef} className="liquid-wave"></div>
//         </div>
        
//         {/* Gauge outline */}
//         <div className="gauge-outline"></div>
        
//         {/* Center value display */}
//         <div className="gauge-value">{displayValue}</div>
//       </div>
//     </div>
//   );
// };

// // Helper function to lighten colors
// function lightenColor(color, percent) {
//   const num = parseInt(color.replace('#', ''), 16);
//   const amt = Math.round(2.55 * percent);
//   const R = (num >> 16) + amt;
//   const G = (num >> 8 & 0x00FF) + amt;
//   const B = (num & 0x0000FF) + amt;
//   return `#${(
//     0x1000000 +
//     (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
//     (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
//     (B < 255 ? B < 1 ? 0 : B : 255)
//   ).toString(16).slice(1)}`;
// }

// export default LiquidGauge;


import { useEffect, useRef, useState } from 'react';
import './LiquidGauge.css';
import React from 'react'

const LiquidGauge = ({ value, max, label }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const waveRef = useRef(null);
  const percentage = Math.min((value / max) * 100, 100);

  // Light green color scheme
  const getColor = (percent) => {
    if (percent < 30) return '#a3e635';
    if (percent < 70) return '#84cc16';
    return '#65a30d';
  };

  // Animate value change
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayValue(prev => {
        const diff = value - prev;
        return diff > 0 ? Math.min(prev + Math.ceil(diff/10), value) : 
               diff < 0 ? Math.max(prev + Math.floor(diff/10), value) : 
               value;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  // Wave animation
  useEffect(() => {
    if (!waveRef.current) return;
    
    let frame;
    let offset = 0;
    
    const animateWave = () => {
      offset += 0.5;
      waveRef.current.style.transform = `translateY(${offset}px)`;
      frame = requestAnimationFrame(animateWave);
    };
    
    animateWave();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="liquid-gauge-container">
      <div className="gauge-label">{label}</div>
      
      <div className="liquid-gauge">
        {/* Liquid fill with wave effect */}
        <div 
          className="liquid-fill"
          style={{ 
            width: `${(displayValue / max) * 100}%`,
            background: `linear-gradient(to right, 
              ${getColor(percentage)}, 
              ${lightenColor(getColor(percentage), 30)})`
          }}
        >
          <div ref={waveRef} className="liquid-wave"></div>
        </div>
        
        {/* Gauge outline */}
        <div className="gauge-outline"></div>
        
        {/* Center value display */}
        <div className="gauge-value">{displayValue}</div>
      </div>
    </div>
  );
};

// Helper function to lighten colors
function lightenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return `#${(
    0x1000000 +
    (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)
  ).toString(16).slice(1)}`;
}

export default LiquidGauge;