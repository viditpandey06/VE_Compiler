const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");
console.log(outputPath);
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJavascript = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    try {
      // Read the JavaScript file content:
      const script = fs.readFileSync(filepath, "utf-8");

      // Option 1: Evaluate the script directly within the current context:
      const output = eval(script); // **Security Warning:** Be cautious with eval

      // Option 2: Require the script as a module (recommended):
      // const module = require(filepath);
      // const output = module.yourFunction(); // Assuming an export function

      fs.writeFileSync(outPath, output, "utf-8");
      resolve(`Output written to ${outPath}`);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  executeJavascript
};
