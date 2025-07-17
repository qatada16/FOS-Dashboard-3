import { useState, useEffect } from 'react';
import { authService, dashboardService } from '../api/complaints';
import React from 'react'

const Complaints = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(authService.getCurrentUser());

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Auto-login if no token exists
        if (!user.token) {
          console.log('No existing token, attempting auto-login...');
          const loginData = await authService.login("fos", "L56a<9dx");
          setUser(loginData);
        }

        // Fetch dashboard data
        const data = await dashboardService.fetchDashboardData();
        setDashboardData(data);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user.token]);

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    setUser({ token: null, accessId: null, role: null });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Loading dashboard data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
        <p>No dashboard data available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Complaints Dashboard</h1>
        {user.token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
          >
            Logout
          </button>
        )}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard 
          title="Total Submitted" 
          value={dashboardData.metrics.total_submitted} 
          bgColor="bg-blue-100"
          textColor="text-blue-800"
        />
        <MetricCard 
          title="Today Launched" 
          value={dashboardData.metrics.today_launched} 
          bgColor="bg-green-100"
          textColor="text-green-800"
        />
        <MetricCard 
          title="Today Submitted" 
          value={dashboardData.metrics.today_submitted} 
          bgColor="bg-purple-100"
          textColor="text-purple-800"
        />
        <MetricCard 
          title="Today Closed" 
          value={dashboardData.metrics.today_closed} 
          bgColor="bg-orange-100"
          textColor="text-orange-800"
        />
      </div>

      {/* Complaints Sections */}
      <div className="space-y-6">
        <ComplaintsSection 
          title="Last Submitted Complaints" 
          complaints={dashboardData.complaints.last_submitted} 
        />
        <ComplaintsSection 
          title="Last Launched Complaints" 
          complaints={dashboardData.complaints.last_launched} 
        />
        <ComplaintsSection 
          title="Today Submitted Complaints" 
          complaints={dashboardData.complaints.last_today_submitted} 
        />
        <ComplaintsSection 
          title="Today Closed Complaints" 
          complaints={dashboardData.complaints.last_today_closed} 
        />
      </div>

      {/* Buyer Breakdown */}
      {dashboardData.breakdown.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Buyer Status Breakdown</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Complaints</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.breakdown.map((buyer, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{buyer.buyer_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{buyer.total_complaints}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {buyer.statuses.find(s => s.status === 'Open')?.count || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {buyer.statuses.find(s => s.status === 'Closed')?.count || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {buyer.statuses.find(s => s.status === 'Completed')?.count || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-components
const MetricCard = ({ title, value, bgColor, textColor }) => (
  <div className={`${bgColor} p-4 rounded-lg shadow`}>
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className={`${textColor} text-3xl font-bold mt-1`}>{value}</p>
  </div>
);

const ComplaintsSection = ({ title, complaints }) => (
  <div>
    <h2 className="text-lg font-semibold mb-2">{title} ({complaints.length})</h2>
    {complaints.length > 0 ? (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint #</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complaints.map((complaint, index) => (
              <tr key={index}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{complaint.complaint_no}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{complaint.ticket_number}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {new Date(complaint.date_entry).toLocaleString()}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    complaint.status === 'Closed' ? 'bg-green-100 text-green-800' :
                    complaint.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{complaint.buyer_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-gray-500 text-sm">No complaints found</p>
    )}
  </div>
);

export default Complaints;