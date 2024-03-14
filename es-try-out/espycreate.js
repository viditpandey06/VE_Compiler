// createPythonFile.js
const fs = require('fs');
const path = require('path');

// Function to create a Python file with given script content
function createPythonFile(scriptContent) {
    const folderPath = './tempCodes';
    const pythonFilePath = path.join(folderPath, 'script.py');

    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }


    fs.writeFileSync(pythonFilePath, scriptContent);

    console.log(`Python file created at ${pythonFilePath}`);
}

module.exports = createPythonFile;
