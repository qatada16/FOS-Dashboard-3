// import React from 'react'
// import { useState, useEffect } from 'react';
// import { FaArrowDown, FaArrowUp, FaHourglassHalf } from 'react-icons/fa';
// import Navbar from './components/Navbar';
// import LiquidGauge from './components/LiquidGauge';
// import { fetchAllRecordings, fetchLastHourRecordings } from './api/recordings';
// import './App.css';

// // Dummy data for complaints
// const generateComplaints = (prefix) => {
//   const companies = ['Cheezious', 'Indus', 'Dawn', 'KFC', 'PizzaHut', 'McDonalds', 'BurgerKing', 'Subway'];
//   return Array.from({ length: 8 }).map((_, i) => ({
//     ticketNumber: `FOS-2025-${prefix}${String(i+1).padStart(2, '0')}`,
//     company: `${companies[i]}${i+1}`,
//     time: new Date(Date.now() - (i * 15 * 60 * 1000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//   }));
// };

// export default function App() {
//   const [lineRecordings, setLineRecordings] = useState({
//     line01: [],
//     line03: [],
//     line05: []
//   });
//   const [lastHourRecordings, setLastHourRecordings] = useState({
//     line01: [],
//     line03: [],
//     line05: []
//   });
//   const [totalDurations, setTotalDurations] = useState({
//     line01: '0M 0S',
//     line03: '0M 0S',
//     line05: '0M 0S'
//   });
//   const [totalHourDurations, setTotalHourDurations] = useState({
//     line01: '0M 0S',
//     line03: '0M 0S',
//     line05: '0M 0S'
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Generate dummy complaints data
//   const [complaints] = useState({
//     submitted: generateComplaints(''),
//     completed: generateComplaints('1'),
//     pending: generateComplaints('2')
//   });

//   const loadData = async () => {
//     try {
//       const data = await fetchAllRecordings();
//       setLineRecordings({
//         line01: data.line01,
//         line03: data.line03,
//         line05: data.line05
//       });
//       setTotalDurations(data.totalDurations);

//       const data2 = await fetchLastHourRecordings();
//       setLastHourRecordings({
//         line01: data2.line01,
//         line03: data2.line03,
//         line05: data2.line05
//       });
//       setTotalHourDurations(data2.totalDurations);
//       console.log("last Hour Recordings: ",{data2})
//     } catch (err) {
//       setError(`Failed to load data: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Initial load
//     loadData();

//     // Set up interval for refreshing data
//     const intervalId = setInterval(loadData, 60000); // 60 seconds

//     // Clean up interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   if (loading) {
//     return <div className="app-container">Loading recordings...</div>;
//   }

//   if (error) {
//     return <div className="app-container">Error: {error}</div>;
//   }

//   return (
//     <div className="app-container">
//       <Navbar />

//       {/* Upper Section - Existing Dashboard */}
//       <div className="dashboard-grid">
//         {/* Submitted Complaints */}
//         <div className="dashboard-card">
//           <LiquidGauge value={39} max={100} label="Total Submitted" />
//           <h2 className="section-title">Last Hour</h2>
//           <div className="complaints-grid">
//             {complaints.submitted.map((complaint, i) => (
//               <div key={i} className="complaint-item">
//                 <div className="ticket-number">{complaint.ticketNumber}</div>
//                 <div className="company-name">{complaint.company}</div>
//                 <div className="time">{complaint.time}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Today's Complaints */}
//         <div className="dashboard-card">
//           <LiquidGauge value={42} max={100} label="Today's Launches" />
//           <h2 className="section-title">Recently Completed</h2>
//           <div className="complaints-grid">
//             {complaints.completed.map((complaint, i) => (
//               <div key={i} className="complaint-item">
//                 <div className="ticket-number">{complaint.ticketNumber}</div>
//                 <div className="company-name">{complaint.company}</div>
//                 <div className="time">{complaint.time}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Pending Complaints */}
//         <div className="dashboard-card">
//           <LiquidGauge value={780} max={1500} label="Total Pending" />
//           <h2 className="section-title">Pending Cases</h2>
//           <div className="complaints-grid">
//             {complaints.pending.map((complaint, i) => (
//               <div key={i} className="complaint-item">
//                 <div className="ticket-number">{complaint.ticketNumber}</div>
//                 <div className="company-name">{complaint.company}</div>
//                 <div className="time">{complaint.time}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Lower Section - Recordings Dashboard */}
//       <div className="dashboard-grid">
//         {/* Line 01 Recordings */}
//         <div className="dashboard-card">
//           <div className='top'>
//             <div className="recording-count">
//               <span className="count-label">Recordings</span>
//               <span className="count-number2">{lastHourRecordings.line01.length}</span>
//               <span className="count-number">{lineRecordings.line01.length} - Today</span>
//             </div>
//             <div className="circle-title">
//               <h2 className="section-title">Line 1</h2>
//             </div>
//             {/* <div className='last-hour-title'>
//               <h2 className='hour-title'>&#x219E; Last Hour &#x21A0;</h2>
//             </div> */}
//             {/* Total Duration */}
//             <div className="total-duration">
//               <span className="duration-label">Total DURATION</span>
//               <span className='duration-number2'>{totalHourDurations.line01}</span>
//               <span className='duration-number'>{totalDurations.line01} - Today</span>
//             </div>
//           </div>
//           {/* Separator */}
//           {/* <div className="separator"></div> */}

