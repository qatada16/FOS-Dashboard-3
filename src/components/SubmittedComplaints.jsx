import React from 'react';

const SubmittedComplaints = ({ dashboardData }) => {
  return (
    <div className="bg-[#c5e0db] rounded-xl p-2 shadow-lg flex flex-col items-center">
      <div className="flex gap-6 w-full justify-center">
        {/* Card 1 - SUBMITTED */}
        <div className="w-full mt-1 p-4 pt-1 bg-gradient-to-br from-[#61BA84] to-[#3A8D5C] rounded-xl shadow-[0_5px_12px_rgba(0,0,0,0.3)] transition-all duration-400 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] relative overflow-hidden group">
          {/* Title */}
          <div className="flex items-center justify-center mb-0">
            <h3 className="text-white text-2xl font-extrabold uppercase tracking-widest drop-shadow-lg transition-all duration-300 group-hover:text-[#ffa742] text-center">
              SUBMITTED
            </h3>
          </div>

          {/* Stats Container */}
          <div className="flex justify-around items-end mb-2 gap-6">
            {/* Total */}
            <div className="text-center transition-all duration-300 group-hover:scale-110">
              <p className="text-white text-6xl font-extrabold leading-none drop-shadow-lg">
                {dashboardData.metrics.total_submitted}
              </p>
              <p className="text-white/80 text-sm font-semibold mt-2 tracking-wide">TOTAL</p>
            </div>

            {/* Divider */}
            <div className="h-14 w-px bg-white/30 mx-4"></div>

            {/* Today */}
            <div className="text-center transition-all duration-300 group-hover:scale-110">
              <p className="text-[#eb9925] text-5xl font-extrabold leading-none drop-shadow-lg">
                {dashboardData.metrics.today_submitted}
              </p>
              <p className="text-white/80 text-sm font-semibold mt-2 tracking-wide">TODAY</p>
            </div>
          </div>

          {/* Shine effect */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-white/10 via-transparent to-white/10 blur-md pointer-events-none transition-all duration-700 group-hover:opacity-70"></div>

          {/* Decorative dots */}
          <div className="absolute bottom-3 right-3 flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full bg-white/30 transition-all duration-500 group-hover:bg-[#49B16F]/60 animate-bounce`}
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Card 2 - COMPLETED TODAY */}
        <div className="w-full mt-1 p-0 pl-0 pt-1 bg-gradient-to-br from-[#61BA84] to-[#3A8D5C] rounded-xl shadow-[0_5px_12px_rgba(0,0,0,0.3)] transition-all duration-400 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] relative overflow-hidden group">
          {/* Flex Container for Left and Right */}
          <div className="flex items-start justify-between">

            {/* LEFT SIDE: Title + Count in column */}
            <div className="ml-0 flex flex-col items-start gap-2">
              <h3 className="text-white text-2xl pl-0.5 font-extrabold uppercase tracking-widest drop-shadow-lg transition-all duration-300 group-hover:text-[#ffa742] text-left">
                Completed
              </h3>
              <div className="text-left transition-all duration-300 pl-3 group-hover:scale-110">
                <p className="text-white text-5xl font-extrabold leading-none pl-2 drop-shadow-lg">
                  {dashboardData.metrics.today_closed}
                </p>
                <p className="text-white/80 text-sm font-semibold mt-2 pl-1 tracking-wide">TODAY</p>
              </div>
            </div>

            {/* RIGHT SIDE: Lodged By Stats */}
            <div className="m-0 mt-0.5 p-0 space-y-1">
              {Object.entries(
                dashboardData.complaints.last_today_closed.reduce((acc, item) => {
                  acc[item.closed_by] = (acc[item.closed_by] || 0) + 1;
                  return acc;
                }, {})
              ).map(([name, count], i) => (
                <div key={i} className="flex justify-center text-white font-semibold">
                  <span className="font-medium uppercase drop-shadow-lg">• {name === 'cs_account' ? 'CS' : name}</span>
                  <span className="font-semibold drop-shadow-lg">➜ {count}</span>
                </div>
              ))}
            </div>
          </div>


          {/* Shine effect */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-white/10 via-transparent to-white/10 blur-md pointer-events-none transition-all duration-700 group-hover:opacity-70"></div>

          {/* Decorative dots */}
          <div className="absolute bottom-3 right-3 flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full bg-white/30 transition-all duration-500 group-hover:bg-[#fff]/60 animate-bounce`}
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

      </div>

      
      <div className="w-full flex flex-wrap justify-center gap-x-2 gap-y-2 mt-2">
        {dashboardData.complaints.last_today_submitted.length > 0 ? (
          dashboardData.complaints.last_today_submitted.map((complaint, i) => (
            <div
              key={i}
              className="group min-w-[140px] max-w-[180px] pr-0.5 pl-2 rounded-lg border-3 border-[#0F676A]/50 bg-white/5 backdrop-blur-sm flex flex-col transition-all duration-300
              hover:border-[#49B16F] hover:shadow-lg hover:bg-[#284952]/20 hover:scale-[1.08] select-none"
            >
              <div className="font-bold text-1xl text-black">
                {complaint.buyer_name === 'Cheezious_Islamabad' ? 'Cheezious ISL' : complaint.buyer_name}
              </div>
              <div className="text-black font-semibold text-sm">
                {complaint.ticket_number}
              </div>
              <div className="font-bold text-[#1f2021] text-sm">
                {new Date(complaint.date_entry).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        ) : (
          <div className="group min-w-[140px] max-w-[180px] pr-0.5 pl-2 rounded-lg bg-gradient-to-br from-[#0F676A] to-[#083D3F] backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 hover:border-[#49B16F] hover:shadow-lg hover:bg-[#284952]/20 hover:scale-[1.08] select-none">
            <div className="font-bold text-[#F4A73C] uppercase mt-6 mb-2 text-center">
              No complaints submitted today
            </div>
            <div className="text-white font-bold text-center mb-6">
              All clear!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmittedComplaints;