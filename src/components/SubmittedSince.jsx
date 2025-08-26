import React from 'react';

const SubmittedSince = ({ lastSubmittedComplaints, most5LaunchesLastWeek, most5Closed }) => {
  return (
    <div className="bg-[#c5e0db] rounded-xl p-2 shadow-lg flex flex-col items-center">
      <div className="w-full mt-1 p-2 pt-1 bg-gradient-to-br from-[#61BA84] to-[#3A8D5C] rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all duration-400 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] relative overflow-hidden group">
        {/* Title */}
        <div className="flex items-center justify-center mb-2">
          <h3 className="text-white text-2xl font-extrabold uppercase tracking-widest drop-shadow-lg transition-all duration-300 group-hover:text-[#ffa742] text-center">
            Last SUBMITTED SINCE
          </h3>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 w-full">
          {most5Closed.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1"
            >
              <span className="text-white font-bold text-base uppercase drop-shadow-lg">• {item.buyer_name}</span>
              <span className="text-white font-semibold text-base drop-shadow-lg">
                ➜ {item.total_complaints - (item.statuses.find(s => s.status === 'Rejected')?.count ? Number(item.statuses.find(s => s.status === 'Rejected').count) : 0)}
              </span>
            </div>
          ))}
        </div>

        {/* Shine effect */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-white/10 via-transparent to-white/10 blur-md pointer-events-none transition-all duration-700 group-hover:opacity-70"></div>

        {/* Decorative dots with animation */}
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

      <div className="w-full flex flex-wrap justify-center gap-x-2 gap-y-2 mt-2">
        {lastSubmittedComplaints.length > 0 ? (
          lastSubmittedComplaints
            .slice()
            .sort((a, b) => new Date(a.closed_date.replace(' ', 'T')) - new Date(b.closed_date.replace(' ', 'T')))
            .slice(0, 16)
            .map((item, i) => {
              const closedDate = new Date(item.closed_date.replace(' ', 'T'));
              const now = new Date();
              const diffMs = now - closedDate;
              const diffMins = Math.floor(diffMs / 60000);
              const diffHrs = Math.floor(diffMs / (60 * 60000));
              const diffDays = Math.floor(diffMs / (24 * 60 * 60000));
              let timeAgo = '0M';
              if (diffMs < 60000) {
                timeAgo = '0M';
              } else if (diffMs < 60 * 60000) {
                timeAgo = `${diffMins}M`;
              } else if (diffMs < 24 * 60 * 60000) {
                timeAgo = `${diffHrs}H ${diffMins % 60}M`;
              } else {
                timeAgo = `${diffDays}D ${diffHrs % 24}H`;
              }

              return (
                <div
                  key={i}
                  className="group min-w-[140px] max-w-[180px] pr-0.5 pl-1 rounded-lg border-3 border-[#0F676A]/50 bg-white/5 backdrop-blur-sm flex flex-col transition-all duration-300
                  hover:border-[#49B16F] hover:shadow-lg hover:bg-[#284952]/20 hover:scale-[1.08] select-none"
                >
                  <div className="font-bold text-1xl text-black">
                    {item.buyer_name === 'Cheezious_Islamabad' ? 'Cheezious ISL' : item.buyer_name}
                  </div>
                  <div className="text-black font-semibold text-sm">
                    {item.ticket_number}
                  </div>
                  <div className="font-extrabold text-[#F97316] text-md">
                    {timeAgo}
                  </div>
                </div>
              );
            })
        ) : (
          <div className="group min-w-[140px] max-w-[180px] pr-0.5 pl-2 rounded-lg bg-gradient-to-br from-[#0F676A] to-[#083D3F] backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 hover:border-[#49B16F] hover:shadow-lg hover:bg-[#284952]/20 hover:scale-[1.08] select-none">
            <div className="font-bold text-[#F4A73C] uppercase mt-6 mb-2 text-center">
              No Submitted Complaints at all
            </div>
            <div className="text-white font-bold text-center mb-6">
              All Clear!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmittedSince;
