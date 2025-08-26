// import express from 'express';
// import cors from 'cors';
// import { getLatestCallRecordings } from './listCallRecords.js';

// const app = express();
// app.use(cors());

// app.get('/api/call-records', async (req, res) => {
//   try {
//     const recordings = await getLatestCallRecordings();
//     res.json(recordings);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to fetch recordings' });
//   }
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import { 
  getLatest01Calls, 
  getLatest03Calls, 
  getLatest05Calls,
  getLastHourCalls
} from './listCallRecords.js';
import dotenv from "dotenv";

dotenv.config();
const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors(corsOptions));

// API endpoint for call records
app.get('/api/recordings/:prefix', async (req, res) => {
  const { prefix } = req.params;
  let calls = [];
  
  try {
    switch(prefix) {
      case 'line01':
        calls = await getLatest01Calls();
        break;
      case 'line03':
        calls = await getLatest03Calls();
        break;
      case 'line05':
        calls = await getLatest05Calls();
        break;
      default:
        return res.status(400).json({ 
          success: false,
          error: 'Invalid prefix. Use 01, 03, or 05' 
        });
    }

    const formattedCalls = calls.map(call => ({
      name: call.name,
      size: call.size,
      duration: call.duration, // Already formatted as MM:SS
      direction: call.direction,  // Include direction in response
      lastModified: call.mtime.toISOString(),
      path: call.path.replace(/^\\\\[^\\]+\\/, '') // Hide server name
    }));
    // Calculate total duration (convert MM:SS to seconds)
    const totalSeconds = formattedCalls.reduce((sum, call) => {
      const [minutes, seconds] = call.duration.split(':').map(Number);
      return sum + (minutes * 60 + seconds);
    }, 0);

    // Format total duration
    let totalDurationFormatted = '';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      totalDurationFormatted = `${hours}H ${minutes}M ${seconds}s`;
    } else {
      totalDurationFormatted = `${minutes}M ${seconds}s`;
    }

    res.json({
      success: true,
      count: formattedCalls.length,
      totalDuration: totalDurationFormatted,
      calls: formattedCalls
    });
  } catch (error) {
    console.error(`Error getting ${prefix} calls:`, error);
    res.status(500).json({ 
      success: false,
      error: `Failed to fetch ${prefix} calls`,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/', (req, res) => {
  res.send("Welcome to the Fos Dash 3.");
});
// Add this endpoint to index.js (before the server start)
app.get('/api/recordings/:prefix/last-hour', async (req, res) => {
  const { prefix } = req.params;
  let calls = [];
  
  try {
    switch(prefix) {
      case 'line01':
        calls = await getLastHourCalls('01');
        break;
      case 'line03':
        calls = await getLastHourCalls('03');
        break;
      case 'line05':
        calls = await getLastHourCalls('05');
        break;
      default:
        return res.status(400).json({ 
          success: false,
          error: 'Invalid prefix. Use 01, 03, or 05' 
        });
    }

    const formattedCalls = calls.map(call => ({
      name: call.name,
      size: call.size,
      duration: call.duration,
      direction: call.direction,
      lastModified: call.mtime.toISOString(),
      path: call.path.replace(/^\\\\[^\\]+\\/, '')
    }));

    // Calculate total duration
    const totalSeconds = formattedCalls.reduce((sum, call) => {
      const [minutes, seconds] = call.duration.split(':').map(Number);
      return sum + (minutes * 60 + seconds);
    }, 0);

    // Format total duration
    let totalDurationFormatted = '';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      totalDurationFormatted = `${hours}H ${minutes}M ${seconds}s`;
    } else {
      totalDurationFormatted = `${minutes}M ${seconds}s`;
    }

    res.json({
      success: true,
      count: formattedCalls.length,
      totalDuration: totalDurationFormatted,
      calls: formattedCalls
    });
  } catch (error) {
    console.error(`Error getting last hour ${prefix} calls:`, error);
    res.status(500).json({ 
      success: false,
      error: `Failed to fetch last hour ${prefix} calls`,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /api/recordings/line01 (Latest 5 calls starting with 01)');
  console.log('- GET /api/recordings/line03 (Latest 5 calls starting with 03)');
  console.log('- GET /api/recordings/line05 (Latest 5 calls starting with 05)');
  console.log('- GET /api/recordings/line01/last-hour (Last hour calls for line 01)');
  console.log('- GET /api/recordings/line03/last-hour (Last hour calls for line 03)');
  console.log('- GET /api/recordings/line05/last-hour (Last hour calls for line 05)');
});