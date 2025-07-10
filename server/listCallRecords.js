// import fs from 'fs';
// import path from 'path';

// // Network path configuration
// const basePath = '\\\\FOS-MASTER-PC\\PTCL call record';

// // Custom duration calculation formula
// // 500KB = 1 minute (60 seconds)
// function calculateDuration(fileSizeBytes) {
//   const fileSizeKB = fileSizeBytes / 1024;
//   const durationSeconds = (fileSizeKB / 500) * 60;
//   return Math.round(durationSeconds);
// }

// // Format duration to MM:SS
// function formatDuration(seconds) {
//   if (!seconds) return '00:00';
//   const mins = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
//   return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
// }

// // Helper function to get sorted directories by modified time
// function getSortedDirectories(parentPath) {
//   try {
//     return fs.readdirSync(parentPath)
//       .filter(f => {
//         try {
//           return fs.statSync(path.join(parentPath, f)).isDirectory();
//         } catch {
//           return false;
//         }
//       })
//       .map(f => ({
//         name: f,
//         path: path.join(parentPath, f),
//         mtime: fs.statSync(path.join(parentPath, f)).mtime
//       }))
//       .sort((a, b) => b.mtime - a.mtime);
//   } catch (err) {
//     console.error(`Error reading directory ${parentPath}:`, err);
//     return [];
//   }
// }

// // Helper function to get sorted WAV files with metadata
// function getSortedFiles(dirPath) {
//   try {
//     return fs.readdirSync(dirPath)
//       .filter(f => f.toLowerCase().endsWith('.wav'))
//       .map(f => {
//         const fullPath = path.join(dirPath, f);
//         const stats = fs.statSync(fullPath);
//         const durationSeconds = calculateDuration(stats.size);
//         // Extract call direction from filename
//         const direction = f.includes('--A-') ? 'In' : 
//                          f.includes('--B-') ? 'Out' : 'Unknown';
//         return {
//           name: f,
//           path: fullPath,
//           size: formatFileSize(stats.size),
//           duration: formatDuration(durationSeconds), // Formatted as MM:SS
//           mtime: stats.mtime,
//           direction: direction  // Add direction to the file object
//         };
//       })
//       .sort((a, b) => b.mtime - a.mtime);
//   } catch (err) {
//     console.error(`Error reading files from ${dirPath}:`, err);
//     return [];
//   }
// }

// // Helper function to format file size
// function formatFileSize(bytes) {
//   if (bytes === 0) return '0 Bytes';
//   const k = 1024;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
// }

// // Helper function to filter files by prefix
// function filterByPrefix(files, prefix) {
//   return files
//     .filter(f => f.name.startsWith(prefix))
//     // .slice(0, 5); // Get top 5
// }

// // Main exported functions
// export function getLatest01Calls() {
//   try {
//     const months = getSortedDirectories(basePath);
//     if (!months.length) return [];
    
//     const latestMonth = months[0].path;
//     const days = getSortedDirectories(latestMonth);
//     if (!days.length) return [];
    
//     const latestDay = days[0].path;
//     return filterByPrefix(getSortedFiles(latestDay), '01');
//   } catch (err) {
//     console.error('Error getting 01 calls:', err);
//     return [];
//   }
// }

// export function getLatest03Calls() {
//   try {
//     const months = getSortedDirectories(basePath);
//     if (!months.length) return [];
    
//     const latestMonth = months[0].path;
//     const days = getSortedDirectories(latestMonth);
//     if (!days.length) return [];
    
//     const latestDay = days[0].path;
//     return filterByPrefix(getSortedFiles(latestDay), '03');
//   } catch (err) {
//     console.error('Error getting 03 calls:', err);
//     return [];
//   }
// }

// export function getLatest05Calls() {
//   try {
//     const months = getSortedDirectories(basePath);
//     if (!months.length) return [];
    
//     const latestMonth = months[0].path;
//     const days = getSortedDirectories(latestMonth);
//     if (!days.length) return [];
    
//     const latestDay = days[0].path;
//     return filterByPrefix(getSortedFiles(latestDay), '05');
//   } catch (err) {
//     console.error('Error getting 05 calls:', err);
//     return [];
//   }
// }

// // Last Hour Calls
// export function getLastHourCalls(prefix) {
//   try {
//     const months = getSortedDirectories(basePath);
//     if (!months.length) return [];
    
//     const latestMonth = months[0].path;
//     const days = getSortedDirectories(latestMonth);
//     if (!days.length) return [];
    
//     const latestDay = days[0].path;
//     const allFiles = getSortedFiles(latestDay);
//     const filteredFiles = filterByPrefix(allFiles, prefix);
    
//     // Filter for last hour recordings
//     const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
//     console.log("Last Hour: ", {oneHourAgo})
//     return filteredFiles.filter(file => {
//       return new Date(file.mtime) > oneHourAgo;
//     });
//   } catch (err) {
//     console.error(`Error getting last hour ${prefix} calls:`, err);
//     return [];
//   }
// }



