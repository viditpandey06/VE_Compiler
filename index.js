const path = require("path");
const executeCpp = require("./compilers/cppCompiler/cppCompiler");
const executeJava = require("./compilers/javaCompiler/javacompiler");
const executeJavascript = require("./compilers/jsCompiler/jscompiler");
const executePython = require("./compilers/pyCompiler/pythonCompiler");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const output="output";
const dirCodes = path.join(__dirname, "codes");
console.log("Vidit");
console.log(dirCodes);
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async () => {
  const jobId = uuid();
  format='py'
  content='print("Hello Vidit")'
  const filename = `${jobId}.${format}`;
  const filepath = path.join(dirCodes, filename);
  await fs.writeFileSync(filepath, content);
  return filepath;
};
const filepath = generateFile();

let cppcompiler = async () => {
  const output = await executeCpp(filepath);
  console.log(output);
};

let javacompiler = async () => {
  const output = await executeJava(filepath);
  console.log(output);
};
let jscompiler = async () => {
  const output = await executeJavascript(filepath);
  console.log(output);
};
let pythoncompiler = async () => {
  const output = await executePython(filepath);
  console.log(output);
};
pythoncompiler();


