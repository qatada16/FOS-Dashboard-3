import React from 'react';

const RecordingsHeader = ({ 
  lineNumber,
  lastHourCount,
  todayCount,
  lastHourDuration,
  todayDuration
}) => {
  return (
    <div className="w-full flex relative gap-35 pb-2">
      {/* Recordings Card */}
      <div className="flex-1 mt-1 pl-3 pr-1 pt-2 pb-1 bg-gradient-to-br from-[#0F676A] to-[#083D3F] rounded-xl shadow-[0_8px_12px_rgba(0,0,0,0.3)] transition-all duration-400 hover:-translate-y-2 hover:rotate-1 hover:brightness-110 relative overflow-hidden group">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[#CBD5E1] text-2xl font-bold uppercase tracking-wider mb-1">RECORDINGS</h3>

            <div className="space-y-0">
              {/* Last Hour with inline telephone icon */}
              <div className="flex items-end gap-12">
                <div className="transition-all duration-300 group-hover:scale-115">
                  <p className="text-white text-6xl font-bold">{lastHourCount}</p>
                  <p className="text-[#CBD5E1] font-semibold text-sm mt-0">Last Hour</p>
                </div>
                {/* Telephone Icon positioned next to Last Hour */}
                <div className="mb-4 transition-all duration-300 group-hover:scale-115">
                  <svg width="50" height="50" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.77205 2.43918L8.6313 2.06661C9.7077 1.59999 10.9355 2.01162 11.4903 3.0544L12.4116 4.80294C12.9112 5.7411 12.7063 6.89945 11.9041 7.61844L9.78805 9.51944C9.86882 10.1021 10.0778 10.6894 10.415 11.2813C10.7522 11.8732 11.166 12.3835 11.6564 12.8122L14.4999 15.2805C14.9903 15.7092 15.5309 16.0443 16.1217 16.2859C16.7125 16.5275 17.3099 16.6566 17.9139 16.6732L19.6589 16.7244C20.6674 16.7523 21.4769 17.5684 21.4223 18.5769L21.2339 21.5729C21.1692 22.763 20.0567 23.6101 18.9034 23.3121C14.2619 22.0897 9.8468 19.3117 6.51406 14.9789C3.18132 10.6461 1.3952 5.6396 1.68999 1.00372C1.7848 -0.147383 2.83725 -0.885763 3.92048 -0.589942L6.91377 0.226306C7.9223 0.502723 8.6313 1.41076 8.6313 2.43918H7.77205Z" fill="#94A3B8"/>
                    <path d="M17.7071 5.29289C18.0976 5.68342 18.0976 6.31658 17.7071 6.70711L15.2071 9.20711C14.8166 9.59763 14.1834 9.59763 13.7929 9.20711C13.4024 8.81658 13.4024 8.18342 13.7929 7.79289L16.2929 5.29289C16.6834 4.90237 17.3166 4.90237 17.7071 5.29289Z" fill="#94A3B8" fillOpacity="0.8"/>
                    <path d="M21.7071 9.29289C22.0976 9.68342 22.0976 10.3166 21.7071 10.7071L19.2071 13.2071C18.8166 13.5976 18.1834 13.5976 17.7929 13.2071C17.4024 12.8166 17.4024 12.1834 17.7929 11.7929L20.2929 9.29289C20.6834 8.90237 21.3166 8.90237 21.7071 9.29289Z" fill="#94A3B8" fillOpacity="0.8"/>
                  </svg>
                </div>
              </div>

              {/* Today */}
              <div className="pt-0 mt-0">
                <p className="text-[#F4A73C] ml-2 text-3xl font-bold">{todayCount}</p>
                <p className="text-[#CBD5E1] font-semibold text-sm mt-0 pt-0">Today</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 -left-[65%] w-1/2 h-full bg-white/15 skew-x-[-20deg] pointer-events-none transition-all duration-700 group-hover:left-[115%]"></div>
      </div>

      {/* Line Number Bubble */}
      <div className="absolute left-1/2 -translate-x-1/2 top-8 w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-[0_5px_10px_rgba(0,0,0,0.5)] z-10 transition-all duration-300 hover:scale-120 hover:shadow-[0_5px_10px_rgba(0,0,0,0.5)] bg-gradient-to-br from-[#F4A73C] to-[#F97316] hover:from-[#0F676A] hover:to-[#083D3F]">
        <p className="text-white text-5xl font-bold">{lineNumber}</p>
      </div>

      {/* Duration Card */}
      <div className="flex-1 mt-1 pl-3 pr-1 pt-2 pb-1 bg-gradient-to-br from-[#0F676A] to-[#083D3F] rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-400 hover:-translate-y-2 hover:-rotate-1 hover:brightness-110 relative overflow-hidden group">
        <h3 className="text-[#CBD5E1] text-2xl font-bold uppercase tracking-wider mb-1">DURATION</h3>

        <div className="flex justify-between items-start">
            <div className="space-y-0">
            {/* Last Hour */}
            <div className="transition-all duration-300 group-hover:scale-115">
                <div className="flex items-end gap-1">
                <p className="text-white text-5xl font-bold">
                    {lastHourDuration.split('M')[0] + 'M'}
                </p>
                <p className="text-white text-3xl font-bold">
                    {lastHourDuration.split('M')[1]}
                </p>
                </div>
                <p className="text-[#CBD5E1] text-sm mt-0 font-semibold">Last Hour</p>
            </div>

            {/* Today */}
            <div className="pt-0">
                <div className="flex items-end gap-1">
                <p className="text-[#F4A73C] text-3xl font-bold">
                    {todayDuration.split('M')[0] + 'M'}
                </p>
                <p className="text-[#F4A73C] text-2xl font-bold">
                    {todayDuration.split('M')[1]}
                </p>
                </div>
                <p className="text-[#CBD5E1] text-sm mt-0 pt-0 font-semibold">Today</p>
            </div>
            </div>

            {/* Stopwatch Icon positioned at the right side */}
            <div className="mb-1 transition-all duration-300 group-hover:scale-110">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="#94A3B8"/>
                <path d="M12 7V12L15 15" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17 5L19 3" stroke="#94A3B8" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 1V3" stroke="#94A3B8" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            </div>
        </div>

        <div className="absolute top-0 left-[110%] w-1/2 h-full bg-white/15 skew-x-[20deg] pointer-events-none transition-all duration-700 group-hover:-translate-x-[350%]"></div>
        </div>
    </div>
  );
};

export default RecordingsHeader;