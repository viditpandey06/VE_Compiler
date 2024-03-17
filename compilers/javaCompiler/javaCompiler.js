/* These lines of code are importing necessary modules in Node.js for executing shell commands, working
with the file system, and handling file paths. Here's what each import statement does: */
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const executeJava = (filepath) => {
  /* The code block you provided is setting up an output directory path for storing output files. Here's
a breakdown of what it does: */
  const outputPath = path.join(__dirname, "outputs");
  console.log(outputPath);
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    // Compile and execute Java code with javac and java:
    exec(
      `javac ${filepath} -d ${outputPath} && cd ${outputPath} && java ${jobId}`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeJava
};
