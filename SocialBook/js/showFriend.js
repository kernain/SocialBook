document.addEventListener("DOMContentLoaded",showMyFriends);

var user =  JSON.parse(localStorage.getItem("loggedinUser"));
var users =  JSON.parse(localStorage.getItem("users"));

function showMyFriends(){
    if(user === null){
        window.location.href = "landing.html";
    }
    else{
        var username = document.getElementsByClassName("username");
        username.innerText = user.firstname +" "+ user.lastname;
    }
    var showFriends = document.getElementById("showFriends");
    if(user.friends.length === 0){
        showFriends.innerHTML= `<div class="noFriends"><p>No friends to show</p></div>`
    }
    else{
        for (var i = 0; i < user.friends.length; i++){
            for(var j=0 ; j < users.length ; j++){
            if(user.friends[i] === users[j].email)
            showFriends.innerHTML += `
            <div class="card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Bdsm8DlPo9FOqNn3C2b2sPPo3cVdZFECsXMlXJyNOg&s">
            <p class="friend-name">Name: ${users[j].firstname + " " + users[j].lastname}</p>
            <button onclick=deleteFriend('${users[j].email}') class="btn btn-primary">Unfriend</button>
            </div>`
            }
        }
        
    }
}

function deleteFriend(friendEmail) {
    for (var i = 0; i < user.friends.length; i++) {
            var friendIndex = user.friends.indexOf(friendEmail);
            user.friends.splice(friendIndex, 1);
            alert("Unfriended")
              setTimeout(() => {
                  localStorage.setItem("loggedinUser",JSON.stringify(user));
                    localStorage.setItem("users", JSON.stringify(users));

                  document.location.reload();
              }, 1000);
        }
            for(var i = 1; i < users.length; i++){
                if(users[i].email === friendEmail){
                        var friendIndex = users[i].friends.indexOf(user.email);
                        users[i].friends.splice(friendIndex, 1);
                }
            }
}