// datailpost.html 열리는 버튼
function datailpostBtn(post_id) {
  location.href = `http://localhost:8000/posts/?post_id=${post_id}`;
}

// update.html 열리는 버튼
function postUpdateBtn(post_id) {
  location.href = `http://localhost:8000/posts/update/?post_id=${post_id}`;
}

// user.html 열리는 버튼
function join() {
  location.href = "user";
}

//나는 중심이다
function home() {
  location.href = "/";
}

// main.html 열리는 버튼
function startBtn() {
  location.href = `http://localhost:8000/main`;
}

function category(category) {
  location.href = `http://localhost:8000/category/?category=${category}`;
}

function myupdate() {
  location.href = "http://localhost:8000/myuser/test";
}

// function updateBtn(post_id) {
//   location.href = `http://localhost:8000/posts/?post_id=${post_id}`;
// }
