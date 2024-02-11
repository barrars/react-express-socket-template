var express = require('express');
var router = express.Router();
const { spawn } = require('child_process');
/* GET home page. */
router.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Transfer-Encoding', 'chunked');

  const whisper = spawn('whisper.cpp/main', ['-m', './whisper.cpp/models/ggml-base.en.bin', '-f', './output.wav', '-ml', '20', '-osrt', '-ovtt', '-otxt']);

  let dataReceived = false;

  whisper.stdout.on('data', (data) => {
    dataReceived = true;
    console.log(`stdout: ${data}`);
    // Stream chunks of data to the client
    const output = data.toString().split('\n').map(line => {
      return [line.slice(0, 13), line.slice(32)];
    });
    // Send each chunk as it becomes available
    output.forEach((line) => {
      if (line[0] || line[1]) { // Check if the line has content
        res.write(`${line[0]} ${line[1]}\n`);
      }
    });
  });

  whisper.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  whisper.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
    if (!dataReceived) {
      console.log('No data received, ending response...');
    }
    res.end(); // Ensure res.end() is called here
  });

  whisper.on('error', (err) => {
    console.error('Failed to start child process.', err);
    res.status(500).send('Error executing command');
  });
});

module.exports = router;
