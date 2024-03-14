// compilePythonFile.js
const { exec } = require('child_process');
const path = require('path');

// Function to compile the Python file
function compilePythonFile() {
    const folderPath = './tempCodes';
    const pythonFilePath = path.join(folderPath, 'script.py');

    
    const command = `python ${pythonFilePath}`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`Compilation successful:\n${stdout}`);
    });
}

module.exports = compilePythonFile;
