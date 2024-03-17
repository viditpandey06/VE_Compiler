const outputPath = path.join(__dirname, "outputs");
console.log(outputPath);
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}