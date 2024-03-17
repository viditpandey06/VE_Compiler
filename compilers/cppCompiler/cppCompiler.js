const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");


  const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  //const outPath = path.join(outputPath, `${jobId}.out`);

  // return new Promise((resolve, reject) => {
  //   exec(
  //     `g++ ${filepath} -o ${filepath}; ./${jobId}.out`,
  //     (error, stdout, stderr) => {
  //       error && reject({ error, stderr });
  //       stderr && reject(stderr);
  //       resolve(stdout);
  //     }
  //   );
  // });
  async function executeCpp(filepath, jobId) {
    try {
      const command = `g++ ${filepath} -o ${filepath}; ./${jobId}.out`;
      const { stdout, stderr } = await exec(command);

      if (stderr) {
        throw new Error(`Compilation or execution error:\n${stderr}`);
      }

      return stdout;
    } catch (error) {
      reject({ error, stderr }); // Assuming 'reject' is available in the context
    }
  }

  
};

module.exports = {
  executeCpp
};
