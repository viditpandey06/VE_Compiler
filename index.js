const path = require("path");
const fs = require("fs");
const {executeCpp} = require("./compilers/cppCompiler/cppCompiler");
const {executeJava} = require("./compilers/javaCompiler/javacompiler");
const {executeJavascript} = require("./compilers/jsCompiler/jscompiler");
const { executePython } = require("./compilers/pyCompiler/pythonCompiler");
const { v4: uuid } = require("uuid");
const output="output";
const filepath=null;
const dirCodes = path.join(__dirname, "codeBase");
console.log("DirCodes:",dirCodes);
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}
const generateFile =(language, code) => {
  const jobId = uuid();
  if (language === "cpp") {
    const filename = `${jobId}.cpp`;
    const filepath =   path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
    
  } else if (language === "java") {
    const filename = `${jobId}.java`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
  }
  else if (language === "js") {
    const filename = `${jobId}.js`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
  }
  else if (language === "py") {
    const filename = `${jobId}.py`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
}
}
generateFile("cpp", "#include <iostream>\n using namespace std;\nint main() {\n  cout << \"Hello, World!\";\n  return 0;\n}");

let cppcompiler = async () => {
  const output = await executeCpp(filepath);
  console.log(output);
};

// let javacompiler = async (filepath) => {
//   const output = await executeJava(filepath);
//   console.log(output);
// };
// let jscompiler = async () => {
//   const output = await executeJavascript(filepath);
//   console.log(output);
// };
// let pythoncompiler = async () => {
//   const output = await executePython(filepath);
//   console.log(output);
// };
