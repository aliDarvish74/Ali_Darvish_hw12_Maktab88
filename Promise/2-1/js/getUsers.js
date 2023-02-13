let userData = [];

// for (let i = 1; i < 3; i++) {
//   $.ajax({
//     url: `https://reqres.in/api/users?page=${i}`,
//     type: "get",
//     async: false,
//     success: function (response) {
//       for (const user of response.data) {
//         userData.push(user);
//       }
//     },
//   });
// }

const getData = async (pageNumber) => {
  const response = await fetch(
    `https://reqres.in/api/users?page=${pageNumber}`
  );
  let data = await response.json();
  return data.data;
};
