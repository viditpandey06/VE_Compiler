const fs = require('fs');
const path = require('path');

function createFile(code, language) {
  const tempCodeDir = path.join(__dirname, 'es-temp-code-gen');

  if (!fs.existsSync(tempCodeDir)){
    fs.mkdirSync(tempCodeDir);
  }

  if (!code || !language) {
    return Promise.reject({ error: 'Both code and language are required fields' });
  }

  const codeMatch = code.match(/<(.*)>/);
  if (!codeMatch) {
    return Promise.reject({ error: 'Code is not wrapped in container symbols "<>"' });
  }
  code = codeMatch[1];

  let fileExtension;
  switch (language.toLowerCase()) {
    case 'java':
      fileExtension = '.java';
      break;
    case 'python':
      fileExtension = '.py';
      break;
    case 'c':
      fileExtension = '.c';
      break;
    case 'cpp':
    case 'c++':
      fileExtension = '.cpp';
      break;
    default:
      return Promise.reject({ error: 'Unsupported language' });
  }

  const fileName = `temp_code_${getISTDateTimeString()}${fileExtension}`;
  const filePath = path.join(tempCodeDir, fileName);

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, code, (err) => {
      if (err) {
        reject({ error: 'Failed to write code to file' });
      } else {
        resolve({ message: 'File created successfully', filePath });
      }
    });
  });
}

function getISTDateTimeString() {
  const dateIST = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  return dateIST.replace(', ', '-').replace(/\//g, '-').replace(/:/g, '.');
}

const code = "<Your code here>";
const language = "java";
createFile(code, language)
  .then((result) => {
    console.log(result.message);
    console.log('File Path:', result.filePath);
  })
  .catch((error) => {
    console.error(error);
  });
