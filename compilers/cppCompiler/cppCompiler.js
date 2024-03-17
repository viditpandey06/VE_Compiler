const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const executeCpp = async (filepath) => {
  try {
    const jobId = path.basename(filepath).split(".")[0];
    const codebasePath = path.join(__dirname, "../../codebase");
    const outFilePath = path.join(codebasePath, `${jobId}.out`);

    if (!fs.existsSync(codebasePath)) {
      fs.mkdirSync(codebasePath, { recursive: true });
    }

    const compilationCommand = `g++ ${filepath} -o ${outFilePath}`;
    await execPromise(compilationCommand);

    return outFilePath;
  } catch (error) {
    throw new Error(`Compilation error: ${error}`);
  }
};

const execPromise = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
};

module.exports = {
  executeCpp
};
