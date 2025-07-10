import React from 'react';
import { FaHourglassHalf } from 'react-icons/fa';

const RecordingsList = ({ recordings }) => {
  return (
    <div className="w-full flex flex-wrap justify-center gap-4 mt-4">
      {recordings.length > 0 ? (
        recordings.map((recording) => (
          <div 
            key={recording.id} 
            className="p-1 rounded-lg border-3 border-[#0F676A]/50 bg-white/5 backdrop-blur-sm flex flex-col gap-1 min-w-0 transition-all duration-300 hover:border-[#49B16F] hover:shadow-lg hover:bg-[#284952]/20 hover:scale-[1.08] group select-none"
          >
            {/* First line - Direction icon and duration */}
            <div className="flex justify-center items-center gap-2">
              {recording.direction === 'Out' ? (
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="group-hover:scale-110 transition-transform"
                >
                  <path 
                    d="M7 17L17 7M17 7H7M17 7V17" 
                    stroke="#EF4444" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="group-hover:scale-110 transition-transform"
                >
                  <path 
                    d="M17 7L7 17M7 17V7M7 17H17" 
                    stroke="#10B981" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <span className="text-[#1E293B] text-lg font-bold group-hover:text-[#0F676A]">
                {recording.duration}
              </span>
            </div>
            
            {/* Second line - Time */}
            <div className="flex items-center justify-center gap-1 text-[#1E293B] font-semibold group-hover:text-[#0F676A]">
              <span className="text-lg">🕝</span>
              <span className="text-m font-semibold">
                {recording.time.toString().padStart(11, '0')}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="p-3 rounded-lg border-2 border-[#0F676A]/50 bg-white/5 backdrop-blur-sm text-center text-[#1E293B] font-bold transition-all duration-300 hover:border-[#49B16F] hover:shadow-lg hover:bg-[#0F676A]/20 hover:scale-[1.02] hover:text-[#0F676A]">
          No Last Hour Recordings found
        </div>
      )}
    </div>
  );
};

export default RecordingsList;