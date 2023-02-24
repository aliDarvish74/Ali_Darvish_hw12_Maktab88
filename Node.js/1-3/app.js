const axios = require("axios");
const jsonrawtoxlsx = require("jsonrawtoxlsx");
const { writeFile } = require("fs/promises");

async function getData() {
  try {
    const response = await axios({
      method: "get",
      url: "https://reqres.in/api/users?page=1",
    });
    const data = response.data.data;
    const buffer = jsonrawtoxlsx(data);
    await writeFile("UserData.xlsx", buffer, "binary");
  } catch (error) {
    console.log(err.message);
  }
}
getData();
