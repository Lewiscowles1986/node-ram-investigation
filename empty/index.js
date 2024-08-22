const process = require('process');
const processMemory = process.memoryUsage();
console.info(JSON.stringify(processMemory));