//           <div className="recordings-list">
//             {lastHourRecordings.line01.length > 0 ? (
//               lastHourRecordings.line01.map((recording) => (
//                 <div key={recording.id} className="recording-item">
//                   <div className='call-direction'>
//                     <span style={{ color: recording.direction === 'Out' ? 'red' : 'inherit' }}>
//                       {recording.direction}
//                     </span>
//                   </div>
//                   <div className="time-container">
//                     <span>
//                       🕝
//                       {['10', '11', '12'].some(prefix => recording.time.startsWith(prefix)) ? '' : '0'}
//                       {recording.time}
//                     </span>
//                   </div>
//                   <div className="duration-container">
//                     <FaHourglassHalf color="#1B9B83" />
//                     <span>{recording.duration}</span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="recording-item">No Last Hour Recordings found</div>
//             )}
//           </div>
//         </div>

//         {/* Line 03 Recordings */}
//         <div className="dashboard-card">
//           <div className='top'>
//             <div className="recording-count">
//               <span className="count-label">Recordings</span>
//               <span className="count-number2">{lastHourRecordings.line03.length}</span>
//               <span className="count-number">{lineRecordings.line03.length} - Today</span>
//             </div>
//             <div className="circle-title">
//               <h2 className="section-title">Line 2</h2>
//             </div>
//             {/* <div className='last-hour-title'>
//               <h2 className='hour-title'>&#x219E; Last Hour &#x21A0;</h2>
//             </div> */}
//             {/* Total Duration */}
//             <div className="total-duration">
//               <span className="duration-label">Total DURATION</span>
//               <span className='duration-number2'>{totalHourDurations.line03}</span>
//               <span className='duration-number'>{totalDurations.line03} - Today</span>
//             </div>
//           </div>

//           <div className="recordings-list">
//             {lastHourRecordings.line03.length > 0 ? (
//               lastHourRecordings.line03.map((recording) => (
//                 <div key={recording.id} className="recording-item">
//                   <div className='call-direction'>
//                     {recording.direction === 'In' ?
//                       <FaArrowDown color="green" /> :
//                       <FaArrowUp color="red" />}
//                     <span> </span>
//                     <span style={{ color: recording.direction === 'Out' ? 'red' : 'inherit' }}>
//                       {recording.direction}
//                     </span>
//                   </div>
//                   <div className="time-container">
//                     <span>
//                       🕝
//                       {['10', '11', '12'].some(prefix => recording.time.startsWith(prefix)) ? '' : '0'}
//                       {recording.time}
//                     </span>
//                   </div>
//                   <div className="duration-container">
//                     <FaHourglassHalf color="#1B9B83" />
//                     <span>{recording.duration}</span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="recording-item">No Last Hour Recordings found</div>
//             )}
//           </div>
//         </div>

//         {/* Line 05 Recordings */}
//         <div className="dashboard-card">
//           <div className='top'>
//             <div className="recording-count">
//               <span className="count-label">Recordings</span>
//               <span className="count-number2">{lastHourRecordings.line05.length}</span>
//               <span className="count-number">{lineRecordings.line05.length} - Today</span>
//             </div>
//             <div className="circle-title">
//               <h2 className="section-title">Line 3</h2>
//             </div>
//             {/* <div className='last-hour-title'>
//               <h2 className='hour-title'>&#x219E; Last Hour &#x21A0;</h2>
//             </div> */}
//             {/* Total Duration */}
//             <div className="total-duration">
//               <span className="duration-label">Total DURATION</span>
//               <span className='duration-number2'>{totalHourDurations.line05}</span>
//               <span className='duration-number'>{totalDurations.line05} - Today</span>
//             </div>
//           </div>

