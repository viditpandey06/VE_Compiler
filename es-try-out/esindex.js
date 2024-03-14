// main.js
const createPythonFile = require('./espycreate');
const compilePythonFile = require('./espycompiler');

// Example Python script content
const pythonScript = `print("Hello World!")`;

// Create Python file
createPythonFile(pythonScript);

// Compile Python file
compilePythonFile();
