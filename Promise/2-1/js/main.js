async function main() {
  const page1 = await getData(1);
  const page2 = await getData(2);
  let userData = [...(await page1), ...(await page2)];
  renderUsersList(0, userData);
  renderPagination(userData);
  localStorage.setItem("userData", JSON.stringify(userData));
}
main();

$("#userInfo").hide();
const cardGenerator = ({ id, last_name, first_name, avatar, email }) => {
  return `
        <div class="col-lg-4 col-md-6 col-12 ">
            <div class="card shadow rounded-4 bg-dark">
              <div  class="card-img-top rounded-4 w-100 rounded-bottom" style="background: url(${avatar});  background-position: center; background-size: cover; background-repeat: no-repeat; padding-top: 100% ;">
              </div>
            <div class="card-body">
              <h5 class="card-title text-center text-warning">${first_name} ${last_name}</h5>
              <p class = "text-light" style = "text-align: justify">
                ${first_name} ${last_name} is Maktab 88 user by UID of ${id}, You can easily get in touch
                with ${first_name} from ${email}
              </p>
              <ul class="list-group my-4">
                <li class="list-group-item list-group-item-dark text-dark">UID: ${id}</li>
                <li class="list-group-item list-group-item-dark text-dark">Email : ${email}</li>
              </ul>
                    <button
                        onclick="readUserData(${id})" 
                        class="btn btn-warning rounded-3 w-100"
                        data-bs-toggle="modal" data-bs-target="#userProfileModal"
                    >
                        Profile
                    </button>
                </div>
            </div>
        </div>
    `;
};

const usersListGenerator = (index, data) => {
  let usersListBody = "";

  for (let i = index; i < index + 6; i++) {
    if (!data[i]) {
      break;
    }
    usersListBody += cardGenerator(data[i]);
  }
  return usersListBody;
};

function renderUsersList(index, data) {
  $("#usersList").html(usersListGenerator(index, data));
}

const filterUsers = function () {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  const searchKey = $("#searchInput").val().toLowerCase();
  let newUserData = userData.filter((item) => {
    for (const value of Object.values(item)) {
      if (value.toString().toLowerCase().includes(searchKey)) {
        return true;
      }
    }
  });
  renderUsersList(0, newUserData);
  renderPagination(newUserData);
};
