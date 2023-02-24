const { readFilePromise } = require("./promises.js");

function readUserData(path) {
  readFilePromise(path)
    .then((data) => {
      console.log(JSON.parse(data));
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { readUserData };
