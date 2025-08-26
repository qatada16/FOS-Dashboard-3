import axios from 'axios';

const API_BASE_URL = 'https://fruitofsustainability.com/app_api/';

// Create axios instance with interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper function to extract complaint fields
function extractComplaintFields(complaint) {
  return {
    complaint_no: complaint.complaint_no,
    ticket_number: complaint.ticket_number,
    date_entry: complaint.date_entry,
    closed_date: complaint.closed_date,
    status: complaint.status,
    buyer_name: complaint.buyer_name,
    lodged_by: complaint.lodged_by,
    closed_by: complaint.closed_by
  };
}

// Helper for the Counseling Sessions
function extractCounselingFields(complaint) {
  return {
    session_id: complaint.session_id,
    ticket_number: complaint.ticket_number,
    employee_id: complaint.employee_id,
    company_name: complaint.company_name,
    mobile_number: complaint.mobile_number,
    session_date: complaint.session_date,
    session_rating: complaint.session_rating,
    created_at: complaint.created_at,
    created_by: complaint.created_by,
    status: complaint.status
  };
}

// Authentication service
export const authService = {
  async login(email, password) {
    try {
      console.log(`Attempting login at: ${API_BASE_URL}restful_api.php?route=login`);
      const response = await api.post('restful_api.php?route=login', { email, password });
      
      console.log('\nLogin successful! Response:', response.data);
      
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('accessId', response.data.access_id);
      localStorage.setItem('userRole', response.data.role);
      
      return response.data;
    } catch (error) {
      console.error('\nLogin failed:', error.response?.data || error.message);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('accessId');
    localStorage.removeItem('userRole');
  },

  getCurrentUser() {
    return {
      token: localStorage.getItem('authToken'),
      accessId: localStorage.getItem('accessId'),
      role: localStorage.getItem('userRole')
    };
  }
};

// Dashboard data service
// export const dashboardService = {
//   async fetchDashboardData() {
//     try {

//       console.log(`\nFetching dashboard data from: ${API_BASE_URL}restful_api.php?route=fos_dashboard_data`);
//       const response = await api.get('restful_api.php?route=fos_dashboard_data');
      
//       console.log('\nDashboard data received:', response.data);
      
//       return {
//         metrics: {
//           total_submitted: response.data.total_submitted || 0,
//           today_launched: response.data.today_launched || 0,
//           today_submitted: response.data.today_submitted || 0,
//           today_closed: response.data.today_closed || 0
//         },
//         complaints: {
//           last_submitted: response.data.last_submitted?.map(extractComplaintFields) || [],
//           last_launched: response.data.last_launched?.map(extractComplaintFields) || [],
//           last_today_submitted: response.data.last_today_submitted?.map(extractComplaintFields) || [],
//           last_today_closed: response.data.last_today_closed?.map(extractComplaintFields) || []
//         },
//         breakdown: response.data.buyer_status_breakdown || []
//       };
//     } catch (error) {
//       console.error('\nFailed to fetch dashboard data:', error.response?.data || error.message);
//       throw error;
//     }
//   }
// };

// Dashboard data service
export const dashboardService = {
  async fetchDashboardData() {
    try {
      // 1. First login to get the token (same as apiTest.js)
      const loginUrl = `${API_BASE_URL}restful_api.php?route=login`;
      console.log(`Attempting login at: ${loginUrl}`);
      
      const loginResponse = await axios.post(loginUrl, {
        email: "fos",
        password: "L56a<9dx"
      });
      
      const { token } = loginResponse.data;
      console.log('\nLogin successful! Token received');
      
      // 2. Fetch dashboard data with the token (same as apiTest.js)
      const dashboardUrl = `${API_BASE_URL}restful_api.php?route=fos_dashboard_data`;
      console.log(`\nFetching dashboard data from: ${dashboardUrl}`);
      
      const dashboardResponse = await axios.get(dashboardUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const responseData = dashboardResponse.data;
      console.log('\nDashboard data received:', responseData);
      
      // 3. Return data in the exact same structure as original
      return {
        metrics: {
          total_submitted: responseData.total_submitted || 0,
          today_launched: responseData.today_launched || 0,
          today_submitted: responseData.today_submitted || 0,
          today_closed: responseData.today_closed || 0,
          today_counseling_sessions: responseData.today_counseling_sessions || 0,
          last_hour_counseling_sessions: responseData.last_hour_counseling_sessions || 0
        },
        complaints: {
          last_submitted: responseData.last_submitted?.map(extractComplaintFields) || [],
          last_launched: responseData.last_launched?.map(extractComplaintFields) || [],
          last_today_submitted: responseData.last_today_submitted?.map(extractComplaintFields) || [],
          last_today_closed: responseData.last_today_closed?.map(extractComplaintFields) || [],
          today_counseling_details: responseData.today_counseling_details?.map(extractCounselingFields) || [],
          last_hour_counseling_details: responseData.last_hour_counseling_details?.map(extractCounselingFields) || []
        },
        breakdown: responseData.buyer_status_breakdown || []
      };
      
    } catch (error) {
      console.error('\nFailed in dashboard service:', error.response ? {
        status: error.response.status,
        data: error.response.data
      } : error.message);
      
      // Re-throw with a more descriptive message if needed
      throw new Error('Failed to fetch dashboard data');
    }
  }
};

// Test function (similar to your apiTest.js)
export async function testApiCalls() {
  try {
    // 1. Login with default credentials
    const loginData = await authService.login("fos", "L56a<9dx");
    
    // 2. Fetch dashboard data
    const dashboardData = await dashboardService.fetchDashboardData();
    
    // 3. Log results
    console.log('\n=== DASHBOARD METRICS ===');
    console.log('Total Submitted:', dashboardData.metrics.total_submitted);
    console.log('Today Launched:', dashboardData.metrics.today_launched);
    console.log('Today Submitted:', dashboardData.metrics.today_submitted);
    console.log('Today Closed:', dashboardData.metrics.today_closed);

    console.log('\n=== COMPLAINTS SUMMARY ===');
    console.log('Last Submitted Count:', dashboardData.complaints.last_submitted.length);
    console.log('Last Launched Count:', dashboardData.complaints.last_launched.length);
    console.log('Today Submitted Count:', dashboardData.complaints.last_today_submitted.length);
    console.log('Today Closed Count:', dashboardData.complaints.last_today_closed.length);

    console.log('\n=== BUYER BREAKDOWN ===');
    console.log('Buyers Count:', dashboardData.breakdown.length);
    
    console.log('\nAPI tests completed successfully!');
    return dashboardData;
  } catch (error) {
    console.error('\nAPI test failed:', error);
    throw error;
  }
}

// Initialize the API (optional)
export function initializeApi() {
  console.log('API initialized with base URL:', API_BASE_URL);
  return {
    auth: authService,
    dashboard: dashboardService
  };
}