//           <div className="recordings-list">
//             {lastHourRecordings.line05.length > 0 ? (
//               lastHourRecordings.line05.map((recording) => (
//                 <div key={recording.id} className="recording-item">
//                   <div className='call-direction'>
//                     {recording.direction === 'In' ?
//                       <FaArrowDown color="green" /> :
//                       <FaArrowUp color="red" />}
//                     <span> </span>
//                     <span style={{ color: recording.direction === 'Out' ? 'red' : 'inherit' }}>
//                       {recording.direction}
//                     </span>
//                   </div>
//                   <div className="time-container">
//                     <span>
//                       🕝
//                       {['10', '11', '12'].some(prefix => recording.time.startsWith(prefix)) ? '' : '0'}
//                       {recording.time}
//                     </span>
//                   </div>
//                   <div className="duration-container">
//                     <FaHourglassHalf color="#1B9B83" />
//                     <span>{recording.duration}</span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="recording-item">No Last Hour Recordings found</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React from 'react'
import { useState, useEffect } from 'react';
import { FaArrowDown, FaArrowUp, FaHourglassHalf } from 'react-icons/fa';
import Navbar from './components/Navbar';
import LiquidGauge from './components/LiquidGauge';
import RecordingsList from './components/RecordingsList';
import RecordingsHeader from './components/RecordingsHeader';
import { fetchAllRecordings, fetchLastHourRecordings } from './api/recordings';

