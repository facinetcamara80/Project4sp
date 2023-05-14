/**Reservation**/
//HTML CSS JSResult Skip Results Iframe EDIT ON
// Variables
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const countryInput = document.getElementById("country-input");
const phoneInput = document.getElementById("phone-input");
const dateInput = document.getElementById("date-input");
const regionInput = document.getElementById("region-input");
const commentInput = document.getElementById("comment-input");

const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");

const updateNameInput = document.getElementById("update-name-input");
const updateEmailInput = document.getElementById("update-email-input");

const updatePhoneInput = document.getElementById("update-phone-input");
const updateDateInput = document.getElementById("update-date-input");
const updateCommentInput = document.getElementById("update-comment-input");
const updateCountryInput = document.getElementById("update-country-input");
const updateRegionInput = document.getElementById("update-region-input");



const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUserId = null;
const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Functions
function renderTable() {
  tableBody.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const tr = document.createElement("tr");
    const idTd = document.createElement("td");
    const nameTd = document.createElement("td");
    const emailTd = document.createElement("td");
    const countryTd = document.createElement("td");
    const phoneTd = document.createElement("td");
    const dateTd = document.createElement("td");
    const regionTd = document.createElement("td");
    const commentTd = document.createElement("td");

    const actionsTd = document.createElement("td");
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    idTd.innerText = user.id;
    nameTd.innerText = user.name;
    emailTd.innerText = user.email;
    countryTd.innerText = user.country;
    phoneTd.innerText = user.phone;
    dateTd.innerText = user.date;
    regionTd.innerText = user.region;
    commentTd.innerText = user.comment;

    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    editBtn.addEventListener("click", () => {
      showUpdateForm(user.id);
    });
    deleteBtn.addEventListener("click", () => {
      deleteUser(user.id);
    });
    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);
    tr.appendChild(idTd);
    tr.appendChild(nameTd);
    tr.appendChild(emailTd);
    tr.appendChild(phoneTd);
    tr.appendChild(dateTd);
    tr.appendChild(countryTd);
    tr.appendChild(phoneTd);
    tr.appendChild(regionTd);
    tr.appendChild(commentTd);

    tr.appendChild(actionsTd);
    tableBody.appendChild(tr);
  }
}

function addUser() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const country = countryInput.value.trim();
  const phone = phoneInput.value.trim();
  const date = dateInput.value.trim();
  const region = regionInput.value.trim();
  const comment = commentInput.value.trim();

  if(email.match(validRegex)){
    if(name && email != null){
      var id = 1;
      var val = users.map(function(x){return x.id; }).indexOf(id);
      while(val != -1){
      id++;
      val = users.map(function(x){return x.id; }).indexOf(id);
  }
      const user = {
        id: id,
        name: name,
        email: email,
        country: country,
        phone: phone,
        date: date,
        region: region,
        comment: comment,
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      nameInput.value = "";
      emailInput.value = "";
      countryInput.value = "";
      phoneInput.value = "";
      dateInput.value = "";
      regionInput.value = "";
      commentInput.value = "";

      renderTable();
    }else{
      alert("Name is Required");
    }
  }else{
    alert("Invalid email address!");
  }
}

function updateUser() {
  const name = updateNameInput.value;
  const email = updateEmailInput.value;
  const phone = updatePhoneInput.value;
  const date = updateDateInput.value;
  const comment = updateCommentInput.value;
  const country = updateCountryInput.value;
  const region = updateRegionInput.value;
  

  if(email.match(validRegex)){
    const index = users.findIndex((user) => user.id === currentUserId);
    if (index !== -1) {
      users[index].name = name;
      users[index].email = email;
      users[index].comment = comment;
      users[index].phone = phone;
      users[index].date = date;
      users[index].region = region;
      users[index].country = country;

      localStorage.setItem("users", JSON.stringify(users));
      hideUpdateForm();
      renderTable();
    }
  }else{
    alert("Invalid email address!");
  }
}

function showUpdateForm(userId) {
  const user = users.find((user) => user.id === userId);
  if (user) {
    updateNameInput.value = user.name;
    updateEmailInput.value = user.email;
    updateCommentInput.value = user.comment;
    updatePhoneInput.value = user.phone;
    updateDateInput.value = user.date;
    updateRegionInput.value = user.region;
    updateCountryInput.value = user.country;

    currentUserId = user.id;
    updateBtn.addEventListener("click", updateUser);
    cancelBtn.addEventListener("click", hideUpdateForm);

    updateBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";

    updateNameInput.style.display = "inline-block";
    updateEmailInput.style.display = "inline-block";
    updatePhoneInput.style.display = "inline-block";
    updateDateInput.style.display = "inline-block";
    updateCommentInput.style.display = "inline-block";
    updateRegionInput.style.display = "inline-block";
    updateCountryInput.style.display = "inline-block";

    document.getElementById("update-container").style.display = "block";
  }
}

function hideUpdateForm() {
  updateNameInput.value = "";
  updateEmailInput.value = "";
  updateDateInput.value = "";
  updateCommentInput.value = "";
  updatePhoneInput.value = "";
  updateCountryInput.value = "";
  updateRegionInput.value = "";

  currentUserId = null;
  updateBtn.removeEventListener("click", updateUser);
  cancelBtn.removeEventListener("click", hideUpdateForm);

  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";

  updateNameInput.style.display = "none";
  updateEmailInput.style.display = "none";
  updatePhoneInput.style.display = "none";
  updateDateInput.style.display = "none";
  updateCommentInput.style.display = "none";
  updateRegionInput.style.display = "none";
  updateCountryInput.style.display = "none";

  document.getElementById("update-container").style.display = "none";
}

function deleteUser(userId) {
  users = users.filter((user) => user.id !== userId);
  localStorage.setItem("users", JSON.stringify(users));
  if (users.length == 0){
    hideUpdateForm();
  };
  renderTable();
}

// Event Listeners
addBtn.addEventListener("click", addUser);

// Initialize table
renderTable();