import fs from 'fs';
import path from 'path';

// Network path configuration
const basePath = '\\\\FOS-MASTER-PC\\PTCL call record';

// Custom duration calculation formula
// 500KB = 1 minute (60 seconds)
function calculateDuration(fileSizeBytes) {
  const fileSizeKB = fileSizeBytes / 1024;
  const durationSeconds = (fileSizeKB / 500) * 60;
  return Math.round(durationSeconds);
}

// Format duration to MM:SS
function formatDuration(seconds) {
  if (!seconds) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Helper function to get directory by exact name
function getDirectoryByName(parentPath, dirName) {
  try {
    const dirPath = path.join(parentPath, dirName);
    if (fs.existsSync(dirPath)) {
      return {
        name: dirName,
        path: dirPath,
        mtime: fs.statSync(dirPath).mtime
      };
    }
    return null;
  } catch (err) {
    console.error(`Error accessing directory ${dirName}:`, err);
    return null;
  }
}

// Helper function to get sorted WAV files with metadata
function getSortedFiles(dirPath) {
  try {
    return fs.readdirSync(dirPath)
      .filter(f => f.toLowerCase().endsWith('.wav'))
      .map(f => {
        const fullPath = path.join(dirPath, f);
        const stats = fs.statSync(fullPath);
        const durationSeconds = calculateDuration(stats.size);
        // Extract call direction from filename
        const direction = f.includes('--A-') ? 'In' : 
                         f.includes('--B-') ? 'Out' : 'Unknown';
        return {
          name: f,
          path: fullPath,
          size: formatFileSize(stats.size),
          duration: formatDuration(durationSeconds), // Formatted as MM:SS
          mtime: stats.mtime,
          direction: direction  // Add direction to the file object
        };
      })
      .sort((a, b) => b.mtime - a.mtime);
  } catch (err) {
    console.error(`Error reading files from ${dirPath}:`, err);
    return [];
  }
}

// Helper function to format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper function to filter files by prefix
function filterByPrefix(files, prefix) {
  return files.filter(f => f.name.startsWith(prefix));
}

// Get current month folder name (YYYYMM format)
function getCurrentMonthFolder() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  return `${year}${month}`;
}

// Get current date folder name (YYYYMMDD format)
function getCurrentDateFolder() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const date = now.getDate().toString().padStart(2, '0');
  return `${year}${month}${date}`;
}

// Main exported functions
export function getLatest01Calls() {
  try {
    const currentMonth = `REC${getCurrentMonthFolder()}`;
    console.log("Current month: ", {currentMonth});
    const monthDir = getDirectoryByName(basePath, currentMonth);
    if (!monthDir) return [];
    
    const currentDate = getCurrentDateFolder();
    console.log("Current Date: ", {currentDate});
    const dateDir = getDirectoryByName(monthDir.path, currentDate);
    if (!dateDir) return [];
    
    return filterByPrefix(getSortedFiles(dateDir.path), '01');
  } catch (err) {
    console.error('Error getting 01 calls:', err);
    return [];
  }
}

export function getLatest03Calls() {
  try {
    const currentMonth = `REC${getCurrentMonthFolder()}`;
    const monthDir = getDirectoryByName(basePath, currentMonth);
    if (!monthDir) return [];
    
    const currentDate = getCurrentDateFolder();
    const dateDir = getDirectoryByName(monthDir.path, currentDate);
    if (!dateDir) return [];
    
    return filterByPrefix(getSortedFiles(dateDir.path), '03');
  } catch (err) {
    console.error('Error getting 03 calls:', err);
    return [];
  }
}

export function getLatest05Calls() {
  try {
    const currentMonth = `REC${getCurrentMonthFolder()}`;
    const monthDir = getDirectoryByName(basePath, currentMonth);
    if (!monthDir) return [];
    
    const currentDate = getCurrentDateFolder();
    const dateDir = getDirectoryByName(monthDir.path, currentDate);
    if (!dateDir) return [];
    
    return filterByPrefix(getSortedFiles(dateDir.path), '05');
  } catch (err) {
    console.error('Error getting 05 calls:', err);
    return [];
  }
}

// Last Hour Calls
export function getLastHourCalls(prefix) {
  try {
    const currentMonth = `REC${getCurrentMonthFolder()}`;
    const monthDir = getDirectoryByName(basePath, currentMonth);
    if (!monthDir) return [];
    
    const currentDate = getCurrentDateFolder();
    const dateDir = getDirectoryByName(monthDir.path, currentDate);
    if (!dateDir) return [];
    
    const allFiles = getSortedFiles(dateDir.path);
    const filteredFiles = filterByPrefix(allFiles, prefix);
    
    // Filter for last hour recordings
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return filteredFiles.filter(file => {
      return new Date(file.mtime) > oneHourAgo;
    });
  } catch (err) {
    console.error(`Error getting last hour ${prefix} calls:`, err);
    return [];
  }
}