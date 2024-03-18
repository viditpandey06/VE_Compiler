const path = require("path");
const fs = require("fs");
const {executeCpp} = require("./compilers/cppCompiler/cppCompiler");
const {executeJava} = require("./compilers/javaCompiler/javaCompiler");
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


const generateFile = async (language, code) => {
  
  if (language === "cpp") {
    const jobId = uuid();
    const filename = `${jobId}.cpp`;
    const filepath =   path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
    executeCpp(filepath);
    
  } else if (language === "java") {
    jobId="Myclass1";
    const filename = `${jobId}.java`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
    await executeJava(filepath);
  }
  else if (language === "js") {
    const jobId = uuid();
    const filename = `${jobId}.js`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
  }
  else if (language === "py") {
    const jobId = uuid();
    const filename = `${jobId}.py`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
}
}
generateFile("cpp", "#include <iostream>\n using namespace std;\nint main() {\n  cout << \"Hello, World!\";\n  return 0;\n}");
generateFile("java", "public class Myclass1 {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, World\");\n  }\n}");

