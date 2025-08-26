const API_BASE = 'http://localhost:3000';

export const fetchAllRecordings = async () => {
  try {
    // // First verify the API is reachable
    // const testResponse = await fetch('/api/test-connection');
    // if (!testResponse.ok) {
    //   throw new Error('Backend not reachable');
    // }

    // Fetch recordings for all lines
    const responses = await Promise.all([
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recordings/line01`),
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recordings/line03`),
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recordings/line05`)
    ]);

    console.log('Responses:', responses);
    // Check if any response failed
    const errors = responses.filter(r => !r.ok);
    if (errors.length > 0) {
      throw new Error(`Failed to fetch: ${errors.map(e => e.statusText).join(', ')}`);
    }

    // Parse JSON
    const data = await Promise.all(responses.map(r => {
      const contentType = r.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response not JSON');
      }
      return r.json();
    }))
    console.log(data);

    return {
      line01: processRecordings(data[0]),
      line03: processRecordings(data[1]),
      line05: processRecordings(data[2]),
      totalDurations: {
        line01: data[0].totalDuration,
        line03: data[1].totalDuration,
        line05: data[2].totalDuration
      }
    };
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

const processRecordings = (apiResponse) => {
  if (!apiResponse?.success || !apiResponse.calls) return [];
  
  return apiResponse.calls.map(call => ({
    id: call.name,
    time: new Date(call.lastModified).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true}),
    duration: call.duration,
    direction: call.direction
  }));
};

export const fetchLastHourRecordings = async () => {
  try {
    // // First verify the API is reachable
    // const testResponse = await fetch('/api/test-connection');
    // if (!testResponse.ok) {
    //   throw new Error('Backend not reachable');
    // }

    // Fetch last hour recordings for all lines
    const responses = await Promise.all([
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recordings/line01/last-hour`),
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recordings/line03/last-hour`),
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recordings/line05/last-hour`)
    ]);

    // Check if any response failed
    const errors = responses.filter(r => !r.ok);
    if (errors.length > 0) {
      throw new Error(`Failed to fetch last hour recordings: ${errors.map(e => e.statusText).join(', ')}`);
    }

    // Parse JSON
    const data = await Promise.all(responses.map(async r => {
      const contentType = r.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response not JSON');
      }
      return r.json();
    }));

    return {
      line01: processRecordings(data[0]),
      line03: processRecordings(data[1]),
      line05: processRecordings(data[2]),
      totalDurations: {
        line01: data[0].totalDuration,
        line03: data[1].totalDuration,
        line05: data[2].totalDuration
      }
    };
  } catch (err) {
    console.error('Fetch error (last hour):', err);
    throw err;
  }
};