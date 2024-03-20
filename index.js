
const path = require("path");
const fs = require("fs");
const { executeCpp } = require("./compilers/cppCompiler/cppCompiler");
const { executeJava } = require("./compilers/javaCompiler/javaCompiler");
const { executeJavaScript } = require("./compilers/jsCompiler/jscompiler");
const { executePython } = require("./compilers/pyCompiler/pythonCompiler");
const { v4: uuid } = require("uuid");
const { executeC } = require("./compilers/cCompiler/cCompiler");
const { compileFunction } = require("vm");

const output = "output";
const dirCodes = path.join(__dirname, "codeBase");
console.log("DirCodes:", dirCodes);
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const CompileFile = async (language, code) => {
  let jobId;
  if (language === "cpp") {
    jobId = uuid();
    const filename = `${jobId}.cpp`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
    return await executeCpp(filepath); // Modified to return the output
  } else if (language === "java") {
    jobId = "Main";
    const filename = `${jobId}.java`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
    return await executeJava(filepath); // Modified to return the output
  } else if (language === "js") {
    jobId = uuid();
    const filename = `${jobId}.js`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
    return await executeJavaScript(filepath); // Modified to return the output
  } else if (language === "py") {
    jobId = uuid();
    const filename = `${jobId}.py`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
    return await executePython(filepath); // Modified to return the output
  } else if (language === "c") {
    jobId = uuid();
    const filename = `${jobId}.c`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
    return await executeC(filepath); // Modified to return the output
  }
};

module.exports = {
  CompileFile
};