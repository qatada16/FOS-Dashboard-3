import React from 'react';

const RecordingsHeader = ({ 
  lineNumber,
  lastHourCount,
  todayCount,
  lastHourDuration,
  todayDuration
}) => {
  return (
    <div className="w-full flex gap-30 pb-2 bg-gradient-to-br from-[#0F676A] to-[#083D3F] rounded-xl shadow-[0_8px_12px_rgba(0,0,0,0.3)] transition-all duration-400 hover:-translate-y-2 hover:rotate-1 hover:brightness-110 relative overflow-hidden group">
      {/* Recordings Card */}
      <div className="flex-1 mt-1 pl-3 pr-1 pt-2 pb-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[#CBD5E1] text-2xl font-bold uppercase tracking-wider mb-1">RECORDINGS</h3>

            <div className="space-y-0">
              {/* Last Hour */}
              <div className="flex items-end gap-12">
                <div className="transition-all duration-300 group-hover:scale-115">
                  <p className="text-white text-6xl ml-2 font-bold">{lastHourCount}</p>
                  <p className="text-[#CBD5E1] font-semibold text-sm mt-0">Last Hour</p>
                </div>
                
                 <div className="pt-0 mt-0">
                <p className="text-[#F4A73C] ml-1 text-3xl font-bold">{todayCount}</p>
                <p className="text-[#CBD5E1] font-semibold text-sm mt-0 pt-0">Today</p>
              </div>
              </div>  

            </div>
          </div>
        </div>

        <div className="absolute top-0 -left-[65%] w-1/2 h-full bg-white/15 skew-x-[-20deg] pointer-events-none transition-all duration-700 group-hover:left-[115%]"></div>
      </div>

      {/* Line Number Bubble */}
      <div className="absolute left-[40%] top-5 w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-[0_5px_10px_rgba(0,0,0,0.5)] z-10 transition-all duration-300 hover:scale-120 hover:shadow-[0_5px_10px_rgba(0,0,0,0.5)] bg-gradient-to-br from-[#F4A73C] to-[#F97316] hover:from-[#0F676A] hover:to-[#083D3F]">
        <p className="text-white text-5xl font-bold">{lineNumber}</p>
      </div>


      {/* Duration Card */}
      <div className="flex-1 mt-1 pl-3 pr-0 pt-2 pb-1">
        <h3 className="text-[#CBD5E1] text-2xl font-bold uppercase tracking-wider mb-1">DURATION</h3>

        <div className="flex justify-between items-start">
          {/* Last Hour and Today side by side */}
          <div className="flex items-end gap-2">
            
            {/* Last Hour */}
            <div className="transition-all duration-300 group-hover:scale-115">
              <div className="flex items-center gap-0">
                <p className="text-white text-5xl font-bold">
                  {lastHourDuration.split('M')[0] + 'M'}
                </p>
                {!todayDuration.includes('H') && (
                  <p className="text-white text-3xl mt-2 font-bold">
                    {lastHourDuration.split('M')[1]}
                  </p>
                )}
              </div>
              <p className="text-[#CBD5E1] text-sm mt-0 font-semibold">Last Hour</p>
            </div>

            {/* Today */}
            <div className="pt-0 mt-0 items-center">
              <div className="flex items-center gap-1">
                <p className="text-[#F4A73C] text-3xl font-bold">
                  {todayDuration.split('M')[0] + 'M'}
                </p>
                {!todayDuration.includes('H') && (
                  <p className="text-[#F4A73C] text-2xl font-bold">
                    {todayDuration.split('M')[1]}
                  </p>
                )}

              </div>
              <p className="text-[#CBD5E1] text-sm mt-0 pt-0 font-semibold">Today</p>
            </div>

          </div>
        </div>

        <div className="absolute top-0 left-[110%] w-1/2 h-full bg-white/15 skew-x-[20deg] pointer-events-none transition-all duration-700 group-hover:-translate-x-[350%]"></div>
      </div>

    </div>
  );
};

export default RecordingsHeader;