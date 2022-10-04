document.addEventListener("DOMContentLoaded",checkUser);

function checkUser(){
  var user = JSON.parse(localStorage.getItem("loggedinUser"));
  if(user === null){
    return;
  }
  else{
    window.location.href = "index.html";
  }
}

function mainUser() {
  var mainUser = [
    {
      firstname: "Syed Karnain",
      lastname: "Kamal",
      email: "karnain@user.com",
      password: "pakistan123",
      createdAt: new Date(),
      friends: [],
      posts: [],
    },
  ];
  if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify(mainUser));
  }
}

// user constructor
function User(firstname, lastname, email, password) {
  (this.firstname = firstname),
    (this.lastname = lastname),
    (this.email = email),
    (this.password = password),
    (this.createdAt = new Date()),
    (this.friends = []),
    (this.myposts = []),
    (this.allposts = []);
}

function signup() {
  var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
  mainUser();

  var users = JSON.parse(localStorage.getItem("users"));

  var firstName = document.getElementById("firstname");
  var lastName = document.getElementById("lastname");
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  for (var i = 0; i < users.length; i++) {
    if (email.value === users[i].email) {
      alert("Email already Exist");

      firstName.value = "";
      lastName.value = "";
      email.value = "";
      password.value = "";
      return false;
    }
  }

  if (!password.value.match(passwordRegex)) {
    password.style.outline = "red solid";
    password.value = "";

    alert("Invalid Password")

    return false;
  }

  var user = new User(
    firstName.value,
    lastName.value,
    email.value,
    password.value
  );
  users.push(user);
  localStorage.setItem("loggedinUser", JSON.stringify(user));

  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
}

function login() {
  var email = document.getElementById("user_email");
  var password = document.getElementById("user_password");

  var users = JSON.parse(localStorage.getItem("users"));

  for (var i = 0; i < users.length; i++) {
    if (
      email.value === users[i].email &&
      password.value === users[i].password
    ) {
      localStorage.setItem("loggedinUser", JSON.stringify(users[i]));
      window.location.href = "index.html";
      return;
    }
  }
  alert("Invalid Credentials");
  email.value = "";
  password.value = "";
  
  return false;
}

var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


