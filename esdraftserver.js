const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

function getISTDateTimeString() {
  const dateIST = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  return dateIST.replace(', ', '-').replace(/\//g, '-').replace(/:/g, '.');
}

const tempCodeDir = path.join(__dirname, 'es-temp-code-gen');

if (!fs.existsSync(tempCodeDir)){
  fs.mkdirSync(tempCodeDir);
}

app.post('/createFile', (req, res) => {
  let { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: 'Both code and language are required fields' });
  }

  const codeMatch = code.match(/<(.*)>/);
  if (!codeMatch) {
    return res.status(400).json({ error: 'Code is not wrapped in container symbols "<>"' });
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
      return res.status(400).json({ error: 'Unsupported language' });
  }

  const fileName = `temp_code_${getISTDateTimeString()}${fileExtension}`;
  const filePath = path.join(tempCodeDir, fileName);

  fs.writeFile(filePath, code, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to write code to file' });
    }
    res.status(200).json({ message: 'File created successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
