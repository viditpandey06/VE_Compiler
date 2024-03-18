const path = require("path");
const fs = require("fs");
const { executeCpp } = require("./compilers/cppCompiler/cppCompiler");
const { executeJava } = require("./compilers/javaCompiler/javaCompiler");
const { executeJavaScript } = require("./compilers/jsCompiler/jscompiler");
const { executePython } = require("./compilers/pyCompiler/pythonCompiler");
const { v4: uuid } = require("uuid");

const output = "output";
const dirCodes = path.join(__dirname, "codeBase");
console.log("DirCodes:", dirCodes);
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (language, code) => {
  let jobId;
  if (language === "cpp") {
    jobId = uuid();
    const filename = `${jobId}.cpp`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
    executeCpp(filepath);
  } else if (language === "java") {
    jobId = "Myclass1";
    const filename = `${jobId}.java`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
    await executeJava(filepath);
  } else if (language === "js") {
    jobId = uuid();
    const filename = `${jobId}.js`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
    await executeJavaScript(filepath); // Call the executeJavaScript function
  } else if (language === "py") {
    jobId = uuid();
    const filename = `${jobId}.py`;
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, code);
    executePython(filepath);
  }
};

generateFile(
  "cpp",
  "#include <iostream>\n using namespace std;\nint main() {\n  cout << \"Hello, World!\";\n  return 0;\n}"
);
generateFile(
  "java",
  "public class Myclass1 {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, World\");\n  }\n}"
);
generateFile("js", "console.log('Hello, World! js');");
generateFile("py", "print(\"Hello, World1111ps\")");
