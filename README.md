# VE-Compiler

## Description

VE-Compiler is a versatile JavaScript package that offers a solution for compiling code snippets written in various programming languages, including C++, Java, JavaScript, Python, and C. It simplifies the compilation process by providing a unified interface for compiling code across different languages. The package generates unique identifiers for each compilation job, saves code snippets to files, invokes the appropriate compiler modules, and returns the compilation outputs.

## Features

- **Multi-Language Support:** Compile code written in C++, Java, JavaScript, Python, and C.
- **Unified Interface:** Simplified API for compiling code snippets in different languages.
- **Error Handling:** Detailed error messages are provided in case of compilation errors.
- **Output Generation:** Returns compiled output for successful compilations.
- **Customizable:** Easily configurable for specific requirements.
- **Cross-Platform Compatibility:** Works seamlessly across different platforms and environments.

## Installation

You can install the package via npm:

```bash
npm install ve-compiler
```

## Usage

## Language codes-
"c" , "cpp" , "js" , "py" , "java"

### Example with Pure Node.js

```javascript
const { CompileFile } = require('ve-compiler');


CompileFile(
    "c",
    '#include <stdio.h>\n int main() {\n  printf("Hello, World! c ");\n  return 0;\n}'
  );
```

### Example with React + Node Server + Monaco Editor

In this example, we'll demonstrate how to integrate the VE-Compiler package with a React frontend using Monaco Editor, and a Node.js backend to handle compilation requests.

#### Frontend (React)

```jsx
import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState(localStorage.getItem('code') || '');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript'); // Default language

  useEffect(() => {
    localStorage.setItem('code', code);
  }, [code]);

  const handleEditorChange = (value, event) => {
    setCode(value);
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
  };

  const runCode = async () => {
    try {
      // Convert language to 'js' if it's 'javascript'
      const lang = language === 'javascript' ? 'js' : language;
      const response = await axios.post('http://localhost:4000/compile', {
        code,
        language: lang,
      });

      setOutput(response.data.message);
    } catch (error) {
      setOutput(error.toString());
    }
  };

  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <label style={{ marginRight: '10px' }}>Select Language:</label>
            <select value={language} onChange={handleLanguageChange}>
              <option value="javascript">JavaScript</option>
              <option value="c">C</option>
            </select>
          </div>
          <div style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
            <Editor
              height="80vh"
              language={language}
              value={code}
              onChange={handleEditorChange}
            />
          </div>
          <button onClick={runCode}>Run</button>
        </div>
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <h2>Output:</h2>
          <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '80vh' }}>
            {output.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
```

#### Backend (Node.js)

```javascript
const express = require('express');
const { CompileFile } = require('ve_compiler-test-1');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post('/compile', async (req, res) => {
  const { code, language } = req.body;

  try {
    const output = await CompileFile(language, code);
    // Extract stdout from the output object
    const stdout = output.stdout || '';
    res.json({ message: stdout });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Important!

While using java compiler we request you to send the class name as - "Main" for it to function properly, we will enhance this feature in further updates.
