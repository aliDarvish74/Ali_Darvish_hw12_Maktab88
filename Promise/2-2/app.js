const { readUserData } = require("./modules/read.js");
const { createUser } = require("./modules/create.js");
const { updateUser } = require("./modules/update.js");
const { deleteUser } = require("./modules/delete.js");

/*********************************
 * Read
 */

// readUserData("./user-data.json");

/*********************************
 * Create
 */

const newUser = {
  uid: 112234,
  firstname: "Ali",
  lastname: "Darvish",
  city: "Hamedan",
  postalCode: "6514171918",
  phoneNumber: "09304604322",
  position: "Back-end developer",
};

// createUser("./user-data.json", newUser);

/*********************************
 * Update
 */
const updatedUser = {
  firstname: "Peyman",
};

// updateUser("./user-data.json", updatedUser, 112234);

/*********************************
 * Delete
 */

deleteUser("./user-data.json", 112234);