// Dummy data for complaints
const generateComplaints = (prefix) => {
  const companies = ['Cheezious', 'Indus', 'Dawn', 'KFC', 'PizzaHut', 'McDonalds', 'BurgerKing', 'Subway'];
  return Array.from({ length: 8 }).map((_, i) => ({
    ticketNumber: `FOS-2025-${prefix}${String(i+1).padStart(2, '0')}`,
    company: `${companies[i]}${i+1}`,
    time: new Date(Date.now() - (i * 15 * 60 * 1000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }));
};

export default function App() {
  const [lineRecordings, setLineRecordings] = useState({
    line01: [],
    line03: [],
    line05: []
  });
  const [lastHourRecordings, setLastHourRecordings] = useState({
    line01: [
    {
      id: 1,
      direction: 'In',
      time: '3:45:56 PM',
      duration: '2m 15s'
    },
    {
      id: 2,
      direction: 'Out',
      time: '10:30:09 AM',
      duration: '1m 45s'
    },
    {
      id: 3,
      direction: 'In',
      time: '11:15:34 AM',
      duration: '3m 30s'
    },
    {
      id: 4,
      direction: 'Out',
      time: '12:05:11 PM',
      duration: '0m 45s'
    }
  ],
    line03: [],
    line05: []
  });
  const [totalDurations, setTotalDurations] = useState({
    line01: '0M 0s',
    line03: '0M 0s',
    line05: '0M 0s'
  });
  const [totalHourDurations, setTotalHourDurations] = useState({
    line01: '0M 0s',
    line03: '0M 0s',
    line05: '0M 0s'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate dummy complaints data
  const [complaints] = useState({
    submitted: generateComplaints(''),
    completed: generateComplaints('1'),
    pending: generateComplaints('2')
  });

  const loadData = async () => {
    try {
      const data = await fetchAllRecordings();
      setLineRecordings({
        line01: data.line01,
        line03: data.line03,
        line05: data.line05
      });
      setTotalDurations(data.totalDurations);

      const data2 = await fetchLastHourRecordings();
      setLastHourRecordings({
        line01: data2.line01,
        line03: data2.line03,
        line05: data2.line05
      });
      setTotalHourDurations(data2.totalDurations);
      console.log("last Hour Recordings: ",{data2})
    } catch (err) {
      setError(`Failed to load data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    loadData();

    // Set up interval for refreshing data
    const intervalId = setInterval(loadData, 60000); // 60 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-teal-600 flex items-center justify-center">Loading recordings...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-teal-600 flex items-center justify-center">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-teal-600 select-none">
      <Navbar />

      {/* Upper Section - Existing Dashboard */}
      <div className="max-w-[1900px] mx-auto my-4 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
        {/* Submitted Complaints */}
        <div className="bg-[#c5e0db] rounded-xl p-2 shadow-lg flex flex-col items-center">
          <LiquidGauge value={39} max={100} label="Total Submitted" />
          <h2 className="text-xl font-bold text-gray-800 my-4 text-center">Last Hour</h2>
          <div className="w-full grid grid-cols-4 grid-rows-2 gap-3">
            {complaints.submitted.map((complaint, i) => (
              <div key={i} className="group bg-[#91CAA7] p-1.5 rounded transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-lg hover:bg-[#284952]">
                <div className="font-bold text-[#434747] group-hover:text-white">{complaint.ticketNumber}</div>
                <div className="font-bold text-black group-hover:text-white">{complaint.company}</div>
                <div className="font-bold text-[#434747] text-sm group-hover:text-white">{complaint.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Complaints */}
        <div className="bg-[#c5e0db] rounded-xl p-2 shadow-lg flex flex-col items-center">
          <LiquidGauge value={42} max={100} label="Today's Launches" />
          <h2 className="text-xl font-bold text-gray-800 my-4 text-center">Recently Completed</h2>
          <div className="w-full grid grid-cols-4 grid-rows-2 gap-3">
            {complaints.completed.map((complaint, i) => (
              <div key={i} className="group bg-[#91CAA7] p-1.5 rounded transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-lg hover:bg-[#284952]">
                <div className="font-bold text-[#434747] group-hover:text-white">{complaint.ticketNumber}</div>
                <div className="font-bold text-black group-hover:text-white">{complaint.company}</div>
                <div className="font-bold text-[#434747] text-sm group-hover:text-white">{complaint.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Complaints */}
        <div className="bg-[#c5e0db] rounded-xl p-2 shadow-lg flex flex-col items-center">
          <LiquidGauge value={780} max={1500} label="Total Pending" />
          <h2 className="text-xl font-bold text-gray-800 my-4 text-center">Pending Cases</h2>
          <div className="w-full grid grid-cols-4 grid-rows-2 gap-3">
            {complaints.pending.map((complaint, i) => (
              <div key={i} className="group bg-[#91CAA7] p-1.5 rounded transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-lg hover:bg-[#284952]">
                <div className="font-bold text-[#434747] group-hover:text-white">{complaint.ticketNumber}</div>
                <div className="font-bold text-black group-hover:text-white">{complaint.company}</div>
                <div className="font-bold text-[#434747] text-sm group-hover:text-white">{complaint.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Section - Recordings Dashboard */}
      <div className="max-w-[1900px] mx-auto my-4 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
        {/* Line 01 Recordings */}
        <div className="bg-[#c5e0db] rounded-xl p-2 shadow-lg flex flex-col items-center mb-2">
          <RecordingsHeader
            lineNumber="1"
            lastHourCount={lastHourRecordings.line01.length}
            todayCount={lineRecordings.line01.length}
            lastHourDuration={totalHourDurations.line01}
            todayDuration={totalDurations.line01}
          />

          <RecordingsList recordings={lastHourRecordings.line01} />
        </div>

        {/* Line 03 Recordings */}
        <div className="bg-[#c5e0db] rounded-xl p-2 shadow-lg flex flex-col items-center mb-2">
          <RecordingsHeader
            lineNumber="2"
            lastHourCount={lastHourRecordings.line03.length}
            todayCount={lineRecordings.line03.length}
            lastHourDuration={totalHourDurations.line03}
            todayDuration={totalDurations.line03}
          />

          <RecordingsList recordings={lastHourRecordings.line03} />
        </div>

        {/* Line 05 Recordings */}
        <div className="bg-[#c5e0db] rounded-xl p-2 shadow-lg flex flex-col items-center mb-2">
          <RecordingsHeader
            lineNumber="3"
            lastHourCount={lastHourRecordings.line05.length}
            todayCount={lineRecordings.line05.length}
            lastHourDuration={totalHourDurations.line05}
            todayDuration={totalDurations.line05}
          />

          <RecordingsList recordings={lastHourRecordings.line05} />
        </div>

      </div>
    </div>
  );
}