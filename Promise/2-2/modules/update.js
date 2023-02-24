const { readFilePromise, writeFilePromise } = require("./promises.js");

function updateUser(filePath, newUserData, uid = null) {
  readFilePromise(filePath)
    .then((data) => {
      if (!uid) {
        throw new Error(`Please enter user uid that you want to update!`);
      }
      if (isNaN(Number(uid))) {
        throw new Error(`Uid must be a number!`);
      }

      uid = Number(uid);
      let userData = JSON.parse(data);

      const targetUser = userData.find((user) => user.uid === uid);
      if (!targetUser) {
        throw new Error("User with entered uid not found!");
      }

      if (Object.keys(newUserData).includes("uid")) {
        throw new Error("You can't update UID!");
      }

      for (const key of Object.keys(newUserData)) {
        if (!Object.keys(targetUser).includes(key)) {
          throw new Error("Invalid key for new user data!");
        }
      }

      const nameRegex = /^([a-zA-Z]){1,30}$/;
      const postalRegex = /^\d{10}$/;
      const phoneRegex = /^\d{11}$/;

      if (
        Object.keys(newUserData).includes("firstname") &&
        !newUserData.firstname.match(nameRegex)
      ) {
        throw new Error(`Please Enter a Valid first name`);
      }

      if (
        Object.keys(newUserData).includes("lastname") &&
        !newUserData.lastname.match(nameRegex)
      ) {
        throw new Error(`Please Enter a Valid last name`);
      }

      if (
        Object.keys(newUserData).includes("city") &&
        !newUserData.city.match(nameRegex)
      ) {
        throw new Error(`Please Enter a Valid city name`);
      }

      if (
        Object.keys(newUserData).includes("postalCode") &&
        !newUserData.postalCode.match(postalRegex)
      ) {
        throw new Error(`Postal code must be a 10 digits number`);
      }

      if (
        Object.keys(newUserData).includes("phoneNumber") &&
        !newUserData.phoneNumber.match(phoneRegex)
      ) {
        throw new Error(`Phone number must be an 11 digits number`);
      }

      userData = userData.map((user) => {
        if (user.uid === uid) {
          return { ...user, ...newUserData };
        }
        return user;
      });
      return writeFilePromise(filePath, JSON.stringify(userData));
    })
    .then(() => {
      console.log("User Successfully updated!");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { updateUser };
