document.addEventListener("DOMContentLoaded", renderContent);
var user = JSON.parse(localStorage.getItem("loggedinUser"));
var users = JSON.parse(localStorage.getItem("users"));


var globalPosts = [];
function showAllPosts(){
  for (var i = 0 ; i< user.friends.length ; i ++){
    for (var j=0; j< users.length; j++){
      if(user.friends[i] === users[j].email){
          for(var k= 0 ; k < users[j].myposts.length ; k++){
            globalPosts.push(users[j].myposts[k]);
          }
      }
    }
  }
}
showAllPosts();


function renderContent() {
  showPost();
  if (user === null) {
    window.location.href = "landing.html";
  } else {
    var username = document.getElementById("username");
    username.innerText = user.firstname + " " + user.lastname;
    sliceMyUser(user.email);
    function sliceMyUser(removeuser) {
      for (var i = 0; i < users.length; i++) {
        if (removeuser === users[i].email) {
          users.splice(i, 1);
          localStorage.setItem("users", JSON.stringify(users));
        }
      }
    }
  }
}

function post() {
  var getPost = document.getElementById("create-post");

  function Post(text, username, postedUserEmail) {
    (this.postId = Math.random().toFixed(16).slice(2)),
      (this.postedBy = username),
      (this.postedUserEmail = postedUserEmail),
      (this.text = text),
      (this.image = "https://pbs.twimg.com/media/EUsDSySVAAIXfxQ.jpg"),
      (this.date = new Date()),
      (this.like = 0),
      (this.comments = []);
  }
  var fullName = user.firstname + " " + user.lastname;
  var _post = new Post(getPost.value, fullName, user.email);
  pushPost(_post);
}

function pushPost(post) {
  user.myposts.push(post);
  user.allposts.push(post);
  for (var i = 0; i < user.friends.length; i++) {
    for (var j = 0; j < users.length; j++) {
      if (user.friends[i] === users[j].email) {
        users[j].allposts.push(post);
      }
    }
  }

  setTimeout(() => {
    localStorage.setItem("loggedinUser", JSON.stringify(user));
    localStorage.setItem("users", JSON.stringify(users));
    window.location.reload();
  }, 1000);
}

function showPost() {
  if (user === null) {
    window.location.href = "landing.html";
  } else {
    var username = document.getElementById("username");
    username.innerText = user.firstname + " " + user.lastname;
  }
  var post_div = document.getElementById("post-div");
  if (user.allposts.length === 0) {
    post_div.innerHTML = `<div style="margin: 0px; width: 100%" class="list"><p style="font-size: 20px;">No Posts to show</p></div>`;
  } else {
    for (var i = 0; i < user.allposts.length; i++) {
      post_div.innerHTML += `
      
<div class="user">
<div class="profile-pic">
    <img src="${user.allposts[i].image}" alt="">
</div>
<div class="info">
    <h3 id="post_username">${user.allposts[i].postedBy}</h3>
</div >
<SPAN class="edit"><i class="uil uil-ellipsis-h"></i></SPAN>
</div>
<div class="caption">
<h3 id="post-content">${user.allposts[i].text}</h3>
</div>
<div class="action-button">
<div class="interaction-button">
    <span><i class="uil uil-thumbs-up"></i></span>
    <span><i class="uil uil-comment"></i></span>
    <span><i class="uil uil-share"></i></span>
</div>
 <button class="btn btn-primary" onclick='deletePost("${user.allposts[i].postedUserEmail}",${user.allposts[i].postId})'>Delete Post</button>
</div>  `;
    }
  }
}


function deletePost(userEmail, _postId) {
  if (user.email == userEmail) {
    for (var i = 0; i < user.allposts.length; i++) {
      if (user.allposts[i].postId == _postId) {
        user.allposts.splice(i, 1);
        alert("Post Deleted")
        setTimeout(() => {
          localStorage.setItem("loggedinUser", JSON.stringify(user));
          localStorage.setItem("users", JSON.stringify(users));
          window.location.reload();
        }, 1000);
      }
    }
    for (var i = 1; i < users.length; i++) {
      for (var j = 0; j < users[i].allposts.length; j++) {
        if (users[i].allposts[j].postId == _postId) {
          users[i].allposts.splice(j, 1);
        }

      }
    }
    for (var i = 0; i < user.myposts.length; i++) {
      if(user.myposts[i].postId == _postId){
        user.myposts.splice(i,1);
    }
  }
  }
  else {
    alert("You cant delete this post")
  }
}

document.getElementById("logout").addEventListener("click",logout);
function logout(){
    users.push(user);
    localStorage.setItem("users",JSON.stringify(users));
    localStorage.removeItem("loggedinUser");
    window.location.reload();
};
