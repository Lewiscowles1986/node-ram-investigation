const process = require('process');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  const processMemory = process.memoryUsage();
  console.info(JSON.stringify(processMemory));
});
