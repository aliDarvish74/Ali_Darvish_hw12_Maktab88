const sharp = require("sharp");

function pngToJpeg(source) {
  sharp("./image.png")
    .resize({
      width: 500,
      height: 500,
      fit: sharp.fit.cover,
    })
    .jpeg()
    .toFile(`${source.replace("png", "jpeg")}`, (err) => {
      if (!!err) throw err;
      console.log("Success!");
    });
}

pngToJpeg("./image.png");
