import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState(localStorage.getItem('code') || '');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('python');

  useEffect(() => {
    localStorage.setItem('code', code);
  }, [code]);

  const handleEditorChange = (value, event) => {
    setCode(value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const runCode = async () => {
    try {
      const response = await axios.post('http://localhost:4000/createFile', {
        code: `<${code}>`,
        language,
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
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
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
            {output}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
