const { spawn } = require('child_process');

module.exports = function (req, res) { // Ensure `res` is passed here if it's not within scope
  const whisper = spawn('whisper.cpp/main', ['-m', './whisper.cpp/models/ggml-base.en.bin', '-f', './output.wav', '-ml', '20', '-osrt', '-ovtt', '-otxt']);
  whisper.stdout.on('data', (data) => {
    console.log(`stdout: hello`);
  });

}




