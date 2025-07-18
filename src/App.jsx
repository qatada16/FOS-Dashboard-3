import React from 'react'
import { useState, useEffect } from 'react';
import { FaArrowDown, FaArrowUp, FaHourglassHalf } from 'react-icons/fa';
import Navbar from './components/Navbar';
import LiquidGauge from './components/LiquidGauge';
import RecordingsList from './components/RecordingsList';
import RecordingsHeader from './components/RecordingsHeader';
import { fetchAllRecordings, fetchLastHourRecordings } from './api/recordings';
import Complaints from './components/Complaints';
import SubmittedComplaints from './components/SubmittedComplaints';
import TodayLaunches from './components/TodayLaunches';
import SubmittedSince from './components/SubmittedSince';
import { authService, dashboardService } from './api/complaints';

export default function App() {
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState(null);

  // State for recordings data
  const [lineRecordings, setLineRecordings] = useState({
    line01: [],
    line03: [],
    line05: []
  });
  const [lastHourRecordings, setLastHourRecordings] = useState({
    line01: [],
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
  const [recordingsLoading, setRecordingsLoading] = useState(true);
  const [recordingsError, setRecordingsError] = useState(null);

  // Generate dummy complaints data
  const [complaints] = useState({
    submitted: generateComplaints(''),
    completed: generateComplaints('1'),
    pending: generateComplaints('2')
  });

  // Initial data load (shows loading screen)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Auto-login if not authenticated
        if (!authService.getCurrentUser().token) {
          await authService.login("fos", "L56a<9dx");
        }
        
        // Fetch initial dashboard data
        const data = await dashboardService.fetchDashboardData();
        setDashboardData(data);
        
        // Fetch initial recordings data
        await loadRecordingsData(false);
      } catch (err) {
        setDashboardError(err.message);
      } finally {
        setDashboardLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Silent data refresh
  const loadRecordingsData = async (isRefresh = true) => {
    try {
      if (!isRefresh) {
        setRecordingsLoading(true);
      }
      
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
    } catch (err) {
      if (!isRefresh) {
        setRecordingsError(`Failed to load data: ${err.message}`);
      } else {
        console.error('Refresh failed:', err);
      }
    } finally {
      if (!isRefresh) {
        setRecordingsLoading(false);
      }
    }
  };

  // Set up silent refresh interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      loadRecordingsData(true); // Pass true to indicate it's a refresh
      
      // Optionally refresh dashboard data too
      dashboardService.fetchDashboardData()
        .then(data => setDashboardData(data))
        .catch(err => console.error('Dashboard refresh failed:', err));
    }, 60000); // 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Combined loading state (only for initial load)
  const isLoading = dashboardLoading || (!dashboardLoading && recordingsLoading);
  const hasError = dashboardError || recordingsError;

  if (isLoading) {
    return <div className="min-h-screen bg-teal-600 flex items-center justify-center">Loading data...</div>;
  }

  if (hasError) {
    return <div className="min-h-screen bg-teal-600 flex items-center justify-center">Error: {dashboardError || recordingsError}</div>;
  }

  if (!dashboardData) {
    return <div className="min-h-screen bg-teal-600 flex items-center justify-center">No data available</div>;
  }

  // Get last 8 complaints for the "Last Hour" section
  const lastSubmittedComplaints = dashboardData.complaints.last_submitted;
  console.log('Last Submitted Complaints:', lastSubmittedComplaints);

  // remove the Rejected complaints from the last_launched
  const lastLaunched = dashboardData.complaints.last_launched.filter(item => item.status !== 'Rejected');
  console.log('Last Launched Complaints:', lastLaunched);
  // Get last hour launched complaints
  const lastHourLaunched = lastLaunched.filter(item => {
    const entryDate = new Date(item.date_entry);
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    return entryDate >= oneHourAgo && entryDate <= now;
  });
  console.log('Last Hour Launched:', lastHourLaunched);

  // Get the most Launches in the Last Week
  const most5LaunchesLastWeek = dashboardData.breakdown
  .slice() // create a shallow copy to avoid mutating original
  .sort((a, b) => b.total_complaints - a.total_complaints)
  .slice(0, 5);
  console.log('Most Launches Last Week:', most5LaunchesLastWeek);
  

  return (
    <div className="min-h-screen bg-teal-600 select-none">
      <Navbar />
      {/* <Complaints /> */}
      {/* Upper Section - Existing Dashboard */}
      <div className="max-w-[2400px] mx-auto my-4 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
        {/* Submitted Complaints */}
        <SubmittedComplaints
          dashboardData={dashboardData}
        />
        {/* Today's Launches */}
        <TodayLaunches
          lastLaunched={lastLaunched}
          lastHourLaunched={lastHourLaunched}
          most5LaunchesLastWeek={most5LaunchesLastWeek}
        />
        {/* Submitted Since */}
        <SubmittedSince lastSubmittedComplaints={lastSubmittedComplaints}
          most5LaunchesLastWeek={most5LaunchesLastWeek}/>
      </div>

      {/* Lower Section - Recordings Dashboard */}
      <div className="max-w-[2400px] mx-auto my-4 mt-2 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
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