const { exec, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath, input = "", timeLimitMs = 2000) => {
  return new Promise((resolve, reject) => {
    const jobId = path.basename(filePath).split(".")[0];
    const executablePath = path.join(outputPath, `${jobId}.exe`);
    const compileCommand = `g++ "${filePath}" -o "${executablePath}"`;

    exec(compileCommand, (err, stdout, stderr) => {
      if (err) return reject({ stderr });

      const run = spawn(executablePath);
      let output = "";
      let error = "";
      let timedOut = false;

      const timeout = setTimeout(() => {
        timedOut = true;
        run.kill(); // Kill the process
      }, timeLimitMs);

      run.stdin.write(input);
      run.stdin.end();

      run.stdout.on("data", (data) => {
        output += data.toString();
      });

      run.stderr.on("data", (data) => {
        error += data.toString();
      });

      run.on("close", (code) => {
        clearTimeout(timeout);

        if (timedOut) {
          return reject({ stderr: "❌ Time Limit Exceeded" });
        }

        if (error) {
          return reject({ stderr: error });
        }

        resolve({ stdout: output });
      });
    });
  });
};

module.exports = { executeCpp };
