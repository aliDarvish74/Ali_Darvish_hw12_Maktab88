const { readFile, writeFile } = require("node:fs");

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    readFile(path, "utf8", (err, data) => {
      if (!!err) return reject(err);

      resolve(data);
    });
  });
}

function writeFilePromise(path, data) {
  return new Promise((resolve, reject) => {
    writeFile(path, data, (err) => {
      if (!!err) return reject(err);

      resolve();
    });
  });
}

module.exports = { readFilePromise, writeFilePromise };
