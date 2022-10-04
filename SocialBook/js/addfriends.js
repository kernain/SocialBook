document.addEventListener("DOMContentLoaded", showAddFriends);

var user = JSON.parse(localStorage.getItem("loggedinUser"));
var users = JSON.parse(localStorage.getItem("users"));

function showAddFriends() {
  if (user === null) {
    window.location.href = "landing.html";
  } else {
    var username = document.getElementsByClassName("username");
    username.innerText = user.firstname + " " + user.lastname;
  }
  var friends = document.getElementById("addFriends");
  if (users.length === 1) {
    friends.innerHTML = `<div class="noFriends"><p>No friends to show</p></div>`;
  } else {
    for (var i = 1; i < users.length; i++) {
      friends.innerHTML += `
                <div class="card">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Bdsm8DlPo9FOqNn3C2b2sPPo3cVdZFECsXMlXJyNOg&s">
                <p class="friend-name">Name: ${users[i].firstname + " " + users[i].lastname}</p>
                <button onclick=addFriend('${
                  users[i].email
                }') class="unfriend btn btn-primary">Add Friend</button>
                </div>`;
    }
  }
}
function addFriend(friendEmail) {
  for (var i = 0; i < user.friends.length; i++) {
    if (user.friends[i] === friendEmail) {
      alert("Already Added")
      return;
    }
  }
  alert("Friend Added Successfully")
  user.friends.push(friendEmail);
  localStorage.setItem("loggedinUser", JSON.stringify(user));
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === friendEmail) {
      users[i].friends.push(user.email);
      localStorage.setItem("users", JSON.stringify(users));
      return;
    }
  }
}
