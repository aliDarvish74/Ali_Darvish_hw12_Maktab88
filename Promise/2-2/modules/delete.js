const { readFilePromise, writeFilePromise } = require("./promises");

function deleteUser(filePath, uid = null) {
  readFilePromise(filePath)
    .then((data) => {
      if (!uid) {
        throw new Error("Please Enter an UID!");
      }
      if (isNaN(Number(uid))) {
        throw new Error("Please Enter an valid UID!");
      }
      uid = Number(uid);
      let userData = JSON.parse(data);

      const targetUser = userData.find((user) => user.uid === uid);

      if (!targetUser) {
        throw new Error("User Not found!");
      }

      userData = userData.filter((user) => user.uid !== uid);
      return writeFilePromise(filePath, JSON.stringify(userData));
    })
    .then(() => {
      console.log("User Deleted Successfully");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { deleteUser };
