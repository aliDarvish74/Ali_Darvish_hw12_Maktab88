const { writeFile } = require("fs/promises");
const { createWriteStream } = require("fs");
const WordExtractor = require("word-extractor");
const PDFDocument = require("pdfkit");

async function wordToPdf(sourcePath, outputPath) {
  const doc = new PDFDocument();
  const extractor = new WordExtractor();

  try {
    await writeFile(outputPath, "");
    const data = await extractor.extract(sourcePath);
    const content = data.getBody();
    doc.pipe(createWriteStream(outputPath));
    doc.text(content);
    doc.end();
    console.log("Successfully Converted!");
  } catch (error) {
    console.log(error);
  }
}

wordToPdf("./word.docx", "./word.pdf");
