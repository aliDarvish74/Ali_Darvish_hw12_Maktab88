const { readFilePromise, writeFilePromise } = require("./promises");

function createUser(filePath, newUserData) {
  readFilePromise(filePath)
    .then((data) => {
      let userData = JSON.parse(data);

      if (Object.keys(newUserData).length !== Object.keys(userData[0]).length) {
        throw new Error(`Invalid new user Information (Length)`);
      }

      const primeKeys = Object.keys(userData[0]);
      for (const key of Object.keys(newUserData)) {
        const equal = primeKeys.find((item) => item === key);
        if (!equal) {
          throw new Error(`Wrong user data! (invalid Key)`);
        }
      }

      if (isNaN(Number(newUserData.uid))) {
        throw new Error(`UID must be a number!`);
      }

      const duplicateUser = userData.find(
        (item) => item.uid === newUserData.uid
      );
      if (!!duplicateUser) {
        throw new Error(`Duplicate user found! please enter an unique UID!`);
      }

      const nameRegex = /^([a-zA-Z]){1,30}$/;
      const postalRegex = /^\d{10}$/;
      const phoneRegex = /^\d{11}$/;

      if (!newUserData.firstname.match(nameRegex)) {
        throw new Error(`Please Enter a Valid first name`);
      }

      if (!newUserData.lastname.match(nameRegex)) {
        throw new Error(`Please Enter a Valid last name`);
      }

      if (!newUserData.city.match(nameRegex)) {
        throw new Error(`Please Enter a Valid city name`);
      }

      if (!newUserData.postalCode.match(postalRegex)) {
        throw new Error(`Postal code must be a 10 digits number`);
      }

      if (!newUserData.phoneNumber.match(phoneRegex)) {
        throw new Error(`Phone number must be an 11 digits number`);
      }

      userData.push(newUserData);

      return writeFilePromise(filePath, JSON.stringify(userData));
    })
    .then(() => {
      console.log("Data written successfully");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { createUser };
